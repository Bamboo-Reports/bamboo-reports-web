#!/usr/bin/env python3
"""Generate the tracker account directory from a restricted XLSX export.

Only the account name, industry, and center city columns are read. Prospect
records and contact data are deliberately excluded from the public artifact.

The output is split into hash-named chunk files under public/data/t/ so the
full dataset has no single obvious URL. The chunk list is written to
src/lib/trackerAccountChunks.ts, which the app imports at build time.
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
DEFAULT_INPUT = ROOT / "data" / "data-structs.xlsx"
DEFAULT_OUTPUT_DIR = ROOT / "public" / "data" / "t"
CHUNK_MANIFEST = ROOT / "src" / "lib" / "trackerAccountChunks.ts"
STATS_MODULE = ROOT / "src" / "lib" / "trackerStats.ts"
TAXONOMY_FILE = ROOT / "data" / "gcc" / "taxonomy.json"
CHUNK_COUNT = 8
TOP_FACETS = 10

# Shared GCC-center rules (same definition as the company-page importer).
sys.path.insert(0, str(ROOT / "scripts"))
from gcc_rules import ACTIVE_CENTER_STATUS, gcc_centers  # noqa: E402

# Acquired/merged parentheticals are stripped from the public display name
# ("AbsolutData (Acquired by Infogain)" -> "AbsolutData"); the full legal name
# is kept internally for sorting and page-slug matching.
NAME_CLUTTER = re.compile(
    r"\s*\((?:ac+quired|merged|now part of|formerly|a subsidiary of)"
    r"[^()]*(?:\([^()]*\)[^()]*)*\)\s*$",
    re.IGNORECASE,
)

# Legal-suffix tokens dropped when hashing private names for gated search.
# Must stay in sync with simplifyCompanyName in src/lib/trackerAccounts.ts.
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

# Canary records: fictitious accounts seeded into the public directory so a
# wholesale copy of our list is provably ours (these names exist nowhere else).
# Keep this list short and stable; do NOT give them company detail pages.
CANARY_ACCOUNTS = [
    {
        "name": "Veltrix Grid Systems, Inc.",
        "industry": "Hi-Tech",
        "cities": [{"name": "Bengaluru", "centerCount": 1}],
        "centerCount": 1,
        "siteCount": 1,
        "prospectCount": 4,
        "visibility": "public",
    },
    {
        "name": "Northgate Dynamics Corp.",
        "industry": "Industrial",
        "cities": [{"name": "Pune", "centerCount": 1}],
        "centerCount": 1,
        "siteCount": 1,
        "prospectCount": 3,
        "visibility": "public",
    },
    {
        "name": "Halvern & Roche Group",
        "industry": "Professional Services",
        "cities": [{"name": "Mumbai", "centerCount": 1}],
        "centerCount": 1,
        "siteCount": 1,
        "prospectCount": 5,
        "visibility": "public",
    },
]

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
    so the hydrated directory table can link them (the prerendered HTML and
    directory pages carry the same links server-side for crawlers)."""
    slugs = {}
    for path in (ROOT / "data" / "gcc" / "companies").glob("*.json"):
        company = json.loads(path.read_text())
        page = ROOT / "public" / "gcc" / "companies" / company["slug"] / "index.html"
        if page.exists():
            slugs[company["name"]] = company["slug"]
            slugs[clean_display_name(company["name"])] = company["slug"]
    return slugs


