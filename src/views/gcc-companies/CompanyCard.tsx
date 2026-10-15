import Link from "next/link";
import CompanyLogo from "@/components/CompanyLogo";
import { TrailingArrow } from "@/components/ui/button";
import { formatBand, type GccCompanySummary } from "@/lib/gccCompanies";

/** A company in the directory grid, also reused for similar companies on profiles. */
const CompanyCard = ({ c, headingLevel = "h2" }: { c: GccCompanySummary; headingLevel?: "h2" | "h3" }) => {
  const Heading = headingLevel;
  const shownCities = c.cities.slice(0, 3).map((city) => city.name);
  const moreCities = c.cities.length - shownCities.length;

  return (
    <Link
      href={`/gcc-companies/${c.slug}`}
      className="group flex h-full flex-col gap-4 rounded-lg border border-line bg-background p-5 transition-colors duration-200 ease-out-quart hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start gap-3">
        <CompanyLogo name={c.name} website={c.website} />
        <div className="min-w-0">
          <Heading className="text-base font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-primary">
            {c.name}
          </Heading>
          <p className="mt-0.5 text-sm text-ink-muted">{c.category}</p>
          {c.hq ? <p className="text-sm text-ink-muted">{c.hq}</p> : null}
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-3 border-y border-line py-3 text-sm">
        {[
          { label: "Centres", value: c.centres },
          { label: "In India since", value: c.since ?? "–" },
          { label: "Headcount", value: formatBand(c.headcount) ?? "–" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col justify-between gap-0.5">
            <dt className="leading-snug text-ink-muted">{s.label}</dt>
            <dd className="font-semibold tabular-nums text-ink">{s.value}</dd>
          </div>
        ))}
      </dl>

      <p className="text-sm text-ink-soft">
        {shownCities.join(", ")}
        {moreCities > 0 ? <span className="text-ink-muted"> +{moreCities} more</span> : null}
      </p>

      {c.functions.length ? (
        <ul className="flex flex-wrap gap-1.5">
          {c.functions.slice(0, 3).map((f) => (
            <li key={f} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-ink-soft">
              {f}
            </li>
          ))}
        </ul>
      ) : null}

      <span className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-semibold text-primary">
        View profile
        <TrailingArrow />
      </span>
    </Link>
  );
};

export default CompanyCard;
