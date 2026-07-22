import FadeIn from "@/components/FadeIn";
import TrustLogos from "@/components/TrustLogos";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
// SectionIntro is the site-wide section header: amber label, bold (not
// extrabold) heading, muted body. Imported rather than restyled locally
// so this page cannot drift from the rest of the site again.
import { DemoCta, SectionIntro } from "@/components/B2BMarketingPage";
import { ArrowUpRight } from "lucide-react";
import { CAPABILITIES, HERO_SHOT, PERSONAS, STAGES } from "./content";

// Stage shots that get no frame. Filters is a portrait UI panel that
// already reads as a contained surface, so a frame around it just adds
// a second edge to one it already has. The hero shot is likewise left
// bare, in PlatformHeroShot below.
const UNFRAMED_STAGES = new Set(["filters"]);

/**
 * The product shot that hands the hero off to the light body.
 *
 * `overlap` pulls it up into the hero's bottom fade so the two sections
 * interlock. Variants whose hero ends on a hard edge rather than a fade
 * pass false and let it sit in normal flow instead.
 */
export const PlatformHeroShot = ({ overlap = true }: { overlap?: boolean }) => (
  <div className={`relative z-10 px-4 ${overlap ? "-mt-44 md:-mt-56" : "pt-14 md:pt-20"}`}>
    <FadeIn className="mx-auto max-w-7xl">
      <img
        src={HERO_SHOT.src}
        alt={HERO_SHOT.alt}
        width={HERO_SHOT.width}
        height={HERO_SHOT.height}
        fetchPriority="high"
        className="platform-shot h-auto w-full"
      />
    </FadeIn>
  </div>
);

/**
 * Everything below the hero. Identical across /platform and every /v*
 * variant — only the hero above it changes, so this stays in one place.
 */
const PlatformBody = () => (
  <>
    <FadeIn>
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <TrustLogos />
        </div>
      </section>
    </FadeIn>

    {/* ---------- The working sequence ---------- */}
    <section id="sequence" className="scroll-mt-28 border-t bg-secondary/40 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionIntro
            label="How the work actually goes"
            title={
              <>
                <span className="block">Six moves from a market question</span>
                <span className="block text-primary">to a ranked target list.</span>
              </>
            }
          >
            <p>
              Every filter follows you across every view. Scope the market, drop into the
              centres behind an account, save the query for Monday. One workspace, one
              continuous thread.
            </p>
          </SectionIntro>
        </FadeIn>

        <div className="mt-14 md:mt-20">
          {STAGES.map((stage, index) => {
            // Stages alternate sides. The two columns are different widths,
            // so mirroring means swapping the grid template as well as the
            // order — `order` alone would drop the screenshot into the
            // 24rem copy column. Copy stays first in the DOM either way, so
            // the heading always precedes its screenshot for screen readers
            // and in the single-column mobile stack.
            const mirrored = index % 2 === 1;
            const framed = !UNFRAMED_STAGES.has(stage.id);
            return (
              <div
                key={stage.id}
                className={`grid gap-8 border-t py-12 md:py-16 lg:items-center lg:gap-16 ${
                  mirrored
                    ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
                    : "lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]"
                }`}
              >
                <FadeIn className={mirrored ? "lg:order-2" : ""}>
                  {/* Same amber-label idiom as SectionIntro, so a stage
                      header reads as a smaller sibling of a section header
                      rather than a different system. */}
                  <div className="flex items-baseline gap-3 text-sm font-semibold">
                    <span className="tabular-nums text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-accent">{stage.verb}</span>
                    <span className="font-normal text-muted-foreground">{stage.title}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
                    {stage.headline}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{stage.desc}</p>
                </FadeIn>

                {/* Capped by height, not width. The shots run from 2.7:1
                    (Data View) to 0.7:1 (Filters), so a shared width renders
                    the squarer ones — Saved Filters, Quick Actions — nearly
                    twice as tall as the wide ones. A shared max-height gives
                    every stage the same optical weight and lets each image
                    find its own width. Unset below md, where the column is
                    narrow enough that width already binds first. */}
                <FadeIn delay={80} className={mirrored ? "lg:order-1" : ""}>
                  {framed ? (
                    // w-fit so the frame hugs the shot rather than
                    // stretching to the column and leaving a wide matte
                    // beside the squarer images.
                    <div className="platform-frame mx-auto w-fit">
                      <img
                        src={stage.src}
                        alt={stage.alt}
                        width={stage.width}
                        height={stage.height}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-auto max-w-full md:max-h-[24rem] lg:max-h-[26rem]"
                      />
                    </div>
                  ) : (
                    <img
                      src={stage.src}
                      alt={stage.alt}
                      width={stage.width}
                      height={stage.height}
                      loading="lazy"
                      decoding="async"
                      className="platform-shot mx-auto h-auto w-auto max-w-full md:max-h-[24rem] lg:max-h-[26rem]"
                    />
                  )}
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ---------- Capabilities ---------- */}
    <FadeIn>
      <section className="border-t px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label="Under the hood"
            title={
              <>
                <span className="block">A workspace your team lives in.</span>
                <span className="block text-primary">Not a report they forget.</span>
              </>
            }
          >
            <p>
              Every capability you need to find, qualify, segment and act on the India GCC
              opportunity, in one purpose-built environment.
            </p>
          </SectionIntro>

          <div className="mt-14 grid gap-x-14 md:grid-cols-2">
            {CAPABILITIES.map((capability) => (
              <div key={capability.title} className="border-t py-7">
                <h3 className="text-lg font-bold">{capability.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {capability.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>

    {/* ---------- Who it's for ---------- */}
    <FadeIn>
      <section className="border-t bg-secondary/40 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label="Who it's for"
            title={
              <>
                <span className="block">One platform.</span>
                <span className="block text-primary">
                  Every team that touches the GCC opportunity.
                </span>
              </>
            }
          >
            <p>
              From the seller building Monday's pipeline to the site head benchmarking
              against peers, Bamboo Reports puts every team on the same centre-level picture.
            </p>
          </SectionIntro>

          <div className="mt-14">
            {PERSONAS.map((persona) => (
              <GoogleCalendarSchedulingButton
                key={persona.name}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-5 border-t py-8 text-left transition-colors hover:bg-background/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-10"
                aria-label={`Get a demo: ${persona.name}`}
              >
                <span className="grid gap-2 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] sm:items-baseline sm:gap-10">
                  <span className="block text-lg font-bold">{persona.name}</span>
                  <span className="block max-w-2xl leading-relaxed text-muted-foreground">
                    {persona.desc}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                  aria-hidden
                />
              </GoogleCalendarSchedulingButton>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>

    <FadeIn>
      <DemoCta title="Start operating on structured GCC intelligence." />
    </FadeIn>
  </>
);

export default PlatformBody;
