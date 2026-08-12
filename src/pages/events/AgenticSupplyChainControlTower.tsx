import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  ListChecks,
  MapPin,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import JotFormEmbed from "@/components/JotFormEmbed";
import { useSEO } from "@/hooks/useSEO";

/** Thoughtworks coral. The brand tint is too light for body-size text on white,
 *  so rules and icons use it directly while type uses a deeper shade of the hue. */
const CORAL = "#f2617a";
const CORAL_INK = "text-[hsl(348_68%_40%)]";
const CORAL_DEEP = "hsl(348 68% 40%)";

const eventDetails = [
  { icon: CalendarDays, label: "Date", value: "Wednesday", note: "09 September 2026" },
  { icon: Clock, label: "Time", value: "8 AM to 10 AM", note: "Breakfast included" },
  { icon: MapPin, label: "Venue", value: "Taj, MG Road", note: "Bengaluru" },
];

const agenda = [
  {
    title: "Welcome and breakfast networking",
    duration: "20 min",
    detail: null,
  },
  {
    title: "Retail supply chains under pressure",
    duration: "10 min",
    detail: "Framing the business challenge and the need for faster, connected decisions.",
  },
  {
    title: "Agentic Supply Chain Control Tower",
    duration: "15 min",
    detail: "Introduction to Sense, Simulate and Solve.",
  },
  {
    title: "Black Friday working session",
    duration: "35 min",
    detail: "Facilitated scenario, response options and group discussion.",
  },
  {
    title: "The GCC opportunity",
    duration: "15 min",
    detail: "How India GCCs can contribute to building and scaling the capability.",
  },
  {
    title: "Closing discussion and next steps",
    duration: "10 min",
    detail: null,
  },
];

const keyTopics = [
  "Current complexity across retail supply chains",
  "Moving from supply-chain visibility to proactive decision-making",
  "Using internal and external signals to identify risks and opportunities",
  "Sense, Simulate and Solve as a model for coordinated action",
  "Managing trade-offs across revenue, inventory, fulfilment cost and customer experience",
  "Human oversight and governance in agent-supported decisions",
  "The role of India GCCs in building and scaling these capabilities globally",
];

const HostLockup = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span className="text-xs font-semibold text-muted-foreground">Hosted by</span>
    <a
      href="https://www.thoughtworks.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Thoughtworks"
      className="-my-2.5 inline-flex items-center py-2.5 transition-opacity duration-micro ease-smooth hover:opacity-70"
    >
      <img src="/logos/thoughtworks-logo.svg" alt="Thoughtworks" className="h-6 w-auto md:h-7" />
    </a>
  </div>
);

