import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MarketingHero } from "@/components/B2BMarketingPage";
import { coverGradient } from "@/lib/coverGradients";
import { useSEO } from "@/hooks/useSEO";

const reports = [
  {
    to: "/reports/india-gcc-report-q1-fy27",
    label: "Quarterly report",
    title: "The Q1 FY27 India GCC report",
    summary:
      "A centre-level read of who entered, who expanded, and where the next buying windows are opening.",
  },
];

const Reports = () => {
  useSEO({
    title: "Reports | Bamboo Reports",
    description:
      "Intelligence reports on India's GCC ecosystem, published by Bamboo Reports.",
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
                The India GCC market, read at centre level.
              </span>
            </>
          }
        />

        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((report, index) => (
                <Link
                  key={report.to}
                  to={report.to}
                  className="group overflow-hidden rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className={`relative flex aspect-video flex-col justify-end overflow-hidden p-6 ${coverGradient(index).base}`}>
                    <div
                      className={`absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none ${coverGradient(index).hover}`}
                      aria-hidden
                    />
                    <div
                      className="gradient-noise pointer-events-none absolute inset-0 opacity-[0.06]"
                      aria-hidden
                    />
                    <div className="relative">
                      <p className="text-xs font-semibold text-foreground">
                        {report.label}
                      </p>
                      <h2 className="mt-2 text-lg font-bold leading-tight text-navy">
                        {report.title}
                      </h2>
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
                        <div className="overflow-hidden">
                          <p className="pt-2 text-sm leading-relaxed text-muted-foreground opacity-0 blur-[5px] transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:opacity-100 group-hover:blur-none group-focus-visible:opacity-100 group-focus-visible:blur-none motion-reduce:blur-none motion-reduce:transition-none">
                            {report.summary}
                          </p>
                        </div>
                      </div>
                    </div>
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

export default Reports;
