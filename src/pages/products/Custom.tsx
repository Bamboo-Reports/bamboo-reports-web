import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { BarChart3, Layers, ShieldCheck, Users, Sparkles } from "lucide-react";

const Custom = () => {
  useSEO({
    title: "Enterprise Intelligence | Organization-Wide GCC Insights | Bamboo Reports",
    description: "Enterprise Intelligence delivers organization-wide GCC insights with benchmarks, scenario models, and analyst-grade custom research for multi-team activation.",
    keywords: "Enterprise Intelligence, GCC benchmarks, scenario models, custom GCC insights, multi-team access, Bamboo Reports enterprise",
    canonicalUrl: "https://www.bambooreports.com/products/custom",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData
        type="product"
        data={{
          name: "Enterprise Intelligence - Organization-Wide GCC Insights",
          description: "Custom intelligence with benchmarks, scenario models, and analyst-grade research for enterprise teams.",
          features: [
            "Organization-wide GCC benchmarks",
            "Scenario modeling for locations and capabilities",
            "Custom insight packs with analyst callouts",
            "Signals and leadership moves with validation",
            "Multi-team access with tailored deliverables",
          ],
        }}
      />
      <Header />
      <main className="flex-1">
        <section className="border-b bg-gradient-to-br from-background via-background to-muted/50">
          <div className="container mx-auto px-4 py-16 lg:py-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Enterprise Intelligence
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">Organization-wide intelligence for your GCC strategy.</h1>
                <p className="text-lg text-muted-foreground">Benchmarks, scenario models, and analyst-grade insights tailored to leadership, GTM, PMO, and people teams in one coordinated program.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-base">
                <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">Engagement</div>
                  <div className="text-2xl font-semibold">Custom proposal</div>
                  <div className="text-sm text-muted-foreground">Multi-quarter programs</div>
                </div>
                <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">Who it serves</div>
                  <div className="text-base font-semibold">ELT, GTM, PMO, HR/TA, Finance</div>
                </div>
                <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">Coverage</div>
                  <div className="text-base font-semibold">Signals, benchmarks, models, analysts</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Request Proposal</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Talk to an Analyst</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl" />
              <div className="relative rounded-3xl border bg-card/80 p-6 shadow-xl space-y-4">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Enterprise snapshot</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Benchmark packs", value: "By sector, city, capability" },
                    { label: "Scenario models", value: "Location & team mix" },
                    { label: "Analyst time", value: "On-demand across teams" },
                    { label: "Delivery", value: "Slides + sheets + workshops" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border bg-background px-4 py-5">
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="text-base font-bold mt-1 leading-snug">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Benchmarks</p>
            <h2 className="text-3xl font-bold">Defensible benchmarks for every conversation.</h2>
            <p className="text-base text-muted-foreground max-w-2xl">We bring sector, location, and capability benchmarks your ELT can stand behind when making GCC expansion or optimization decisions.</p>
            <ul className="space-y-3 text-base text-muted-foreground">
              {[
                "Headcount, maturity, and growth benchmarks by sector and city",
                "Comp, hiring velocity, and leadership density comparisons",
                "Function and capability mix across peer sets",
                "Site maturity tiers for Tier 1 and Tier 2 hubs",
                "Product vs platform vs shared services splits",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Benchmark delivery</h3>
                <p className="text-sm text-muted-foreground">Slides for leadership + sheets for working teams.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { title: "Benchmark cards", desc: "Headcount, hiring, leadership density, capability mix." },
                { title: "City stacks", desc: "Tier 1 vs Tier 2 comparisons with maturity tiers." },
                { title: "Sector cohorts", desc: "Peer sets aligned to your focus accounts." },
                { title: "Refresh", desc: "Quarterly refresh with monthly signal updates." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-muted/40 px-4 py-3">
                  <div className="font-semibold">{item.title}</div>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Scenario models for your next moves.</h3>
                <p className="text-sm text-muted-foreground">City, capability, and talent scenarios with quantified impacts.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { title: "City selection", desc: "Compare Tier 1 vs Tier 2 for ramp time, cost, and talent depth." },
                { title: "Capability ramps", desc: "Model product, platform, cyber, and data team buildouts." },
                { title: "Hiring velocity", desc: "See time-to-fill and competition by role and city." },
                { title: "Risk views", desc: "Identify attrition cliffs, leadership gaps, and supply shocks." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-muted/40 px-4 py-3">
                  <div className="font-semibold">{item.title}</div>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Custom insight samples</p>
            <h2 className="text-3xl font-bold">Analyst-grade reads you can drop into leadership decks.</h2>
            <ul className="space-y-3 text-base text-muted-foreground">
              {[
                "\"Which Tier 2 hubs best balance talent depth with comp efficiency for cyber and data?\"",
                "\"What are realistic 12-month ramp scenarios for a 200-person product engineering COE?\"",
                "\"Where are leadership gaps emerging in our target peer set, and what does churn look like?\"",
                "\"How do hiring velocity and comp trends change if we split headcount across two cities?\"",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Multi-team access</p>
            <h2 className="text-3xl font-bold">One program, multiple teams, tailored deliverables.</h2>
            <p className="text-base text-muted-foreground max-w-2xl">We coordinate intake across GTM, PMO, HR/TA, and Finance, then deliver the exact mix each team needs.</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { title: "GTM / ABM", desc: "Activation-ready lists, leadership validation, and signal packs." },
                { title: "PMO / Strategy", desc: "Scenario models, benchmarks, and city/capability recommendations." },
                { title: "HR / TA", desc: "Talent supply, comp bands, hiring velocity, and competitive intel." },
                { title: "Finance / Ops", desc: "Cost-to-build models, ramp curves, and efficiency benchmarks." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border bg-muted/40 px-4 py-3">
                  <div className="font-semibold">{item.title}</div>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">How we deliver</h3>
                <p className="text-sm text-muted-foreground">Workshops, executive briefs, sheets, and signal updates.</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Joint intake and success criteria across teams",
                "Executive-ready briefings plus working-level sheets",
                "Monthly signal updates; quarterly deep dives",
                "Secure access with clear owners per workstream",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              Tailored SOWs align to your cadence, regions, and priority functions.
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="rounded-3xl border bg-gradient-to-br from-primary/15 via-primary/10 to-background p-10 lg:p-12 text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to unlock organization-wide intelligence?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Let us scope a program with benchmarks, scenarios, and analyst hours tailored to your leadership, GTM, PMO, HR, and Finance teams.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full" asChild>
                <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Request Proposal</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Talk to an Analyst</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Custom;
