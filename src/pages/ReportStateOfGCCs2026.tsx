import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";

const heroHighlights = [
  "The Agentic AI shift redefining GCC ownership and autonomy",
  "Tier-2 city advantage with elite talent at significant cost leverage",
  "2026 market signals across centers, MNCs, and talent scale"
];

const whatsInside = [
  "2026 mandate: GCCs owning the full product lifecycle from concept to code",
  "Agentic AI adoption across GCCs and autonomous decision systems",
  "Market opportunity snapshot with revenue, talent pool, and leasing signals",
  "Center distribution across top Indian cities and capability mix",
  "Bamboo Reports coverage: 5800+ centers and 2400+ multinationals"
];

const whoUsesIt = [
  "CXOs and strategy teams recalibrating GCC roadmaps for 2026",
  "GTM leaders prioritizing tier-2 expansion and capability hubs",
  "Delivery and PMO leaders mapping talent depth and scaling risk",
  "Investors and advisory teams building India GCC theses"
];

const ReportStateOfGCCs2026 = () => {
  useSEO({
    title: "State of GCCs in India 2026 Report | Bamboo Reports",
    description: "State of GCCs in India - A 2026 Report covering the Agentic AI shift, tier-2 city momentum, and market opportunity signals across 5800+ GCCs.",
    keywords: "State of GCCs in India 2026, GCC report 2026, India GCC market, Agentic AI GCCs, Tier-2 cities GCC, GCC intelligence India",
    canonicalUrl: "https://www.bambooreports.com/reports/state-of-gccs-2026",
  });

  const [formKey, setFormKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if ((window as any).jotformEmbedHandler) {
        (window as any).jotformEmbedHandler("iframe[id='JotFormIFrame-260291234006446']", "https://form.jotform.com/");
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [formKey]);

  const handleIframeLoad = () => {
    if (!hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      return;
    }

    hasNavigatedRef.current = false;
    setTimeout(() => {
      setFormKey((prev) => prev + 1);
    }, 500);
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          if (
            data.action === "submission-completed" ||
            data.type === "form.submit" ||
            event.data.includes("submission-completed")
          ) {
            // Submission detected; keep page ready for reset.
          }
        } catch {
          // Ignore non-JSON messages.
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                Report â€¢ January 2026 update
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
                  <img
                    src="https://files.catbox.moe/d0kgo3.png"
                    alt="State of GCCs in India 2026 report banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight">State of GCCs in India - A 2026 Report</h1>
                  <p className="text-lg text-muted-foreground">
                    The 2026 reset on India GCCs: agentic AI adoption, ownership of the product lifecycle, and a shift toward
                    tier-2 hubs that are redefining cost, talent, and speed.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Why this report</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {heroHighlights.map((item) => (
                    <div key={item} className="rounded-2xl border bg-card px-4 py-3 text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">â€¢</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="#download-form">Download the report</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Walk me through it</a>
                </Button>
              </div>
            </div>

            <div id="download-form" className="lg:sticky lg:top-24">
              <div className="rounded-3xl border bg-card shadow-sm p-6">
                <h3 className="text-2xl font-bold mb-3">Download report</h3>
                <p className="text-sm text-muted-foreground mb-4">Get the full report and executive-ready highlights.</p>
                <iframe
                  key={formKey}
                  ref={iframeRef}
                  id="JotFormIFrame-260291234006446"
                  title="State of GCCs in India - A 2026 Report"
                  onLoad={() => {
                    window.parent.scrollTo(0, 0);
                    handleIframeLoad();
                  }}
                  allowTransparency={true}
                  allow="geolocation; microphone; camera; fullscreen; payment"
                  src="https://form.jotform.com/260291234006446"
                  frameBorder="0"
                  style={{ minWidth: "100%", maxWidth: "100%", height: "539px", border: "none" }}
                  scrolling="no"
                />
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">What's inside</p>
              <h2 className="text-3xl font-bold">A 2026 read on where GCCs are taking ownership.</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {whatsInside.map((item) => (
                  <div key={item} className="rounded-2xl border bg-muted/40 px-4 py-3 text-sm leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Who uses it</p>
              <h2 className="text-3xl font-bold">For leaders shaping 2026 GCC bets.</h2>
              <div className="space-y-3">
                {whoUsesIt.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-2xl border bg-card px-4 py-3 text-sm leading-relaxed">
                    <span className="text-primary mt-1">â€¢</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportStateOfGCCs2026;
