import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { AccountSearchFilter } from "@/components/AccountSearchFilter";
import { MultiSelectFilter } from "@/components/MultiSelectFilter";
import { useSEO } from "@/hooks/useSEO";
import { EMPTY_FILTERS, type FacetOption, type TrackerFilters } from "@/lib/tracker";
import {
  fetchStaticTrackerAccounts,
  hashCompanyName,
  type StaticTrackerAccount,
} from "@/lib/trackerAccounts";
import {
  TRACKER_STATS,
  TRACKER_NON_GCC_NOTES,
  TRACKER_TOP_INDUSTRIES,
  TRACKER_TOP_CITIES,
  TRACKER_INDUSTRY_CLASSIFICATIONS,
} from "@/lib/trackerStats";
import { Lock, RotateCcw, X } from "lucide-react";

const DEBOUNCE_MS = 250;
// The free directory shows only the first 20 matching companies, A to Z, with
// no pagination; the closing row points at the full version for the rest.
const DIRECTORY_ROW_LIMIT = 20;
// Filters surface only the global top-10 industries/cities; the long tail is
// public on the crawlable /gcc/industries/* and /gcc/cities/* landing pages
// and unlocks in-app with a free account.

const nf = (n: number) => n.toLocaleString("en-US");


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

const CountCard = ({
  label,
  value,
  isLoading,
}: {
  label: string;
  value: number;
  isLoading: boolean;
}) => (
  <div className="border-l px-2 py-5 text-center first:border-l-0 md:px-6 md:py-6">
    <div className="text-xs font-medium text-muted-foreground sm:text-sm">{label}</div>
    <div className="mt-2 text-2xl font-bold tracking-tight tabular-nums sm:text-3xl md:mt-3 md:text-4xl">
      {isLoading ? (
        <span className="inline-block h-7 w-16 animate-pulse rounded-md bg-muted sm:h-9 sm:w-24" />
      ) : (
        value.toLocaleString()
      )}
    </div>
  </div>
);

const USE_CASES = [
  {
    title: "Sales teams",
    description:
      "Carve territories around real GCC presence, by industry, city, or named account, so your SDRs call into accounts that actually exist, not a stale list.",
  },
  {
    title: "Marketing teams",
    description:
      "Put a hard number on your addressable market before you plan an ABM programme, and know exactly how many decision-makers sit inside your ICP.",
  },
  {
    title: "Strategy & leadership",
    description:
      "Walk into the board meeting with a defensible India GCC number for market entry, expansion planning, or next year's targets.",
  },
];

