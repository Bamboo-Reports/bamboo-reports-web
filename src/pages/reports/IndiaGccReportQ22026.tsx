import { Download } from "lucide-react";
import logo from "@/assets/bamboo-logo.svg";
import JotFormEmbed from "@/components/JotFormEmbed";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import StructuredData from "@/components/StructuredData";
import q2ReportCover from "../../../q2-report-cover.png";

const DOWNLOAD_FORM_ID = "262451603191451";

const NUMBERS = [
  { value: "99", label: "companies\ntracked", highlight: false },
  { value: "110", label: "centres", highlight: false },
  { value: "40", label: "first-time\nentrants", highlight: true },
  { value: "59", label: "expanding companies", highlight: false },
  { value: "26", label: "announced", highlight: true },
];

const FINDINGS = [
  {
    lead: "The market accelerated:",
    rest: "110 centre events made this quarter 43% larger than the last, with 84 centres operating and 26 announced.",
  },
  {
    lead: "Activity concentrated:",
    rest: "Bengaluru and Hyderabad accounted for half of all centres, while 95% of announced roles were mid or senior level.",
  },
  {
    lead: "AI moved into the charter:",
    rest: "23% of new centres opened with an AI or machine-learning mandate, and AI/ML became the second-largest hiring function.",
  },
];

const METHOD_STATS = [
  { value: "2,400+", label: "companies under coverage" },
  { value: "6,000+", label: "centres tracked at coordinate level" },
  { value: "58K+", label: "decision-makers mapped" },
];

const FAQS = [
  {
    question: "What does the India GCC Quarterly Report cover?",
    answer:
      "A centre-level view of GCC activity in India: new centres, expansions, announced pipeline, hiring signals, city and micro-cluster activity, a BFSI sector focus, and predictions for the next quarter. The Q2 2026 edition covers April to June 2026.",
    open: true,
  },
  {
    question: "Is it free?",
    answer:
      "Yes. Complete the short download form to access the full report at no cost.",
  },
  {
    question: "How is the data collected?",
    answer:
      "From the Bamboo Reports platform, which tracks individual GCC centres across India at coordinate level, enriched by an analyst team since 2022. The report's methodology section sets out sources and definitions.",
  },
];

const FAQ_SCHEMA = { questions: FAQS };

