import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { Button } from "@/components/ui/button";
import { AccountSearchFilter } from "@/components/AccountSearchFilter";
import { MultiSelectFilter } from "@/components/MultiSelectFilter";
import { useSEO } from "@/hooks/useSEO";
import type { FacetOption } from "@/lib/tracker";
import {
  fetchTrackerV2Accounts,
  hashCompanyName,
  type TrackerV2Account,
} from "@/lib/trackerAccountsV2";
import {
  TRACKER_V2_STATS,
  TRACKER_V2_TOP_INDUSTRIES,
  TRACKER_V2_TOP_CITIES,
  TRACKER_V2_CITY_GROUPS,
  TRACKER_V2_EXPOSURE_CAP,
  TRACKER_V2_HARD_ROW_CAP,
  TRACKER_V2_NON_GCC_NOTES,
  TRACKER_V2_INDUSTRY_CLASSIFICATIONS,
} from "@/lib/trackerStatsV2";
import { Lock, RotateCcw, X } from "lucide-react";

const DEBOUNCE_MS = 250;

const nf = (n: number) => n.toLocaleString("en-US");

interface TrackerFilters {
  company: string | null;
  industries: string[];
  cities: string[];
}

const EMPTY_FILTERS: TrackerFilters = {
  company: null,
  industries: [],
  cities: [],
};

/** Rows keep raw city names; the filter clubs them (Mumbai MMR, NCR). */
const groupCity = (name: string) => TRACKER_V2_CITY_GROUPS[name] ?? name;

/** Permitted directory rows for a matching set. Single industry/city
 * selections reproduce the generator's exposure table exactly; multi-select
 * combinations apply the same rule to the combined match count. */
