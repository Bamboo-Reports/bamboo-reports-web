import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import { useSEO } from "@/hooks/useSEO";
import { warmupJotform } from "@/lib/jotform";

const FORM_ID = "261820348991464";

const MapYourGCCOpportunity = () => {
  useSEO({
    title: "Map your India GCC opportunity | Bamboo Reports",
    description:
      "Map your India GCC opportunity with Bamboo Reports.",
    keywords:
      "India GCC opportunity, GCC market opportunity, Bamboo Reports",
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.querySelector("script")) return;

    warmupJotform();

    // Jotform's jsform embed inserts an auto-resizing iframe right after
    // this script tag and manages its height via postMessage.
    const script = document.createElement("script");
    script.src = `https://form.jotform.com/jsform/${FORM_ID}`;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-grow px-4 py-10 md:py-14">
        <div ref={containerRef} className="mx-auto w-full max-w-4xl" />
      </main>
    </div>
  );
};

export default MapYourGCCOpportunity;
