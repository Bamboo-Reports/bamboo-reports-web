#!/usr/bin/env node
// Post-build step: inject crawlable /gcc content into the built SPA shell and
// write the paginated static directory pages.
//
// The /gcc route is a React SPA (src/pages/Tracker.tsx). Its H1, counts and
// company list only exist after JS runs, so non-JS crawlers see an empty
// shell. This script reads the built dist/index.html and:
//   1. Writes dist/gcc/index.html: title/description/og rewritten for /gcc,
//      canonical + JSON-LD added, and a static snapshot (H1, headline counts,
//      the FIRST 100 public companies, links to the full paginated directory
//      and the industry/city landing pages) injected into #root. React still
//      hydrates over it for interactive users.
//   2. Writes dist/gcc/directory/<n>/index.html: standalone crawlable pages of
//      100 companies each, so the full list is indexable without ever being
//      served in a single response.
//
// Runs after `vite build` (see package.json build script). Browser-free.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  DIRECTORY_PAGE_SIZE,
  DIST,
  SITE,
  breadcrumbSchema,
  companyListHtml,
  esc,
  itemListSchema,
  landingIndexHtml,
  landingSets,
  ldJson,
  loadAccounts,
  loadNameToSlug,
  nf,
  organizationSchema,
  publicAccounts,
  staticPage,
  trackedCounts,
  trackedVsShownHtml,
} from "./prerender-lib.mjs";

const SHELL = join(DIST, "index.html");
const OUT = join(DIST, "gcc", "index.html");
const CANONICAL = `${SITE}/gcc`;
const INLINE_COMPANIES = 100;

const TITLE = "GCC Companies in India: Directory & Market Size Calculator | Bamboo Reports";

function replaceMeta(html, attr, name, content) {
  const pattern = new RegExp(`<meta ${attr}="${name}"[^>]*>`);
  const tag = `<meta ${attr}="${name}" content="${esc(content)}" />`;
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace(/<\/head>/, `  ${tag}\n</head>`);
}

function buildTrackerPage(html, accounts, pub, nameToSlug, directoryPages) {
  const totals = trackedCounts(accounts);
  const description = `Browse a directory of ${nf(pub.length)}+ Global Capability Centers in India, from the ${nf(totals.accounts)} GCCs we track. Filter by industry and city to size your addressable market: matching accounts, centres and decision-makers.`;

  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Global Capability Centers (GCCs) in India",
    description: `Directory of ${nf(totals.accounts)} GCCs in India across ${nf(totals.centers)} centres, with ${nf(totals.prospects)} mapped decision-makers.`,
    creator: { "@type": "Organization", name: "Bamboo Reports" },
    license: `${SITE}/terms-conditions`,
    variableMeasured: [
      { "@type": "PropertyValue", name: "GCC companies tracked", value: totals.accounts },
      { "@type": "PropertyValue", name: "GCC centres in India", value: totals.centers },
      { "@type": "PropertyValue", name: "Decision-makers mapped", value: totals.prospects },
    ],
  };
  const schemas = [
    organizationSchema,
    dataset,
    itemListSchema("GCC companies in India", pub, nameToSlug),
    breadcrumbSchema([
      ["Home", `${SITE}/`],
      ["GCCs in India", CANONICAL],
    ]),
  ];

  const directoryLinks = directoryPages
    .map((p) => `<a href="${p.path}">${esc(p.label)}</a>`)
    .join("\n        ");

  const content = `<main class="gcc-prerender">
      <p>India GCC companies directory</p>
      <h1>GCC companies in India, sized for your market</h1>
      <p>We track ${nf(totals.accounts)} Global Capability Centers in India. Browse ${nf(pub.length)}+ of them free, filter by industry and city, and get a live count of the centres and decision-makers in your target market.</p>
      <ul>
        <li><strong>${nf(totals.accounts)}</strong> GCC companies tracked</li>
        <li><strong>${nf(totals.centers)}</strong> GCC centres</li>
        <li><strong>${nf(totals.prospects)}</strong> decision-makers</li>
      </ul>
      <h2>India GCC companies directory</h2>
${companyListHtml(pub.slice(0, INLINE_COMPANIES), nameToSlug)}
      <h2>Browse the full directory</h2>
      <p>All ${nf(pub.length)} browsable companies, ${DIRECTORY_PAGE_SIZE} per page:</p>
      <p>
        ${directoryLinks}
      </p>
${landingIndexHtml(landingSets(accounts))}
    </main>`;

  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(TITLE)}</title>`);
  out = replaceMeta(out, "name", "description", description);
  // Social tags: the SPA shell ships homepage og/twitter values; point them
  // at /gcc (same pattern as the company pages).
  out = replaceMeta(out, "property", "og:url", CANONICAL);
  out = replaceMeta(out, "property", "og:title", TITLE);
  out = replaceMeta(out, "property", "og:description", description);
  out = replaceMeta(out, "property", "og:image", `${SITE}/logo.png`);
  out = replaceMeta(out, "property", "twitter:url", CANONICAL);
  out = replaceMeta(out, "property", "twitter:title", TITLE);
  out = replaceMeta(out, "property", "twitter:description", description);
  out = replaceMeta(out, "property", "twitter:image", `${SITE}/logo.png`);
  out = out.replace(/<\/head>/, `  <link rel="canonical" href="${CANONICAL}">\n  ${ldJson(schemas)}\n</head>`);
  if (!out.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div> to inject into');
  }
  out = out.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  return { out, totals };
}

function buildDirectoryPage(pageNumber, pageCount, slice, pub, accounts, nameToSlug) {
  const canonical = `${SITE}/gcc/directory/${pageNumber}`;
  const first = slice[0]?.name ?? "";
  const last = slice[slice.length - 1]?.name ?? "";
  const title = `GCC Companies in India: Directory Page ${pageNumber} of ${pageCount} | Bamboo Reports`;
  const description = `Page ${pageNumber} of the India GCC companies directory (${esc(first)} to ${esc(last)}). ${nf(pub.length)}+ Global Capability Centers browsable free, from the ${nf(accounts.length)} GCCs Bamboo Reports tracks.`;

  const pager = Array.from({ length: pageCount }, (_, i) => i + 1)
    .map((n) =>
      n === pageNumber
        ? `<span class="current">${n}</span>`
        : `<a href="/gcc/directory/${n}/">${n}</a>`
    )
    .join("\n        ");
  const prevNext = [
    pageNumber > 1 ? `<a href="/gcc/directory/${pageNumber - 1}/">&larr; Previous</a>` : "",
    pageNumber < pageCount ? `<a href="/gcc/directory/${pageNumber + 1}/">Next &rarr;</a>` : "",
  ]
    .filter(Boolean)
    .join("\n        ");

  const body = `      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/gcc/">GCCs in India</a> / Directory page ${pageNumber}
      </nav>
      <h1>India GCC companies directory, page ${pageNumber} of ${pageCount}</h1>
      <p class="lede">Companies ${nf((pageNumber - 1) * DIRECTORY_PAGE_SIZE + 1)} to ${nf((pageNumber - 1) * DIRECTORY_PAGE_SIZE + slice.length)} of the ${nf(pub.length)} Global Capability Centers browsable free. Use the <a href="/gcc/">live market size calculator</a> to filter by industry and city.</p>
      ${trackedVsShownHtml("All India GCCs", trackedCounts(accounts), pub.length, "gcc-directory-hook")}
      <ul class="companies">
