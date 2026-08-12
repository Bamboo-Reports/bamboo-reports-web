import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle, Clock, MapPin } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

/** Shares the event page's Thoughtworks coral accent. */
const CORAL = "#f2617a";
const CORAL_INK = "text-[hsl(348_68%_40%)]";

const eventDetails = [
  { icon: CalendarDays, label: "Date", value: "Wednesday, 09 September 2026" },
  { icon: Clock, label: "Time", value: "8 AM to 10 AM" },
  { icon: MapPin, label: "Venue", value: "Taj, MG Road, Bengaluru" },
];

const AgenticSupplyChainControlTowerThankYou = () => {
  useSEO({
    title: "Registration received · Agentic Supply Chain Control Tower",
    description:
      "Your registration for the Agentic Supply Chain Control Tower roundtable has been received.",
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
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 items-center px-4 py-12 md:px-6">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground">Hosted by</span>
            <a
              href="https://www.thoughtworks.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Thoughtworks"
              className="-my-2.5 inline-flex items-center py-2.5 transition-opacity duration-micro ease-smooth hover:opacity-70"
            >
              <img
                src="/logos/thoughtworks-logo.svg"
                alt="Thoughtworks"
                className="h-6 w-auto"
              />
            </a>
          </div>

          <p className="mt-10 flex items-center gap-2.5 text-sm font-semibold text-muted-foreground">
            <CheckCircle className="h-5 w-5" style={{ color: CORAL }} aria-hidden />
            Registration received
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Thank you<span className={CORAL_INK}>.</span> See you at the roundtable.
          </h1>
          <p className="mt-5 max-w-[55ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            We have received your registration for the Agentic Supply Chain Control Tower
            roundtable. Our team will review your submission and share a confirmation on the
            email you provided.
          </p>

          <dl className="mt-10 divide-y divide-border rounded-lg border">
            {eventDetails.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-4">
                <Icon className="h-4 w-4 shrink-0" style={{ color: CORAL }} aria-hidden />
                <dt className="w-14 shrink-0 text-xs font-semibold text-muted-foreground">
                  {label}
                </dt>
                <dd className="font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <Link
            to="/events/agentic-supply-chain-control-tower"
            className="mt-8 inline-flex h-11 items-center rounded-full border px-6 text-sm font-semibold text-foreground transition-colors duration-micro ease-smooth hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            Back to the event page
          </Link>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-6 md:px-6">
          <p className="text-sm text-muted-foreground">Hosted by Thoughtworks</p>
          <Link
            to="/privacy-policy"
            className="-my-2 inline-flex items-center py-2 text-sm text-muted-foreground underline-offset-4 transition-opacity duration-micro ease-smooth hover:underline hover:opacity-80"
          >
            Privacy policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default AgenticSupplyChainControlTowerThankYou;
