#!/usr/bin/env python3
"""Generate the v2 tracker dataset (Aug 2026 overhaul) from the XLSX export.

Section 2 of the 15 Aug 2026 hackathon doc: the tracker becomes an open,
no-sign-in numbers page. This produces everything the page needs to filter
and show counts:

  - public/data/t2/*.json        chunked account rows (centres, upcoming,
                                 headcount at row level; no prospect data)
  - src/lib/trackerStatsV2.ts    headline totals, top-10 industries, top-5
                                 grouped cities, and the exposure table that
                                 maps every filter combination to its
                                 permitted row count (nothing decided at
                                 run time)

Reads only: accounts (name, industry, classification, type, visibility) and
centers (account, city, type, status, employees). Prospects are gone from
the tracker entirely.

Usage: python3 scripts/tracker/generate-tracker-v2.py [input.xlsx]
"""

import hashlib
import json
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET
import zipfile
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# GCC-ness is decided at the ACCOUNT level (account_type column). Accounts
# marked non-gcc are excluded from the directory entirely.
GCC_ACCOUNT_TYPE = "gcc"

# Acquired/merged parentheticals are stripped from the public display name
# ("AbsolutData (Acquired by Infogain)" -> "AbsolutData"); the full legal name
# is kept internally for sorting and page-slug matching.
NAME_CLUTTER = re.compile(
    r"\s*\((?:ac+quired|merged|now part of|formerly|a subsidiary of)"
    r"[^()]*(?:\([^()]*\)[^()]*)*\)\s*$",
    re.IGNORECASE,
)

# Legal-suffix tokens dropped when hashing private names for gated search.
# Must stay in sync with simplifyCompanyName in src/lib/trackerAccountsV2.ts.
LEGAL_SUFFIXES = {
    "inc", "incorporated", "corp", "corporation", "co", "company", "ltd",
    "limited", "llc", "llp", "lp", "plc", "gmbh", "ag", "sa", "nv", "bv", "pvt",
}


def clean_display_name(name):
    stripped = NAME_CLUTTER.sub("", name).strip()
    return stripped or name


def simplify_company_name(name):
    """Lowercased, punctuation-free name with trailing legal suffixes removed."""
    text = name.lower().replace("&", " and ")
    text = re.sub(r"[^a-z0-9]+", " ", text).strip()
    words = text.split()
    while len(words) > 1 and words[-1] in LEGAL_SUFFIXES:
        words.pop()
    return " ".join(words)


def private_name_hash(name):
    return hashlib.sha256(simplify_company_name(name).encode("utf-8")).hexdigest()[:16]


MAIN_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PACKAGE_REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
NS = {"m": MAIN_NS, "r": REL_NS}


def column_number(cell_reference):
    letters = re.match(r"[A-Z]+", cell_reference).group()
    result = 0
    for letter in letters:
        result = result * 26 + ord(letter) - ord("A") + 1
    return result - 1


def shared_strings(archive):
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []
    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    return [
        "".join(node.text or "" for node in item.findall(".//m:t", NS))
        for item in root.findall("m:si", NS)
    ]


def sheet_paths(archive):
    workbook = ET.fromstring(archive.read("xl/workbook.xml"))
    relationships = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
    targets = {
        relationship.attrib["Id"]: relationship.attrib["Target"]
        for relationship in relationships.findall(f"{{{PACKAGE_REL_NS}}}Relationship")
    }
    result = {}
    for sheet in workbook.findall(".//m:sheet", NS):
        target = targets[sheet.attrib[f"{{{REL_NS}}}id"]]
        result[sheet.attrib["name"]] = target if target.startswith("xl/") else f"xl/{target.lstrip('/')}"
    return result


