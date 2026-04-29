import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import {
  ArrowRight,
  BarChart3,
  Map as MapIcon,
  Table as TableIcon,
  LayoutGrid,
  Filter,
  Search,
  Layers,
  Sparkles,
  Database,
  Bookmark,
  Command,
} from "lucide-react";

const Platform = () => {
  useSEO({
    title: "Platform | The India GCC Intelligence Workspace | Bamboo Reports",
    description:
      "Every GCC, every centre, every decision-maker — on one live workspace. Charts, map and grid views over 2,500+ accounts, 5,900+ centres and 66,000+ verified contacts.",
    keywords:
      "GCC platform, India GCC intelligence, GCC analytics, GCC database, account analytics, center analytics",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden border-b">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[440px] h-[440px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-0">
          <div className="text-center flex flex-col items-center">
            <h1 className="platform-hero-title leading-[1.05] max-w-5xl">
              <span className="block text-foreground">Every GCC. Every centre.</span>
              <span className="block text-accent">On one live workspace.</span>
            </h1>

            <p className="platform-hero-copy mt-6 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Replace a dozen spreadsheets, three databases and the slide deck nobody updates.
              Accounts, centres, prospects and headcount — fully linked, constantly refreshed,
              and explorable across charts, map and grid.
            </p>

            <div className="platform-hero-actions mt-7 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                className="platform-cta bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold px-7 py-6 text-base"
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
            </div>
          </div>

          <div className="mt-12 md:mt-16 max-w-6xl mx-auto platform-dashboard-reveal">
            <div className="platform-dashboard-frame">
              <img
                src="/platform/accounts-grid.png"
                alt="Bamboo Reports platform: Account Analytics with filters and grid view"
                className="w-full h-auto block"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── THREE LENSES ───────── */}
      <section id="tour" className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
              / One Dataset, Three Lenses
            </div>
            <h2 className="leading-tight">
              Switch between <span className="text-accent">Charts, Map and Data</span> without
              losing the question you're asking.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every filter you set is preserved across views. Spot a cluster on the map, switch
              to charts to see the sector mix, drop into the grid to export the exact list.
            </p>
          </div>

          <div className="space-y-8">
            <LensFeature
              icon={BarChart3}
              eyebrow="Lens 01"
              title="Charts"
              desc="Distribution by region, sector, function, headcount and revenue — already wired up. No BI lift, no dashboard project."
              src="/platform/charts-view.png"
              alt="Bamboo Reports Account Analytics charts: region and primary nature breakdowns"
            />
            <LensFeature
              icon={MapIcon}
              eyebrow="Lens 02"
              title="Map"
              desc="Heatmap density across India, drillable from state to city to locality. Every centre geocoded, every account linked to its cities."
              src="/platform/centers-map.png"
              alt="Bamboo Reports Center Analytics map: India heatmap of GCC centres"
              reverse
            />
            <LensFeature
              icon={TableIcon}
              eyebrow="Lens 03"
              title="Data"
              desc="Drop into the grid. Filter, sort and export the exact slice you need — straight into CRM, Excel or your analytics stack."
              src="/platform/accounts-grid.png"
              alt="Bamboo Reports data grid view"
              tags={["Grid", "Table", "CSV", "XLSX"]}
            />
          </div>
        </div>
      </section>

      {/* ───────── ENTITY MODEL — Account → Centres ───────── */}
      <section className="py-20 md:py-28 px-4 bg-secondary/40 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="platform-feature-row rounded-2xl border bg-background overflow-hidden shadow-lg grid lg:grid-cols-12">
            <div className="lg:col-span-4 p-8 md:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r">
              <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">
                / Linked Intelligence
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="platform-feature-icon w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  Down to the individual <span className="text-accent">centre</span>
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Most databases stop at the parent company. We map every centre — its city,
                function, headcount, and the leaders inside it — and link it back to the parent.
                Click any account, see its full footprint immediately.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    k: "Account",
                    v: "Parent firmographics, GCC strategy, full history",
                  },
                  {
                    k: "Centres",
                    v: "Per-city facility, function, headcount band",
                  },
                  {
                    k: "Prospects",
                    v: "Verified leadership across each centre",
                  },
                  {
                    k: "Headcount",
                    v: "Rolled up daily, segmented by function",
                  },
                ].map((row) => (
                  <li key={row.k} className="flex items-start gap-4">
                    <span className="mt-2 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <div className="font-bold">{row.k}</div>
                      <div className="text-sm text-muted-foreground">{row.v}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="platform-feature-media lg:col-span-8 p-3">
              <img
                src="/platform/account-detail.png"
                alt="Account detail: 3M Co. with linked centres in Pune, Ahmedabad and Bengaluru"
                className="w-full h-auto block rounded-xl border"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── SEARCH + SAVED FILTERS ───────── */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
              / Operator Velocity
            </div>
            <h2 className="leading-tight">Built for the way operators actually work.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Two keystrokes to any record. Re-run last quarter's territory list with one click.
              Share a saved view with a teammate without exporting a single CSV.
            </p>
          </div>

          <div className="space-y-8">
            <LensFeature
              icon={Command}
              eyebrow="Workflow 01"
              title="Quick search"
              desc="Jump to any account, centre or prospect in two keystrokes. Recent activity, fuzzy match, and entity scoping — all without leaving the keyboard."
              src="/platform/quick-search.png"
              alt="Bamboo Reports quick search overlay with recently viewed records"
            />
            <LensFeature
              icon={Bookmark}
              eyebrow="Workflow 02"
              title="Saved filter sets"
              desc="Build a target query once. Re-run, rename, share or fork it whenever your ICP shifts. Your queries become reusable assets, not throwaway clicks."
              src="/platform/saved-filters.png"
              alt="Bamboo Reports saved filter sets manager"
              reverse
            />
          </div>
        </div>
      </section>

      {/* ───────── WORKFLOW FEATURES ───────── */}
      <section className="py-20 md:py-28 px-4 bg-secondary/40 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
              / Capabilities
            </div>
            <h2 className="leading-tight">A workspace, not a report.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border rounded-2xl overflow-hidden">
            {[
              { icon: Filter, title: "Layered filters", desc: "Combine geography, sector, function, size and centre status in seconds." },
              { icon: Search, title: "Global search", desc: "Jump to any account, centre or prospect with a single keystroke." },
              { icon: LayoutGrid, title: "Table & Grid modes", desc: "Scan fast in grid view, analyse deep in table view. Same data, your choice." },
              { icon: Layers, title: "Linked entities", desc: "Accounts, centres, prospects and headcount cross-reference automatically." },
              { icon: Database, title: "Clean exports", desc: "Pull any slice straight into CRM, Excel or your analytics stack." },
              { icon: Sparkles, title: "Always fresh", desc: "Continuously updated as new centres open and leaders change roles." },
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

      {/* ───────── WHO IT'S FOR ───────── */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
              / Who It's For
            </div>
            <h2 className="leading-tight">One platform. Many operating teams.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { tag: "01", name: "GTM Leaders & Sellers", desc: "Find ICP-fit accounts, prioritise centres, and hand sellers a clean target list each Monday." },
              { tag: "02", name: "GCC Site & PMO Leaders", desc: "Benchmark against peers, track the ecosystem, and inform the next location decision." },
              { tag: "03", name: "Staffing, RPO & Talent Firms", desc: "Reach the right HR leaders across every growing centre in India — by function." },
              { tag: "04", name: "CRE, Facilities & Infra", desc: "Spot new centres, expansions and relocations weeks before your competitors do." },
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

      {/* ───────── CTA ───────── */}
      <section className="py-20 md:py-28 px-4 bg-foreground text-background">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
            / See It Live
          </div>
          <h2 className="leading-tight mb-6 text-background">
            Stop stitching PDFs and stale lists.
            <br />
            <span className="text-accent">Start operating on live GCC intelligence.</span>
          </h2>
          <p className="text-base md:text-lg text-background/80 max-w-3xl mx-auto mb-10">
            Book a 30-minute walkthrough. We'll tailor it to your ICP, territory or sector and
            leave you with a target list you can use the same day.
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const LensFeature = ({
  icon: Icon,
  eyebrow,
  title,
  desc,
  src,
  alt,
  reverse = false,
  tags,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  desc: string;
  src: string;
  alt: string;
  reverse?: boolean;
  tags?: string[];
}) => (
  <div
    className={`platform-feature-row rounded-2xl border bg-background overflow-hidden shadow-lg grid lg:grid-cols-12 ${
      reverse ? "lg:[&>*:first-child]:order-2" : ""
    }`}
  >
    <div
      className={`lg:col-span-4 p-8 md:p-10 flex flex-col justify-center ${
        reverse ? "border-b lg:border-b-0 lg:border-l" : "border-b lg:border-b-0 lg:border-r"
      }`}
    >
      <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">{eyebrow}</div>
      <div className="flex items-center gap-3 mb-4">
        <div className="platform-feature-icon w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
      {tags ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
    <div className="platform-feature-media lg:col-span-8 p-3">
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto block rounded-xl border" />
    </div>
  </div>
);

export default Platform;
