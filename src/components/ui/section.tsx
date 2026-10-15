import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  surface?: "default" | "bright" | "subtle" | "muted";
  /** Vertical rhythm. Spacing varies band to band so the page has a pulse. */
  spacing?: "tight" | "default" | "loose" | "none";
  /** Hairline above the section: how bands separate without shadows. */
  bordered?: boolean;
};

const surfaces = {
  default: "bg-background text-ink",
  bright: "bg-surface-bright text-ink",
  subtle: "bg-surface-subtle text-ink",
  muted: "bg-surface-muted text-ink",
} as const;

const spacings = {
  none: "",
  tight: "py-12 sm:py-16",
  default: "py-20 sm:py-28",
  loose: "py-24 sm:py-36",
} as const;

/** Vertical page band shared with researchnxt.com. */
export function Section({
  surface = "default",
  spacing = "default",
  bordered = false,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(surfaces[surface], spacings[spacing], bordered && "border-t border-line", className)}
      {...props}
    />
  );
}
