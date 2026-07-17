import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/research-nxt-logo.svg";
import JotFormEmbed from "@/components/JotFormEmbed";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useSEO";
import { Q1_REPORT_NUMBERS_CONFIRMED } from "@/lib/featureFlags";

const REPORT_FORM_ID = "261952514660458";

// Figures must match the frozen count set before launch; they stay hidden
// until VITE_Q1_REPORT_NUMBERS_CONFIRMED is "true" (see featureFlags.ts).
const NUMBERS = [
  { value: "110", label: "centre events this quarter", highlight: false },
  { value: "27", label: "cities with activity", highlight: false },
  { value: "1 in 4", label: "new centres carry an AI mandate", highlight: true },
];

const FINDINGS = [
  {
    lead: "Who is really driving the quarter:",
    rest: "the split between first-time entrants and expanding operators, and what each came to build.",
  },
  {
    lead: "Where the hiring went:",
    rest: "the cities, roles and seniority behind the quarter's announced hiring.",
  },
  {
    lead: "What AI changed:",
    rest: "the new centres opening with AI in their charter, and the case studies of GCCs running AI in production.",
  },
];

const METHOD_STATS = [
  { value: "2,400+", label: "companies under coverage", gated: true },
  { value: "5,900+", label: "centres tracked at coordinate level", gated: true },
  { value: "Since 2022", label: "continuous analyst enrichment", gated: false },
];

const VISIBLE_METHOD_STATS = Q1_REPORT_NUMBERS_CONFIRMED
  ? METHOD_STATS
  : METHOD_STATS.filter((stat) => !stat.gated);

const FAQS = [
  {
    question: "What does the India GCC Quarterly Report cover?",
    answer:
      "One quarter of GCC activity in India: new centres, expansions, announced pipeline, hiring signals, one sector in focus, and predictions for the next quarter. The Q1 2026 edition covers April to June 2026.",
    open: true,
  },
  {
    question: "Is it free?",
    answer:
      "Yes. Register with a business email and each edition reaches your inbox on release day.",
  },
  {
    question: "How is the data collected?",
    answer:
      "From the Bamboo Reports platform, which tracks individual GCC centres across India at coordinate level, enriched by an analyst team since 2022. The report's methodology section sets out sources and definitions.",
  },
  {
    question: "When does the next edition come out?",
    answer:
      "Every quarter. The Q1 2026 edition releases in late July 2026; the next edition covers July to September 2026.",
  },
];

const EXIT_INTENT_KEY = "q1fy27-report-exit-intent-shown";

