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
  title: "The Q1 FY27 India GCC report",
  summary:
    "A centre-level read of who entered, who expanded, and where the next buying windows are opening.",
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
        <MarketingHero
          showAction={false}
          title={
            <>
              <span className="block">Everything we publish,</span>
              <span className="block text-primary">in one place.</span>
            </>
          }
          description={
            <p>
              Market reports, insights, and curated long-form reads from the
              team tracking India's GCC ecosystem{" "}
              <span className="whitespace-nowrap">centre by centre.</span>
            </p>
          }
        />

        <FadeIn>
          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold md:text-4xl">Reports</h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
                    Built from what we track, not what we survey. Market
                    reads, sector deep-dives, and focused insights on India's
                    GCC ecosystem.
                  </p>
                </div>
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
                <div>
                  <h2 className="text-3xl font-bold md:text-4xl">Interesting reads</h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
                    Not everything worth reading comes from us. These are the
                    outside reports we think senior leaders should see.
                  </p>
                </div>
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
