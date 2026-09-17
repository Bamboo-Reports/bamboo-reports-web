import { notFound } from "next/navigation";
import { JsonLd } from "@/components/StructuredData";
import { GCC_TRACKER_ENABLED } from "@/lib/featureFlags";
import { seo, SITE_URL } from "@/lib/seo";
import { TRACKER_V2_STATS } from "@/lib/trackerStatsV2";
import Tracker from "@/views/Tracker";

const CANONICAL = `${SITE_URL}/gcc/`;
const nf = (n: number) => n.toLocaleString("en-US");
const stats = TRACKER_V2_STATS;

export const metadata = seo({
  title: "India GCC Tracker: Companies, Centres & Headcount | Bamboo Reports",
  path: "/gcc/",
  description: `Live India GCC numbers, no sign-in: ${nf(stats.companies)} companies, ${nf(stats.centers)} centres, ${nf(stats.upcomingCenters)} upcoming centres and a headcount of ${nf(stats.employees)}. Filter by industry and city to size your market.`,
  canonicalUrl: CANONICAL,
});

// Same schemas the old post-build prerender injected into /gcc/. The
// ItemList of published company pages returns with the phase 4 data loader.
const SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Bamboo Reports",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Global Capability Centers (GCCs) in India",
    description: `Directory of ${nf(stats.companies)} GCCs in India across ${nf(stats.centers)} centres (${nf(stats.upcomingCenters)} upcoming), with a tracked headcount of ${nf(stats.employees)}.`,
    creator: { "@id": `${SITE_URL}/#organization` },
    url: CANONICAL,
    spatialCoverage: { "@type": "Country", name: "India" },
    license: `${SITE_URL}/terms-conditions`,
    variableMeasured: [
      { "@type": "PropertyValue", name: "GCC companies tracked", value: stats.companies },
      { "@type": "PropertyValue", name: "GCC centres in India", value: stats.centers },
      { "@type": "PropertyValue", name: "Upcoming GCC centres", value: stats.upcomingCenters },
      { "@type": "PropertyValue", name: "GCC headcount tracked", value: stats.employees },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "GCCs in India", item: CANONICAL },
    ],
  },
];

export default function GccTrackerPage() {
  // The tracker is hidden unless enabled for the deployment (build-time flag).
  if (!GCC_TRACKER_ENABLED) notFound();

  return (
    <>
      {SCHEMAS.map((schema) => (
        <JsonLd key={schema["@type"]} data={schema} />
      ))}
      <Tracker />
    </>
  );
}