${companyListHtml(slice, nameToSlug)}
      </ul>
      <nav class="pager" aria-label="Directory pages">
        ${prevNext}
        ${pager}
      </nav>`;

  return staticPage({
    title,
    description,
    canonical,
    src: `gcc-directory-${pageNumber}`,
    schemas: [
      organizationSchema,
      itemListSchema(`GCC companies in India, page ${pageNumber}`, slice, nameToSlug),
      breadcrumbSchema([
        ["Home", `${SITE}/`],
        ["GCCs in India", CANONICAL],
        [`Directory page ${pageNumber}`, canonical],
      ]),
    ],
    body,
  });
}

if (!existsSync(SHELL)) {
  console.error(`Build shell not found at ${SHELL}. Run \`vite build\` first.`);
  process.exit(1);
}
const html = await readFile(SHELL, "utf8");
const accounts = await loadAccounts();
const nameToSlug = await loadNameToSlug();
const pub = publicAccounts(accounts);

const pageCount = Math.ceil(pub.length / DIRECTORY_PAGE_SIZE);
const directoryPages = [];
for (let n = 1; n <= pageCount; n++) {
  const slice = pub.slice((n - 1) * DIRECTORY_PAGE_SIZE, n * DIRECTORY_PAGE_SIZE);
  const pagePath = join(DIST, "gcc", "directory", String(n), "index.html");
  await mkdir(dirname(pagePath), { recursive: true });
  await writeFile(pagePath, buildDirectoryPage(n, pageCount, slice, pub, accounts, nameToSlug));
  const first = slice[0].name.replace(/\W.*$/, "").slice(0, 12) || slice[0].name;
  directoryPages.push({ path: `/gcc/directory/${n}/`, label: `Page ${n} (${first}…)` });
}

const { out, totals } = buildTrackerPage(html, accounts, pub, nameToSlug, directoryPages);
await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, out);
console.log(
  `Wrote ${OUT} + ${pageCount} directory pages\n  ${nf(totals.accounts)} tracked / ${nf(pub.length)} public listed / ` +
    `${nf(totals.centers)} centres / ${nf(totals.prospects)} decision-makers`
);
