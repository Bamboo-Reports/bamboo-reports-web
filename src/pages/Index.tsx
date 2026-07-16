import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GccStatsBand from "@/components/GccStatsBand";
import Q1ReportSection from "@/components/Q1ReportSection";
import Features from "@/components/Features";
import IntelligenceSpans from "@/components/IntelligenceSpans";
import WhoBenefits from "@/components/WhoBenefits";
import RealTimeData from "@/components/RealTimeData";
import ResearchNXT from "@/components/ResearchNXT";
import WhatIsGccIntelligence from "@/components/WhatIsGccIntelligence";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import StructuredData from "@/components/StructuredData";

const Index = () => {
  useSEO({
    title: "GCC Intelligence India | GTM Market Intelligence Platform | Bamboo Reports",
    description: "India's leading GCC Intelligence platform with 2400+ Global Capability Centers data. GTM market intelligence, India GCC insights, and Go-to-market research for strategic GCC expansion in India.",
    keywords: "GCC Intelligence India, GTM Intelligence, GCC India, India GCC Intelligence, Global Capability Centers India, GTM Market Intelligence, Go-to-market Intelligence India, India GCC market intelligence, GCC GTM strategy, India GCC expansion, GCC Intelligence platform, GTM research India, Global Capability Centers Intelligence, India GCC data, GCC market intelligence India",
    canonicalUrl: "https://www.bambooreports.com",
  });

  return (
    <div className="min-h-screen bg-background">
      <StructuredData type="organization" />
      <StructuredData type="product" />
      <Header />
      <Hero />
      <GccStatsBand />
      <Q1ReportSection />
      <Features />
      <IntelligenceSpans />
      <WhoBenefits />
      <RealTimeData />
      <ResearchNXT />
      <WhatIsGccIntelligence />
      <Footer />
    </div>
  );
};

export default Index;
