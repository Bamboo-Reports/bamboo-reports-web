import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TRACKER_STATS } from "@/lib/trackerStats";

const STATS: Array<{ label: string; value: number }> = [
  { label: "GCC accounts", value: TRACKER_STATS.accountsTracked },
  { label: "GCC centers", value: TRACKER_STATS.centers },
  { label: "Decision-makers", value: TRACKER_STATS.decisionMakers },
];

const COUNT_DURATION_MS = 1400;

// Counts from 0 to target once `active` flips true. Skips straight to the
// final value when the visitor prefers reduced motion.
const useCountUp = (target: number, active: boolean) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
};

const StatCell = ({
  label,
  value,
  active,
}: {
  label: string;
  value: number;
  active: boolean;
}) => {
  const shown = useCountUp(value, active);
  return (
    <div>
      <span className="block h-1 w-8 rounded-full bg-accent" aria-hidden />
      <dd className="mt-4 text-4xl font-bold tracking-tight tabular-nums text-navy md:text-5xl md:leading-none">
        {shown.toLocaleString("en-US")}
      </dd>
      <dt className="mt-2.5 text-sm font-medium text-muted-foreground">
        {label}
      </dt>
    </div>
  );
};

// The dataset readout, set on the page background as a ruled ledger row.
// Figures are generated at build time from the tracker data so they can
// never drift from the /gcc directory.
const GccStatsBand = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-t px-4 pt-12 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b pb-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-navy">
            India GCC coverage
          </h2>
          <Link
            to="/gcc"
            className="group inline-flex items-center text-sm font-semibold text-navy transition-colors hover:text-primary"
          >
            Explore the India GCC directory
            <ArrowRight
              className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              aria-hidden
            />
          </Link>
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-8 pt-10 sm:grid-cols-3">
          {STATS.map((stat) => (
            <StatCell
              key={stat.label}
              label={stat.label}
              value={stat.value}
              active={active}
            />
          ))}
        </dl>
      </div>
    </section>
  );
};

export default GccStatsBand;