const Tracker = () => {
  const { user } = useAuth();
  useSEO({
    title: "GCC Companies in India: Directory & Market Size Calculator | Bamboo Reports",
    description: `Browse a directory of ${nf(TRACKER_STATS.accountsBrowsable)}+ Global Capability Centres in India, from the ${nf(TRACKER_STATS.accountsTracked)} GCCs we track. Filter by industry and city to size your addressable market: matching accounts, centres and decision-makers.`,
    keywords:
      "list of GCCs in India, GCC companies in India, India GCC companies directory, India GCC list, Global Capability Centres India, GCC company directory, India GCC market size, GCC TAM calculator, GCC cities, GCC decision makers",
    canonicalUrl: "https://www.bambooreports.com/gcc",
  });

  // ?industry=…&city=… deep-links (homepage widget, landing pages) preselect filters.
  const [filters, setFilters] = useState<TrackerFilters>(() => {
    if (typeof window === "undefined") return EMPTY_FILTERS;
    const params = new URLSearchParams(window.location.search);
    const industry = params.get("industry");
    const city = params.get("city");
    if (!industry && !city) return EMPTY_FILTERS;
    return {
      ...EMPTY_FILTERS,
      account_primary_category: industry ? [industry] : [],
      center_city: city ? [city] : [],
    };
  });
  const [accountSearch, setAccountSearch] = useState("");
  const debouncedAccountSearch = useDebouncedValue(accountSearch, DEBOUNCE_MS);

  const {
    data: staticAccounts = [],
    isLoading: isLoadingStaticAccounts,
    isError: isStaticAccountsError,
  } = useQuery({
    queryKey: ["tracker-static-accounts"],
    queryFn: ({ signal }) => fetchStaticTrackerAccounts(signal),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isStaticAccountsError) {
      toast.error("Couldn't load the account directory. Please try again.");
    }
  }, [isStaticAccountsError]);

  // Gated-company detection: private records ship only a hash of their
  // simplified name, so an exact-name search can say "tracked, sign up to
  // unlock" without the private list ever being in the payload. Excluded
  // non-gcc accounts get their explanatory note the same way.
  const [gatedMatch, setGatedMatch] = useState(false);
  const [nonGccNote, setNonGccNote] = useState<string | null>(null);
  useEffect(() => {
    const q = debouncedAccountSearch.trim();
    if (q.length < 2) {
      setGatedMatch(false);
      setNonGccNote(null);
      return;
    }
    let cancelled = false;
    hashCompanyName(q).then((hash) => {
      if (!cancelled) {
        setGatedMatch(hash !== null && staticAccounts.some((a) => a.h === hash));
        setNonGccNote(hash !== null ? TRACKER_NON_GCC_NOTES[hash] ?? null : null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedAccountSearch, staticAccounts]);

  const hasAppliedFilters =
    filters.account_primary_category.length > 0 ||
    filters.center_city.length > 0 ||
    filters.account_global_legal_name.length > 0;

  const hasFilterInput = hasAppliedFilters || accountSearch.length > 0;

  const reset = () => {
    setFilters(EMPTY_FILTERS);
    setAccountSearch("");
  };

  const removeFilterValue = (key: keyof TrackerFilters, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].filter((item) => item !== value),
    }));
  };

  const matchesFilters = useCallback(
    (
      account: (typeof staticAccounts)[number],
      ignoredFilter?: "industry" | "city" | "account"
    ) => {
      const matchesIndustry =
        ignoredFilter === "industry" ||
        filters.account_primary_category.length === 0 ||
        (account.industry !== null &&
          filters.account_primary_category.includes(account.industry));
      const matchesCity =
        ignoredFilter === "city" ||
        filters.center_city.length === 0 ||
        account.cities.some((city) => filters.center_city.includes(city.name));
      const matchesAccount =
        ignoredFilter === "account" ||
        filters.account_global_legal_name.length === 0 ||
        (account.name !== null &&
          filters.account_global_legal_name.includes(account.name));
      return matchesIndustry && matchesCity && matchesAccount;
    },
    [filters]
  );

  const filteredAccounts = useMemo(
    () => staticAccounts.filter((account) => matchesFilters(account)),
    [staticAccounts, matchesFilters]
  );

  const visibleAccounts = useMemo(
    () =>
      filteredAccounts
        .filter(
          (account): account is StaticTrackerAccount & { name: string } =>
            account.visibility !== "private" && account.name !== null
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [filteredAccounts]
  );

  // With a company explicitly selected, the centers count uses the strict
  // definition its public page uses (active, GCC-type centers only) and
  // overrides the city dimension; aggregate views stay account-level.
  const companySelected = filters.account_global_legal_name.length > 0;
  const counts = useMemo(
    () =>
      filteredAccounts.reduce(
        (sums, account) => {
          sums.accounts += 1;
          sums.prospects += account.prospectCount;
          sums.centers += companySelected
            ? account.gccCenterCount ?? account.centerCount
            : filters.center_city.length > 0
              ? account.cities
                  .filter((city) => filters.center_city.includes(city.name))
                  .reduce((sum, city) => sum + city.centerCount, 0)
              : account.centerCount;
          return sums;
        },
        { accounts: 0, centers: 0, prospects: 0 }
      ),
    [filteredAccounts, filters.center_city, companySelected]
  );

  const facets = useMemo(() => {
    const toFacetOptions = (values: string[]): FacetOption[] =>
      Array.from(
        values.reduce((countsByValue, value) => {
          countsByValue.set(value, (countsByValue.get(value) ?? 0) + 1);
          return countsByValue;
        }, new Map<string, number>())
      )
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));

    const industries = staticAccounts
      .filter((account) => matchesFilters(account, "industry"))
      .flatMap((account) => (account.industry ? [account.industry] : []));
    const cities = staticAccounts
      .filter((account) => matchesFilters(account, "city"))
      .flatMap((account) => account.cities.map((city) => city.name));
    const normalizedSearch = debouncedAccountSearch.trim().toLowerCase();
    const accountSuggestions = staticAccounts
      .filter((account) => matchesFilters(account, "account"))
      .filter(
        (account): account is StaticTrackerAccount & { name: string } =>
          account.visibility !== "private" &&
          account.name !== null &&
          normalizedSearch.length >= 2 &&
          account.name.toLowerCase().includes(normalizedSearch)
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(normalizedSearch);
        const bStarts = b.name.toLowerCase().startsWith(normalizedSearch);
        return Number(bStarts) - Number(aStarts) || a.name.localeCompare(b.name);
      })
      .slice(0, 8)
      .map((account) => ({ value: account.name, count: 1 }));

    const industryFacets = toFacetOptions(industries);
    const cityFacets = toFacetOptions(cities);
    // The unlocked options are the stable global top-10 lists (the same ones
    // the homepage widget and landing pages use), not the top 10 of the
    // current selection: picking an industry must never hide a headline city
    // like Kolkata just because that industry is small there.
    const unlocked = (facetOptions: FacetOption[], top: readonly string[]) =>
      facetOptions
        .filter((option) => top.includes(option.value))
        .sort((a, b) => top.indexOf(a.value) - top.indexOf(b.value));
    const industryOptions = unlocked(industryFacets, TRACKER_TOP_INDUSTRIES);
    const cityOptions = unlocked(cityFacets, TRACKER_TOP_CITIES);
    return {
      account_primary_category: industryOptions,
      industriesLocked: Math.max(0, industryFacets.length - industryOptions.length),
      center_city: cityOptions,
      citiesLocked: Math.max(0, cityFacets.length - cityOptions.length),
      account_global_legal_name: accountSuggestions,
    };
  }, [staticAccounts, matchesFilters, debouncedAccountSearch]);

  const accounts = visibleAccounts.slice(0, DIRECTORY_ROW_LIMIT);
  // Everything matching the filters but not in the free A-Z preview, whether
  // beyond the row limit or private, lives in the full version.
  const remainingCount = filteredAccounts.length - accounts.length;
  const isLoadingFirstTime = isLoadingStaticAccounts;
  const isSearchingAccounts =
    accountSearch.trim().length >= 2 &&
    accountSearch !== debouncedAccountSearch;

  return (
    <div
      className={`tracker-page min-h-screen bg-background ${user ? "" : "pb-20 md:pb-0"}`}
    >
      <Header />

      {/* TRACKER */}
      <section id="size-your-market" className="scroll-mt-24 px-4 pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Size your market in three clicks
              </h1>
              <p className="mt-4 max-w-6xl text-muted-foreground md:text-lg">
                Pick a company, an industry, or a city and every count updates
                instantly. Start broad, then narrow until the numbers match the
                market you actually sell to.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {!user && (
                  <Button
                    asChild
                    className="w-full rounded-full font-semibold shadow-sm hover:shadow-md transition-shadow sm:w-auto"
                  >
                    <a href="/signup?src=gcc-hero">Sign up for free</a>
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full font-semibold sm:w-auto"
                >
                  <GoogleCalendarSchedulingButton>
                    Get a demo
                  </GoogleCalendarSchedulingButton>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Filters */}
          <div className="border-y bg-secondary/30 px-4 py-6 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1 min-w-0">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Company
                </label>
                <AccountSearchFilter
                  query={accountSearch}
                  selectedAccount={filters.account_global_legal_name[0]}
                  suggestions={facets.account_global_legal_name}
                  isSearching={isSearchingAccounts}
                  isGatedMatch={gatedMatch}
                  nonGccNote={nonGccNote}
                  disabled={isLoadingFirstTime}
                  onQueryChange={(next) => {
                    setAccountSearch(next);
                    if (filters.account_global_legal_name.length > 0) {
                      setFilters((current) => ({
                        ...current,
                        account_global_legal_name: [],
                      }));
                    }
                  }}
                  onSelect={(account) => {
                    setAccountSearch("");
                    setFilters((current) => ({
                      ...current,
                      account_global_legal_name: [account],
                    }));
                  }}
                  onClear={() => {
                    setAccountSearch("");
                    setFilters((current) => ({
                      ...current,
                      account_global_legal_name: [],
                    }));
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Industry
                </label>
                <MultiSelectFilter
                  label="Industry"
                  options={facets.account_primary_category}
                  value={filters.account_primary_category}
                  onValueChange={(next) =>
                    setFilters((f) => ({ ...f, account_primary_category: next }))
                  }
                  disabled={isLoadingFirstTime}
                  lockedCount={facets.industriesLocked}
                  lockedNoun="industries"
                  optionHints={TRACKER_INDUSTRY_CLASSIFICATIONS}
                />
              </div>
              <div className="flex-1 min-w-0">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  City
                </label>
                <MultiSelectFilter
                  label="City"
                  options={facets.center_city}
                  value={filters.center_city}
                  onValueChange={(next) =>
                    setFilters((f) => ({ ...f, center_city: next }))
                  }
                  disabled={isLoadingFirstTime}
                  lockedCount={facets.citiesLocked}
                  lockedNoun="cities"
                />
              </div>
              <Button
                variant="outline"
                onClick={reset}
                disabled={!hasFilterInput}
                className="w-full shrink-0 md:mb-0 md:w-auto"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            {hasAppliedFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
                {filters.account_global_legal_name.map((name) => (
                  <FilterChip
                    key={name}
                    category="Company"
                    value={name}
                    onRemove={() =>
                      removeFilterValue("account_global_legal_name", name)
                    }
                  />
                ))}
                {filters.account_primary_category.map((industry) => (
                  <FilterChip
                    key={industry}
                    category="Industry"
                    value={industry}
                    onRemove={() =>
                      removeFilterValue("account_primary_category", industry)
                    }
                  />
                ))}
                {filters.center_city.map((city) => (
                  <FilterChip
                    key={city}
                    category="City"
                    value={city}
                    onRemove={() => removeFilterValue("center_city", city)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Counts */}
          <FadeIn>
          <div className="mt-8 grid grid-cols-3">
            <CountCard
              label="Companies"
              value={counts.accounts}
              isLoading={isLoadingFirstTime}
            />
            <CountCard
              label="Centres"
              value={counts.centers}
              isLoading={isLoadingFirstTime}
            />
            <CountCard
              label="Leaders"
              value={counts.prospects}
              isLoading={isLoadingFirstTime}
            />
          </div>
          </FadeIn>

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
              {/* Mobile: stacked list (no sideways scrolling) */}
              <ul className="divide-y md:hidden">
                {isLoadingStaticAccounts ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="px-5 py-4">
                      <span className="block h-4 w-44 animate-pulse rounded bg-muted" />
                      <span className="mt-2 block h-3.5 w-56 animate-pulse rounded bg-muted" />
                    </li>
                  ))
                ) : accounts.length > 0 ? (
                  <>
                    {accounts.map((account) => (
                      <li key={account.name} className="px-5 py-4">
                        <p className="truncate font-medium text-foreground" title={account.name ?? undefined}>
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
                            {account.cities?.length > 0 && ` · ${account.cities[0].name}`}
                          </span>
                          {account.cities?.length > 1 && (
                            <span className="shrink-0 text-xs font-semibold text-primary">
                              +{account.cities.length - 1} more
                            </span>
                          )}
                        </p>
                      </li>
                    ))}
                    {remainingCount > 0 && (
                      <li className="px-5 py-4">
                        <GoogleCalendarSchedulingButton className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline">
                          <Lock className="h-4 w-4" />
                          +{nf(remainingCount)}{" "}
                          {remainingCount === 1 ? "company" : "companies"} available in
                          the full version
                        </GoogleCalendarSchedulingButton>
                      </li>
                    )}
                  </>
                ) : remainingCount > 0 ? (
                  <li className="px-5 py-10 text-center">
                    <GoogleCalendarSchedulingButton className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline">
                      <Lock className="h-4 w-4" />
                      +{nf(remainingCount)}{" "}
                      {remainingCount === 1 ? "company" : "companies"} available in the
                      full version
                    </GoogleCalendarSchedulingButton>
                  </li>
                ) : (
                  <li className="px-5 py-10 text-center">
                    <p className="text-muted-foreground">
                      No accounts match the current filters.
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
                    <th scope="col" className="px-5 py-3 font-semibold">Account name</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Industry</th>
                    <th scope="col" className="px-5 py-3 font-semibold">City</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {isLoadingStaticAccounts ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index}>
                        <td className="px-5 py-4">
                          <span className="block h-4 w-48 animate-pulse rounded bg-muted" />
                        </td>
                        <td className="px-5 py-4">
                          <span className="block h-4 w-36 animate-pulse rounded bg-muted" />
                        </td>
                        <td className="px-5 py-4">
                          <span className="block h-4 w-24 animate-pulse rounded bg-muted" />
                        </td>
                      </tr>
                    ))
                  ) : accounts.length > 0 ? (
                    <>
                      {accounts.map((account) => (
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
                            {account.cities?.length > 0 ? (
                              <div
                                className="flex min-w-0 items-center gap-1.5"
                                title={account.cities.map((city) => city.name).join(", ")}
                              >
                                <span className="truncate">{account.cities[0].name}</span>
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
                            <GoogleCalendarSchedulingButton className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                              <Lock className="h-4 w-4" />
                              +{nf(remainingCount)}{" "}
                              {remainingCount === 1 ? "company" : "companies"} available
                              in the full version
                            </GoogleCalendarSchedulingButton>
                          </td>
                        </tr>
                      )}
                    </>
                  ) : remainingCount > 0 ? (
                    <tr>
                      <td colSpan={3} className="px-5 py-10 text-center">
                        <GoogleCalendarSchedulingButton className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                          <Lock className="h-4 w-4" />
                          +{nf(remainingCount)}{" "}
                          {remainingCount === 1 ? "company" : "companies"} available in
                          the full version
                        </GoogleCalendarSchedulingButton>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-5 py-10 text-center">
                        <p className="text-muted-foreground">
                          No accounts match the current filters.
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
        <div className="max-w-7xl mx-auto">
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

      {/* Mobile-only sticky sign-up bar */}
      {!user && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
          <Button asChild className="w-full rounded-full font-semibold">
            <a href="/signup?src=gcc-sticky">Sign up for free</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Tracker;
