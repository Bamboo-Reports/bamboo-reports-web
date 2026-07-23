import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { Button } from "@/components/ui/button";

export const MarketingHero = ({
  title,
  description,
  showAction = true,
  pageIntro = false,
}: {
  title: ReactNode;
  description?: ReactNode;
  showAction?: boolean;
  pageIntro?: boolean;
}) => (
  <section
    className={`border-b px-4 ${
      pageIntro
        ? "bg-secondary/30 py-6 md:py-8"
        : "pb-14 pt-10 md:pb-20 md:pt-16"
    }`}
  >
    <div
      className={`mx-auto max-w-7xl ${
        pageIntro && description
          ? "grid gap-2 md:grid-cols-[minmax(12rem,0.65fr)_minmax(22rem,1fr)] md:items-center md:gap-10"
          : ""
      }`}
    >
      <h1
        className={`max-w-6xl break-words font-bold leading-tight text-balance ${
          pageIntro
            ? "text-3xl md:text-4xl"
            : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        }`}
      >
        {title}
      </h1>
      <div>
        {description && (
          <div
            className={`max-w-6xl text-base leading-relaxed text-muted-foreground md:text-lg ${
              pageIntro ? "" : "mt-6"
            }`}
          >
            {description}
          </div>
        )}
        {showAction && (
          <div className="mt-8">
            <Button asChild size="lg" className="w-full px-7 text-base font-semibold sm:w-auto">
              <GoogleCalendarSchedulingButton>
                Get a demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </GoogleCalendarSchedulingButton>
            </Button>
          </div>
        )}
      </div>
    </div>
  </section>
);

export const SectionIntro = ({
  label,
  title,
  children,
}: {
  label?: string;
  title: ReactNode;
  children?: ReactNode;
}) => (
  <div>
    {label && <p className="text-sm font-semibold text-accent">{label}</p>}
    <h2 className={`${label ? "mt-3" : ""} text-3xl font-bold leading-tight md:text-4xl`}>
      {title}
    </h2>
    {children && (
      <div className="mt-4 max-w-6xl leading-relaxed text-muted-foreground md:text-lg">
        {children}
      </div>
    )}
  </div>
);

export const DemoCta = ({
  label,
  title,
  description,
}: {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
}) => (
  <section className="border-y bg-navy px-4 py-12 text-white md:py-16">
    <div className="mx-auto grid max-w-7xl items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
      <div>
        {label && <p className="text-sm font-semibold text-accent">{label}</p>}
        <h2 className={`${label ? "mt-3" : ""} max-w-5xl text-3xl font-bold leading-tight md:text-4xl`}>
          {title}
        </h2>
        {description && (
          <div className="mt-4 max-w-5xl leading-relaxed text-white/75 md:text-lg">
            {description}
          </div>
        )}
      </div>
      <div>
        <Button
          asChild
          size="lg"
          className="w-full bg-white px-7 text-base font-semibold text-navy hover:bg-white/90 sm:w-auto"
        >
          <GoogleCalendarSchedulingButton>
            Get a demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </GoogleCalendarSchedulingButton>
        </Button>
      </div>
    </div>
  </section>
);
