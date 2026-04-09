# Bamboo Reports Web

Marketing and content site for **Bamboo Reports** — a GCC (Global Capability Centers) intelligence platform focused on India GCC market data, GTM intelligence, and strategic insights.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** + **shadcn/ui** (styling and component primitives)
- **React Router** v6 (client-side routing)
- **Supabase** (auth + storage for user avatars)
- **TanStack Query** (server state, where used)
- **Netlify** (hosting + serverless functions)

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

# Copy the env template and fill in your values
cp .env.example .env
# Then edit .env with your Supabase + Tempmail Checker credentials
```

### Run locally

```bash
# Vite dev server (Vite-only, fastest for UI work)
npm run dev

# Vite + Netlify Functions (use this if you need /.netlify/functions/* to work)
npm run dev:netlify
```

The dev server runs on `http://localhost:8080` (or whatever Vite picks).

## Available scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run dev:netlify` | Vite + local Netlify Functions emulator |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Development-mode build (sourcemaps, no minify) |
| `npm run preview` | Preview a production build locally |
| `npm run lint` | Run ESLint |

## Environment variables

All required env vars are documented in `.env.example`. The current set:

| Variable | Required | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | yes | Supabase publishable (anon) key |
| `TEMPMAIL_CHECKER_API_KEY` | yes (server) | Disposable-email check on signup (used by Netlify Function) |
| `TEMPMAIL_CHECKER_BASE_URL` | optional | Override the tempmail checker base URL |
| `VITE_TEMPMAIL_CHECKER_API_KEY` | optional | Client-side fallback for the tempmail check |
| `VITE_TEMPMAIL_CHECKER_API_URL` | optional | Client-side fallback URL |

## Project structure

```
src/
├── App.tsx              # Routes
├── main.tsx             # Entry point
├── index.css            # Global styles + design tokens
├── components/          # Reusable components
│   └── ui/              # shadcn/ui primitives
├── contexts/            # React contexts (Auth, InquiryForm)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities, data, Supabase client
└── pages/               # Route components
    ├── articles/        # Article detail pages
    └── reports/         # Report page template

netlify/
└── functions/           # Serverless functions (currently: tempmail check)
```

## Routes

### Public

- `/` — Home
- `/pricing` — Pricing
- `/features` — Features
- `/use-cases` — Use Cases
- `/icp` — ICP
- `/insights` — Insights
- `/resources` — Resources
- `/reports` — Reports index
- `/reports/52-weeks`, `/reports/gcc-snapshot-q1`, `/reports/gcc-snapshot-q2`, `/reports/gcc-snapshot-q3`, `/reports/state-of-gccs-2026` — individual reports
- `/roundtables` — Roundtables index
- `/roundtables/h1b-shock-strategic-reset` — H1B article
- `/thank-you`, `/privacy-policy`, `/terms-conditions` — legal/transactional

### Auth

- `/signin`, `/signup`

### Protected

- `/profile` — requires authentication

### Legacy redirects

A handful of old paths (`/about-us`, `/contact-us`, `/gcc-list`, `/products/*`, `/features/*`, `/use-cases/*`) still resolve and redirect to relevant pages so old links and search results don't 404.

## Supabase

The site currently uses Supabase for:
- **Authentication** (sign-in / sign-up / password reset / profile updates)
- **`profile-images` storage bucket** (user avatars)

That's it. No application tables are queried by the running app.

## Deployment

The site deploys to **Netlify**. The `netlify.toml` at the repo root configures:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback redirect (`/* → /index.html`)
- Serverless functions directory (`netlify/functions`)

Environment variables for production are configured in **Netlify → Site settings → Environment variables**, not in this repo.

## Notes

- This project was scaffolded from a Vite + React + shadcn/ui template and has since been simplified significantly.
- Auth, profile, sign-in, and sign-up pages share a consistent visual treatment matching the marketing site (Header + Footer, primary blue accent, white background).
- Pricing is currently lead-capture only — the page renders plan cards behind a JotForm inquiry overlay and routes all CTAs through that form.
