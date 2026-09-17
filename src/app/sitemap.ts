import type { MetadataRoute } from "next";
import { readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, SITE } from "@/lib/server/gccPrerender";
import { loadGccSite } from "@/lib/server/gccPages";

type Entry = MetadataRoute.Sitemap[number];
const url = (
  path: string,
  changeFrequency: Entry["changeFrequency"],
  priority: number,
): Entry => ({ url: `${SITE}${path}`, changeFrequency, priority });

/** Every generated GCC URL: /gcc/, the directory pages, the industry and city
 *  landing pages and the published company pages (replaces the removed
 *  scripts/gcc/generate-sitemap.mjs). */
async function gccEntries(): Promise<MetadataRoute.Sitemap> {
  const { directoryPages, sets } = await loadGccSite();
  const entries = [url("/gcc/", "weekly", 0.9)];
  for (const page of directoryPages) entries.push(url(page.path, "weekly", 0.6));
  for (const set of [...sets.industries, ...sets.cities]) entries.push(url(set.path, "weekly", 0.7));

  // Published company pages only (public/gcc/companies/<slug>/index.html).
  const companiesDir = join(ROOT, "public", "gcc", "companies");
  if (existsSync(companiesDir)) {
    for (const slug of (await readdir(companiesDir)).sort()) {
      if (existsSync(join(companiesDir, slug, "index.html"))) {
        entries.push(url(`/gcc/companies/${slug}/`, "monthly", 0.7));
      }
    }
  }
  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    url("/", "weekly", 1.0),
    url("/about", "monthly", 0.8),
    ...(await gccEntries()),
    // Product & offering pages
    url("/platform", "weekly", 0.9),
    url("/gcc-prospect-data", "weekly", 0.8),
    url("/account-market-intelligence", "weekly", 0.8),
    url("/gcc-abm", "weekly", 0.8),
    url("/success-stories", "monthly", 0.7),
    // Content & resources
    url("/resources", "weekly", 0.7),
    url("/reports", "monthly", 0.7),
    url("/reports/india-gcc-report-q2-2026", "monthly", 0.7),
    // Events
    url("/events/agentic-supply-chain-control-tower", "weekly", 0.7),
    // Legal
    url("/privacy-policy", "yearly", 0.3),
    url("/terms-conditions", "yearly", 0.3),
  ];
}
