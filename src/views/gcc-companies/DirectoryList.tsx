"use client";

import { RiArrowLeftSLine, RiArrowRightLine, RiArrowRightSLine, RiCloseLine, RiSearchLine } from "@remixicon/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalSchedulingButton } from "@/components/CalSchedulingButton";
import { Button } from "@/components/ui/button";
import { longLabel, type GccCompanySummary } from "@/lib/gccCompanies";
import { cn } from "@/lib/utils";
import CompanyCard from "./CompanyCard";
import MultiSelect from "./MultiSelect";
import SingleSelect from "./SingleSelect";

// Divides evenly into the three-column grid, so a full page has no orphan row.
const PAGE_SIZE = 21;
// Cities with the most companies get their own group at the top of the list.
const HUB_COUNT = 8;

type Compare = (a: GccCompanySummary, b: GccCompanySummary) => number;

const SORTS: Record<string, { label: string; compare: Compare }> = {
  az: { label: "Name, A to Z", compare: () => 0 },
  centres: { label: "Most India centres", compare: (a, b) => b.centres - a.centres },
  headcount: { label: "Largest India headcount", compare: (a, b) => b.headcountRank - a.headcountRank },
  newest: { label: "Newest in India", compare: (a, b) => (b.since ?? 0) - (a.since ?? 0) },
};

type Filters = { q: string; industry: string[]; city: string[] };
type State = Filters & { sort: string; page: number };
const EMPTY: State = { q: "", industry: [], city: [], sort: "az", page: 1 };

const fieldClass =
  "h-11 w-full rounded-md border border-line-strong bg-background px-3 text-sm font-normal text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const matches = (c: GccCompanySummary, f: Filters, skip?: keyof Filters) => {
  const q = f.q.trim().toLowerCase();
  return (
    (skip === "q" || !q || c.search.includes(q)) &&
    (skip === "industry" || !f.industry.length || f.industry.includes(c.category)) &&
    (skip === "city" || !f.city.length || c.cities.some((x) => f.city.includes(x.name)))
  );
};

type Facet = "industry" | "city";

const valuesOf = (c: GccCompanySummary, facet: Facet) =>
  facet === "industry" ? [c.category] : c.cities.map((x) => x.name);

/** Options still possible given the other filters; the rest are disabled. */
const reachable = (companies: GccCompanySummary[], f: Filters, facet: Facet) =>
  new Set(companies.filter((c) => matches(c, f, facet)).flatMap((c) => valuesOf(c, facet)));

/** Page numbers with gaps: 1 … 4 5 6 … 17. */
const pageList = (page: number, pages: number): (number | "gap")[] => {
  const keep = new Set([1, pages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages));
  const sorted = [...keep].sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? ["gap" as const, p] : [p]));
};

const Pagination = ({ page, pages, onChange }: { page: number; pages: number; onChange: (page: number) => void }) => {
  if (pages <= 1) return null;
  const step =
    "inline-flex size-11 items-center justify-center rounded-md text-sm font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const arrow = cn(step, "text-ink hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-35");

  return (
    <nav aria-label="Pages" className="flex items-center justify-center gap-1">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Previous page" className={arrow}>
        <RiArrowLeftSLine aria-hidden className="size-5" />
      </button>
      <span className="px-3 text-sm text-ink-soft sm:hidden">
        Page <span className="tabular-nums text-ink">{page}</span> of <span className="tabular-nums">{pages}</span>
      </span>
      {pageList(page, pages).map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} aria-hidden className="hidden w-6 text-center text-ink-muted sm:inline">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              step,
              "hidden sm:inline-flex",
              p === page ? "bg-primary text-primary-foreground" : "text-ink-soft hover:bg-surface-muted hover:text-ink",
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pages}
        aria-label="Next page"
        className={arrow}
      >
        <RiArrowRightSLine aria-hidden className="size-5" />
      </button>
    </nav>
  );
};

