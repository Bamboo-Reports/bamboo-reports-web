import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import type { SyntheticEvent } from "react";

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

      <main className="flex-1">
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
            <h1 className="leading-[1.05] max-w-5xl">
              <span className="block text-foreground">Resources.</span>
              <span className="block text-accent">Intelligence You Can Use.</span>
            </h1>
            <p className="mt-8 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Roundtables, guides, and data-driven insights from the team building India's GCC
              intelligence layer.
            </p>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-4 py-14 lg:py-20 space-y-12">
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Resources</p>
                <h2 className="text-3xl lg:text-4xl font-black">Recent Roundtables</h2>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <Link to="/roundtables">View all roundtables</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/roundtables/${article.slug}`}
                  className="group relative h-full rounded-3xl border bg-gradient-to-br from-background to-muted/50 shadow-[0_12px_36px_-28px_hsl(var(--foreground)/0.28)] transition-all duration-micro ease-smooth hover:shadow-[0_20px_44px_-28px_hsl(var(--primary)/0.38)] hover:-translate-y-[2px] overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(120deg,hsl(var(--foreground))_0.6px,transparent_0.6px)] bg-[size:12px_12px]" />
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      onError={handleThumbnailError}
                      className="w-full h-full object-cover transition-transform duration-micro ease-smooth group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="relative p-5 space-y-2">
                    <h3 className="text-lg font-black leading-tight group-hover:text-primary transition-colors duration-micro ease-smooth">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{article.summary}</p>
                    <p className="text-xs font-semibold text-primary">{article.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
