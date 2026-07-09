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

// Homepage headline numbers, generated at build time from the tracker data so
// they can never drift from the /gcc directory.
const GccStatsBand = () => (
  <section className="bg-primary text-primary-foreground">
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="grid grid-cols-2 gap-y-8 text-center sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/15">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-4">
            <div className="text-3xl font-bold tracking-tight tabular-nums md:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground/90 md:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center border-t border-white/15 pt-6">
        <Link
          to="/gcc"
          className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
        >
          Explore the India GCC directory
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default GccStatsBand;
