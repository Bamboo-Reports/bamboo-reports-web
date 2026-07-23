import TrustLogos from "@/components/TrustLogos";
// SectionIntro is the site-wide section header: amber label, bold (not
// extrabold) heading, muted body. Imported rather than restyled locally
// so this page cannot drift from the rest of the site again.
import { DemoCta, SectionIntro } from "@/components/B2BMarketingPage";
import { HERO_SHOT, PERSONAS, STAGES } from "./content";

// Every stage shot is framed. The hero shot is the one exception and is
// left bare, in PlatformHeroShot below.

/**
 * The product shot that hands the hero off to the light body.
 *
 * `overlap` pulls it up into the hero's bottom fade so the two sections
 * interlock. Variants whose hero ends on a hard edge rather than a fade
 * pass false and let it sit in normal flow instead.
 */
export const PlatformHeroShot = ({ overlap = true }: { overlap?: boolean }) => (
  <div className={`relative z-10 px-3 sm:px-4 ${overlap ? "-mt-6 md:-mt-8" : "pt-14 md:pt-20"}`}>
    <div className="mx-auto max-w-6xl">
      <div className="platform-hero-shot">
        <img
          src={HERO_SHOT.src}
          srcSet={HERO_SHOT.srcSet}
          sizes={HERO_SHOT.sizes}
          alt={HERO_SHOT.alt}
          width={HERO_SHOT.width}
          height={HERO_SHOT.height}
          fetchPriority="high"
          className="block h-auto w-full"
        />
      </div>
    </div>
  </div>
);

/**
 * Everything below the hero. Identical across /platform and every /v*
 * variant. Only the hero above it changes, so this stays in one place.
 */
const PlatformBody = () => (
  <>
    <section className="px-4 pb-12 pt-12 md:pb-16 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Used by teams building business across India&apos;s GCC market
        </p>
        <TrustLogos eyebrow="" />
      </div>
    </section>

    {/* ---------- The working sequence ---------- */}
    <section
      id="sequence"
      className="platform-sequence scroll-mt-28 px-4 pb-12 pt-8 md:pb-16 md:pt-12"
    >
      <div className="mx-auto max-w-7xl">
        <div>
          {STAGES.map((stage, index) => {
            // Stages alternate sides. The two columns are different widths,
            // so mirroring means swapping the grid template as well as the
            // order. `order` alone would drop the screenshot into the
            // 24rem copy column. Copy stays first in the DOM either way, so
            // the heading always precedes its screenshot for screen readers
            // and in the single-column mobile stack.
            const mirrored = index % 2 === 1;
            return (
              <div
                key={stage.id}
                className={`platform-stage grid gap-9 py-10 first:pt-0 last:pb-0 md:py-14 lg:items-center lg:gap-20 ${
                  mirrored
                    ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
                    : "lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]"
                }`}
              >
                <div className={mirrored ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 text-sm font-semibold">
                    <span className="platform-stage-verb text-primary">{stage.verb}</span>
                  </div>
                  <h3 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight md:text-4xl">
                    {stage.headline}
                  </h3>
                  <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{stage.desc}</p>
                </div>

                {/* Height caps give screenshots with different proportions
                    comparable optical weight while allowing each image to
                    find its natural width. */}
                <div className={mirrored ? "lg:order-1" : ""}>
                  {/* w-fit so the frame hugs the shot rather than
                      stretching to the column and leaving a wide matte
                      beside the squarer images. */}
                  <div className="platform-frame mx-auto w-fit">
                    <img
                      src={stage.src}
                      srcSet={stage.srcSet}
                      sizes="(min-width: 1024px) 760px, calc(100vw - 32px)"
                      alt={stage.alt}
                      width={stage.width}
                      height={stage.height}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-auto max-w-full md:max-h-[24rem] lg:max-h-[26rem]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ---------- Who it's for ---------- */}
    <section className="platform-personas px-4 pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label="Who it's for"
            title={
              <>
                <span className="block">The same market.</span>
                <span className="block text-primary">
                  Better decisions for every team.
                </span>
              </>
            }
          >
            <p>
              Build pipeline, compare locations, find talent demand or track expansion
              from the same center-level data.
            </p>
          </SectionIntro>

          <ul className="mt-16 border-y border-border">
            {PERSONAS.map((persona) => (
              <li key={persona.name} className="border-b border-border py-8 last:border-b-0">
                <div className="grid gap-2 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] sm:items-baseline sm:gap-10">
                  <span className="block text-lg font-bold">{persona.name}</span>
                  <span className="block max-w-2xl leading-relaxed text-muted-foreground">
                    {persona.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

    <DemoCta title="Know the market. Find the account. Make the move." />
  </>
);

export default PlatformBody;
