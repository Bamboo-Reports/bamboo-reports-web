import { RiArrowDownLine } from "@remixicon/react";
import PlatformShell from "@/components/platform/PlatformShell";
import { CalSchedulingButton } from "@/components/CalSchedulingButton";
import { Button, TrailingArrow } from "@/components/ui/button";
import { HERO_DESCRIPTION, HERO_HEADLINE } from "@/components/platform/content";

/**
 * The hero: a light, product-forward opening. Copy centred over a faint
 * blueprint grid, then the complete product shown bare below it. The
 * page's thesis is "the market, down to the center", so the copy states
 * the promise and the product shot is the proof.
 */
const Platform = () => {
  return (
    <PlatformShell>
      <section className="platform-hero relative isolate overflow-hidden px-4 pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <p
              className="hero-rise flex items-center gap-3 text-sm font-semibold text-primary"
              style={{ animationDelay: "20ms" }}
            >
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-[1px] bg-accent" />
              India GCC intelligence
            </p>
            <h1
              className="hero-rise mt-6 max-w-4xl text-balance text-display font-display text-ink lg:text-[4.5rem]"
              style={{ animationDelay: "40ms" }}
            >
              {HERO_HEADLINE.lead}
              <span className="platform-hero-accent block">
                {HERO_HEADLINE.trail}
              </span>
            </h1>

            <p
              className="hero-rise mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl"
              style={{ animationDelay: "80ms" }}
            >
              {HERO_DESCRIPTION}
            </p>

            <div
              className="hero-rise mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
              style={{ animationDelay: "120ms" }}
            >
              <Button asChild size="lg" className="group w-full sm:w-auto">
                <CalSchedulingButton>
                  See Bamboo Reports in action
                  <TrailingArrow />
                </CalSchedulingButton>
              </Button>
              <a
                href="#sequence"
                className="group inline-flex min-h-11 items-center justify-center gap-2 px-3 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                Explore the product
                <RiArrowDownLine className="size-4 transition-transform duration-200 ease-out-quart group-hover:translate-y-1" aria-hidden />
              </a>
            </div>
        </div>
      </section>
    </PlatformShell>
  );
};

export default Platform;
