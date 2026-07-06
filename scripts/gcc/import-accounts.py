#!/usr/bin/env python3
"""Import the warehouse xlsx export into per-company JSON files for the
/gcc/companies/ static page generator.

Reads data-staging/<file>.xlsx (sheets: accounts, alias, centers, services,
prospects, tech) and writes data/gcc/companies/{slug}.json.

Gating is applied here: prospect names, emails and LinkedIn URLs are never
read into the output. Only a count, the head-type departments and the top
job titles (title + city) survive.

Editorial fields (lede, insight, about) are auto-composed from each
company's real numbers; anything in data/gcc/overrides/{slug}.json is
merged last and wins, so curated copy survives re-imports.

Usage: python3 scripts/gcc/import-accounts.py data-staging/11-accounts.xlsx
"""

import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "data" / "gcc" / "companies"
OVERRIDES_DIR = ROOT / "data" / "gcc" / "overrides"

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}

SENIORITY = ["CXO", "Head", "VP", "Director", "GM", "Leader", "Senior Manager"]
LEADER_LEVELS = set(SENIORITY)

SERVICE_LABELS = {
    "service_it": "IT",
    "service_erd": "R&D and ER&D",
    "service_fna": "Finance & Accounting",
    "service_hr": "HR",
    "service_procurement": "Procurement",
    "service_sales_marketing": "Sales & Marketing",
    "service_customer_support": "Customer Support",
}

HEAD_TYPE_LABELS = {
    "Finance Head": "Finance",
    "IT Head": "IT",
    "HR Head": "HR",
    "GCC Head": "GCC leadership",
    "Procurement Head": "Procurement",
    "Site Head": "site leadership",
}

SUFFIXES = r"(?:inc|incorporated|llc|llp|ltd|limited|plc|corp|corporation|gmbh|ag|nv|bv|sa|a/s|s\.p\.a|spa|s\.a)\.?"

WORDS = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split()


def num_word(n):
    return WORDS[n] if 0 <= n < len(WORDS) else str(n)


def slugify(name):
    s = name.lower()
    # drop annotations: (Acquired by X), (Merged with Y), (Part of Z), (Formerly W)
    s = re.sub(r"\s*\((?:ac?c?quired|merged|part of|formerly|now|a subsidiary|subsidiary|previously|division)[^)]*\)", "", s)
    s = re.sub(r",?\s+" + SUFFIXES + r"\s*$", "", s)  # drop trailing corporate suffix
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    s = re.sub(r"-{2,}", "-", s)
    return s


def clean(v):
    if v is None:
        return None
    v = str(v).strip()
    if v in ("", "#N/A", "#REF!", "N/A", "-"):
        return None
    return v


def num(v):
    v = clean(v)
    if v is None:
        return None
    try:
        f = float(v)
        return int(f) if f == int(f) else f
    except ValueError:
        return None


def load_sheets(path):
    z = zipfile.ZipFile(path)
    shared = []
    for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si", NS):
        shared.append("".join(t.text or "" for t in si.findall(".//m:t", NS)))
    wb = ET.fromstring(z.read("xl/workbook.xml"))
    names = [s.get("name") for s in wb.findall(".//m:sheet", NS)]
    sheets = {}
    for i, name in enumerate(names, 1):
        try:
            root = ET.fromstring(z.read(f"xl/worksheets/sheet{i}.xml"))
        except KeyError:
            continue
        rows = []
        for row in root.findall(".//m:row", NS):
            vals = {}
            for c in row.findall("m:c", NS):
                ref, t, v = c.get("r"), c.get("t"), c.find("m:v", NS)
                val = v.text if v is not None else None
                if t == "s" and val is not None:
                    val = shared[int(val)]
                vals[re.match(r"[A-Z]+", ref).group()] = val
            rows.append(vals)
        if not rows:
            sheets[name] = []
            continue
        hdr = rows[0]
        sheets[name] = [
            {hdr[k]: v for k, v in r.items() if k in hdr and hdr[k]} for r in rows[1:]
        ]
    return sheets


