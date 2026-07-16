import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { DemoCta, MarketingHero, SectionIntro } from "@/components/B2BMarketingPage";
import { useSEO } from "@/hooks/useSEO";

const STEPS = [
  { title: "Account selection", body: "We start with your ICP: sector, city, company size, function, tech stack. We pull the matching GCC accounts from our database, with full context on each centre's size, age, parent company, and leadership." },
  { title: "Contact targeting", body: "From our verified decision-maker contact pool, we build your target list: the right function heads, at the right centres, in the right geographies. No duplication. No guesswork." },
  { title: "Campaign execution", body: "We run multi-channel campaigns across LinkedIn, email, curated roundtables, and content syndication through the Bamboo Reports audience." },
  { title: "MQL handoff", body: "We deliver qualified leads: contacts who've engaged with your content, attended your events, or raised their hand. Not raw lists. Not cold traffic." },
];

const FORMATS = [
  { name: "Focused ABM sprint", desc: "Short, sharp campaign targeting a defined account list." },
  { name: "City blitz", desc: "Concentrated push in one GCC cluster." },
  { name: "Roundtable programme", desc: "Curated events with senior GCC leaders." },
  { name: "Content + nurture", desc: "LinkedIn and email sequence across named accounts." },
  { name: "Full GTM programme", desc: "Multi-city, multi-channel, long-form engagement." },
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
        title={<><span className="block">Account-based marketing</span><span className="block">for the India GCC market.</span><span className="block text-primary">Built on the best data in the business.</span></>}
        description={<p>From prospect data and account planning to campaign execution and performance reporting, we run focused GCC outreach programmes end to end. We handle the signals, scoring, segmentation, and insights, so your team can run personalised GCC campaigns without drowning in operational work.</p>}
      />

      <FadeIn>
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="The problem" title="GCC buyers are hard to reach. Generic ABM doesn't work here.">
            <div className="space-y-4">
              <p>India's GCC ecosystem doesn't behave like the broader enterprise market. Decision-makers aren't always visible. Org charts are opaque. Titles vary wildly. And most ABM platforms don't understand what a GCC actually is.</p>
              <p className="text-xl font-semibold leading-snug text-foreground md:text-2xl">Running campaigns into this market without GCC-native data means <span className="text-primary">wasted spend, wrong targets,</span> and messaging that lands with the wrong people.</p>
            </div>
          </SectionIntro>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section id="how-it-works" className="scroll-mt-24 border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="How it works" title="Full-funnel ABM, end to end." />
          <div className="mt-10 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.title} className="border-t py-6">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="Campaign formats" title="Pick your play." />
          <div className="mt-10">
            {FORMATS.map((format) => (
              <div key={format.name} className="grid gap-4 border-t py-6 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-8">
                <h3 className="text-xl font-bold">{format.name}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">{format.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="Proven results" title="Qualified pipeline. Measurable outcomes.">
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
      </FadeIn>

      <FadeIn>
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="Who it's for" title="Built for B2B teams selling into GCCs." />
          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {[
              "SaaS and Tech vendors entering or expanding in the India GCC market.",
              "Staffing, RPO, and HR tech firms targeting TA and HR leaders at scale.",
              "Real estate and facilities companies selling to GCC Admin and CRE heads.",
              "Professional services firms building pipeline among GCC C-suite leaders.",
              "Any B2B brand whose buyers sit inside GCC organisations.",
            ].map((item) => (
              <div key={item} className="border-t py-6"><p className="text-lg leading-relaxed">{item}</p></div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="Why Bamboo Reports" title={<>We don't just run campaigns.<br /><span className="text-primary">We know the market.</span></>}>
            <p>Most ABM agencies build your list, send your emails, and call it done. We're different because the data is ours, built and maintained by us, not licensed from a third party.</p>
          </SectionIntro>
          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {[
              { text: "No data middlemen. No stale records. 260+ man-months of structured research, AI-refreshed weekly." },
              { text: "Campaigns that reflect actual centre-level org structures: service-mix, function splits, tech stacks." },
              { text: "Audience segments no competitor can replicate. 21x more structured data per GCC than the nearest alternative." },
              { text: "Messaging context from the same team publishing the India GCC intelligence layer." },
            ].map((item) => (
              <div key={item.text} className="border-t py-6"><p className="text-lg leading-relaxed text-muted-foreground">{item.text}</p></div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <DemoCta title="Let's build the pipeline your competitors can't." />
      </FadeIn>
      <Footer showCta={false} />
    </div>
  );
};

export default GCCABM;
