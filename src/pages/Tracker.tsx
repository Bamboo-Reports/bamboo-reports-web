import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AccountSearchFilter } from "@/components/AccountSearchFilter";
import { MultiSelectFilter } from "@/components/MultiSelectFilter";
import { useSEO } from "@/hooks/useSEO";
import { EMPTY_FILTERS, type FacetOption, type TrackerFilters } from "@/lib/tracker";
import {
  fetchStaticTrackerAccounts,
  hashCompanyName,
  type StaticTrackerAccount,
} from "@/lib/trackerAccounts";
import { TRACKER_STATS, TRACKER_NON_GCC_NOTES } from "@/lib/trackerStats";
import {
  ArrowDown,
  Building2,
  Layers,
  Lock,
  RotateCcw,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

const DEBOUNCE_MS = 250;
const PAGE_SIZE = 25;
// Filters surface only the top N industries/cities; the long tail is public
// on the crawlable /gcc/industries/* and /gcc/cities/* landing pages and
// unlocks in-app with a free account.
const TOP_FACET_LIMIT = 10;

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
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  </span>
);

const CountCard = ({
  label,
  value,
  icon: Icon,
  isLoading,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  isLoading: boolean;
}) => (
  <Card className="p-6 md:p-8">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="mt-3 text-4xl md:text-5xl font-bold tracking-tight tabular-nums">
          {isLoading ? (
            <span className="inline-block h-10 w-28 animate-pulse rounded-md bg-muted" />
          ) : (
            value.toLocaleString()
          )}
        </div>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </Card>
);

const USE_CASES = [
  {
    icon: Target,
    title: "Sales teams",
    description:
      "Carve territories around real GCC presence, by industry, city, or named account, so your SDRs call into accounts that actually exist, not a stale list.",
  },
  {
    icon: TrendingUp,
    title: "Marketing teams",
    description:
      "Put a hard number on your addressable market before you plan an ABM program, and know exactly how many decision-makers sit inside your ICP.",
  },
  {
    icon: Building2,
    title: "Strategy & leadership",
    description:
      "Walk into the board meeting with a defensible India GCC number for market entry, expansion planning, or next year's targets.",
  },
];

