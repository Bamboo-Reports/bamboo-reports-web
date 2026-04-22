import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { ArrowRight } from "lucide-react";

const SuccessStories = () => {
  useSEO({
    title: "Success Stories | Bamboo Reports",
    description:
      "Proof that the Bamboo Reports model works across solution providers and GCCs alike. BFSI GCC strategy for a global IT services firm, and GCC setup for a Fortune 500 medical device company.",
    keywords:
      "Bamboo Reports case studies, GCC success stories, BFSI GCC intelligence, Medical device GCC, India GCC benchmarking",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <h1 className="leading-[1.05] max-w-5xl">
            <span className="block text-foreground">Intelligence at Work.</span>
            <span className="block text-accent">Outcomes, Not Headlines.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Two long-running engagements that show what structured, centre-level intelligence
            delivers in practice. One for a solution provider selling into GCCs. One for a GCC
            building its own future.
          </p>

        </div>
      </section>

      {/* CASE 01: BFSI IT SERVICES */}
      <section className="relative py-20 md:py-28 px-4 border-b overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: narrative */}
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
                / Case 01  ·  Solution Provider
              </div>
              <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  4 Years
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Ongoing
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6">
                BFSI GCC Strategy &amp; Intelligence
              </h2>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                A leading global technology and consulting firm needed structured intelligence on
                India's BFSI GCC landscape to power their sector GTM strategy, account targeting,
                and ABM campaigns.
              </p>

              <div className="inline-flex items-center gap-3 mt-2 pl-4 py-2 border-l-2 border-primary">
                <span className="text-sm md:text-base font-semibold text-foreground">
                  The programme is still running 4 years on.
                </span>
              </div>
            </div>

            {/* Right: metric stack */}
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-[0.2em] text-primary mb-6">
                / What We Delivered
              </div>
              <div className="divide-y border-y">
                {[
                  { v: "1,050", l: "BFSI GCC companies profiled" },
                  { v: "44", l: "Intelligence reports delivered" },
                  { v: "364", l: "Decision-maker contacts mapped" },
                  {
                    v: "2 streams",
                    l: "GCC intelligence + Indian Enterprise, running in parallel",
                  },
                ].map((r) => (
                  <div
                    key={r.l}
                    className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-baseline py-6 md:py-8 group"
                  >
                    <div className="text-4xl md:text-6xl font-bold text-primary leading-none tracking-tight min-w-[140px] md:min-w-[180px]">
                      {r.v}
                    </div>
                    <div className="text-base md:text-lg text-foreground/80 leading-snug">
                      {r.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THEME DIVIDER */}
      <section className="py-14 md:py-20 px-4 bg-foreground text-background border-b">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-5">
            / Two Sides of the Same Ecosystem
          </div>
          <p className="text-2xl md:text-3xl font-semibold leading-snug text-background/95">
            One platform. Two audiences.{" "}
            <span className="text-accent">
              The same centre-level intelligence that wins mandates also builds business cases.
            </span>
          </p>
        </div>
      </section>

      {/* CASE 02: MEDICAL DEVICE GCC */}
      <section className="relative py-20 md:py-28 px-4 border-b overflow-hidden bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: narrative */}
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
                / Case 02  ·  GCC Itself
              </div>
              <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent/15 text-accent text-xs font-semibold uppercase tracking-wider">
                  Fortune 500
                </span>
                <span className="text-xs uppercase tracking-wider">Phased · Strategic</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6">
                GCC Benchmarking, Talent &amp; Expansion
              </h2>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                A Fortune 500 medical device company setting up their India GCC needed structured
                intelligence on peer GCCs, talent landscapes, and a benchmarking framework to build
                their board-level business case.
              </p>

              <div className="inline-flex items-center gap-3 mt-2 pl-4 py-2 border-l-2 border-accent">
                <span className="text-sm md:text-base font-semibold text-foreground">
                  Intelligence presented to global leadership. A seat at the table.
                </span>
              </div>
            </div>

            {/* Right: phased timeline */}
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-[0.2em] text-accent mb-6">
                / The Engagement Arc
              </div>

              <ol className="relative space-y-0">
                <span className="absolute left-[18px] top-2 bottom-2 w-px bg-accent/30" />
                {[
                  {
                    phase: "Discovery",
                    detail: "India GCC overview + peer company profiles in the sector.",
                  },
                  {
                    phase: "Analysis",
                    detail: "Talent benchmarking, RA services landscape, peer comparisons.",
                  },
                  {
                    phase: "Ongoing",
                    detail:
                      "Customised dashboard + capacity planning + ecosystem monitoring.",
                  },
                  {
                    phase: "Outcome",
                    detail:
                      "Intelligence presented to global leadership. A seat at the table.",
                    emphasis: true,
                  },
                ].map((r, i) => (
                  <li key={r.phase} className="relative grid grid-cols-[52px_1fr] gap-4 md:gap-6 py-5">
                    <div className="relative z-10">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                          r.emphasis
                            ? "bg-accent text-accent-foreground"
                            : "bg-background border-2 border-accent/40 text-accent"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="pt-1">
                      <div
                        className={`text-sm font-bold uppercase tracking-[0.18em] mb-1 ${
                          r.emphasis ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {r.phase}
                      </div>
                      <p
                        className={`leading-relaxed ${
                          r.emphasis
                            ? "text-lg md:text-xl font-semibold text-foreground"
                            : "text-base text-muted-foreground"
                        }`}
                      >
                        {r.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="leading-tight mb-6">
            Your engagement could be the next story.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you're building a GCC, selling into one, or advising on them, we'll bring the
            structured intelligence layer your work needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold px-7 py-6 text-base"
            >
              <a
                href="https://calendar.app.google/QNXWripJexzXLHqGA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Talk to Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStories;
