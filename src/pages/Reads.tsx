import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MarketingHero } from "@/components/B2BMarketingPage";
import { coverGradient } from "@/lib/coverGradients";
import { useSEO } from "@/hooks/useSEO";

const reads = [{
  slug: "agentic-enterprise",
  title: "The Agentic Enterprise",
  summary: "Build an enterprise that adapts, not just automates. A composable architecture of agents, data and governance that evolves as fast as AI does.",
  label: "Whitepaper",
}];

const Reads = () => {
  useSEO({
    title: "Interesting Reads | Bamboo Reports",
    description: "Curated whitepapers and long-form reads on AI, GCC strategy, and enterprise transformation from Bamboo Reports and partners.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <MarketingHero
          showAction={false}
          title="Interesting reads"
          description={<p>Curated whitepapers and long-form reads on AI, strategy, and what's shaping the enterprise.</p>}
        />
        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold text-accent">Library</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Recent reads</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {reads.map((read, index) => (
                <Link key={read.slug} to={`/reads/${read.slug}`} className="group overflow-hidden rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <div className={`relative flex aspect-video flex-col justify-end overflow-hidden p-6 ${coverGradient(index + 1).base}`}>
                    <div
                      className={`absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none ${coverGradient(index + 1).hover}`}
                      aria-hidden
                    />
                    <div
                      className="gradient-noise pointer-events-none absolute inset-0 opacity-[0.06]"
                      aria-hidden
                    />
                    <div className="relative">
                      <p className="text-xs font-semibold text-foreground">{read.label}</p>
                      <h3 className="mt-2 text-2xl font-bold leading-tight text-navy">{read.title}</h3>
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
                        <div className="overflow-hidden">
                          <p className="pt-2 leading-relaxed text-muted-foreground opacity-0 blur-[5px] transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:opacity-100 group-hover:blur-none group-focus-visible:opacity-100 group-focus-visible:blur-none motion-reduce:blur-none motion-reduce:transition-none">
                            {read.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reads;