def band_pretty(v, money=False):
    """'1K - 5K' -> ('1K to 5K', '1,000 to 5,000'); '10Bn - 25Bn' -> '$10Bn to $25Bn'."""
    v = clean(v)
    if v is None:
        return None, None
    v = v.replace("–", "-")
    short = re.sub(r"\s*-\s*", " to ", v)
    if money and not short.startswith("$"):
        short = re.sub(r"(\d[\d,.]*)\s*(Bn|Mn|K)?", lambda m: "$" + m.group(0), short, count=0)
        short = re.sub(r"\$\$", "$", short)
        short = " to ".join("$" + p.lstrip("$") if p[0].isdigit() else p for p in short.split(" to "))

    def expand(tok):
        m = re.fullmatch(r"([\d.]+)\s*K", tok.strip(), re.I)
        if m:
            return f"{int(float(m.group(1)) * 1000):,}"
        return tok.strip()

    long = " to ".join(expand(p) for p in short.replace("$", "").split(" to "))
    return short, long


def employees_pretty(v):
    v = clean(v)
    if v is None:
        return None
    m = re.fullmatch(r">\s*([\d.]+)K", v, re.I)
    if m:
        return f"Over {int(float(m.group(1)) * 1000):,}"
    m = re.fullmatch(r"<\s*([\d.]+)K", v, re.I)
    if m:
        return f"Under {int(float(m.group(1)) * 1000):,}"
    short, long = band_pretty(v)
    return long if long else v


def join_and(items):
    items = list(items)
    if not items:
        return ""
    if len(items) == 1:
        return items[0]
    return ", ".join(items[:-1]) + " and " + items[-1]