const IndiaGccReportQ22026 = () => {
  const seoDescription =
    "The Q2 2026 India GCC Quarterly Report tracks 110 centre events across 99 companies and 27 cities, including 40 first-time entrants, 75K+ announced roles and the rise of AI-first centres.";

  useSEO({
    title: "India GCC Quarterly Report, Q2 2026 (April to June) | Bamboo Reports",
    description: seoDescription,
    ogTitle: "India GCC Quarterly Report, Q2 2026 (April to June)",
    ogDescription: seoDescription,
    ogImage:
      "https://bambooreports.com/gcc/india-gcc-report-share-card-q2-2026.png",
    ogType: "article",
    canonicalUrl: "https://bambooreports.com/reports/india-gcc-report-q2-2026",
  });

  return (
    <div className="min-h-screen bg-background pb-[calc(4.75rem+env(safe-area-inset-bottom))] lg:pb-0">
      <StructuredData type="faq" data={FAQ_SCHEMA} />
      <div className="flex h-1" aria-hidden>
        <div className="w-2/3 bg-primary" />
        <div className="w-1/3 bg-accent" />
      </div>

      <header className="border-b border-primary/15 bg-background px-4">
        <div className="mx-auto flex max-w-7xl items-center py-4">
          <img
            src={logo}
            alt="Bamboo Reports"
            width={777}
            height={336}
            className="h-10 w-auto md:h-12"
          />
        </div>
      </header>

      <main className="bg-background px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)] lg:gap-x-16 lg:gap-y-0">
          <section className="lg:col-start-1 lg:row-start-1">
            <p className="hero-rise text-sm font-semibold text-primary">
              India GCC Quarterly Report &middot; Q2 2026, April to June
            </p>
            <p className="hero-rise mt-1 text-sm text-muted-foreground">
              Powered by{" "}
              <a
                href="https://bambooreports.com"
                className="text-primary hover:underline"
              >
                Bamboo Reports
              </a>{" "}
              GCC Intelligence
            </p>
            <h1 className="hero-rise mt-5 text-balance text-4xl font-bold leading-tight text-navy [animation-delay:80ms] md:text-5xl lg:whitespace-nowrap lg:text-[clamp(2rem,3.2vw,2.75rem)]">
              India GCC Quarterly Report, <span className="text-primary">Q2 2026</span>
            </h1>
            <p className="hero-rise mt-4 max-w-3xl text-xl leading-snug text-muted-foreground [animation-delay:120ms]">
              The India GCC build is going AI-first and concentrating.
            </p>
            <p className="hero-rise mt-5 text-sm text-muted-foreground [animation-delay:160ms]">
              A centre-level read of who entered, who expanded, and where the
              next buying windows are opening.
            </p>
            <div className="hero-rise mt-6 overflow-hidden rounded-lg border border-primary/15 bg-transparent [animation-delay:220ms]">
              <dl className="grid grid-cols-2 gap-y-6 p-4 sm:grid-cols-5 sm:gap-y-0 sm:p-6 md:p-7">
                {NUMBERS.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`${
                      index % 2 === 0 ? "" : "border-l border-primary/15 pl-3"
                    } ${
                      index % 5 === 0
                        ? "sm:border-l-0 sm:pl-0"
                        : "sm:border-l sm:border-primary/15 sm:pl-6"
                    }`}
                  >
                    <dd
                      className={`text-3xl font-bold tabular-nums tracking-tight sm:text-4xl ${
                        stat.highlight ? "text-accent-deep" : "text-navy"
                      }`}
                    >
                      {stat.value}
                    </dd>
                    <dt className="mt-1.5 whitespace-pre-line text-[13px] leading-snug text-muted-foreground sm:text-sm">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
              <p className="border-t border-primary/10 px-4 py-3 text-[13px] text-muted-foreground sm:px-6 md:px-7">
                Source: Bamboo Reports | Research NXT GCC Intelligence Platform.
              </p>
            </div>

          </section>

          <aside
            id="download-report"
            className="scroll-mt-6 self-start lg:sticky lg:top-6 lg:col-start-2 lg:row-start-1 lg:row-span-2"
          >
            <div className="hero-rise rounded-lg border border-primary/20 bg-background p-4 [animation-delay:160ms] sm:p-6">
              <div className="mb-5 h-1 w-14 rounded-full bg-accent" aria-hidden />
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-navy">
                Download the report
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Complete the form to access your free copy.
              </p>
              <div className="mt-4 overflow-hidden rounded-md border border-primary/15">
                <JotFormEmbed
                  formId={DOWNLOAD_FORM_ID}
                  title="BR - Q2 2026 (Download)"
                  height="539px"
                />
              </div>
            </div>
          </aside>

          <section className="lg:col-start-1 lg:row-start-2 lg:mt-12">
            <p className="text-sm font-semibold text-primary">
              In this edition
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-navy md:text-3xl">
              Three signals that shaped the quarter
            </h2>
            <div className="mt-6 grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
              <img
                src={q2ReportCover}
                alt="Report cover: India GCC Quarterly Report, Q2 2026, April to June, with the quarter's GCC hubs marked on a map of India"
                width={1655}
                height={2340}
                loading="lazy"
                className="w-44 justify-self-center rounded-md shadow-xl shadow-navy/25 sm:w-52 sm:justify-self-start md:w-60 lg:w-72"
              />
              <ol className="border-t-2 border-primary">
                {FINDINGS.map((finding, index) => (
                  <li key={finding.lead} className="flex gap-5 border-b py-4">
                    <span className="min-w-[1.875rem] pt-0.5 text-sm font-bold text-primary">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-relaxed md:text-base">
                      <strong className="font-semibold">{finding.lead}</strong>{" "}
                      {finding.rest}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">
                Also inside:
              </strong>{" "}
              every centre mapped with Bengaluru and Hyderabad at
              micro-cluster level, the announced-centre pipeline with expected
              go-live windows, the 75K+ role talent signal, a BFSI sector focus,
              and two Q3 2026 predictions that will be scored openly in the
              next edition. Full methodology included.
            </p>
          </section>
        </div>
      </main>

      <section className="bg-navy px-4 py-10 text-white md:py-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="text-sm font-semibold text-[hsl(33_100%_65%)]">
              About this research
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white md:text-3xl">
              Counted from the ground up, not estimated from the top down
            </h2>
            <p className="mt-3 max-w-[70ch] text-base leading-relaxed text-white/75">
              Research NXT has worked on India&apos;s GCC ecosystem since 2018.
              The report is built on{" "}
              <a
                href="https://bambooreports.com"
                className="font-semibold text-[hsl(33_100%_65%)] hover:underline"
              >
                Bamboo Reports
              </a>
              , our intelligence platform that tracks every GCC centre in
              India at coordinate level, enriched continuously by our analyst
              team since 2022. Every figure is a count from tracked centres,
              not a modelled estimate, and where a figure depends on company
              disclosure, the report says so.
            </p>
          </div>
          <dl className="flex flex-wrap self-center">
            {METHOD_STATS.map((stat) => (
              <div
                key={stat.label}
                className="min-w-[40%] flex-1 border-t-2 border-white/25 py-3 pr-3"
              >
                <dd className="text-2xl font-bold text-[hsl(33_100%_65%)]">{stat.value}</dd>
                <dt className="mt-0.5 text-xs leading-snug text-white/70">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-background px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-navy md:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-5">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                open={faq.open}
                className="group border-t border-primary/20 py-3 last:border-b"
              >
                <summary className="cursor-pointer list-none text-base font-semibold transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                  <span className="mr-3 inline-block text-primary transition-transform group-open:rotate-90 motion-reduce:transition-none">
                    ›
                  </span>
                  {faq.question}
                </summary>
                <p className="max-w-2xl pt-2 text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-navy px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 text-xs text-white/70">
          <span>&copy; 2026 Bamboo Reports - A Research NXT Product &middot; Pune, India</span>
          <span>
            Powered by{" "}
            <a
              href="https://bambooreports.com"
              className="text-white hover:text-[hsl(33_100%_65%)] hover:underline"
            >
              Bamboo Reports
            </a>{" "}
            GCC Intelligence &middot;{" "}
            <a
              href="https://bambooreports.com/privacy-policy"
              className="text-white hover:text-[hsl(33_100%_65%)] hover:underline"
            >
              Privacy policy
            </a>
          </span>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/15 bg-background/95 px-4 pt-3 backdrop-blur-sm pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
        <Button asChild size="lg" className="w-full font-semibold">
          <a href="#download-report">
            Download report
            <Download className="ml-2 h-4 w-4" aria-hidden />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default IndiaGccReportQ22026;
