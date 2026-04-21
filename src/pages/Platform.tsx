import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import {
  ArrowRight,
  Building2,
  MapPin,
  Users,
  BarChart3,
  Map as MapIcon,
  Table as TableIcon,
  LayoutGrid,
  Filter,
  Search,
  Layers,
  Sparkles,
  Database,
  Briefcase,
} from "lucide-react";

const Platform = () => {
  useSEO({
    title: "Platform | The India GCC Intelligence Workspace | Bamboo Reports",
    description:
      "Explore every GCC, every centre, every decision-maker on one live workspace. Accounts, Centers, Prospects and Headcount, visualised across charts, maps and grids.",
    keywords:
      "GCC platform, India GCC intelligence, GCC analytics, GCC database, account analytics, center analytics",
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-background/60 backdrop-blur text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            The Bamboo Reports Platform
          </div>

          <h1 className="leading-[1.05] max-w-5xl">
            <span className="block text-foreground">The India GCC Ecosystem.</span>
            <span className="block text-accent">On One Live Workspace.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Accounts, Centers, Prospects and Headcount: fully linked, constantly refreshed, and
            explorable across charts, maps, and grids. Replace a dozen spreadsheets with the
            workspace the GCC economy has been waiting for.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold px-7 py-6 text-base"
            >
              <a
                href="https://calendar.app.google/QNXWripJexzXLHqGA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full font-semibold px-7 py-6 text-base border-foreground/20 hover:bg-foreground hover:text-background"
            >
              <Link to="/pricing">See Pricing</Link>
            </Button>
          </div>

          {/* KPI strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border border rounded-xl overflow-hidden">
            {[
              { label: "Accounts", value: "2,467", icon: Building2 },
              { label: "Centers", value: "5,929", icon: MapPin },
              { label: "Prospects", value: "63,648", icon: Briefcase },
              { label: "Headcount", value: "5.16M", icon: Users },
            ].map((k) => (
              <div key={k.label} className="bg-background px-6 py-5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  <k.icon className="w-3.5 h-3.5 text-accent" />
                  {k.label}
                </div>
                <div className="text-3xl md:text-4xl font-bold tracking-tight">{k.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HERO SCREENSHOT */}
      <section className="px-4 -mt-4 md:-mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border shadow-2xl overflow-hidden bg-background">
            <img
              src="/platform/accounts-data.png"
              alt="Bamboo Reports platform: Account Analytics grid view"
              className="w-full h-auto block"
              loading="eager"
            />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Account Analytics: explore 2,467 live GCC parent accounts with structured firmographics.
          </p>
        </div>
      </section>

      {/* VIEW MODES */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / One Dataset, Every View
            </div>
            <h2 className="leading-tight">
              Switch between <span className="text-accent">Charts, Map, and Data</span> without
              leaving the question you're asking.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-[1px] bg-border border rounded-xl overflow-hidden">
            {[
              {
                icon: BarChart3,
                title: "Charts",
                desc: "See distribution by sector, function, geography, and growth stage at a glance.",
              },
              {
                icon: MapIcon,
                title: "Map",
                desc: "Pan across India by city or state. Spot density, gaps and new clusters instantly.",
              },
              {
                icon: TableIcon,
                title: "Data",
                desc: "Drop into the grid. Filter, sort and export the exact slice you need.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-background p-8 md:p-10">
                <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-5">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP FEATURE */}
      <section className="py-20 md:py-28 px-4 bg-secondary/40 border-b">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / Geospatial Intelligence
            </div>
            <h2 className="leading-tight mb-6">See India's GCC footprint, not just read about it.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Every centre geocoded. Every account linked to its cities. Heatmaps at the state and
              city level reveal where the economy is concentrating, and where the next wave is
              going.
            </p>
            <ul className="space-y-3 text-base">
              {[
                "City and state toggles on one click",
                "Live density heatmap across 5,929 centres",
                "Zoom from pan-India down to a single locality",
                "Export map-linked lists straight into your pipeline",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-7">
            <div className="rounded-xl border shadow-xl overflow-hidden bg-background">
              <img
                src="/platform/accounts-map.png"
                alt="Bamboo Reports platform: Accounts Map heatmap of India GCC footprint"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CENTERS FEATURE */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <div className="rounded-xl border shadow-xl overflow-hidden bg-background">
              <img
                src="/platform/centers-data.png"
                alt="Bamboo Reports platform: Center Analytics grid view"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / Down to the Centre
            </div>
            <h2 className="leading-tight mb-6">
              Every centre. Not just every logo.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Most databases stop at the parent company. We map all the way down to each individual
              centre, its city, its function, its headcount, and the parent account it belongs to.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Centres mapped", value: "5,929" },
                { label: "Parent accounts", value: "2,467" },
                { label: "Prospects tagged", value: "63,648" },
                { label: "Headcount indexed", value: "5.16M" },
              ].map((s) => (
                <div key={s.label} className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW FEATURES */}
      <section className="py-20 md:py-28 px-4 bg-secondary/40 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / Built for Operators
            </div>
            <h2 className="leading-tight">A workspace, not a report.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border">
            {[
              {
                icon: Filter,
                title: "Layered filters",
                desc: "Combine geography, sector, function, size and centre status in seconds.",
              },
              {
                icon: Search,
                title: "Global search",
                desc: "Jump to any account, centre, or prospect with a single keystroke.",
              },
              {
                icon: LayoutGrid,
                title: "Table and Grid modes",
                desc: "Scan fast in grid view, analyse deep in table view. Same data, your choice.",
              },
              {
                icon: Layers,
                title: "Linked intelligence",
                desc: "Accounts, centres, prospects and headcount all cross-reference each other.",
              },
              {
                icon: Database,
                title: "Clean exports",
                desc: "Pull any slice straight into CRM, Excel or your analytics stack.",
              },
              {
                icon: Sparkles,
                title: "Always fresh",
                desc: "Continuously updated as new centres open and leaders change roles.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-background p-8 md:p-10 hover:bg-background/60 transition-colors duration-200 group"
              >
                <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / Who It's For
            </div>
            <h2 className="leading-tight">One platform. Many operating teams.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                tag: "01",
                name: "GTM Leaders & Sellers",
                desc: "Find ICP-fit accounts, prioritise centres, and hand sellers clean target lists.",
              },
              {
                tag: "02",
                name: "GCC Site & PMO Leaders",
                desc: "Benchmark against peers, track the ecosystem, and inform location decisions.",
              },
              {
                tag: "03",
                name: "Staffing, RPO & Talent Firms",
                desc: "Reach the right HR leaders across every growing centre in India.",
              },
              {
                tag: "04",
                name: "CRE, Facilities & Infra",
                desc: "Spot new centres, expansions and relocations before your competitors do.",
              },
            ].map((item) => (
              <div
                key={item.tag}
                className="flex gap-6 items-start p-6 border rounded-xl hover:border-accent transition-colors duration-200 group"
              >
                <div className="text-4xl font-bold text-accent/40 group-hover:text-accent transition-colors duration-200 leading-none">
                  {item.tag}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-foreground text-background">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            / See It Live
          </div>
          <h2 className="leading-tight mb-6 text-background">
            Stop stitching PDFs and stale lists.
            <br />
            <span className="text-accent">Start operating on live GCC intelligence.</span>
          </h2>
          <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-10">
            Book a 30-minute walkthrough. We'll tailor the demo to your ICP, territory or sector.
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
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full font-semibold px-7 py-6 text-base bg-transparent border-background/40 text-background hover:bg-background hover:text-foreground"
            >
              <Link to="/pricing">See Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Platform;
