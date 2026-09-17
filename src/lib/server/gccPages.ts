import "server-only";

// Page builders for the static GCC routes. They replace
// scripts/gcc/generate-tracker-page.mjs and generate-landing-pages.mjs (removed)
// and produce byte-identical HTML.

import {
  DIRECTORY_PAGE_SIZE,
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
} from "./gccPrerender";

const CANONICAL = `${SITE}/gcc/`;

export function buildDirectoryPage(pageNumber, pageCount, slice, pub, accounts, nameToSlug) {
  const canonical = `${SITE}/gcc/directory/${pageNumber}/`;
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
      ${trackedVsShownHtml("All India GCCs", trackedCounts(accounts), pub.length)}
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

export function landingPage(set, sets, accounts, nameToSlug) {
  const isCity = set.kind === "cities";
  const canonical = `${SITE}${set.path}`;
  const heading = isCity
    ? `GCC companies in ${set.label}`
    : `${set.label} GCC companies in India`;
  const tracked = trackedCounts(set.tracked, isCity ? set.label : null);
  const title = `${heading}: ${nf(tracked.accounts)} Tracked | Bamboo Reports`;
  const description = `${heading}: ${nf(tracked.accounts)} companies, ${nf(tracked.centers)} centres and a headcount of ${nf(tracked.employees)} tracked by Bamboo Reports. Browse ${nf(set.public.length)} free, or size your market with the live GCC tracker.`;

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
      ${trackedVsShownHtml(set.label, tracked, set.public.length)}
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
        ["GCCs in India", `${SITE}/gcc/`],
        [set.label, canonical],
      ]),
    ],
    body,
  });
}

/** Everything the static GCC routes, the /gcc page and the sitemap share. */
export async function loadGccSite() {
  const accounts = await loadAccounts();
  const nameToSlug = await loadNameToSlug();
  const pub = publicAccounts(accounts);
  const sets = landingSets(accounts);
  const pageCount = Math.ceil(pub.length / DIRECTORY_PAGE_SIZE);
  const pageSlice = (n: number) =>
    pub.slice((n - 1) * DIRECTORY_PAGE_SIZE, n * DIRECTORY_PAGE_SIZE);
  const directoryPages = Array.from({ length: pageCount }, (_, i) => {
    const n = i + 1;
    const slice = pageSlice(n);
    const first = slice[0].name.replace(/\W.*$/, "").slice(0, 12) || slice[0].name;
    return { n, path: `/gcc/directory/${n}/`, label: `Page ${n} (${first}…)` };
  });
  return { accounts, nameToSlug, pub, sets, pageCount, pageSlice, directoryPages };
}
