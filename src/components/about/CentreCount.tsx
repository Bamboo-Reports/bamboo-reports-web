"use client";

import { useEffect, useRef, useState } from "react";

// Oct 2026 export: 6,129 centres, rounded down so the figure never overstates.
const CENTRE_COUNT = 6100;

// 6100 -> "6,100": the ledger always shows the thousands separator.
const formatCentres = (n: number) => n.toLocaleString("en-US");

/**
 * Counts from 0 to target when the element scrolls into view. Jumps
 * straight to the final figure under prefers-reduced-motion.
 */
const useCountUp = (target: number, durationMs = 1600) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }

    let frame: number;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setValue(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, durationMs]);

  return { ref, value };
};

// Its own client component so the count-up re-renders only this figure,
// not the whole About page.
const CentreCount = () => {
  const centres = useCountUp(CENTRE_COUNT);

  return (
    <p
      ref={centres.ref}
      className="font-display tabular-nums text-[clamp(4rem,2.5rem+6vw,7.5rem)] leading-none tracking-[-0.03em] text-primary"
    >
      {/* Crawlers and screen readers get the final figure; the count-up
          is visual only. The invisible copy reserves the final width so
          the "+" does not shift as digits are added. */}
      <span className="sr-only">{formatCentres(CENTRE_COUNT)}+</span>
      <span aria-hidden="true">
        <span className="inline-grid">
          <span className="invisible col-start-1 row-start-1">{formatCentres(CENTRE_COUNT)}</span>
          <span className="col-start-1 row-start-1 text-right">{formatCentres(centres.value)}</span>
        </span>
        <span className="text-accent">+</span>
      </span>
    </p>
  );
};

export default CentreCount;
