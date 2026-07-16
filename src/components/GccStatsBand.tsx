import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRACKER_STATS } from "@/lib/trackerStats";

const STATS: Array<{ label: string; value: number }> = [
  { label: "Companies", value: TRACKER_STATS.accountsTracked },
  { label: "Centers", value: TRACKER_STATS.centers },
  { label: "Leaders", value: TRACKER_STATS.decisionMakers },
];

const COUNT_DURATION_MS = 1400;

// 2433 -> "2.4K+", 5901 -> "5.9K+", 60760 -> "60K+". Always floors so the
// claim never overstates the live directory figures.
const formatCompact = (n: number) => {
  if (n < 1000) return n.toLocaleString("en-US");
  const thousands = n / 1000;
  const shown =
    thousands < 10 ? Math.floor(thousands * 10) / 10 : Math.floor(thousands);
  return `${shown}K+`;
};

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
  const formatted = formatCompact(shown);
  const hasPlus = formatted.endsWith("+");
  const digits = hasPlus ? formatted.slice(0, -1) : formatted;
  return (
    <div className="flex flex-col text-center sm:border-l sm:px-6 sm:first:border-l-0">
      <dt className="order-2 mt-2.5 text-sm font-medium text-muted-foreground">
        {label}
      </dt>
      <dd className="order-1 text-4xl font-bold tracking-tight tabular-nums text-navy md:text-5xl md:leading-none">
        <span className="relative">
          {digits}
          {hasPlus && (
            <span className="absolute left-full text-accent" aria-hidden>
              +
            </span>
          )}
          {hasPlus && <span className="sr-only">+</span>}
        </span>
      </dd>
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
    <section ref={sectionRef} className="border-t px-4 pb-12 pt-12 md:pb-16 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="border-b pb-4">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-navy">
            India GCC coverage
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-y-8 pt-10 sm:grid-cols-3 sm:gap-y-0">
          {STATS.map((stat) => (
            <StatCell
              key={stat.label}
              label={stat.label}
              value={stat.value}
              active={active}
            />
          ))}
        </dl>

        <div className="mt-10 flex justify-center md:mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group px-7 text-base font-semibold"
          >
            <Link to="/gcc">
              Explore the India GCC directory
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                aria-hidden
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GccStatsBand;
