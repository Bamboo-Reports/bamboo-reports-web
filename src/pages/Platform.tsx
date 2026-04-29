import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import TrustLogos from "@/components/TrustLogos";
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
    title: "Platform | The Definitive India GCC Intelligence Workspace | Bamboo Reports",
    description:
      "The single source of truth for India's GCC ecosystem. Every account, every centre and every verified leader, live, linked, and ready to action across charts, map and grid.",
    keywords:
      "GCC platform, India GCC intelligence, GCC analytics, GCC database, account analytics, center analytics",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden">
        <div className="platform-hero-bg" aria-hidden="true" />
        <div className="platform-hero-grid" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-0">
          <div className="text-center flex flex-col items-center">
            <h1 className="platform-hero-title leading-[1.05] max-w-5xl">
              <span className="block text-foreground">The entire India GCC universe.</span>
              <span className="block">
                <span className="platform-gradient-text">One living workspace.</span>
              </span>
            </h1>

            <p className="platform-hero-copy mt-6 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Retire the spreadsheets. Retire the stale decks. Retire the database that nobody trusts.
              Every account, every centre and every verified leader, fully linked, refreshed
              every day, and explorable in seconds across charts, map and grid.
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

          <div className="mt-12 md:mt-16 max-w-7xl mx-auto translate-y-8 md:translate-y-12 platform-dashboard-perspective">
            <div className="platform-dashboard-tilt relative">
              <div className="platform-screenshot">
                <img
                  src="/platform/accounts-grid.png"
                  alt="Bamboo Reports platform: Account Analytics with filters and grid view"
                  loading="eager"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ───────── TRUST LOGOS ───────── */}
      <section className="pt-16 md:pt-20 pb-12 md:pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={120}>
            <TrustLogos />
          </FadeIn>
        </div>
      </section>

      {/* ───────── THREE LENSES ───────── */}
      <section id="tour" className="py-20 md:py-28 px-4 platform-section-soft">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
              / One Dataset, Three Lenses
            </div>
            <h2 className="leading-tight">
              See the market through <span className="text-accent">Charts, Map and Data</span>,
              without ever losing your thread.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every filter follows you across every view. Spot a hotspot on the map, pivot to charts
              for the sector mix, drop into the grid and export the exact target list, in under a
              minute, every time.
            </p>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn>
              <LensFeature
                icon={BarChart3}
                eyebrow="Lens 01"
                title="Charts"
                desc="The market, already visualised. Region, sector, function, headcount and revenue splits, boardroom-ready out of the box. Zero BI tickets, zero dashboard projects."
                src="/platform/charts-view.png"
                alt="Bamboo Reports Account Analytics charts: region and primary nature breakdowns"
              />
            </FadeIn>
            <FadeIn>
              <LensFeature
                icon={MapIcon}
                eyebrow="Lens 02"
                title="Map"
                desc="Watch India's GCC footprint light up. A live heatmap drillable from state to city to locality. Every centre geocoded, every account stitched to the places it operates."
                src="/platform/centers-map.png"
                alt="Bamboo Reports Center Analytics map: India heatmap of GCC centres"
                reverse
              />
            </FadeIn>
            <FadeIn>
              <LensFeature
                icon={TableIcon}
                eyebrow="Lens 03"
                title="Data"
                desc="When it's time to ship the list, drop into the grid. Filter, sort and export the exact slice, straight into your CRM, Excel or analytics stack. No reformatting. No cleanup."
                src="/platform/accounts-grid.png"
                alt="Bamboo Reports data grid view"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───────── ENTITY MODEL — Account → Centres ───────── */}
      <section className="py-20 md:py-28 px-4 platform-section-warm">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="platform-feature-row platform-soft-card overflow-hidden grid lg:grid-cols-12">
            <div className="lg:col-span-4 p-8 md:p-10 flex flex-col justify-center border-b border-foreground/[0.06] lg:border-b-0 lg:border-r">
              <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">
                / Linked Intelligence
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="platform-feature-icon w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  We go deeper. Right down to the <span className="text-accent">centre</span>.
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Other databases stop at the logo. We don't. Every centre is mapped: its city,
                function, headcount and the leaders sitting inside it, all stitched back to its
                parent account. One click and the entire India footprint is on screen.
              </p>
            </div>
            <div className="platform-feature-media lg:col-span-8 p-3">
              <img
                src="/platform/account-detail.png"
                alt="Account detail: 3M Co. with linked centres in Pune, Ahmedabad and Bengaluru"
                className="w-full h-auto block rounded-xl border"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────── SEARCH + SAVED FILTERS ───────── */}
      <section className="py-20 md:py-28 px-4 platform-section-soft">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
              / Operator Velocity
            </div>
            <h2 className="leading-tight">Engineered for the speed your team actually moves at.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Two keystrokes to any record. One click to re-run last quarter's territory list. A
              shared link instead of yet another CSV in someone's inbox. The platform keeps up, so
              your team can stop chasing data and start closing on it.
            </p>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn>
              <LensFeature
                icon={Command}
                eyebrow="Workflow 01"
                title="Quick search"
                desc="Reach any account, centre or prospect in two keystrokes. Recent activity, fuzzy match and entity scoping, all without your hands leaving the keyboard."
                src="/platform/quick-search.png"
                alt="Bamboo Reports quick search overlay with recently viewed records"
              />
            </FadeIn>
            <FadeIn>
              <LensFeature
                icon={Bookmark}
                eyebrow="Workflow 02"
                title="Saved filter sets"
                desc="Build a target query once. Re-run, rename, share or fork it the moment your ICP shifts. Your best queries become reusable assets your team compounds, not throwaway clicks."
                src="/platform/saved-filters.png"
                alt="Bamboo Reports saved filter sets manager"
                reverse
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───────── WORKFLOW FEATURES ───────── */}
      <section className="py-20 md:py-28 px-4 platform-section-warm">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
              / Capabilities
            </div>
            <h2 className="leading-tight">A workspace your team lives in. Not a report they forget.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every capability you need to find, qualify, segment and action the India GCC
              opportunity, in one purpose-built environment.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Filter, title: "Layered filters", desc: "Stack geography, sector, function, size and centre status to carve out the perfect segment in seconds." },
              { icon: Search, title: "Global search", desc: "Reach any account, centre or prospect with a single keystroke. The whole ecosystem at your fingertips." },
              { icon: LayoutGrid, title: "Table & Grid modes", desc: "Scan fast in grid view, analyse deep in table view. Same data, your way of working." },
              { icon: Layers, title: "Linked entities", desc: "Accounts, centres, prospects and headcount cross-reference automatically. No reconciliation, no joins." },
              { icon: Database, title: "Clean exports", desc: "Push any slice straight into your CRM, Excel or analytics stack. Always tidy, always ready to ship." },
              { icon: Sparkles, title: "Always fresh", desc: "Continuously refreshed as new centres open, leaders move and headcount shifts. The market, never stale." },
            ].map((f, i) => (
              <FadeIn
                key={f.title}
                delay={i * 60}
                className="platform-soft-card platform-cap-tile group"
              >
                <div className="platform-cap-icon">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHO IT'S FOR ───────── */}
      <section className="py-20 md:py-28 px-4 platform-section-soft">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
              / Who It's For
            </div>
            <h2 className="leading-tight">One platform. Every team that touches the GCC opportunity.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              From the seller building Monday's pipeline to the site head benchmarking against
              peers, Bamboo Reports is the workspace that puts every team on the same live picture.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { tag: "01", name: "GTM Leaders & Sellers", desc: "Surface ICP-fit accounts, prioritise the right centres and put a clean, ranked target list in every seller's hands every Monday morning." },
              { tag: "02", name: "GCC Site & PMO Leaders", desc: "Benchmark against the peer set, watch the ecosystem move in real time and walk into your next location decision with conviction." },
              { tag: "03", name: "Staffing, RPO & Talent Firms", desc: "Reach the right HR and function leaders across every growing centre in India, mapped by role, function and headcount." },
              { tag: "04", name: "CRE, Facilities & Infra", desc: "See new centres, expansions and relocations weeks before your competitors do, and turn signal into pipeline." },
            ].map((item, i) => (
              <FadeIn
                key={item.tag}
                delay={i * 80}
                className="platform-persona flex gap-6 items-start group"
              >
                <div className="text-4xl font-bold text-accent/40 group-hover:text-accent transition-colors duration-200 leading-none px-2 pt-1">
                  {item.tag}
                </div>
                <div className="pr-2 pb-2 pt-2">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="py-20 md:py-28 px-4 bg-foreground text-background">
        <FadeIn className="max-w-5xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
            / See It Live
          </div>
          <h2 className="leading-tight mb-6 text-background">
            Stop stitching together PDFs and stale lists.
            <br />
            <span className="text-accent">Start operating on live GCC intelligence.</span>
          </h2>
          <p className="text-base md:text-lg text-background/80 max-w-3xl mx-auto mb-10">
            Book a focused 30-minute walkthrough. We'll tailor it to your ICP, territory or sector
            and send you off with a target list you can action the same afternoon.
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
        </FadeIn>
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
    className={`platform-feature-row platform-soft-card overflow-hidden grid lg:grid-cols-12 ${
      reverse ? "lg:[&>*:first-child]:order-2" : ""
    }`}
  >
    <div
      className={`lg:col-span-4 p-8 md:p-10 flex flex-col justify-center ${
        reverse ? "border-b border-foreground/[0.06] lg:border-b-0 lg:border-l" : "border-b border-foreground/[0.06] lg:border-b-0 lg:border-r"
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
