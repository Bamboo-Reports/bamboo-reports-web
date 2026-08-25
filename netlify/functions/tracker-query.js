// Server-side tracker query. Answers one filter combination at a time and
// returns only the rows the exposure cap permits, so the full dataset never
// crosses the wire. Mirrors the client logic in src/pages/Tracker.tsx exactly;
// the two must stay in sync while VITE_TRACKER_SERVER_QUERY can be toggled.
//
// The dataset lives under netlify/functions/_data/ and is bundled into this
// function by esbuild — it is NOT published to /data, which is the point.
import DATASET from "./_data/tracker-v2-accounts.json";

const { accounts, meta } = DATASET;
const {
  topIndustries,
  topCities,
  cityGroups,
  exposureCap,
  hardRowCap,
  nonGccNotes,
} = meta;

// Type-ahead is the one field that returns names the caller did not already
// know, so it is the enumeration surface: iterate prefixes and you rebuild the
// public list. Narrower prefix + fewer hits raises that cost; only exact-match
// search would remove it outright, at the price of losing type-ahead.
const MAX_SUGGESTIONS = 5;
const MIN_SUGGEST_LENGTH = 4;
/** The hash lookup still answers from 2 characters — it reveals nothing the
 * caller has not already named. */
const MIN_SEARCH_LENGTH = 2;
/** Multi-select filters are bounded so a single request can't ask for everything. */
const MAX_FILTER_VALUES = 25;

const groupCity = (name) => cityGroups[name] ?? name;

/** Permitted directory rows for a matching set — the generator's rule. */
const permittedRowsFor = (matchCount) =>
  matchCount === 0
    ? 0
    : Math.min(hardRowCap, Math.max(1, Math.floor(matchCount * exposureCap)));

const json = (status, body, extraHeaders = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      // Per-viewer answers; a shared cache must not fan one response out.
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });

/** Accepts a string array, trims, dedupes, and bounds the length. */
const cleanList = (value) => {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  for (const entry of value) {
    if (typeof entry !== "string") continue;
    const trimmed = entry.trim();
    if (trimmed) seen.add(trimmed);
    if (seen.size >= MAX_FILTER_VALUES) break;
  }
  return [...seen];
};

const matchesFilters = (account, filters, ignored) => {
  if (filters.company !== null) return account.name === filters.company;
  const matchesIndustry =
    ignored === "industry" ||
    filters.industries.length === 0 ||
    (account.industry !== null && filters.industries.includes(account.industry));
  const matchesCity =
    ignored === "city" ||
    filters.cities.length === 0 ||
    account.cities.some((city) => filters.cities.includes(groupCity(city.name)));
  return matchesIndustry && matchesCity;
};

/** City-filtered metrics: with cities selected, centres/upcoming/headcount are
 * those cities' share. Cities are disjoint per centre, so the sum stays exact. */
const rowMetrics = (account, cities) => {
  if (cities.length === 0) {
    return { centers: account.c, upcoming: account.u ?? 0, employees: account.e };
  }
  return account.cities.reduce(
    (sums, city) =>
      cities.includes(groupCity(city.name))
        ? {
            centers: sums.centers + city.c,
            upcoming: sums.upcoming + (city.u ?? 0),
            employees: sums.employees + (city.e ?? 0),
          }
        : sums,
    { centers: 0, upcoming: 0, employees: 0 }
  );
};

/** Rows carry only what the table renders — never the raw account record. */
const toRow = (account) => ({
  name: account.name,
  slug: account.slug,
  industry: account.industry,
  cities: account.cities.map((city) => ({ name: city.name })),
});

/** Default preview: one company per top industry and per top city, so the
 * opening view represents the whole market rather than the alphabet. */
const balancedPreview = (visible, limit) => {
  const groups = [
    ...topIndustries.map((industry) =>
      visible.filter((account) => account.industry === industry)
    ),
    ...topCities.map((city) =>
      visible.filter((account) =>
        account.cities.some((entry) => groupCity(entry.name) === city)
      )
    ),
  ];
  const balanced = [];
  const chosen = new Set();
  for (const group of groups) {
    const account = group.find((candidate) => !chosen.has(candidate.name));
    if (!account) continue;
    balanced.push(account);
    chosen.add(account.name);
    if (balanced.length === limit) break;
  }
  for (const account of visible) {
    if (balanced.length >= limit) break;
    if (chosen.has(account.name)) continue;
    balanced.push(account);
    chosen.add(account.name);
  }
  return balanced;
};