const Tracker = () => {
  useSEO({
    title: "GCC Companies in India: Directory & Market Size Calculator | Bamboo Reports",
    description: `Browse a directory of ${nf(TRACKER_STATS.accountsBrowsable)}+ Global Capability Centers in India, from the ${nf(TRACKER_STATS.accountsTracked)} GCCs we track. Filter by industry and city to size your addressable market: matching accounts, centres and decision-makers.`,
    keywords:
      "list of GCCs in India, GCC companies in India, India GCC companies directory, India GCC list, Global Capability Centers India, GCC company directory, India GCC market size, GCC TAM calculator, GCC cities, GCC decision makers",
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
  const [page, setPage] = useState(1);
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
    setPage(1);
  };

  const removeFilterValue = (key: keyof TrackerFilters, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].filter((item) => item !== value),
    }));
    setPage(1);
  };

  const matchesFilters = (
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
  };

  const filteredAccounts = useMemo(
    () => staticAccounts.filter((account) => matchesFilters(account)),
    [staticAccounts, filters]
  );

  const visibleAccounts = useMemo(
    () =>
      filteredAccounts.filter(
        (account): account is StaticTrackerAccount & { name: string } =>
          account.visibility !== "private" && account.name !== null
      ),
    [filteredAccounts]
  );
  const hiddenCount = filteredAccounts.length - visibleAccounts.length;

  const counts = useMemo(
    () =>
      filteredAccounts.reduce(
        (sums, account) => {
          sums.accounts += 1;
          sums.prospects += account.prospectCount;
          sums.centers +=
            filters.center_city.length > 0
              ? account.cities
                  .filter((city) => filters.center_city.includes(city.name))
                  .reduce((sum, city) => sum + city.centerCount, 0)
              : account.centerCount;
          return sums;
        },
        { accounts: 0, centers: 0, prospects: 0 }
      ),
    [filteredAccounts, filters.center_city]
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
    return {
      account_primary_category: industryFacets.slice(0, TOP_FACET_LIMIT),
      industriesLocked: Math.max(0, industryFacets.length - TOP_FACET_LIMIT),
      center_city: cityFacets.slice(0, TOP_FACET_LIMIT),
      citiesLocked: Math.max(0, cityFacets.length - TOP_FACET_LIMIT),
      account_global_legal_name: accountSuggestions,
    };
  }, [staticAccounts, filters, debouncedAccountSearch]);

  // Human label for the active filter set, e.g. "BFSI in Bengaluru".
  const filterSummary = useMemo(() => {
    const parts = [
      filters.account_global_legal_name.join(", "),
      filters.account_primary_category.join(", "),
      filters.center_city.length > 0 ? `in ${filters.center_city.join(", ")}` : "",
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : "All India GCCs";
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(visibleAccounts.length / PAGE_SIZE));
  const accounts = visibleAccounts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const isLoadingFirstTime = isLoadingStaticAccounts;
  const isSearchingAccounts =
    accountSearch.trim().length >= 2 &&
    accountSearch !== debouncedAccountSearch;

  return (
    <div className="tracker-page min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <p className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary">
            India GCC companies directory
          </p>
          <h1 className="leading-[1.05] max-w-5xl">
            <span className="block text-foreground">GCC companies in India,</span>
            <span className="block text-accent">sized for your market</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            We track {nf(TRACKER_STATS.accountsTracked)} Global Capability Centers in
            India. Browse {nf(TRACKER_STATS.accountsBrowsable)}+ of them free, filter
            by industry and city, and get a live count of the centres and
            decision-makers in your target market.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 font-bold text-base"
            >
              <a href="/signup?src=gcc-hero">Sign up free</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 font-bold text-base"
            >
              <a href="#size-your-market">
                Size your market
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* TRACKER */}
      <section id="size-your-market" className="scroll-mt-24 py-14 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-10 max-w-3xl">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Size your market in three clicks
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                Pick a company, an industry, or a city and every count updates
                instantly. Start broad, then narrow until the numbers match the
                market you actually sell to.
              </p>
            </div>
          </FadeIn>

          {/* Filters */}
          <div className="rounded-xl border bg-card p-5 md:p-6 shadow-sm">
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
                    setPage(1);
                    if (filters.account_global_legal_name.length > 0) {
                      setFilters((current) => ({
                        ...current,
                        account_global_legal_name: [],
                      }));
                    }
                  }}
                  onSelect={(account) => {
                    setAccountSearch("");
                    setPage(1);
                    setFilters((current) => ({
                      ...current,
                      account_global_legal_name: [account],
                    }));
                  }}
                  onClear={() => {
                    setAccountSearch("");
                    setPage(1);
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
                  onValueChange={(next) => {
                    setFilters((f) => ({ ...f, account_primary_category: next }));
                    setPage(1);
                  }}
                  disabled={isLoadingFirstTime}
                  lockedCount={facets.industriesLocked}
                  lockedNoun="industries"
                  lockedHref="/signup?src=gcc-filter-industries"
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
                  onValueChange={(next) => {
                    setFilters((f) => ({ ...f, center_city: next }));
                    setPage(1);
                  }}
                  disabled={isLoadingFirstTime}
                  lockedCount={facets.citiesLocked}
                  lockedNoun="cities"
                  lockedHref="/signup?src=gcc-filter-cities"
                />
              </div>
              <Button
                variant="outline"
                onClick={reset}
                disabled={!hasFilterInput}
                className="md:mb-0 shrink-0"
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
          <div className="mt-6 grid md:grid-cols-3 gap-4 md:gap-6">
            <CountCard
              label="Target accounts"
              value={counts.accounts}
              icon={Building2}
              isLoading={isLoadingFirstTime}
            />
            <CountCard
              label="Matching centres"
              value={counts.centers}
              icon={Layers}
              isLoading={isLoadingFirstTime}
            />
            <CountCard
              label="Decision-makers"
              value={counts.prospects}
              icon={Users}
              isLoading={isLoadingFirstTime}
            />
          </div>

          {/* Tracked vs shown: the platform depth is the hook. */}
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5 md:flex md:items-center md:justify-between md:gap-6">
            <p className="text-sm md:text-base leading-relaxed">
              <span className="font-semibold text-foreground">{filterSummary}: </span>
              {nf(counts.accounts)} {counts.accounts === 1 ? "company" : "companies"},{" "}
              {nf(counts.centers)} GCC {counts.centers === 1 ? "centre" : "centres"} and{" "}
              {nf(counts.prospects)} decision-makers tracked in Bamboo Reports. Showing{" "}
              {nf(visibleAccounts.length)}{" "}
              {visibleAccounts.length === 1 ? "company" : "companies"} free here.
              {hiddenCount > 0 && (
                <>
                  {" "}
                  Sign up free to unlock the other {nf(hiddenCount)}, plus every centre
                  and decision-maker.
                </>
              )}
            </p>
            <Button asChild className="mt-4 shrink-0 rounded-full px-6 font-bold md:mt-0">
              <a href="/signup?src=gcc-tracked-shown">Sign up free</a>
            </Button>
          </div>

          {/* Directory */}
          <div className="mt-10 overflow-hidden rounded-lg border bg-card">
            <div className="border-b px-5 py-4">
              <h3 className="text-lg font-semibold tracking-tight">Browse GCCs</h3>
            </div>

            <div
              className="select-none overflow-x-auto"
              onCopy={(event) => event.preventDefault()}
              onCut={(event) => event.preventDefault()}
              onContextMenu={(event) => event.preventDefault()}
            >
              <table className="w-full min-w-[720px] table-fixed text-left text-sm">
                <colgroup>
                  <col className="w-[34%]" />
                  <col className="w-[42%]" />
                  <col className="w-[24%]" />
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
                        <tr key={account.name}>
                          <td className="overflow-hidden px-5 py-4 font-medium text-foreground">
                            <div className="truncate" title={account.name}>
                              {account.slug ? (
                                <a
                                  href={`/gcc/companies/${account.slug}/`}
                                  className="hover:text-primary hover:underline"
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
                      {page >= totalPages && hiddenCount > 0 && (
                        <tr>
                          <td colSpan={3} className="px-5 py-4">
                            <a
                              href="/signup?src=gcc-tracker-private"
                              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                            >
                              <Lock className="h-4 w-4" />
                              Sign up free to unlock {hiddenCount.toLocaleString()} more{" "}
                              {hiddenCount === 1 ? "company" : "companies"}
                            </a>
                          </td>
                        </tr>
                      )}
                    </>
                  ) : hiddenCount > 0 ? (
                    <tr>
                      <td colSpan={3} className="px-5 py-10 text-center">
                        <a
                          href="/signup?src=gcc-tracker-private"
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          <Lock className="h-4 w-4" />
                          Sign up free to see all {hiddenCount.toLocaleString()} matching{" "}
                          {hiddenCount === 1 ? "company" : "companies"}
                        </a>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-5 py-10 text-center text-muted-foreground">
                        No accounts match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-end">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page <= 1 || isLoadingStaticAccounts}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page >= totalPages || isLoadingStaticAccounts}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-t bg-muted/30 py-14 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-10 max-w-3xl">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Built for go-to-market teams targeting GCCs
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                The same live numbers, three different jobs: from the first
                territory plan to the board deck.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {USE_CASES.map((useCase, index) => (
              <FadeIn key={useCase.title} delay={index * 100}>
                <Card className="h-full p-6 md:p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <useCase.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {useCase.description}
                  </p>
                </Card>
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
