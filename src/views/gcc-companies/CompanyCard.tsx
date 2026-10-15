import { RiMapPin2Line } from "@remixicon/react";
import Link from "next/link";
import CompanyLogo from "@/components/CompanyLogo";
import { TrailingArrow } from "@/components/ui/button";
import { formatBand, type GccCompanySummary } from "@/lib/gccCompanies";
import { cn } from "@/lib/utils";

/** A company in the directory grid, also reused for similar companies on profiles. */
const CompanyCard = ({
  c,
  headingLevel = "h2",
  highlightCities = [],
}: {
  c: GccCompanySummary;
  headingLevel?: "h2" | "h3";
  /** The directory's city filter, so the card shows why it matched. */
  highlightCities?: string[];
}) => {
  const Heading = headingLevel;
  const headingId = `company-${c.slug}`;

  // Filtered cities lead, so a match never hides behind "+N more".
  const picked = (name: string) => highlightCities.includes(name);
  const cities = highlightCities.length
    ? [...c.cities].sort((a, b) => Number(picked(b.name)) - Number(picked(a.name)))
    : c.cities;
  const shownCities = cities.slice(0, 3);
  const moreCities = cities.length - shownCities.length;

  return (
    <Link
      href={`/gcc-companies/${c.slug}`}
      aria-labelledby={headingId}
      className="group flex h-full flex-col rounded-lg border border-line bg-background p-5 transition-colors duration-200 ease-out-quart hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start gap-3.5">
        <CompanyLogo name={c.name} website={c.website} />
        <div className="min-w-0">
          <Heading
            id={headingId}
            className="text-base font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-primary"
          >
            {c.name}
          </Heading>
          <p className="mt-0.5 text-sm text-ink-soft">{c.category}</p>
          {c.hq ? <p className="text-sm text-ink-muted">{c.hq}</p> : null}
        </div>
      </div>

      {/* The three figures lead the card; hairlines separate them, no box. */}
      <dl className="mt-5 grid grid-cols-3 divide-x divide-line border-t border-line pt-4">
        {[
          { label: "Centres", value: c.centres },
          { label: "In India since", value: c.since ?? "–" },
          { label: "India headcount", value: formatBand(c.headcount) ?? "–" },
        ].map((s) => (
          // Label first in the markup, figure first on screen.
          <div key={s.label} className="flex flex-col-reverse justify-end gap-1 px-3 first:pl-0 last:pr-0">
            <dt className="text-xs leading-snug text-ink-muted">{s.label}</dt>
            <dd className="text-lg font-display-soft leading-tight tabular-nums text-ink">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-col gap-3">
        <p className="flex gap-1.5 text-sm text-ink-soft">
          <RiMapPin2Line aria-hidden className="mt-0.5 size-4 shrink-0 text-ink-muted" />
          <span className="sr-only">Cities: </span>
          <span>
            {shownCities.map((city, i) => (
              <span key={city.name}>
                {i > 0 ? ", " : null}
                <span className={cn(picked(city.name) && "font-semibold text-ink")}>{city.name}</span>
              </span>
            ))}
            {moreCities > 0 ? <span className="text-ink-muted"> +{moreCities} more</span> : null}
          </span>
        </p>

        {c.functions.length ? (
          <ul aria-label="Functions" className="flex flex-wrap gap-1.5">
            {c.functions.slice(0, 3).map((f) => (
              <li key={f} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-ink-soft">
                {f}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <span aria-hidden className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">
        View profile
        <TrailingArrow />
      </span>
    </Link>
  );
};

export default CompanyCard;
