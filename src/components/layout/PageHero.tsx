import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/**
 * The opening band on pages below the homepage, shared with researchnxt.com:
 * eyebrow, headline, optional lede and controls on a light brand wash.
 * Pass `backgroundImage` (a path under public/) to set artwork behind the
 * copy with a soft fade, or `media` to place artwork beside it.
 */
const PageHero = ({
  eyebrow,
  title,
  lede,
  children,
  media,
  backgroundImage,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Buttons or other controls under the lede. */
  children?: ReactNode;
  /** Optional artwork beside the copy on desktop, below it on mobile. */
  media?: ReactNode;
  /** Optional decorative background with a soft light fade behind the copy. */
  backgroundImage?: string;
}) => (
  <Section
    spacing={backgroundImage ? "none" : "tight"}
    className={cn(
      "border-b border-line",
      backgroundImage ? "relative isolate overflow-hidden bg-surface-subtle py-8 sm:py-10" : "hero-wash",
    )}
  >
    {backgroundImage ? (
      <>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-contain object-right"
          />
        </div>
        <div aria-hidden="true" className="page-hero-background-fade pointer-events-none absolute inset-0" />
      </>
    ) : null}
    <Container>
      <div
        className={cn(
          media && "grid items-center gap-10 lg:grid-cols-2 lg:gap-12",
          backgroundImage && "relative flex items-center lg:min-h-[17rem]",
        )}
      >
        <div
          className={cn(
            "flex min-w-0 flex-col gap-8 motion-safe:animate-rise-in",
            backgroundImage && "max-w-xl lg:max-w-[48%]",
          )}
        >
          <SectionHeading as="h1" size="display-sm" eyebrow={eyebrow} title={title} lede={lede} />
          {children}
        </div>
        {media ? <div className="min-w-0">{media}</div> : null}
      </div>
    </Container>
  </Section>
);

export default PageHero;
