"""Export the public GCC company directory data from the staging workbook.

Reads the proprietary staging workbook (never committed; *.xlsx is
gitignored) and writes src/data/gcc-companies.json with only the fields
cleared for public pages: company facts and India rollups (cities, centre
types, functions). Anything not copied here stays in the platform, including
centre-by-centre rows, source links, phone numbers, addresses, headcounts per
centre, detailed function lists, regions served, the tech stack and contacts.

Usage:
    uv run --no-project --with pandas --with openpyxl \
        python -I scripts/gcc-companies/export.py gcc-data-staging.xlsx
"""

import json
import re
import sys
import warnings
from pathlib import Path

import pandas as pd

warnings.filterwarnings("ignore")  # openpyxl warns about malformed date cells

ROOT = Path(__file__).resolve().parents[2]
PICKS = ROOT / "scripts/gcc-companies/picks.csv"
OUT = ROOT / "src/data/gcc-companies.json"
TOTALS = ROOT / "src/data/gcc-totals.json"

# Legal suffixes dropped from display names ("3M Co." -> "3M").
SUFFIX = re.compile(
    r"(,?\s+(Inc\.?|Incorporated|Corp\.?|Corporation|Co\.?|Company|plc|PLC|Ltd\.?|Limited|LLC|L\.P\.|LP|"
    r"AG|SE|S\.A\.|SA|N\.V\.|NV|B\.V\.|A/S|ASA|AB|Abp|Oyj|GmbH|KGaA|S\.p\.A\.|Holdings?|Group|"
    r"& Co\.|and Co\.|Services))+$"
)
OWNERSHIP = {"Public": "Public", "Private": "Private", "Subsidiary": "Subsidiary"}
FUNCTIONS = {
    "IT": "IT",
    "AI": "AI",
    "ER&D": "Engineering R&D",
    "FnA": "Finance & Accounting",
    "HR": "HR",
    "Procurement & Supply Chain": "Procurement & Supply Chain",
    "Sales & Marketing": "Sales & Marketing",
    "Customer Support": "Customer Support",
}
# Names people search for, where the legal name reads differently.
NAMES = {
    "A.P. Moller Maersk A/S": "Maersk", "American International Group, Inc.": "AIG", "Amazon.com, Inc.": "Amazon",
    "Amadeus IT Group, S.A.": "Amadeus", "Anheuser-Busch InBev S.A./N.V.": "AB InBev", "Alphabet Inc.": "Google (Alphabet)",
    "Bayerische Motoren Werke AG": "BMW", "Becton, Dickinson and Co.": "BD (Becton, Dickinson)",
    "Booking Holdings Inc.": "Booking Holdings", "Commonwealth Bank of Australia ABN": "Commonwealth Bank of Australia",
    "Cognizant Technology Solutions Corp.": "Cognizant", "Credit Agricole Corporate and Investment Bank, S.A.": "Crédit Agricole CIB",
    "F. Hoffmann-La Roche Ltd.": "Roche", "FMR LLC": "Fidelity Investments", "Fidelity National Information Services, Inc.": "FIS",
    "GlaxoSmithKline plc": "GSK", "GlobalFoundries U.S. Inc.": "GlobalFoundries", "Halliburton Energy Services, Inc.": "Halliburton",
    "Harman International Industries Inc.": "Harman", "International Business Machines Corp.": "IBM",
    "Jones Lang LaSalle Inc.": "JLL", "Koninklijke Philips N.V.": "Philips", "McKinsey & Company, Inc.": "McKinsey & Company",
    "Lowe's Companies, Inc.": "Lowe's", "Telefonaktiebolaget LM Ericsson": "Ericsson", "Saudi Arabian Oil Co.": "Saudi Aramco",
    "Hon Hai Precision Industry Co., Ltd.": "Foxconn (Hon Hai)", "Inter IKEA Systems B.V.": "IKEA", "Ford Motor Co.": "Ford",
    "Merck K.G.a.A.": "Merck KGaA", "Qualcomm Technologies, Inc.": "Qualcomm", "Verizon Communications Inc.": "Verizon",
    "Allstate Insurance Co.": "Allstate", "Point72, L.P.": "Point72", "Advanced Micro Devices, Inc.": "AMD",
    "DHL International GmbH": "DHL", "Franklin Resources, Inc.": "Franklin Templeton", "London Stock Exchange Group plc": "LSEG",
    "ManpowerGroup Global Inc.": "ManpowerGroup", "Groupe SII": "SII", "Carlsberg Breweries A/S": "Carlsberg",
    "Coca Cola Co.": "Coca-Cola", "The Coca Cola Co.": "Coca-Cola", "Kimberly Clark Corp.": "Kimberly-Clark",
}


