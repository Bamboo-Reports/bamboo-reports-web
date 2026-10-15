import { SITE_URL, pageMeta, type SitePath } from "@/lib/seo";

// Type definitions for structured data schemas
interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQData {
  questions: FAQQuestion[];
}

interface BreadcrumbItem {
  name: string;
  /** Absolute URL of the crumb. */
  url: string;
}

interface BreadcrumbData {
  items: BreadcrumbItem[];
}

interface ServiceData {
  /** Page the service is described on; supplies the URL and description. */
  path: SitePath;
  name: string;
  serviceType: string;
}

interface AboutPageData {
  path: SitePath;
}

// Inlined rather than referenced by @id alone: the full Organization node
// only exists on the home page, and crawlers resolve @id per page.
const PROVIDER = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": "Bamboo Reports",
  "url": `${SITE_URL}/`,
};

interface ProductRating {
  value: number;
  count: number;
}

interface ProductData {
  name?: string;
  description?: string;
  price?: string;
  rating?: ProductRating;
  features?: string[];
}

// Discriminated union type for data prop based on type
type StructuredDataType =
  | { type: "organization"; data?: never }
  | { type: "website"; data?: never }
  | { type: "product"; data?: ProductData }
  | { type: "faq"; data?: FAQData }
  | { type: "breadcrumb"; data: BreadcrumbData }
  | { type: "service"; data: ServiceData }
  | { type: "aboutPage"; data: AboutPageData };

type StructuredDataProps = StructuredDataType;

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  const getSchemaMarkup = () => {
    switch (type) {
      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://bambooreports.com/#organization",
          "name": "Bamboo Reports",
          "description": "Centre-level data and research on Global Capability Centres in India, for go-to-market, research and benchmarking work. A Research NXT product.",
          "url": "https://bambooreports.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://bambooreports.com/logo.png"
          },
          "parentOrganization": {
            "@type": "Organization",
            "name": "Research NXT",
            "url": "https://researchnxt.com"
          },
          "sameAs": [
            "https://www.linkedin.com/company/bamboo-reports/"
          ],
          "email": "enquiry@bambooreports.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "email": "enquiry@bambooreports.com",
            "availableLanguage": "English"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "knowsAbout": [
            "GCC Intelligence",
            "Global Capability Centres",
            "India GCC Market Intelligence",
            "GTM Research",
            "Market Intelligence Solutions",
            "GCC Benchmarking"
          ]
        };

      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://bambooreports.com/#website",
          "url": "https://bambooreports.com/",
          "name": "Bamboo Reports",
          "description": "India GCC intelligence, verified centre-level data, market research, and go-to-market enablement.",
          "inLanguage": "en-IN",
          "publisher": {
            "@id": "https://bambooreports.com/#organization"
          }
        };

      case "product":
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": "https://bambooreports.com/platform#software",
          "name": data?.name || "Bamboo Reports GCC Intelligence Platform",
          "url": "https://bambooreports.com/platform",
          "provider": {
            "@id": "https://bambooreports.com/#organization"
          },
          "applicationCategory": "BusinessApplication",
          "description": data?.description || "Search India's Global Capability Centres by account, centre and decision-maker, with GTM research and market reports.",
          "operatingSystem": "Web",
          "aggregateRating": data?.rating ? {
            "@type": "AggregateRating",
            "ratingValue": data.rating.value,
            "reviewCount": data.rating.count
          } : undefined,
          "featureList": data?.features || [
            "2,400+ MNC GCC Database",
            "6000+ GCC Centres Mapping",
            "India GCC Market Intelligence",
            "GTM Research Tools",
            "GCC Contact Database",
            "Weekly data refresh"
          ]
        };

      case "faq":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data?.questions?.map((q) => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer
            }
          })) || []
        };

      case "breadcrumb":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };

      case "service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name,
          "serviceType": data.serviceType,
          "description": pageMeta(data.path).description,
          "url": `${SITE_URL}${data.path}`,
          "provider": PROVIDER,
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        };

      case "aboutPage":
        return {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": pageMeta(data.path).title,
          "description": pageMeta(data.path).description,
          "url": `${SITE_URL}${data.path}`,
          "mainEntity": PROVIDER
        };

      default:
        return null;
    }
  };

  const schema = getSchemaMarkup();
  if (!schema) return null;

  // Rendered into the page HTML so crawlers see it without running JS.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
};

export default StructuredData;