def read_sheet(archive, path, strings, required_columns, optional_columns=frozenset()):
    root = ET.fromstring(archive.read(path))
    rows = root.findall(".//m:sheetData/m:row", NS)
    if not rows:
        return []

    def values(row, allowed_indexes=None):
        result = {}
        for cell in row.findall("m:c", NS):
            index = column_number(cell.attrib["r"])
            if allowed_indexes is not None and index not in allowed_indexes:
                continue
            value_node = cell.find("m:v", NS)
            value = value_node.text if value_node is not None else ""
            if cell.attrib.get("t") == "s" and value:
                value = strings[int(value)]
            result[index] = value
        return result

    header_values = values(rows[0])
    headers = {value: index for index, value in header_values.items()}
    missing = required_columns - headers.keys()
    if missing:
        raise ValueError(f"{path} is missing required columns: {', '.join(sorted(missing))}")

    columns = set(required_columns) | (set(optional_columns) & headers.keys())
    wanted_indexes = {headers[column] for column in columns}
    records = []
    for row in rows[1:]:
        row_values = values(row, wanted_indexes)
        records.append({column: row_values.get(headers[column], "").strip() for column in columns})
    return records


def account_sort_key(item):
    name = item[0]
    visible_name = "".join(
        character for character in name if unicodedata.category(character) != "Cf"
    ).lstrip()
    first = visible_name[:1]
    if first and not first.isalnum():
        group = 0
    elif first.isdigit():
        group = 1
    else:
        group = 2
    return group, visible_name.casefold()


def published_slugs():
    """name -> slug for companies whose detail page is actually published,
    so the directory table can link them."""
    slugs = {}
    for path in (ROOT / "data" / "gcc" / "companies").glob("*.json"):
        company = json.loads(path.read_text())
        page = ROOT / "public" / "gcc" / "companies" / company["slug"] / "index.html"
        if page.exists():
            slugs[company["name"]] = company["slug"]
            slugs[clean_display_name(company["name"])] = company["slug"]
    return slugs

DEFAULT_INPUT = ROOT / "data" / "tracker-data-v2.xlsx"
OUTPUT_DIR = ROOT / "public" / "data" / "t2"
CHUNK_MANIFEST = ROOT / "src" / "lib" / "trackerAccountChunksV2.ts"
STATS_MODULE = ROOT / "src" / "lib" / "trackerStatsV2.ts"
TAXONOMY_FILE = ROOT / "data" / "gcc" / "taxonomy.json"
CHUNK_COUNT = 8

TOP_INDUSTRIES = 10
# Six cities, closing the "third filter / top 6" open item from the 15 Aug
# hackathon: it was the decision to add Chennai to the city filter.
TOP_CITIES = 6

# ---------------------------------------------------------------------------
# Exposure rule (hackathon doc 2.3). Both numbers are PENDING the Section 6
# lock: the cap was quoted as "20% to 25%" (item 1, Santosh) and the hard cap
# as "10 to 15" (2.3). Conservative ends chosen as defaults; change here and
# regenerate once locked.
EXPOSURE_CAP = 0.20
HARD_ROW_CAP = 15
# ---------------------------------------------------------------------------

# Centre lifecycle (center_status column).
STATUS_ACTIVE = "Active Center"
STATUS_UPCOMING = "Upcoming"
STATUS_NON_OPERATIONAL = "Non Operational"

# The type exclusion applies to HEADCOUNT ONLY: centre and upcoming counts
# take every centre row of a gcc account, any type and any status, while
# center_employees is summed only over centres outside these types.
# Verified against the 17 Aug export (Software & SaaS × Hyderabad ->
# 132 companies, 144 centres, 2 upcoming, 80,898 headcount).
HEADCOUNT_EXCLUDED_TYPES = {"manufacturing", "sales & marketing", "bpo", "distribution"}

# Geography grouping (doc 2.4, incl. the 10 Jul carry-forward adding
# Faridabad and Ghaziabad to NCR). FILTER-ONLY: account rows keep their raw
# city names; the grouping applies to the city filter options, the top-cities
# ranking, and the exposure combos, so a city filter can never isolate a set
# small enough to be lifted in full.
CITY_GROUPS = {
    "Mumbai": "Mumbai MMR",
    "Navi Mumbai": "Mumbai MMR",
    "Thane": "Mumbai MMR",
    "New Delhi": "NCR",
    "Delhi": "NCR",
    "Noida": "NCR",
    "Greater Noida": "NCR",
    "Gurugram": "NCR",
    "Gurgaon": "NCR",
    "Faridabad": "NCR",
    "Ghaziabad": "NCR",
}