def build_company(a, aliases, centers, services, prospects, tech):
    name = a["account_global_legal_name"]
    al = aliases.get(name, {})
    short = clean(al.get("brand_name")) or clean(al.get("short_legal_name")) or name
    slug = slugify(name)

    active = [c for c in centers if clean(c.get("center_status")) == "Active Center"]
    total = len(centers)
    city_counts = Counter(clean(c.get("center_city")) for c in active if clean(c.get("center_city")))
    cities = [c for c, _ in city_counts.most_common()]
    type_counts = Counter(clean(c.get("center_type")) for c in active if clean(c.get("center_type")))
    types = [center_type for center_type, _ in type_counts.most_common()]

    functions = []
    for col, label in SERVICE_LABELS.items():
        if any(clean(s.get(col)) for s in services):
            functions.append(label)

    tools = {clean(t.get("software_in_use")) for t in tech if clean(t.get("software_in_use"))}
    # Categories only ever reach the page; named software/vendors stay gated.
    cat_freq = {}
    for t in tech:
        cat = clean(t.get("software_category"))
        if cat:
            cat_freq[cat] = cat_freq.get(cat, 0) + 1
    categories = sorted(cat_freq, key=lambda c: (-cat_freq[c], c))

    # --- prospects: derive teaser only; names/emails never leave this function
    leaders = [p for p in prospects if clean(p.get("prospect_level")) in LEADER_LEVELS]
    head_types = {clean(p.get("head_type")) for p in leaders}
    depts = [HEAD_TYPE_LABELS[h] for h in HEAD_TYPE_LABELS if h in head_types]
    rank = {lvl: i for i, lvl in enumerate(SENIORITY)}
    # Teaser titles favour the GCC, IT and HR heads before other head types.
    # Within a head type, prefer a prospect whose department matches it
    # (e.g. dept GCC for the GCC Head slot), then the most senior level.
    head_priority = {"GCC Head": 0, "IT Head": 1, "HR Head": 2}
    head_depts = {"GCC Head": ("GCC", "Site"), "IT Head": ("IT",), "HR Head": ("HR",)}
    top = sorted(
        (p for p in leaders if clean(p.get("prospect_title"))),
        key=lambda p: (
            head_priority.get(clean(p.get("head_type")), 9),
            0 if clean(p.get("prospect_department")) in head_depts.get(clean(p.get("head_type")), ()) else 1,
            rank.get(clean(p.get("prospect_level")), 99),
        ),
    )
    titles, seen = [], set()
    for p in top:
        t = clean(p.get("prospect_title"))
        key = clean(p.get("head_type"))
        if key in seen:
            continue
        seen.add(key)
        titles.append({"title": t, "city": clean(p.get("prospect_city")) or "India"})
        if len(titles) == 3:
            break

    years = num(a.get("years_in_india"))
    since = num(a.get("account_first_center_year"))
    hq_bits = [clean(a.get("account_hq_city")), clean(a.get("account_hq_state")), clean(a.get("account_hq_country"))]
    hq = ", ".join(b for b in hq_bits if b)
    industry = ", ".join(
        b for b in [clean(a.get("account_hq_sub_industry")), clean(a.get("account_hq_industry"))] if b
    )
    revenue_short, _ = band_pretty(a.get("account_hq_revenue_range"), money=True)
    hc_short, hc_long = band_pretty(a.get("account_center_employees_range"))
    website = clean(a.get("account_hq_website"))
    if website and not website.startswith("http"):
        website = "https://" + website
    ticker = clean(a.get("account_hq_stock_ticker"))
    ctype = clean(a.get("account_hq_company_type"))
    forbes = num(a.get("account_hq_forbes_2000_rank"))
    fortune = num(a.get("account_hq_fortune_500_rank"))

    n_active, n_cities = len(active), len(cities)
    center_word = "capability center" + ("s" if n_active != 1 else "")
    city_phrase = (
        f"across {num_word(n_cities)} Indian cities" if n_cities > 1 else f"in {cities[0]}" if cities else "in India"
    )
    type_labels = [t.lower().replace("coe", "CoE").replace("r&d", "R&D") for t in types]
    types_lower = join_and(type_labels) or "capability work"
    city_preview = cities[0] if cities else ""
    if n_cities > 1:
        city_preview += f" and {n_cities - 1} additional cities"
    type_preview = type_labels[0] if type_labels else "capability"
    if len(type_labels) > 1:
        type_preview += f" and {len(type_labels) - 1} additional center types"
    department_preview = depts[0] if depts else ""
    if len(depts) > 1:
        department_preview += " and other leadership functions"
    built_over = f", built over {num_word(years)} years" if years and years > 1 else ""

    lede = (
        f"<strong>{short} runs {num_word(n_active)} {center_word} {city_phrase}.</strong> "
        f"{join_and(cities)}, covering {types_lower}{built_over}."
    )
    insight = (
        f"Search elsewhere and you will usually find one {short} office in India. We map "
        f"{num_word(n_active)}, {'across ' + num_word(n_cities) + ' cities, ' if n_cities > 1 else ''}"
        f"each tagged by center type and function. Knowing the whole footprint is what turns a name "
        f"on a list into an account you can plan against."
    ) if n_active > 1 else (
        f"A single {short} center is easy to miss and easier to misread. We track its type, functions "
        f"and the people who run it, so you can decide if it belongs on your target list."
    )
    about_desc = (
        f"{short}'s India footprint covers {join_and(cities) if cities else 'India'}, spanning "
        f"{types_lower}. The centers deliver {join_and(functions[:4]) if functions else 'capability work'} "
        f"for the group's global operations."
    )

    faq = [
        {
            "q": f"How many GCC centers does {short} operate in India?",
            "a": f"{short} operates {n_active} active Global Capability Center site{'s' if n_active != 1 else ''} in India."
            + (f" {num_word(total).capitalize()} are on record in total, including non-operational sites." if total > n_active else ""),
        },
        {
            "q": f"Which Indian cities does {short} have GCC centers in?",
            "a": f"{short}'s India GCC footprint includes {city_preview}." if n_cities > 1 else f"{short}'s India GCC presence is in {cities[0]}." if cities else f"{short}'s center locations are available in the full profile.",
        },
        {
            "q": f"What types of GCC centers does {short} run in India?",
            "a": f"{short} runs {type_preview} centers in India.",
        },
    ]
    if hc_long:
        faq.append({
            "q": f"How many people work at {short}'s India GCCs?",
            "a": f"Aggregate and center-level headcount for {short}'s India operations is available in the full profile.",
            "excludeFromSchema": True,
        })
    if len(leaders) > 0:
        faq.append({
            "q": f"Who leads {short}'s GCC in India?",
            "a": f"Bamboo Reports tracks leaders at {short}'s India centers"
            + (f", across {department_preview}" if depts else "")
            + ". Names and contact details open with a free account.",
            "excludeFromSchema": True,
        })

    display = name if len(name) <= 24 else short
    company = {
        "slug": slug,
        "name": name,
        "shortName": short,
        "displayName": display,
        "website": website,
        "linkedin": clean(a.get("account_hq_linkedin_link")),
        "forbesRank": forbes,
        "fortuneRank": fortune,
        "badges": ["NASSCOM Listed"] if clean(a.get("account_nasscom_status")) == "Yes" else [],
        "h1": f"{short}'s GCC footprint in India",
        "lede": lede,
        "insight": insight,
        "metaTitle": f"{display} GCC in India: Centers, Footprint & Leaders | Bamboo Reports",
        "metaDescription": (
            f"{short} runs {n_active} verified GCC center{'s' if n_active != 1 else ''} "
            + (f"across {n_cities} Indian cities ({', '.join(cities)})" if n_cities > 1 else f"in {cities[0]}" if cities else "in India")
            + f", covering {types_lower}. See the full India footprint, org map and contacts on Bamboo Reports."
        ),
        "stats": {
            "activeCenters": n_active,
            "totalCenters": total,
            "cities": cities,
            "yearsInIndia": years or 0,
            "sinceYear": since or "",
            "headcountBand": hc_short or "N/A",
            "headcountBandLong": hc_long or "not disclosed",
        },
        "centerTypes": types,
        "functions": functions or ["Details in the full profile"],
        "tech": {"tools": len(tools), "categories": len(categories), "categoryList": categories},
        "leaders": {
            "count": len(leaders),
            "departments": join_and(depts) if depts else "the India leadership team",
            "titles": titles,
        },
        "about": {
            "description": about_desc,
            "industry": industry,
            "headquarters": hq,
            "revenueBand": revenue_short,
            "employeesBand": employees_pretty(a.get("account_hq_employee_range")),
            "tickerAndType": ", ".join(b for b in [ticker, ctype] if b) or None,
        },
        "bandCopy": (
            f"Exact center locations, per-center headcount, the technology stack and all "
            f"{num_word(len(leaders))} decision-makers, in one profile."
        ),
        "faq": faq,
        "dateModified": "2026-07-04",
        "lastUpdated": "July 2026",
        "sources": "company filings, LinkedIn, NASSCOM and Bamboo Reports' primary research",
        "confidence": "high",
        "related": [
            {"label": "GCCs in India", "href": "/gcc/"},
            {"label": "Explore India GCCs", "href": "/gcc"},
        ],
        "sponsor": None,
    }
    return company


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: import-accounts.py <xlsx path>")
    sheets = load_sheets(sys.argv[1])
    accounts = sheets["accounts"]
    aliases = {r["account_global_legal_name"]: r for r in sheets.get("alias", []) if r.get("account_global_legal_name")}

    def by_account(rows):
        d = {}
        for r in rows:
            n = clean(r.get("account_global_legal_name"))
            if n:
                d.setdefault(n, []).append(r)
        return d

    centers = by_account(sheets.get("centers", []))
    services = by_account(sheets.get("services", []))
    prospects = by_account(sheets.get("prospects", []))  # archived sheets deliberately ignored
    tech = by_account(sheets.get("tech", []))

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    warnings = []
    for a in accounts:
        name = clean(a.get("account_global_legal_name"))
        if not name:
            continue
        c = build_company(
            a,
            aliases,
            centers.get(name, []),
            services.get(name, []),
            prospects.get(name, []),
            tech.get(name, []),
        )
        override_path = OVERRIDES_DIR / f"{c['slug']}.json"
        if override_path.exists():
            ov = json.loads(override_path.read_text())
            for k, v in ov.items():
                if isinstance(v, dict) and isinstance(c.get(k), dict):
                    c[k].update(v)
                else:
                    c[k] = v
        if c["stats"]["activeCenters"] == 0:
            warnings.append(f"{c['slug']}: no active centers")
        if c["leaders"]["count"] == 0:
            warnings.append(f"{c['slug']}: no leaders tracked")
        if not c["leaders"]["titles"]:
            warnings.append(f"{c['slug']}: no teaser titles")
        out = OUT_DIR / f"{c['slug']}.json"
        out.write_text(json.dumps(c, indent=2, ensure_ascii=False) + "\n")
        print(f"OK   {c['slug']}  (centers {c['stats']['activeCenters']}/{c['stats']['totalCenters']}, "
              f"cities {len(c['stats']['cities'])}, leaders {c['leaders']['count']}, tools {c['tech']['tools']})")

    # safety: no prospect names/emails may appear in any output file
    forbidden = re.compile(r"prospect_full_name|prospect_email|@[a-z0-9.-]+\.(com|in|org|net)", re.I)
    for f in OUT_DIR.glob("*.json"):
        if forbidden.search(f.read_text()):
            sys.exit(f"LEAK CHECK FAILED: {f}")

    if warnings:
        print("\nWarnings:")
        for w in warnings:
            print(" -", w)


if __name__ == "__main__":
    main()
