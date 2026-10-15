import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  /** `narrow` is for long-form reading measure; `wide` for full-bleed grids. */
  width?: "default" | "narrow" | "wide";
};

const widths = {
  default: "max-w-page",
  narrow: "max-w-3xl",
  wide: "max-w-[90rem]",
} as const;

/** Page-width wrapper shared with researchnxt.com. */
export function Container({ width = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-gutter lg:px-8", widths[width], className)} {...props} />;
}
