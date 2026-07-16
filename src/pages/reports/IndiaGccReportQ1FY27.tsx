import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
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
    title: "Where the market is concentrating",
    description:
      "The quarter mapped city by city and corridor by corridor, from the Outer Ring Road to the Financial District, so you know where to point your GTM next.",
  },
  {
    title: "Who entered and who expanded",
    description:
      "First-time entrants and established players, read at centre level, with the work they came to build.",
  },
  {
    title: "When the buying windows open",
    description:
      "Announced centres decoded into the windows they open over the coming quarters for vendors, partners, and advisers.",
  },
];

const EXIT_INTENT_KEY = "q1fy27-report-exit-intent-shown";

const IndiaGccReportQ1FY27 = () => {
  const [exitIntentOpen, setExitIntentOpen] = useState(false);
  const formAsideRef = useRef<HTMLElement>(null);

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
    title: "Q1 FY27 India GCC Report | Bamboo Reports",
    description: "Register for the Q1 FY27 India GCC report from Bamboo Reports: a centre-level read of who entered, who expanded, and where the next buying windows are opening.",
    canonicalUrl: "https://www.bambooreports.com/reports/india-gcc-report-q1-fy27",
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="border-b px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <section>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              The India GCC build is going{" "}
              <span className="whitespace-nowrap text-primary">AI-first</span>,
              and it is concentrating.
            </h1>
            <p className="mt-5 text-xl font-semibold leading-snug">
              A centre-level read of who entered, who expanded,{" "}
              <span className="text-primary">
                and where the next buying windows are opening.
              </span>
            </p>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
              The India GCC report reads the quarter the way the market
              actually moves: one centre at a time. Where most coverage counts
              companies, we track centres as they open, expand, and hire.
            </p>
            <Button
              onClick={goToForm}
              className="group mt-7 w-full font-semibold sm:w-auto lg:hidden"
            >
              Register for the report
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                aria-hidden
              />
            </Button>
            <ul className="mt-10 border-t">
              {TAKEAWAYS.map((takeaway) => (
                <li
                  key={takeaway.title}
                  className="grid grid-cols-[1.5rem_1fr] gap-4 border-b py-5"
                >
                  <Check className="mt-0.5 h-5 w-5 text-primary" aria-hidden />
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
          </section>

          <aside
            ref={formAsideRef}
            className="scroll-mt-24 border-t pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
          >
            <h2 className="text-2xl font-bold leading-tight">
              Register to get the Q1 FY27 India GCC report.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Enter your details to reserve your copy.
            </p>
            <div className="mt-6 overflow-hidden rounded-md border bg-background">
              <JotFormEmbed
                formId={REPORT_FORM_ID}
                title="BR - Q1 2027 (Registration)"
                height="780px"
              />
            </div>
          </aside>
        </div>
      </main>

      <Dialog open={exitIntentOpen} onOpenChange={setExitIntentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold leading-tight">
              Before you go, reserve your copy.
            </DialogTitle>
            <DialogDescription className="pt-2 leading-relaxed">
              Registration takes under a minute and reserves your copy of the
              Q1 FY27 India GCC report: who entered, who expanded, and where
              the next buying windows are opening.
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
