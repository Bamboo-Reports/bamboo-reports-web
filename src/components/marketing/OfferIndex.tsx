"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type IndexEntry = {
  title: string;
  body: string;
  badge?: string;
  /** Pre-rendered icon element (server components can't pass components). */
  icon: ReactNode;
};

/** Splits copy at its first colon or sentence end so the lead can be set heavier. */
const leadIn = (text: string): [string, string] | null => {
  const match = /^(.+?(?::|[.?!](?=\s+[A-Z0-9])))\s+(.+)$/s.exec(text);
  return match ? [match[1], match[2]] : null;
};

/**
 * A set of offerings read like an index: on desktop the entries are a
 * selectable list and the chosen one's description opens beside it, so one
 * description is read at a time instead of several side by side. Below lg
 * the tabs step aside and every entry is listed in full. All copy is in the
 * DOM at every size. Used for products, campaign formats and audiences.
 */
const OfferIndex = ({ items, label }: { items: IndexEntry[]; label: string }) => {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowUp: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (keys[event.key] + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="hidden border-b border-line lg:flex lg:flex-col"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.title}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "group relative flex items-center gap-4 border-t border-line py-5 pl-5 text-left transition-colors duration-200 ease-out-quart",
                selected ? "text-ink" : "text-ink-soft hover:text-ink",
              )}
            >
              {/* The orange tick slides in to mark the open product. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-[1px] bg-accent transition-transform duration-200 ease-out-quart",
                  selected ? "scale-y-100" : "scale-y-0",
                )}
              />
              <span className={cn("transition-colors duration-200", selected ? "text-primary" : "text-ink-muted group-hover:text-primary")}>
                {item.icon}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-lg font-semibold">{item.title}</span>
                {item.badge ? <span className="text-xs font-semibold text-primary">{item.badge}</span> : null}
              </span>
            </button>
          );
        })}
      </div>

      {/* On desktop every panel shares one grid cell and only the open one is
          visible, so the block keeps the tallest panel's height and switching
          products never shifts the page. */}
      <div className="border-b border-line lg:grid lg:border-b-0">
        {items.map((item, index) => {
          const parts = leadIn(item.body);
          return (
            <div
              key={item.title}
              role="tabpanel"
              id={`${baseId}-panel-${index}`}
              aria-labelledby={`${baseId}-tab-${index}`}
              className={cn(
                "flex flex-col gap-5 border-t border-line py-8 lg:border-t-0 lg:pt-5 lg:[grid-area:1/1]",
                index === active ? "lg:motion-safe:animate-rise-in" : "lg:invisible",
              )}
            >
              <span className="text-primary [&>svg]:size-9">{item.icon}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-headline font-display-soft text-ink">{item.title}</h3>
                {item.badge ? <p className="text-sm font-semibold text-primary">{item.badge}</p> : null}
              </div>
              <p className="max-w-[58ch] text-lg leading-relaxed text-ink-soft lg:text-xl lg:leading-relaxed">
                {parts ? (
                  <>
                    <span className="font-semibold text-ink">{parts[0]}</span> {parts[1]}
                  </>
                ) : (
                  item.body
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfferIndex;
