import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import {
  ArrowRight,
  Target,
  UserCheck,
  Megaphone,
  HandshakeIcon,
  Zap,
  MapPin,
  CalendarDays,
  Mail,
  Rocket,
  ShieldCheck,
  Layers,
  Crosshair,
} from "lucide-react";

const GCCABM = () => {
  useSEO({
    title: "GCC ABM | Account-Based Marketing for India GCCs | Bamboo Reports",
    description:
      "End-to-end ABM campaigns targeting decision-makers inside India's Global Capability Centres. Bamboo Reports brings the data, the audience, and the execution.",
    keywords:
      "GCC ABM, India ABM, account based marketing GCC, GCC campaigns, GCC demand generation",
  });

  const steps = [
    {
      num: "Step 1",
      icon: Target,
      title: "Account Selection",
      body: "We start with your ICP: sector, city, company size, function, tech stack. We pull the matching GCC accounts from our database — with full context on each centre's size, age, parent company, and leadership.",
    },
    {
      num: "Step 2",
      icon: UserCheck,
      title: "Contact Targeting",
      body: "From our verified decision-maker contact pool, we build your target list — the right function heads, at the right centres, in the right geographies. No duplication. No guesswork.",
    },
    {
      num: "Step 3",
      icon: Megaphone,
      title: "Campaign Execution",
      body: "We run multi-channel campaigns across LinkedIn, email, curated roundtables, and content syndication through the Bamboo Reports audience.",
    },
    {
      num: "Step 4",
      icon: HandshakeIcon,
      title: "MQL Handoff",
      body: "We deliver qualified leads — contacts who've engaged with your content, attended your events, or raised their hand. Not raw lists. Not cold traffic.",
    },
  ];

  const formats = [
    {
      icon: Zap,
      name: "Focused ABM Sprint",
      desc: "Short, sharp campaign targeting a defined account list.",
    },
    {
      icon: MapPin,
      name: "City Blitz",
      desc: "Concentrated push in one GCC cluster.",
    },
    {
      icon: CalendarDays,
      name: "Roundtable Programme",
      desc: "Curated events with senior GCC leaders.",
    },
    {
      icon: Mail,
      name: "Content + Nurture",
      desc: "LinkedIn and email sequence across named accounts.",
    },
    {
      icon: Rocket,
      name: "Full GTM Programme",
      desc: "Multi-city, multi-channel, long-form engagement.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, hsl(var(--foreground)) 0 1px, transparent 1px 24px)",
          }}
        />
        <div className="absolute top-20 -right-32 w-[480px] h-[480px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-background/60 backdrop-blur text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            GCC ABM
          </div>

          <h1 className="leading-[1.05] max-w-5xl">
            <span className="block">Account-Based Marketing</span>
            <span className="block">for the India GCC Market —</span>
            <span className="block text-primary">Built on the Best Data in the Business.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Bamboo Reports runs end-to-end ABM campaigns targeting decision-makers inside India's
            Global Capability Centres. We bring the data, the audience, and the execution. You
            bring the story.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold px-7 py-6 text-base"
            >
              <a href="#how-it-works">
                See How It Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full font-semibold px-7 py-6 text-base border-foreground/20 hover:bg-foreground hover:text-background"
            >
              <a
                href="https://calendar.app.google/QNXWripJexzXLHqGA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a Campaign Proposal
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
              GCC Buyers Are Hard to Reach. Generic ABM Doesn't Work Here.
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-4">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              India's GCC ecosystem doesn't behave like the broader enterprise market.
              Decision-makers aren't always visible. Org charts are opaque. Titles vary wildly. And
              most ABM platforms don't understand what a GCC actually is.
            </p>
            <p className="text-xl md:text-2xl font-semibold leading-snug">
              Running campaigns into this market without GCC-native data means{" "}
              <span className="text-primary">wasted spend, wrong targets,</span> and messaging that
              lands with the wrong people.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 px-4 bg-secondary/40 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
              / How It Works
            </div>
            <h2 className="leading-tight">Full-Funnel ABM, End to End.</h2>
          </div>

          <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative bg-background border rounded-2xl p-7 hover:border-primary transition-colors duration-200"
              >
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
                  {step.num}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">{step.body}</p>

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPAIGN FORMATS */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
              / Campaign Formats
            </div>
            <h2 className="leading-tight">Pick Your Play.</h2>
          </div>

          <div className="border rounded-2xl overflow-hidden divide-y">
            {formats.map((f) => (
              <div
                key={f.name}
                className="grid md:grid-cols-12 gap-4 md:gap-8 p-6 md:p-8 items-center hover:bg-secondary/30 transition-colors duration-200 group"
              >
                <div className="md:col-span-1 flex items-center">
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                    <f.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold">{f.name}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVEN RESULTS */}
      <section className="py-20 md:py-28 px-4 bg-primary text-primary-foreground border-b">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              / Proven Results
            </div>
            <h2 className="leading-tight text-primary-foreground">
              Qualified Pipeline. Measurable Outcomes.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg md:text-xl leading-relaxed text-primary-foreground/90">
              Our ABM campaigns have delivered qualified pipeline for SaaS vendors, enterprise
              software companies, and professional services firms — across India's top GCC cities.
              Clients see measurable MQL and SQL outcomes,{" "}
              <span className="text-accent font-semibold">not just impressions.</span>
            </p>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 md:py-28 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
              / Who It's For
            </div>
            <h2 className="leading-tight">Built for B2B Teams Selling Into GCCs.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              "SaaS and Tech vendors entering or expanding in the India GCC market.",
              "Staffing, RPO, and HR tech firms targeting TA and HR leaders at scale.",
              "Real estate and facilities companies selling to GCC Admin and CRE heads.",
              "Professional services firms building pipeline among GCC C-suite leaders.",
              "Any B2B brand whose buyers sit inside GCC organisations.",
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-5 items-start p-6 border rounded-xl hover:border-primary transition-colors duration-200"
              >
                <div className="font-mono text-2xl font-bold text-primary/40 leading-none pt-1">
                  0{i + 1}
                </div>
                <p className="text-base md:text-lg leading-relaxed">{item}</p>
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
              We Don't Just Run Campaigns.
              <br />
              <span className="text-accent">We Know the Market.</span>
            </h2>
          </div>

          <p className="text-lg md:text-xl text-background/80 leading-relaxed max-w-3xl mb-12">
            Most ABM agencies build your list, send your emails, and call it done. We're different
            because the data is ours — built and maintained by us, not licensed from a third party.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: ShieldCheck,
                text: "No data middlemen. No stale records.",
              },
              {
                icon: Layers,
                text: "Campaigns that reflect actual GCC org structures.",
              },
              {
                icon: Crosshair,
                text: "Audience segments no one else can replicate.",
              },
              {
                icon: Megaphone,
                text: "Context that makes your messaging land.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-5 items-start p-6 border border-background/10 rounded-xl hover:bg-background/5 transition-colors duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <p className="text-lg leading-relaxed text-background/90 pt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="leading-tight mb-10">
            Let's build the pipeline your competitors can't.
          </h2>
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
                Get a Campaign Proposal
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
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
                Talk to Our Team
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GCCABM;
