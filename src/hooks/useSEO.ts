import { useEffect } from "react";

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  /** Set false on pages that should not carry the Bamboo Reports name in
   *  their title (e.g. client-hosted event pages). */
  appendSiteName?: boolean;
}

const DEFAULT_CONFIG: SEOConfig = {
  title: "GCC GTM Enablement | Bamboo Reports",
  description: "Verified India GCC data, account intelligence, and analyst-led research for GTM teams building their India GCC opportunity.",
  keywords: "GCC GTM enablement, India GCC data, GCC account intelligence, GCC market intelligence, Bamboo Reports",
  ogType: "website",
  ogImage: "https://www.bambooreports.com/logo.png",
  appendSiteName: true,
};

export const useSEO = (config: SEOConfig = {}) => {
  useEffect(() => {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

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
    setMetaTag("keywords", mergedConfig.keywords || "");

    const ogTitle = mergedConfig.ogTitle || mergedConfig.title || "";
    const ogDescription = mergedConfig.ogDescription || mergedConfig.description || "";

    setMetaTag("og:title", ogTitle, true);
    setMetaTag("og:description", ogDescription, true);
    setMetaTag("og:type", mergedConfig.ogType || "website", true);

    // index.html declares the Twitter tags with property="", so write the same
    // attribute here instead of creating duplicate name="" variants.
    setMetaTag("twitter:card", "summary_large_image", true);
    setMetaTag("twitter:title", ogTitle, true);
    setMetaTag("twitter:description", ogDescription, true);

    // Passing ogImage: "" removes the share image entirely (used on pages
    // that must not present the Bamboo Reports logo, e.g. client events).
    for (const tag of ["og:image", "twitter:image"]) {
      if (mergedConfig.ogImage) {
        setMetaTag(tag, mergedConfig.ogImage, true);
      } else {
        document.querySelector(`meta[property="${tag}"]`)?.remove();
      }
    }

    // Set or remove the canonical URL — pages without one must not inherit
    // the previous page's canonical.
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (mergedConfig.canonicalUrl) {
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = mergedConfig.canonicalUrl;
    } else if (link) {
      link.remove();
    }

    // Cleanup function
    return () => {
      document.title = previousTitle;
    };
  }, [config.title, config.description, config.keywords, config.ogTitle, config.ogDescription, config.ogImage, config.ogType, config.canonicalUrl, config.appendSiteName]);
};

export default useSEO;