def text(v):
    if v is None or (isinstance(v, float) and pd.isna(v)):
        return None
    s = str(v).strip()
    return s or None


def year(v):
    try:
        return int(float(v)) if text(v) else None
    except ValueError:
        return None


def display_name(legal):
    name = re.sub(r"\s*\(.*?\)", "", legal).strip()
    name = re.sub(r"^The\s+", "", name)
    prev = None
    while prev != name:
        prev, name = name, SUFFIX.sub("", name).strip(" ,")
    return name or legal


def slugify(s):
    s = s.lower().replace("&", " and ").replace("'", "")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def url(v):
    v = text(v)
    if not v:
        return None
    v = v.split()[0]
    return v if v.startswith("http") else f"https://{v}"


def main(xlsx):
    xl = pd.ExcelFile(xlsx)
    accounts = xl.parse("accounts").set_index("uuid")
    # Every centre counts: active, upcoming and closed.
    centres = xl.parse("centers")
    picks = pd.read_csv(PICKS)

    companies, slugs = [], set()
    for uuid in picks.uuid:
        a = accounts.loc[uuid]
        legal = a.account_global_legal_name
        cs = centres[centres.account_global_legal_name == legal]
        name = NAMES.get(legal) or display_name(legal)
        slug = slugify(name)
        assert slug not in slugs, f"duplicate slug {slug}"
        slugs.add(slug)

        # Company-level rollups only. Centre-by-centre rows (area, opening
        # year, headcount, functions) stay in the platform.
        cities = cs.center_city.value_counts()
        types = cs.center_type.value_counts()
        function_counts = pd.Series(
            [FUNCTIONS[f.strip()] for v in cs.center_services.dropna() for f in str(v).split(",") if f.strip() in FUNCTIONS],
            dtype=object,
        ).value_counts()
        first = cs.dropna(subset=["center_inc_year"]).sort_values("center_inc_year").head(1)
        best_rank = pd.Series([a.account_hq_forbes_2000_rank]).dropna()

        companies.append({
            "slug": slug,
            "name": name,
            "legalName": legal,
            "about": text(a.account_about),
            "category": a.account_primary_category,
            "industry": text(a.account_hq_industry),
            "subIndustry": text(a.account_hq_sub_industry),
            "hq": {"city": text(a.account_hq_city), "country": text(a.account_hq_country)},
            "ownership": OWNERSHIP.get(text(a.account_hq_company_type)),
            "revenueRange": text(a.account_hq_revenue_range),
            "employeeRange": text(a.account_hq_employee_range),
            "forbes2000Rank": int(best_rank.iloc[0]) if len(best_rank) else None,
            "website": url(a.account_hq_website),
            "linkedin": url(a.account_hq_linkedin_link),
            "offerings": [o.strip() for o in (text(a.account_hq_key_offerings) or "").split("\n") if o.strip()][:8],
            "india": {
                "since": year(first.center_inc_year.iloc[0]) if len(first) else year(a.account_first_center_year),
                "firstCity": first.center_city.iloc[0] if len(first) else None,
                "headcount": text(a.account_center_employees_range),
                "primaryCity": cities.index[0] if len(cities) else text(a.account_primary_city),
                "cities": [{"name": k, "centres": int(v)} for k, v in cities.items()],
            },
            "centreCount": len(cs),
            "centreTypes": [{"type": k, "centres": int(v)} for k, v in types.items()],
            "functions": list(function_counts.index),
            "updated": str(pd.Timestamp(a.account_last_update_date).date()),
        })

    # Database-wide totals the directory counts itself against ("350 of 2,493").
    TOTALS.write_text(json.dumps({
        # Accounts marked "exclude" are cleanup leftovers, not part of the database.
        "companies": int((accounts.account_visibility == "include").sum()),
        "centres": int(len(centres)),
    }) + "\n")

    companies.sort(key=lambda c: c["name"].lower())
    OUT.write_text(json.dumps(companies, ensure_ascii=False, separators=(",", ":")) + "\n")
    print(f"wrote {len(companies)} companies, {sum(c['centreCount'] for c in companies)} centres -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else str(ROOT / "gcc-data-staging.xlsx"))
