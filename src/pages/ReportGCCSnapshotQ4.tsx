import { useSEO } from "@/hooks/useSEO";
import ReportPageTemplate from "./reports/ReportPageTemplate";

const ReportGCCSnapshotQ4 = () => {
  useSEO({
    title: "India GCC Snapshot Q4 FY25-26 - Quarterly GCC Intelligence Report",
    description: "Q4 2025-26 snapshot of India's Global Capability Centers with data on 5,800+ centers and 2,400+ MNCs. Analyze GCC investment patterns, talent hotspots, and capability shifts for strategic GTM planning.",
    keywords: "India GCC Snapshot, GCC Quarterly Report, GCC Intelligence, Global Capability Centers Q4, GCC Trends India, GCC Market Intelligence, GTM research India, India GCC Research",
  });
  return (
    <ReportPageTemplate
      title="India GCC Snapshot Q4 (FY25-26)"
      description="A quarterly checkpoint on India GCC growth: headcount, capability mix, leadership depth, and city momentum - ready for executive reviews and GTM planning."
      formId="261021035860445"
      formTitle="Download report"
      formDescription="Get the full deck plus export-ready views."
    />
  );
};

export default ReportGCCSnapshotQ4;
