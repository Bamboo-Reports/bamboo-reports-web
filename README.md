# Bamboo Reports Web

Marketing and content site for **Bamboo Reports** — a GCC (Global Capability Centers) intelligence platform focused on India GCC market data, GTM intelligence, and strategic insights.

## Tech stack

- **Next.js 16** (App Router, static export) + **React 19** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (styling and component primitives)
- **Netlify** (static hosting + `_redirects`)

## Getting started

### Prerequisites

- Node.js 20.9+
- npm 9+

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd bamboo-reports-web

# Install dependencies
npm install
```

No environment variables are needed.

### Run locally

```bash
# Next.js dev server
npm run dev

# Next.js behind Netlify Dev (applies _redirects and netlify.toml headers)
npm run dev:netlify
```

The dev server runs on `http://localhost:8080`.

## Available scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run dev:netlify` | Next.js behind Netlify Dev (redirects + headers) |
| `npm run build` | Static export to `out/` |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check with `tsc` |

## Project structure

```
src/
├── app/                 # Routes: one page.tsx per URL, exporting its metadata
│   ├── layout.tsx       # Root layout (font, analytics, enquiry dialog)
│   └── not-found.tsx    # 404 page
├── index.css            # Global styles + design tokens
├── assets/              # Images bundled by Next.js (logos, hero, report covers)
├── components/          # Shared components (CTA buttons, Jotform embed, SEO schema)
│   ├── layout/          # Header, Footer, page shells
│   ├── home/            # Home page sections
│   ├── platform/        # Platform page sections + shared copy
│   └── ui/              # Button, Container, Section, SectionHeading (shared with researchnxt.com), shadcn dialog
├── config/              # nav.ts: navbar and footer links
├── contexts/            # React contexts (InquiryForm)
├── lib/                 # Utilities and data (seo.ts holds every page's metadata)
└── views/               # Page components rendered by src/app routes
    └── reports/         # Report detail pages

public/                  # Static assets served as-is (favicon, robots, sitemap, images, _redirects)
```

> This project uses **npm** — `package-lock.json` is the only committed lockfile.

## Routes

### Public

- `/` — Home
- `/about` — About us
- `/platform` — Platform
- `/gcc-prospect-data` — GCC Prospect Data
- `/account-market-intelligence` — Account and Market Intelligence
- `/gcc-abm` — GCC ABM
- `/success-stories` — Success Stories
- `/map-your-gcc-opportunity` — Map your GCC opportunity
- `/resources`, `/reports` — Resources and reports index
- `/reports/india-gcc-report-q2-2026` — Q2 2026 India GCC report
- `/thank-you`, `/privacy-policy`, `/terms-conditions` — legal/transactional

Legacy paths (`/v2`, `/reads`, old Q1 report URLs, misspelled opportunity URL) redirect to their current pages via `public/_redirects`.

### Unmatched paths

Any path not listed above is served the exported `404.html` with a 404 status.

## Design system

The navbar, footer and shared primitives (`Button`, `Container`, `Section`, `SectionHeading`) follow researchnxt.com, the parent site, so the two read as one family. Bamboo keeps its own brand colours: where researchnxt.com uses `accent` (blue) and `signal` (orange), this site uses `primary` and `accent`. Neutral `ink`, `line` and `surface` tokens and the fluid type scale (`text-display`, `text-headline`, `text-title` with `.font-display`) match the parent site exactly.

## Deployment

The site deploys to **Netlify**. The `netlify.toml` at the repo root configures:
- Build command: `npm run build`
- Publish directory: `out` (Next.js static export, so every page is prerendered HTML)
- `X-Robots-Tag` header for noindex pages

The site needs no environment variables.

## Notes

- This project was scaffolded from a Vite + React + shadcn/ui template and migrated to Next.js.
- Page components in `src/views` are client components (`"use client"`); they are still prerendered to HTML at build time.
