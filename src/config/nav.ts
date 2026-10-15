/**
 * Single source of truth for the navbar and footer links.
 */

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  href?: string;
  items: NavItem[];
};

// A to Z, matching the footer column.
export const offerNav: NavItem[] = [
  { label: "Account & Market Intel", href: "/account-market-intelligence" },
  { label: "GCC ABM", href: "/gcc-abm" },
  { label: "GCC Prospect Data", href: "/gcc-prospect-data" },
];

// Grouped the way researchnxt.com groups its libraries: proof and research
// sit together under Resources.
export const resourcesNav: NavItem[] = [
  { label: "Reports", href: "/resources" },
  { label: "Success stories", href: "/success-stories" },
];

export const primaryNav: (NavItem | NavGroup)[] = [
  { label: "Platform", href: "/platform" },
  { label: "What we offer", items: offerNav },
  { label: "Resources", items: resourcesNav },
  { label: "About us", href: "/about" },
];

export const footerNav: NavGroup[] = [
  { label: "What we offer", items: offerNav },
  { label: "Resources", items: resourcesNav },
  {
    label: "Company",
    items: [
      { label: "Platform", href: "/platform" },
      { label: "About us", href: "/about" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms and conditions", href: "/terms-conditions" },
];

export const SITE_EMAIL = "enquiry@bambooreports.com";
export const LINKEDIN_URL = "https://www.linkedin.com/company/bamboo-reports/";

export function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return "items" in item;
}
