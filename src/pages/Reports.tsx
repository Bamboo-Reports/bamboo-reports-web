import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";

const reports = [
  {
    id: "52-weeks",
    title: "52 Weeks of GCC Momentum",
    subtitle: "India’s GCC expansion mapped week by week.",
    thumbnail: "https://files.catbox.moe/1brg2g.png",
    description: "A full year of India GCC movements—new centers, capability ramps, and leadership shifts—packaged for GTM, strategy, and delivery teams.",
    altText: "52 Weeks of GCC Momentum Report - India Global Capability Centers Trends Analysis",
    highlights: [
      "Weekly signals on new centers, expansions, and exits",
      "City and sector heatmaps tuned for GTM & delivery",
      "Leadership moves with intent signals you can action"
    ],
    meta: { pages: "80+", updated: "Weekly signals", format: "Deck + export" }
  },
  {
    id: "gcc-snapshot-q2",
    title: "India GCC Snapshot Q2 (FY25-26)",
    subtitle: "Quarterly view of India GCC maturity and momentum.",
    thumbnail: "https://files.catbox.moe/r8f791.png",
    description: "A quarterly checkpoint on where India GCC growth is headed—headcount, capabilities, leadership depth, and city momentum in one defensible pack.",
    altText: "India GCC Q2 Snapshot Report - Quarterly Global Capability Centers Intelligence",
    highlights: [
      "Quarterly benchmark of headcount, capability mix, and city shifts",
      "Peer comparisons for scale, maturity, and hiring velocity",
      "Signals and commentary ready for executive decks"
    ],
    meta: { pages: "60+", updated: "Quarterly", format: "Deck + export" }
  },
];

const Reports = () => {
  useSEO({
    title: "India GCC Reports | GCC Intelligence & GTM Market Research | Bamboo Reports",
    description: "Comprehensive India GCC Intelligence reports with GTM market research. Access India Global Capability Centers trends, quarterly snapshots, and strategic intelligence for GCC expansion in India.",
    keywords: "India GCC Reports, GCC Intelligence India, India GCC research, GTM Intelligence India, Global Capability Centers India reports, India GCC Intelligence, GCC market intelligence India, India GCC trends, GTM market research India, GCC insights India, India GCC quarterly reports",
    canonicalUrl: "https://www.bambooreports.com/reports",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <section className="rounded-3xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 lg:p-12 space-y-6 shadow-sm">
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Reports Library
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">GCC intelligence you can lift straight into exec decks.</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Curated reports combining verified GCC data, live hiring signals, and analyst commentary. Use them to brief leadership, prioritize GTM plays, and de-risk delivery timelines.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full" asChild>
                <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Book a walkthrough</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link to="/gcc-list">Explore the data</Link>
              </Button>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Latest releases</p>
                <h2 className="text-3xl font-bold">Pick the report that fits your next review.</h2>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Need a custom cut?</a>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {reports.map((report) => (
                <Link
                  key={report.id}
                  to={`/reports/${report.id}`}
                  className="group"
                >
              <div className="h-full rounded-3xl border bg-card shadow-sm transition-all duration-micro ease-smooth hover:shadow-lg hover:-translate-y-[2px] overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={report.thumbnail}
                    alt={report.altText}
                    className="w-full h-full object-cover transition-transform duration-micro ease-smooth group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-micro ease-smooth">
                      {report.title}
                    </h3>
                    <p className="text-base text-muted-foreground">{report.subtitle}</p>
                      </div>
                      <p className="text-base text-foreground">{report.description}</p>
                      <div className="grid gap-2">
                        {report.highlights.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        View report
                        <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/40 p-8 lg:p-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-center">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Need a different slice?</p>
              <h3 className="text-2xl lg:text-3xl font-bold">We can tailor the deck to your sector, city list, or capability focus.</h3>
              <p className="text-base text-muted-foreground">Share the exact questions your leadership needs answered. We’ll re-cut the data and leave you with an export-ready deck and shortlist.</p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full" asChild>
                  <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Talk to us</a>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link to="/pricing">Compare plans</Link>
                </Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Deck, spreadsheet, or CRM export options",
                "Analyst notes for context you can defend",
                "Turnaround in 48–72 hours for custom cuts",
                "City, sector, and capability-specific deep dives"
              ].map((item) => (
                <div key={item} className="rounded-2xl border bg-background px-4 py-3 text-sm font-medium leading-relaxed text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reports;
