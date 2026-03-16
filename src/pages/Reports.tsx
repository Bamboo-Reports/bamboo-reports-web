import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import type { SyntheticEvent } from "react";

const REPORT_THUMBNAIL_FALLBACK = "/placeholder.svg";

const reports = [
  {
    id: "state-of-gccs-2026",
    title: "State of GCCs in India - A 2026 Report",
    subtitle: "Agentic AI, ownership, and the rise of tier-2 hubs.",
    thumbnail: "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvqt4DyIQYfah4CDjOn37lSb01A2cpw68eykxz",
    altText: "State of GCCs in India 2026 Report",
  },
  {
    id: "52-weeks",
    title: "52 Weeks of GCC Momentum",
    subtitle: "India's GCC expansion mapped week by week.",
    thumbnail: "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvNNPnQh6JMprQjEy7dL5OqGWNfYBeuV4HlIzK",
    altText: "52 Weeks of GCC Momentum Report",
  },
  {
    id: "gcc-snapshot-q1",
    title: "India GCC Snapshot Q1 (FY25-26)",
    subtitle: "Quarterly view of India GCC maturity and momentum.",
    thumbnail: "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvgXdKglTMytEzAd5jcKVQJC81krLZXpRH72bx",
    altText: "India GCC Q1 Snapshot Report",
  },
  {
    id: "gcc-snapshot-q2",
    title: "India GCC Snapshot Q2 (FY25-26)",
    subtitle: "Quarterly view of India GCC maturity and momentum.",
    thumbnail: "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvmuUxXGnoI5sEOcLKqMDN4Sdb3xQRZFC9gtu1",
    altText: "India GCC Q2 Snapshot Report",
  },
  {
    id: "gcc-snapshot-q3",
    title: "India GCC Snapshot Q3 (FY25-26)",
    subtitle: "Quarterly view of India GCC maturity and momentum.",
    thumbnail: "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvpZK9crebFq8yla9WYurNK7GUmowcBkPOXgxD",
    altText: "India GCC Q3 Snapshot Report",
  },
];

const reportDisplayOrder = [
  "state-of-gccs-2026",
  "gcc-snapshot-q3",
  "gcc-snapshot-q2",
  "52-weeks",
  "gcc-snapshot-q1",
];

const sortedReports = [...reports].sort((a, b) => {
  const aIndex = reportDisplayOrder.indexOf(a.id);
  const bIndex = reportDisplayOrder.indexOf(b.id);
  if (aIndex === -1 && bIndex === -1) return 0;
  if (aIndex === -1) return 1;
  if (bIndex === -1) return -1;
  return aIndex - bIndex;
});

const Reports = () => {
  const handleThumbnailError = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    img.onerror = null;
    img.src = REPORT_THUMBNAIL_FALLBACK;
  };

  useSEO({
    title: "India GCC Reports | GCC Intelligence & GTM Market Research | Bamboo Reports",
    description:
      "Comprehensive India GCC Intelligence reports with GTM market research. Access India Global Capability Centers trends, quarterly snapshots, and strategic intelligence for GCC expansion in India.",
    keywords:
      "India GCC Reports, GCC Intelligence India, India GCC research, GTM Intelligence India, Global Capability Centers India reports, India GCC Intelligence, GCC market intelligence India, India GCC trends, GTM market research India",
    canonicalUrl: "https://www.bambooreports.com/reports",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,hsl(var(--accent)/0.16),transparent_30%),radial-gradient(circle_at_88%_12%,hsl(var(--primary)/0.16),transparent_36%),linear-gradient(140deg,hsl(var(--background))_0%,hsl(var(--muted)/0.42)_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(180deg,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24 space-y-4">
            <h1 className="text-4xl lg:text-6xl font-black leading-[1.03] tracking-tight animate-fade-in">Reports</h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl animate-fade-in">
              GCC intelligence reports you can drop directly into leadership reviews.
            </p>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-4 py-14 lg:py-20 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Library</p>
            <h2 className="text-3xl lg:text-4xl font-black">Latest Reports</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sortedReports.map((report) => (
              <Link
                key={report.id}
                to={`/reports/${report.id}`}
                className="group relative h-full rounded-3xl border bg-gradient-to-br from-background to-muted/50 shadow-[0_12px_36px_-28px_hsl(var(--foreground)/0.28)] transition-all duration-micro ease-smooth hover:shadow-[0_20px_44px_-28px_hsl(var(--primary)/0.38)] hover:-translate-y-[2px] overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(120deg,hsl(var(--foreground))_0.6px,transparent_0.6px)] bg-[size:12px_12px]" />
                <div className="aspect-video overflow-hidden">
                  <img
                    src={report.thumbnail}
                    alt={report.altText}
                    onError={handleThumbnailError}
                    className="w-full h-full object-cover transition-transform duration-micro ease-smooth group-hover:scale-[1.02]"
                  />
                </div>
                <div className="relative p-6 space-y-2">
                  <h3 className="text-2xl font-black leading-tight group-hover:text-primary transition-colors duration-micro ease-smooth">
                    {report.title}
                  </h3>
                  <p className="text-base text-muted-foreground">{report.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reports;
