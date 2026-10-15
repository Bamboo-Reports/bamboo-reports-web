import type { MetadataRoute } from "next";
import { SITE_URL, indexablePaths } from "@/lib/seo";

// Required for `output: "export"`: emits a static out/sitemap.xml.
export const dynamic = "force-static";

// Generated from PAGE_META so every indexable page is listed and noindex
// pages never are. Google ignores changefreq/priority, so they are omitted.
const sitemap = (): MetadataRoute.Sitemap =>
  indexablePaths().map((path) => ({ url: `${SITE_URL}${path}` }));

export default sitemap;
