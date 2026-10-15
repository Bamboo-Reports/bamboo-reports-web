"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// All optimised stills from past roundtables, shown as a scrolling strip
// in a fresh order on every visit.
const shuffle = <T,>(items: T[]) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const ROUNDTABLE_PHOTOS = Array.from(
  { length: 18 },
  (_, i) => `/roundtables/${i + 1}-960.webp`,
);

const RoundtableStrip = ({ className }: { className?: string }) => {
  // Shuffle after hydration: the prerendered HTML has to match the first
  // client render, so both start from the fixed order.
  const [photos, setPhotos] = useState(ROUNDTABLE_PHOTOS);
  useEffect(() => setPhotos(shuffle(ROUNDTABLE_PHOTOS)), []);

  return (
    <div
      className={cn("roundtable-strip", className)}
      role="img"
      aria-label="Photographs from past roundtable sessions, hosted by Bamboo Reports and by clients, across Mumbai, NCR and Bengaluru"
    >
      <div className="roundtable-strip-track">
        {photos.map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            width={960}
            height={540}
            loading="lazy"
            decoding="async"
            className="h-40 w-auto flex-shrink-0 rounded-md border border-line object-cover md:h-52"
          />
        ))}
        {/* Second copy of the strip so the loop wraps seamlessly. */}
        {photos.map((src) => (
          <img
            key={`${src}-dup`}
            src={src}
            alt=""
            width={960}
            height={540}
            loading="lazy"
            decoding="async"
            aria-hidden
            className="h-40 w-auto flex-shrink-0 rounded-md border border-line object-cover md:h-52"
          />
        ))}
      </div>
    </div>
  );
};

export default RoundtableStrip;
