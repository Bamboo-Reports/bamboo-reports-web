import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MarketingHero } from "@/components/B2BMarketingPage";
import { useSEO } from "@/hooks/useSEO";

const READ_THUMBNAIL_FALLBACK = "/placeholder.svg";
const reads = [{
  slug: "agentic-enterprise",
  title: "The Agentic Enterprise · Thoughtworks × AWS",
  summary: "Build an enterprise that adapts, not just automates. A composable architecture of agents, data and governance that evolves as fast as AI does.",
  label: "Whitepaper",
  thumbnail: "https://3lqbm904a5.ufs.sh/f/qFKrZopOp2VTGMv7iissIv8NxSL4WbOHyQrMJZ3VzREBim0P",
}];

const Reads = () => {
  const handleThumbnailError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = READ_THUMBNAIL_FALLBACK;
  };

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
          title="Interesting Reads"
          description={<p>Curated whitepapers and long-form reads on AI, strategy, and what's shaping the enterprise.</p>}
        />
        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold text-accent">Library</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Recent Reads</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {reads.map((read) => (
                <Link key={read.slug} to={`/reads/${read.slug}`} className="group overflow-hidden rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <div className="aspect-video overflow-hidden"><img src={read.thumbnail} alt={read.title} onError={handleThumbnailError} loading="lazy" className="h-full w-full object-cover" /></div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-primary">{read.label}</p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight transition-colors group-hover:text-primary">{read.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{read.summary}</p>
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
