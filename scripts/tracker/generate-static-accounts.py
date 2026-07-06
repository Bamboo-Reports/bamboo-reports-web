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
DEFAULT_INPUT = ROOT / "data" / "data.xlsx"
DEFAULT_OUTPUT_DIR = ROOT / "public" / "data" / "t"
CHUNK_MANIFEST = ROOT / "src" / "lib" / "trackerAccountChunks.ts"
CHUNK_COUNT = 8

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


def read_sheet(archive, path, strings, required_columns):
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

    required_indexes = {headers[column] for column in required_columns}
    records = []
    for row in rows[1:]:
        row_values = values(row, required_indexes)
        records.append({column: row_values.get(headers[column], "").strip() for column in required_columns})
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
            {"account_global_legal_name", "account_primary_category"},
        )
        centers = read_sheet(
            archive,
            paths["centers"],
            strings,
            {"account_global_legal_name", "center_city"},
        )
        prospects = read_sheet(
            archive,
            paths["prospects"],
            strings,
            {"account_global_legal_name"},
        )

    industries = {
        record["account_global_legal_name"]: record["account_primary_category"]
        for record in accounts
        if record["account_global_legal_name"]
    }
    city_counts = defaultdict(Counter)
    for record in centers:
        account = record["account_global_legal_name"]
        city = record["center_city"]
        if account and city:
            city_counts[account][city] += 1
    prospect_counts = Counter(
        record["account_global_legal_name"]
        for record in prospects
        if record["account_global_legal_name"]
    )

    public_accounts = [
        {
            "name": account,
            "industry": industry or None,
            "cities": [
                {"name": city, "centerCount": count}
                for city, count in sorted(
                    city_counts[account].items(),
                    key=lambda item: (-item[1], item[0]),
                )
            ],
            "centerCount": sum(city_counts[account].values()),
            "prospectCount": prospect_counts[account],
        }
        for account, industry in sorted(industries.items(), key=account_sort_key)
    ]

    output_dir.mkdir(parents=True, exist_ok=True)
    for stale in output_dir.glob("*.json"):
        stale.unlink()

    chunk_size = -(-len(public_accounts) // CHUNK_COUNT)
    chunk_urls = []
    for index in range(0, len(public_accounts), chunk_size):
        chunk = public_accounts[index : index + chunk_size]
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
    print(f"Wrote {len(public_accounts)} accounts across {len(chunk_urls)} chunks to {output_dir}")
    print(f"Chunk manifest written to {CHUNK_MANIFEST}")


if __name__ == "__main__":
    main()
