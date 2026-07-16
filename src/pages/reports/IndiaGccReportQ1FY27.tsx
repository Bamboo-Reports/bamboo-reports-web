import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import logo from "@/assets/bamboo-logo.svg";
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

const REPORT_FORM_ID = "261952514660458";

const TAKEAWAYS = [
  {
    title: "Who set up or expanded near you",
    description:
      "Every new centre and expansion of the quarter, plus the companies that have announced they are coming.",
  },
  {
    title: "Where hiring concentrated",
    description:
      "The cities and corridors where hiring landed, in which roles and at what seniority.",
  },
  {
    title: "The AI work peer centres moved into production",
    description:
      "What GCCs actually shipped with AI this quarter, backed by named case studies.",
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

  useSEO({
    title: "Q1 2026-27 India GCC Report | Bamboo Reports",
    description: "The India GCC Quarterly Report arrives this month. Register for the Q1 2026-27 edition: new centres, expansions, hiring, and the corridors where all of it landed.",
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
          <img src={logo} alt="Bamboo Reports" className="h-9 md:h-10" />
        </div>
      </header>

      <main className="border-b px-4 py-10 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <section>
            <p className="hero-rise flex items-center gap-3 text-sm font-semibold text-muted-foreground">
              <span className="h-px w-8 bg-accent" aria-hidden />
              India GCC Quarterly Report &middot; First edition
            </p>
            <h1 className="hero-rise mt-4 text-balance text-4xl font-bold leading-tight [animation-delay:80ms] md:text-5xl">
              Every GCC move, <span className="text-primary">tracked.</span>
            </h1>
            <p className="hero-rise mt-5 max-w-3xl leading-relaxed text-muted-foreground [animation-delay:160ms]">
              We follow every GCC centre in India. Each quarter, this free
              report tells you who set up or expanded near you, where the
              hiring went, and which corridors are opening next.
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
            <div className="hero-rise mt-10 grid items-center gap-8 [animation-delay:240ms] sm:grid-cols-[auto_1fr] sm:gap-10">
              <img
                src="/gcc/india-gcc-report-cover-q1-fy27.webp"
                alt="Report cover: India GCC Quarterly Report, Q1 FY 2026-27, April to June, showing every centre event of the quarter on the India map"
                width={640}
                height={905}
                loading="lazy"
                className="w-44 justify-self-center rounded-md shadow-xl shadow-navy/25 sm:w-52 sm:justify-self-start md:w-60"
              />
              <ul className="border-t">
                {TAKEAWAYS.map((takeaway) => (
                  <li
                    key={takeaway.title}
                    className="grid grid-cols-[1.5rem_1fr] gap-4 border-b py-5"
                  >
                    <Check
                      className="mt-0.5 h-5 w-5 text-primary"
                      aria-hidden
                    />
                    <span>
                      <strong className="block font-semibold">
                        {takeaway.title}
                      </strong>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {takeaway.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside
            ref={formAsideRef}
            className="scroll-mt-24 self-start lg:sticky lg:top-8"
          >
            <div className="hero-rise rounded-lg border bg-background p-4 shadow-lg [animation-delay:160ms] sm:p-6 md:p-8">
              <h2 className="text-2xl font-bold leading-tight">
                Register to get the Q1 2026-27 India GCC report.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Enter your details to reserve your copy.
              </p>
              <div className="mt-6 overflow-hidden rounded-md border">
                <JotFormEmbed
                  formId={REPORT_FORM_ID}
                  title="BR - Q1 2027 (Registration)"
                  height="780px"
                />
              </div>
            </div>
          </aside>
        </div>
      </main>

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
              Registration takes under a minute and reserves your copy of the
              Q1 2026-27 India GCC report: who set up or expanded near you,
              where the hiring went, and which corridors are opening next.
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
