import { Suspense } from "react";
import DemoQueryHandler from "@/components/DemoQueryHandler";
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

const IndexV2 = () => {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <StructuredData type="product" />
      {/* Reads ?demo=true; isolated in its own boundary so search params
          never force the rest of the page to render client-side. */}
      <Suspense fallback={null}>
        <DemoQueryHandler />
      </Suspense>
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
