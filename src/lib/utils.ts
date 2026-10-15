import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge only knows Tailwind's default scale, so the custom type
// roles (text-display, text-headline, ...) would read as text colours and be
// dropped when a colour like text-ink follows. Registering them as font sizes
// keeps size and colour from competing.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "display-sm", "headline", "title", "figure-sm", "figure", "figure-lg"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