const permittedRowsFor = (matchCount: number) =>
  matchCount === 0
    ? 0
    : Math.min(
        TRACKER_V2_HARD_ROW_CAP,
        Math.max(1, Math.floor(matchCount * TRACKER_V2_EXPOSURE_CAP))
      );

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const FilterChip = ({
  category,
  value,
  onRemove,
}: {
  category: string;
  value: string;
  onRemove: () => void;
}) => (
  <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 py-1 pl-3 pr-1.5 text-sm font-medium text-primary">
    <span className="text-xs uppercase tracking-wide text-primary/70">{category}</span>
    <span className="truncate" title={value}>
      {value}
    </span>
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove ${category.toLowerCase()} ${value}`}
      className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors before:absolute before:-inset-2.5 before:content-[''] hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  </span>
);

const COUNT_DURATION_MS = 1200;

// Ease-in-out so large jumps glide instead of lurching: the first frames of
// a pure ease-out skip thousands at a time, which reads as stutter.
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Rolls from the previously shown value to the new target on every change
// (0 -> total on first load, old -> new on each filter change). Snaps
// straight to the target for visitors who prefer reduced motion.
const useAnimatedNumber = (target: number) => {
  const [value, setValue] = useState(target);
  const shownRef = useRef(target);

  useEffect(() => {
    const from = shownRef.current;
    if (from === target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shownRef.current = target;
      setValue(target);
      return;
    }
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_DURATION_MS, 1);
      const eased = easeInOutCubic(t);
      const current = Math.round(from + (target - from) * eased);
      shownRef.current = current;
      setValue(current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return value;
};

const TickerStat = ({
  label,
  value,
  isLoading,
  accent = false,
}: {
  label: string;
  value: number;
  isLoading: boolean;
  accent?: boolean;
}) => {
  const shown = useAnimatedNumber(isLoading ? 0 : value);
  return (
    <div className="border-l px-2 py-5 text-center first:border-l-0 md:px-6 md:py-7">
      <div
        className={`text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl md:text-5xl ${
          accent ? "text-accent-deep" : "text-foreground"
        }`}
      >
        {isLoading ? (
          <span className="inline-block h-8 w-20 animate-pulse rounded-md bg-muted sm:h-10 sm:w-28" />
        ) : (
          <>
            {accent && value > 0 && "+"}
            {nf(shown)}
          </>
        )}
      </div>
      <div className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
        {label}
      </div>
    </div>
  );
};

const USE_CASES = [
  {
    title: "Sales teams",
    description:
      "Carve territories around real GCC presence, by industry, city, or named account, so your SDRs call into accounts that actually exist, not a stale list.",
  },
  {
    title: "Marketing teams",
    description:
      "Put a hard number on your addressable market before you plan an ABM programme, and know exactly how many people sit inside your ICP.",
  },
  {
    title: "Strategy & leadership",
    description:
      "Walk into the board meeting with a defensible India GCC number for market entry, expansion planning, or next year's targets.",
  },
];

const Tracker = () => {
  useSEO({
    title: "India GCC Tracker: Companies, Centres & Headcount | Bamboo Reports",
    description: `Live India GCC numbers, no sign-in: ${nf(TRACKER_V2_STATS.companies)} companies, ${nf(TRACKER_V2_STATS.centers)} centres, ${nf(TRACKER_V2_STATS.upcomingCenters)} upcoming centres and a headcount of ${nf(TRACKER_V2_STATS.employees)}. Filter by industry and city to size your market.`,
    keywords:
      "GCC tracker India, list of GCCs in India, GCC companies in India, India GCC market size, Global Capability Centres India, GCC headcount India, upcoming GCC centres, GCC cities",
    canonicalUrl: "https://www.bambooreports.com/gcc",
  });

  // ?industry=…&city=… deep links (homepage widget, landing pages) preselect
  // filters. Old links carry raw city names; the group map resolves them.
  const [filters, setFilters] = useState<TrackerFilters>(() => {
    if (typeof window === "undefined") return EMPTY_FILTERS;
    const params = new URLSearchParams(window.location.search);
    const industries = params
      .getAll("industry")
      .filter((industry) =>
        (TRACKER_V2_TOP_INDUSTRIES as readonly string[]).includes(industry)
      );
    const cities = [
      ...new Set(
        params
          .getAll("city")
          .map((city) => TRACKER_V2_CITY_GROUPS[city] ?? city)
          .filter((city) =>
            (TRACKER_V2_TOP_CITIES as readonly string[]).includes(city)
          )
      ),
    ];
    return { company: null, industries, cities };
  });
  const [accountSearch, setAccountSearch] = useState("");
  const debouncedAccountSearch = useDebouncedValue(accountSearch, DEBOUNCE_MS);

  // Keep the URL in sync with the filters so reset survives a refresh and
  // any filtered view is shareable. Unrelated params are preserved.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("industry");
    params.delete("city");
    filters.industries.forEach((industry) => params.append("industry", industry));
    filters.cities.forEach((city) => params.append("city", city));
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      window.location.pathname + (query ? `?${query}` : "")
    );
  }, [filters.industries, filters.cities]);

  const {
    data: accounts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tracker-v2-accounts"],
    queryFn: ({ signal }) => fetchTrackerV2Accounts(signal),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Couldn't load the tracker dataset. Please try again.");
    }
  }, [isError]);

  // Exact-name search on a private account answers "tracked" without the
  // private list ever being in the payload; excluded non-gcc accounts get
  // their explanatory note the same way.
  const [privateMatch, setPrivateMatch] = useState(false);
  const [nonGccNote, setNonGccNote] = useState<string | null>(null);
  useEffect(() => {
    const q = debouncedAccountSearch.trim();
    if (q.length < 2) {
      setPrivateMatch(false);
      setNonGccNote(null);
      return;
    }
    let cancelled = false;
    hashCompanyName(q).then((hash) => {
      if (cancelled) return;
      setPrivateMatch(
        hash !== null && accounts.some((account) => account.h === hash)
      );
      setNonGccNote(hash !== null ? TRACKER_V2_NON_GCC_NOTES[hash] ?? null : null);
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedAccountSearch, accounts]);

  const hasSelection =
    filters.company !== null ||
    filters.industries.length > 0 ||
    filters.cities.length > 0;
  const hasInput = hasSelection || accountSearch.length > 0;

  const reset = () => {
    setFilters(EMPTY_FILTERS);
    setAccountSearch("");
  };

  const matchesFilters = useMemo(() => {
    return (
      account: TrackerV2Account,
      ignored?: "industry" | "city"
    ): boolean => {
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
  }, [filters]);

  const filteredAccounts = useMemo(
    () => accounts.filter((account) => matchesFilters(account)),
    [accounts, matchesFilters]
  );

  const visibleAccounts = useMemo(
    () =>
      filteredAccounts.filter(
        (account): account is TrackerV2Account & { name: string } =>
          account.visibility !== "private" && account.name !== null
      ),
    [filteredAccounts]
  );

  /** Row metrics respect the city filter: with cities selected, centres,
   * upcoming and headcount are those cities' share. Cities are disjoint per
   * centre, so summing selected-city entries stays exact. */
  const rowMetrics = useMemo(() => {
    return (account: TrackerV2Account) => {
      if (filters.cities.length === 0) {
        return {
          centers: account.c,
          upcoming: account.u ?? 0,
          employees: account.e,
        };
      }
      return account.cities.reduce(
        (sums, city) =>
          filters.cities.includes(groupCity(city.name))
            ? {
                centers: sums.centers + city.c,
                upcoming: sums.upcoming + (city.u ?? 0),
                employees: sums.employees + (city.e ?? 0),
              }
            : sums,
        { centers: 0, upcoming: 0, employees: 0 }
      );
    };
  }, [filters.cities]);

  // Headline counters. Aggregated from the same per-city data the exposure
  // table was generated from, so single selections reproduce it exactly.
  const counts = useMemo(
    () =>
      filteredAccounts.reduce(
        (sums, account) => {
          const metrics = rowMetrics(account);
          return {
            companies: sums.companies + 1,
            centers: sums.centers + metrics.centers,
            upcoming: sums.upcoming + metrics.upcoming,
            employees: sums.employees + metrics.employees,
          };
        },
        { companies: 0, centers: 0, upcoming: 0, employees: 0 }
      ),
    [filteredAccounts, rowMetrics]
  );

  // Facet option counts ignore their own dimension (picking an industry must
  // not zero out the other industries' counts).
  const facets = useMemo(() => {
    const industryCounts = new Map<string, number>();
    const cityCounts = new Map<string, number>();
    for (const account of accounts) {
      if (matchesFilters(account, "industry") && account.industry) {
        industryCounts.set(
          account.industry,
          (industryCounts.get(account.industry) ?? 0) + 1
        );
      }
      if (matchesFilters(account, "city")) {
        const groups = new Set(account.cities.map((city) => groupCity(city.name)));
        for (const grouped of groups) {
          cityCounts.set(grouped, (cityCounts.get(grouped) ?? 0) + 1);
        }
      }
    }
    return {
      industries: TRACKER_V2_TOP_INDUSTRIES.map((industry) => ({
        value: industry,
        count: industryCounts.get(industry) ?? 0,
      })),
      cities: TRACKER_V2_TOP_CITIES.map((city) => ({
        value: city,
        count: cityCounts.get(city) ?? 0,
      })),
    };
  }, [accounts, matchesFilters]);

  const normalizedSearch = debouncedAccountSearch.trim().toLowerCase();
  const suggestions: FacetOption[] = useMemo(() => {
    if (normalizedSearch.length < 2) return [];
    return accounts
      .filter(
        (account): account is TrackerV2Account & { name: string } =>
          account.name !== null &&
          account.name.toLowerCase().includes(normalizedSearch)
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(normalizedSearch);
        const bStarts = b.name.toLowerCase().startsWith(normalizedSearch);
        return Number(bStarts) - Number(aStarts) || a.name.localeCompare(b.name);
      })
      .slice(0, 8)
      .map((account) => ({ value: account.name, count: 1 }));
  }, [accounts, normalizedSearch]);

  // Row exposure: a company selection shows its matching rows; everything
  // else is governed by the cap rule (and the precomputed table it mirrors).
  const permittedRows =
    filters.company !== null
      ? visibleAccounts.length
      : permittedRowsFor(filteredAccounts.length);

  const rows = useMemo(() => {
    if (hasSelection || accountSearch.trim().length > 0) {
      return visibleAccounts.slice(0, permittedRows);
    }
    // Default preview: one company per top industry and per top city, so the
    // opening view represents the whole market (15 groups = the row cap).
    const groups = [
      ...TRACKER_V2_TOP_INDUSTRIES.map((industry) =>
        visibleAccounts.filter((account) => account.industry === industry)
      ),
      ...TRACKER_V2_TOP_CITIES.map((city) =>
        visibleAccounts.filter((account) =>
          account.cities.some((accountCity) => groupCity(accountCity.name) === city)
        )
      ),
    ];
    const balanced: typeof visibleAccounts = [];
    const chosen = new Set<string>();
    for (const group of groups) {
      const account = group.find((candidate) => !chosen.has(candidate.name));
      if (!account) continue;
      balanced.push(account);
      chosen.add(account.name);
      if (balanced.length === permittedRows) break;
    }
    for (const account of visibleAccounts) {
      if (balanced.length >= permittedRows) break;
      if (chosen.has(account.name)) continue;
      balanced.push(account);
      chosen.add(account.name);
    }
    return balanced;
  }, [visibleAccounts, hasSelection, accountSearch, permittedRows]);

  const remainingCount = filteredAccounts.length - rows.length;
  const isSearching =
    accountSearch.trim().length >= 2 && accountSearch !== debouncedAccountSearch;

  const remainingRow = (
    <GoogleCalendarSchedulingButton className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline">
      <Lock className="h-4 w-4" />
      +{nf(remainingCount)} more {remainingCount === 1 ? "company" : "companies"} tracked
      — see the full dataset
    </GoogleCalendarSchedulingButton>
  );

  return (
    <div className="tracker-page min-h-screen bg-background">
      <Header />

      {/* TICKER */}
      <section id="size-your-market" className="scroll-mt-24 px-4 pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                India's GCC market, in numbers
              </h1>
              <p className="mt-4 max-w-6xl text-muted-foreground md:text-lg">
                Every count on this page is live from the Bamboo Reports GCC
                dataset — open, no sign-in. Pick a company, an industry, or a
                city and the numbers update instantly.
              </p>
            </div>
          </FadeIn>

          {/* Counters */}
          <FadeIn>
            <div className="grid grid-cols-2 border-y md:grid-cols-4">
              <TickerStat label="Companies" value={counts.companies} isLoading={isLoading} />
              <TickerStat label="Centres" value={counts.centers} isLoading={isLoading} />
              <TickerStat
                label="Upcoming centres"
                value={counts.upcoming}
                isLoading={isLoading}
                accent
              />
              <TickerStat label="Headcount" value={counts.employees} isLoading={isLoading} />
            </div>
          </FadeIn>

          {/* Filters */}
          <div className="mt-8 border-y bg-secondary/30 px-4 py-6 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="min-w-0 flex-1">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Company
                </label>
                <AccountSearchFilter
                  query={accountSearch}
                  selectedAccount={filters.company ?? undefined}
                  suggestions={suggestions}
                  isSearching={isSearching}
                  isGatedMatch={privateMatch}
                  gatedMatchName={null}
                  nonGccNote={nonGccNote}
                  disabled={isLoading}
                  onQueryChange={(next) => {
                    setAccountSearch(next);
                    if (filters.company !== null) {
                      setFilters((current) => ({ ...current, company: null }));
                    }
                  }}
                  onSelect={(account) => {
                    setAccountSearch("");
                    setFilters((current) => ({ ...current, company: account }));
                  }}
                  onClear={() => {
                    setAccountSearch("");
                    setFilters((current) => ({ ...current, company: null }));
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Industry
                </label>
                <MultiSelectFilter
                  label="Industry"
                  options={facets.industries}
                  value={filters.industries}
                  onValueChange={(industries) =>
                    setFilters((current) => ({ ...current, industries }))
                  }
                  disabled={isLoading}
                  optionHints={TRACKER_V2_INDUSTRY_CLASSIFICATIONS}
                />
              </div>
              <div className="min-w-0 flex-1">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  City
                </label>
                <MultiSelectFilter
                  label="City"
                  options={facets.cities}
                  value={filters.cities}
                  onValueChange={(cities) =>
                    setFilters((current) => ({ ...current, cities }))
                  }
                  disabled={isLoading}
                />
              </div>
              <Button
                variant="outline"
                onClick={reset}
                disabled={!hasInput}
                className="w-full shrink-0 md:mb-0 md:w-auto"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            {hasSelection && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
                {filters.company !== null && (
                  <FilterChip
                    category="Company"
                    value={filters.company}
                    onRemove={() =>
                      setFilters((current) => ({ ...current, company: null }))
                    }
                  />
                )}
                {filters.industries.map((industry) => (
                  <FilterChip
                    key={industry}
                    category="Industry"
                    value={industry}
                    onRemove={() =>
                      setFilters((current) => ({
                        ...current,
                        industries: current.industries.filter(
                          (item) => item !== industry
                        ),
                      }))
                    }
                  />
                ))}
                {filters.cities.map((city) => (
                  <FilterChip
                    key={city}
                    category="City"
                    value={city}
                    onRemove={() =>
                      setFilters((current) => ({
                        ...current,
                        cities: current.cities.filter((item) => item !== city),
                      }))
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Directory */}
          <div className="mt-8 overflow-hidden rounded-lg border bg-card">
            <div className="border-b px-5 py-4">
              <h2 className="text-lg font-semibold tracking-tight">Browse GCCs</h2>
            </div>

            <div
              className="select-none"
              onCopy={(event) => event.preventDefault()}
              onCut={(event) => event.preventDefault()}
              onContextMenu={(event) => event.preventDefault()}
            >
              {/* Mobile: stacked list */}
              <ul className="divide-y md:hidden">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="px-5 py-4">
                      <span className="block h-4 w-44 animate-pulse rounded bg-muted" />
                      <span className="mt-2 block h-3.5 w-56 animate-pulse rounded bg-muted" />
                    </li>
                  ))
                ) : rows.length > 0 ? (
                  <>
                    {rows.map((account) => (
                      <li key={account.name} className="px-5 py-4">
                        <p
                          className="truncate font-medium text-foreground"
                          title={account.name}
                        >
                          {account.slug ? (
                            <a
                              href={`/gcc/companies/${account.slug}/`}
                              className="rounded-sm hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              {account.name}
                            </a>
                          ) : (
                            account.name
                          )}
                        </p>
                        <p className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
                          <span className="truncate">
                            {account.industry || "Not specified"}
                            {account.cities.length > 0 && ` · ${account.cities[0].name}`}
                          </span>
                          {account.cities.length > 1 && (
                            <span className="shrink-0 text-xs font-semibold text-primary">
                              +{account.cities.length - 1} more
                            </span>
                          )}
                        </p>
                      </li>
                    ))}
                    {remainingCount > 0 && <li className="px-5 py-4">{remainingRow}</li>}
                  </>
                ) : remainingCount > 0 ? (
                  <li className="px-5 py-10 text-center">{remainingRow}</li>
                ) : (
                  <li className="px-5 py-10 text-center">
                    <p className="text-muted-foreground">
                      No companies match the current filters.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={reset}
                      className="mt-3"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset filters
                    </Button>
                  </li>
                )}
              </ul>

              {/* Desktop: full table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[720px] table-fixed text-left text-sm">
                  <colgroup>
                    <col className="w-[42%]" />
                    <col className="w-[30%]" />
                    <col className="w-[28%]" />
                  </colgroup>
                  <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Account name
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Industry
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        City
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {isLoading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                          {["w-48", "w-36", "w-24"].map((width, cell) => (
                            <td key={cell} className="px-5 py-4">
                              <span
                                className={`block h-4 ${width} animate-pulse rounded bg-muted`}
                              />
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : rows.length > 0 ? (
                      <>
                        {rows.map((account) => (
                          <tr
                            key={account.name}
                            className="transition-colors duration-micro hover:bg-muted/40"
                          >
                            <td className="overflow-hidden px-5 py-4 font-medium text-foreground">
                              <div className="truncate" title={account.name}>
                                {account.slug ? (
                                  <a
                                    href={`/gcc/companies/${account.slug}/`}
                                    className="rounded-sm hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                  >
                                    {account.name}
                                  </a>
                                ) : (
                                  account.name
                                )}
                              </div>
                            </td>
                            <td className="overflow-hidden px-5 py-4 text-muted-foreground">
                              <div
                                className="truncate"
                                title={account.industry || "Not specified"}
                              >
                                {account.industry || "Not specified"}
                              </div>
                            </td>
                            <td className="overflow-hidden px-5 py-4 text-muted-foreground">
                              {account.cities.length > 0 ? (
                                <div
                                  className="flex min-w-0 items-center gap-1.5"
                                  title={account.cities
                                    .map((city) => city.name)
                                    .join(", ")}
                                >
                                  <span className="truncate">
                                    {account.cities[0].name}
                                  </span>
                                  {account.cities.length > 1 && (
                                    <span className="shrink-0 text-xs font-semibold text-primary">
                                      +{account.cities.length - 1} more
                                    </span>
                                  )}
                                </div>
                              ) : (
                                "Not specified"
                              )}
                            </td>
                          </tr>
                        ))}
                        {remainingCount > 0 && (
                          <tr>
                            <td colSpan={3} className="px-5 py-4">
                              {remainingRow}
                            </td>
                          </tr>
                        )}
                      </>
                    ) : remainingCount > 0 ? (
                      <tr>
                        <td colSpan={3} className="px-5 py-10 text-center">
                          {remainingRow}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-5 py-10 text-center">
                          <p className="text-muted-foreground">
                            No companies match the current filters.
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={reset}
                            className="mt-3"
                          >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset filters
                          </Button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Built for go-to-market teams targeting GCCs
              </h2>
              <p className="mt-4 max-w-6xl text-muted-foreground md:text-lg">
                The same live numbers, three different jobs: from the first
                territory plan to the board deck.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-x-8 md:grid-cols-3">
            {USE_CASES.map((useCase, index) => (
              <FadeIn key={useCase.title} delay={index * 100}>
                <div className="h-full border-t py-6">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {useCase.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tracker;
