import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import Features from "@/components/home/Features";
import Footer from "@/components/layout/Footer";
import { openCalScheduler } from "@/lib/calScheduler";
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
import { useSEO } from "@/hooks/useSEO";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const demoPopupOpened = useRef(false);

  useEffect(() => {
    if (searchParams.get("demo") !== "true" || demoPopupOpened.current) {
      return;
    }
    demoPopupOpened.current = true;
    openCalScheduler();

    // Drop only the demo flag so UTM params stay intact for analytics and
    // a refresh/back doesn't reopen the popup.
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("demo");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  useSEO({
    title: "GCC GTM Enablement | Bamboo Reports",
    description:
      "Verified India GCC data, account intelligence, and analyst-led research for GTM teams building their India GCC opportunity.",
    keywords:
      "GCC GTM enablement, India GCC data, GCC account intelligence, GCC market intelligence, Bamboo Reports",
    canonicalUrl: "https://bambooreports.com",
  });

  return (
    <div className="min-h-screen bg-background">
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
