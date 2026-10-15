import type { Metadata } from "next";

export const SITE_URL = "https://bambooreports.com";

const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;
const INDEX_ROBOTS = "index, follow, max-image-preview:large";

interface PageMeta {
  title: string;
  description: string;
  /** Social title when it should differ from the document title. */
  ogTitle?: string;
  /** null removes the share image (e.g. the 404 page). */
  image?: string | null;
  type?: "website" | "article";
  robots?: string;
  /** null omits the canonical URL. Defaults to SITE_URL + path. */
  canonical?: string | null;
}

const PAGE_META = {
  "/": {
    title: "GCC GTM Enablement | Bamboo Reports",
    description: "Verified India GCC data, account intelligence and analyst-led research for teams selling into India's Global Capability Centres.",
  },
  "/about": {
    title: "About Bamboo Reports | India GCC data, centre by centre",
    description: "Bamboo Reports profiles 6,100+ India GCC centres across 2,400+ parent accounts: what each centre does, who runs it and what it runs on. Built since 2022.",
  },
  "/account-market-intelligence": {
    title: "India GCC Account & Market Intelligence | Bamboo Reports",
    description: "Centre-level data and reports on India's GCCs by city, sector, function or company, from short sector reports to custom research.",
  },
  "/gcc-abm": {
    title: "GCC ABM | Account-Based Marketing for GCCs | Bamboo Reports",
    description: "End-to-end ABM campaigns aimed at decision-makers in India's Global Capability Centres. Bamboo Reports supplies the data and runs the campaigns.",
  },
  "/gcc-prospect-data": {
    title: "GCC Prospect Data | India GCC Contacts | Bamboo Reports",
    description: "Verified decision-makers at India's Global Capability Centres, across engineering, product, data, finance, HR, IT and more. Refreshed weekly.",
  },
  "/platform": {
    title: "India GCC Intelligence Platform | Bamboo Reports",
    description: "Search India GCC accounts, compare Global Capability centre locations and find the decision-makers behind them with Bamboo Reports.",
  },
  "/success-stories": {
    title: "Success Stories | Bamboo Reports",
    description: "Two client engagements: BFSI GCC strategy for a global IT services firm, and GCC benchmarking, talent and expansion research for a medical device company.",
  },
  "/resources": {
    title: "Resources | India GCC Reports | Bamboo Reports",
    description: "Reports on India's Global Capability Centres, including the India GCC Quarterly Report, from the team tracking the market centre by centre.",
  },
  "/reports/india-gcc-report-q2-2026": {
    title: "India GCC Quarterly Report, Q2 2026 | Bamboo Reports",
    ogTitle: "India GCC Quarterly Report, Q2 2026 (April to June)",
    description: "The Q2 2026 India GCC Quarterly Report: 110 centres across 99 companies and 27 cities, 40 first-time entrants, 75K+ announced roles and AI-first centres.",
    image: `${SITE_URL}/gcc/india-gcc-report-share-card-q2-2026.png`,
    type: "article",
  },
  "/gcc-companies": {
    title: "India GCC Companies Directory | Bamboo Reports",
    description: "Global companies with Global Capability Centres in India: centre locations, centre types, functions, opening years and headcount, from Bamboo Reports.",
  },
  "/map-your-gcc-opportunity": {
    title: "Map your India GCC opportunity | Bamboo Reports",
    description: "Map your India GCC opportunity with Bamboo Reports.",
    // Form-only page with no content of its own.
    robots: "noindex, follow",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Bamboo Reports",
    description: "Privacy Policy for Bamboo Reports: how we collect, use and protect your information.",
  },
  "/terms-conditions": {
    title: "Terms & Conditions | Bamboo Reports",
    description: "Terms and Conditions for Bamboo Reports: terms of service, usage rights and user responsibilities.",
  },
  "/thank-you": {
    title: "Thank You | Bamboo Reports",
    description: "Thank you for reaching out to Bamboo Reports. Our team will review your request and get in touch shortly.",
    robots: "noindex, follow",
  },
} satisfies Record<string, PageMeta>;

export type SitePath = keyof typeof PAGE_META;

export const NOT_FOUND_META: PageMeta = {
  title: "Page Not Found | Bamboo Reports",
  description: "The requested Bamboo Reports page could not be found.",
  robots: "noindex, follow",
  image: null,
  canonical: null,
};

export const buildMetadata = (meta: PageMeta, path?: string): Metadata => {
  const canonical =
    meta.canonical === undefined && path ? `${SITE_URL}${path}` : meta.canonical ?? undefined;
  const image = meta.image === undefined ? DEFAULT_IMAGE : meta.image;
  const socialTitle = meta.ogTitle ?? meta.title;

  return {
    title: { absolute: meta.title },
    description: meta.description,
    robots: meta.robots ?? INDEX_ROBOTS,
    alternates: { canonical },
    openGraph: {
      type: meta.type ?? "website",
      title: socialTitle,
      description: meta.description,
      url: canonical,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: meta.description,
      images: image ? [image] : undefined,
    },
  };
};

export const pageMetadata = (path: SitePath): Metadata => buildMetadata(PAGE_META[path], path);

/** Title and description for a page, e.g. to reuse in structured data. */
export const pageMeta = (path: SitePath): PageMeta => PAGE_META[path];

/** Indexable paths, in PAGE_META order. Feeds the sitemap. */
export const indexablePaths = (): SitePath[] =>
  (Object.keys(PAGE_META) as SitePath[]).filter((path) => {
    const meta: PageMeta = PAGE_META[path];
    return !meta.robots?.includes("noindex");
  });
