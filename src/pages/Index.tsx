import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import IntelligenceSpans from "@/components/IntelligenceSpans";
import WhoBenefits from "@/components/WhoBenefits";
import RealTimeData from "@/components/RealTimeData";
import ResearchNXT from "@/components/ResearchNXT";
import GCCMomentum from "@/components/GCCMomentum";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Bamboo Reports - GCC Intelligence & Global Capability Centers Insights",
    description: "Leading GCC Intelligence platform with comprehensive data on 2400+ Global Capability Centers in India. Access GCC insights, contact database, market intelligence, benchmarking, and GCC trends research.",
    keywords: "GCC Intelligence, GCC Insights, Global Capability Centers, India GCC Research, GCC Trends, GCC Contact Database, Market Intelligence India, Strategy intelligence platform, GCC benchmarking, ABM research, GTM research India",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <IntelligenceSpans />
      <WhoBenefits />
      <RealTimeData />
      <ResearchNXT />
      <GCCMomentum />
      <Footer />
      <FloatingCTA />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
