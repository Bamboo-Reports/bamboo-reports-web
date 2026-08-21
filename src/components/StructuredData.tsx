import { useCallback, useEffect } from "react";

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

interface EventData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  url: string;
  locationName: string;
  addressLocality: string;
  addressCountry: string;
  organizerName: string;
  organizerUrl: string;
}

// Discriminated union type for data prop based on type
type StructuredDataType =
  | { type: "organization"; data?: never }
  | { type: "website"; data?: never }
  | { type: "product"; data?: ProductData }
  | { type: "event"; data: EventData }
  | { type: "faq"; data?: FAQData }
  | { type: "breadcrumb"; data?: BreadcrumbData };

type StructuredDataProps = StructuredDataType;

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  const getSchemaMarkup = useCallback(() => {
    switch (type) {
      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://bambooreports.com/#organization",
          "name": "Bamboo Reports",
          "description": "Leading GCC Intelligence platform providing actionable insights on Global Capability Centres across India. Comprehensive market intelligence, GTM research, and GCC benchmarking solutions. A Research NXT product.",
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
          "description": data?.description || "Comprehensive GCC Intelligence platform with India's largest repository of Global Capability Centres data, GTM research, and market intelligence solutions.",
          "operatingSystem": "Web",
          "aggregateRating": data?.rating ? {
            "@type": "AggregateRating",
            "ratingValue": data.rating.value,
            "reviewCount": data.rating.count
          } : undefined,
          "featureList": data?.features || [
            "2,400+ MNC GCC Database",
            "5900+ GCC Centres Mapping",
            "India GCC Market Intelligence",
            "GTM Research Tools",
            "GCC Contact Database",
            "Real-time GCC Insights"
          ]
        };

      case "event":
        return {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": data.name,
          "description": data.description,
          "startDate": data.startDate,
          "endDate": data.endDate,
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "url": data.url,
          "location": {
            "@type": "Place",
            "name": data.locationName,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": data.addressLocality,
              "addressCountry": data.addressCountry
            }
          },
          "organizer": {
            "@type": "Organization",
            "name": data.organizerName,
            "url": data.organizerUrl
          }
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
          "itemListElement": data?.items?.map((item, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          })) || []
        };

      default:
        return null;
    }
  }, [type, data]);

  useEffect(() => {
    const schema = getSchemaMarkup();
    if (!schema) return;

    const scriptId = `structured-data-${type}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, getSchemaMarkup]);

  return null;
};

export default StructuredData;
