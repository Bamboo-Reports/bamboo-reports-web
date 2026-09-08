import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { DemoCta, MarketingHero } from "@/components/B2BMarketingPage";
import { ResourceCard, type ResourceItem } from "@/components/ResourceCards";
import { useSEO } from "@/hooks/useSEO";
import q2ReportCover from "../../q2-report-cover.png";

const reports: ResourceItem[] = [
  {
    to: "/reports/india-gcc-report-q2-2026",
    label: "Quarterly report",
    title: "The Q2 2026 India GCC report",
    summary:
      "Who set up or expanded near you, where the hiring went, and which corridors are opening next.",
    coverImage: q2ReportCover,
  },
];

const Resources = () => {
  useSEO({
    title: "Resources | India GCC Reports | Bamboo Reports",
    description:
      "Market reports from the team tracking India's GCC ecosystem centre by centre.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <MarketingHero showAction={false} title="Resources" />

        <FadeIn>
          <section className="px-5 py-10 sm:px-4 md:py-20">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Reports</h2>
              <div className="mt-6 grid gap-8 sm:mt-8 md:grid-cols-2 md:mt-10 lg:grid-cols-3">
                {reports.map((report) => (
                  <div key={report.to} className="w-full max-w-[300px]">
                    <ResourceCard item={report} />
                  </div>
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
