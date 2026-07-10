import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DemoCta, MarketingHero, SectionIntro } from "@/components/B2BMarketingPage";
import { useSEO } from "@/hooks/useSEO";
import {
  CalendarDays,
  Crosshair,
  HandshakeIcon,
  Layers,
  Mail,
  MapPin,
  Megaphone,
  Rocket,
  ShieldCheck,
  Target,
  UserCheck,
  Zap,
} from "lucide-react";

const STEPS = [
  { num: "Step 1", icon: Target, title: "Account Selection", body: "We start with your ICP: sector, city, company size, function, tech stack. We pull the matching GCC accounts from our database, with full context on each centre's size, age, parent company, and leadership." },
  { num: "Step 2", icon: UserCheck, title: "Contact Targeting", body: "From our verified decision-maker contact pool, we build your target list: the right function heads, at the right centres, in the right geographies. No duplication. No guesswork." },
  { num: "Step 3", icon: Megaphone, title: "Campaign Execution", body: "We run multi-channel campaigns across LinkedIn, email, curated roundtables, and content syndication through the Bamboo Reports audience." },
  { num: "Step 4", icon: HandshakeIcon, title: "MQL Handoff", body: "We deliver qualified leads: contacts who've engaged with your content, attended your events, or raised their hand. Not raw lists. Not cold traffic." },
];

const FORMATS = [
  { icon: Zap, name: "Focused ABM Sprint", desc: "Short, sharp campaign targeting a defined account list." },
  { icon: MapPin, name: "City Blitz", desc: "Concentrated push in one GCC cluster." },
  { icon: CalendarDays, name: "Roundtable Programme", desc: "Curated events with senior GCC leaders." },
  { icon: Mail, name: "Content + Nurture", desc: "LinkedIn and email sequence across named accounts." },
  { icon: Rocket, name: "Full GTM Programme", desc: "Multi-city, multi-channel, long-form engagement." },
];

const RESULTS = [
  { value: "250+", label: "MQLs, single campaign", detail: "One enterprise software client, one GCC-native ABM programme." },
  { value: "600+ / 40+", label: "MQLs / SQLs, enterprise client", detail: "Multi-quarter programme into a named GCC account list." },
  { value: "1,050 / 364", label: "BFSI GCCs profiled / contacts mapped", detail: "4-year ongoing BFSI GCC programme for a leading global IT services firm." },
];

const GCCABM = () => {
  useSEO({
    title: "GCC ABM | Account-Based Marketing for India GCCs | Bamboo Reports",
    description:
      "End-to-end ABM campaigns targeting decision-makers inside India's Global Capability Centres. Bamboo Reports brings the data, the audience, and the execution.",
    keywords:
      "GCC ABM, India ABM, account based marketing GCC, GCC campaigns, GCC demand generation",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <MarketingHero
        title={<><span className="block">Account-Based Marketing</span><span className="block">for the India GCC Market,</span><span className="block text-primary">Built on the Best Data in the Business.</span></>}
        description={<p>From prospect data creation, account planning, account level strategy, campaign planning and performance reporting, we have all the capabilities to create a focussed GCC outreach programme. Reduce operational work, maintain signals, scoring, segmentation, insights without losing sight of the big picture and manage personalised GCC focussed campaigns seamlessly.</p>}
      />

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ The Problem" title="GCC Buyers Are Hard to Reach. Generic ABM Doesn't Work Here.">
            <div className="space-y-4">
              <p>India's GCC ecosystem doesn't behave like the broader enterprise market. Decision-makers aren't always visible. Org charts are opaque. Titles vary wildly. And most ABM platforms don't understand what a GCC actually is.</p>
              <p className="text-xl font-semibold leading-snug text-foreground md:text-2xl">Running campaigns into this market without GCC-native data means <span className="text-primary">wasted spend, wrong targets,</span> and messaging that lands with the wrong people.</p>
            </div>
          </SectionIntro>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ How It Works" title="Full-Funnel ABM, End to End." />
          <div className="mt-10 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.num} className="border-t py-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-accent">{step.num}</span>
                  <step.icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ Campaign Formats" title="Pick Your Play." />
          <div className="mt-10">
            {FORMATS.map((format) => (
              <div key={format.name} className="grid gap-4 border-t py-6 md:grid-cols-[2rem_0.8fr_1.2fr] md:items-center md:gap-8">
                <format.icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="text-xl font-bold">{format.name}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">{format.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ Proven Results" title="Qualified Pipeline. Measurable Outcomes.">
            <p>ABM campaigns for SaaS vendors, enterprise software, and professional services firms, delivered across India's top GCC cities with <span className="font-semibold text-primary">guaranteed MQL outcomes, not just impressions.</span></p>
          </SectionIntro>
          <div className="mt-10 grid gap-x-8 md:grid-cols-3">
            {RESULTS.map((result) => (
              <div key={result.label} className="border-t py-6">
                <div className="text-4xl font-bold leading-none tracking-tight text-primary">{result.value}</div>
                <div className="mt-4 text-sm font-semibold text-foreground">{result.label}</div>
                <p className="mt-3 leading-relaxed text-muted-foreground">{result.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ Who It's For" title="Built for B2B Teams Selling Into GCCs." />
          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {[
              "SaaS and Tech vendors entering or expanding in the India GCC market.",
              "Staffing, RPO, and HR tech firms targeting TA and HR leaders at scale.",
              "Real estate and facilities companies selling to GCC Admin and CRE heads.",
              "Professional services firms building pipeline among GCC C-suite leaders.",
              "Any B2B brand whose buyers sit inside GCC organisations.",
            ].map((item, index) => (
              <div key={item} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t py-6"><span className="text-sm font-semibold tabular-nums text-accent">0{index + 1}</span><p className="text-lg leading-relaxed">{item}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ Why Bamboo Reports" title={<>We Don't Just Run Campaigns.<br /><span className="text-primary">We Know the Market.</span></>}>
            <p>Most ABM agencies build your list, send your emails, and call it done. We're different because the data is ours, built and maintained by us, not licensed from a third party.</p>
          </SectionIntro>
          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {[
              { icon: ShieldCheck, text: "No data middlemen. No stale records. 260+ man-months of structured research, AI-refreshed weekly." },
              { icon: Layers, text: "Campaigns that reflect actual centre-level org structures: service-mix, function splits, tech stacks." },
              { icon: Crosshair, text: "Audience segments no competitor can replicate. 21x more structured data per GCC than the nearest alternative." },
              { icon: Megaphone, text: "Messaging context from the same team publishing the India GCC intelligence layer." },
            ].map((item) => (
              <div key={item.text} className="grid grid-cols-[1.5rem_1fr] gap-4 border-t py-6"><item.icon className="mt-1 h-5 w-5 text-primary" aria-hidden /><p className="text-lg leading-relaxed text-muted-foreground">{item.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <DemoCta title="Let's build the pipeline your competitors can't." />
      <Footer showCta={false} />
    </div>
  );
};

export default GCCABM;
