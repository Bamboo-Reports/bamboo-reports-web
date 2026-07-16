import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { MarketingHero } from "@/components/B2BMarketingPage";
import {
  FeaturedResourceRow,
  ResourceCard,
  type ResourceItem,
} from "@/components/ResourceCards";
import { useSEO } from "@/hooks/useSEO";

const reports: ResourceItem[] = [
  {
    to: "/reports/india-gcc-report-q1-fy27",
    label: "Quarterly report",
    title: "The Q1 FY27 India GCC report",
    summary:
      "A centre-level read of who entered, who expanded, and where the next buying windows are opening.",
    gradientIndex: 0,
  },
];

const [latestReport, ...earlierReports] = reports;

const Reports = () => {
  useSEO({
    title: "Reports | India GCC Intelligence | Bamboo Reports",
    description:
      "Market reports and insights on India's GCC ecosystem: market reads, sector deep-dives, and focused research from Bamboo Reports.",
    canonicalUrl: "https://www.bambooreports.com/reports",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <MarketingHero
          showAction={false}
          title={
            <>
              <span className="block">Reports.</span>
              <span className="block text-primary">
                Research on the India GCC market.
              </span>
            </>
          }
          description={
            <p>
              Market reads, sector deep-dives, and focused insight reports,
              all built on what we track across India's GCC ecosystem and
              written for the teams <span className="whitespace-nowrap">selling into it.</span>
            </p>
          }
        />

        <FadeIn>
          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-semibold text-accent">Latest report</p>
              <div className="mt-6">
                <FeaturedResourceRow
                  item={latestReport}
                  cta="Register for the report"
                />
              </div>

              {earlierReports.length > 0 && (
                <>
                  <p className="mt-14 text-sm font-semibold text-accent">
                    More reports
                  </p>
                  <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {earlierReports.map((report) => (
                      <ResourceCard key={report.to} item={report} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
};

export default Reports;
