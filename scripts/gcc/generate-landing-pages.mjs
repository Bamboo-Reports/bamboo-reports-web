#!/usr/bin/env node
// Post-build step: crawlable industry and city landing pages under
// dist/gcc/industries/<slug>/ and dist/gcc/cities/<slug>/.
//
// The tracker's on-page filters are capped to the top 10 industries/cities;
// these pages keep the long tail public and indexable (linked from the /gcc
// prerender and listed in the sitemap), so the filter cap costs no SEO.
// Every page carries the tracked-vs-shown hook and a Sign up free CTA.
//
// Runs after generate-tracker-page.mjs (see package.json build script).

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  DIST,
  SITE,
  breadcrumbSchema,
  companyListHtml,
  esc,
  itemListSchema,
  landingSets,
  loadAccounts,
  loadNameToSlug,
  nf,
  organizationSchema,
  publicAccounts,
  staticPage,
  trackedCounts,
  trackedVsShownHtml,
} from "./prerender-lib.mjs";

function landingPage(set, sets, accounts, nameToSlug) {
  const isCity = set.kind === "cities";
  const canonical = `${SITE}${set.path.replace(/\/$/, "")}`;
  const heading = isCity
    ? `GCC companies in ${set.label}`
    : `${set.label} GCC companies in India`;
  const tracked = trackedCounts(set.tracked, isCity ? set.label : null);
  const title = `${heading}: ${nf(tracked.accounts)} Tracked | Bamboo Reports`;
  const description = `${heading}: ${nf(tracked.accounts)} companies, ${nf(tracked.centers)} centres and ${nf(tracked.prospects)} decision-makers tracked by Bamboo Reports. Browse ${nf(set.public.length)} free, or size your market with the live GCC calculator.`;

  const siblings = (isCity ? sets.cities : sets.industries)
    .filter((s) => s.slug !== set.slug)
    .slice(0, 12)
    .map((s) => `<a href="${s.path}">${esc(s.label)}</a>`)
    .join("\n        ");
  const crossKind = isCity ? sets.industries : sets.cities;
  const cross = crossKind
    .slice(0, 12)
    .map((s) => `<a href="${s.path}">${esc(s.label)}</a>`)
    .join("\n        ");

  const filterParam = isCity
    ? `city=${encodeURIComponent(set.label)}`
    : `industry=${encodeURIComponent(set.label)}`;

  const body = `      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/gcc/">GCCs in India</a> / ${esc(set.label)}
      </nav>
      <h1>${esc(heading)}</h1>
      <p class="lede">Every ${isCity ? `Global Capability Center company with a presence in ${esc(set.label)}` : `${esc(set.label)} company running Global Capability Centers in India`} that Bamboo Reports tracks. Filter further with the <a href="/gcc/?${filterParam}">live market size calculator</a>.</p>
      ${trackedVsShownHtml(set.label, tracked, set.public.length, `gcc-${set.kind}-${set.slug}`)}
      <h2>Browse the ${nf(set.public.length)} public ${set.public.length === 1 ? "company" : "companies"}</h2>
      <ul class="companies">
${companyListHtml(set.public, nameToSlug)}
      </ul>
      <h2>${isCity ? "More GCC cities" : "More GCC industries"}</h2>
      <p class="index-links">
        ${siblings}
      </p>
      <h2>${isCity ? "GCC companies by industry" : "GCC companies by city"}</h2>
      <p class="index-links">
        ${cross}
      </p>`;

  return staticPage({
    title,
    description,
    canonical,
    src: `gcc-${set.kind}-${set.slug}`,
    schemas: [
      organizationSchema,
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: heading,
        url: canonical,
        description,
      },
      itemListSchema(heading, set.public, nameToSlug),
      breadcrumbSchema([
        ["Home", `${SITE}/`],
        ["GCCs in India", `${SITE}/gcc`],
        [set.label, canonical],
      ]),
    ],
    body,
  });
}

const accounts = await loadAccounts();
const nameToSlug = await loadNameToSlug();
const sets = landingSets(accounts);

let written = 0;
for (const set of [...sets.industries, ...sets.cities]) {
  const outPath = join(DIST, "gcc", set.kind, set.slug, "index.html");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, landingPage(set, sets, accounts, nameToSlug));
  written++;
}
console.log(
  `Wrote ${written} landing pages (${sets.industries.length} industries, ${sets.cities.length} cities) into ${join(DIST, "gcc")}`
);
