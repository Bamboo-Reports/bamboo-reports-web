import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CalSchedulingButton } from "@/components/CalSchedulingButton";
import { Button } from "@/components/ui/button";
import heroV3 from "../../hero-v3.png";

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
  <section className="relative isolate overflow-hidden bg-neutral-900 text-white">
    <img
      src={heroV3}
      alt=""
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[74%_50%] sm:object-[center_58%]"
    />
    <div
      className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/20 via-[45%] to-black/75 sm:hidden"
      aria-hidden
    />
    <div
      className="pointer-events-none absolute inset-0 z-0 hidden bg-gradient-to-r from-black/60 via-black/30 via-[42%] to-transparent to-[78%] sm:block"
      aria-hidden
    />
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden h-[46%] bg-gradient-to-t from-black/65 via-black/25 to-transparent sm:block"
      aria-hidden
    />
    <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 sm:px-4 sm:pt-24 lg:pt-32">
      <div className="max-w-[42rem] text-left">
        <h1
          className="hero-rise text-balance text-[2rem] font-extrabold leading-[1.06] tracking-[-0.025em] text-white sm:text-[clamp(2.125rem,4.5vw,3.75rem)] sm:leading-[1.02] sm:tracking-[-0.03em]"
          style={{ animationDelay: "0ms" }}
        >
          Your trusted GTM partner for{" "}
          <span className="block text-[hsl(33_100%_62%)]">Global Capability Centres</span>
        </h1>

        <p
          className="hero-rise mt-5 max-w-[36ch] text-pretty text-[15px] leading-[1.6] text-white/90 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-relaxed"
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
          className="hero-rise mt-6 hidden items-center justify-start sm:mt-7 sm:flex"
          style={{ animationDelay: "220ms" }}
        >
          <Button
            asChild
            size="lg"
            className="w-full bg-accent px-7 text-base font-semibold text-white hover:bg-accent-deep sm:w-auto"
          >
            <CalSchedulingButton>
              Get a demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </CalSchedulingButton>
          </Button>
        </div>
      </div>

      <nav
        className="hero-rise mt-8 border-y border-white/30 sm:mt-10 sm:border-b-0 lg:mt-12"
        aria-label="Bamboo Reports capabilities"
        style={{ animationDelay: "340ms" }}
      >
        <div className="divide-y divide-white/30 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
          {CAPABILITIES.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group flex min-h-20 items-center justify-between gap-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:min-h-28 md:px-6 md:py-5 md:first:pl-0 md:last:pr-0"
            >
              <span>
                <span className="block text-base font-bold text-white transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm leading-snug text-white/75">
                  {item.description}
                </span>
              </span>
              <ArrowRight
                className="h-5 w-5 flex-none text-white/75 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent group-focus-visible:text-accent motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </nav>

      {/* Phones: the CTA closes the section after the capability links. */}
      <div
        className="hero-rise pb-10 pt-6 sm:hidden"
        style={{ animationDelay: "440ms" }}
      >
        <Button
          asChild
          size="lg"
          className="w-full bg-accent px-7 text-base font-semibold text-white hover:bg-accent-deep"
        >
          <CalSchedulingButton>
            Get a demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </CalSchedulingButton>
        </Button>
      </div>
    </div>
  </section>
);

export default HeroV2;
