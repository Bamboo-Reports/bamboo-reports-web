import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JotFormEmbed from "@/components/JotFormEmbed";
import { useSEO } from "@/hooks/useSEO";

const PILLARS = [
  { number: "01", title: "The new business architecture", description: "Assemble agents, models and data products into capabilities you can recompose as needs change" },
  { number: "02", title: "A framework for AI reliability", description: "Five continuous stages, from evaluation to humans in the loop, built on 30+ years of engineering rigor" },
  { number: "03", title: "The path to scaling agentic AI", description: "Start with a thin slice that delivers value from day one, then expand across the enterprise" },
];

const AgenticEnterprise = () => {
  useSEO({
    title: "The Agentic Enterprise · Thoughtworks × AWS Whitepaper",
    description: "Build an enterprise that adapts, not just automates. Download the Thoughtworks & AWS whitepaper on building an ecosystem of continuous evolution and reliable impact.",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="border-b px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <section>
            <a href="https://www.thoughtworks.com/" target="_blank" rel="noopener noreferrer" aria-label="Thoughtworks">
              <img src="/logos/thoughtworks-logo.svg" alt="Thoughtworks" className="h-7 w-auto" />
            </a>
            <h1 className="mt-10 text-4xl font-bold leading-tight md:text-5xl">The agentic enterprise<span className="text-primary">.</span></h1>
            <p className="mt-5 text-xl font-semibold leading-snug">Stop building AI to a blueprint. <span className="text-primary">Start building for constant change.</span></p>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">MIT found that 95% of generative AI pilots fail to deliver value. The problem isn't the technology, it's transformation built to a fixed end-state. This Thoughtworks and AWS report shows how a composable architecture of agents, data and governance lets your enterprise adapt as fast as AI evolves.</p>
            <ul className="mt-10 border-t">
              {PILLARS.map((pillar) => (
                <li key={pillar.number} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b py-5">
                  <span className="text-sm font-semibold tabular-nums text-accent">{pillar.number}</span>
                  <span><strong className="block font-semibold">{pillar.title}</strong><span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{pillar.description}</span></span>
                </li>
              ))}
            </ul>
          </section>

          <aside className="border-t pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <h2 className="text-2xl font-bold leading-tight">Build an enterprise where humans and AI evolve together.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Enter your details to get the full report. Free and instant.</p>
            <div className="mt-6 overflow-hidden rounded-md border bg-background">
              <JotFormEmbed formId="261590831475462" title="Thoughtworks x AWS - C1" height="780px" />
            </div>
          </aside>
        </div>
      </main>
      <Footer showCta={false} />
    </div>
  );
};

export default AgenticEnterprise;
