#!/usr/bin/env node
// Post-build step: inject crawlable /gcc content into the built SPA shell.
//
// The /gcc route is a React SPA (src/pages/Tracker.tsx). Its H1, counts and
// company list only exist after JS runs, so non-JS crawlers see an empty shell.
// This script reads the built dist/index.html, injects a static snapshot of the
// directory (H1, headline counts, the public company list linked to detail
// pages, and JSON-LD) into #root, and writes dist/gcc/index.html. React still
// loads and replaces #root for interactive users — crawlers get the content.
//
// Runs after `vite build` (see package.json build script). Browser-free.

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = "https://www.bambooreports.com";
const DIST = join(ROOT, "dist");
const SHELL = join(DIST, "index.html");
const CHUNK_DIR = join(ROOT, "public", "data", "t");
const COMPANY_DIR = join(ROOT, "data", "gcc", "companies");
const OUT = join(DIST, "gcc", "index.html");

const TITLE = "GCC Companies in India: Directory & Market Size Calculator | Bamboo Reports";
const DESCRIPTION =
  "Browse a directory of 1,800+ Global Capability Centers in India, from 2,400+ GCCs we track. Filter by industry and city to size your addressable market: matching accounts, centres and decision-makers.";
const CANONICAL = `${SITE}/gcc`;

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const nf = (n) => n.toLocaleString("en-US");

async function loadAccounts() {
  const files = (await readdir(CHUNK_DIR)).filter((f) => f.endsWith(".json"));
  const all = [];
  for (const f of files) {
    all.push(...JSON.parse(await readFile(join(CHUNK_DIR, f), "utf8")));
  }
  return all;
}

async function loadNameToSlug() {
  // Only link companies whose detail page is actually published under
  // public/gcc/companies/ — data JSONs may exist for pages not yet launched.
  const map = new Map();
  const files = (await readdir(COMPANY_DIR)).filter((f) => f.endsWith(".json"));
  for (const f of files) {
    const c = JSON.parse(await readFile(join(COMPANY_DIR, f), "utf8"));
    if (existsSync(join(ROOT, "public", "gcc", "companies", c.slug, "index.html"))) {
      map.set(c.name, c.slug);
    }
  }
  return map;
}

function main(html, accounts, nameToSlug) {
  const totals = accounts.reduce(
    (t, a) => {
      t.accounts += 1;
      t.centers += a.centerCount;
      t.prospects += a.prospectCount;
      return t;
    },
    { accounts: 0, centers: 0, prospects: 0 }
  );

  const publicAccounts = accounts
    .filter((a) => a.visibility === "public" && a.name)
    .sort((a, b) => a.name.localeCompare(b.name));

  const rows = publicAccounts
    .map((a) => {
      const cities = a.cities.map((c) => c.name).join(", ");
      const industry = a.industry ? ` &middot; ${esc(a.industry)}` : "";
      const slug = nameToSlug.get(a.name);
      const label = slug
        ? `<a href="/gcc/companies/${esc(slug)}/">${esc(a.name)}</a>`
        : `<span>${esc(a.name)}</span>`;
      const where = cities ? ` &middot; ${esc(cities)}` : "";
      return `<li>${label}${industry}${where}</li>`;
    })
    .join("\n");

  // ItemList: the linkable subset (companies with detail pages) — most useful
  // to crawlers, and keeps the JSON-LD to a reasonable size.
  const listed = publicAccounts.filter((a) => nameToSlug.get(a.name)).slice(0, 500);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GCC companies in India",
    numberOfItems: listed.length,
    itemListElement: listed.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/gcc/companies/${nameToSlug.get(a.name)}`,
      name: a.name,
    })),
  };
  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Global Capability Centers (GCCs) in India",
    description: `Directory of ${nf(totals.accounts)} GCCs in India across ${nf(totals.centers)} centres, with ${nf(totals.prospects)} mapped decision-makers.`,
    creator: { "@type": "Organization", name: "Bamboo Reports" },
    variableMeasured: [
      { "@type": "PropertyValue", name: "GCC companies tracked", value: totals.accounts },
      { "@type": "PropertyValue", name: "Centres in India", value: totals.centers },
      { "@type": "PropertyValue", name: "Decision-makers mapped", value: totals.prospects },
    ],
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "GCCs in India", item: CANONICAL },
    ],
  };
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bamboo Reports",
    url: SITE,
  };

  const content = `<main class="gcc-prerender">
      <p>India GCC companies directory</p>
      <h1>GCC companies in India, sized for your market</h1>
      <p>We track ${nf(totals.accounts)}+ Global Capability Centers in India. Browse ${nf(publicAccounts.length)}+ of them free, filter by industry and city, and get a live count of the centres and decision-makers in your target market.</p>
      <ul>
        <li><strong>${nf(totals.accounts)}</strong> GCC companies tracked</li>
        <li><strong>${nf(totals.centers)}</strong> centres</li>
        <li><strong>${nf(totals.prospects)}</strong> decision-makers</li>
      </ul>
      <h2>India GCC companies directory</h2>
      <ul class="gcc-directory">
${rows}
      </ul>
    </main>`;

  const schemas = [organization, dataset, itemList, breadcrumb]
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n  ");

  let out = html;
  // Rewrite title + description for the /gcc route (crawlers read served HTML).
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(TITLE)}</title>`);
  if (/<meta name="description"[^>]*>/.test(out)) {
    out = out.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(DESCRIPTION)}">`);
  } else {
    out = out.replace(/<\/head>/, `  <meta name="description" content="${esc(DESCRIPTION)}">\n</head>`);
  }
  // Canonical + structured data before </head>.
  out = out.replace(
    /<\/head>/,
    `  <link rel="canonical" href="${CANONICAL}">\n  ${schemas}\n</head>`
  );
  // Inject crawlable content into the empty SPA root.
  if (!out.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div> to inject into');
  }
  out = out.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  return { out, totals, publicCount: publicAccounts.length };
}

if (!existsSync(SHELL)) {
  console.error(`Build shell not found at ${SHELL}. Run \`vite build\` first.`);
  process.exit(1);
}
const html = await readFile(SHELL, "utf8");
const accounts = await loadAccounts();
const nameToSlug = await loadNameToSlug();
const { out, totals, publicCount } = main(html, accounts, nameToSlug);
await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, out);
console.log(
  `Wrote ${OUT}\n  ${nf(totals.accounts)} tracked / ${nf(publicCount)} public listed / ` +
    `${nf(totals.centers)} centres / ${nf(totals.prospects)} decision-makers`
);
