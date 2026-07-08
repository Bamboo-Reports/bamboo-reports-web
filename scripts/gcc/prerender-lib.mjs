// Shared helpers for the post-build static GCC pages: the /gcc prerender,
// the paginated /gcc/directory/<n>/ pages and the /gcc/industries|cities/*
// landing pages. Browser-free; runs after `vite build`.

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const SITE = "https://www.bambooreports.com";
export const DIST = join(ROOT, "dist");
const CHUNK_DIR = join(ROOT, "public", "data", "t");
const COMPANY_DIR = join(ROOT, "data", "gcc", "companies");

export const DIRECTORY_PAGE_SIZE = 100;
export const CITY_LANDING_MIN_COMPANIES = 10;

export const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const nf = (n) => n.toLocaleString("en-US");

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const plural = (n, one, many) => (n === 1 ? one : many);

export async function loadAccounts() {
  const files = (await readdir(CHUNK_DIR)).filter((f) => f.endsWith(".json"));
  const all = [];
  for (const f of files) {
    all.push(...JSON.parse(await readFile(join(CHUNK_DIR, f), "utf8")));
  }
  return all;
}

export function publicAccounts(accounts) {
  return accounts
    .filter((a) => a.visibility === "public" && a.name)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function loadNameToSlug() {
  // Only link companies whose detail page is actually published under
  // public/gcc/companies/ — data JSONs may exist for pages not yet launched.
  const map = new Map();
  const files = (await readdir(COMPANY_DIR)).filter((f) => f.endsWith(".json"));
  for (const f of files) {
    const c = JSON.parse(await readFile(join(COMPANY_DIR, f), "utf8"));
    if (existsSync(join(ROOT, "public", "gcc", "companies", c.slug, "index.html"))) {
      map.set(c.name, c.slug);
      // Directory display names have acquired/merged parentheticals stripped;
      // register the cleaned form too so links still resolve.
      const cleaned = c.name
        .replace(/\s*\((?:ac+quired|merged|now part of|formerly|a subsidiary of)[^()]*(?:\([^()]*\)[^()]*)*\)\s*$/i, "")
        .trim();
      if (cleaned && cleaned !== c.name) map.set(cleaned, c.slug);
    }
  }
  return map;
}

/** Aggregate tracked counts for a subset of accounts. `city` scopes centres. */
export function trackedCounts(accounts, city = null) {
  return accounts.reduce(
    (t, a) => {
      t.accounts += 1;
      t.prospects += a.prospectCount;
      t.centers += city
        ? a.cities.filter((c) => c.name === city).reduce((s, c) => s + c.centerCount, 0)
        : a.centerCount;
      return t;
    },
    { accounts: 0, centers: 0, prospects: 0 }
  );
}

/** The tracked-vs-shown hook line used on every static GCC page. */
export function trackedVsShownHtml(label, tracked, shownCount, src) {
  const hidden = tracked.accounts - shownCount;
  return `<div class="hook">
      <p><strong>${esc(label)}:</strong> ${nf(tracked.accounts)} ${plural(tracked.accounts, "company", "companies")}, ${nf(tracked.centers)} ${plural(tracked.centers, "centre", "centres")} and ${nf(tracked.prospects)} decision-makers tracked in Bamboo Reports. Showing ${nf(shownCount)} ${plural(shownCount, "company", "companies")} free here.${hidden > 0 ? ` Sign up free to unlock the other ${nf(hidden)}, plus every centre and decision-maker.` : ""}</p>
      <a class="btn" href="/signup?src=${esc(src)}">Sign up free</a>
    </div>`;
}

export function companyListHtml(accounts, nameToSlug) {
  return accounts
    .map((a) => {
      const cities = a.cities.map((c) => c.name).join(", ");
      const industry = a.industry ? ` &middot; ${esc(a.industry)}` : "";
      const where = cities ? ` &middot; ${esc(cities)}` : "";
      const slug = nameToSlug.get(a.name);
      const label = slug
        ? `<a href="/gcc/companies/${esc(slug)}/">${esc(a.name)}</a>`
        : `<span>${esc(a.name)}</span>`;
      return `<li>${label}${industry}${where}</li>`;
    })
    .join("\n");
}

export const ldJson = (schemas) =>
  schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n  ");

export const breadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map(([name, url], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: url,
  })),
});

