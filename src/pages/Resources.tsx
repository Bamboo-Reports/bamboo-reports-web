import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MarketingHero } from "@/components/B2BMarketingPage";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const REPORT_THUMBNAIL_FALLBACK = "/placeholder.svg";

const articles = [
  {
    slug: "h1b-shock-strategic-reset",
    title: "H-1B Shock or Strategic Reset? Bengaluru Roundtable",
    summary:
      "Leaders unpack how India is shifting from scalable execution to decision-grade capability as GCC operating models get rebuilt.",
    date: "13 November 2025",
    thumbnail: "https://files.catbox.moe/v7a2ub.jpg",
  },
];

const recentArticles = articles.slice(0, 3);

const interestingReads = [
  {
    to: "/reads/agentic-enterprise",
    title: "The Agentic Enterprise · Thoughtworks × AWS",
    summary:
      "Build an enterprise that adapts, not just automates. A composable architecture of agents, data and governance that evolves as fast as AI does.",
    label: "Whitepaper",
    thumbnail: "https://3lqbm904a5.ufs.sh/f/qFKrZopOp2VTGMv7iissIv8NxSL4WbOHyQrMJZ3VzREBim0P",
  },
];

const Resources = () => {
  const handleThumbnailError = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    img.onerror = null;
    img.src = REPORT_THUMBNAIL_FALLBACK;
  };

  useSEO({
    title: "Resources | Bamboo Reports",
    description: "Explore the latest roundtables and insights from Bamboo Reports in one place.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <MarketingHero
          showAction={false}
          title={<><span className="block">Resources.</span><span className="block text-primary">Intelligence You Can Use.</span></>}
          description={<p>Roundtables, guides, and data-driven insights from the team building India's GCC intelligence layer.</p>}
        />

        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-accent">Resources</p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl">Recent Roundtables</h2>
              </div>
              <Button variant="outline" asChild>
                <Link to="/roundtables">View All</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/roundtables/${article.slug}`}
                  className="group overflow-hidden rounded-md border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      onError={handleThumbnailError}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold leading-tight transition-colors group-hover:text-primary">{article.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.summary}</p>
                    <p className="mt-3 text-xs font-semibold text-primary">{article.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-accent">Resources</p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl">Interesting Reads</h2>
              </div>
              <Button variant="outline" asChild>
                <Link to="/reads">View All</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {interestingReads.map((read) => (
                <Link
                  key={read.to}
                  to={read.to}
                  className="group overflow-hidden rounded-md border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={read.thumbnail}
                      alt={read.title}
                      onError={handleThumbnailError}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold text-primary">{read.label}</p>
                    <h3 className="mt-2 text-lg font-bold leading-tight transition-colors group-hover:text-primary">{read.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{read.summary}</p>
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

export default Resources;
