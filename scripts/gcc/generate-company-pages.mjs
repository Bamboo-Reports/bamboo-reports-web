#!/usr/bin/env node
// Generates static /gcc/companies/{slug}/index.html pages from data/gcc/companies/*.json
// using templates/gcc/company-v2.html. Per doc/ref.md: fully static crawlable HTML, ~10% data
// rule, contact titles only (no names in source), no password gate, four schema blocks.
//
// Usage: node scripts/gcc/generate-company-pages.mjs [--out <dir>]
// Default output: public/ (so Netlify publishes them ahead of the SPA catch-all).

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = "https://www.bambooreports.com";
const DATA_DIR = join(ROOT, "data", "gcc", "companies");
const TEMPLATE_V2 = join(ROOT, "templates", "gcc", "company-v2.html");

// Standardized industry labels shared with the tracker directory and landing
// pages (data/gcc/taxonomy.json); unmapped raw values pass through.
const TAXONOMY = JSON.parse(
  await readFile(join(ROOT, "data", "gcc", "taxonomy.json"), "utf8")
).industries;
const mapIndustry = (v) => (v ? (TAXONOMY[v] ?? v) : v);

const outFlag = process.argv.indexOf("--out");
const OUT_DIR = outFlag > -1 ? resolve(process.argv[outFlag + 1]) : join(ROOT, "public");
// --only <slug>[,<slug>...] regenerates just those pages (e.g. the 3M approval
// sample) without republishing every company in data/gcc/companies/.
const onlyFlag = process.argv.indexOf("--only");
const ONLY = onlyFlag > -1 ? new Set(process.argv[onlyFlag + 1].split(",")) : null;

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Fields that intentionally carry inline markup (bold spans) from curated data.
const RICH_FIELDS = new Set(["lede"]);

const FORBIDDEN_PATTERNS = [
  /\bdm-name\b/i, // the old blurred-name markup must never reappear
  /@[a-z0-9.-]+\.(com|in|org|net)/i, // no email addresses
];

// Show one representative value and a restrained count for the gated remainder.
function teaserChips(items, singular, plural) {
  if (!items?.length) return "";
  const visible = items.slice(0, 1);
  const rest = items.length - visible.length;
  const preview = `<span class="preview-value">${visible.map(esc).join(", ")}</span>`;
  if (rest === 0) return preview;
  const label = `+${rest} more ${rest === 1 ? singular : plural}`;
  return `${preview}<span class="preview-separator" aria-hidden="true">/</span><span class="preview-more">${esc(label)}</span>`;
}

function buildTechPreview(tech) {
  const samples = tech.categorySamples ?? [];
  if (!samples.length) {
    return `<div class="data-preview">${teaserChips(tech.categoryList ?? [], "category", "categories")}</div>`;
  }
  const visible = samples.slice(0, 1);
  const rows = visible.map(
    ({ category, software }) =>
      `<div class="data-preview"><span class="preview-category">${esc(category)}</span><span class="preview-value">${software.slice(0, 1).map(esc).join(", ")}</span></div>`
  );
  const remaining = Math.max(0, (tech.categories ?? tech.categoryList?.length ?? 0) - visible.length);
  if (remaining) {
    rows.push(`<div class="data-preview preview-summary"><span class="preview-more">+${remaining} more ${remaining === 1 ? "category" : "categories"}</span></div>`);
  }
  return rows.join("\n            ");
}

function externalTag(href, label, iconSvg) {
  return `<a class="tag" href="${esc(href)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(label)}">${iconSvg}${esc(label)}<svg class="tag-external" aria-hidden="true" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg></a>`;
}

const ICONS = {
  globe:
    '<svg class="tag-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  linkedin:
    '<svg class="tag-icon tag-icon-fill" aria-hidden="true" viewBox="0 0 448 512"><!--!Font Awesome Free by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>',
  award:
    '<svg class="tag-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/></svg>',
};

function rankTag(label, rank) {
  return `<span class="tag">${ICONS.award}${esc(`${label} #${rank}`)}</span>`;
}

function buildTags(c) {
  const tags = [];
  if (c.website) tags.push(externalTag(c.website, "Website", ICONS.globe));
  if (c.linkedin) tags.push(externalTag(c.linkedin, "LinkedIn", ICONS.linkedin));
  if (c.forbesRank != null) tags.push(rankTag("Forbes 2000", c.forbesRank));
  if (c.fortuneRank != null) tags.push(rankTag("Fortune 500", c.fortuneRank));
  return tags.join("\n            ");
}

function buildStatTiles(c) {
  const s = c.stats;
  const tiles = [
    { k: "Total centers", v: s.totalCenters ?? s.activeCenters },
    { k: "Indian cities", v: s.cities.length },
    { k: "Years in India", v: s.yearsInIndia },
    { k: "India headcount", v: s.headcountBand },
  ];
  return tiles
    .map(
      (t, i) => {
        const locked = i > 1;
        return locked
          ? `    <div class="stat stat-locked"><div class="k">${esc(t.k)}</div><a class="stat-unlock" href="/signup?src=gcc-company-${esc(c.slug)}-stats"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Unlock data</a></div>`
          : `    <div class="stat"><div class="k">${esc(t.k)}</div><div class="v">${esc(t.v)}</div></div>`;
      }
    )
    .join("\n");
}