export const itemListSchema = (name, accounts, nameToSlug, cap = 500) => {
  const listed = accounts.filter((a) => nameToSlug.get(a.name)).slice(0, cap);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: listed.length,
    itemListElement: listed.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/gcc/companies/${nameToSlug.get(a.name)}`,
      name: a.name,
    })),
  };
};

/**
 * Landing-page sets: one page per industry (all of them) and one per city
 * with at least CITY_LANDING_MIN_COMPANIES public companies. The long tail
 * hidden behind the tracker's top-10 filter caps stays crawlable here.
 */
export function landingSets(accounts) {
  const pub = publicAccounts(accounts);
  const industries = new Map();
  for (const a of accounts) {
    if (!a.industry) continue;
    if (!industries.has(a.industry)) industries.set(a.industry, []);
    industries.get(a.industry).push(a);
  }
  const cities = new Map();
  for (const a of accounts) {
    for (const c of a.cities) {
      if (!cities.has(c.name)) cities.set(c.name, []);
      cities.get(c.name).push(a);
    }
  }
  // Chunks load in hash-filename order; sort the displayed list explicitly.
  const toSet = (kind, label, tracked) => ({
    kind,
    label,
    slug: slugify(label),
    path: `/gcc/${kind}/${slugify(label)}/`,
    tracked,
    public: tracked
      .filter((a) => a.visibility === "public" && a.name)
      .sort((a, b) => a.name.localeCompare(b.name)),
  });
  return {
    industries: [...industries.entries()]
      .map(([label, tracked]) => toSet("industries", label, tracked))
      .sort((a, b) => b.tracked.length - a.tracked.length),
    cities: [...cities.entries()]
      .filter(([, tracked]) =>
        tracked.filter((a) => a.visibility === "public" && a.name).length >=
        CITY_LANDING_MIN_COMPANIES
      )
      .map(([label, tracked]) => toSet("cities", label, tracked))
      .sort((a, b) => b.tracked.length - a.tracked.length),
    publicCount: pub.length,
  };
}

export function landingIndexHtml(sets) {
  const links = (list) =>
    list.map((s) => `<a href="${s.path}">${esc(s.label)}</a>`).join("\n        ");
  return `<h2>GCC companies by industry</h2>
      <p class="index-links">
        ${links(sets.industries)}
      </p>
      <h2>GCC companies by city</h2>
      <p class="index-links">
        ${links(sets.cities)}
      </p>`;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bamboo Reports",
  url: SITE,
};

/**
 * Standalone static page shell for directory and landing pages. Lightweight
 * (no JS), brand-consistent with the company template, includes the Q1 promo
 * bar, site header and footer.
 */
export function staticPage({ title, description, canonical, schemas, body, src }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${SITE}/logo.png">
  <meta property="twitter:card" content="summary">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  ${ldJson(schemas)}
  <style>
    :root { --text:#17202a; --heading:#0b1320; --muted:#64748b; --faint:#94a3b8; --primary:#0084d1; --primary-dark:#006fae; --border:#e6eaf0; --surface:#f0f8fd; }
    * { box-sizing: border-box; }
    body { margin:0; font-family:"DM Sans","Inter",system-ui,-apple-system,"Segoe UI",sans-serif; color:var(--text); line-height:1.55; }
    a { color: var(--primary); }
    .wrap { max-width:1140px; margin:0 auto; padding:0 20px; }
    .promo-bar { display:block; background:var(--primary); color:#fff; text-align:center; font-size:13.5px; font-weight:600; padding:9px 16px; text-decoration:none; }
    .promo-bar u { text-underline-offset:2px; }
    .site-header { border-bottom:1px solid var(--border); padding:14px 0; }
    .site-header .wrap { display:flex; align-items:center; justify-content:space-between; gap:16px; }
    .site-header img { height:38px; display:block; }
    .site-header nav { display:flex; align-items:center; gap:18px; font-size:14.5px; font-weight:500; }
    .site-header nav a { color:var(--text); text-decoration:none; }
    .site-header nav a:hover { color:var(--primary); }
    .site-header .btn { margin-left:4px; }
    .btn { display:inline-block; background:var(--primary); color:#fff; font-weight:700; font-size:14.5px; border-radius:999px; padding:9px 22px; text-decoration:none; white-space:nowrap; }
    .btn:hover { background:var(--primary-dark); }
    main { padding:40px 0 56px; }
    .breadcrumbs { font-size:13px; color:var(--faint); margin:0 0 18px; }
    .breadcrumbs a { color:var(--faint); text-decoration:none; }
    .breadcrumbs a:hover { color:var(--primary); }
    h1 { font-size:clamp(26px,4.5vw,38px); line-height:1.15; color:var(--heading); margin:0 0 12px; letter-spacing:-0.5px; }
    .lede { font-size:16.5px; color:var(--muted); max-width:760px; margin:0 0 22px; }
    .hook { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:18px 20px; margin:0 0 30px; display:flex; flex-wrap:wrap; align-items:center; gap:16px; }
    .hook p { margin:0; flex:1 1 380px; font-size:14.5px; }
    h2 { font-size:20px; color:var(--heading); margin:34px 0 12px; }
    ul.companies { list-style:none; margin:0; padding:0; border:1px solid var(--border); border-radius:12px; overflow:hidden; }
    ul.companies li { padding:11px 16px; font-size:14.5px; border-bottom:1px solid var(--border); }
    ul.companies li:last-child { border-bottom:none; }
    ul.companies a { font-weight:600; text-decoration:none; }
    ul.companies a:hover { text-decoration:underline; }
    .pager { display:flex; flex-wrap:wrap; gap:8px; margin:26px 0 0; font-size:14px; }
    .pager a, .pager span { padding:7px 13px; border:1px solid var(--border); border-radius:8px; text-decoration:none; color:var(--text); }
    .pager a:hover { border-color:var(--primary); color:var(--primary); }
    .pager .current { background:var(--primary); border-color:var(--primary); color:#fff; font-weight:700; }
    .index-links { display:flex; flex-wrap:wrap; gap:8px 14px; font-size:14px; margin:10px 0 0; }
    .index-links a { text-decoration:none; }
    .index-links a:hover { text-decoration:underline; }
    .site-footer { border-top:1px solid var(--border); padding:26px 0 34px; font-size:13.5px; color:var(--muted); }
    .site-footer .wrap { display:flex; flex-wrap:wrap; gap:10px 26px; justify-content:space-between; }
    .site-footer a { color:var(--muted); text-decoration:none; }
    .site-footer a:hover { color:var(--primary); }
    @media (max-width:640px){ .site-header nav a.nav-link { display:none; } }
  </style>
</head>
<body>
  <a class="promo-bar" href="/signup?src=${esc(src)}-q1report">The Q1 2026 India GCC Report drops July 20. <u>Sign up free for early access &rarr;</u></a>
  <header class="site-header">
    <div class="wrap">
      <a href="/"><img src="/logo.png" alt="Bamboo Reports"></a>
      <nav>
        <a class="nav-link" href="/gcc/">GCC directory</a>
        <a class="nav-link" href="/signin">Sign In</a>
        <a class="btn" href="/signup?src=${esc(src)}-header">Sign up free</a>
      </nav>
    </div>
  </header>
  <main>
    <div class="wrap">
${body}
    </div>
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <span>&copy; 2026 Bamboo Reports &middot; A Research NXT company. All rights reserved.</span>
      <span><a href="/gcc/">GCC companies in India</a> &middot; <a href="/privacy-policy">Privacy Policy</a> &middot; <a href="/terms-conditions">Terms &amp; Conditions</a></span>
    </div>
  </footer>
</body>
</html>
`;
}