def parse_employees(raw):
    value = raw.replace(",", "").strip()
    if not value:
        return 0
    try:
        return int(float(value))
    except ValueError:
        return 0


def main():
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_INPUT



    with zipfile.ZipFile(source) as archive:
        strings = shared_strings(archive)
        paths = sheet_paths(archive)
        accounts = read_sheet(
            archive,
            paths["accounts"],
            strings,
            {
                "account_global_legal_name",
                "account_primary_category",
                "account_type",
                "account_visibility",
            },
            optional_columns={
                "account_note",
                "account_visibility_note",
                "account_industry_classification",
            },
        )
        centers = read_sheet(
            archive,
            paths["centers"],
            strings,
            {"account_global_legal_name", "center_city", "center_status"},
            optional_columns={"center_type", "center_employees"},
        )

    gcc_accounts = [
        record
        for record in accounts
        if record["account_global_legal_name"]
        and record["account_type"].strip().lower() == GCC_ACCOUNT_TYPE
    ]
    dropped = sum(1 for r in accounts if r["account_global_legal_name"]) - len(gcc_accounts)
    if dropped:
        print(f"Excluded {dropped} non-gcc accounts (and their centers)")

    # Exact-name search still explains excluded companies ("Only Manufacturing
    # presence in India") via the same truncated-hash scheme as 
    non_gcc_notes = {}
    for record in accounts:
        name = record["account_global_legal_name"]
        note = (record.get("account_visibility_note") or record.get("account_note", "")).strip()
        if not name or not note:
            continue
        if record["account_type"].strip().lower() == GCC_ACCOUNT_TYPE:
            print(f"Ignoring visibility note on gcc account {name!r}: {note!r}")
            continue
        note = re.sub(r"\s*Presence In India$", " presence in India", note)
        non_gcc_notes[private_name_hash(name)] = note

    # Industry labels are standardized via the shared taxonomy, but the v1
    # per-account overrides (taxonomy.json "accounts") are NOT applied: the
    # 17 Aug export supersedes them — the sheet's tags are the truth.
    taxonomy_data = json.loads(TAXONOMY_FILE.read_text())
    taxonomy = taxonomy_data["industries"]
    industries = {
        record["account_global_legal_name"]: taxonomy.get(
            record["account_primary_category"], record["account_primary_category"]
        )
        for record in gcc_accounts
    }
    hidden_classifications = {"Corporate Services", "Holding Companies", "Personal Services"}
    industry_classifications = defaultdict(set)
    for record in gcc_accounts:
        classification = record.get("account_industry_classification", "").strip()
        if classification and classification not in hidden_classifications:
            industry_classifications[industries[record["account_global_legal_name"]]].add(
                classification
            )

    visibility = {
        record["account_global_legal_name"]: (
            "private"
            if record["account_visibility"].strip().lower() == "private"
            else "public"
        )
        for record in gcc_accounts
    }

    # Per-account aggregation over every centre row of a gcc account:
    #   centres          = all rows, any type, any status
    #   upcoming centres = the Upcoming subset
    #   headcount        = center_employees over rows outside the excluded
    #                      types (the verified counting rule)
    city_centers = defaultdict(Counter)
    city_upcoming = defaultdict(Counter)
    city_employees = defaultdict(Counter)
    center_counts = Counter()
    upcoming_counts = Counter()
    headcounts = Counter()
    blank_city = 0
    for record in centers:
        account = record["account_global_legal_name"]
        if account not in industries:
            continue
        status = record["center_status"].strip()
        city = record["center_city"].strip()
        center_counts[account] += 1
        if city:
            city_centers[account][city] += 1
        else:
            blank_city += 1
        if status == STATUS_UPCOMING:
            upcoming_counts[account] += 1
            if city:
                city_upcoming[account][city] += 1
        if record.get("center_type", "").strip().lower() not in HEADCOUNT_EXCLUDED_TYPES:
            employees = parse_employees(record.get("center_employees", ""))
            headcounts[account] += employees
            if city and employees:
                city_employees[account][city] += employees
    if blank_city:
        print(f"{blank_city} counted centres have no city; they appear in totals but not in city filters")

    slugs = published_slugs()
    tracker_accounts = []
    for account, industry in industries.items():
        is_public = visibility.get(account, "public") == "public"
        # A city entry exists when the account has counted centres there.
        # Upcoming and headcount are subsets of the same counted rows, so
        # they can never name a city the centre count doesn't.
        account_cities = sorted(
            set(city_centers[account]),
            key=lambda city: (-city_centers[account][city], city),
        )
        cities = [
            {
                "name": city,
                "c": city_centers[account][city],
                **({"u": city_upcoming[account][city]} if city_upcoming[account][city] else {}),
                **({"e": city_employees[account][city]} if city_employees[account][city] else {}),
            }
            for city in account_cities
        ]
        tracker_accounts.append(
            {
                "_sort": clean_display_name(account),
                "name": clean_display_name(account) if is_public else None,
                "h": None if is_public else private_name_hash(account),
                "slug": slugs.get(account) if is_public else None,
                "industry": industry or None,
                "cities": cities,
                "c": center_counts[account],
                "u": upcoming_counts[account],
                "e": headcounts[account],
                "visibility": visibility.get(account, "public"),
            }
        )

    tracker_accounts.sort(key=lambda record: account_sort_key((record["_sort"],)))
    for record in tracker_accounts:
        del record["_sort"]
        for optional in ("h", "slug"):
            if record[optional] is None:
                del record[optional]
        if not record["u"]:
            del record["u"]

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for stale in OUTPUT_DIR.glob("*.json"):
        stale.unlink()
    chunk_size = -(-len(tracker_accounts) // CHUNK_COUNT)
    chunk_urls = []
    for index in range(0, len(tracker_accounts), chunk_size):
        chunk = tracker_accounts[index : index + chunk_size]
        payload = json.dumps(chunk, ensure_ascii=False, separators=(",", ":")) + "\n"
        digest = hashlib.sha256(payload.encode("utf-8")).hexdigest()[:16]
        (OUTPUT_DIR / f"{digest}.json").write_text(payload)
        chunk_urls.append(f"/data/t2/{digest}.json")

    manifest_lines = ",\n".join(f'  "{url}"' for url in chunk_urls)
    CHUNK_MANIFEST.write_text(
        "// Generated by scripts/tracker/generate-tracker-v2.py. Do not edit.\n"
        "// Chunks must be fetched in order; accounts are pre-sorted across files.\n"
        f"export const TRACKER_V2_ACCOUNT_CHUNKS = [\n{manifest_lines},\n] as const;\n"
    )

    # Facet rankings. Rows carry raw city names; the ranking and the filter
    # options use grouped names (an account with centres in both Mumbai and
    # Thane counts once for Mumbai MMR).
    group_city = lambda name: CITY_GROUPS.get(name, name)  # noqa: E731
    all_cities = Counter()
    all_industries = Counter()
    for r in tracker_accounts:
        if r["industry"]:
            all_industries[r["industry"]] += 1
        for grouped in {group_city(c["name"]) for c in r["cities"]}:
            all_cities[grouped] += 1
    top_industries = [k for k, _ in all_industries.most_common(TOP_INDUSTRIES)]
    top_cities = [k for k, _ in all_cities.most_common(TOP_CITIES)]

    # The governing exposure table (doc 2.3): every filter combination mapped
    # to its counts and its permitted row count, precomputed. The page shows
    # only what this table allows; nothing is decided at run time.
    def combo(industry, city):
        a = c = u = e = 0
        for r in tracker_accounts:
            if industry and r["industry"] != industry:
                continue
            if city:
                entries = [x for x in r["cities"] if group_city(x["name"]) == city]
                if not entries:
                    continue
                a += 1
                c += sum(x["c"] for x in entries)
                u += sum(x.get("u", 0) for x in entries)
                e += sum(x.get("e", 0) for x in entries)
            else:
                a += 1
                c += r["c"]
                u += r.get("u", 0)
                e += r["e"]
        rows = min(HARD_ROW_CAP, int(a * EXPOSURE_CAP)) if a else 0
        rows = max(rows, 1) if a else 0
        return {"a": a, "c": c, "u": u, "e": e, "rows": rows}

    combos = {
        f"{industry}|{city}": combo(industry, city)
        for industry in [""] + top_industries
        for city in [""] + top_cities
    }

    totals = combos["|"]
    stats = {
        "companies": totals["a"],
        "centers": totals["c"],
        "upcomingCenters": totals["u"],
        "employees": totals["e"],
        "cities": len(all_cities),
        "industries": len(all_industries),
    }

    STATS_MODULE.write_text(
        "// Generated by scripts/tracker/generate-tracker-v2.py. Do not edit.\n"
        "// The v2 tracker dataset: open numbers page, no sign-in (Aug 2026\n"
        "// hackathon, Section 2). Headline totals, top facets, and the\n"
        "// exposure table governing how many rows each filter combination\n"
        "// may display.\n\n"
        f"export const TRACKER_V2_STATS = {json.dumps(stats, indent=2)} as const;\n\n"
        "// PENDING Section 6 locks: exposure cap (20% vs 25%) and hard row\n"
        "// cap (10 vs 15). Regenerate after changing the constants in the\n"
        "// generator; the client only ever reads the precomputed table.\n"
        f"export const TRACKER_V2_EXPOSURE_CAP = {EXPOSURE_CAP} as const;\n"
        f"export const TRACKER_V2_HARD_ROW_CAP = {HARD_ROW_CAP} as const;\n\n"
        f"export const TRACKER_V2_TOP_INDUSTRIES = {json.dumps(top_industries)} as const;\n\n"
        f"export const TRACKER_V2_TOP_CITIES = {json.dumps(top_cities)} as const;\n\n"
        "// Raw export city -> grouped filter city (Mumbai MMR, NCR).\n"
        f"export const TRACKER_V2_CITY_GROUPS: Record<string, string> =\n"
        f"  {json.dumps(CITY_GROUPS, separators=(',', ':'))};\n\n"
        '// Governing table, key "industry|city" (empty segment = any):\n'
        "// a=companies, c=centres, u=upcoming centres, e=headcount,\n"
        "// rows=permitted directory rows for that combination.\n"
        "export const TRACKER_V2_EXPOSURE: Record<string, { a: number; c: number; u: number; e: number; rows: number }> =\n"
        f"  {json.dumps(combos, separators=(',', ':'))};\n\n"
        "// Excluded non-gcc accounts, keyed by truncated simplified-name hash\n"
        "// (search explains exclusions without shipping the list).\n"
        "export const TRACKER_V2_NON_GCC_NOTES: Record<string, string> =\n"
        f"  {json.dumps(non_gcc_notes, separators=(',', ':'), ensure_ascii=False)};\n\n"
        "// Sub-classifications per industry label (filter hover detail).\n"
        "export const TRACKER_V2_INDUSTRY_CLASSIFICATIONS: Record<string, string[]> =\n"
        f"  {json.dumps({k: sorted(v) for k, v in sorted(industry_classifications.items())}, separators=(',', ':'), ensure_ascii=False)};\n"
    )

    print(f"Wrote {len(tracker_accounts)} accounts across {len(chunk_urls)} chunks to {OUTPUT_DIR}")
    print(f"Headline: {stats['companies']:,} companies, {stats['centers']:,} centres, "
          f"{stats['upcomingCenters']:,} upcoming, {stats['employees']:,} employees")
    print(f"Top industries: {top_industries}")
    print(f"Top cities: {top_cities}")


if __name__ == "__main__":
    main()