// Static export: the list state lives in the query string, so Back from a
// profile and shared links restore it. Multi-picks repeat: ?city=Pune&city=Chennai.
const readState = (): State => {
  const p = new URLSearchParams(window.location.search);
  const page = Number(p.get("page"));
  const sort = p.get("sort") ?? "az";
  return {
    q: p.get("q") ?? "",
    industry: p.getAll("industry"),
    city: p.getAll("city"),
    sort: sort in SORTS ? sort : "az",
    page: Number.isInteger(page) && page > 1 ? page : 1,
  };
};

const writeState = (s: State) => {
  const url = new URL(window.location.href);
  (Object.keys(EMPTY) as (keyof State)[]).forEach((key) => {
    url.searchParams.delete(key);
    const value = s[key];
    if (Array.isArray(value)) value.forEach((v) => url.searchParams.append(key, v));
    else if (value !== EMPTY[key]) url.searchParams.set(key, String(value));
  });
  window.history.replaceState(null, "", url);
};

/** Search, filters, sort and pages over the directory card grid. */
const DirectoryList = ({
  companies,
  totals,
}: {
  companies: GccCompanySummary[];
  /** Everything in the database, for "350 of 2,493". */
  totals: { companies: number; centres: number };
}) => {
  const [state, setState] = useState<State>(EMPTY);
  const top = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLParagraphElement>(null);

  useEffect(() => setState(readState()), []);

  const update = (patch: Partial<State>, opts: { scroll?: boolean } = {}) => {
    // Any change other than paging starts again from page 1.
    const next = { ...state, ...patch, page: patch.page ?? 1 };
    setState(next);
    writeState(next);
    if (opts.scroll) {
      top.current?.scrollIntoView({ block: "start" });
      status.current?.focus({ preventScroll: true });
    }
  };

  // The biggest hubs, by number of companies across the whole directory.
  const hubs = useMemo(() => {
    const counts = new Map<string, number>();
    companies.forEach((c) => c.cities.forEach((x) => counts.set(x.name, (counts.get(x.name) ?? 0) + 1)));
    return [...counts].sort((a, b) => b[1] - a[1]).slice(0, HUB_COUNT).map(([name]) => name);
  }, [companies]);

  const allValues = useMemo(() => {
    const sorted = (facet: Facet) =>
      [...new Set(companies.flatMap((c) => valuesOf(c, facet)))].sort((a, b) => a.localeCompare(b));
    return { industry: sorted("industry"), city: sorted("city") };
  }, [companies]);

  const facets = useMemo(() => {
    const options = (facet: Facet) => {
      const open = reachable(companies, state, facet);
      return allValues[facet].map((value) => ({ value, label: longLabel(value), disabled: !open.has(value) }));
    };
    const cities = options("city");
    return {
      industry: { groups: [{ options: options("industry") }] },
      city: {
        groups: [
          { label: "Largest hubs", options: cities.filter((o) => hubs.includes(o.value)).sort((a, b) => hubs.indexOf(a.value) - hubs.indexOf(b.value)) },
          { label: "Other cities", options: cities.filter((o) => !hubs.includes(o.value)) },
        ],
      },
    };
  }, [companies, state, allValues, hubs]);

  const results = useMemo(() => {
    const compare = SORTS[state.sort].compare;
    return companies
      .filter((c) => matches(c, state))
      .sort((a, b) => compare(a, b) || a.name.localeCompare(b.name));
  }, [companies, state]);

  // The headline figures follow the filters: matching companies and their centres.
  const stats = [
    { shown: results.length, total: totals.companies, label: "Companies listed" },
    { shown: results.reduce((sum, c) => sum + c.centres, 0), total: totals.centres, label: "India centres listed" },
  ];

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(state.page, pages);
  const shown = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const filtered = Boolean(state.q || state.industry.length || state.city.length);
  const from = results.length ? (current - 1) * PAGE_SIZE + 1 : 0;
  const to = Math.min(current * PAGE_SIZE, results.length);
  // Each picked industry or city, as a removable chip in the status strip.
  const active = [
    ...state.industry.map((value) => ({ key: "industry" as const, value })),
    ...state.city.map((value) => ({ key: "city" as const, value })),
  ];
  const clearFilters = () => update({ q: "", industry: [], city: [] });

  return (
    <div className="flex flex-col gap-10">
      {/* The pair sits at its natural width, split by a hairline, not spread over a grid. */}
      <dl className="flex flex-col gap-6 sm:flex-row sm:items-end sm:divide-x sm:divide-line">
        {stats.map((s) => (
          // Label first in the markup, figure first on screen.
          <div key={s.label} className="flex flex-col-reverse gap-1.5 sm:px-10 sm:first:pl-0">
            <dt className="text-sm text-ink-soft">{s.label}</dt>
            <dd className="flex items-baseline gap-2">
              <span className="text-figure-sm font-display-soft leading-none tabular-nums text-ink">
                {s.shown.toLocaleString("en-IN")}
              </span>
              <span className="text-base tabular-nums text-ink-muted">of {s.total.toLocaleString("en-IN")}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div ref={top} className="flex scroll-mt-28 flex-col gap-6">
        <div className="rounded-lg border border-line bg-background">
          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))]">
            <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-ink-soft sm:col-span-2 lg:col-span-1">
              Company
              <span className="relative">
                <RiSearchLine aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
                <input
                  type="search"
                  value={state.q}
                  onChange={(e) => update({ q: e.target.value })}
                  placeholder="Search by name"
                  className={cn(fieldClass, "pl-9 placeholder:text-ink-muted")}
                />
              </span>
            </label>
            <MultiSelect
              label="Industry"
              values={state.industry}
              groups={facets.industry.groups}
              onChange={(industry) => update({ industry })}
            />
            <MultiSelect
              label="City"
              values={state.city}
              groups={facets.city.groups}
              onChange={(city) => update({ city })}
              searchable
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-b-lg border-t border-line bg-surface-subtle px-4 py-3 text-sm text-ink-soft sm:px-5">
            <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
              <p
                ref={status}
                tabIndex={-1}
                aria-live="polite"
                className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {results.length ? (
                  <>
                    Showing <span className="tabular-nums text-ink">{from}–{to}</span> of{" "}
                    <span className="tabular-nums text-ink">{results.length}</span>{" "}
                    {results.length === 1 ? "company" : "companies"}
                  </>
                ) : (
                  "No companies match"
                )}
              </p>
              {active.map(({ key, value }) => (
                <button
                  key={`${key}-${value}`}
                  type="button"
                  onClick={() => update({ [key]: state[key].filter((x) => x !== value) })}
                  aria-label={`Remove ${value}`}
                  className="inline-flex h-7 items-center gap-1 rounded-full border border-line-strong bg-background pl-2.5 pr-1.5 text-xs font-medium text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {value}
                  <RiCloseLine aria-hidden className="size-3.5 text-ink-muted" />
                </button>
              ))}
              {filtered ? (
                // Padding gives the text link a 44px tap area without moving the row.
                <button
                  type="button"
                  onClick={clearFilters}
                  className="-my-3 rounded-sm px-1 py-3 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
            <SingleSelect
              label="Sort by"
              value={state.sort}
              options={Object.entries(SORTS).map(([value, s]) => ({ value, label: s.label }))}
              onChange={(sort) => update({ sort })}
            />
          </div>
        </div>

        {shown.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((c) => (
              <li key={c.slug}>
                <CompanyCard c={c} highlightCities={state.city} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-5 rounded-lg border border-line px-6 py-12 text-center">
            <p className="max-w-[52ch] text-ink-soft">
              This directory shows {companies.length} of the {totals.companies.toLocaleString("en-IN")} companies we track. The full
              list is in the platform.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
              <Button asChild>
                <CalSchedulingButton>
                  Book a demo
                  <RiArrowRightLine aria-hidden />
                </CalSchedulingButton>
              </Button>
            </div>
          </div>
        )}

        <Pagination page={current} pages={pages} onChange={(page) => update({ page }, { scroll: true })} />
      </div>
    </div>
  );
};

export default DirectoryList;
