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

# GCC-ness is decided at the ACCOUNT level (account_type column): every center
# row of a gcc account counts, regardless of center_type or status. Accounts
# marked non-gcc are excluded from the directory entirely, along with their
# centers and prospects.
GCC_ACCOUNT_TYPE = "gcc"

# Strict per-company count (same two conditions as the company pages: active
# centers, non-GCC types dropped) shipped alongside the account-level count.
# The tracker shows it when a single company is explicitly selected, so the
# drill-down matches that company's public page.
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
            {
                "account_global_legal_name",
                "account_primary_category",
                "account_type",
                "account_visibility",
            },
            optional_columns={"account_note", "account_visibility_note", "account_industry_classification"},
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

    # Only gcc-type accounts enter the directory; their centers and prospects
    # are counted in full. Non-gcc accounts (and everything under them) are
    # dropped here so no downstream surface can disagree on the definition.
    gcc_accounts = [
        record
        for record in accounts
        if record["account_global_legal_name"]
        and record["account_type"].strip().lower() == GCC_ACCOUNT_TYPE
    ]
    dropped = sum(1 for r in accounts if r["account_global_legal_name"]) - len(gcc_accounts)
    if dropped:
        print(f"Excluded {dropped} non-gcc accounts (and their centers/prospects)")

    # Non-gcc accounts never enter the directory, but an exact-name search can
    # explain why (e.g. "Only Manufacturing presence in India"). Keyed by the
    # same truncated name hash as gated search so the excluded list is not
    # readable from the payload.
    non_gcc_notes = {}
    for record in accounts:
        name = record["account_global_legal_name"]
        note = (record.get("account_visibility_note") or record.get("account_note", "")).strip()
        if not name or not note:
            continue
        if record["account_type"].strip().lower() == GCC_ACCOUNT_TYPE:
            print(f"Ignoring visibility note on gcc account {name!r}: {note!r}")
            continue
        # Warehouse glitch glues the words together ("ManufacturingPresence").
        note = re.sub(r"\s*Presence In India$", " presence in India", note)
        non_gcc_notes[private_name_hash(name)] = note

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
        for record in gcc_accounts
    }
    # Sub-classifications per standardized industry label, shown as hover
    # detail on the tracker's industry filter options. Generic catch-all
    # labels are excluded from the display.
    hidden_classifications = {"Corporate Services", "Holding Companies", "Personal Services"}
    industry_classifications = defaultdict(set)
    for record in gcc_accounts:
        classification = record.get("account_industry_classification", "").strip()
        if classification and classification not in hidden_classifications:
            industry_classifications[industries[record["account_global_legal_name"]]].add(classification)

    visibility = {
        record["account_global_legal_name"]: (
            "private"
            if record["account_visibility"].strip().lower() == "private"
            else "public"
        )
        for record in gcc_accounts
    }

    # Every center row of a gcc account counts (any type, any status): the
    # account-level flag is the single GCC definition.
    city_counts = defaultdict(Counter)
    centers_by_account = defaultdict(list)
    for record in centers:
        account = record["account_global_legal_name"]
        if account in industries and record["center_city"]:
            city_counts[account][record["center_city"]] += 1
            centers_by_account[account].append(record)

    # Strict count per account, mirroring the company-page pipeline exactly.
    strict_counts = {}
    has_rule_columns = bool(centers) and "center_type" in centers[0] and "center_status" in centers[0]
    if has_rule_columns:
        for account, records in centers_by_account.items():
            active = [r for r in records if r["center_status"] == ACTIVE_CENTER_STATUS]
            strict_counts[account] = len(
                gcc_centers(active, lambda c: c.get("center_type", "").strip())
            )
    else:
        print(
            "WARNING: centers sheet has no center_type/center_status columns; "
            "strict per-company counts fall back to the account-level count.",
            file=sys.stderr,
        )
    prospect_counts = Counter(
        record["account_global_legal_name"]
        for record in prospects
        if record["account_global_legal_name"] in industries
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
            "gccCenterCount": strict_counts.get(account),
            "prospectCount": prospect_counts[account],
            "visibility": visibility.get(account, "public"),
        }
        for account, industry in industries.items()
    ]

    # Sort by the cleaned display name (private records sort by their real
    # name via _sort even though the published name is null).
    tracker_accounts.sort(key=lambda record: account_sort_key((record["_sort"],)))
    for record in tracker_accounts:
        del record["_sort"]
        for optional in ("h", "slug"):
            if record.get(optional) is None:
                record.pop(optional, None)
        # Omitted when it matches the account-level count; the client falls
        # back to centerCount.
        if record["gccCenterCount"] is None or record["gccCenterCount"] == record["centerCount"]:
            record.pop("gccCenterCount")

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
        f"  {json.dumps(combos, separators=(',', ':'))};\n\n"
        "// Excluded non-gcc accounts, keyed by the truncated hash of the\n"
        "// simplified name (same scheme as gated search): search shows the note\n"
        "// on an exact-name match without shipping the excluded list.\n"
        "export const TRACKER_NON_GCC_NOTES: Record<string, string> =\n"
        f"  {json.dumps(non_gcc_notes, separators=(',', ':'), ensure_ascii=False)};\n\n"
        "// Sub-classifications per industry label, shown on hover in the\n"
        "// tracker's industry filter.\n"
        "export const TRACKER_INDUSTRY_CLASSIFICATIONS: Record<string, string[]> =\n"
        f"  {json.dumps({k: sorted(v) for k, v in sorted(industry_classifications.items())}, separators=(',', ':'), ensure_ascii=False)};\n"
    )
    print(f"Wrote {len(tracker_accounts)} accounts across {len(chunk_urls)} chunks to {output_dir}")
    print(f"Chunk manifest written to {CHUNK_MANIFEST}")
    print(f"Stats module written to {STATS_MODULE}")


if __name__ == "__main__":
    main()
