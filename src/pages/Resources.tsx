import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import type { SyntheticEvent } from "react";

const REPORT_THUMBNAIL_FALLBACK = "/placeholder.svg";

const reports = [
  {
    id: "state-of-gccs-2026",
    title: "State of GCCs in India - A 2026 Report",
    subtitle: "Agentic AI, ownership, and the rise of tier-2 hubs.",
    thumbnail: "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvqt4DyIQYfah4CDjOn37lSb01A2cpw68eykxz",
  },
  {
    id: "52-weeks",
    title: "52 Weeks of GCC Momentum",
    subtitle: "India's GCC expansion mapped week by week.",
    thumbnail: "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvNNPnQh6JMprQjEy7dL5OqGWNfYBeuV4HlIzK",
  },
  {
    id: "gcc-snapshot-q1",
    title: "India GCC Snapshot Q1 (FY25-26)",
    subtitle: "Quarterly view of India GCC maturity and momentum.",
    thumbnail: "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvgXdKglTMytEzAd5jcKVQJC81krLZXpRH72bx",
  },
  {
    id: "gcc-snapshot-q2",
    title: "India GCC Snapshot Q2 (FY25-26)",
    subtitle: "Quarterly view of India GCC maturity and momentum.",
    thumbnail: "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvmuUxXGnoI5sEOcLKqMDN4Sdb3xQRZFC9gtu1",
  },
  {
    id: "gcc-snapshot-q3",
    title: "India GCC Snapshot Q3 (FY25-26)",
    subtitle: "Quarterly view of India GCC maturity and momentum.",
    thumbnail: "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvpZK9crebFq8yla9WYurNK7GUmowcBkPOXgxD",
  },
];

const reportDisplayOrder = [
  "state-of-gccs-2026",
  "gcc-snapshot-q3",
  "gcc-snapshot-q2",
  "52-weeks",
  "gcc-snapshot-q1",
];

const recentReports = [...reports]
  .sort((a, b) => reportDisplayOrder.indexOf(a.id) - reportDisplayOrder.indexOf(b.id))
  .slice(0, 3);

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
    description: "Explore the latest reports and blogs from Bamboo Reports in one place.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,hsl(var(--accent)/0.16),transparent_30%),radial-gradient(circle_at_88%_12%,hsl(var(--primary)/0.16),transparent_36%),linear-gradient(140deg,hsl(var(--background))_0%,hsl(var(--muted)/0.42)_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(180deg,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24 space-y-4">
            <h1 className="text-4xl lg:text-6xl font-black leading-[1.03] tracking-tight animate-fade-in">
              Resources
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl animate-fade-in">
              Reports and blogs in one place. Browse the latest three from each, then jump into the full libraries.
            </p>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-4 py-14 lg:py-20 space-y-12">
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Resources</p>
                <h2 className="text-3xl lg:text-4xl font-black">Recent Reports</h2>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <Link to="/reports">View all reports</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentReports.map((report) => (
                <Link
                  key={report.id}
                  to={`/reports/${report.id}`}
                  className="group relative h-full rounded-3xl border bg-gradient-to-br from-background to-muted/50 shadow-[0_12px_36px_-28px_hsl(var(--foreground)/0.28)] transition-all duration-micro ease-smooth hover:shadow-[0_20px_44px_-28px_hsl(var(--primary)/0.38)] hover:-translate-y-[2px] overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(120deg,hsl(var(--foreground))_0.6px,transparent_0.6px)] bg-[size:12px_12px]" />
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={report.thumbnail}
                      alt={report.title}
                      onError={handleThumbnailError}
                      className="w-full h-full object-cover transition-transform duration-micro ease-smooth group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="relative p-5 space-y-2">
                    <h3 className="text-lg font-black leading-tight group-hover:text-primary transition-colors duration-micro ease-smooth">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{report.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Resources</p>
                <h2 className="text-3xl lg:text-4xl font-black">Recent Blogs</h2>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <Link to="/articles">View all blogs</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/articles/${article.slug}`}
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
