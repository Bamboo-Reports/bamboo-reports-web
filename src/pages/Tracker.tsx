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
import { fetchStaticTrackerAccounts } from "@/lib/trackerAccounts";
import {
  ArrowDown,
  Building2,
  Layers,
  RotateCcw,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const DEBOUNCE_MS = 250;
const PAGE_SIZE = 25;

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

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
    title: "Free India GCC Market Size Calculator | Bamboo Reports",
    description:
      "Estimate your India GCC addressable market in seconds. Filter by industry, city, or company to see matching accounts, centres, and decision-makers.",
    keywords:
      "India GCC market size, GCC TAM calculator, GCC tracker, India GCC company search, GCC cities, GCC decision makers",
  });

  const [filters, setFilters] = useState<TrackerFilters>(EMPTY_FILTERS);
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
      filters.account_global_legal_name.includes(account.name);
    return matchesIndustry && matchesCity && matchesAccount;
  };

  const filteredAccounts = useMemo(
    () => staticAccounts.filter((account) => matchesFilters(account)),
    [staticAccounts, filters]
  );

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
        (account) =>
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

    return {
      account_primary_category: toFacetOptions(industries),
      center_city: toFacetOptions(cities),
      account_global_legal_name: accountSuggestions,
    };
  }, [staticAccounts, filters, debouncedAccountSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / PAGE_SIZE));
  const accounts = filteredAccounts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
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
            Free India GCC market size calculator
          </p>
          <h1 className="leading-[1.05] max-w-5xl">
            <span className="block text-foreground">How big is your</span>
            <span className="block text-accent">India GCC market?</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Filter 1,900+ GCC accounts by company, industry, or city and get a live
            count of the centres and decision-makers in your target market. Free to
            use, with no sign-up and no sales call.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              asChild
              size="lg"
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

          <p className="mt-6 text-sm text-muted-foreground">
            {hasAppliedFilters
              ? `Your current market contains ${counts.accounts.toLocaleString()} target accounts across ${counts.centers.toLocaleString()} centres, with ${counts.prospects.toLocaleString()} mapped decision-makers.`
              : "You're looking at the full India GCC ecosystem. Apply a filter to isolate the market that fits your offer."}
          </p>

          {/* Directory */}
          <div className="mt-10 overflow-hidden rounded-lg border bg-card">
            <div className="border-b px-5 py-4">
              <h3 className="text-lg font-semibold tracking-tight">GCC account directory</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Every account behind your numbers, shown 25 at a time.
              </p>
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
                    accounts.map((account) => (
                      <tr key={account.name}>
                        <td className="overflow-hidden px-5 py-4 font-medium text-foreground">
                          <div className="truncate" title={account.name}>
                            {account.name}
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
                    ))
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

            <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Page {Math.min(page, totalPages).toLocaleString()} of {totalPages.toLocaleString()}
              </p>
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
