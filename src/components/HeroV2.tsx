import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { Button } from "@/components/ui/button";

const CAPABILITIES = [
  {
    title: "GCC Prospect Data",
    description: "Verified accounts and decision-makers",
    href: "/gcc-prospect-data",
  },
  {
    title: "Account & Market Intelligence",
    description: "Research built around your market",
    href: "/account-market-intelligence",
  },
  {
    title: "GCC Focused ABM",
    description: "Campaigns shaped by GCC insight",
    href: "/gcc-abm",
  },
];

const HeroV2 = () => (
  <section className="relative isolate overflow-hidden bg-background text-foreground">
    <div
      className="hero-animated-background pointer-events-none absolute inset-0 z-0"
      aria-hidden
    />

    <div className="relative z-10 mx-auto max-w-7xl px-5 pt-10 sm:px-4 sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-[23rem] text-center sm:max-w-5xl">
        <h1
          className="hero-rise text-balance text-4xl font-extrabold leading-[1.04] tracking-[-0.025em] sm:text-[clamp(2.5rem,5.5vw,4.75rem)] sm:leading-[1.02] sm:tracking-[-0.03em]"
          style={{ animationDelay: "0ms" }}
        >
          Your trusted partner for{" "}
          <span className="block text-primary">GCC GTM enablement</span>
        </h1>

        <p
          className="hero-rise mx-auto mt-4 max-w-[35ch] text-pretty text-base leading-7 text-muted-foreground sm:mt-6 sm:max-w-2xl sm:text-xl sm:leading-relaxed"
          style={{ animationDelay: "120ms" }}
        >
          Verified India GCC data, account intelligence, and analyst-led
          research. Built to help your team find the right opportunities and
          move with confidence.
        </p>

        <div
          className="hero-rise mt-6 flex items-center justify-center sm:mt-7"
          style={{ animationDelay: "220ms" }}
        >
          <Button
            asChild
            size="lg"
            className="w-full px-7 text-base font-semibold sm:w-auto"
          >
            <GoogleCalendarSchedulingButton>
              Get a demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </GoogleCalendarSchedulingButton>
          </Button>
        </div>
      </div>

      <nav
        className="hero-rise mt-8 border-y border-white/70 sm:mt-12 sm:border-b-0 lg:mt-14"
        aria-label="Bamboo Reports capabilities"
        style={{ animationDelay: "340ms" }}
      >
        <div className="divide-y divide-white/70 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
          {CAPABILITIES.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group flex min-h-20 items-center justify-between gap-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:min-h-28 md:px-6 md:py-5 md:first:pl-0 md:last:pr-0"
            >
              <span>
                <span className="block text-base font-bold transition-colors duration-200 group-hover:text-primary">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                  {item.description}
                </span>
              </span>
              <ArrowRight
                className="h-5 w-5 flex-none text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </nav>
    </div>
  </section>
);

export default HeroV2;
