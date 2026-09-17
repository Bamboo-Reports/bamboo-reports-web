import type { Metadata } from "next";

export const SITE_URL = "https://bambooreports.com";

const SITE_NAME = "Bamboo Reports";
const DEFAULT_DESCRIPTION =
  "Verified India GCC data, account intelligence, and analyst-led research for GTM teams building their India GCC opportunity.";
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

export interface SEOConfig {
  title: string;
  description?: string;
  /** Route path, e.g. "/about". Metadata can't see the request path, so each
   *  page passes its own; it becomes the canonical unless canonicalUrl is set. */
  path: string;
  /** Overrides the path-derived canonical. null omits the canonical. */
  canonicalUrl?: string | null;
  ogTitle?: string;
  ogDescription?: string;
  /** "" removes the share image (client-hosted event pages). */
  ogImage?: string;
  ogType?: "website" | "article";
  robots?: string;
  /** Set false on pages that should not carry the Bamboo Reports name in
   *  their title (e.g. client-hosted event pages). */
  appendSiteName?: boolean;
}

/**
 * Page metadata with the same rules the old client-side useSEO hook applied:
 * site-name suffix, default description/robots/share image, OG and Twitter
 * falling back to the page title and description, and a canonical for every
 * page unless explicitly removed. Meta keywords are intentionally not emitted.
 */
export function seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  robots = DEFAULT_ROBOTS,
  appendSiteName = true,
}: SEOConfig): Metadata {
  const fullTitle =
    !appendSiteName || title.includes(SITE_NAME) ? title : `${title} - ${SITE_NAME}`;
  const canonical = canonicalUrl === undefined ? `${SITE_URL}${path}` : canonicalUrl;
  const socialUrl = canonical ?? `${SITE_URL}${path}`;
  const socialTitle = ogTitle ?? fullTitle;
  const socialDescription = ogDescription ?? description;
  // Page-level openGraph/twitter objects replace the layout's wholesale, so
  // leaving images out here really does drop the default share image.
  const images = ogImage ? [ogImage] : undefined;

  return {
    title: { absolute: fullTitle },
    description,
    robots,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: ogType,
      url: socialUrl,
      title: socialTitle,
      description: socialDescription,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images,
    },
  };
}
