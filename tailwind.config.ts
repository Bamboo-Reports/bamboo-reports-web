import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          soft: "hsl(var(--primary-soft))",
        },
        // Shared with researchnxt.com: neutral ink, hairlines and surfaces.
        // Brand colour stays Bamboo's own (primary blue, accent orange).
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          muted: "var(--ink-muted)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          bright: "var(--surface-bright)",
          subtle: "var(--surface-subtle)",
          muted: "var(--surface-muted)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          deep: "hsl(var(--accent-deep))",
        },
        navy: {
          DEFAULT: "hsl(var(--navy))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // Fluid type scale shared with researchnxt.com (ratio >= 1.25).
      fontSize: {
        display: ["clamp(2.75rem, 1.55rem + 5.3vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-sm": ["clamp(2.25rem, 1.55rem + 3.1vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        headline: ["clamp(1.75rem, 1.35rem + 1.8vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        title: ["clamp(1.25rem, 1.12rem + 0.6vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "figure-sm": ["clamp(1.875rem, 1.72rem + 0.7vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        figure: ["clamp(2.25rem, 1.98rem + 1.2vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "figure-lg": ["clamp(3rem, 2.46rem + 2.4vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      spacing: {
        gutter: "1.5rem",
        13: "3.25rem",
      },
      maxWidth: {
        page: "78rem",
      },
      zIndex: {
        dropdown: "30",
        sticky: "40",
        sheet: "60",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        'micro': '200ms',
        'modal': '250ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        // Deceleration curves only, no bounce.
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        "menu-in": {
          from: { opacity: "0", transform: "translate3d(0, -0.375rem, 0) scale(0.98)" },
          to: { opacity: "1", transform: "none" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translate3d(0, 0.9rem, 0)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "menu-in": "menu-in 180ms cubic-bezier(0.25, 1, 0.5, 1) both",
        "rise-in": "rise-in 640ms cubic-bezier(0.25, 1, 0.5, 1) both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
