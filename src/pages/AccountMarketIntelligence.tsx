import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import {
  ArrowRight,
  Building,
  BarChart3,
  PieChart,
  Boxes,
  FileSearch,
  Target,
  Users,
  TrendingUp,
  Briefcase,
  Landmark,
} from "lucide-react";

const AccountMarketIntelligence = () => {
  useSEO({
    title: "Account & Market Intelligence | India GCC Research | Bamboo Reports",
    description:
      "Structured, data-backed views of India's GCC ecosystem — by city, sector, function, or company. From quick snapshots to deep-dive research.",
    keywords:
      "GCC market intelligence, India GCC research, account intelligence, city GCC report, sector snapshot",
  });

  const products = [
    {
      num: "01",
      icon: Building,
      title: "City GCC Intelligence Reports",
      body: "Deep-dives into India's top GCC cities. Each edition covers active and upcoming centre counts, workforce composition, sector and function mix, micro-geography clustering, and growth signals. Delivered as interactive reports built for executive audiences.",
    },
    {
      num: "02",
      icon: BarChart3,
      title: "Sector Snapshot Reports",
      body: "Fast intelligence on high-priority verticals — BFSI, Technology, Pharma, Retail, Manufacturing. Covers centre counts, top employers, function breakdown, and city spread. Ideal for product teams, sales leaders, and consultants targeting a specific vertical.",
    },
    {
      num: "03",
      icon: PieChart,
      title: "Function-Mix Intelligence",
      badge: "Exclusive",
      body: "Understand how GCCs are staffing themselves across functions — Engineering vs. Finance vs. Legal vs. HR. Identify white spaces. Benchmark your accounts. No one else produces this.",
    },
    {
      num: "04",
      icon: Boxes,
      title: "Software Vendor Market Share Reports",
      badge: "Exclusive",
      body: "Which ERP, HCM, or IT platforms dominate inside India GCCs? Track adoption by sector, size, and city. Built from thousands of verified tech and software records.",
    },
    {
      num: "05",
      icon: FileSearch,
      title: "Custom Research Briefs",
      body: "Need a bespoke market view? We build custom intelligence packs for specific account clusters, geographies, or competitive questions.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-accent/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Account &amp; Market Intelligence
          </div>

          <h1 className="leading-[1.05] max-w-5xl">
            <span className="block">Know the GCC Market</span>
            <span className="block">
              Before Your <span className="text-accent">Competitor</span> Does.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
            Bamboo Reports' Account &amp; Market Intelligence products give you structured,
            data-backed views of India's GCC ecosystem — by city, sector, function, or company. From
            quick snapshots to deep-dive research.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold px-7 py-6 text-base"
            >
              <Link to="/reports">
                Explore Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full font-semibold px-7 py-6 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a
                href="https://calendar.app.google/QNXWripJexzXLHqGA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request a Custom Brief
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
              / The Problem
            </div>
            <h2 className="leading-tight">
              GCC Strategy Without Data Is Just Guesswork.
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-4">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              India's GCC market is growing, shifting, and fragmenting by sector, city, and
              function. Enterprise decisions — market entry, product positioning, account
              prioritisation — can't be made on instinct or analyst surveys.
            </p>
            <p className="text-xl md:text-2xl font-semibold leading-snug">
              You need ground-truth intelligence:{" "}
              <span className="text-primary">structured, specific, and actionable.</span>
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT SUITE */}
      <section className="py-20 md:py-28 px-4 bg-secondary/40 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
              / Product Suite
            </div>
            <h2 className="leading-tight">
              Intelligence Products for Every Stage of Strategy.
            </h2>
          </div>

          <div className="space-y-5">
            {products.map((p) => (
              <div
                key={p.num}
                className="relative bg-background border rounded-2xl p-6 md:p-10 hover:border-primary transition-colors duration-200 group"
              >
                <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="md:col-span-3 flex md:flex-col gap-4 items-center md:items-start">
                    <div className="font-mono text-5xl md:text-6xl font-bold text-primary/20 group-hover:text-primary transition-colors duration-200 leading-none">
                      {p.num}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <p.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl md:text-3xl font-bold">{p.title}</h3>
                      {p.badge && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {p.badge} to Bamboo Reports
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                      {p.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO USES THIS */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
              / Who Uses This
            </div>
            <h2 className="leading-tight">Intelligence for the Decisions That Matter.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                name: "Enterprise Sales Teams",
                desc: "Account prioritisation and territory planning.",
              },
              {
                icon: TrendingUp,
                name: "Product & Strategy Leaders",
                desc: "Market sizing and white-space identification.",
              },
              {
                icon: Landmark,
                name: "Private Equity & Investors",
                desc: "GCC ecosystem mapping for due diligence.",
              },
              {
                icon: Briefcase,
                name: "Consulting Firms",
                desc: "Client-facing intelligence with differentiated data.",
              },
              {
                icon: Users,
                name: "GCC Leaders Themselves",
                desc: "Benchmark against peers, track market shifts.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="p-8 border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 md:py-28 px-4 bg-foreground text-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / Why It's Different
            </div>
            <h2 className="leading-tight text-background">
              Structured Data.
              <br />
              <span className="text-accent">Not Another Survey Report.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-3">
            <p className="text-lg text-background/80 leading-relaxed mb-10">
              Most GCC market reports are survey-based, delayed by months, and impossible to slice.
              Bamboo Reports' intelligence is:
            </p>
            <ul className="space-y-5 mb-12">
              {[
                "Built from the largest structured GCC database in India.",
                "Sliceable by city, sector, function, size, and centre status.",
                "Updated continuously — not annually.",
                "Produced at a fraction of what large analyst firms charge.",
              ].map((t, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="font-mono text-sm text-accent pt-1.5 w-8 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-lg leading-relaxed text-background/90">{t}</span>
                </li>
              ))}
            </ul>

            <blockquote className="border-l-4 border-accent pl-6">
              <p className="text-2xl md:text-3xl font-semibold leading-snug italic">
                "Nasscom publishes GCC counts.{" "}
                <span className="text-accent not-italic font-bold">
                  We publish the underlying data.
                </span>
                "
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="leading-tight mb-10">
            Ready to see what your market really looks like?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold px-7 py-6 text-base"
            >
              <Link to="/reports">
                Download a Sample Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full font-semibold px-7 py-6 text-base border-foreground/20"
            >
              <a
                href="https://calendar.app.google/QNXWripJexzXLHqGA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request a Brief
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AccountMarketIntelligence;
