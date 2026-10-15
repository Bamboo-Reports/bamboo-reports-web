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
  | { type: "breadcrumb"; data: BreadcrumbData };

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
            "Real-time GCC Insights"
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
