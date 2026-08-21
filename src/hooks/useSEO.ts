import { useEffect } from "react";

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  canonicalUrl?: string | null;
  robots?: string;
  /** Set false on pages that should not carry the Bamboo Reports name in
   *  their title (e.g. client-hosted event pages). */
  appendSiteName?: boolean;
}

export const SITE_URL = "https://bambooreports.com";

const DEFAULT_CONFIG: SEOConfig = {
  title: "GCC GTM Enablement | Bamboo Reports",
  description: "Verified India GCC data, account intelligence, and analyst-led research for GTM teams building their India GCC opportunity.",
  keywords: "GCC GTM enablement, India GCC data, GCC account intelligence, GCC market intelligence, Bamboo Reports",
  ogType: "website",
  ogImage: `${SITE_URL}/logo.png`,
  robots: "index, follow, max-image-preview:large",
  appendSiteName: true,
};

export const useSEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType,
  ogUrl,
  canonicalUrl,
  robots,
  appendSiteName,
}: SEOConfig = {}) => {
  useEffect(() => {
    const mergedConfig: SEOConfig = {
      ...DEFAULT_CONFIG,
      title: title ?? DEFAULT_CONFIG.title,
      description: description ?? DEFAULT_CONFIG.description,
      keywords: keywords ?? DEFAULT_CONFIG.keywords,
      ogTitle,
      ogDescription,
      ogImage: ogImage ?? DEFAULT_CONFIG.ogImage,
      ogType: ogType ?? DEFAULT_CONFIG.ogType,
      ogUrl,
      canonicalUrl,
      robots: robots ?? DEFAULT_CONFIG.robots,
      appendSiteName: appendSiteName ?? DEFAULT_CONFIG.appendSiteName,
    };

    // Set page title
    const previousTitle = document.title;
    if (mergedConfig.title) {
      document.title =
        !mergedConfig.appendSiteName || mergedConfig.title.includes("Bamboo Reports")
          ? mergedConfig.title
          : `${mergedConfig.title} - Bamboo Reports`;
    }

    // Helper function to set or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Every tag is written on every navigation (defaults fill the gaps), so a
    // page can never inherit the previous page's description/OG values.
    setMetaTag("description", mergedConfig.description || "");
    setMetaTag("robots", mergedConfig.robots || "index, follow, max-image-preview:large");

    // Google and Bing ignore meta keywords. Remove the legacy tag instead of
    // shipping a long, page-agnostic keyword list on every route.
    document.querySelector('meta[name="keywords"]')?.remove();

    const resolvedOgTitle = mergedConfig.ogTitle || mergedConfig.title || "";
    const resolvedOgDescription = mergedConfig.ogDescription || mergedConfig.description || "";

    setMetaTag("og:title", resolvedOgTitle, true);
    setMetaTag("og:description", resolvedOgDescription, true);
    setMetaTag("og:type", mergedConfig.ogType || "website", true);

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", resolvedOgTitle);
    setMetaTag("twitter:description", resolvedOgDescription);

    // Passing ogImage: "" removes the share image entirely (used on pages
    // that must not present the Bamboo Reports logo, e.g. client events).
    if (mergedConfig.ogImage) {
      setMetaTag("og:image", mergedConfig.ogImage, true);
      setMetaTag("twitter:image", mergedConfig.ogImage);
    } else {
      document.querySelector('meta[property="og:image"]')?.remove();
      document.querySelector('meta[name="twitter:image"]')?.remove();
    }

    const currentPath = window.location.pathname || "/";
    const automaticCanonical = `${SITE_URL}${currentPath}`;
    const resolvedCanonicalUrl =
      mergedConfig.canonicalUrl === undefined
        ? automaticCanonical
        : mergedConfig.canonicalUrl;
    const socialUrl = mergedConfig.ogUrl || resolvedCanonicalUrl || automaticCanonical;

    setMetaTag("og:url", socialUrl, true);
    setMetaTag("twitter:url", socialUrl);

    // Set or remove the canonical URL — pages without one must not inherit
    // the previous page's canonical.
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (resolvedCanonicalUrl) {
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = resolvedCanonicalUrl;
    } else if (link) {
      link.remove();
    }

    // Cleanup function
    return () => {
      document.title = previousTitle;
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogType, ogUrl, canonicalUrl, robots, appendSiteName]);
};

export default useSEO;
