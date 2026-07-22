import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { DemoCta, MarketingHero } from "@/components/B2BMarketingPage";
import { ResourceCard, type ResourceItem } from "@/components/ResourceCards";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const reports: ResourceItem[] = [{
  to: "/reports/india-gcc-report-q1-fy27",
  label: "Quarterly report",
  title: "The Q2 2026 India GCC report",
  summary:
    "Who set up or expanded near you, where the hiring went, and which corridors are opening next.",
  gradientIndex: 0,
}];

const reads: ResourceItem[] = [{
  to: "/reads/agentic-enterprise",
  label: "Whitepaper",
  title: "The Agentic Enterprise",
  summary:
    "Build an enterprise that adapts, not just automates. A composable architecture of agents, data and governance that evolves as fast as AI does.",
  gradientIndex: 1,
}];

const Resources = () => {
  useSEO({
    title: "Resources | GCC Reports & Reads | Bamboo Reports",
    description:
      "Market reports, insights, and curated long-form reads from the team tracking India's GCC ecosystem centre by centre.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <MarketingHero showAction={false} title="Resources" />

        <FadeIn>
          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-3xl font-bold md:text-4xl">Reports</h2>
                <Button variant="outline" asChild>
                  <Link to="/reports">View all</Link>
                </Button>
              </div>
              <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {reports.map((report) => (
                  <ResourceCard key={report.to} item={report} />
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-3xl font-bold md:text-4xl">
                  Interesting reads
                </h2>
                <Button variant="outline" asChild>
                  <Link to="/reads">View all</Link>
                </Button>
              </div>
              <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {reads.map((read) => (
                  <ResourceCard key={read.to} item={read} />
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      </main>

      <FadeIn>
        <DemoCta title="Put GCC intelligence to work for your team." />
      </FadeIn>

      <Footer showCta={false} />
    </div>
  );
};

export default Resources;
