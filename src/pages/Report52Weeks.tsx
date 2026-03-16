import { useSEO } from "@/hooks/useSEO";
import ReportPageTemplate from "./reports/ReportPageTemplate";

const Report52Weeks = () => {
  useSEO({
    title: "52 Weeks of GCC Momentum - India GCC Trends Report 2024-25",
    description: "Comprehensive 52-week analysis of India's Global Capability Centers growth. Track GCC trends, city-wise expansion, sector analysis, and MNC investment patterns across Bengaluru, Hyderabad, Pune, Chennai, and NCR.",
    keywords: "GCC Trends, India GCC Report, GCC Momentum, Global Capability Centers India, GCC Expansion, India GCC Research, GCC Market Intelligence, GCC benchmarking, MNC India Centers",
  });
  return (
    <ReportPageTemplate
      title="52 Weeks of GCC Momentum"
      description="A full year of India GCC movements - new centers, capability ramps, hiring velocity, and leadership shifts - packaged for GTM, strategy, and delivery teams."
      formId="253031221972448"
      formTitle="Download report"
      formDescription="Get the full deck plus export-ready views."
    />
  );
};

export default Report52Weeks;
