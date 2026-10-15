import { RiBriefcase4Line, RiBuilding2Line, RiBuildingLine, RiUserSearchLine } from "@remixicon/react";
import TrustLogos from "@/components/TrustLogos";
import { DemoCta } from "@/components/layout/B2BMarketingPage";
import { OfferMatrix, type MatrixItem } from "@/components/marketing/OfferBlocks";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { HERO_SHOT, PERSONAS, STAGES } from "./content";

// One icon per persona, in PERSONAS order.
const PERSONA_ICONS = [RiBriefcase4Line, RiBuilding2Line, RiUserSearchLine, RiBuildingLine];

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
    <Section spacing="tight">
      <Container>
        <p className="mb-10 text-center text-sm font-semibold text-ink-muted">
          Used by teams building business across India&apos;s GCC market
        </p>
        <TrustLogos eyebrow="" />
      </Container>
    </Section>

    {/* ---------- The working sequence ---------- */}
    <Section id="sequence" surface="subtle" bordered className="scroll-mt-28">
      <Container>
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
                className={`platform-stage grid gap-9 py-10 first:border-t-0 first:pt-0 last:pb-0 md:py-14 lg:items-center lg:gap-20 ${
                  mirrored
                    ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
                    : "lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]"
                }`}
              >
                <div className={mirrored ? "lg:order-2" : ""}>
                  <p className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-[1px] bg-accent" />
                    {stage.verb}
                  </p>
                  <h3 className="mt-5 text-headline font-display-soft text-ink">{stage.headline}</h3>
                  <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">{stage.desc}</p>
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
      </Container>
    </Section>

    {/* ---------- Who it's for ---------- */}
    <Section>
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Who it's for"
          title={
            <>
              One dataset. <span className="text-primary lg:block">Four kinds of team.</span>
            </>
          }
          lede="Build pipeline, compare locations, find talent demand or track expansion from the same centre-level data."
        />
        <OfferMatrix
          columns={2}
          items={PERSONAS.map(
            (persona, index): MatrixItem => ({
              icon: PERSONA_ICONS[index] ?? RiBriefcase4Line,
              title: persona.name,
              desc: persona.desc,
            }),
          )}
        />
      </Container>
    </Section>

    <DemoCta title="See the platform on your own market." />
  </>
);

export default PlatformBody;
