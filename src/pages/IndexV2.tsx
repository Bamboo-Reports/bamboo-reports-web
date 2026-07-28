import FadeIn from "@/components/FadeIn";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import GccStatsBand from "@/components/GccStatsBand";
import Header from "@/components/Header";
import HeroV2 from "@/components/HeroV2";
import IntelligenceSpans from "@/components/IntelligenceSpans";
import Q1ReportSection from "@/components/Q1ReportSection";
import RealTimeData from "@/components/RealTimeData";
import ResearchNXT from "@/components/ResearchNXT";
import StructuredData from "@/components/StructuredData";
import WhatIsGccIntelligence from "@/components/WhatIsGccIntelligence";
import WhoBenefits from "@/components/WhoBenefits";
import { useSEO } from "@/hooks/useSEO";

const IndexV2 = () => {
  useSEO({
    title: "GCC GTM Enablement | Bamboo Reports",
    description:
      "Verified India GCC data, account intelligence, and analyst-led research for GTM teams building their India GCC opportunity.",
    keywords:
      "GCC GTM enablement, India GCC data, GCC account intelligence, GCC market intelligence, Bamboo Reports",
    canonicalUrl: "https://www.bambooreports.com",
  });

  return (
    <div className="min-h-screen bg-background">
      <StructuredData type="organization" />
      <StructuredData type="product" />
      <Header />
      <main>
        <HeroV2 />
        <FadeIn>
          <GccStatsBand />
        </FadeIn>
        <FadeIn>
          <Q1ReportSection />
        </FadeIn>
        <FadeIn>
          <Features />
        </FadeIn>
        <FadeIn>
          <IntelligenceSpans />
        </FadeIn>
        <FadeIn>
          <WhoBenefits />
        </FadeIn>
        <FadeIn>
          <RealTimeData />
        </FadeIn>
        <FadeIn>
          <ResearchNXT />
        </FadeIn>
        <FadeIn>
          <WhatIsGccIntelligence />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
};

export default IndexV2;
