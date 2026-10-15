import { RiDownloadLine } from "@remixicon/react";
import logo from "@/assets/bamboo-logo.svg";
import JotFormEmbed from "@/components/JotFormEmbed";
import { Button } from "@/components/ui/button";
import StructuredData from "@/components/StructuredData";
import q2ReportCover from "@/assets/india-gcc-report-q2-2026-cover.webp";

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
    lead: "Entry and expansion:",
    rest: "40% of the 99 companies entered India for the first time, while the remaining 60% added centres or expanded existing ones.",
  },
  {
    lead: "Hiring and talent:",
    rest: "75K+ roles were announced, 32% in Bengaluru and 25% in Hyderabad, with 95% at mid or senior level and AI/ML the second-largest hiring function.",
  },
  {
    lead: "AI-first mandates:",
    rest: "23% of new centres opened with an AI or machine-learning focus as part of their core mandate, making AI a reason to open a centre rather than a function added later.",
  },
];

const METHOD_STATS = [
  { value: "2,400+", label: "companies under coverage" },
  { value: "6,100+", label: "centres tracked at coordinate level" },
  { value: "61K+", label: "decision-makers mapped" },
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
      "From the Bamboo Reports platform, which tracks individual GCC centres across India at coordinate level, enriched by an analyst team since 2022. The report sets out its data conventions up front and describes the platform behind the numbers in its closing section.",
  },
];

// Key findings as plain question-and-answer text, so search and answer
// engines can quote the report without the PDF. Every figure is taken from
// the Q2 2026 report; the full report stays behind the download form.
const REPORT_AUTHOR = { name: "Santosh Abraham", jobTitle: "Founder", role: "Founder, Bamboo Reports" };

const CITY_SHARE = [
  { city: "Bengaluru", centres: 29, share: "26%" },
  { city: "Hyderabad", centres: 28, share: "25%" },
  { city: "Pune", centres: 15, share: "14%" },
  { city: "Chennai", centres: 6, share: "5%" },
  { city: "Delhi NCR", centres: 5, share: "5%" },
  { city: "Mumbai", centres: 4, share: "4%" },
  { city: "19 tier-2 and tier-3 cities", centres: 23, share: "21%" },
];

const KEY_FINDINGS: { question: string; answer: string[]; cities?: boolean }[] = [
  {
    question: "How many GCCs opened in India in Q2 2026?",
    answer: [
      "Between April and June 2026, 99 companies opened or expanded 110 GCC centres across 27 Indian cities. 84 of those centres are already operating and 26 have been announced. 40 companies entered India for the first time; the other 59 expanded an existing presence.",
      "That is up from 77 centres and 74 companies in Q1 2026 (January to March), and from 47 centres in Q2 2025.",
    ],
  },
  {
    question: "Which Indian cities attracted the most GCCs?",
    answer: [
      "Bengaluru and Hyderabad took half of all centre activity. Hyderabad closed the gap with Bengaluru from five centres to one in a single quarter, and has the larger announced pipeline: 7 centres against Bengaluru's 4. Within the cities, Outer Ring Road was the busiest corridor in Bengaluru (9 of 29 centres) and HITEC City led in Hyderabad.",
    ],
    cities: true,
  },
  {
    question: "Which industries are setting up GCCs in India?",
    answer: [
      "Software and SaaS led with 17 of the 99 companies. Retail and consumer goods and BFSI followed with 10 each. Retail and consumer goods was the fastest-growing industry, up from 2 companies in Q1 2026 to 10.",
      "GCC/GIC centres were 35% of all centres opened. Together with R&D centres and centres of excellence, capability-focused centres made up more than half.",
    ],
  },
  {
    question: "How many jobs did India GCCs announce in Q2 2026?",
    answer: [
      "Companies announced more than 75,000 roles: about 52,000 in centres already hiring and 23,000 in announced centres. This is a floor, because it only counts centres that disclose a number.",
      "Hiring is concentrated: 32% of roles are in Bengaluru, 25% in Hyderabad, and the 12 largest centres hold 74% of all announced roles. 95% of roles are mid or senior level. Software engineering is the largest function at 17% of roles, followed by AI and machine learning at 10%.",
    ],
  },
  {
    question: "How many new GCCs in India are focused on AI?",
    answer: [
      "23% of the centres opened in Q2 2026 had AI or machine learning as part of their core mandate. 10% of all announced roles are AI roles, rising to 23% in software centres, and 80% of AI roles are in centres that are already operating.",
    ],
  },
  {
    question: "Where are the companies opening India GCCs based?",
    answer: [
      "51% are headquartered in North America (46% in the United States), 35% in Europe (led by the UK at 10%) and 13% in Asia-Pacific (led by Japan at 8%). 30% have annual revenue below $1 billion, a sign that mid-market companies, many of them software firms, are now entering too.",
    ],
  },
  {
    question: "What changed in BFSI GCCs?",
    answer: [
      "BFSI shifted from banking to insurance. Six of the 10 BFSI companies active in the quarter are insurers, three of them entering India for the first time, and all 10 set up as full captive centres. Half of the BFSI centres are in Hyderabad, and 80% focus on IT.",
    ],
  },
  {
    question: "Which companies opened or expanded GCCs in India in Q2 2026?",
    answer: [
      "First India entries included Zimmer Biomet in Bengaluru and Southwest Airlines in Hyderabad, the airline's first Global Innovation Centre outside the US. S&P Global added a 3,500-seat facility in Gurugram, and Merck KGaA brought several India operations together into a larger Bengaluru hub.",
      "Announced centres include Canadian Imperial Bank of Commerce in Hyderabad (more than 2,000 roles; live since July 2026), Regeneron Pharmaceuticals in Hyderabad, Uber's twin campuses in Bengaluru and Hyderabad (9,600 planned roles) and Microsoft's Gachibowli campus in Hyderabad (7,300 planned roles).",
    ],
  },
];

