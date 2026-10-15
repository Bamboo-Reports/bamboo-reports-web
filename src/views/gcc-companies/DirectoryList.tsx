"use client";

import { RiArrowLeftSLine, RiArrowRightSLine, RiSearchLine } from "@remixicon/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GccCompanySummary } from "@/lib/gccCompanies";
import { Button } from "@/components/ui/button";
import CompanyCard from "./CompanyCard";
import { cn } from "@/lib/utils";

const ALL = "";
const PAGE_SIZE = 20;

const sortedUnique = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

const fieldClass =
  "h-11 w-full rounded-md border border-line-strong bg-background px-3 text-sm font-normal text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const Select = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) => (
  <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-ink-soft">
    {label}
    <select value={value} onChange={(e) => onChange(e.target.value)} className={fieldClass}>
      <option value={ALL}>All</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </label>
);

/** Page numbers with gaps: 1 … 4 5 6 … 18. */
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
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={arrow}
      >
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

const readPage = () => {
  const p = Number(new URLSearchParams(window.location.search).get("page"));
  return Number.isInteger(p) && p > 1 ? p : 1;
};

/** Search, filters and pages over the directory card grid. */
const DirectoryList = ({ companies }: { companies: GccCompanySummary[] }) => {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState(ALL);
  const [city, setCity] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [page, setPage] = useState(1);
  const top = useRef<HTMLDivElement>(null);

  // Static export: the page number lives in ?page= and is read after mount.
  useEffect(() => setPage(readPage()), []);

  const options = useMemo(
    () => ({
      industries: sortedUnique(companies.map((c) => c.category)),
      cities: sortedUnique(companies.flatMap((c) => c.cities.map((x) => x.name))),
      types: sortedUnique(companies.flatMap((c) => c.types)),
    }),
    [companies],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies.filter(
      (c) =>
        (!q || c.name.toLowerCase().includes(q)) &&
        (!industry || c.category === industry) &&
        (!city || c.cities.some((x) => x.name === city)) &&
        (!type || c.types.includes(type)),
    );
  }, [companies, query, industry, city, type]);

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const filtered = Boolean(query || industry || city || type);

  const goTo = (next: number, scroll = true) => {
    setPage(next);
    const url = new URL(window.location.href);
    if (next > 1) url.searchParams.set("page", String(next));
    else url.searchParams.delete("page");
    window.history.replaceState(null, "", url);
    if (scroll) top.current?.scrollIntoView({ block: "start" });
  };

  // Any filter change starts again from page 1.
  const filter =
    <T,>(set: (v: T) => void) =>
    (v: T) => {
      set(v);
      goTo(1, false);
    };

  const clearFilters = () => {
    setQuery("");
    setIndustry(ALL);
    setCity(ALL);
    setType(ALL);
    goTo(1, false);
  };

  const from = results.length ? (current - 1) * PAGE_SIZE + 1 : 0;
  const to = Math.min(current * PAGE_SIZE, results.length);

  return (
    <div ref={top} className="flex scroll-mt-28 flex-col gap-6">
      <div className="grid gap-4 rounded-lg border border-line bg-surface-subtle p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
        <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-ink-soft">
          Company
          <span className="relative">
            <RiSearchLine aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => filter(setQuery)(e.target.value)}
              placeholder="Search by name"
              className={cn(fieldClass, "pl-9 placeholder:text-ink-muted")}
            />
          </span>
        </label>
        <Select label="Industry" value={industry} options={options.industries} onChange={filter(setIndustry)} />
        <Select label="City" value={city} options={options.cities} onChange={filter(setCity)} />
        <Select label="Centre type" value={type} options={options.types} onChange={filter(setType)} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
        <p aria-live="polite">
          {results.length ? (
            <>
              Showing <span className="tabular-nums text-ink">{from}–{to}</span> of{" "}
              <span className="tabular-nums text-ink">{results.length}</span>{" "}
              {results.length === 1 ? "company" : "companies"}
            </>
          ) : (
            "No companies match these filters"
          )}
        </p>
        {filtered ? (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {shown.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c) => (
            <li key={c.slug}>
              <CompanyCard c={c} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-line px-6 py-12 text-center">
          <p className="max-w-[48ch] text-ink-soft">
            Try a different name, or clear the filters to see all {companies.length} companies.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}

      <Pagination page={current} pages={pages} onChange={(p) => goTo(p)} />
    </div>
  );
};

export default DirectoryList;
