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
}

const DEFAULT_CONFIG: SEOConfig = {
  title: "Bamboo Reports - Actionable Insights On Global Capability Centers",
  description: "GCC Intelligence platform with the largest repository of Global Capability Centers data. Access India GCC research, GCC trends, contact database, benchmarking, and market intelligence.",
  keywords: "GCC Intelligence, GCC Insights, GCC Contact Database, India GCC Research, GCC Trends, Market Intelligence India, Strategy intelligence platform, GCC benchmarking, ABM research, Roundtable as a Service, GTM research India, Global Capability Centers",
  ogType: "website",
};

export const useSEO = (config: SEOConfig = {}) => {
  useEffect(() => {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

    // Set page title
    const previousTitle = document.title;
    if (mergedConfig.title) {
      document.title = mergedConfig.title.includes("Bamboo Reports")
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

    // Set meta description
    if (mergedConfig.description) {
      setMetaTag("description", mergedConfig.description);
    }

    // Set keywords
    if (mergedConfig.keywords) {
      setMetaTag("keywords", mergedConfig.keywords);
    }

    // Set Open Graph tags
    if (mergedConfig.ogTitle || mergedConfig.title) {
      setMetaTag("og:title", mergedConfig.ogTitle || mergedConfig.title || "", true);
    }

    if (mergedConfig.ogDescription || mergedConfig.description) {
      setMetaTag("og:description", mergedConfig.ogDescription || mergedConfig.description || "", true);
    }

    if (mergedConfig.ogType) {
      setMetaTag("og:type", mergedConfig.ogType, true);
    }

    if (mergedConfig.ogImage) {
      setMetaTag("og:image", mergedConfig.ogImage, true);
    }

    // Set Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    if (mergedConfig.ogTitle || mergedConfig.title) {
      setMetaTag("twitter:title", mergedConfig.ogTitle || mergedConfig.title || "");
    }
    if (mergedConfig.ogDescription || mergedConfig.description) {
      setMetaTag("twitter:description", mergedConfig.ogDescription || mergedConfig.description || "");
    }

    // Set canonical URL
    if (mergedConfig.canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = mergedConfig.canonicalUrl;
    }

    // Cleanup function
    return () => {
      document.title = previousTitle;
    };
  }, [config.title, config.description, config.keywords, config.ogTitle, config.ogDescription, config.ogImage, config.ogType, config.canonicalUrl]);
};

export default useSEO;
