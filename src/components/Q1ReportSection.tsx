import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Q1ReportSection = () => (
  <section className="relative overflow-hidden bg-navy px-4 py-12 md:py-16">
    <div className="absolute inset-x-0 top-0 flex h-1" aria-hidden>
      <div className="w-2/3 bg-primary" />
      <div className="w-1/3 bg-accent" />
    </div>

    <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-14 gap-y-8">
      <div>
        <p className="flex items-center gap-3 text-sm font-semibold tabular-nums text-white/70">
          <span className="h-px w-8 bg-accent" aria-hidden />
          Q1 2026-27
        </p>

        <h2 className="mt-4 max-w-2xl text-balance text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
          Every GCC move, <span className="text-accent">tracked.</span>
        </h2>

        <p className="mt-3 max-w-xl leading-relaxed text-white/70">
          This free quarterly report tells you who set up or expanded near
          you, where the hiring went, and which corridors are opening next.
        </p>
      </div>

      <Button
        asChild
        size="lg"
        className="group h-12 w-full rounded-full bg-white px-8 text-base font-semibold text-navy hover:bg-white/90 sm:w-auto"
      >
        <Link to="/reports/india-gcc-report-q1-fy27?src=home-q1report">
          Register for the report
          <ArrowRight
            className="ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            aria-hidden
          />
        </Link>
      </Button>
    </div>
  </section>
);

export default Q1ReportSection;
