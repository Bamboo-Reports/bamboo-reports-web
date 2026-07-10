import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const REPORT_COVERAGE = [
  {
    label: "Market movement",
    detail: "New GCC entrants, center launches, and expansion activity.",
  },
  {
    label: "Location shifts",
    detail: "City-by-city movement across the Bengaluru and Hyderabad corridors.",
  },
  {
    label: "Commercial signals",
    detail: "Hiring patterns, BFSI activity, and the buying windows they reveal.",
  },
];

const Q1ReportSection = () => (
  <section className="mt-12 border-y border-navy/15 bg-navy px-4 py-14 md:mt-16 md:py-20">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-5">
        <p className="text-sm font-semibold text-white">
          Bamboo Reports Quarterly Intelligence
        </p>
        <p className="text-sm font-medium tabular-nums text-white/65">
          Q1 2026 <span className="mx-2 text-accent">/</span> India GCC
        </p>
      </div>

      <div className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:pt-14">
        <div>
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-white md:text-4xl">
            The Q1 2026 India GCC Report
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            A decision-ready view of who entered and expanded, where activity
            concentrated, and which signals point to new GCC opportunities.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-white px-7 font-semibold text-navy hover:bg-white/90"
            >
              <Link to="/signup?src=home-q1report">
                Get the report
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  aria-hidden
                />
              </Link>
            </Button>
            <p className="inline-flex items-center gap-2 text-sm text-white/65">
              <CalendarDays className="h-4 w-4 text-accent" aria-hidden />
              Releases July 2026. Free with an account.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white">
            What this report covers
          </h3>
          <dl className="mt-5 border-t border-white/15">
            {REPORT_COVERAGE.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 border-b border-white/15 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-6"
              >
                <dt className="text-sm font-semibold text-accent">
                  {item.label}
                </dt>
                <dd className="text-[15px] leading-relaxed text-white/80">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </section>
);

export default Q1ReportSection;
