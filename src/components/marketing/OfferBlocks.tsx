import type { RemixiconComponentType } from "@remixicon/react";
import type { ReactNode } from "react";
import { CalSchedulingButton } from "@/components/CalSchedulingButton";
import { TrailingArrow } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/*
 * Layout and content blocks for the offering pages, in the researchnxt.com
 * "field report" idiom: structure comes from hairlines and the type scale,
 * never from boxes, fills or shadows, and the orange tick is the only signal
 * mark. All server components.
 *
 * Lists sit under a full-width heading row in BalancedGrid rows sized to the
 * item count (5 → one row of five or 3 + 2, 4 → one row of four), so every
 * row is filled and an odd count never strands an item or leaves a dead
 * column beside a short heading.
 */

const Tick = ({ className }: { className?: string }) => (
  <span aria-hidden="true" className={cn("block h-1 w-6 shrink-0 rounded-[1px] bg-accent", className)} />
);

/**
 * Renders a title with authored line breaks: "\n" in the copy becomes a
 * break on desktop, where items sit side by side and titles in a row should
 * share a line count. Narrower layouts wrap naturally.
 */
export const Lines = ({ text }: { text: string }) => {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 ? (
            <>
              {" "}
              <br className="hidden lg:inline" />
            </>
          ) : null}
          {part}
        </span>
      ))}
    </>
  );
};

/** Highlighted phrase inside a Statement. */
export const Em = ({ children }: { children: ReactNode }) => <span className="text-primary">{children}</span>;

/**
 * The problem section: heading, the setup paragraph, then the statement as
 * one emphasised line. Plain text, full measure, no devices.
 */
export const ProblemSpread = ({
  eyebrow,
  title,
  meta,
  body,
  statement,
}: {
  eyebrow: string;
  title: ReactNode;
  /** Short facts under the title, e.g. "4 years · Ongoing". */
  meta?: string;
  body: ReactNode;
  statement: ReactNode;
}) => (
  <div className="flex flex-col gap-6">
    <SectionHeading eyebrow={eyebrow} title={title} />
    {meta ? <p className="-mt-2 font-semibold text-ink-muted">{meta}</p> : null}
    <p className="text-lg leading-relaxed text-ink-soft">{body}</p>
    <p className="text-xl font-semibold leading-snug text-ink">{statement}</p>
  </div>
);

/**
 * Section block: the heading (and lede, when there is one) in one column,
 * then the section's content.
 */
