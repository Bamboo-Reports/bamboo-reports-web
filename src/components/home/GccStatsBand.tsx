"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";

// Dataset figures as of the Aug 2026 export. Update by hand on refresh.
const STATS: Array<{ label: string; value: number; displayValue?: string }> = [
  { label: "Companies", value: 2437 },
  { label: "Centres", value: 5962, displayValue: "6.0K+" },
  { label: "Headcount", value: 3949355 },
];

const COUNT_DURATION_MS = 1400;

// 2433 -> "2.4K+", 5901 -> "5.9K+", 3949355 -> "3.9M+". Always floors so
// the claim never overstates the dataset figures.
const formatCompact = (n: number) => {
  if (n < 1000) return n.toLocaleString("en-US");
  const scaled = n < 1_000_000 ? n / 1000 : n / 1_000_000;
  const suffix = n < 1_000_000 ? "K+" : "M+";
  const shown = scaled < 10 ? Math.floor(scaled * 10) / 10 : Math.floor(scaled);
  return `${shown}${suffix}`;
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
  displayValue,
  active,
}: {
  label: string;
  value: number;
  displayValue?: string;
  active: boolean;
}) => {
  const shown = useCountUp(value, active);
  const final = displayValue ?? formatCompact(value);
  const formatted = shown === value ? final : formatCompact(shown);
  const hasPlus = formatted.endsWith("+");
  const digits = hasPlus ? formatted.slice(0, -1) : formatted;
  return (
    <div className="flex flex-col border-l border-line px-2 text-center first:border-l-0 sm:px-6">
      <dt className="order-2 mt-2.5 text-sm font-semibold text-ink-muted">
        {label}
      </dt>
      <dd className="order-1 font-display tabular-nums text-figure text-ink md:text-figure-lg">
        {/* Crawlers and screen readers get the final figure; the count-up
            starts at 0 in the prerendered HTML, so it is visual only. */}
        <span className="sr-only">{final}</span>
        <span className="relative" aria-hidden="true">
          {digits}
          {hasPlus && <span className="text-accent sm:absolute sm:left-full">+</span>}
        </span>
      </dd>
    </div>
  );
};

// The dataset readout, set on the page background as a ruled ledger row.
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
    <section ref={sectionRef} className="border-t border-line bg-surface-subtle py-12 sm:py-16">
      <Container>
        <h2 className="flex items-center gap-3 text-sm font-semibold text-primary">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-[1px] bg-accent" />
          India GCC coverage
          <span aria-hidden="true" className="rule-ticks h-px min-w-8 flex-1" />
        </h2>

        <dl className="grid grid-cols-3 pt-8 sm:pt-10">
          {STATS.map((stat) => (
            <StatCell
              key={stat.label}
              label={stat.label}
              value={stat.value}
              displayValue={stat.displayValue}
              active={active}
            />
          ))}
        </dl>
      </Container>
    </section>
  );
};

export default GccStatsBand;
