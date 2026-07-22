// Copy and imagery shared by /platform and the /v1../v4 hero variants.
// The variants differ only in their hero, so everything below the fold
// lives here and in PlatformBody rather than being duplicated per page.

export const HERO_SHOT = {
  src: "https://xd2d5vjp71.ufs.sh/f/0V27W3GsJ8f2kyQ1ard2BXN70GreCs2D1mJHRucVizM9KI3O",
  alt: "Bamboo Reports platform: accounts, centres and prospects explorable across data, filters and map",
  width: 7680,
  height: 4800,
};

export const HERO_HEADLINE = {
  lead: "India’s GCC market,",
  trail: "down to the centre.",
};

export const HERO_DESCRIPTION =
  "Move from the market landscape to the individual accounts, centres and decision-makers behind it with structured intelligence built for GTM and strategy teams.";

// Ordered as the work is actually done, not as the product is built:
// scope a market, find it on the ground, scan it, open one account,
// keep the query, run it every week. The verbs carry that sequence, so
// the numbering is information rather than decoration.
export const STAGES: Array<{
  id: string;
  verb: string;
  title: string;
  headline: string;
  desc: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}> = [
  {
    id: "filters",
    verb: "Scope",
    title: "Filters",
    headline: "Ask precise questions, get precise answers.",
    desc: "Include, exclude and band any combination of country, industry, revenue, headcount, tech stack, function and seniority, with alias-aware search that finds a company by its brand name or its former identity.",
    src: "https://xd2d5vjp71.ufs.sh/f/0V27W3GsJ8f2EOlAl3HfMHwsL89m3gv7PNkiCYKtRFJ1ucB0",
    alt: "Bamboo Reports filters across account, centre and prospect attributes",
    width: 2800,
    height: 3920,
  },
  {
    id: "map",
    verb: "Locate",
    title: "Map",
    headline: "See where the opportunity actually is.",
    desc: "Thousands of delivery centres on an interactive cluster map, rolled up into a state-level heat map, so geography becomes a filter rather than a guess.",
    src: "https://xd2d5vjp71.ufs.sh/f/0V27W3GsJ8f2hwn1bjtMDouzwg3ZY21PLxb65Ut0RTkyIAeN",
    alt: "Bamboo Reports map: interactive cluster map and state-level heat map of delivery centres",
    width: 6080,
    height: 2728,
  },
  {
    id: "data-view",
    verb: "Scan",
    title: "Data View",
    headline: "Every account, centre, and contact in one clean, fast table.",
    desc: "Every Account, Centre, Prospect and Service in a single structured grid built for speed at scale, where you can sort, scan and open a full detail view on any record in one click.",
    src: "https://xd2d5vjp71.ufs.sh/f/0V27W3GsJ8f2prKtyxXrHBoz1jGMIlnYvTFRQiLZUkPcN5mg",
    alt: "Bamboo Reports data view: accounts, centres, prospects and services in a single grid",
    width: 6076,
    height: 2256,
  },
  {
    id: "extended-data-view",
    verb: "Drill",
    title: "Extended Data View",
    headline: "Open any account, see every centre behind it.",
    desc: "Click into any account to unfold every delivery centre tied to it, mapped and tabulated with headcount, location and centre type, so you can see at a glance whether a company runs one office or twenty.",
    src: "https://xd2d5vjp71.ufs.sh/f/0V27W3GsJ8f2eQJTklrIRFAYJNvBOT3lyhjVbQW9pUgKr4GZ",
    alt: "Bamboo Reports extended data view: an account's linked centres with headcount, location and centre type",
    width: 7320,
    height: 3760,
  },
  {
    id: "saved-filters",
    verb: "Keep",
    title: "Saved Filters",
    headline: "Build it once, use it forever.",
    desc: "Save any filter combination to the cloud, pull it back up in a click and share it with the team, so a weekly prospecting list or a standing market view survives without re-explaining the criteria.",
    src: "https://xd2d5vjp71.ufs.sh/f/0V27W3GsJ8f2B8T3GtFh8k2dXSZtvPegjaRiOoUJ1E7C0zG5",
    alt: "Bamboo Reports saved filters manager, shareable across the team",
    width: 4612,
    height: 3352,
  },
  {
    id: "quick-actions",
    verb: "Operate",
    title: "Quick Actions",
    headline: "Everything you need, one click away.",
    desc: "Refresh your data, check what's changed, switch to dark mode or manage your account from a single always-accessible bar, with no hunting through menus to catch up on the latest updates.",
    src: "https://xd2d5vjp71.ufs.sh/f/0V27W3GsJ8f2f2yUL2EqyfrhepADqo4KsalcwOndS5NgEMzj",
    alt: "Bamboo Reports quick actions bar for refresh, updates, dark mode and account management",
    width: 4704,
    height: 3452,
  },
];

export const CAPABILITIES = [
  { title: "Layered filters", desc: "Stack geography, sector, function, size and centre status to carve out the perfect segment in seconds." },
  { title: "Global search", desc: "Reach any account, centre or prospect with a single keystroke. The whole ecosystem at your fingertips." },
  { title: "Table & grid modes", desc: "Scan fast in grid view, analyse deep in table view. Same data, your way of working." },
  { title: "Linked entities", desc: "Accounts, centres, prospects and headcount cross-reference automatically. No reconciliation, no joins." },
  { title: "Clean exports", desc: "Push any slice straight into your CRM, Excel or analytics stack. Always tidy, always ready to ship." },
  { title: "Built centre by centre", desc: "Bottom-up research with 250+ structured data points per GCC centre. Current, centre-level data, not a 12-month-old published report." },
];

export const PERSONAS = [
  { name: "GTM leaders & sellers", desc: "Surface ICP-fit accounts, prioritise the right centres and put a clean, ranked target list in every seller's hands every Monday morning." },
  { name: "GCC site & PMO leaders", desc: "Benchmark against the peer set, watch the ecosystem move in real time and walk into your next location decision with conviction." },
  { name: "Staffing, RPO & talent firms", desc: "Reach the right HR and function leaders across every growing centre in India, mapped by role, function and headcount." },
  { name: "CRE, facilities & infra", desc: "See new centres, expansions and relocations weeks before your competitors do, and turn signal into pipeline." },
];

export const PLATFORM_SEO = {
  title: "Platform | The Definitive India GCC Intelligence Workspace | Bamboo Reports",
  description:
    "The intelligence layer India's GCC ecosystem was missing. 2,400+ accounts, 5,900+ centres and 60K+ named decision-makers, explorable across map, data and filters.",
  keywords:
    "GCC platform, India GCC intelligence, GCC analytics, GCC database, account analytics, centre analytics",
};
