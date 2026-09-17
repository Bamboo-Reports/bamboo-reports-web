# Next.js migration plan

Status: phases 1–5 on `feat/nextjs-migration` (draft PR #146, which replaced #143–#145). Logs in §13–17. Remaining before merge: Netlify env vars and the browser checks in §17. Written 2026-09-17 against `main` @ `a980642`.

Goal: move the Vite + React Router SPA to the Next.js App Router, keeping the
Netlify hosting, every public URL, and today's SEO output (titles, canonicals,
JSON-LD, the static `/gcc` pages and the sitemap). The UI stays the same.

Estimate: 3–5 dev days plus 1–2 days of verification.

---

## 0. Decisions this plan assumes

| # | Decision | Why |
|---|---|---|
| D1 | **Next.js 16 (App Router), React 19, Node 22** | Current stable. Next 15+ needs React 19. Next 16 needs Node ≥ 20.9, so `NODE_VERSION = "18"` has to change. |
| D2 | **Stay on Netlify** (OpenNext adapter, detected automatically) | Cloudflare, the `*.netlify.app` → domain redirect and the rate-limited function already live there. |
| D3 | **Leave both Netlify functions as they are for now** | `tracker-query.js` gets its per-IP rate limit from Netlify's `config.rateLimit`, which a Next route handler doesn't have. Porting it can come later. |
| D4 | **Keep `src/`**: routes go in `src/app/`, and `src/pages/*` stays as view components (renamed to `src/views/*`) | Every `page.tsx` becomes a thin server wrapper that exports `metadata` and renders the existing view, so JSX diffs stay small. The rename is required: Next treats a top-level `src/pages/` directory as the Pages Router. |
| D5 | **Keep Tailwind 3 and shadcn** | Tailwind 4 would be a separate change. |
| D6 | **Port the static GCC HTML generators into route handlers**, reusing `prerender-lib` | The output is byte-for-byte the same, and there's no post-build step or `dist/` patching. |
| D7 | **`skipTrailingSlashRedirect: true`** | The sitemap and canonicals mix `/gcc/` (with a slash) and `/about` (without). With Next's default, `/gcc/` would 308 to `/gcc`, which contradicts its canonical. |

Open question to settle before phase 4: see §4, "`/gcc` crawlable snapshot".

---

## 1. Tooling and config (phase 1)

