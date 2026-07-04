import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AccountSearchFilter } from "@/components/AccountSearchFilter";
import { MultiSelectFilter } from "@/components/MultiSelectFilter";
import { useSEO } from "@/hooks/useSEO";
import { fetchTracker, EMPTY_FILTERS, type TrackerFilters } from "@/lib/tracker";
import {
  Building2,
  Layers,
  RotateCcw,
  Users,
} from "lucide-react";

const DEBOUNCE_MS = 250;

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
  const debouncedFilters = useDebouncedValue(filters, DEBOUNCE_MS);
  const debouncedAccountSearch = useDebouncedValue(accountSearch, DEBOUNCE_MS);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["tracker", debouncedFilters, debouncedAccountSearch],
    queryFn: ({ signal }) =>
      fetchTracker(debouncedFilters, debouncedAccountSearch, signal),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Couldn't load tracker data. Please try again.");
    }
  }, [isError]);

  const hasAppliedFilters =
    filters.account_primary_category.length > 0 ||
    filters.center_city.length > 0 ||
    filters.account_global_legal_name.length > 0;

  const hasFilterInput = hasAppliedFilters || accountSearch.length > 0;

  const reset = () => {
    setFilters(EMPTY_FILTERS);
    setAccountSearch("");
  };

  const counts = data?.counts ?? { accounts: 0, centers: 0, prospects: 0 };
  const isLoadingFirstTime = isFetching && !data;
  const isSearchingAccounts =
    accountSearch.trim().length >= 2 &&
    (accountSearch !== debouncedAccountSearch || isFetching);

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
          <h1 className="leading-[1.05] max-w-5xl">
            <span className="block text-foreground">How big is your</span>
            <span className="block text-accent">India GCC market?</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Build a live TAM estimate in seconds. Filter India's GCC ecosystem by industry,
            city, or company to see how many locations and decision-makers match your
            go-to-market focus.
          </p>
        </div>
      </section>

      {/* TRACKER */}
      <section id="size-your-market" className="scroll-mt-24 py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Define your market
            </p>
            <h2 className="mt-3 leading-tight">Size the segment you can actually sell to.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Choose one or more filters. The totals update automatically so you can test
              segments, compare opportunities, and pressure-test your GCC go-to-market plan.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
            <div className="flex-1 min-w-0">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Industry
              </label>
              <MultiSelectFilter
                label="Industry"
                options={data?.facets.account_primary_category ?? []}
                value={filters.account_primary_category}
                onValueChange={(next) =>
                  setFilters((f) => ({ ...f, account_primary_category: next }))
                }
                disabled={isLoadingFirstTime}
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="mb-2 block text-sm font-medium text-foreground">
                City
              </label>
              <MultiSelectFilter
                label="City"
                options={data?.facets.center_city ?? []}
                value={filters.center_city}
                onValueChange={(next) =>
                  setFilters((f) => ({ ...f, center_city: next }))
                }
                disabled={isLoadingFirstTime}
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Company
              </label>
              <AccountSearchFilter
                query={accountSearch}
                selectedAccount={filters.account_global_legal_name[0]}
                suggestions={data?.facets.account_global_legal_name ?? []}
                isSearching={isSearchingAccounts}
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

          {/* Counts */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
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

          <p className="mt-8 text-sm text-muted-foreground">
            {hasAppliedFilters
              ? `Your current market contains ${counts.accounts.toLocaleString()} target accounts across ${counts.centers.toLocaleString()} centres, with ${counts.prospects.toLocaleString()} mapped decision-makers.`
              : "Start with the full India GCC ecosystem, then apply filters to isolate the market that fits your offer."}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tracker;
