import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Check, Compass, SignalHigh, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Navigator = () => {
  useSEO({
    title: "GCC Navigator | GTM, PMO & Strategy Intelligence | Bamboo Reports",
    description: "Navigator equips GTM, PMO, and Strategy teams with account-level intelligence, hiring signals, and analyst hours to activate the right GCC plays faster.",
    keywords: "GCC Navigator, GTM intelligence, PMO strategy India, GCC account intelligence, GCC signals, Bamboo Reports Navigator",
    canonicalUrl: "https://www.bambooreports.com/products/navigator",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData
        type="product"
        data={{
          name: "GCC Navigator - GTM, PMO & Strategy Intelligence",
          description: "Account-level GCC intelligence with hiring signals, leadership moves, and analyst support for GTM, PMO, and Strategy teams.",
          features: [
            "Account intelligence with verified leadership",
            "Signals on hiring velocity and city moves",
            "Analyst hours for bespoke reads",
            "Benchmarking across sectors and cities",
            "Activation-ready lists and exports",
          ],
        }}
      />
      <Header />
      <main className="flex-1">
        <section className="border-b bg-gradient-to-br from-background via-background to-muted/50">
          <div className="container mx-auto px-4 py-16 lg:py-20 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Compass className="h-4 w-4" />
                For GTM, PMO, Strategy teams
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">Operate with account-level confidence, not guesses.</h1>
                <p className="text-lg text-muted-foreground">Navigator delivers live GCC signals, leadership moves, and analyst-backed reads so you can target, prioritize, and win faster.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-base">
                <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="text-2xl font-semibold">$6,999 / ₹5,79,999</div>
                  <div className="text-sm text-muted-foreground">One-time license</div>
                </div>
                <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">Best for</div>
                  <div className="text-base font-semibold">Account intel, PMO/strategy plays, ABM activation</div>
                </div>
                <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">Depth</div>
                  <div className="text-base font-semibold">Signals, leadership, benchmarking + analyst hours</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full" asChild>
                  <Link to="/pricing">Start with Navigator</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Book a Demo</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl" />
              <div className="relative rounded-3xl border bg-card/80 p-6 shadow-xl space-y-4">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Navigator snapshot</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Priority accounts", value: "Top 250" },
                    { label: "Leadership verified", value: "3,200+" },
                    { label: "Signals tracked", value: "Hiring, city, function" },
                    { label: "Analyst hours", value: "Up to 6 hrs" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border bg-background px-4 py-5">
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="text-xl font-bold mt-1">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Feature overview</p>
            <h2 className="text-3xl font-bold mb-4">Navigator layers signals on top of Explorer.</h2>
            <ul className="space-y-3">
              {[
                "Account-level sheets with leadership, org structure, and recency stamps",
                "Signals on hiring velocity, city moves, and new capability adds",
                "Benchmarking views across sector, headcount, maturity, and growth",
                "Verified leadership roster with roles, scope, and movement history",
                "Saved views and exports for GTM, PMO, and leadership prep",
                "Analyst support for interpretation and short custom callouts",
                "Quarterly refresh with monthly signal updates",
                "Activation-ready shortlists for ABM, partnerships, and site strategy",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 rounded-full bg-primary/10 p-1">
                    <Check className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-base text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Account intelligence + signals</p>
            <div className="rounded-2xl border bg-muted/40 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-muted-foreground">Filters</div>
                <div className="text-xs rounded-full bg-primary/10 text-primary px-3 py-1">Saved search</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border bg-background px-3 py-2">
                  Sector: <span className="font-semibold">Tech & SaaS</span>
                </div>
                <div className="rounded-xl border bg-background px-3 py-2">
                  Signal: <span className="font-semibold text-green-600">Hiring ↑</span>
                </div>
                <div className="rounded-xl border bg-background px-3 py-2">
                  City: <span className="font-semibold">Pune, Chennai</span>
                </div>
                <div className="rounded-xl border bg-background px-3 py-2">
                  Function: <span className="font-semibold">Product & Platform</span>
                </div>
              </div>
              <div className="rounded-xl border bg-background px-4 py-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Signal pack: Product-led GCCs (22)</span>
                  <span className="text-xs text-muted-foreground">Updated weekly</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-lg border bg-muted/50 px-3 py-2">
                    <div className="font-semibold">Leadership</div>
                    <div className="text-muted-foreground">41 verified</div>
                  </div>
                  <div className="rounded-lg border bg-muted/50 px-3 py-2">
                    <div className="font-semibold">Hiring velocity</div>
                    <div className="text-muted-foreground">+22% QoQ</div>
                  </div>
                  <div className="rounded-lg border bg-muted/50 px-3 py-2">
                    <div className="font-semibold">City moves</div>
                    <div className="text-muted-foreground">4 to Tier 2</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Push to CRM/Sheets or export for ABM activation.</p>
            </div>
            <div className="rounded-2xl border bg-muted/30 px-4 py-3 flex items-start gap-3 text-sm">
              <SignalHigh className="h-4 w-4 text-primary mt-0.5" />
              <p className="text-muted-foreground">Signals include hiring velocity, leadership moves, capability additions, and city expansion trends refreshed monthly.</p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Analyst hours</p>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Up to 6 hours of analyst time included.</h3>
                <p className="text-sm text-muted-foreground">Use it for bespoke reads, validation, or executive-ready callouts that augment the data.</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Synthesize signals into a short POV for leadership",
                "Validate priority accounts and suggest next-best actions",
                "Highlight risks, headcount cliffs, or attrition signals",
                "Tailor a ready-to-share deck for board/ELT updates",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border bg-muted/30 p-6 space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Navigator vs Explorer</p>
            <h3 className="text-xl font-semibold">What you unlock beyond Explorer</h3>
            <ul className="space-y-3 text-base text-muted-foreground">
              {[
                "Deeper account sheets with leadership rosters and recency stamps",
                "Signals on hiring velocity, city moves, and capability additions",
                "Benchmarking views tailored for PMO and strategy conversations",
                "Analyst hours for custom callouts and activation guidance",
                "Activation workflows: exports, saved views, CRM/Sheets push",
                "More frequent signal refresh (monthly) plus quarterly base updates",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Sample insights</p>
            <h2 className="text-3xl font-bold">Decisions Navigator answers out of the box.</h2>
            <ul className="space-y-3 text-base text-muted-foreground">
              {[
                '"Which GCCs in Pune are adding product engineering headcount with 15%+ hiring velocity?"',
                '"Who are the site heads and COE leaders for top 30 BFSI GCCs expanding to Tier 2 cities?"',
                '"Which accounts are opening cyber or platform ops centers in the next 2 quarters?"',
                '"Which US HQ GCCs show leadership churn plus hiring spikes in data roles?"',
              ].map((insight) => (
                <li key={insight} className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Signals we track</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { title: "Hiring velocity", desc: "Role-level trends by city, function, and seniority." },
                { title: "City expansion", desc: "Tier 1 to Tier 2 moves, headcount ramps, new sites." },
                { title: "Leadership moves", desc: "New appointments, rotations, and churn signals." },
                { title: "Capability adds", desc: "New COEs across product, cyber, data, platform." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-muted/40 px-4 py-3">
                  <div className="font-semibold">{item.title}</div>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              Monthly signal refreshes with quarterly base updates; exports and analyst callouts included.
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="rounded-3xl border bg-gradient-to-br from-primary/15 via-primary/10 to-background p-10 lg:p-12 text-center space-y-4">
            <h2 className="text-3xl font-bold">Move from research to activation with Navigator.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Layer signals, leadership intel, and analyst hours on top of your Explorer base to move faster on GTM, PMO, and strategy decisions.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/pricing">Start with Navigator</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Book a Demo</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Navigator;
