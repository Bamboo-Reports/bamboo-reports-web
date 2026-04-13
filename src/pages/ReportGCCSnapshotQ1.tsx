import { useSEO } from "@/hooks/useSEO";
import ReportPageTemplate from "./reports/ReportPageTemplate";

const ReportGCCSnapshotQ1 = () => {
  useSEO({
    title: "India GCC Snapshot Q1 FY25-26 - Quarterly GCC Intelligence Report",
    description: "Q1 2025-26 snapshot of India's Global Capability Centers with data on 5,800+ centers and 2,400+ MNCs. Analyze GCC investment patterns, talent hotspots, and capability shifts for strategic GTM planning.",
    keywords: "India GCC Snapshot, GCC Quarterly Report, GCC Intelligence, Global Capability Centers Q1, GCC Trends India, GCC Market Intelligence, GTM research India, India GCC Research",
  });
  return (
    <ReportPageTemplate
      title="India GCC Snapshot Q1 (FY25-26)"
      description="A quarterly checkpoint on India GCC growth - ready for executive reviews and GTM planning."
      formId="260531831450449"
      formTitle="Download report"
      formDescription="Get the full deck plus export-ready views."
    />
  );
};

export default ReportGCCSnapshotQ1;

