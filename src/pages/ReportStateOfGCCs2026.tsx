import { useSEO } from "@/hooks/useSEO";
import ReportPageTemplate from "./reports/ReportPageTemplate";

const ReportStateOfGCCs2026 = () => {
  useSEO({
    title: "State of GCCs in India 2026 Report | Bamboo Reports",
    description: "State of GCCs in India - A 2026 Report covering the Agentic AI shift, tier-2 city momentum, and market opportunity signals across 5800+ GCCs.",
    keywords: "State of GCCs in India 2026, GCC report 2026, India GCC market, Agentic AI GCCs, Tier-2 cities GCC, GCC intelligence India",
    canonicalUrl: "https://www.bambooreports.com/reports/state-of-gccs-2026",
  });
  return (
    <ReportPageTemplate
      title="State of GCCs in India - A 2026 Report"
      description="The 2026 reset on India GCCs: agentic AI adoption, ownership of the product lifecycle, and a shift toward tier-2 hubs that are redefining cost, talent, and speed."
      formId="260291234006446"
      formTitle="Download report"
      formDescription="Get the full report and executive-ready highlights."
    />
  );
};

export default ReportStateOfGCCs2026;