const FAQ_SCHEMA = { questions: FAQS };

const BREADCRUMB_SCHEMA = {
  items: [
    { name: "Home", url: "https://bambooreports.com/" },
    { name: "Resources", url: "https://bambooreports.com/resources" },
    {
      name: "India GCC Quarterly Report, Q2 2026",
      url: "https://bambooreports.com/reports/india-gcc-report-q2-2026",
    },
  ],
};

const IndiaGccReportQ22026 = () => {
  return (
    <div className="min-h-screen bg-background pb-[calc(4.75rem+env(safe-area-inset-bottom))] lg:pb-0">
      <StructuredData type="faq" data={FAQ_SCHEMA} />
      <StructuredData type="breadcrumb" data={BREADCRUMB_SCHEMA} />
      <StructuredData
        type="report"
        data={{
          path: "/reports/india-gcc-report-q2-2026",
          headline: "India GCC Quarterly Report, Q2 2026 (April to June)",
          image: "https://bambooreports.com/gcc/india-gcc-report-share-card-q2-2026.png",
          author: { name: REPORT_AUTHOR.name, jobTitle: REPORT_AUTHOR.jobTitle },
        }}
      />
      <div className="flex h-1" aria-hidden>
        <div className="w-2/3 bg-primary" />
        <div className="w-1/3 bg-accent" />
      </div>

      <header className="border-b border-primary/15 bg-background px-4">
        <div className="mx-auto flex max-w-7xl items-center py-4">
          <img
            src={logo.src}
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
                  autoReloadAfterSubmit
                />
              </div>
            </div>
          </aside>

          <section className="lg:col-start-1 lg:row-start-2 lg:mt-12">
            <p className="text-sm font-semibold text-primary">
              In this edition
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-navy md:text-3xl">
              Three findings that defined the quarter
            </h2>
            <div className="mt-6 grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
              <img
                src={q2ReportCover.src}
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
              the quarter's centres mapped by city, with Bengaluru and
              Hyderabad broken out by micro-cluster, the announced-centre pipeline with expected
              go-live windows, the 75K+ role talent signal, a BFSI sector focus,
              and two Q3 2026 predictions that will be scored openly in the
              next edition. Data conventions and sources included.
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
              , our intelligence platform that tracks individual GCC centres
              across India at coordinate level, enriched continuously by our analyst
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

      <section aria-labelledby="key-findings" className="bg-background px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-primary">Key findings</p>
          <h2
            id="key-findings"
            className="mt-3 text-2xl font-bold leading-snug tracking-tight text-navy md:text-3xl"
          >
            India GCC market in Q2 2026: the numbers
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            From the India GCC Quarterly Report, Q2 2026, by {REPORT_AUTHOR.name}, {REPORT_AUTHOR.role}.
          </p>

          <div className="mt-8 grid gap-x-16 gap-y-10 lg:grid-cols-2">
            {KEY_FINDINGS.map((finding) => (
              <div key={finding.question} className="border-t-2 border-primary pt-5">
                <h3 className="text-lg font-semibold leading-snug text-navy">{finding.question}</h3>
                {finding.answer.map((paragraph) => (
                  <p key={paragraph} className="mt-3 max-w-[70ch] text-base leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
                {finding.cities ? (
                  <table className="mt-4 w-full max-w-md text-left text-sm">
                    <caption className="sr-only">GCC centres opened in Q2 2026 by city</caption>
                    <thead>
                      <tr className="border-b border-primary/20 text-muted-foreground">
                        <th scope="col" className="py-2 font-semibold">City</th>
                        <th scope="col" className="py-2 text-right font-semibold">Centres</th>
                        <th scope="col" className="py-2 text-right font-semibold">Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CITY_SHARE.map((row) => (
                        <tr key={row.city} className="border-b border-primary/10">
                          <th scope="row" className="py-2 font-normal text-foreground">{row.city}</th>
                          <td className="py-2 text-right tabular-nums">{row.centres}</td>
                          <td className="py-2 text-right tabular-nums">{row.share}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
            Figures are counts of individual centres, not parent companies. Hiring figures are a
            floor, based on centres that disclose a number. Source: Bamboo Reports | Research NXT
            GCC Intelligence Platform. The full report adds micro-cluster maps, the pipeline with
            expected go-live windows and two scored predictions for Q3 2026.
          </p>
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
            <RiDownloadLine className="ml-2 h-4 w-4" aria-hidden />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default IndiaGccReportQ22026;
