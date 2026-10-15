import type { Metadata } from "next";

export const SITE_URL = "https://bambooreports.com";

const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
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
    description: "Verified India GCC data, account intelligence, and analyst-led research for GTM teams building their India GCC opportunity.",
  },
  "/about": {
    title: "About Bamboo Reports | The India GCC dataset built centre by centre",
    description: "Bamboo Reports profiles 6,000+ individual India GCC centres against 2,400+ parent accounts: what each centre does, who runs it and what it runs on. A Research NXT product, built since 2022.",
  },
  "/account-market-intelligence": {
    title: "Account & Market Intelligence | India GCC Research | Bamboo Reports",
    description: "Structured, data-backed views of India's GCC ecosystem by city, sector, function, or company. From quick snapshots to deep-dive research.",
  },
  "/gcc-abm": {
    title: "GCC ABM | Account-Based Marketing for India GCCs | Bamboo Reports",
    description: "End-to-end ABM campaigns targeting decision-makers inside India's Global Capability Centres. Bamboo Reports brings the data, the audience, and the execution.",
  },
  "/gcc-prospect-data": {
    title: "GCC Prospect Data | Verified India GCC Decision-Makers | Bamboo Reports",
    description: "The most complete, structured contact intelligence on India's GCC ecosystem. Verified decision-makers across thousands of centres, ready to power your outreach.",
  },
  "/platform": {
    title: "India GCC Intelligence Platform | Bamboo Reports",
    description: "Search India GCC accounts, compare Global Capability centre locations and find the decision-makers behind them with Bamboo Reports.",
  },
  "/success-stories": {
    title: "Success Stories | Bamboo Reports",
    description: "Proof that the Bamboo Reports model works across solution providers and GCCs alike. Explore GCC strategy, intelligence, benchmarking, talent, and expansion outcomes.",
  },
  "/resources": {
    title: "Resources | India GCC Reports | Bamboo Reports",
    description: "Market reports from the team tracking India's GCC ecosystem centre by centre.",
  },
  "/reports/india-gcc-report-q2-2026": {
    title: "India GCC Quarterly Report, Q2 2026 (April to June) | Bamboo Reports",
    ogTitle: "India GCC Quarterly Report, Q2 2026 (April to June)",
    description: "The Q2 2026 India GCC Quarterly Report tracks 110 centre events across 99 companies and 27 cities, including 40 first-time entrants, 75K+ announced roles and the rise of AI-first centres.",
    image: `${SITE_URL}/gcc/india-gcc-report-share-card-q2-2026.png`,
    type: "article",
  },
  "/map-your-gcc-opportunity": {
    title: "Map your India GCC opportunity | Bamboo Reports",
    description: "Map your India GCC opportunity with Bamboo Reports.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Bamboo Reports",
    description: "Privacy Policy for Bamboo Reports. Learn how we collect, use, and safeguard your information.",
  },
  "/terms-conditions": {
    title: "Terms & Conditions | Bamboo Reports",
    description: "Terms and Conditions for Bamboo Reports. Read our terms of service, usage rights, and user responsibilities.",
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