function buildLeaderRows(c) {
  return (c.leaders.titles ?? []).slice(0, 3)
    .map(
      (l) =>
        `              <div class="dm-row"><div class="dm-avatar" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg></div><div class="dm-title">${esc(l.title)} <span>| ${esc(l.city)}</span></div></div>`
    )
    .join("\n");
}

function buildAboutRows(c) {
  const a = c.about;
  const rows = [
    ["Industry", mapIndustry(a.industry)],
    ["Headquarters", a.headquarters],
    ["Global revenue", a.revenueBand],
    ["Global employees", a.employeesBand],
  ].filter(([, v]) => v);
  return rows
    .map(([k, v]) => `              <dt>${esc(k)}</dt><dd>${esc(v)}</dd>`)
    .join("\n");
}

function buildFaqItems(c) {
  return c.faq
    .map(
      (f, i) =>
        `            <details class="faq"${i === 0 ? " open" : ""}>\n              <summary>${esc(f.q)}</summary>\n              <p>${esc(f.a)}</p>\n            </details>`
    )
    .join("\n");
}

function buildRelated(c) {
  return (c.related ?? [])
    .map((r) => `<a href="${esc(r.href)}">${esc(r.label)}</a>`)
    .join("\n          ");
}

function buildSponsor(c) {
  if (!c.sponsor) return "";
  const s = c.sponsor;
  return `          <div class="sponsor">
            <div class="sponsor-label">Sponsored · Partner spotlight</div>
            <div class="sponsor-body">
              <h3>${esc(s.heading)}</h3>
              <p>${esc(s.copy)}</p>
              <a class="btn btn-ghost" href="${esc(s.href)}" rel="sponsored nofollow">Learn more</a>
            </div>
          </div>`;
}

// V2 builders. Cities and center types follow the same one-visible teaser
// gating as v1, rendered as chips.
function chipRowTeaser(items, singular, plural) {
  const list = items ?? [];
  if (!list.length) return "";
  const chips = [`<span class="chip">${esc(list[0])}</span>`];
  const rest = list.length - 1;
  if (rest > 0) {
    chips.push(
      `<span class="chip chip-more">+${rest} more ${rest === 1 ? singular : plural}</span>`
    );
  }
  return chips.join("");
}

function buildFactTilesV2(c) {
  const s = c.stats;
  const lockIcon =
    '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
  const tiles = [
    { k: "Total centers", v: s.totalCenters ?? s.activeCenters },
    { k: "Indian cities", v: s.cities.length },
    { k: "Years in India", locked: true },
    { k: "India headcount", locked: true },
  ];
  return tiles
    .map((t) =>
      t.locked
        ? `      <div class="fact"><div class="k">${esc(t.k)}</div><a class="fact-lock" href="/signup?src=gcc-company-${esc(c.slug)}-v2-facts">${lockIcon}Unlock</a></div>`
        : `      <div class="fact"><div class="k">${esc(t.k)}</div><div class="v">${esc(t.v)}</div></div>`
    )
    .join("\n");
}

// Same four rows v1's about grid exposes; sinceYear stays out because the
// "Years in India" tile is locked and the since-year would give it away.
function buildAboutRowsV2(c) {
  const rows = [
    ["Industry", mapIndustry(c.about.industry)],
    ["Headquarters", c.about.headquarters],
    ["Global revenue", c.about.revenueBand],
    ["Global employees", c.about.employeesBand],
  ].filter(([, v]) => v);
  return rows
    .map(([k, v]) => `              <div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
    .join("\n");
}

function buildSchemas(c, canonical) {
  const s = c.stats;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: c.name,
    url: c.website,
    ...(c.linkedin || c.wikidata
      ? { sameAs: [c.linkedin, c.wikidata].filter(Boolean) }
      : {}),
  };
  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${c.displayName} Global Capability Centers in India`,
    description: `${c.shortName} operates ${s.activeCenters} active centers across ${s.cities.length} Indian cities.`,
    creator: { "@type": "Organization", name: "Bamboo Reports" },
    license: `${SITE}/terms-conditions`,
    dateModified: c.dateModified,
    variableMeasured: [
      { "@type": "PropertyValue", name: "Active centers in India", value: s.activeCenters },
      { "@type": "PropertyValue", name: "Indian cities with centers", value: s.cities.length },
      { "@type": "PropertyValue", name: "Years in India", value: s.yearsInIndia },
      { "@type": "PropertyValue", name: "India headcount range", value: s.headcountBandLong },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq
      .filter((f) => !f.excludeFromSchema)
      .map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.schemaAnswer ?? f.a },
      })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "GCCs in India", item: `${SITE}/gcc` },
      { "@type": "ListItem", position: 3, name: c.displayName },
    ],
  };
  return { organization, dataset, faq, breadcrumb };
}

