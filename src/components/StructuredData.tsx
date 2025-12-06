import { useEffect } from "react";

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

// Discriminated union type for data prop based on type
type StructuredDataType =
  | { type: "organization"; data?: never }
  | { type: "product"; data?: ProductData }
  | { type: "faq"; data?: FAQData }
  | { type: "breadcrumb"; data?: BreadcrumbData };

type StructuredDataProps = StructuredDataType;

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  const getSchemaMarkup = () => {
    switch (type) {
      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Bamboo Reports",
          "description": "Leading GCC Intelligence platform providing actionable insights on Global Capability Centers across India. Comprehensive market intelligence, GTM research, and GCC benchmarking solutions.",
          "url": "https://www.bambooreports.com",
          "logo": "https://www.bambooreports.com/logo.png",
          "sameAs": [
            "https://www.linkedin.com/company/bambooreports"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "hello@bambooreports.com"
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
            "Global Capability Centers",
            "India GCC Market Intelligence",
            "GTM Research",
            "Market Intelligence Solutions",
            "GCC Benchmarking"
          ]
        };

      case "product":
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": data?.name || "Bamboo Reports GCC Intelligence Platform",
          "applicationCategory": "BusinessApplication",
          "description": data?.description || "Comprehensive GCC Intelligence platform with India's largest repository of Global Capability Centers data, GTM research, and market intelligence solutions.",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": data?.price || "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": data?.rating ? {
            "@type": "AggregateRating",
            "ratingValue": data.rating.value,
            "reviewCount": data.rating.count
          } : undefined,
          "featureList": data?.features || [
            "2400+ MNC GCC Database",
            "5800+ GCC Centers Mapping",
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
  };

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
  }, [type, data]);

  return null;
};

export default StructuredData;
