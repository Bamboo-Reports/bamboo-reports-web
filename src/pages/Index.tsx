import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import IntelligenceSpans from "@/components/IntelligenceSpans";
import WhoBenefits from "@/components/WhoBenefits";
import RealTimeData from "@/components/RealTimeData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <IntelligenceSpans />
      <WhoBenefits />
      <RealTimeData />
    </div>
  );
};

export default Index;
