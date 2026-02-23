import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";

const heroHighlights = [
  "Quarterly benchmark of headcount, capability mix, and city shifts",
  "Peer comparisons for scale, maturity, and hiring velocity",
  "Signals and commentary ready for executive decks"
];

const whatsInside = [
  "Quarterly snapshot of every net-new center, expansion, and consolidation",
  "City momentum and talent depth with hiring velocity trends",
  "Leadership moves and succession signals by sector and site",
  "Capability mix shifts across engineering, platform ops, and CX",
  "Peer benchmark cards for scale, maturity, and cost"
];

const whoUsesIt = [
  "CXOs and strategy leads aligning India bets with global plans",
  "GTM teams prioritizing territories and pursuits with intent signals",
  "Delivery and PMO teams sequencing ramps and risk buffers",
  "Finance and people teams preparing board and steering updates"
];

const ReportGCCSnapshotQ3 = () => {
  useSEO({
    title: "India GCC Snapshot Q3 FY25-26 - Quarterly GCC Intelligence Report",
    description: "Q3 2025-26 snapshot of India's Global Capability Centers with data on 5,800+ centers and 2,400+ MNCs. Analyze GCC investment patterns, talent hotspots, and capability shifts for strategic GTM planning.",
    keywords: "India GCC Snapshot, GCC Quarterly Report, GCC Intelligence, Global Capability Centers Q3, GCC Trends India, GCC Market Intelligence, GTM research India, India GCC Research",
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
        (window as any).jotformEmbedHandler("iframe[id='JotFormIFrame-260531050031437']", "https://form.jotform.com/");
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
                Report • Quarterly snapshot
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">India GCC Snapshot Q3 (FY25-26)</h1>
                <p className="text-lg text-muted-foreground">
                  A quarterly checkpoint on India GCC growth: headcount, capability mix, leadership depth, and city momentum—ready for executive reviews and GTM planning.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Why this report</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {heroHighlights.map((item) => (
                    <div key={item} className="rounded-2xl border bg-card px-4 py-3 text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span>
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
                <p className="text-sm text-muted-foreground mb-4">Get the full deck plus export-ready views.</p>
                <iframe
                  key={formKey}
                  ref={iframeRef}
                  id="JotFormIFrame-260531050031437"
                  title="[ BR ] - Q3 Snapshot Leads"
                  onLoad={() => {
                    window.parent.scrollTo(0, 0);
                    handleIframeLoad();
                  }}
                  allowTransparency={true}
                  allow="geolocation; microphone; camera; fullscreen; payment"
                  src="https://form.jotform.com/260531050031437"
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
              <h2 className="text-3xl font-bold">A quarterly read on where GCCs are doubling down.</h2>
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
              <h2 className="text-3xl font-bold">Give leaders and GTM teams credible, current numbers.</h2>
              <div className="space-y-3">
                {whoUsesIt.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-2xl border bg-card px-4 py-3 text-sm leading-relaxed">
                    <span className="text-primary mt-1">•</span>
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

export default ReportGCCSnapshotQ3;

