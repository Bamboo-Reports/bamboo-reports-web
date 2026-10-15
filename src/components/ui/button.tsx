"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

// Styling shared with researchnxt.com. Press feedback (scale on :active,
// 150ms) acknowledges the click before navigation resolves.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-semibold ring-offset-background transition-[background-color,border-color,color,transform] duration-150 ease-out-quart active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-line-strong bg-transparent text-ink hover:border-ink hover:bg-surface-muted",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "border-transparent bg-transparent text-primary hover:bg-primary-soft",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4",
        lg: "h-13 px-7 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

/**
 * The arrow that trails a link or button label. One component so the travel
 * distance and easing match everywhere. Needs a `group` ancestor.
 */
const TrailingArrow = ({ className }: { className?: string }) => (
  <ArrowRight
    aria-hidden
    className={cn(
      "size-4 shrink-0 transition-[transform,color] duration-200 ease-out-quart group-hover:translate-x-1",
      className,
    )}
  />
);

export { Button, buttonVariants, TrailingArrow };
