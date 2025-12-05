import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const articles = [
  {
    slug: "h1b-shock-strategic-reset",
    title: "H-1B Shock or Strategic Reset? Bengaluru Roundtable",
    summary:
      "Leaders unpack how India is shifting from scalable execution to decision-grade capability as GCC operating models get rebuilt.",
    date: "13 November 2025",
    location: "Hilton Bengaluru",
    thumbnail: "https://files.catbox.moe/v7a2ub.jpg",
    tags: ["Roundtable", "GCC Strategy", "India"],
  },
];

const Articles = () => {
  useSEO({
    title: "GCC Articles - Global Capability Centers News & Updates",
    description:
      "Read articles on Global Capability Centers, India GCC ecosystem, market trends, and industry analysis. Expert perspectives on GCC strategy, benchmarking, and GTM research.",
    keywords:
      "GCC Articles, Global Capability Centers News, GCC Industry Analysis, India GCC Updates, GCC Strategy, GCC benchmarking, GTM research India",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          <section className="rounded-3xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 lg:p-12 space-y-6 shadow-sm text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Articles
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">Resources and roundtables from Bamboo Reports.</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Analyst-grade takes on India’s GCC evolution—operating models, capability shifts, and GTM plays for teams building in-market.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Latest</p>
                <h2 className="text-3xl font-bold">Pick an article to dive in.</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/articles/${article.slug}`}
                  className="group h-full rounded-3xl border bg-card shadow-sm transition-all duration-micro ease-smooth hover:shadow-lg hover:-translate-y-[2px] overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-micro ease-smooth group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-micro ease-smooth">
                        {article.title}
                      </h3>
                      <p className="text-base text-muted-foreground">{article.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm font-semibold text-primary">
                      <span className="rounded-full bg-primary/10 px-3 py-1 border border-primary/30">{article.date}</span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 border border-primary/30">{article.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      Read article
                      <span aria-hidden="true">›</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