def main():
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_INPUT
    output_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUTPUT_DIR

    with zipfile.ZipFile(source) as archive:
        strings = shared_strings(archive)
        paths = sheet_paths(archive)
        accounts = read_sheet(
            archive,
            paths["accounts"],
            strings,
            {"account_global_legal_name", "account_primary_category", "account_visibility"},
        )
        centers = read_sheet(
            archive,
            paths["centers"],
            strings,
            {"account_global_legal_name", "center_city"},
            optional_columns={"center_type", "center_status"},
        )
        prospects = read_sheet(
            archive,
            paths["prospects"],
            strings,
            {"account_global_legal_name"},
        )

    # Standardized industry labels shared with the landing pages and company
    # pages (data/gcc/taxonomy.json); unmapped raw values pass through.
    # Per-account corrections (wrong tags awaiting a warehouse fix) win over
    # the exported value.
    taxonomy_data = json.loads(TAXONOMY_FILE.read_text())
    taxonomy = taxonomy_data["industries"]
    account_fixes = taxonomy_data.get("accounts", {})
    industries = {
        record["account_global_legal_name"]: account_fixes.get(
            record["account_global_legal_name"],
            taxonomy.get(record["account_primary_category"], record["account_primary_category"]),
        )
        for record in accounts
        if record["account_global_legal_name"]
    }
    visibility = {
        record["account_global_legal_name"]: (
            "private"
            if record["account_visibility"].strip().lower() == "private"
            else "public"
        )
        for record in accounts
        if record["account_global_legal_name"]
    }
    # Same true-GCC center definition as the company pages: drop non-GCC types
    # (manufacturing/sales/distribution) from the counts, falling back to the
    # full set when a company has ONLY non-GCC centers. Requires center_type in
    # the export; without it we keep everything and warn, so the directory can
    # disagree with the company pages until the column is re-exported.
    has_type = bool(centers) and "center_type" in centers[0]
    has_status = bool(centers) and "center_status" in centers[0]
    if not has_type:
        print(
            "WARNING: centers sheet has no center_type column; counting ALL "
            "centers. Directory counts will not match company pages until the "
            "export includes center_type.",
            file=sys.stderr,
        )
    # siteCount is every facility on record (all types and statuses, incl.
    # manufacturing/sales and upcoming/non-operational sites), surfaced as
    # "across N total sites tracked" context next to the GCC metric.
    site_counts = Counter(
        record["account_global_legal_name"]
        for record in centers
        if record["account_global_legal_name"] and record["center_city"]
    )

    # centerCount/cities follow the true-GCC rule over active centers only.
    if has_status:
        centers = [c for c in centers if c["center_status"] == ACTIVE_CENTER_STATUS]

    centers_by_account = defaultdict(list)
    for record in centers:
        if record["account_global_legal_name"] and record["center_city"]:
            centers_by_account[record["account_global_legal_name"]].append(record)

    city_counts = defaultdict(Counter)
    for account, records in centers_by_account.items():
        if has_type:
            records = gcc_centers(records, lambda c: c.get("center_type", "").strip())
        for record in records:
            city_counts[account][record["center_city"]] += 1
    prospect_counts = Counter(
        record["account_global_legal_name"]
        for record in prospects
        if record["account_global_legal_name"]
    )

    # Private accounts contribute to the aggregate counts but their identity
    # never leaves the server: ship them name-stripped (industry + cities +
    # counts only) so scrapers cannot read private names from the payload.
    # Each private record carries `h`, a truncated hash of the simplified
    # name, so the search box can say "tracked, sign up to unlock" on an
    # exact-name query without revealing the private list.
    slugs = published_slugs()
    tracker_accounts = [
        {
            "_sort": clean_display_name(account),
            "name": clean_display_name(account) if visibility.get(account, "public") == "public" else None,
            "h": private_name_hash(account) if visibility.get(account, "public") == "private" else None,
            "slug": slugs.get(account) if visibility.get(account, "public") == "public" else None,
            "industry": industry or None,
            "cities": [
                {"name": city, "centerCount": count}
                for city, count in sorted(
                    city_counts[account].items(),
                    key=lambda item: (-item[1], item[0]),
                )
            ],
            "centerCount": sum(city_counts[account].values()),
            "siteCount": site_counts[account],
            "prospectCount": prospect_counts[account],
            "visibility": visibility.get(account, "public"),
        }
        for account, industry in sorted(industries.items(), key=account_sort_key)
    ]

    # Sort canaries into place alphabetically so they are indistinguishable
    # from real records in the payload. Private records sort by their real
    # name (via _sort) even though the published name is null.
    tracker_accounts.extend({**canary, "_sort": canary["name"]} for canary in CANARY_ACCOUNTS)
    tracker_accounts.sort(key=lambda record: account_sort_key((record["_sort"],)))
    for record in tracker_accounts:
        del record["_sort"]
        for optional in ("h", "slug"):
            if record.get(optional) is None:
                record.pop(optional, None)

    output_dir.mkdir(parents=True, exist_ok=True)
    for stale in output_dir.glob("*.json"):
        stale.unlink()

    chunk_size = -(-len(tracker_accounts) // CHUNK_COUNT)
    chunk_urls = []
    for index in range(0, len(tracker_accounts), chunk_size):
        chunk = tracker_accounts[index : index + chunk_size]
        payload = json.dumps(chunk, ensure_ascii=False, separators=(",", ":")) + "\n"
        digest = hashlib.sha256(payload.encode("utf-8")).hexdigest()[:16]
        (output_dir / f"{digest}.json").write_text(payload)
        chunk_urls.append(f"/data/t/{digest}.json")

    manifest_lines = ",\n".join(f'  "{url}"' for url in chunk_urls)
    CHUNK_MANIFEST.write_text(
        "// Generated by scripts/tracker/generate-static-accounts.py. Do not edit.\n"
        "// Chunks must be fetched in order; accounts are pre-sorted across files.\n"
        f"export const TRACKER_ACCOUNT_CHUNKS = [\n{manifest_lines},\n] as const;\n"
    )

    # Build-time stats module: the single source for every count shown in copy
    # (tracker hero, meta descriptions, prerender, homepage stats band) so the
    # numbers can never drift between surfaces.
    browsable = [r for r in tracker_accounts if r["visibility"] == "public" and r["name"]]
    all_cities = Counter()
    all_industries = Counter()
    for r in tracker_accounts:
        if r["industry"]:
            all_industries[r["industry"]] += 1
        for c in r["cities"]:
            all_cities[c["name"]] += 1
    top_industries = [k for k, _ in all_industries.most_common(TOP_FACETS)]
    top_cities = [k for k, _ in all_cities.most_common(TOP_FACETS)]

    def combo(industry, city):
        a = c = p = 0
        for r in tracker_accounts:
            if industry and r["industry"] != industry:
                continue
            if city:
                in_city = sum(x["centerCount"] for x in r["cities"] if x["name"] == city)
                if not in_city:
                    continue
                a, c, p = a + 1, c + in_city, p + r["prospectCount"]
            else:
                a, c, p = a + 1, c + r["centerCount"], p + r["prospectCount"]
        return {"a": a, "c": c, "p": p}

    combos = {
        f"{industry}|{city}": combo(industry, city)
        for industry in [""] + top_industries
        for city in [""] + top_cities
    }
    stats = {
        "accountsTracked": len(tracker_accounts),
        "accountsBrowsable": len(browsable),
        "centers": sum(r["centerCount"] for r in tracker_accounts),
        "sites": sum(r["siteCount"] for r in tracker_accounts),
        "decisionMakers": sum(r["prospectCount"] for r in tracker_accounts),
        "cities": len(all_cities),
        "industries": len(all_industries),
    }
    STATS_MODULE.write_text(
        "// Generated by scripts/tracker/generate-static-accounts.py. Do not edit.\n"
        "// Exact directory totals plus tracked counts for the top industry/city\n"
        '// combinations (key "industry|city", empty segment = any).\n'
        f"export const TRACKER_STATS = {json.dumps(stats, indent=2)} as const;\n\n"
        f"export const TRACKER_TOP_INDUSTRIES = {json.dumps(top_industries)} as const;\n\n"
        f"export const TRACKER_TOP_CITIES = {json.dumps(top_cities)} as const;\n\n"
        "export const TRACKER_COMBOS: Record<string, { a: number; c: number; p: number }> =\n"
        f"  {json.dumps(combos, separators=(',', ':'))};\n"
    )
    print(f"Wrote {len(tracker_accounts)} accounts across {len(chunk_urls)} chunks to {output_dir}")
    print(f"Chunk manifest written to {CHUNK_MANIFEST}")
    print(f"Stats module written to {STATS_MODULE}")


if __name__ == "__main__":
    main()
