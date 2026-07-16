import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { coverGradient } from "@/lib/coverGradients";

type ResourceItem = {
  to: string;
  label: string;
  title: string;
  summary: string;
  gradientIndex: number;
};

/**
 * Gradient cover art shared by every resource tile: pastel base, drifting
 * light orbs, grain, a shine sweep on hover, and a corner arrow cue.
 * `children` renders inside the text block, under the label and title.
 */
const CoverArt = ({
  label,
  title,
  gradientIndex,
  titleClassName,
  children,
}: {
  label: string;
  title: string;
  gradientIndex: number;
  titleClassName: string;
  children?: React.ReactNode;
}) => {
  const gradient = coverGradient(gradientIndex);
  return (
    <div className={`relative flex aspect-video flex-col justify-end overflow-hidden p-6 ${gradient.base}`}>
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none ${gradient.hover}`}
        aria-hidden
      />
      <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/50 blur-2xl" aria-hidden />
      <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-navy/[0.06] blur-3xl" aria-hidden />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-[150%] skew-x-[-18deg] transform-gpu bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[300%] motion-reduce:hidden"
        aria-hidden
      />
      <div className="gradient-noise pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
      <ArrowUpRight
        className="absolute right-5 top-5 h-5 w-5 -translate-x-1 translate-y-1 text-navy/50 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:transform-none"
        aria-hidden
      />
      <div className="relative">
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <h3 className={`mt-2 font-bold leading-tight text-navy ${titleClassName}`}>{title}</h3>
        {children}
      </div>
    </div>
  );
};

/**
 * Full-width editorial row for a single featured resource: gradient cover on
 * the left, summary and call to action on the right.
 */
export const FeaturedResourceRow = ({
  item,
  cta,
}: {
  item: ResourceItem;
  cta: string;
}) => (
  <Link
    to={item.to}
    className="group grid overflow-hidden rounded-md border bg-background transition-shadow duration-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:grid-cols-2"
  >
    <CoverArt
      label={item.label}
      title={item.title}
      gradientIndex={item.gradientIndex}
      titleClassName="text-2xl md:text-3xl"
    />
    <div className="flex flex-col justify-center gap-5 p-6 md:p-10">
      <p className="leading-relaxed text-muted-foreground md:text-lg">{item.summary}</p>
      <span className="inline-flex items-center gap-2 font-semibold text-primary">
        {cta}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          aria-hidden
        />
      </span>
    </div>
  </Link>
);

/**
 * Compact grid card: label and title on the gradient cover, summary revealed
 * on hover with the ease and motion-blur treatment.
 */
export const ResourceCard = ({ item }: { item: ResourceItem }) => (
  <Link
    to={item.to}
    className="group block overflow-hidden rounded-md border bg-background transition-shadow duration-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  >
    <CoverArt
      label={item.label}
      title={item.title}
      gradientIndex={item.gradientIndex}
      titleClassName="text-lg"
    >
      {/* Touch has no hover: the summary is always visible below md and
          becomes the hover reveal on pointer devices. */}
      <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
        <div className="overflow-hidden">
          <p className="pt-2 text-sm leading-relaxed text-muted-foreground transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] md:opacity-0 md:blur-[5px] md:group-hover:opacity-100 md:group-hover:blur-none md:group-focus-visible:opacity-100 md:group-focus-visible:blur-none motion-reduce:blur-none motion-reduce:transition-none">
            {item.summary}
          </p>
        </div>
      </div>
    </CoverArt>
  </Link>
);

export type { ResourceItem };
