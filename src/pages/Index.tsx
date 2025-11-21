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
import { usePageTitle } from "@/hooks/usePageTitle";

const Index = () => {
  usePageTitle(); // Uses default title for home page

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
