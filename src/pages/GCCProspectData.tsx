import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import {
  ArrowRight,
  Users,
  MapPin,
  Building2,
  Layers,
  Briefcase,
  Tag,
  Database,
  RefreshCw,
  Globe,
  Sparkles,
} from "lucide-react";

const GCCProspectData = () => {
  useSEO({
    title: "GCC Prospect Data | Verified India GCC Decision-Makers | Bamboo Reports",
    description:
      "The most complete, structured contact intelligence on India's GCC ecosystem. Verified decision-makers across thousands of centres, ready to power your outreach.",
    keywords:
      "GCC prospect data, India GCC contacts, GCC decision makers, GCC contact database, India GCC leaders",
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
            GCC Prospect Data
          </div>

          <h1 className="leading-[1.05] max-w-5xl">
            <span className="block text-foreground">Every GCC in India.</span>
            <span className="block text-accent">Every Decision-Maker Who Matters.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Bamboo Reports gives you the most complete, structured contact intelligence on India's
            Global Capability Centre ecosystem: 250K+ verified decision-makers across 5,900+
            centres, continuously refreshed and ready to power your outreach.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-3xl border-t border-b py-6">
            {[
              { v: "2,500+", l: "Accounts" },
              { v: "5,900+", l: "Centres" },
              { v: "250K+", l: "Decision-Makers" },
              { v: "4.9M", l: "Workforce Data" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl md:text-3xl font-bold text-foreground leading-none">
                  {s.v}
                </div>
                <div className="mt-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>

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
                Talk to Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / The Problem
            </div>
            <h2 className="leading-tight">
              Your Outreach Is Only as Good as Your Data.
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-4">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              India's GCC market is moving fast. New centres open every quarter. Leaders change
              roles. Scraped databases hand you stale contacts, wrong titles, parent-company-only
              records, and zero centre-level context.
            </p>
            <p className="text-xl md:text-2xl font-semibold leading-snug">
              Most lists give you names.{" "}
              <span className="text-accent">We give you the right names</span>, mapped to the right
              centre, in the right role, with the service-mix and tech-stack context you need to
              start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-20 md:py-28 px-4 bg-secondary/40 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / What's Inside
            </div>
            <h2 className="leading-tight">Built for GCC Go-To-Market.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border">
            {[
              {
                icon: Users,
                title: "250K+ decision-makers",
                desc: "Named C-suite, VPs, Directors, and function heads across the ecosystem.",
              },
              {
                icon: Building2,
                title: "Centre-level mapping",
                desc: "Contacts tied to 5,900+ individual centres, not just parent companies.",
              },
              {
                icon: Briefcase,
                title: "Function coverage",
                desc: "Engineering, Product, Data, Finance, HR, Legal, Operations, IT, and more.",
              },
              {
                icon: MapPin,
                title: "Geospatial precision",
                desc: "Every centre geo-coded across India's GCC cities and clusters.",
              },
              {
                icon: Layers,
                title: "Service-mix context",
                desc: "5–12 structured service classifications per centre: what each GCC actually does.",
              },
              {
                icon: Tag,
                title: "Sector & tech tagging",
                desc: "BFSI, Tech, Pharma, Retail, Manufacturing, with tech-stack signals layered in.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-background p-8 md:p-10 hover:bg-background/60 transition-colors duration-200 group"
              >
                <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-base md:text-lg text-muted-foreground max-w-3xl">
            Built from Bamboo Reports' proprietary database.{" "}
            <span className="font-semibold text-foreground">
              40% more accounts than NASSCOM, 3x more centres, and 21x more structured data per GCC
              than the nearest alternative.
            </span>
          </p>
        </div>
      </section>

      {/* WHO USES THIS */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / Who Uses This
            </div>
            <h2 className="leading-tight">Built for Teams That Sell Into GCCs.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                tag: "01",
                name: "SaaS & Tech Vendors",
                desc: "Pipeline generation for India GCC accounts.",
              },
              {
                tag: "02",
                name: "Staffing & RPO Firms",
                desc: "Reach HR and TA heads at scale.",
              },
              {
                tag: "03",
                name: "Real Estate & Facilities",
                desc: "Connect with Admin, CRE, and Operations leaders.",
              },
              {
                tag: "04",
                name: "Consulting & Advisory",
                desc: "Identify and prioritise target accounts fast.",
              },
              {
                tag: "05",
                name: "Event & Community Platforms",
                desc: "Grow your GCC practitioner network.",
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

      {/* WHY */}
      <section className="py-20 md:py-28 px-4 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / Why Bamboo Reports
            </div>
            <h2 className="leading-tight text-background">
              This Isn't a Scraped List.
              <br />
              <span className="text-accent">This Is a Research Asset.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {[
              {
                icon: Database,
                text: "260+ man-months of structured research since 2022, built centre by centre, not scraped.",
              },
              {
                icon: Globe,
                text: "250+ structured data points per GCC across 6 interlinked data tables.",
              },
              {
                icon: RefreshCw,
                text: "AI-augmented weekly refresh cycles with automated change detection as leaders move.",
              },
              {
                icon: Sparkles,
                text: "Every field mapped to an AI agent for enrichment, validation, and quality checks.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <p className="text-lg leading-relaxed text-background/90 pt-1">{item.text}</p>
              </div>
            ))}
          </div>

          <blockquote className="border-l-4 border-accent pl-6 md:pl-8 max-w-3xl">
            <p className="text-2xl md:text-3xl font-semibold leading-snug italic">
              "We don't resell third-party databases. We built ours from scratch, and it shows."
            </p>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            / Get Your Custom Dataset
          </div>
          <h2 className="leading-tight mb-6">
            Available as custom cuts by geography, sector, function, company size, or centre status.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
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

export default GCCProspectData;