const AgenticSupplyChainControlTower = () => {
  useSEO({
    title: "Agentic Supply Chain Control Tower · Retail Roundtable by Thoughtworks",
    description:
      "A retail roundtable hosted by Thoughtworks. A breakfast working session on moving from supply-chain signals to coordinated action: Sense. Simulate. Solve. Taj, MG Road, Bengaluru, 09 September 2026.",
    keywords:
      "agentic supply chain, supply chain control tower, retail roundtable India, Thoughtworks roundtable Bengaluru, GCC supply chain, Black Friday scenario planning",
  });

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <main>
        {/* Hero: what it is, when it is, and the form, all in one screen */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-14">
            <div>
              <HostLockup />
              <p className="mt-4 text-sm font-semibold text-muted-foreground">
                An executive roundtable for retail supply chain and GCC leaders
              </p>
              <h1 className="mt-6 max-w-[16ch] text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]">
                Agentic supply chain control tower
              </h1>

              <div
                className="mt-8 border-t-2 pt-6"
                style={{ borderTopColor: CORAL }}
              >
                <p className="text-base font-medium text-muted-foreground">
                  From supply-chain signals to coordinated action
                </p>
                <p
                  className={`mt-2 text-2xl font-bold leading-tight tracking-tight md:text-3xl ${CORAL_INK}`}
                >
                  Sense. Simulate. Solve.
                </p>
              </div>

              <p className="mt-8 max-w-[62ch] leading-relaxed text-foreground sm:text-lg">
                A closed-door breakfast roundtable bringing together a select group of retail
                GCC, supply chain and technology leaders to see the control tower in action and
                work through a real Black Friday scenario together.
              </p>

              <dl className="mt-10 grid divide-y rounded-lg border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {eventDetails.map(({ icon: Icon, label, value, note }) => (
                  <div key={label} className="p-4 sm:p-5">
                    <dt className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <Icon className="h-4 w-4" style={{ color: CORAL }} aria-hidden />
                      {label}
                    </dt>
                    <dd className="mt-2 text-base font-semibold leading-snug text-foreground">
                      {value}
                      {note && (
                        <span className="mt-1 block text-sm font-normal text-muted-foreground">
                          {note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="mt-5 inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold text-foreground transition-colors duration-micro ease-smooth hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                  >
                    <ListChecks className="h-4 w-4" style={{ color: CORAL }} aria-hidden />
                    View the agenda
                  </button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
                  <DialogHeader className="text-left">
                    <DialogTitle className="text-2xl font-bold leading-tight tracking-tight">
                      Indicative agenda
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      Session agenda for the roundtable on 09 September 2026 at Taj, MG Road,
                      Bengaluru.
                    </DialogDescription>
                  </DialogHeader>
                  <ol className="mt-2 divide-y divide-border border-t">
                    {agenda.map((item) => (
                      <li key={item.title} className="flex items-baseline justify-between gap-6 py-4">
                        <div>
                          <p className="font-semibold leading-snug text-foreground">{item.title}</p>
                          {item.detail && (
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {item.detail}
                            </p>
                          )}
                        </div>
                        <p className={`shrink-0 text-sm font-semibold ${CORAL_INK}`}>
                          {item.duration}
                        </p>
                      </li>
                    ))}
                  </ol>
                </DialogContent>
              </Dialog>
            </div>

            <aside
              id="register"
              className="scroll-mt-6 overflow-hidden rounded-xl border bg-background shadow-xl lg:sticky lg:top-6"
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: CORAL }} aria-hidden />
              <div className="p-5 sm:p-6">
                <h2 className="text-2xl font-bold leading-tight tracking-tight">
                  Register for the roundtable
                </h2>
                <div className="mt-4 border-t pt-2">
                  {/* The form grows as it narrows: 676px at 248px wide, 638px at
                      318px, 619px at 420px, 563px at 560px. These fallbacks clear
                      each case; autoHeight trims to the exact height when JotForm
                      reports it. */}
                  <JotFormEmbed
                    formId="262230503743448"
                    title="TW - RT"
                    heightClassName="h-[690px] sm:h-[600px] lg:h-[650px]"
                    autoHeight
                  />
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Key topics, as listed in the event brief */}
        <section className="border-y bg-secondary">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:py-20">
            <h2
              className="max-w-[20ch] border-t-2 pt-5 text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              style={{ borderTopColor: CORAL }}
            >
              Key topics
            </h2>
            <ul className="mt-8 divide-y divide-border border-t border-border">
              {keyTopics.map((topic) => (
                <li key={topic} className="flex items-start gap-4 py-4 md:py-5">
                  <Check
                    className="mt-1 h-5 w-5 shrink-0"
                    style={{ color: CORAL }}
                    strokeWidth={3}
                    aria-hidden
                  />
                  <span className="text-base leading-relaxed text-foreground md:text-lg">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <div className="flex flex-col gap-8 rounded-xl border bg-secondary p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Taj, MG Road, Bengaluru
                <span className={`mt-1 block ${CORAL_INK}`}>09 September 2026</span>
              </p>
              <dl className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Clock className="h-4 w-4 shrink-0" style={{ color: CORAL }} aria-hidden />
                  <dt className="sr-only">Time</dt>
                  <dd className="font-semibold text-foreground">8 AM to 10 AM</dd>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Users className="h-4 w-4 shrink-0" style={{ color: CORAL }} aria-hidden />
                  <dt className="sr-only">Includes</dt>
                  <dd className="font-semibold text-foreground">Breakfast included</dd>
                </div>
              </dl>
            </div>

            <div className="shrink-0">
              <a
                href="#register"
                className="group inline-flex h-12 w-full items-center justify-center rounded-full px-8 text-base font-semibold text-white transition-opacity duration-micro ease-smooth hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto"
                style={{ backgroundColor: CORAL_DEEP }}
              >
                <span className="sm:hidden">Register</span>
                <span className="hidden sm:inline">Register for the roundtable</span>
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform duration-micro ease-smooth group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  aria-hidden
                />
              </a>
              <p className="mt-3 text-center text-sm text-muted-foreground sm:text-right">
                Seats are limited to keep the discussion useful.
              </p>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-6 md:px-6">
          <div className="flex items-center gap-3">
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
          <Link
            to="/privacy-policy"
            className="-my-2 inline-flex items-center py-2 text-sm text-muted-foreground underline-offset-4 transition-opacity duration-micro ease-smooth hover:underline hover:opacity-80"
          >
            Privacy policy
          </Link>
        </div>
      </footer>

      {/* Phones scroll a long way past the form; keep the action reachable. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">09 September 2026</p>
            <p className="truncate text-xs text-muted-foreground">Taj, MG Road, Bengaluru</p>
          </div>
          <a
            href="#register"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition-opacity duration-micro ease-smooth hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: CORAL_DEEP }}
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgenticSupplyChainControlTower;
