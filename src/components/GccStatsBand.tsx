import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TRACKER_STATS } from "@/lib/trackerStats";

const nf = (n: number) => n.toLocaleString("en-US");

const STATS: Array<{ label: string; value: string }> = [
  { label: "GCCs tracked", value: nf(TRACKER_STATS.accountsTracked) },
  { label: "GCC centres", value: nf(TRACKER_STATS.centers) },
  { label: "Indian cities", value: nf(TRACKER_STATS.cities) },
  { label: "Industries", value: nf(TRACKER_STATS.industries) },
  { label: "Decision-makers", value: nf(TRACKER_STATS.decisionMakers) },
];

// The dataset readout: the one dark section on the page. Figures are
// generated at build time from the tracker data so they can never drift
// from the /gcc directory.
const GccStatsBand = () => (
  <section className="bg-[#07253A] text-white">
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/12 pb-4">
        <h2 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          The India GCC dataset
        </h2>
        <p className="text-sm text-white/65">Updated July 2026</p>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 pt-10 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <dd className="text-4xl font-bold tracking-tight tabular-nums md:text-[44px] md:leading-none">
              {stat.value}
            </dd>
            <dt className="mt-2.5 text-sm font-medium text-white/65">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>

      <div className="mt-12 border-t border-white/12 pt-5">
        <Link
          to="/gcc"
          className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-white hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          Explore the India GCC directory
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  </section>
);

export default GccStatsBand;
