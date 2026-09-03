import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/bamboo-logo.svg";
import { CalSchedulingButton } from "@/components/CalSchedulingButton";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import finalReportPdf from "../../../final-report.pdf";
import q2ReportCover from "../../../q2-report-cover.png";

const IndiaGccReportQ22026ThankYou = () => {
  useSEO({
    title: "You're all set | Bamboo Reports",
    description:
      "The published Q2 2026 India GCC Quarterly Report is ready to download.",
    canonicalUrl:
      "https://bambooreports.com/reports/india-gcc-report-q2-2026/thank-you",
    robots: "noindex, follow",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-1" aria-hidden>
        <div className="w-2/3 bg-primary" />
        <div className="w-1/3 bg-accent" />
      </div>

      <header className="border-b px-4">
        <div className="mx-auto flex max-w-7xl items-center py-4">
          <Link to="/" aria-label="Bamboo Reports home">
            <img
              src={logo}
              alt="Bamboo Reports"
              width={777}
              height={336}
              className="h-10 w-auto md:h-12"
            />
          </Link>
        </div>
      </header>

      <main className="px-4 py-12 md:py-20">
        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:grid-rows-[auto_1fr] md:gap-x-16 md:gap-y-0">
          <section className="md:col-start-1 md:row-start-1">
            <p className="hero-rise flex items-center gap-2.5 text-sm font-semibold text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-primary" aria-hidden />
              Report published
            </p>
            <h1 className="hero-rise mt-4 text-balance text-4xl font-bold leading-tight [animation-delay:80ms] md:text-5xl">
              Your report is{" "}
              <span className="text-primary">ready to download.</span>
            </h1>
            <p className="hero-rise mt-5 max-w-2xl leading-relaxed text-muted-foreground [animation-delay:160ms]">
              Download the Q2 2026 India GCC Quarterly Report below.
            </p>
          </section>

          <img
            src={q2ReportCover}
            alt="Report cover: India GCC Quarterly Report, Q2 2026, April to June"
            width={1655}
            height={2340}
            className="hero-rise w-44 justify-self-center rounded-md shadow-xl shadow-navy/25 [animation-delay:160ms] sm:w-52 md:col-start-2 md:row-start-1 md:row-span-2 md:w-64 md:self-center"
          />

          <section className="md:col-start-1 md:row-start-2">
            <div className="hero-rise flex flex-col gap-3 [animation-delay:200ms] sm:flex-row md:mt-8">
              <Button asChild className="group font-semibold">
                <a href={finalReportPdf} download="india-gcc-quarterly-report-q2-2026.pdf">
                  Download the report
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    aria-hidden
                  />
                </a>
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
            <p className="hero-rise mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground [animation-delay:240ms]">
              Want the data behind the report, live and in full?{" "}
              <CalSchedulingButton className="font-semibold text-primary hover:underline">
                Book a walkthrough with our team
              </CalSchedulingButton>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 text-xs text-muted-foreground">
          <span>&copy; 2026 Bamboo Reports - A Research NXT Product &middot; Pune, India</span>
          <span>
            Powered by{" "}
            <a
              href="https://bambooreports.com"
              className="text-primary hover:underline"
            >
              Bamboo Reports
            </a>{" "}
            GCC Intelligence &middot;{" "}
            <a
              href="https://bambooreports.com/privacy-policy"
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

export default IndiaGccReportQ22026ThankYou;
