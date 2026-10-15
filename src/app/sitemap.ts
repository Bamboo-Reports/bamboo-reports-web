import type { MetadataRoute } from "next";
import { SITE_URL, indexablePaths } from "@/lib/seo";
import { gccDirectoryLive } from "@/config/flags";
import { companies } from "@/lib/gccCompanies";

// Required for `output: "export"`: emits a static out/sitemap.xml.
export const dynamic = "force-static";

// Generated from PAGE_META so every indexable page is listed and noindex
// pages never are. Google ignores changefreq/priority, so they are omitted.
const sitemap = (): MetadataRoute.Sitemap => [
  ...indexablePaths().map((path) => ({ url: `${SITE_URL}${path}` })),
  ...(gccDirectoryLive
    ? companies.map((c) => ({ url: `${SITE_URL}/gcc-companies/${c.slug}`, lastModified: c.updated }))
    : []),
];

export default sitemap;
