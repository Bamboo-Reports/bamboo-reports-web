import data from "@/data/gcc-companies.json";
import totals from "@/data/gcc-totals.json";

/**
 * Public GCC company directory. The JSON is generated from the staging
 * workbook by scripts/gcc-companies/export.py and holds only the fields
 * cleared for public pages; everything else stays in the platform.
 */

export type GccCompany = {
  slug: string;
  name: string;
  legalName: string;
  about: string | null;
  category: string;
  industry: string | null;
  subIndustry: string | null;
  hq: { city: string | null; country: string | null };
  ownership: string | null;
  revenueRange: string | null;
  employeeRange: string | null;
  forbes2000Rank: number | null;
  website: string | null;
  linkedin: string | null;
  offerings: string[];
  india: {
    since: number | null;
    firstCity: string | null;
    headcount: string | null;
    primaryCity: string | null;
    cities: { name: string; centres: number }[];
  };
  centreCount: number;
  centreTypes: { type: string; centres: number }[];
  /** Functions across the company's centres, most common first. */
  functions: string[];
  updated: string;
};

/** What a directory card needs; keeps the client bundle small. */
export type GccCompanySummary = {
  slug: string;
  name: string;
  /** Lower-cased name and legal name, so search also finds "Meta Platforms". */
  search: string;
  website: string | null;
  category: string;
  /** HQ country, e.g. "United States". */
  hq: string | null;
  since: number | null;
  headcount: string | null;
  /** Headcount band as a sortable number: 0 for "<50" up to 7 for ">10K". */
  headcountRank: number;
  centres: number;
  cities: { name: string; centres: number }[];
  functions: string[];
};

export const companies = data as GccCompany[];

// India headcount bands, smallest first, as they appear in the workbook.
const HEADCOUNT_BANDS = ["<50", "51 - 100", "101 - 200", "201 - 500", "501 - 1K", "1K - 5K", "5K - 10K", ">10K"];

/**
 * Filter labels that spell out the abbreviations first-time visitors won't
 * know. Cards keep the short form; only the filter options expand.
 */
const LONG_LABELS: Record<string, string> = {
  BFSI: "BFSI: banking, financial services and insurance",
  TTLH: "TTLH: travel, transport, logistics and hospitality",
};

export const longLabel = (value: string) => LONG_LABELS[value] ?? value;

export const getCompany = (slug: string) => companies.find((c) => c.slug === slug);

export const toSummary = (c: GccCompany): GccCompanySummary => ({
  slug: c.slug,
  name: c.name,
  search: `${c.name} ${c.legalName}`.toLowerCase(),
  website: c.website,
  category: c.category,
  hq: c.hq.country,
  since: c.india.since,
  headcount: c.india.headcount,
  headcountRank: c.india.headcount ? HEADCOUNT_BANDS.indexOf(c.india.headcount) : -1,
  centres: c.centreCount,
  cities: c.india.cities,
  functions: c.functions,
});

/** Same-industry companies, largest India footprint first. */
export const relatedCompanies = (c: GccCompany, limit = 3) =>
  companies
    .filter((other) => other.category === c.category && other.slug !== c.slug)
    .sort((a, b) => b.centreCount - a.centreCount)
    .slice(0, limit);

// Bands come from the workbook as "1K - 5K", ">50K", "<50", "10Bn - 25Bn".
const BAND_WORDS: [RegExp, string][] = [
  [/Bn/g, "B"],
  [/Mn/g, "M"],
  [/\s*-\s*/g, "–"],
];

const tidy = (band: string) => BAND_WORDS.reduce((s, [re, to]) => s.replace(re, to), band);

/** "1K - 5K" -> "1K–5K", ">10K" -> "10K+", "<50" -> "Under 50". */
export const formatBand = (band: string | null) => {
  if (!band) return null;
  if (band.startsWith(">")) return `${tidy(band.slice(1))}+`;
  if (band.startsWith("<")) return `Under ${tidy(band.slice(1))}`;
  return tidy(band);
};

/** Revenue bands are in US dollars: "10Bn - 25Bn" -> "$10B–$25B". */
export const formatRevenue = (band: string | null) => {
  const b = formatBand(band);
  if (!b) return null;
  return b.replace(/(\d+(?:\.\d+)?[MB])/g, "$$$1");
};

/** Everything in the Bamboo Reports database, not just this directory. */
export const databaseTotals = totals as { companies: number; centres: number };

export const directoryStats = {
  companies: companies.length,
  centres: companies.reduce((n, c) => n + c.centreCount, 0),
};
