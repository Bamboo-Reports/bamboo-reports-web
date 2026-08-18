import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle, Clock, MapPin } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

/** Shares the event page's Thoughtworks coral accent. */
const CORAL = "#f2617a";
const CORAL_INK = "text-[hsl(348_68%_40%)]";

const eventDetails = [
  { icon: CalendarDays, label: "Date", value: "Thursday, 10 September 2026" },
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
            Thank you for registering<span className={CORAL_INK}>.</span>
          </h1>
          <p className="mt-5 max-w-[55ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            We&rsquo;re excited to have you join us at the roundtable on September 10th, 2026.
          </p>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-foreground md:text-lg">
            <strong>Please note:</strong> Your participation is subject to approval. We will
            confirm your spot via email.
          </p>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            If you have any questions in the meantime, feel free to reach out. Looking forward
            to seeing you soon!
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

          <div className="mt-10 flex items-center gap-3 border-t pt-6">
            <span className="text-xs font-semibold text-muted-foreground">Event Partner</span>
            <a
              href="https://researchnxt.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ResearchNXT"
              className="-my-2 inline-flex items-center py-2 transition-opacity duration-micro ease-smooth hover:opacity-70"
            >
              <img src="/logos/researchnxt.svg" alt="ResearchNXT" className="h-4 w-auto" />
            </a>
          </div>
        </div>
      </main>

    </div>
  );
};

export default AgenticSupplyChainControlTowerThankYou;
