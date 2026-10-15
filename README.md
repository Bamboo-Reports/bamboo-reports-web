# Bamboo Reports Web

Marketing and content site for **Bamboo Reports** — a GCC (Global Capability Centers) intelligence platform focused on India GCC market data, GTM intelligence, and strategic insights.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** + **shadcn/ui** (styling and component primitives)
- **React Router** v6 (client-side routing)
- **Netlify** (hosting + an edge function for per-route metadata)

## Getting started

### Prerequisites

- Node.js 18+
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
# Vite dev server (Vite-only, fastest for UI work)
npm run dev

# Vite behind Netlify Dev (runs the page-meta edge function and _redirects)
npm run dev:netlify
```

The dev server runs on `http://localhost:8080` (or whatever Vite picks).

## Available scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run dev:netlify` | Vite behind Netlify Dev (edge function + redirects) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview a production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── App.tsx              # Routes
├── main.tsx             # Entry point
├── index.css            # Global styles + design tokens
├── assets/              # Images bundled by Vite (logos, hero, report covers)
├── components/          # Shared components (CTA buttons, Jotform embed, SEO schema)
│   ├── layout/          # Header, Footer, page shells
│   ├── home/            # Home page sections
│   ├── platform/        # Platform page sections + shared copy
│   └── ui/              # shadcn/ui primitives
├── contexts/            # React contexts (InquiryForm)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and data
└── pages/               # Route components
    ├── events/          # Event landing pages
    └── reports/         # Report detail pages

public/                  # Static assets served as-is (favicon, robots, sitemap, images)

netlify/
└── edge-functions/      # page-meta: per-route metadata + real 404s
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
- `/events/agentic-supply-chain-control-tower` (+ `/thank-you`) — Event page
- `/thank-you`, `/privacy-policy`, `/terms-conditions` — legal/transactional

Legacy paths (`/v2`, `/reads`, old Q1 report URLs, misspelled opportunity URL) redirect to their current pages.

### Unmatched paths

Any path not listed above falls through to the `NotFound` (404) page.

## Deployment

The site deploys to **Netlify**. The `netlify.toml` at the repo root configures:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback redirect (`/* → /index.html`)
- Edge function (`netlify/edge-functions/page-meta.js`) on every path

The site needs no environment variables.

## Notes

- This project was scaffolded from a Vite + React + shadcn/ui template and has since been simplified significantly.
