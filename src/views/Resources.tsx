import { RiArrowRightUpLine } from "@remixicon/react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DemoCta, MarketingHero } from "@/components/layout/B2BMarketingPage";
import { Lines } from "@/components/marketing/OfferBlocks";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import q2ReportCover from "@/assets/india-gcc-report-q2-2026-cover.webp";
import commuteCover from "@/assets/navigating-corporate-commute-cover.webp";
import cxCover from "@/assets/transforming-cx-cover.webp";

type Report = {
  href: string;
  title: string;
  /** Release date (YYYY-MM-DD). The shelf sorts on it, oldest first. */
  released: string;
  /** Portrait (A4) cover. Reports without one show a muted placeholder. */
  cover?: string;
  /** Hosted on researchnxt.com: opens in a new tab with an outward arrow. */
  external?: boolean;
};

const RNXT_REPORTS = "https://researchnxt.com/resources/reports-whitepapers";

const reports: Report[] = [
  {
    href: "/reports/india-gcc-report-q2-2026",
    title: "The Q2 2026\nIndia GCC report",
    released: "2026-08-14",
    cover: q2ReportCover.src,
  },
  {
    href: `${RNXT_REPORTS}/navigating-corporate-commute-for-gccs-in-india`,
    title: "Navigating Corporate Commute\nfor GCCs in India",
    released: "2026-02-13",
    cover: commuteCover.src,
    external: true,
  },
  {
    href: `${RNXT_REPORTS}/transforming-cx-through-gccs`,
    title: "Transforming CX\nthrough GCCs",
    released: "2024-04-02",
    cover: cxCover.src,
    external: true,
  },
];

// Oldest first, whatever order entries are added in. ISO dates sort as text.
const shelf = [...reports].sort((a, b) => a.released.localeCompare(b.released));

/** Internal reports route in-app; Research NXT reports open in a new tab. */
const ReportLink = ({
  report,
  className,
  children,
}: {
  report: Report;
  className: string;
  children: React.ReactNode;
}) =>
  report.external ? (
    <a href={report.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens researchnxt.com in a new tab)</span>
    </a>
  ) : (
    <Link href={report.href} className={className}>
      {children}
    </Link>
  );

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
              {shelf.map((report, index) => (
                <li
                  key={report.href}
                  className="motion-safe:animate-rise-in"
                  // Stagger caps at two rows so later rows don't lag.
                  style={{ animationDelay: `${Math.min(index, 7) * 55}ms` }}
                >
                  <ReportLink
                    report={report}
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
                      <Lines text={report.title} />
                    </h2>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-primary">
                      View the report
                      {report.external ? (
                        <RiArrowRightUpLine
                          className="size-4 shrink-0 transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      ) : (
                        <TrailingArrow />
                      )}
                    </span>
                  </ReportLink>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      </main>

      <DemoCta title="Put GCC intelligence to work for your team." />

      <Footer showCta={false} />
    </div>
  );
};

export default Resources;