const IndiaGccReportQ1FY27 = () => {
  const [exitIntentOpen, setExitIntentOpen] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const formAsideRef = useRef<HTMLElement>(null);

  // Drives the mobile sticky CTA: shown once the reader scrolls past the
  // hero CTA, hidden again while the form itself is on screen.
  useEffect(() => {
    const aside = formAsideRef.current;
    if (!aside || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(aside);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(EXIT_INTENT_KEY)) return;

    // Arm after a short dwell so an immediate bounce doesn't get a popup.
    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 4000);

    const handleMouseOut = (event: MouseEvent) => {
      if (!armed) return;
      // Fires only when the cursor leaves through the top of the viewport,
      // the classic exit-intent signal (heading for the tab bar or URL).
      if (event.relatedTarget === null && event.clientY <= 0) {
        sessionStorage.setItem(EXIT_INTENT_KEY, "1");
        setExitIntentOpen(true);
        document.removeEventListener("mouseout", handleMouseOut);
      }
    };

    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const goToForm = () => {
    setExitIntentOpen(false);
    formAsideRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  const seoDescription = Q1_REPORT_NUMBERS_CONFIRMED
    ? "The Q1 2026 India GCC Quarterly Report: 110 centre events across 27 cities, mapped to corridor level. Free, publishing late July 2026. Register to receive it first."
    : "The Q1 2026 India GCC Quarterly Report: every centre event of the quarter, mapped to corridor level. Free, publishing late July 2026. Register to receive it first.";

  useSEO({
    title: "India GCC Quarterly Report, Q1 2026 (April to June) | Bamboo Reports",
    description: seoDescription,
    ogTitle: "India GCC Quarterly Report, Q1 2026 (April to June)",
    ogDescription: seoDescription,
    ogImage:
      "https://www.bambooreports.com/gcc/india-gcc-report-share-card-q1-2026.png",
    ogType: "article",
    canonicalUrl: "https://www.bambooreports.com/reports/india-gcc-report-q1-fy27",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-1" aria-hidden>
        <div className="w-2/3 bg-primary" />
        <div className="w-1/3 bg-accent" />
      </div>

      <header className="border-b px-4">
        <div className="mx-auto flex max-w-7xl items-center py-4">
          <img
            src={logo}
            alt="Research NXT"
            width={94}
            height={16}
            className="h-7 w-auto md:h-8"
          />
        </div>
      </header>

      <main className="px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-16">
          <section>
            <p className="hero-rise flex flex-wrap items-center gap-x-3 text-sm font-semibold text-muted-foreground">
              <span className="h-px w-8 bg-accent" aria-hidden />
              India GCC Quarterly Report &middot; Q1 2026, April to June
              &middot; First edition
            </p>
            <p className="hero-rise mt-1 text-sm text-muted-foreground">
              Published by Research NXT &middot; Powered by{" "}
              <a
                href="https://bambooreports.com"
                className="text-primary hover:underline"
              >
                Bamboo Reports
              </a>{" "}
              Intelligence
            </p>
            <h1 className="hero-rise mt-4 text-balance text-4xl font-bold leading-tight [animation-delay:80ms] md:text-5xl lg:whitespace-nowrap lg:text-[clamp(2rem,3.2vw,2.75rem)]">
              India GCC Quarterly Report, Q1 2026
            </h1>
            <p className="hero-rise mt-3 text-xl leading-snug text-muted-foreground [animation-delay:120ms]">
              The quarter&apos;s new centres, expansions, hiring and
              corridors, read at centre level.
            </p>
            {Q1_REPORT_NUMBERS_CONFIRMED ? (
              <p className="hero-rise mt-6 max-w-2xl leading-relaxed [animation-delay:160ms]">
                Between April and June 2026,{" "}
                <strong className="font-semibold">99 companies</strong> opened
                or grew{" "}
                <strong className="font-semibold">110 GCC centres</strong>{" "}
                across{" "}
                <strong className="font-semibold">27 Indian cities</strong>.
                This report maps each one to the corridor it landed in and
                reads what the quarter changed for the leaders already
                operating here.
              </p>
            ) : (
              <p className="hero-rise mt-6 max-w-2xl leading-relaxed [animation-delay:160ms]">
                Between April and June 2026, we tracked every company that
                opened or grew a GCC centre in India. This report maps each
                one to the corridor it landed in and reads what the quarter
                changed for the leaders already operating here.
              </p>
            )}
            <p className="hero-rise mt-4 text-sm text-muted-foreground [animation-delay:200ms]">
              <strong className="font-semibold text-foreground">
                Publishing late July 2026.
              </strong>{" "}
              Free. Registrants receive it by email on release day.
            </p>
            <Button
              onClick={goToForm}
              className="hero-rise group mt-7 w-full font-semibold [animation-delay:240ms] sm:w-auto lg:hidden"
            >
              Register for the report
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                aria-hidden
              />
            </Button>

            {Q1_REPORT_NUMBERS_CONFIRMED && (
            <div className="hero-rise mt-8 rounded-lg border border-t-4 border-t-navy bg-background shadow-sm [animation-delay:240ms]">
              <dl className="grid gap-5 p-6 sm:grid-cols-3 sm:gap-0 md:p-7">
                {NUMBERS.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={
                      index === 0
                        ? ""
                        : "border-t pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0"
                    }
                  >
                    <dd
                      className={`text-4xl font-bold tabular-nums tracking-tight ${
                        stat.highlight ? "text-accent" : "text-navy"
                      }`}
                    >
                      {stat.value}
                    </dd>
                    <dt className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
              <p className="border-t px-6 py-3 text-xs text-muted-foreground md:px-7">
                Source: Bamboo Reports platform, July 2026.
              </p>
            </div>
            )}

            <p className="mt-14 flex items-center gap-3 text-sm font-semibold text-muted-foreground">
              <span className="h-px w-8 bg-accent" aria-hidden />
              In this edition
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight md:text-3xl">
              Three findings, and the data behind them
            </h2>
            <div className="mt-6 grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
              <img
                src="/gcc/india-gcc-report-cover-q1-fy27.webp"
                alt="Report cover: India GCC Quarterly Report, Q1 2026, April to June, showing every centre event of the quarter on the India map"
                width={640}
                height={905}
                loading="lazy"
                className="w-44 justify-self-center rounded-md shadow-xl shadow-navy/25 sm:w-52 sm:justify-self-start md:w-60 lg:w-72"
              />
              <ol className="border-t-2 border-navy">
                {FINDINGS.map((finding, index) => (
                  <li key={finding.lead} className="flex gap-5 border-b py-4">
                    <span className="min-w-[1.875rem] pt-0.5 text-sm text-muted-foreground">
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

            <p className="mt-5 max-w-2xl text-sm leading-loose text-muted-foreground">
              <strong className="font-semibold text-foreground">
                Also inside:
              </strong>{" "}
              every centre mapped with Bengaluru and Hyderabad at
              micro-cluster level, the announced-centre pipeline with expected
              go-live windows, a BFSI sector focus, and predictions for next
              quarter that we score openly in the next edition. Full
              methodology included.
            </p>
          </section>

          <aside
            ref={formAsideRef}
            id="register"
            className="scroll-mt-24 self-start lg:sticky lg:top-6"
          >
            <div className="hero-rise rounded-lg border border-t-4 border-t-primary bg-background p-4 shadow-lg [animation-delay:160ms] sm:p-6">
              <h2 className="text-2xl font-bold leading-tight tracking-tight">
                Get the report on release day
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Free. Registrants receive the Q1 2026 edition by email the day
                it publishes.
              </p>
              <div className="mt-4 overflow-hidden rounded-md border">
                <JotFormEmbed
                  formId={REPORT_FORM_ID}
                  title="BR - Q1 2027 (Registration)"
                  height="500px"
                />
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                One report per quarter. Unsubscribe any time.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <section className="bg-muted px-4 py-10 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
              <span className="h-px w-8 bg-accent" aria-hidden />
              About this research
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight md:text-3xl">
              Counted from the ground up, not estimated from the top down
            </h2>
            <p className="mt-3 text-sm leading-loose text-muted-foreground md:text-[15px]">
              Research NXT has worked on India&apos;s GCC ecosystem since 2018.
              The report is built on{" "}
              <a
                href="https://bambooreports.com"
                className="text-primary hover:underline"
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
            {VISIBLE_METHOD_STATS.map((stat) => (
              <div
                key={stat.label}
                className="min-w-[40%] flex-1 border-t-2 border-navy py-3 pr-3"
              >
                <dd className="text-2xl font-bold text-navy">{stat.value}</dd>
                <dt className="mt-0.5 text-xs leading-snug text-muted-foreground">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold leading-snug tracking-tight md:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-5">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                open={faq.open}
                className="group border-t py-3 last:border-b"
              >
                <summary className="cursor-pointer list-none text-base font-semibold transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                  <span className="mr-3 inline-block text-muted-foreground transition-transform group-open:rotate-90 motion-reduce:transition-none">
                    ›
                  </span>
                  {faq.question}
                </summary>
                <p className="max-w-2xl pt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 text-xs text-muted-foreground">
          <span>&copy; 2026 Research NXT &middot; Pune, India</span>
          <span>
            Powered by{" "}
            <a
              href="https://bambooreports.com"
              className="text-primary hover:underline"
            >
              Bamboo Reports
            </a>{" "}
            Intelligence &middot;{" "}
            <a
              href="https://bambooreports.com/privacy"
              className="text-primary hover:underline"
            >
              Privacy policy
            </a>
          </span>
        </div>
      </footer>

      {pastHero && !formInView && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 pt-3 backdrop-blur pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
          <Button onClick={goToForm} className="group w-full font-semibold">
            Register for the report
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              aria-hidden
            />
          </Button>
        </div>
      )}

      <Dialog open={exitIntentOpen} onOpenChange={setExitIntentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold leading-tight">
              Before you go, reserve your copy.
            </DialogTitle>
            <DialogDescription className="pt-2 leading-relaxed">
              {Q1_REPORT_NUMBERS_CONFIRMED
                ? "Registration takes under a minute and reserves your copy of the Q1 2026 India GCC Quarterly Report: 110 centre events across 27 cities, mapped to corridor level, publishing late July 2026."
                : "Registration takes under a minute and reserves your copy of the Q1 2026 India GCC Quarterly Report: every centre event of the quarter, mapped to corridor level, publishing late July 2026."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button onClick={goToForm} className="group w-full font-semibold sm:w-auto">
              Register for the report
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                aria-hidden
              />
            </Button>
            <Button variant="ghost" onClick={() => setExitIntentOpen(false)}>
              Not now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IndiaGccReportQ1FY27;