// v2 function: routing and rate limiting are declared here rather than in
// netlify.toml. The limit is per-IP and enforced by the platform before this
// code runs, so a scraper spends its budget on 429s. It bounds volume only —
// the enumeration surface is bounded by MIN_SUGGEST_LENGTH above.
export const config = {
  path: "/api/tracker/query",
  rateLimit: {
    windowSize: 60,
    windowLimit: 30,
    aggregateBy: "ip",
    action: "rate_limit",
  },
};

export default async (request) => {
  // Method is checked here rather than declared in config: an unmatched
  // config.method falls through to the SPA catch-all and would answer a GET
  // with 200 index.html instead of a 405.
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed" }, { Allow: "POST" });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const filters = {
    company:
      typeof payload.company === "string" && payload.company.trim()
        ? payload.company.trim()
        : null,
    industries: cleanList(payload.industries),
    cities: cleanList(payload.cities),
  };
  const search =
    typeof payload.search === "string" ? payload.search.trim() : "";
  // Truncated SHA-256 of the simplified name, computed by the client. Lets
  // search answer "tracked" for a private account without ever naming it.
  const searchHash =
    typeof payload.searchHash === "string" &&
    /^[0-9a-f]{16}$/.test(payload.searchHash)
      ? payload.searchHash
      : null;

  const filtered = accounts.filter((account) => matchesFilters(account, filters));
  const visible = filtered.filter(
    (account) => account.visibility !== "private" && account.name !== null
  );

  const counts = filtered.reduce(
    (sums, account) => {
      const metrics = rowMetrics(account, filters.cities);
      return {
        companies: sums.companies + 1,
        centers: sums.centers + metrics.centers,
        upcoming: sums.upcoming + metrics.upcoming,
        employees: sums.employees + metrics.employees,
      };
    },
    { companies: 0, centers: 0, upcoming: 0, employees: 0 }
  );

  // Facet counts ignore their own dimension, so picking an industry doesn't
  // zero out the other industries.
  const industryCounts = new Map();
  const cityCounts = new Map();
  for (const account of accounts) {
    if (matchesFilters(account, filters, "industry") && account.industry) {
      industryCounts.set(
        account.industry,
        (industryCounts.get(account.industry) ?? 0) + 1
      );
    }
    if (matchesFilters(account, filters, "city")) {
      for (const grouped of new Set(
        account.cities.map((city) => groupCity(city.name))
      )) {
        cityCounts.set(grouped, (cityCounts.get(grouped) ?? 0) + 1);
      }
    }
  }

  const normalizedSearch = search.toLowerCase();
  const hasSearch = normalizedSearch.length >= MIN_SEARCH_LENGTH;
  const suggestions = normalizedSearch.length >= MIN_SUGGEST_LENGTH
    ? accounts
        .filter(
          (account) =>
            account.name !== null &&
            account.name.toLowerCase().includes(normalizedSearch)
        )
        .sort((a, b) => {
          const aStarts = a.name.toLowerCase().startsWith(normalizedSearch);
          const bStarts = b.name.toLowerCase().startsWith(normalizedSearch);
          return Number(bStarts) - Number(aStarts) || a.name.localeCompare(b.name);
        })
        .slice(0, MAX_SUGGESTIONS)
        .map((account) => ({ value: account.name, count: 1 }))
    : [];

  const hasSelection =
    filters.company !== null ||
    filters.industries.length > 0 ||
    filters.cities.length > 0;
  const permittedRows =
    filters.company !== null ? visible.length : permittedRowsFor(filtered.length);
  const selected =
    hasSelection || hasSearch
      ? visible.slice(0, permittedRows)
      : balancedPreview(visible, permittedRows);
  const rows = selected.map(toRow);

  return json(200, {
    counts,
    rows,
    remainingCount: filtered.length - rows.length,
    facets: {
      industries: topIndustries.map((industry) => ({
        value: industry,
        count: industryCounts.get(industry) ?? 0,
      })),
      cities: topCities.map((city) => ({
        value: city,
        count: cityCounts.get(city) ?? 0,
      })),
    },
    suggestions,
    privateMatch:
      searchHash !== null && accounts.some((account) => account.h === searchHash),
    nonGccNote: searchHash !== null ? nonGccNotes[searchHash] ?? null : null,
  });
};
