import FadeIn from "@/components/FadeIn";
import DemoLinkHandler from "@/components/home/DemoLinkHandler";
import Features from "@/components/home/Features";
import Footer from "@/components/layout/Footer";
import GccStatsBand from "@/components/home/GccStatsBand";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import IntelligenceSpans from "@/components/home/IntelligenceSpans";
import LatestReportSection from "@/components/home/LatestReportSection";
import RealTimeData from "@/components/home/RealTimeData";
import ResearchNXT from "@/components/home/ResearchNXT";
import StructuredData from "@/components/StructuredData";
import WhatIsGccIntelligence from "@/components/home/WhatIsGccIntelligence";
import WhoBenefits from "@/components/home/WhoBenefits";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <DemoLinkHandler />
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <StructuredData type="product" />
      <Header />
      <main>
        <Hero />
        <FadeIn>
          <GccStatsBand />
        </FadeIn>
        <FadeIn>
          <LatestReportSection />
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

export default Home;
