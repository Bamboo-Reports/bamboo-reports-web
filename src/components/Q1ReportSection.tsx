import { BarChart3, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRACKER_STATS } from "@/lib/trackerStats";

const nf = (n: number) => n.toLocaleString("en-US");

const HIGHLIGHTS = [
  {
    icon: Building2,
    title: "The state of the market",
    text: `Every GCC entry, expansion and exit tracked across ${nf(TRACKER_STATS.accountsTracked)} companies.`,
  },
  {
    icon: BarChart3,
    title: "City and industry momentum",
    text: "Where centres are opening and which functions are growing fastest.",
  },
  {
    icon: Users,
    title: "The leadership map",
    text: "How decision-maker roles are shifting inside India GCCs.",
  },
];

// Heights for the cover's data motif; static so the render is stable.
const COVER_BARS = [34, 52, 44, 66, 58, 82, 74, 100];

// The Q1 report as a sign-up hook: gated behind the free account, one CTA.
// Before July 20 this reads "early access"; on launch day the copy flips to
// "Sign up free to download".
const Q1ReportSection = () => (
  <section className="border-t bg-primary/5 px-4 py-14 md:py-20">
    <div className="mx-auto max-w-7xl">
      <div className="grid items-center gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
        {/* Report cover: typographic composition until the cover art lands. */}
        <div className="relative mx-auto w-60 md:w-64">
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-primary/15"
            aria-hidden
          />
          <div
            className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl bg-primary/30"
            aria-hidden
          />
          <div className="relative flex aspect-[3/4] flex-col overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[hsl(204,100%,30%)] p-6 text-primary-foreground shadow-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/80">
              Bamboo Reports
            </p>
            <p className="mt-5 text-sm font-semibold text-primary-foreground/80">
              Q1 · 2026
            </p>
            <p className="mt-1 text-[26px] font-bold leading-tight">
              India GCC
              <br />
              Report
            </p>
            <div className="mt-auto" aria-hidden>
              <div className="flex h-20 items-end gap-1.5">
                {COVER_BARS.map((height, index) => (
                  <div
                    key={index}
                    style={{ height: `${height}%` }}
                    className={
                      index === COVER_BARS.length - 1
                        ? "flex-1 rounded-sm bg-accent"
                        : "flex-1 rounded-sm bg-white/25"
                    }
                  />
                ))}
              </div>
              <p className="mt-4 border-t border-white/20 pt-3 text-xs font-semibold text-primary-foreground/80">
                Drops July 20
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Coming July 20
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-4xl">
            The Q1 2026 India GCC Report
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-foreground md:text-base">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="mt-9 rounded-full px-8 font-bold">
            <a href="/signup?src=home-q1report">Sign up free for early access</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default Q1ReportSection;
