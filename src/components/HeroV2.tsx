import heroBamboo from "@/assets/hero-bamboo.png";
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
    <img
      src={heroBamboo}
      alt=""
      aria-hidden
      className="hero-image-drift pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
    />
    {/* White veil: keeps the light look and dark text readable over the
        artwork, fading into the page background at the bottom. */}
    <div
      className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/70 via-white/45 to-background"
      aria-hidden
    />

    <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 sm:px-4 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-[23rem] text-center sm:max-w-5xl">
        <h1
          className="hero-rise text-balance text-3xl font-extrabold text-navy leading-[1.04] tracking-[-0.025em] sm:text-[clamp(2.125rem,4.5vw,3.75rem)] sm:leading-[1.02] sm:tracking-[-0.03em]"
          style={{ animationDelay: "0ms" }}
        >
          Your trusted partner for{" "}
          <span className="block text-accent-deep">GCC GTM enablement</span>
        </h1>

        <p
          className="hero-rise mx-auto mt-4 max-w-[35ch] text-pretty text-sm leading-6 text-navy/80 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-relaxed"
          style={{ animationDelay: "120ms" }}
        >
          <span className="sm:block sm:whitespace-nowrap">
            Verified India GCC data, account intelligence, and analyst-led research.
          </span>{" "}
          <span className="sm:block">
            Built to help your team find the right opportunities and move with confidence.
          </span>
        </p>

        <div
          className="hero-rise mt-6 flex items-center justify-center sm:mt-7"
          style={{ animationDelay: "220ms" }}
        >
          <Button
            asChild
            size="lg"
            className="w-full bg-navy px-7 text-base font-semibold text-white hover:bg-navy/90 sm:w-auto"
          >
            <GoogleCalendarSchedulingButton>
              Get a demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </GoogleCalendarSchedulingButton>
          </Button>
        </div>
      </div>

      <nav
        className="hero-rise mt-12 border-y border-white/70 sm:mt-20 sm:border-b-0 lg:mt-28"
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
                <span className="block text-base font-bold text-navy transition-colors duration-200 group-hover:text-primary">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm leading-snug text-navy/75">
                  {item.description}
                </span>
              </span>
              <ArrowRight
                className="h-5 w-5 flex-none text-navy/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
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
