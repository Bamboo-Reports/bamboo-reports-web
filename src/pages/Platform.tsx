import PlatformShell from "@/components/platform/PlatformShell";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { HERO_DESCRIPTION, HERO_HEADLINE, PLATFORM_SEO } from "@/components/platform/content";
import { ArrowDown, ArrowRight } from "lucide-react";

/**
 * The hero: copy set left on a deep field that dissolves into the white
 * body. Everything below it comes from PlatformShell.
 */
const Platform = () => {
  useSEO(PLATFORM_SEO);

  return (
    <PlatformShell>
      <section className="platform-hero relative isolate overflow-hidden px-4 pb-56 pt-16 md:pb-72 md:pt-24">
        <div className="platform-hero-scrim" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl">
          {/* Type scale matched to components/Hero.tsx so the two heroes
              read as the same system. The second line takes the site's
              blue-emphasis treatment (Hero, GCCProspectData,
              SuccessStories all do this), lightened for a dark ground. */}
          <h1
            className="hero-rise max-w-4xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "40ms" }}
          >
            {HERO_HEADLINE.lead}
            <span className="platform-hero-accent block">{HERO_HEADLINE.trail}</span>
          </h1>

          <p
            className="hero-rise mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg"
            style={{ animationDelay: "80ms" }}
          >
            {HERO_DESCRIPTION}
          </p>

          <div
            className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "120ms" }}
          >
            <Button asChild size="lg" className="w-full px-7 text-base font-semibold sm:w-auto">
              <GoogleCalendarSchedulingButton>
                Get a demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </GoogleCalendarSchedulingButton>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/25 bg-transparent px-7 text-base font-semibold text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <a href="#sequence">
                Explore
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PlatformShell>
  );
};

export default Platform;