| File | Action | Details |
|---|---|---|
| `package.json` | **Edit** | Add `next@16`, `react@19`, `react-dom@19`, `@types/react@19`, `@types/react-dom@19`, `eslint-config-next`, `server-only`. Remove `vite`, `@vitejs/plugin-react-swc`, `lovable-tagger`, `react-router-dom`, `eslint-plugin-react-refresh`. Scripts: `dev: next dev -p 8080`, `build: next build`, `start: next start`, `typecheck: tsc --noEmit`, `lint: eslint .`. Delete `build:dev` and `preview`, and drop the three `scripts/gcc/*` calls from `build`. |
| `vite.config.ts` | **Delete** | The `@` alias moves to tsconfig. The `gccStaticPages` dev middleware becomes a rewrite (see `next.config.ts`). |
| `next.config.ts` | **Create** | `skipTrailingSlashRedirect: true`; `redirects()` (§3); `rewrites().beforeFiles` mapping `/gcc/companies/:slug` and `/gcc/companies/:slug/` to `/gcc/companies/:slug/index.html`, because Next doesn't serve directory `index.html` from `public/`; `images: { unoptimized: true }` for now (see §5). |
| `index.html` | **Delete** | Head content moves to `src/app/layout.tsx`. |
| `src/main.tsx` | **Delete** | Replaced by the App Router. |
| `src/App.tsx` | **Delete** | Providers go to `src/app/providers.tsx`, routes become the `src/app/**` tree, and `<Navigate>` routes become config redirects. |
| `src/vite-env.d.ts` | **Delete** | Next generates `next-env.d.ts`. |
| `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | **Replace with one `tsconfig.json`** | Next's defaults (`jsx: preserve`, `plugins: [{ name: "next" }]`, `moduleResolution: bundler`, `allowJs: true`) plus `paths: { "@/*": ["./src/*"] }`. Keep `strict: false` and friends as they are. Drop `allowImportingTsExtensions`. |
| `eslint.config.js` | **Edit** | Remove `react-refresh` and add `eslint-config-next` (flat config). |
| `tailwind.config.ts` | **Edit** | `content` already covers `./src/**`. Change `fontFamily.sans` to `["var(--font-dm-sans)", "system-ui", "sans-serif"]`. |
| `postcss.config.js` | **Keep** | Works with Next unchanged. |
| `components.json` | **Edit** | Set `"rsc": true` so future `shadcn add` output includes `"use client"`. Change `css` to `src/app/globals.css`. |
| `src/index.css` | **Move** to `src/app/globals.css` | No `#root` selectors or `@import`s, so it moves as-is. |
| `netlify.toml` | **Edit** | Remove `publish = "dist"`. **Remove the `/* → /index.html 200` catch-all**, which would hijack every Next route. Keep the `staging-bambooreports.netlify.app` 301. Keep the `[functions]` block. Change `NODE_VERSION` to `"22"`. Change `[dev]` to `command = "npm run dev"`, `targetPort = 8080`, `framework = "#custom"`. |
| `public/_redirects` | **Delete** after moving its rules into `next.config.ts` (§3) | Under the Next adapter, the rules would be split between two systems. |
| `.env.example` + Netlify UI (all contexts) | **Rename** | `VITE_GCC_TRACKER_ENABLED` → `NEXT_PUBLIC_GCC_TRACKER_ENABLED`, `VITE_TRACKER_SERVER_QUERY` → `NEXT_PUBLIC_TRACKER_SERVER_QUERY`. These are inlined at build time, as they are today. |
| `.gitignore` | **Edit** | Add `.next/` and `next-env.d.ts`. `dist/` can go. |

---

## 2. App shell (phase 1)

| File | Action | Details |
|---|---|---|
| `src/app/layout.tsx` | **Create** (server) | `<html lang="en">`. DM Sans via `next/font/google` (`variable: "--font-dm-sans"`), replacing the Google Fonts `<link>`. Import `./globals.css`. GA via two `next/script` tags (`afterInteractive`): the `gtag/js?id=G-5EPYMCWP8N` loader and the inline config. Root `metadata`: `metadataBase: new URL("https://bambooreports.com")`, the default title and description, `robots`, `authors`, `icons: "/favicon.svg"`, default `openGraph` and `twitter` using `/logo.png`. Wrap `children` in `<Providers>`. |
| `src/app/providers.tsx` | **Create** (`"use client"`) | Move from `App.tsx`: the `QueryClient` (create it in `useState` so it isn't shared between requests), `QueryClientProvider`, `InquiryFormProvider`, `TooltipProvider`, `<Toaster />` and `<Sonner />`. Don't wrap `children` in `<Suspense>`: a boundary that high would push the whole page to client rendering if anything below reads search params. The boundary sits inside `InquiryFormProvider`, around the `JotFormEmbed` in the dialog. |
| `src/app/not-found.tsx` | **Create** | Renders `@/views/NotFound`, with `metadata.robots = "noindex, follow"` and no canonical. |
| `src/components/ScrollToTop.tsx` | **Delete** | The App Router scrolls to the top on navigation by default. |

---

## 3. Redirects → `next.config.ts`

These come from `App.tsx` `<Navigate>` and `public/_redirects`. Use `statusCode: 301`, not `permanent: true`, which sends 308, so the responses match today's.

| From | To |
|---|---|
| `/v2` | `/` |
| `/reads` | `/resources` |
| `/insights` | `/resources` |
| `/reports/india-gcc-report-q1-fy27` | `/reports/india-gcc-report-q2-2026` |
| `/reports/india-gcc-report-q1-fy27/thank-you` | `/reports/india-gcc-report-q2-2026` |
| `/reports/uploads/india-gcc-quarterly-report-q2-2026.pdf` | `/reports/uploads/india-gcc-quarterly-report-q2-2026-v2.pdf` |
| `/tracker` | `/gcc/` |
| `/gcc-list` | `/gcc/` |
| `/map-your-gcc-oppurtunity` | `/map-your-gcc-opportunity` |

Behaviour change: today `/tracker` renders NotFound in the SPA when the tracker flag is off, but `_redirects` already 301s it at the edge regardless, so it's effectively unconditional. Keep it unconditional.

---

## 4. Routes: one `page.tsx` per current route

Pattern for every row: `src/app/<path>/page.tsx` is a **server** component that
`export const metadata = seo({...})` (the helper from §6) and returns `<View />`.
The view is `src/pages/X.tsx` moved to `src/views/X.tsx`, with its `useSEO(...)` call
**removed** and the same arguments moved into `metadata`.

| Route | New route file | View (moved from `src/pages/`) | `"use client"` on view? | Per-view changes |
|---|---|---|---|---|
| `/` | `app/page.tsx` | `IndexV2.tsx` | **Yes** (search params, `useRef`) | Replace `useSearchParams` from `react-router-dom` with `next/navigation`. `setSearchParams(next, { replace: true })` becomes `router.replace(pathname + (qs ? "?" + qs : ""), { scroll: false })`. Wrap in `<Suspense>` in `page.tsx`. Move the three `<StructuredData>` calls to the server `page.tsx`. Canonical `https://bambooreports.com` (no slash, keep exactly). |
| `/about` | `app/about/page.tsx` | `About.tsx` (519) | **Yes** (`matchMedia` in an effect) | `Link` → `next/link`, with `to=` → `href=`. |
| `/resources` | `app/resources/page.tsx` | `Resources.tsx` | No | Cover image `.src` (§5). |
| `/reports` | `app/reports/page.tsx` | `Reports.tsx` | No | Cover image `.src`. |
| `/reports/india-gcc-report-q2-2026` | `app/reports/india-gcc-report-q2-2026/page.tsx` | `reports/IndiaGccReportQ22026.tsx` (325) | Only if it holds state; check the JotForm child | Logo and cover `.src`. The FAQ `<StructuredData>` becomes the server version. |
| `/events/agentic-supply-chain-control-tower` | `app/events/agentic-supply-chain-control-tower/page.tsx` | `events/AgenticSupplyChainControlTower.tsx` (423) | **Yes** (countdown `setInterval`) | `Link`. The event `<StructuredData>` becomes the server version. The countdown must render a stable placeholder on the server and start ticking in an effect, to avoid a hydration mismatch. `ogImage: ""` means **no** `openGraph.images` (§6). `appendSiteName: false`. |
| `…/thank-you` | `app/events/agentic-supply-chain-control-tower/thank-you/page.tsx` | `events/AgenticSupplyChainControlTowerThankYou.tsx` | No | `Link`. `noindex`, no OG image, no site-name suffix. |
| `/thank-you` | `app/thank-you/page.tsx` | `ThankYou.tsx` | No | `Link`. `noindex`. |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | `PrivacyPolicy.tsx` | No | none |
| `/terms-conditions` | `app/terms-conditions/page.tsx` | `TermsConditions.tsx` | No | none |
| `/gcc-prospect-data` | `app/gcc-prospect-data/page.tsx` | `GCCProspectData.tsx` | No | none |
| `/account-market-intelligence` | `app/account-market-intelligence/page.tsx` | `AccountMarketIntelligence.tsx` | No | none |
| `/gcc-abm` | `app/gcc-abm/page.tsx` | `GCCABM.tsx` | No | none |
| `/platform` | `app/platform/page.tsx` | `Platform.tsx` | No | none |
| `/success-stories` | `app/success-stories/page.tsx` | `SuccessStories.tsx` | No | none |
| `/map-your-gcc-opportunity` | `app/map-your-gcc-opportunity/page.tsx` | `MapYourGCCOpportunity.tsx` | **Yes** | The Jotform `jsform` script is injected in an effect. That works as-is and needs no change. |
| `/gcc` | `app/gcc/page.tsx` | `Tracker.tsx` (976) | **Yes** | See below. |
| 404 | `app/not-found.tsx` | `NotFound.tsx` | No | `Link`. |

"No" in the client column means the view has no hooks of its own once `useSEO` is removed. It can still render client children such as `Header` and `FadeIn`. If typecheck or the build complains, add `"use client"`; that's always a safe fallback.

### `/gcc` (Tracker) details

- `app/gcc/page.tsx`: call `notFound()` when `process.env.NEXT_PUBLIC_GCC_TRACKER_ENABLED !== "true"`. That replaces the `GCC_TRACKER_ENABLED ? <Tracker/> : <NotFound/>` switch.
- Tracker metadata: the title contains "Bamboo Reports", so no suffix. The description is built from `TRACKER_V2_STATS` (it's a plain import, so it works in the server file). Canonical `/gcc/`. Add the four JSON-LD schemas that `generate-tracker-page.mjs` injects today (Organization, Dataset, ItemList, BreadcrumbList) as a server-rendered `<script type="application/ld+json">`.
- `Tracker.tsx` already guards `typeof window === "undefined"` in its initial `useState`. **Hydration risk:** the server renders `EMPTY_FILTERS`, while a client with `?industry=…` would compute different initial state. Move the URL → filters read into a mount effect, or read `useSearchParams()` and wrap in `<Suspense>`. The latter is preferred because the filtered view then renders on the server too.
- `window.history.replaceState(...)` for the filter → URL sync: keep it. Next 14.1+ integrates native `history.replaceState` with `useSearchParams`.
- **`/gcc` crawlable snapshot (open decision):** today `generate-tracker-page.mjs` injects the H1, the counts, the first 100 companies and the directory and landing links into `#root`, and `createRoot` wipes them as soon as JS runs. With SSR the Tracker itself renders the H1 and counts in HTML, so most of this is solved. The first-100 list plus the directory and landing links have no visible equivalent. **Recommendation:** add a real, visible "Browse the GCC directory" section at the bottom of `/gcc`, with the links to `/gcc/directory/1..n/` and the industry and city landing pages. Drop the inline 100-company list, since the directory pages carry it. Don't render hidden SEO-only content.

---

## 5. Components (`src/components/**`)

### Router swaps (`react-router-dom` → `next/link` / `next/navigation`)

In every file below, change `import { Link } from "react-router-dom"` to `import Link from "next/link"` and rename the `to=` prop to `href=`.

| File | Notes |
|---|---|
| `AnnouncementBar.tsx` | `Link` |
| `Q1ReportSection.tsx` | `Link` |
| `HeroV2.tsx` | `Link` plus image `.src` |
| `GccStatsBand.tsx` | `Link`. Already uses `matchMedia` in an effect, so it needs `"use client"`. |
| `ResourceCards.tsx` | `Link`. `ResourceItem.to` can keep its name; only the JSX prop changes. |
| `Footer.tsx` | `Link`, `"use client"` (hooks and `useInquiryForm`), logo `.src` |
| `Header.tsx` | `Link`, `"use client"`, logo `.src` in 2 places |
| `JotFormEmbed.tsx` | `"use client"`. `const { search } = useLocation()` becomes `const sp = useSearchParams(); const search = sp.toString() ? "?" + sp.toString() : ""`. **Every parent must provide a `<Suspense>` boundary.** Otherwise `next build` fails with "useSearchParams() should be wrapped in a suspense boundary". Parents are `InquiryFormProvider` (done in phase 1) and any page that embeds a form directly: add `<Suspense>` in those `page.tsx` files. Using `useSearchParams` rather than `window.location` keeps the iframe `src` identical on server and client, so hydration stays clean. **Retest UTM, `firstName`, `lastName`, `companyName` and `email` forwarding, plus the reload after download.** |

### Needs `"use client"` (hooks, context, browser APIs or Radix)

- `AccountSearchFilter.tsx`, `MultiSelectFilter.tsx`, `CalSchedulingButton.tsx`, `FadeIn.tsx`, `ImageCropDialog.tsx`
- `src/contexts/InquiryFormContext.tsx`
- `src/hooks/use-toast.ts`
- `ui/avatar`, `ui/checkbox`, `ui/dialog`, `ui/dropdown-menu`, `ui/label`, `ui/navigation-menu`, `ui/popover`, `ui/sheet`, `ui/slider`, `ui/toast`, `ui/toaster`, `ui/tooltip`, `ui/sonner`

`ui/sonner.tsx` uses `useTheme` from `next-themes`, but there is no `ThemeProvider`, so it falls back to `"system"`. Leave it unchanged. Optionally hard-code `theme="light"` to match today's behaviour.

### Server-safe, no change beyond the image or `Link` fixes

`AuthPageShell`, `B2BMarketingPage`, `Features`, `IntelligenceSpans`, `LegalPageShell`, `RealTimeData`, `ResearchNXT`, `TrustLogos`, `WhatIsGccIntelligence`, `WhoBenefits`, `platform/PlatformBody`, `platform/PlatformShell`, `platform/content.ts`, `ui/button`, `ui/card`, `ui/input`.

### Static image imports (**silent breakage if missed**)

In Next, `import x from "./a.png"` gives a `StaticImageData` object, not a URL string. `<img src={x}>` then renders `[object Object]`. Typecheck catches the PNG imports but **not the SVG ones**, which Next types as `any`. (Done in phase 1.)

| File | Imports | Fix |
|---|---|---|
| `TrustLogos.tsx` | 17 logos from `@/assets/logos/*` | `logo.src` in the data array |
| `Header.tsx`, `Footer.tsx`, `views/reports/IndiaGccReportQ22026.tsx` | `@/assets/bamboo-logo.svg` | `.src` |
| `HeroV2.tsx` | `../../hero-v3.png` (**repo root**) | Move to `src/assets/hero-v3.png`, then `.src` |
| `IntelligenceSpans.tsx` | `../../india-map-sep.svg` (**repo root**) | Move to `src/assets/`, then `.src` |
| `Reports.tsx`, `Resources.tsx`, `IndiaGccReportQ22026.tsx` | `q2-report-cover.png` (**repo root**) | Move to `src/assets/`, then `.src` |
| `RealTimeData.tsx`, `WhatIsGccIntelligence.tsx` | `@/assets/*` | `.src` |

Swapping to `next/image` for optimisation is a follow-up, not part of this migration.

---

## 6. SEO (`src/hooks`, `src/components/StructuredData.tsx`)

| File | Action | Details |
|---|---|---|
| `src/lib/seo.ts` | **Create** | `seo(config: SEOConfig): Metadata`. It reproduces `useSEO`'s merge rules exactly. **Title:** append `" - Bamboo Reports"` unless `appendSiteName === false` or the title already contains "Bamboo Reports". Use `title: { absolute }` so the layout can't add a template. **Description and robots:** defaults as in `DEFAULT_CONFIG`. **OG and Twitter:** title and description fall back to the page's. `openGraph.url` and `twitter.url` equal the canonical. **`ogImage: ""` means omit `images` on both `openGraph` and `twitter`.** Next merges metadata shallowly, so a page-level `openGraph` object that lacks `images` really does drop the layout's image. **Canonical:** `alternates.canonical` is taken from `canonicalUrl`. Metadata has no access to the path, so **every route passes its path explicitly**; `null` means no canonical. **Keywords:** don't emit them; `useSEO` actively removes the tag today. Keep exporting `SITE_URL`. |
| `src/hooks/useSEO.ts` | **Delete** after all 18 call sites have moved | |
| `src/hooks/usePageTitle.ts` | **Delete** | Unused (no importers). |
| `src/components/StructuredData.tsx` | **Rewrite as a server component** | Keep the schema builders (lines 1–206). Replace the `useEffect`/`document.head` injection (lines 207–232) with `return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />`. |

---

## 7. Libraries (`src/lib/**`)

| File | Action |
|---|---|
| `featureFlags.ts` | `process.env.NEXT_PUBLIC_GCC_TRACKER_ENABLED === "true"` |
| `trackerQueryV2.ts` | `process.env.NEXT_PUBLIC_TRACKER_SERVER_QUERY === "true"`. `ENDPOINT` stays `/api/tracker/query`, still served by the Netlify function (D3). |
| `jotform.ts`, `calScheduler.ts`, `cropImage.ts` | No change: they only touch `window` and `document` inside functions that are called from effects or handlers. Importers are already client components. |
| `trackerAccountsV2.ts`, `trackerStatsV2.ts`, `trackerAccountChunksV2.ts`, `tracker.ts`, `featuresData.ts`, `coverGradients.ts`, `utils.ts` | No change |
| `src/lib/server/gccData.ts` | **Create.** Starts with `import "server-only"`. `loadAccounts`, `publicAccounts`, `loadNameToSlug` ported from `prerender-lib.mjs`. **Replace `ROOT` derived from `import.meta.url` with `process.cwd()`**: once bundled into `.next/`, `import.meta.url` no longer points at `scripts/gcc/`. Reads `netlify/functions/_data/tracker-v2-accounts.json`, `data/gcc/companies/*.json` and `public/gcc/companies/*/index.html` at build time. `server-only` makes it a build error if a client component ever imports it, which protects the "dataset is never published" rule. |
| `src/lib/server/gccHtml.ts` | **Create.** The rest of `prerender-lib.mjs`: `esc`, `nf`, `slugify`, `staticPage`, `companyListHtml`, `itemListSchema`, `breadcrumbSchema`, `organizationSchema`, `landingSets`, `landingIndexHtml`, `trackedCounts`, `DEMO_URL`, `REPORT_URL`, page-size constants. Mostly copied as-is (add types or keep as `.mjs` with `allowJs`). |

---

## 8. Static GCC pages and sitemap (`scripts/gcc/*` → routes)

| Current | New | Details |
|---|---|---|
| `scripts/gcc/generate-tracker-page.mjs` part 2: `dist/gcc/directory/<n>/index.html` | `src/app/gcc/directory/[n]/route.ts` | `export const dynamic = "force-static"`, `dynamicParams = false`, `generateStaticParams()` gives `1..pageCount`. `GET` returns `new Response(buildDirectoryPage(...), { headers: { "content-type": "text/html; charset=utf-8" } })`. The HTML is identical to today's. |
| `scripts/gcc/generate-tracker-page.mjs` part 1: injecting into `dist/gcc/index.html` | Handled by `app/gcc/page.tsx` (§4) | Delete this half of the script. |
| `scripts/gcc/generate-landing-pages.mjs` | `src/app/gcc/[kind]/[slug]/route.ts` | Same pattern. `generateStaticParams()` comes from `landingSets(accounts)` (industries plus cities with ≥ `CITY_LANDING_MIN_COMPANIES`), and `kind` is limited to `industries` or `cities`. |
| `scripts/gcc/generate-sitemap.mjs` + `public/sitemap.xml` | `src/app/sitemap.ts` | Return the 15 static entries from today's `public/sitemap.xml` (same `changefreq`, `priority`, trailing-slash forms), plus the generated `/gcc/directory/n/`, `/gcc/industries/*/`, `/gcc/cities/*/` and `/gcc/companies/<slug>/` entries (the last only where `public/gcc/companies/<slug>/index.html` exists). **Delete `public/sitemap.xml`**, because it conflicts with the route. |
| `scripts/gcc/prerender-lib.mjs` | **Delete** after porting to `src/lib/server/*` | `generate-company-pages.mjs` imports helpers from it. Point that script at the new module, or keep a small copy of the helpers it uses. |
| `scripts/gcc/generate-company-pages.mjs`, `import-accounts.py`, `scripts/gcc_rules.py`, `scripts/tracker/generate-tracker-v2.py` | **Keep** | Offline generators. They write into `public/gcc/companies/`, `netlify/functions/_data/` and `src/lib/tracker*V2.ts`, which are all still valid paths. |
| `templates/gcc/company-v2.html`, `data/gcc/**` | **Keep** | |

Check: `app/gcc/[kind]/[slug]` must not shadow `/gcc/companies/<slug>/`. Restricting `kind` to `industries` and `cities` with `dynamicParams = false` handles it, and the `beforeFiles` rewrite runs first anyway.

---

## 9. Netlify functions and backend

| File | Action |
|---|---|
| `netlify/functions/tracker-query.js` | **Keep** (D3). **Verify on a deploy preview** that its `config.path: "/api/tracker/query"` still wins over the Next handler and that the 30/min per-IP limit still returns 429. Don't create `src/app/api/tracker/query/route.ts`. |
| `netlify/functions/check-tempmail.js` | **Keep**. Nothing in `src/` calls it, so it may be used from Jotform or be dead code. Confirm with whoever owns the forms. |
| `netlify/functions/_data/*` | **Keep**. Still inlined into the function bundle. Now also read at build time by `src/lib/server/gccData.ts`. |
| `supabase/migrations` | Untouched. Not used by the frontend. |

Later, optional: port `tracker-query` to a route handler and move rate limiting to a Cloudflare rule. That's a separate PR.

---

## 10. Docs and repo files

| File | Action |
|---|---|
| `CLAUDE.md`, `AGENTS.md` | Update the forbidden-command lists: `next build`, `next dev`, `next start`. |
| `README.md` | Update the stack, scripts and env var names. |
| `docs/company-pages-spec.md`, `GCC_TRACKER_SUMMARY.md` | Update any mention of `dist/`, the post-build scripts or `VITE_*`. |

---

## 11. Execution order (one PR per phase, all against a deploy preview)

1. **Scaffold:** §1 and §2, one trivial `app/page.tsx`, and the rest of the routes still unported. Confirm that Netlify detects Next and that `NODE_VERSION` works.
2. **Pages:** §4 (except `/gcc`), §5, §6, §3. Remove `react-router-dom`.
3. **Tracker:** `/gcc` page, env renames, hydration fixes.
4. **Static GCC:** §7 server libs, §8 routes and sitemap. Delete `scripts/gcc/generate-*` (except company pages) and `public/_redirects`.
5. **Cutover:** run the verification below on the preview, then merge to `main`.

---

## 12. Verification checklist (deploy preview vs. production)

- [ ] For every URL in the production sitemap, compare `curl -s` output of `<title>`, meta description, robots, canonical, `og:*`, `twitter:*` and JSON-LD between prod and preview. A script that diffs these is worth writing.
- [ ] `/gcc/directory/1/`, one industry and one city landing page, and `/gcc/companies/3m-co/` are byte-identical to prod, apart from asset hashes.
- [ ] `/sitemap.xml` has the same URL set as prod.
- [ ] All 9 redirects return **301** with the right `Location`.
- [ ] `/gcc/` returns 200 and doesn't redirect to `/gcc`. `/about/` and `/about` both return 200.
- [ ] `/gcc` with `NEXT_PUBLIC_GCC_TRACKER_ENABLED` unset returns 404.
- [ ] `POST /api/tracker/query` works, and the 31st request per minute from one IP gets a 429.
- [ ] The tracker dataset isn't downloadable: nothing under `/_next/static` contains company rows. Grep the build output for a private company name.
- [ ] Jotform: `/?utm_source=x&firstName=A&email=a@b.co` → open the inquiry dialog → the iframe `src` carries the params. The report download form reloads after download.
- [ ] `/?demo=true` opens the Cal popup once and the URL drops `demo` but keeps UTMs.
- [ ] `/gcc?industry=…&city=…` preselects filters with no hydration warning in the console.
- [ ] The event page countdown ticks with no hydration warning.
- [ ] GA4 page_view fires on the first load and on client navigation (Realtime view).
- [ ] Every image renders; look for `[object Object]` in `<img src>`.
- [ ] The `staging-bambooreports.netlify.app` → `bambooreports.com` 301 still applies.

---

## 13. Phase 1 log: differences from the plan above

- **`react-router-dom` is still installed.** The unported views in `src/views/` import it, so it's removed in phase 2 as §11 says, not in phase 1 as §1 implied.
- **`src/pages/` → `src/views/` happened in phase 1.** Next would otherwise build `src/pages/` as Pages Router routes.
- **Pulled forward from phase 2** because `tsc` fails or the shell needs them: the image `.src` fixes (§5, all 13 import sites), `React.JSX` in `FadeIn.tsx` (React 19 types), `JotFormEmbed` → `useSearchParams`, and `"use client"` on `JotFormEmbed` and `InquiryFormContext`.
- **`src/app/page.tsx` and `src/app/not-found.tsx` are placeholders** (`noindex`). The real views need `Header` and `Footer`, which still use `react-router-dom`.
- **`typecheck` is `next typegen && tsc --noEmit`,** so `next-env.d.ts` exists without running a build or dev server.
- **Lint:** `eslint-config-next` turns on `react-hooks/set-state-in-effect`, `react-hooks/refs`, `react-hooks/preserve-manual-memoization` and `react/no-unescaped-entities`. That surfaced 27 errors in existing code, so those rules are set to `warn` in `eslint.config.js`. Also removed the now-unused `@eslint/js`, `globals` and `eslint-plugin-react-hooks` (bundled by `eslint-config-next`).
- **The branch can't be merged to `main` on its own.** `npm run build` no longer runs `scripts/gcc/generate-*`, so `/gcc`, the directory and landing pages, and the generated sitemap entries are missing until phase 4.
- **Manual step in the Netlify UI:** rename `VITE_GCC_TRACKER_ENABLED` to `NEXT_PUBLIC_GCC_TRACKER_ENABLED`, and `VITE_TRACKER_SERVER_QUERY` to `NEXT_PUBLIC_TRACKER_SERVER_QUERY`, in every deploy context.

---

## 14. Phase 2 log: differences from the plan above

- **All 17 routes and the 404 are wired up.** Each `src/app/**/page.tsx` exports `metadata` from `seo()` in `src/lib/seo.ts` and renders its view. `react-router-dom` and `usePageTitle` are removed.
- **`useSEO.ts` stays until phase 3,** because `Tracker.tsx` still calls it.
- **`StructuredData` is now a server-rendered `<script type="application/ld+json">`, but the calls stay in the views** instead of moving to `page.tsx`. Every view that uses it renders on the server, so the JSON-LD is in the HTML either way.
- **`JotFormEmbed` has its own `<Suspense>` boundary** (the fallback is a box of the same height), so no caller needs one. Wrapping whole pages, as §4 and §5 suggested, would have made the report and event pages render only in the browser. The boundary added to `InquiryFormContext` in phase 1 is removed.
- **Homepage:** the `?demo=true` logic moved into `src/components/DemoQueryHandler.tsx`, in its own `<Suspense>`. `IndexV2` has no hooks left and renders fully on the server.
- **Event page:** instead of the whole view becoming a client component, only `CountdownBar` moved out, to `AgenticSupplyChainControlTowerCountdown.tsx` (client). It renders nothing until mounted, so server and browser output match.
- **About page hydration fix, not in the plan:** the roundtable photos were shuffled during render, so the server and browser would disagree. They now render in source order and shuffle after mount.
- **`"use client"` added to** `AccountSearchFilter`, `CalSchedulingButton`, `FadeIn`, `Footer`, `GccStatsBand`, `Header`, `ImageCropDialog`, `MultiSelectFilter`, `use-toast`, the Radix-based `ui/*` components, `About` and `MapYourGCCOpportunity`. Every other view and component renders on the server.
- **Metadata:** `keywords` is dropped everywhere (the old hook removed the tag too). `not-found` has no canonical and its OG URL falls back to the site root.
- **Checks:** `npm run typecheck` passes; `eslint .` has 0 errors and 58 warnings (+1: `setPhotos` inside an effect). A static scan of server components found no hooks, event handlers or function props. The server/client boundaries are still unproven until a build runs on the deploy preview.

---

## 15. Phase 3 log: differences from the plan above

- **`/gcc` route:** `src/app/gcc/page.tsx` calls `notFound()` unless `NEXT_PUBLIC_GCC_TRACKER_ENABLED` is `"true"`. Its metadata matches production's `/gcc/`: title, count-based description, canonical `/gcc/`, OG/Twitter.
- **JSON-LD:** Organization, Dataset and BreadcrumbList, identical to what `generate-tracker-page.mjs` injected, built from `TRACKER_V2_STATS` (same counts as the dataset). **The ItemList of published company pages is deferred to phase 4,** because it needs the server-only dataset loader (§7). `StructuredData.tsx` gains a generic `JsonLd` component.
- **Hydration:** the plan preferred `useSearchParams` with `<Suspense>`, but that would render the whole tracker in the browser only (the boundary wraps everything). Instead `Tracker.tsx` renders with empty filters on the server and applies `?industry=`/`?city=` in a mount effect. Both data queries are disabled until then, so a deep link never fetches the unfiltered view first, and the URL-sync effect waits so it can't strip the params. `isLoading` counts the pre-mount wait, so the prerendered HTML shows skeletons, not zeros (a disabled query isn't "loading" in TanStack Query v5).
- **`useSEO.ts` deleted:** no callers left.
- **Crawlable `/gcc` directory section (open decision in §4):** moved to phase 4, because its links point at the directory and landing pages that phase 4 creates.
- **Netlify env vars:** neither `NEXT_PUBLIC_*` flag exists yet. Without `NEXT_PUBLIC_TRACKER_SERVER_QUERY=true` the tracker falls back to the empty static chunks and shows no data; without `NEXT_PUBLIC_GCC_TRACKER_ENABLED=true` `/gcc` returns 404. Mirror the `VITE_*` values per context (currently tracker `false` in production, `true` in deploy previews; server query `true` in both). Adding them doesn't affect the live Vite build.
- **Checks:** typecheck passes; `eslint .` has 0 errors and 59 warnings (+1: applying URL filters in an effect).

---

## 16. Phase 4 log: differences from the plan above

- **One server module, not two:** `src/lib/server/gccPrerender.ts` is `prerender-lib.mjs` ported whole: dataset and company-slug loaders plus the HTML helpers. `src/lib/server/gccPages.ts` holds the directory and landing page builders from the two generator scripts, and `loadGccSite()`, which loads everything the routes, `/gcc` and the sitemap share. Both start with `import "server-only"`. `ROOT` is `process.cwd()`. Loads are cached per build worker.
- **Dropped:** the `public/data/t2` chunk fallback in `loadAccounts`. The dataset lives only in `netlify/functions/_data/tracker-v2-accounts.json` (committed).
- **Routes:** `src/app/gcc/directory/[n]/route.ts` and `src/app/gcc/[kind]/[slug]/route.ts` are `force-static` with `dynamicParams = false`, prerendered from `generateStaticParams`. They're route handlers returning the original HTML strings, not React pages. `/gcc/companies/<slug>/` still hits the `beforeFiles` rewrite to the committed HTML first.
- **Parity, checked before committing:** all 82 generated pages (19 directory, 29 industry, 34 city) are **byte-identical** to production's current deploy. `app/sitemap.ts` produces the same 97 URLs as production's `sitemap.xml`, with the same order, change frequency and priority. Checked by rendering the new modules with Node and diffing against the live deploy.
- **`/gcc` page:** adds the ItemList JSON-LD (`GCC companies in India`, published company pages only), restoring production's four schemas in the same order.
- **Directory section (§4 decision):** `src/components/GccDirectoryLinks.tsx` renders on the server into a new `directory` slot on `Tracker`, above the footer. It shows the 19 directory page links plus all industry and city landing links, visible to everyone. The old hidden list of the first 100 companies is not reproduced; the directory pages carry it. Only `{ path, label }` is passed, so no account data reaches the RSC payload.
- **Deleted:** `scripts/gcc/generate-tracker-page.mjs`, `generate-landing-pages.mjs`, `generate-sitemap.mjs`, `prerender-lib.mjs` and `public/sitemap.xml` (which would conflict with `app/sitemap.ts`). `generate-company-pages.mjs` never imported `prerender-lib`, so it's unchanged.
- **Checks:** typecheck passes; `eslint .` has 0 errors and 58 warnings. Needs the deploy preview to confirm the route handlers prerender on Netlify and that `/gcc/directory/1/` (trailing slash) resolves.

---

## 17. Phase 5 log: cutover checks and docs

Automated comparison of the #146 deploy preview (`bf5c40b`) against production's current deploy (`6aaa118`, Vite):

- **Sitemap:** `/sitemap.xml` is `application/xml`, with the same 97 entries (URL, change frequency, priority) in the same order.
- **Status codes:** 96 of 97 sitemap URLs return 200. The exception is `/gcc/`, a 404 because `NEXT_PUBLIC_GCC_TRACKER_ENABLED` isn't set on Netlify yet.
- **Static GCC pages:** all 83 (19 directory, 29 industry, 34 city, 1 company) are byte-identical to production once the toolbar Netlify injects into deploy-preview URLs is stripped. That `<div data-netlify-deploy-id>` block was the only difference.
- **404s:** `/gcc/directory/999/`, `/gcc/industries/nope/` and `/gcc/foo/bar/` return 404. Slash and no-slash forms both return 200.
- **Redirects:** all 9 return 301 to the right target.
- **Static files:** `robots.txt`, `favicon.svg`, `logo.png` and `llms.txt` are identical to production.
- **Dataset:** not reachable over HTTP (`/netlify/functions/_data/tracker-v2-accounts.json` returns 404).
- **App pages:** SEO tags and JSON-LD are in the server HTML with the values the old `useSEO` calls set (checked after phase 3). Production only added these after JavaScript ran, so there's no raw-HTML baseline to diff.

**Docs:** `README.md` now covers Next (stack, scripts, env vars, structure, routes, Netlify setup). `GCC_TRACKER_SUMMARY.md` has the frontend stack line updated. `.env.example` drops the unused `VITE_ACCOUNT_CREATION_ENABLED` and `VITE_SUPABASE_*` (nothing in the code reads them).

**Left before merge (needs a person):**
1. Add `NEXT_PUBLIC_GCC_TRACKER_ENABLED` (production `false`, other contexts `true`) and `NEXT_PUBLIC_TRACKER_SERVER_QUERY` (`true` everywhere) on Netlify, then check `/gcc/` on a fresh preview: skeletons then data, filters from `?industry=`/`?city=`, the directory section, and 4 JSON-LD blocks.
2. Browser checks on the preview: JotForm UTM/prefill forwarding and the reload after download, the `?demo=true` Cal popup, and no hydration warnings on `/`, `/about`, the event page and `/gcc`.
3. **Decide the production tracker flag before merge.** Production's `VITE_GCC_TRACKER_ENABLED` is `false`, yet `bambooreports.com/gcc/` returns **200** today: the old post-build script wrote a static `/gcc/index.html` (title, counts, first 100 companies) regardless of the flag, and only the browser app then rendered a 404. Crawlers index that page, and it's in the sitemap. In Next, the flag gates the server response, so with `NEXT_PUBLIC_GCC_TRACKER_ENABLED=false` in production `/gcc/` becomes a **real 404** while staying in the sitemap. Either set it to `true` in production (visitors then see the working tracker, not the 404 they get today), or keep it `false` and also drop `/gcc/` from `app/sitemap.ts` and the `/gcc/` links in the static pages.
4. After merge, spot-check production at `bambooreports.com`.

**Deferred, not blocking:**
- fix the 58 lint warnings and restore the 4 downgraded rules to errors
- `next/image`
- move `tracker-query` into Next
- confirm the Cloudflare rate limit on `/api/tracker/query`
- update the Netlify UI build settings to match `netlify.toml`
- stale docs unrelated to the migration (`docs/AUTH_SETUP.md`, `NEON_DATABASE_URL` in `.env.example`, the Neon architecture in `GCC_TRACKER_SUMMARY.md`)