function render(template, c, extraVars = {}) {
  const canonical = `${SITE}/gcc/companies/${c.slug}`;
  const schemas = buildSchemas(c, canonical);
  const vars = {
    TITLE: esc(c.metaTitle),
    META_DESCRIPTION: esc(c.metaDescription),
    CANONICAL_URL: canonical,
    OG_TITLE: esc(c.metaTitle.replace(/ \| Bamboo Reports$/, "")),
    OG_DESCRIPTION: esc(
      `${c.stats.activeCenters} verified centers across ${c.stats.cities.length} Indian cities. See the full India footprint on Bamboo Reports.`
    ),
    OG_IMAGE: `${SITE}/logo.png`,
    SCHEMA_ORGANIZATION: JSON.stringify(schemas.organization),
    SCHEMA_DATASET: JSON.stringify(schemas.dataset),
    SCHEMA_FAQ: JSON.stringify(schemas.faq),
    SCHEMA_BREADCRUMB: JSON.stringify(schemas.breadcrumb),
    SRC: `gcc-company-${c.slug}`,
    COMPANY_SHORT: esc(c.shortName),
    H1: esc(c.h1),
    LEDE: c.lede, // curated rich text (bold spans allowed)
    TAGS: buildTags(c),
    INSIGHT: esc(c.insight),
    STAT_TILES: buildStatTiles(c),
    CITY_CHIPS: teaserChips(c.stats.cities, "city", "cities"),
    TYPE_CHIPS: teaserChips(c.centerTypes, "center type", "center types"),
    FUNCTION_CHIPS: teaserChips(c.functions, "function", "functions"),
    TECH_PREVIEW: buildTechPreview(c.tech),
    LEADER_COUNT: esc(c.leaders.count),
    LEADER_DEPTS: esc(c.leaders.departments),
    LEADER_ROWS: buildLeaderRows(c),
    LAST_UPDATED: esc(c.lastUpdated ?? ""),
    // Tracked-vs-shown hook: platform depth stated next to the free teaser.
    TRACKED_SUMMARY: esc(
      `${c.shortName}: ${c.stats.totalCenters ?? c.stats.activeCenters} ` +
        `${(c.stats.totalCenters ?? c.stats.activeCenters) === 1 ? "centre" : "centres"} and ` +
        `${c.leaders.count} decision-makers tracked in Bamboo Reports.`
    ),
    ABOUT_DESC: esc(c.about.description),
    ABOUT_ROWS: buildAboutRows(c),
    FAQ_ITEMS: buildFaqItems(c),
    RELATED_LINKS: buildRelated(c),
    SPONSOR_SLOT: buildSponsor(c),
    ...extraVars,
  };
  let html = template;
  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(`{{${key}}}`, String(value));
  }
  const leftover = html.match(/{{[A-Z_]+}}/g);
  if (leftover) throw new Error(`${c.slug}: unresolved placeholders: ${leftover.join(", ")}`);
  return html;
}

function qaChecks(c, html) {
  const problems = [];
  for (const p of FORBIDDEN_PATTERNS) {
    if (p.test(html)) problems.push(`matches forbidden pattern ${p}`);
  }
  if (/—/.test(html)) problems.push("contains an em dash");
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(block[1]);
    } catch {
      problems.push("invalid JSON-LD block");
    }
  }
  return problems;
}

const templateV2 = await readFile(TEMPLATE_V2, "utf8");
const files = (await readdir(DATA_DIR)).filter((f) => f.endsWith(".json"));
if (files.length === 0) {
  console.error(`No company data files found in ${DATA_DIR}`);
  process.exit(1);
}

let failures = 0;
let written = 0;
for (const file of files) {
  if (ONLY && !ONLY.has(file.replace(/\.json$/, ""))) continue;
  const c = JSON.parse(await readFile(join(DATA_DIR, file), "utf8"));
  const html = render(templateV2, c, {
    V2_FACT_TILES: buildFactTilesV2(c),
    CITY_CHIPS_ALL: chipRowTeaser(c.stats.cities, "city", "cities"),
    TYPE_CHIPS_ALL: chipRowTeaser(c.centerTypes, "center type", "center types"),
    ABOUT_ROWS_V2: buildAboutRowsV2(c),
  });
  const problems = qaChecks(c, html);
  if (problems.length) {
    failures++;
    console.error(`FAIL ${c.slug}: ${problems.join("; ")}`);
    continue;
  }
  const dir = join(OUT_DIR, "gcc", "companies", c.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html);
  written++;
  console.log(`OK   /gcc/companies/${c.slug}/ (${(html.length / 1024).toFixed(1)} KB)`);
}

if (failures) {
  console.error(`\n${failures} page(s) failed QA and were not written.`);
  process.exit(1);
}
console.log(`\nGenerated ${written} page(s) into ${OUT_DIR}/gcc/companies/`);
