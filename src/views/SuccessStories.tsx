import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { DemoCta, MarketingHero } from "@/components/B2BMarketingPage";
import { useSEO } from "@/hooks/useSEO";

const CASE_ONE_RESULTS = [
  { value: "1,050", label: "Prospect universe: global customers with India GCCs + look-alike accounts" },
  { value: "70+", label: "BFSI accounts shortlisted for strategic GTM fit" },
  { value: "44", label: "Drill-down reports: vendor, tech, entry points, decision-makers" },
  { value: "364", label: "Decision-makers mapped across BFSI shortlist" },
];

const ENGAGEMENT_ARC = [
  { phase: "Discovery", detail: "India GCC overview + peer company profiles in the sector." },
  { phase: "Analysis", detail: "Talent benchmarking, RA services landscape, peer comparisons." },
  { phase: "Ongoing", detail: "Customised dashboard + capacity planning + ecosystem monitoring." },
  { phase: "Outcome", detail: "Intelligence presented to global leadership. A seat at the table.", emphasis: true },
];

const SuccessStories = () => {
  useSEO({
    title: "Success Stories | Bamboo Reports",
    description:
      "Proof that the Bamboo Reports model works across solution providers and GCCs alike. BFSI GCC strategy for a global IT services firm, and GCC setup for a Fortune 500 medical device company.",
    keywords:
      "Bamboo Reports case studies, GCC success stories, BFSI GCC intelligence, Medical device GCC, India GCC benchmarking",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <MarketingHero
        showAction={false}
        title={<><span className="block">Intelligence at work.</span><span className="block text-primary">Outcomes, not headlines.</span></>}
        description={<p>Two long-running engagements that show what structured, centre-level intelligence delivers in practice. One for a solution provider selling into GCCs. One for a GCC building its own future.</p>}
      />

      <FadeIn>
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-accent">Leading global IT services firm</p>
          <p className="mt-4 text-sm font-medium text-muted-foreground">4 years · Ongoing</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">BFSI GCC strategy &amp; intelligence</h2>
          <p className="mt-4 max-w-6xl text-lg leading-relaxed text-muted-foreground">A global technology and consulting firm needed to expand its India BFSI GCC pipeline. The mandate: map global customers with India GCC presence, add look-alike accounts beyond their book, then go deep on the BFSI strategic shortlist.</p>
          <p className="mt-5 font-semibold">The programme is still running 4 years on.</p>

          <p className="mt-10 text-sm font-semibold text-accent">What we delivered</p>
          <div className="mt-4 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
            {CASE_ONE_RESULTS.map((result) => (
              <div key={result.label} className="border-t py-6">
                <div className="text-4xl font-bold leading-none tracking-tight text-primary md:text-5xl">{result.value}</div>
                <p className="mt-4 leading-relaxed text-muted-foreground">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section className="border-y bg-secondary/30 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-accent">Two sides of the same ecosystem</p>
          <p className="mt-4 max-w-6xl text-2xl font-semibold leading-snug md:text-3xl">One platform. Two audiences. <span className="text-primary">The same centre-level intelligence that wins mandates also builds business cases.</span></p>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-accent">Global medical device company GCC</p>
          <p className="mt-4 text-sm font-medium text-muted-foreground">Fortune 500 · Phased · Strategic</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">GCC benchmarking, talent &amp; expansion</h2>
          <p className="mt-4 max-w-6xl text-lg leading-relaxed text-muted-foreground">A Fortune 500 medical device company setting up their India GCC needed structured intelligence on peer GCCs, talent landscapes, and a benchmarking framework to build their board-level business case.</p>
          <p className="mt-5 font-semibold">Intelligence presented to global leadership. A seat at the table.</p>

          <p className="mt-10 text-sm font-semibold text-accent">The engagement arc</p>
          <ol className="mt-4 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENT_ARC.map((item) => (
              <li key={item.phase} className="border-t py-6">
                <h3 className={`text-lg font-bold ${item.emphasis ? "text-primary" : ""}`}>{item.phase}</h3>
                <p className={`mt-2 leading-relaxed ${item.emphasis ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <DemoCta
        title="Your engagement could be the next story."
      />
      </FadeIn>

      <Footer showCta={false} />
    </div>
  );
};

export default SuccessStories;
