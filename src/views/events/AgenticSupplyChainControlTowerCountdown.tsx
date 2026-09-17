"use client";

import { useEffect, useState } from "react";

/** Same deep coral as the event page's type and bands. */
const CORAL_DEEP = "hsl(348 68% 40%)";
const EVENT_START = new Date("2026-09-10T08:00:00+05:30").getTime();

const getTimeRemaining = () => {
  const totalSeconds = Math.max(0, Math.floor((EVENT_START - Date.now()) / 1000));

  return {
    totalSeconds,
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
};

type TimeRemaining = ReturnType<typeof getTimeRemaining>;

const CountdownBar = () => {
  // Starts empty and fills in after mount: the server and the browser would
  // otherwise compute different remaining times and fail hydration.
  const [remaining, setRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(getTimeRemaining());
    tick();
    const timer = window.setInterval(tick, 1_000);

    return () => window.clearInterval(timer);
  }, []);

  if (!remaining || remaining.totalSeconds === 0) return null;

  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <aside
      className="sticky top-0 z-40 text-white"
      style={{ backgroundColor: CORAL_DEEP }}
      aria-label="Event countdown"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-2.5 sm:gap-6 md:px-6">
        <p className="hidden text-sm font-semibold sm:block">Roundtable begins in</p>
        <dl
          className="flex items-center gap-3 sm:gap-5"
          role="timer"
          aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds until the event`}
        >
          {units.map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-1">
              <dt className="order-2 text-[10px] font-semibold uppercase tracking-wide text-white/75">
                {label}
              </dt>
              <dd className="order-1 min-w-5 text-right text-lg font-bold tabular-nums">
                {String(value).padStart(2, "0")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
};

export default CountdownBar;
