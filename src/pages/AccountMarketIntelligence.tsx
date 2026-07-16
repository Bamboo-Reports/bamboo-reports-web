import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DemoCta, MarketingHero, SectionIntro } from "@/components/B2BMarketingPage";
import { useSEO } from "@/hooks/useSEO";
import {
  BarChart3,
  Boxes,
  Briefcase,
  Building,
  FileSearch,
  Landmark,
  LayoutDashboard,
  Map,
  PieChart,
  Sparkles,
  Target,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";

const PRODUCTS = [
  { icon: Building, title: "City GCC intelligence reports", body: "Deep-dives into India's top GCC cities. Each edition covers active and upcoming centre counts, workforce composition, sector and function mix, micro-geography clustering, and growth signals. Delivered as interactive reports built for executive audiences." },
  { icon: BarChart3, title: "Sector snapshot reports", body: "Fast intelligence on high-priority verticals: BFSI, Technology, Pharma, Retail, Manufacturing. Covers centre counts, top employers, function breakdown, and city spread. Ideal for product teams, sales leaders, and consultants targeting a specific vertical." },
  { icon: PieChart, title: "Function-mix intelligence", badge: "Exclusive", body: "Understand how GCCs are staffing themselves across functions: Engineering vs. Finance vs. Legal vs. HR. Identify white spaces. Benchmark your accounts. No one else produces this." },
  { icon: Boxes, title: "Software vendor market share reports", badge: "Exclusive", body: "Which ERP, HCM, or IT platforms dominate inside India GCCs? Track adoption by sector, size, and city. Built from thousands of verified tech and software records." },
  { icon: FileSearch, title: "Custom research briefs", body: "Need a bespoke market view? We build custom intelligence packs for specific account clusters, geographies, or competitive questions." },
];

const PLATFORM_CAPABILITIES = [
  { icon: LayoutDashboard, title: "Interactive dashboards", desc: "Real-time analytics across accounts, centres, and functions with instant filtering." },
  { icon: Map, title: "Geospatial intelligence", desc: "WebGL-rendered maps with thousands of GCC data points, clustered by any attribute." },
  { icon: Sparkles, title: "AI-powered insights", desc: "Generate tailored intelligence for any meeting via AI prompts. From weeks to minutes." },
  { icon: UserCog, title: "My BambooReports©", desc: "Personalised workspace: your target accounts, your ICP, your watermarked views." },
];

const USERS = [
  { icon: Target, name: "Enterprise sales teams", desc: "Account prioritisation and territory planning." },
  { icon: TrendingUp, name: "Product & strategy leaders", desc: "Market sizing and white-space identification." },
  { icon: Landmark, name: "Private equity & investors", desc: "GCC ecosystem mapping for due diligence." },
  { icon: Briefcase, name: "Consulting firms", desc: "Client-facing intelligence with differentiated data." },
  { icon: Users, name: "GCC leaders themselves", desc: "Benchmark against peers, track market shifts." },
];

const AccountMarketIntelligence = () => {
  useSEO({
    title: "Account & Market Intelligence | India GCC Research | Bamboo Reports",
    description:
      "Structured, data-backed views of India's GCC ecosystem by city, sector, function, or company. From quick snapshots to deep-dive research.",
    keywords:
      "GCC market intelligence, India GCC research, account intelligence, city GCC report, sector snapshot",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <MarketingHero
        title={<><span className="block">Know the GCC market</span><span className="block text-primary">before your competitor does.</span></>}
        description={<p>Up-to-date coverage you can filter by city, sector, function, or company, with three years of historical movement and tech adoption trends at the GCC level. Not a survey report. Not a parent-level picture. Structured, centre-level intelligence.</p>}
      />

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="The problem" title="GCC strategy without data is just guesswork.">
            <div className="space-y-4">
              <p>Published reports track GCCs at parent-company level and go stale in months. Consulting decks arrive weeks later as 80-page PDFs. Neither answers what a specific centre actually does, or how your sector is moving right now.</p>
              <p className="text-xl font-semibold leading-snug text-foreground md:text-2xl">You need ground-truth intelligence: <span className="text-primary">centre-level, structured, and queryable.</span></p>
            </div>
          </SectionIntro>
        </div>
      </section>

      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="Product suite" title="Intelligence products for every stage of strategy." />
          <div className="mt-10">
            {PRODUCTS.map((product) => (
              <div key={product.title} className="grid gap-4 border-t py-7 md:grid-cols-[1.1fr_1.9fr] md:gap-8">
                <div>
                  <product.icon className="h-5 w-5 text-primary" aria-hidden />
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold">{product.title}</h3>
                    {product.badge && <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{product.badge} to Bamboo Reports</span>}
                  </div>
                </div>
                <p className="leading-relaxed text-muted-foreground md:text-lg">{product.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="Platform in action" title="Live intelligence, not static PDFs.">
            <p>Filter to Pharma + Hyderabad and see 41 accounts, 57 centres in seconds. Click into Bayer AG and drill into its 18 centres across India: headcount, full tech stack, and 3 years of historical movement. This is what centre-level, queryable intelligence looks like.</p>
          </SectionIntro>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_CAPABILITIES.map((capability) => (
              <div key={capability.title} className="border-t py-6">
                <capability.icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-bold">{capability.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{capability.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-x-12 md:grid-cols-2">
            <div className="border-t py-7">
              <p className="text-sm font-semibold text-accent">/ What-if scenario intelligence</p>
              <ul className="mt-4 space-y-3 text-lg leading-relaxed">
                <li>How do we compare against peer GCCs in our sector and size band?</li>
                <li>Which cities offer the right talent for a new capability centre?</li>
                <li>What functions are peers expanding or consolidating right now?</li>
                <li>Where should we add a new practice, and what does hiring look like?</li>
              </ul>
            </div>
            <div className="border-t py-7">
              <p className="text-sm font-semibold text-accent">/ Measurable impact</p>
              <div className="mt-4 divide-y">
                <div className="py-4"><div className="text-2xl font-bold text-primary">6 months → under 1 month</div><div className="mt-1 text-sm text-muted-foreground">GCC discovery cycle for a leading global IT services firm.</div></div>
                <div className="py-4"><div className="text-2xl font-bold text-primary">Weeks → minutes</div><div className="mt-1 text-sm text-muted-foreground">Strategy-meeting intelligence via AI-powered custom insights.</div></div>
                <div className="py-4"><div className="text-2xl font-bold text-primary">₹30–50L saved</div><div className="mt-1 text-sm text-muted-foreground">vs. stitching GCC intelligence from fragmented sources.</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="Who uses this" title="Intelligence for the decisions that matter." />
          <div className="mt-10 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
            {USERS.map((item) => (
              <div key={item.name} className="border-t py-6">
                <item.icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-bold">{item.name}</h3>
                <p className="mt-2 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="Why it's different" title={<>Structured data.<br /><span className="text-primary">Not another survey report.</span></>}>
            <p>Most GCC market reports are survey-based, delayed by months, and impossible to slice. Bamboo Reports' intelligence is:</p>
          </SectionIntro>
          <ol className="mt-8 max-w-6xl border-t">
            {[
              "Built bottom-up from 2,400+ accounts and 5,900+ centres. 260+ man-months of structured research.",
              "Sliceable by city, sector, function, size, tech stack, and centre status.",
              "AI-augmented weekly refresh, not an annual survey report.",
              "Exclusive coverage: service-mix, function-mix, and software vendor market share at centre level.",
            ].map((text, index) => (
              <li key={text} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b py-5"><span className="text-sm font-semibold tabular-nums text-accent">0{index + 1}</span><span className="text-lg leading-relaxed text-muted-foreground">{text}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <DemoCta title="Ready to see what your market really looks like?" />
      <Footer showCta={false} />
    </div>
  );
};

export default AccountMarketIntelligence;
