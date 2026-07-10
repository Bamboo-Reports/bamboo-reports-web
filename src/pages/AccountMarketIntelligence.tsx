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
  { num: "01", icon: Building, title: "City GCC Intelligence Reports", body: "Deep-dives into India's top GCC cities. Each edition covers active and upcoming centre counts, workforce composition, sector and function mix, micro-geography clustering, and growth signals. Delivered as interactive reports built for executive audiences." },
  { num: "02", icon: BarChart3, title: "Sector Snapshot Reports", body: "Fast intelligence on high-priority verticals: BFSI, Technology, Pharma, Retail, Manufacturing. Covers centre counts, top employers, function breakdown, and city spread. Ideal for product teams, sales leaders, and consultants targeting a specific vertical." },
  { num: "03", icon: PieChart, title: "Function-Mix Intelligence", badge: "Exclusive", body: "Understand how GCCs are staffing themselves across functions: Engineering vs. Finance vs. Legal vs. HR. Identify white spaces. Benchmark your accounts. No one else produces this." },
  { num: "04", icon: Boxes, title: "Software Vendor Market Share Reports", badge: "Exclusive", body: "Which ERP, HCM, or IT platforms dominate inside India GCCs? Track adoption by sector, size, and city. Built from thousands of verified tech and software records." },
  { num: "05", icon: FileSearch, title: "Custom Research Briefs", body: "Need a bespoke market view? We build custom intelligence packs for specific account clusters, geographies, or competitive questions." },
];

const PLATFORM_CAPABILITIES = [
  { icon: LayoutDashboard, title: "Interactive Dashboards", desc: "Real-time analytics across accounts, centres, and functions with instant filtering." },
  { icon: Map, title: "Geospatial Intelligence", desc: "WebGL-rendered maps with thousands of GCC data points, clustered by any attribute." },
  { icon: Sparkles, title: "AI-Powered Insights", desc: "Generate tailored intelligence for any meeting via AI prompts. Weeks to minutes." },
  { icon: UserCog, title: "My BambooReports©", desc: "Personalised workspace: your target accounts, your ICP, your watermarked views." },
];

const USERS = [
  { icon: Target, name: "Enterprise Sales Teams", desc: "Account prioritisation and territory planning." },
  { icon: TrendingUp, name: "Product & Strategy Leaders", desc: "Market sizing and white-space identification." },
  { icon: Landmark, name: "Private Equity & Investors", desc: "GCC ecosystem mapping for due diligence." },
  { icon: Briefcase, name: "Consulting Firms", desc: "Client-facing intelligence with differentiated data." },
  { icon: Users, name: "GCC Leaders Themselves", desc: "Benchmark against peers, track market shifts." },
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
        title={<><span className="block">Know the GCC Market</span><span className="block text-primary">Before Your Competitor Does.</span></>}
        description={<p>An up-to-date dataset that can be filtered by city, sector, function, or company; it includes three years of historical movement data and trends in tech adoption at the GCC level. Not a report on a survey. Not a picture at the parent level. Structured, center-level intelligence.</p>}
      />

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ The Problem" title="GCC Strategy Without Data Is Just Guesswork.">
            <div className="space-y-4">
              <p>Published reports track GCCs at parent-company level and go stale in months. Consulting decks arrive weeks later as 80-page PDFs. Neither answers what a specific centre actually does, or how your sector is moving right now.</p>
              <p className="text-xl font-semibold leading-snug text-foreground md:text-2xl">You need ground-truth intelligence: <span className="text-primary">centre-level, structured, and queryable.</span></p>
            </div>
          </SectionIntro>
        </div>
      </section>

      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ Product Suite" title="Intelligence Products for Every Stage of Strategy." />
          <div className="mt-10">
            {PRODUCTS.map((product) => (
              <div key={product.num} className="grid gap-4 border-t py-7 md:grid-cols-[3rem_1.1fr_1.9fr] md:gap-8">
                <span className="text-sm font-semibold tabular-nums text-accent">{product.num}</span>
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
          <SectionIntro label="/ Platform In Action" title="Live Intelligence, Not Static PDFs.">
            <p>Filter to Pharma + Hyderabad and see 41 accounts, 57 centres in seconds. Click into Bayer AG and drill to 18 centres across India, headcount, full tech stack, and 3 years of historical movement. This is what centre-level, queryable intelligence looks like.</p>
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
              <p className="text-sm font-semibold text-accent">/ What-If Scenario Intelligence</p>
              <ul className="mt-4 space-y-3 text-lg leading-relaxed">
                <li>How do we compare against peer GCCs in our sector and size band?</li>
                <li>Which cities offer the right talent for a new capability centre?</li>
                <li>What functions are peers expanding or consolidating right now?</li>
                <li>Where should we add a new practice, and what does hiring look like?</li>
              </ul>
            </div>
            <div className="border-t py-7">
              <p className="text-sm font-semibold text-accent">/ Measurable Impact</p>
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
          <SectionIntro label="/ Who Uses This" title="Intelligence for the Decisions That Matter." />
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
          <SectionIntro label="/ Why It's Different" title={<>Structured Data.<br /><span className="text-primary">Not Another Survey Report.</span></>}>
            <p>Most GCC market reports are survey-based, delayed by months, and impossible to slice. Bamboo Reports' intelligence is:</p>
          </SectionIntro>
          <ol className="mt-8 max-w-6xl border-t">
            {[
              "Built bottom-up from 2,400+ accounts and 5,800+ centres. 260+ man-months of structured research.",
              "Sliceable by city, sector, function, size, tech stack, and centre status.",
              "AI-augmented weekly refresh, not an annual survey report.",
              "Exclusive datasets: service-mix, function-mix, and software vendor market share at centre level.",
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
