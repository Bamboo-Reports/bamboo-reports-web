import PlatformShell from "@/components/platform/PlatformShell";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { HERO_DESCRIPTION, HERO_HEADLINE, PLATFORM_SEO } from "@/components/platform/content";
import { ArrowDown, ArrowRight } from "lucide-react";

/**
 * The hero: a light, product-forward opening. Copy centred over a faint
 * blueprint grid, then the complete product shown bare below it. The
 * page's thesis is "the market, down to the center", so the copy states
 * the promise and the product shot is the proof.
 */
const Platform = () => {
  useSEO(PLATFORM_SEO);

  return (
    <PlatformShell>
      <section className="platform-hero relative isolate overflow-hidden px-4 pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="hero-rise platform-eyebrow justify-center" style={{ animationDelay: "20ms" }}>
              India GCC intelligence
            </p>
            <h1
              className="hero-rise mt-6 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "40ms" }}
            >
              {HERO_HEADLINE.lead}
              <span className="platform-hero-accent block">
                {HERO_HEADLINE.trail}
              </span>
            </h1>

            <p
              className="hero-rise mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
              style={{ animationDelay: "80ms" }}
            >
              {HERO_DESCRIPTION}
            </p>

            <div
              className="hero-rise mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
              style={{ animationDelay: "120ms" }}
            >
              <Button asChild size="lg" className="platform-primary-cta w-full px-8 text-base font-semibold sm:w-auto">
                <GoogleCalendarSchedulingButton>
                  See Bamboo Reports in action
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </GoogleCalendarSchedulingButton>
              </Button>
              <a
                href="#sequence"
                className="group inline-flex min-h-11 items-center justify-center gap-2 px-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Explore the product
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" aria-hidden />
              </a>
            </div>
        </div>
      </section>
    </PlatformShell>
  );
};

export default Platform;
