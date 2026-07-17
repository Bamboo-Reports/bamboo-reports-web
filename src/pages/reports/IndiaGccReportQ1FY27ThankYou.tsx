import { useEffect } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/bamboo-logo.svg";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const IndiaGccReportQ1FY27ThankYou = () => {
  useSEO({
    title: "You are on the list | Bamboo Reports",
    description:
      "Your registration for the Q1 2026-27 India GCC report is confirmed. The report reaches your inbox the day it releases.",
    canonicalUrl:
      "https://www.bambooreports.com/reports/india-gcc-report-q1-fy27/thank-you",
  });

  // Confirmation pages have no search value; keep them out of the index.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-1" aria-hidden>
        <div className="w-2/3 bg-primary" />
        <div className="w-1/3 bg-accent" />
      </div>

      <header className="border-b px-4">
        <div className="mx-auto flex max-w-7xl items-center py-4">
          <Link to="/" aria-label="Bamboo Reports home">
            <img src={logo} alt="Bamboo Reports" className="h-9 md:h-10" />
          </Link>
        </div>
      </header>

      <main className="px-4 py-12 md:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <section>
            <p className="hero-rise flex items-center gap-2.5 text-sm font-semibold text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-primary" aria-hidden />
              Registration confirmed
            </p>
            <h1 className="hero-rise mt-4 text-balance text-4xl font-bold leading-tight [animation-delay:80ms] md:text-5xl">
              You are on <span className="text-primary">the list.</span>
            </h1>
            <p className="hero-rise mt-5 max-w-2xl leading-relaxed text-muted-foreground [animation-delay:160ms]">
              Thank you for pre-registering for the India GCC Quarterly
              Report, Q1 2026-27, April to June.
            </p>
            <p className="hero-rise mt-4 max-w-2xl leading-relaxed text-muted-foreground [animation-delay:200ms]">
              The report releases in late July. You will be among the first to
              receive it, in your inbox, on the day it goes out. Nothing more
              to do from your side.
            </p>
            <p className="hero-rise mt-6 max-w-2xl rounded-md border bg-muted p-4 text-sm leading-relaxed [animation-delay:240ms]">
              One small thing: add{" "}
              <strong className="font-semibold">
                santosh@researchnxt.com
              </strong>{" "}
              to your contacts, so the report lands in your inbox and not in a
              filter.
            </p>
            <p className="hero-rise mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground [animation-delay:280ms]">
              While you wait, the free GCC tracker shows part of what the
              report is built on.
            </p>
            <div className="hero-rise mt-4 flex flex-col gap-3 [animation-delay:280ms] sm:flex-row">
              <Button asChild className="group font-semibold">
                <Link to="/">
                  Explore the free GCC tracker
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    aria-hidden
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" className="font-semibold">
                <a
                  href="https://www.linkedin.com/company/bamboo-reports/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow us on LinkedIn
                </a>
              </Button>
            </div>
            <p className="hero-rise mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground [animation-delay:320ms]">
              Working on GCC plans right now and want the platform behind the
              report?{" "}
              <GoogleCalendarSchedulingButton className="font-semibold text-primary hover:underline">
                Book a walkthrough with our team
              </GoogleCalendarSchedulingButton>
              .
            </p>
          </section>

          <img
            src="/gcc/india-gcc-report-cover-q1-fy27.webp"
            alt="Report cover: India GCC Quarterly Report, Q1 FY 2026-27, April to June"
            width={640}
            height={905}
            loading="lazy"
            className="hero-rise w-44 justify-self-center rounded-md shadow-xl shadow-navy/25 [animation-delay:160ms] sm:w-52 md:w-60"
          />
        </div>
      </main>

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
    </div>
  );
};

export default IndiaGccReportQ1FY27ThankYou;
