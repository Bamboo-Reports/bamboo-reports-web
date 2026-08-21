// Supplies route-specific metadata in the initial SPA response and turns the
// React catch-all into a real HTTP 404 for unknown URLs. Static GCC pages keep
// their build-time metadata and status codes.
const SITE = "https://bambooreports.com";

const PAGE_META = {
  "/": {
    title: "GCC GTM Enablement | Bamboo Reports",
    description: "Verified India GCC data, account intelligence, and analyst-led research for GTM teams building their India GCC opportunity.",
  },
  "/about": {
    title: "About Bamboo Reports | The India GCC dataset built centre by centre",
    description: "Bamboo Reports profiles 5,900+ individual India GCC centres against 2,400+ parent accounts: what each centre does, who runs it and what it runs on. A Research NXT product, built since 2022.",
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
    title: "Resources | GCC Reports & Reads | Bamboo Reports",
    description: "Market reports, insights, and curated long-form reads from the team tracking India's GCC ecosystem centre by centre.",
  },
  "/reports": {
    title: "Reports | India GCC Intelligence | Bamboo Reports",
    description: "Market reports and insights on India's GCC ecosystem: market reads, sector deep-dives, and focused research from Bamboo Reports.",
  },
  "/reports/india-gcc-report-q2-2026": {
    title: "India GCC Quarterly Report, Q2 2026 (April to June) | Bamboo Reports",
    description: "The Q2 2026 India GCC Quarterly Report covers 110 centres across 99 companies, including new entrants, expansions and hiring shifts. Free, publishing late August 2026.",
    image: `${SITE}/gcc/india-gcc-report-share-card-q2-2026.png`,
    type: "article",
  },
  "/reports/india-gcc-report-q2-2026/thank-you": {
    title: "You're all set | Bamboo Reports",
    description: "Your registration for the Q2 2026 India GCC report is confirmed. The report reaches your inbox the day it releases.",
    robots: "noindex, follow",
  },
  "/reads": {
    title: "Interesting Reads | Bamboo Reports",
    description: "Whitepapers and long-form reads on the ideas shaping the enterprise, curated for senior leaders by Bamboo Reports.",
  },
  "/reads/agentic-enterprise": {
    title: "The Agentic Enterprise · Thoughtworks × AWS Whitepaper",
    description: "Build an enterprise that adapts, not just automates. Download the Thoughtworks and AWS whitepaper on continuous evolution and reliable impact.",
    type: "article",
  },
  "/events/agentic-supply-chain-control-tower": {
    title: "Agentic Supply Chain Control Tower · Retail Roundtable by Thoughtworks",
    description: "A retail roundtable hosted by Thoughtworks on moving from supply-chain signals to coordinated action. Bengaluru, 10 September 2026.",
    image: null,
  },
  "/events/agentic-supply-chain-control-tower/thank-you": {
    title: "Registration received · Agentic Supply Chain Control Tower",
    description: "Your registration for the Agentic Supply Chain Control Tower roundtable has been received.",
    image: null,
    robots: "noindex, follow",
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
};

const STATIC_GCC_ROOT = "/gcc";
const DEFAULT_IMAGE = `${SITE}/logo.png`;
const INDEX_ROBOTS = "index, follow, max-image-preview:large";
const NOT_FOUND_META = {
  title: "Page Not Found | Bamboo Reports",
  description: "The requested Bamboo Reports page could not be found.",
  robots: "noindex, follow",
  image: null,
};

const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const upsertMeta = (html, attribute, name, content) => {
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${escapeRegex(name)}["'])[^>]*>`, "i");
  const tag = `<meta ${attribute}="${name}" content="${escapeHtml(content)}">`;
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
};

const removeMeta = (html, attribute, name) => html.replace(
  new RegExp(`\\s*<meta\\b(?=[^>]*\\b${attribute}=["']${escapeRegex(name)}["'])[^>]*>`, "gi"),
  ""
);

const upsertCanonical = (html, canonical) => {
  const pattern = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i;
  const tag = `<link rel="canonical" href="${escapeHtml(canonical)}">`;
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
};

const removeCanonical = (html) => html.replace(
  /\s*<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi,
  ""
);

const applyMeta = (html, meta, canonical) => {
  const robots = meta.robots || INDEX_ROBOTS;
  let out = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  out = upsertMeta(out, "name", "title", meta.title);
  out = upsertMeta(out, "name", "description", meta.description);
  out = upsertMeta(out, "name", "robots", robots);
  out = upsertMeta(out, "property", "og:type", meta.type || "website");
  out = upsertMeta(out, "property", "og:title", meta.title);
  out = upsertMeta(out, "property", "og:description", meta.description);
  out = upsertMeta(out, "name", "twitter:card", "summary_large_image");
  out = upsertMeta(out, "name", "twitter:title", meta.title);
  out = upsertMeta(out, "name", "twitter:description", meta.description);
  out = removeMeta(out, "name", "keywords");

  if (canonical) {
    out = upsertCanonical(out, canonical);
    out = upsertMeta(out, "property", "og:url", canonical);
    out = upsertMeta(out, "name", "twitter:url", canonical);
  } else {
    out = removeCanonical(out);
    out = removeMeta(out, "property", "og:url");
    out = removeMeta(out, "name", "twitter:url");
  }

  const image = meta.image === undefined ? DEFAULT_IMAGE : meta.image;
  if (image) {
    out = upsertMeta(out, "property", "og:image", image);
    out = upsertMeta(out, "name", "twitter:image", image);
  } else {
    out = removeMeta(out, "property", "og:image");
    out = removeMeta(out, "name", "twitter:image");
  }
  return out;
};

export default async (request, context) => {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const response = await context.next();

  if (response.status >= 300 && response.status < 400) return response;
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  const html = await response.text();
  // Generated GCC and any other standalone HTML pages do not contain the
  // Vite shell's empty root. Their metadata and response status are already
  // complete, so leave them byte-for-byte unchanged.
  if (!html.includes('<div id="root"></div>')) {
    return new Response(html, { status: response.status, headers: response.headers });
  }

  const meta = PAGE_META[pathname];
  const isKnownRoute = Boolean(meta) || pathname === STATIC_GCC_ROOT;
  const selectedMeta = meta || NOT_FOUND_META;
  const canonical = meta ? `${SITE}${pathname === "/" ? "/" : pathname}` : null;
  const rewritten = applyMeta(html, selectedMeta, canonical);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  if (selectedMeta.robots?.startsWith("noindex")) {
    headers.set("X-Robots-Tag", selectedMeta.robots);
  }

  return new Response(rewritten, {
    status: isKnownRoute ? response.status : 404,
    headers,
  });
};

export const config = { path: "/*" };