export const Block = ({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-12">
    <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />
    {children}
  </div>
);

/**
 * Splits copy at its first natural break (a colon, or the end of the first
 * sentence when more follows) so the lead can be set heavier than the rest.
 * The text itself is untouched; only its emphasis changes.
 */
const leadIn = (text: string): [string, string] | null => {
  // Spaces after the lead are dropped; an authored "\n" there is kept.
  const match = /^(.+?(?::|[.?!](?=\s+[A-Z0-9])))[ ]*(\n?.+)$/s.exec(text);
  return match ? [match[1], match[2]] : null;
};

/** Copy with its lead-in emphasised, for scanning a row of items. */
const LeadText = ({ text, className }: { text: string; className?: string }) => {
  const parts = leadIn(text);
  return (
    <p className={cn("leading-relaxed text-ink-soft", className)}>
      {parts ? (
        <>
          <span className="font-semibold text-ink">
            <Lines text={parts[0]} />
          </span>{" "}
          <Lines text={parts[1]} />
        </>
      ) : (
        <span className="text-ink">
          <Lines text={text} />
        </span>
      )}
    </p>
  );
};

/** Splits items into the fewest rows of at most `max`, front-loading the extras. */
const balancedRows = <T,>(items: T[], max: number): T[][] => {
  const rowCount = Math.ceil(items.length / max);
  const base = Math.floor(items.length / rowCount);
  const extra = items.length % rowCount;
  const rows: T[][] = [];
  let start = 0;
  for (let r = 0; r < rowCount; r++) {
    const size = base + (r < extra ? 1 : 0);
    rows.push(items.slice(start, start + size));
    start += size;
  }
  return rows;
};

/**
 * Items in full rows on desktop (each row splits the width evenly), two
 * columns on tablets with an odd last item spanning, one column on phones.
 * Rows are `display: contents` below lg so the tablet grid sees every item.
 */
const BalancedGrid = <T,>({
  items,
  max,
  getKey,
  render,
}: {
  items: T[];
  max: number;
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
}) => {
  let index = -1;
  return (
    <ul className="grid border-b border-line md:grid-cols-2 md:gap-x-10 lg:block">
      {balancedRows(items, max).map((row, r) => (
        <li key={r} className="contents lg:grid lg:gap-x-10" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
          {row.map((item) => {
            index += 1;
            const strandedOnTablet = items.length % 2 === 1 && index === items.length - 1;
            return (
              <div key={getKey(item)} className={cn("border-t border-line py-7", strandedOnTablet && "md:max-lg:col-span-2")}>
                {render(item)}
              </div>
            );
          })}
        </li>
      ))}
    </ul>
  );
};

export type Feature = { icon: RemixiconComponentType; title: string; desc: string };

/** Capabilities that are peers: icon, title and description over a hairline. */
export const FeatureGrid = ({ items }: { items: Feature[] }) => (
  <ul
    className={cn(
      "grid gap-x-10 gap-y-12 sm:grid-cols-2",
      items.length % 4 === 0 ? "lg:grid-cols-4 lg:gap-x-4" : items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3",
    )}
  >
    {items.map(({ icon: Icon, title, desc }) => (
      <li
        key={title}
        className="flex flex-col gap-3 border-t border-line-strong pt-6 transition-colors duration-200 ease-out-quart hover:border-primary"
      >
        <Icon className="mb-2 size-7 text-primary" aria-hidden />
        <h3 className="text-lg font-semibold text-ink">
          <Lines text={title} />
        </h3>
        <p className="leading-relaxed text-ink-soft">
          <Lines text={desc} />
        </p>
      </li>
    ))}
  </ul>
);

export type Proof = { value: string; label: string; detail?: string };

/**
 * Results as a ruled ledger: the figure on the left, what it measured on the
 * right. `compact` stacks figure over label for a narrow column, and suits
 * figures that are phrases ("Weeks → minutes").
 */
export const ProofLedger = ({
  items,
  compact = false,
  fill = false,
}: {
  items: Proof[];
  compact?: boolean;
  /** Stretch the rows to the column's height when it sits beside a longer list. */
  fill?: boolean;
}) => (
  <ul className={cn("border-b border-line", fill && "flex flex-1 flex-col")}>
    {items.map((item) => (
      <li
        key={item.label}
        className={cn(
          "grid content-center gap-3 border-t border-line py-7",
          fill && "flex-1",
          !compact && "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-baseline md:gap-16",
        )}
      >
        <p className={cn("font-display tabular-nums text-primary", compact ? "text-figure-sm" : "text-figure")}>
          {item.value}
        </p>
        <div className="flex flex-col gap-1.5">
          <p className="font-semibold text-ink">{item.label}</p>
          {item.detail ? <p className="leading-relaxed text-ink-soft">{item.detail}</p> : null}
        </div>
      </li>
    ))}
  </ul>
);

/** Ruled items with an orange tick, in balanced rows; optional sub-line. */
export const RuledList = ({ items, max = 3 }: { items: { name: string; desc?: string }[]; max?: number }) => (
  <BalancedGrid
    items={items}
    max={max}
    getKey={(item) => item.name}
    render={(item) => (
      <div className="flex flex-col gap-4">
        <span aria-hidden="true" className="block h-1 w-6 rounded-[1px] bg-accent" />
        {item.desc ? (
          <div>
            <p className="text-lg font-semibold text-ink">
              <Lines text={item.name} />
            </p>
            <p className="mt-1 leading-relaxed text-ink-soft">{item.desc}</p>
          </div>
        ) : (
          <LeadText text={item.name} className="text-lg" />
        )}
      </div>
    )}
  />
);

export type OfferItem = { title: string; body: string; badge?: string; icon?: RemixiconComponentType };

export type MatrixItem = { icon: RemixiconComponentType; title: string; desc: string };

/**
 * A ruled grid for short entries: hairlines run only between cells (no outer
 * frame, fills or shadows), three across on desktop and two on tablets. The
 * closing cell is a demo prompt, so five entries still complete a 3 x 2 grid.
 * `surface` matches the cells to the band they sit on.
 */
export const OfferMatrix = ({
  items,
  prompt,
  surface = "default",
  columns = 3,
}: {
  items: MatrixItem[];
  /** Closing demo-prompt cell; omit when the items already fill the grid. */
  prompt?: string;
  surface?: "default" | "subtle";
  columns?: 2 | 3;
}) => {
  const cell = cn("flex flex-col gap-3 p-7 sm:p-8", surface === "subtle" ? "bg-surface-subtle" : "bg-background");
  const total = items.length + (prompt ? 1 : 0);
  return (
    <ul className={cn("grid gap-px bg-line sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {items.map(({ icon: Icon, title, desc }, index) => (
        <li
          key={title}
          className={cn(
            cell,
            // An odd last cell spans the two-column tablet grid instead of
            // sitting alone (on desktop too when the grid is two-wide).
            total % 2 === 1 && index === total - 1 && (columns === 3 ? "sm:max-lg:col-span-2" : "sm:col-span-2"),
          )}
        >
          <Icon className="mb-2 size-7 text-primary" aria-hidden />
          <h3 className="text-title font-display-soft text-ink">
            <Lines text={title} />
          </h3>
          <p className="leading-relaxed text-ink-soft">
            <Lines text={desc} />
          </p>
        </li>
      ))}
      {prompt ? (
        <li className={cn(cell, "justify-between gap-6")}>
          <Tick />
          <div className="flex flex-col gap-4">
            <p className="text-title font-display-soft text-ink">{prompt}</p>
            <CalSchedulingButton className="group inline-flex items-center gap-2 self-start font-semibold text-primary transition-colors duration-200 hover:text-primary-hover">
              Get a demo
              <TrailingArrow />
            </CalSchedulingButton>
          </div>
        </li>
      ) : null}
    </ul>
  );
};

