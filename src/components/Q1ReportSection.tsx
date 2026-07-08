import { BarChart3, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRACKER_STATS } from "@/lib/trackerStats";

const nf = (n: number) => n.toLocaleString("en-US");

const HIGHLIGHTS = [
  {
    icon: Building2,
    text: `The state of the market: every GCC entry, expansion and exit tracked across ${nf(TRACKER_STATS.accountsTracked)} companies.`,
  },
  {
    icon: BarChart3,
    text: "City and industry momentum: where centres are opening and which functions are growing fastest.",
  },
  {
    icon: Users,
    text: "The leadership map: how decision-maker roles are shifting inside India GCCs.",
  },
];

// The Q1 report as a sign-up hook: gated behind the free account, one CTA.
// Before July 20 this reads "early access"; on launch day the copy flips to
// "Sign up free to download".
const Q1ReportSection = () => (
  <section className="border-t bg-primary/5 px-4 py-14 md:py-20">
    <div className="mx-auto max-w-7xl">
      <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr]">
        <div className="mx-auto w-56 lg:w-full">
          {/* Typographic cover placeholder until the report cover art lands. */}
          <div className="aspect-[3/4] rounded-xl border bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
              Bamboo Reports
            </p>
            <p className="mt-6 text-2xl font-bold leading-tight">
              Q1 2026
              <br />
              India GCC Report
            </p>
            <p className="mt-4 text-sm opacity-80">Drops July 20</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Coming July 20
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-4xl">
            The Q1 2026 India GCC Report
          </h2>
          <ul className="mt-6 space-y-4">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {text}
                </span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8 rounded-full px-8 font-bold">
            <a href="/signup?src=home-q1report">Sign up free for early access</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default Q1ReportSection;
