import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/FadeIn";
import { DemoCta, MarketingHero } from "@/components/layout/B2BMarketingPage";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import q2ReportCover from "@/assets/india-gcc-report-q2-2026-cover.png";

type Report = {
  href: string;
  title: string;
  /** Portrait (A4) cover. Reports without one show a muted placeholder. */
  cover?: string;
};

// Newest first.
const reports: Report[] = [
  {
    href: "/reports/india-gcc-report-q2-2026",
    title: "The Q2 2026 India GCC report",
    cover: q2ReportCover.src,
  },
];

/**
 * Reports library, laid out like researchnxt.com's reports & whitepapers
 * page: a shelf of portrait covers on a ruled card spine.
 */
const Resources = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <MarketingHero
        backgroundImage="/hero-backgrounds/reports.webp"
          eyebrow="Resources"
          title="Reports"
          description="Research and market reports from the team tracking India's GCC ecosystem centre by centre."
        />

        <Section>
          <Container>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4">
              {reports.map((report, index) => (
                <li
                  key={report.href}
                  className="motion-safe:animate-rise-in"
                  // Stagger caps at two rows so later rows don't lag.
                  style={{ animationDelay: `${Math.min(index, 7) * 55}ms` }}
                >
                  <Link
                    href={report.href}
                    className="group flex h-full flex-col gap-4 border-t border-line pt-4 transition-colors duration-200 ease-out-quart hover:border-primary"
                  >
                    {report.cover ? (
                      <img
                        src={report.cover}
                        alt=""
                        loading="lazy"
                        className="mt-1 aspect-[210/297] w-full rounded-md object-cover"
                      />
                    ) : (
                      <span className="mt-1 aspect-[210/297] w-full rounded-md bg-surface-muted" />
                    )}
                    <h2 className="text-base font-semibold text-ink transition-colors duration-200 group-hover:text-primary">
                      {report.title}
                    </h2>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-primary">
                      View the report
                      <TrailingArrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      </main>

      <FadeIn>
        <DemoCta title="Put GCC intelligence to work for your team." />
      </FadeIn>

      <Footer showCta={false} />
    </div>
  );
};

export default Resources;
