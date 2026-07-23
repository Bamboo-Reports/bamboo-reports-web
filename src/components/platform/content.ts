// Copy and imagery shared by /platform and the /v1../v4 hero variants.
// The variants differ only in their hero, so everything below the fold
// lives here and in PlatformBody rather than being duplicated per page.

export const HERO_SHOT = {
  src: "/platform/page/hero-1280.webp",
  srcSet:
    "/platform/page/hero-640.webp 640w, /platform/page/hero-1280.webp 1280w, /platform/page/hero-1920.webp 1920w",
  sizes: "(min-width: 1280px) 1152px, calc(100vw - 24px)",
  alt: "Bamboo Reports showing accounts, centres and prospects across data, filters and geographic views",
  width: 7680,
  height: 4800,
};

export const HERO_HEADLINE = {
  lead: "Know every GCC in India.",
  trail: "Act on the right ones.",
};

export const HERO_DESCRIPTION =
  "Search accounts. See every centre by location. Find the decision-makers behind them. Bamboo Reports gives GTM and strategy teams the data to choose where to act next.";

// Ordered as the work is actually done, not as the product is built:
// scope a market, find it on the ground, scan it, open an account,
// keep the query, run it regularly.
export const STAGES: Array<{
  id: string;
  verb: string;
  headline: string;
  desc: string;
  src: string;
  srcSet: string;
  alt: string;
  width: number;
  height: number;
}> = [
  {
    id: "filters",
    verb: "Define",
    headline: "Define the market you want.",
    desc: "Combine geography, industry, revenue, headcount, technology, function and seniority. Include what matters. Exclude what does not. Find companies by current or former names.",
    src: "/platform/page/filters-1280.webp",
    srcSet:
      "/platform/page/filters-640.webp 640w, /platform/page/filters-1280.webp 1280w, /platform/page/filters-1920.webp 1920w",
    alt: "Bamboo Reports filters across account, centre and prospect attributes",
    width: 5132,
    height: 4880,
  },
  {
    id: "map",
    verb: "Locate",
    headline: "See where every centre operates.",
    desc: "See Global Capability centres by location, cluster and state. Compare where companies operate, spot concentrations and turn geography into a search criterion.",
    src: "/platform/page/map-1280.webp",
    srcSet:
      "/platform/page/map-640.webp 640w, /platform/page/map-1280.webp 1280w, /platform/page/map-1920.webp 1920w",
    alt: "Bamboo Reports map: interactive cluster map and state-level heat map of Global Capability centres",
    width: 6080,
    height: 2728,
  },
  {
    id: "data-view",
    verb: "Prioritise",
    headline: "Find the accounts worth your time.",
    desc: "Sort and compare accounts, centres, prospects and services in one structured view. Open any record for the detail behind the row.",
    src: "/platform/page/data-view-1280.webp",
    srcSet:
      "/platform/page/data-view-640.webp 640w, /platform/page/data-view-1280.webp 1280w, /platform/page/data-view-1920.webp 1920w",
    alt: "Bamboo Reports data view with accounts, centres, prospects and services in a structured grid",
    width: 6076,
    height: 2256,
  },
  {
    id: "extended-data-view",
    verb: "Understand",
    headline: "See the full India footprint.",
    desc: "Open an account to see every linked Global Capability centre, with location, headcount and centre type. Understand the company behind the logo before you make contact.",
    src: "/platform/page/account-detail-1280.webp",
    srcSet:
      "/platform/page/account-detail-640.webp 640w, /platform/page/account-detail-1280.webp 1280w, /platform/page/account-detail-1920.webp 1920w",
    alt: "Bamboo Reports extended data view: an account's linked centres with headcount, location and centre type",
    width: 7320,
    height: 3760,
  },
  {
    id: "saved-filters",
    verb: "Return",
    headline: "Return to the same answer next week.",
    desc: "Save any search, reopen it in one click and share it with your team. Keep recurring prospect lists and market views consistent without rebuilding the criteria.",
    src: "/platform/page/saved-filters-current-1280.webp",
    srcSet:
      "/platform/page/saved-filters-current-640.webp 640w, /platform/page/saved-filters-current-1280.webp 1280w, /platform/page/saved-filters-current-1920.webp 1920w",
    alt: "Bamboo Reports saved filters manager, shareable across the team",
    width: 4612,
    height: 3352,
  },
];

export const PERSONAS = [
  { name: "GTM leaders & sellers", desc: "Find ICP-fit accounts, rank the right centres and give every seller a target list they can explain." },
  { name: "GCC site & PMO leaders", desc: "Compare peer footprints, track market movement and bring stronger evidence to location and expansion decisions." },
  { name: "Staffing, RPO & talent firms", desc: "Find growing centres and reach the HR and function leaders behind their hiring demand." },
  { name: "CRE, facilities & infrastructure", desc: "Track new centres, expansions and relocations. Reach the companies creating demand in each market." },
];

export const PLATFORM_SEO = {
  title: "India GCC Intelligence Platform | Bamboo Reports",
  description:
    "Search India GCC accounts, compare Global Capability centre locations and find the decision-makers behind them with Bamboo Reports.",
  keywords:
    "GCC platform, India GCC intelligence, GCC analytics, GCC database, account analytics, centre analytics",
};