/**
 * A measured process: numbered nodes on a dotted rule, left to right on
 * desktop and top to bottom on phones. The numbers carry the sequence, so
 * they stay. Built for four steps.
 */
export const ProcessRail = ({
  steps,
  surface = "subtle",
}: {
  steps: { title: string; body: string }[];
  /** The band the rail sits on; the number nodes take its colour to mask the rule. */
  surface?: "default" | "subtle";
}) => (
  <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
    {/* Runs from the first node's centre to the last's. */}
    <span aria-hidden="true" className="rule-ticks absolute left-5 right-[calc(25%-2.75rem)] top-5 hidden h-px lg:block" />
    <span aria-hidden="true" className="absolute bottom-0 left-5 top-5 w-px bg-line lg:hidden" />
    {steps.map((step, index) => (
      <li key={step.title} className="relative flex gap-6 lg:flex-col">
        <span
          className={cn(
            "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-primary font-figure text-sm font-semibold text-primary",
            surface === "subtle" ? "bg-surface-subtle" : "bg-background",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col gap-3">
          <h3 className="text-title font-display-soft text-ink">
            <Lines text={step.title} />
          </h3>
          <p className="leading-relaxed text-ink-soft">{step.body}</p>
        </div>
      </li>
    ))}
  </ol>
);
