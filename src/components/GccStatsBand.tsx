import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TRACKER_STATS } from "@/lib/trackerStats";

const nf = (n: number) => n.toLocaleString("en-US");

const STATS = [
  { label: "GCCs tracked", value: nf(TRACKER_STATS.accountsTracked) },
  { label: "Centres", value: nf(TRACKER_STATS.centers) },
  { label: "Indian cities", value: nf(TRACKER_STATS.cities) },
  { label: "Industries", value: nf(TRACKER_STATS.industries) },
  { label: "Decision-makers", value: nf(TRACKER_STATS.decisionMakers) },
];

// Homepage headline numbers, generated at build time from the tracker data so
// they can never drift from the /gcc directory.
const GccStatsBand = () => (
  <section className="border-y bg-muted/30 px-4 py-10 md:py-14">
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold tracking-tight text-foreground md:text-4xl tabular-nums">
              {stat.value}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground md:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/gcc"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Explore the India GCC directory
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default GccStatsBand;
