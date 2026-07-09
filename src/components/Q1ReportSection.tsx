import { Button } from "@/components/ui/button";

// Heights for the cover's data motif; static so the render is stable.
const COVER_BARS = [34, 52, 44, 66, 58, 82, 74, 100];

// The table of contents distilled to the report's arc: the numbers, the
// geography, then the forward view. Full TOC lives in toc.md.
const REPORT_HIGHLIGHTS: string[] = [
  "The quarter in numbers, and the three signals that shaped it",
  "Who entered and expanded, mapped city by city, down to the Bengaluru and Hyderabad corridors",
  "Hiring signals, buying windows and a BFSI deep dive, closing with predictions we publish and score",
];

// The quarterly report presented as the output of the coverage band above:
// the stats list what we track, this navy panel is what we publish from it.
// The panel spans the same container as the ledger so their edges align.
// The white cover is a typographic placeholder; swap its inner content for
// the real cover art when it lands.
const Q1ReportSection = () => (
  <section className="px-4 pb-14 pt-10 md:pb-20 md:pt-12">
    <div className="mx-auto max-w-7xl">
      <div className="rounded-2xl bg-navy px-6 py-10 sm:px-10 md:py-14 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-16">
          <div className="relative mx-auto w-56 md:w-60 lg:w-full">
            <div
              className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-white/10"
              aria-hidden
            />
            <div className="relative flex aspect-[3/4] flex-col overflow-hidden rounded-lg bg-white p-6 shadow-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60">
                Bamboo Reports
              </p>
              <p className="mt-5 text-sm font-semibold text-navy/60">
                Q1 · 2026
              </p>
              <p className="mt-1 text-[26px] font-bold leading-tight text-navy">
                India GCC
                <br />
                Report
              </p>
              <div className="mt-auto" aria-hidden>
                <div className="flex h-16 items-end gap-1.5">
                  {COVER_BARS.map((height, index) => (
                    <div
                      key={index}
                      style={{ height: `${height}%` }}
                      className={
                        index === COVER_BARS.length - 1
                          ? "flex-1 rounded-sm bg-accent"
                          : "flex-1 rounded-sm bg-navy/15"
                      }
                    />
                  ))}
                </div>
                <p className="mt-4 border-t border-navy/15 pt-3 text-xs font-semibold text-navy/60">
                  Drops this July
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-accent">
              Built on this coverage, every quarter
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-4xl">
              The Q1 2026 India GCC Report
            </h2>
            <p className="mt-4 max-w-xl text-white/75">
              The quarter's GCC activity: who entered and expanded, where it
              landed city by city, and the buying windows it opened.
            </p>

            <ul className="mt-8 max-w-xl space-y-3.5 border-t border-white/15 pt-6">
              {REPORT_HIGHLIGHTS.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-[15px] font-medium leading-relaxed text-white/90"
                >
                  <span
                    className="mt-2.5 h-1 w-4 flex-none rounded-full bg-accent"
                    aria-hidden
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-8 font-semibold text-navy hover:bg-white/90"
              >
                <a href="/signup?src=home-q1report">Sign up free</a>
              </Button>
              <p className="text-sm text-white/60">
                Drops this July, free with a Bamboo account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Q1ReportSection;
