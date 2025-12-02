import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const Explorer = () => {
  useSEO({
    title: "GCC Explorer | India GCC Intelligence & Market Discovery | Bamboo Reports",
    description: "Explore 2400+ Global Capability Centers across India with GCC Explorer. Discover India GCC opportunities, market intelligence, and GTM insights for strategic expansion planning.",
    keywords: "GCC Explorer, India GCC Intelligence, GCC India discovery, Global Capability Centers Explorer, India GCC market discovery, GCC Intelligence tool, GTM intelligence India, India GCC opportunities, GCC market intelligence India",
    canonicalUrl: "https://www.bambooreports.com/products/explorer",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData
        type="product"
        data={{
          name: "GCC Explorer - India GCC Intelligence Platform",
          description: "Explore and discover Global Capability Centers across India with comprehensive market intelligence and GTM insights.",
          features: [
            "2400+ GCC Database Access",
            "India GCC Market Intelligence",
            "GTM Research Tools",
            "GCC Discovery Platform",
            "Real-time India GCC Insights"
          ]
        }}
      />
      <Header />
      <main className="flex-1">
        <section className="border-b bg-gradient-to-br from-background via-background to-muted/50">
          <div className="container mx-auto px-4 py-16 lg:py-20 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Tier: Explorer
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">Find your next 100 GCC opportunities, faster.</h1>
                <p className="text-lg text-muted-foreground">Built for GTM, strategy, and account intelligence teams that need a confident, data-backed view of India’s GCC landscape in minutes.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-base">
                <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="text-2xl font-semibold">$1,299 / ₹1,09,999</div>
                  <div className="text-sm text-muted-foreground">One-time license</div>
                </div>
                <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">Best for</div>
                  <div className="text-base font-semibold">Market mapping, ABM shortlist, pre-sales prep</div>
                </div>
                <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">Coverage</div>
                  <div className="text-base font-semibold">2,400+ GCCs • 30+ sectors • Tier 1 & 2 cities</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full">Start with Explorer</Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Book a Demo</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl" />
              <div className="relative rounded-3xl border bg-card/80 p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Net-new GCCs / quarter", value: "120+" },
                    { label: "Account firmographics", value: "30+ datapoints" },
                    { label: "Leadership roster", value: "2,500+ leads" },
                    { label: "Hiring velocity signals", value: "Live" },
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

        <section className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Who it’s for</p>
            <h2 className="text-3xl font-bold">Teams that need speed without losing depth.</h2>
            <p className="text-base text-muted-foreground max-w-2xl">Explorer is built for research, GTM, and delivery teams who need confident GCC coverage in days, not months. Use it to prioritize markets, build ABM shortlists, and prep leadership for boardroom conversations.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "GTM & ABM teams building qualified account lists",
              "Strategy leads assessing market entry or expansion",
              "Delivery / COE leaders validating capability footprints",
              "Analysts who need defensible GCC stats on demand",
            ].map((item) => (
              <div key={item} className="rounded-2xl border bg-muted/40 px-4 py-5 text-sm font-medium leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Feature set</p>
            <h2 className="text-3xl font-bold mb-4">What you get with Explorer</h2>
            <ul className="space-y-3">
              {[
                "Full GCC directory with sector, headcount, cities, and parent HQ",
                "L1 list of 2,400+ GCCs with standardized firmographics",
                "Historic footprint view (3 years) and annual snapshot",
                "Quarterly updates on net-new entrants and expansions",
                "Top 30+ sector coverage with city-wise heatmaps",
                "Leadership roster with role, org, and recency signals",
                "Hiring velocity signals (roles, locations, seniority mix)",
                "Capability view: functions, tech stacks, and team mix",
                "Benchmarking cards for scale, maturity, and growth rate",
                "Download-ready shortlists for GTM and research workflows",
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
          <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Sample view</p>
            <div className="rounded-2xl border bg-muted/40 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-muted-foreground">Filters</div>
                <div className="text-xs rounded-full bg-primary/10 text-primary px-3 py-1">Saved search</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border bg-background px-3 py-2">
                  Sector: <span className="font-semibold">BFSI</span>
                </div>
                <div className="rounded-xl border bg-background px-3 py-2">
                  City: <span className="font-semibold">Hyderabad, Pune</span>
                </div>
                <div className="rounded-xl border bg-background px-3 py-2">
                  Headcount: <span className="font-semibold">500-2000</span>
                </div>
                <div className="rounded-xl border bg-background px-3 py-2">
                  Signal: <span className="font-semibold">Hiring ↑</span>
                </div>
              </div>
              <div className="rounded-xl border bg-background px-4 py-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">FinServ GCC Shortlist (18)</span>
                  <span className="text-xs text-muted-foreground">Updated weekly</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-lg border bg-muted/50 px-3 py-2">
                    <div className="font-semibold">Net-new</div>
                    <div className="text-muted-foreground">4 this quarter</div>
                  </div>
                  <div className="rounded-lg border bg-muted/50 px-3 py-2">
                    <div className="font-semibold">Hiring velocity</div>
                    <div className="text-muted-foreground">+18% MoM</div>
                  </div>
                  <div className="rounded-lg border bg-muted/50 px-3 py-2">
                    <div className="font-semibold">Leadership</div>
                    <div className="text-muted-foreground">27 verified</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Export, bookmark, and share to CRM/Sheets for instant GTM activation.</p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Screens & samples</p>
              <h2 className="text-3xl font-bold">What Explorer looks like</h2>
            </div>
            <Button variant="outline" className="rounded-full" asChild>
              <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Walk me through a deck</a>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "City & sector heatmaps",
              "Leadership roster with roles",
              "Hiring velocity & signals",
              "Capability & function mix",
              "Growth & maturity benchmarks",
              "Export-ready shortlists",
            ].map((caption) => (
              <div key={caption} className="rounded-2xl border bg-gradient-to-br from-muted/70 via-muted/40 to-background p-4 shadow-sm">
                <div className="aspect-video rounded-xl border bg-background/80" />
                <p className="mt-3 text-sm font-medium">{caption}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Sample insights</p>
            <h2 className="text-3xl font-bold">Answers you can lift straight into slides.</h2>
            <ul className="space-y-3 text-base text-muted-foreground">
              {[
                "“Which Tier 2 cities are adding the most BFSI GCC headcount this quarter?”",
                "“Show me top 20 product engineering GCCs with hiring spikes in data & cloud.”",
                "“Which US-headquartered GCCs expanded into Pune in the last 6 months?”",
                "“Where are leadership moves happening for cyber and platform ops?”",
              ].map((insight) => (
                <li key={insight} className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Signals + trends</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { title: "Hiring signals", desc: "Role-level velocity across engineering, support, and COE teams." },
                { title: "City momentum", desc: "Headcount and role distribution for Tier 1 & 2 hubs." },
                { title: "Function mix", desc: "Product, platform, CX, and shared services composition." },
                { title: "Leadership moves", desc: "New site heads, COE leads, and exec rotations." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-muted/40 px-4 py-3">
                  <div className="font-semibold">{item.title}</div>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              Updated quarterly with monthly signal refreshes; push to CRM/Sheets on request.
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="rounded-3xl border bg-gradient-to-br from-primary/15 via-primary/10 to-background p-10 lg:p-12 text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to explore India’s GCC landscape?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Activate the Explorer tier for fast, defensible GCC coverage—then graduate to Navigator or Enterprise when you’re ready for deeper customization.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full">Start with Explorer</Button>
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

export default Explorer;
