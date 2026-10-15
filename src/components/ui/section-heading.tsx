import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  /** Use `h1` on hero sections, `h2` (default) for in-page bands. */
  as?: "h1" | "h2" | "h3";
  /** Sizes the title independently of its heading level. */
  size?: keyof typeof titleSizes;
  className?: string;
};

const titleSizes = {
  display: "text-display font-display",
  "display-sm": "text-display-sm font-display",
  headline: "text-headline font-display-soft",
  title: "text-title font-display-soft",
} as const;

const ledeClass = (align: "left" | "center") =>
  cn("max-w-[64ch] text-lg leading-relaxed text-ink-soft", align === "center" && "mx-auto");

/**
 * Section opener shared with researchnxt.com. The eyebrow is the family's
 * brand device: an orange tick, the label in sentence case, and a dotted
 * rule running out to the edge. Not a tracked all-caps kicker.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  size,
  className,
}: SectionHeadingProps) {
  const resolvedSize = size ?? (Tag === "h1" ? "display" : "headline");

  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow ? (
        <p className="flex items-center gap-3 text-sm font-semibold text-primary">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-[1px] bg-accent" />
          {eyebrow}
          <span aria-hidden="true" className="rule-ticks h-px min-w-8 flex-1" />
        </p>
      ) : null}

      <Tag className={cn(titleSizes[resolvedSize], "text-ink")}>{title}</Tag>

      {lede ? (
        // A string lede gets its own <p>; markup (often a <p> already) gets a
        // <div> so paragraphs never nest.
        typeof lede === "string" ? (
          <p className={ledeClass(align)}>{lede}</p>
        ) : (
          <div className={ledeClass(align)}>{lede}</div>
        )
      ) : null}
    </div>
  );
}
