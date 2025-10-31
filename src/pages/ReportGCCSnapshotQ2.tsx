import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const ReportGCCSnapshotQ2 = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleFormSubmit = (e: MessageEvent) => {
      console.log('Message received:', e.data);
      
      // Check for various JotForm submission formats
      if (
        e.data && 
        (
          (typeof e.data === 'string' && (e.data.includes('formSubmit') || e.data.includes('submit'))) ||
          (typeof e.data === 'object' && (e.data.action === 'submission-completed' || e.data.type === 'form-submit'))
        )
      ) {
        console.log('Form submitted! Showing thank you message');
        setIsSubmitted(true);
      }
    };

    window.addEventListener('message', handleFormSubmit);

    return () => {
      window.removeEventListener('message', handleFormSubmit);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if ((window as any).jotformEmbedHandler) {
        (window as any).jotformEmbedHandler("iframe[id='JotFormIFrame-251101747497459']", "https://form.jotform.com/");
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2">
              <h1 className="text-5xl font-bold mb-6">GCC Snapshot Q2 - Bamboo Reports</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  India's Global Capability Centers (GCCs) continue to be the engine room of multinational transformation. The Bamboo Reports India GCC Snapshot Q2 2025-26 captures the latest wave of center launches, expansions, and R&D pivots that are redefining India's role in the global enterprise ecosystem.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Built on proprietary data covering 5,800 centers and 2,400+ MNCs, this quarter's snapshot highlights how new entrants are choosing India not only for cost leverage but for proximity to innovation talent and digital execution. From Bengaluru's enduring dominance to Hyderabad and Pune's accelerating share, the report tracks the geography, industry mix, and emerging categories shaping the country's GCC map.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  With actionable intelligence on investment patterns, talent hotspots, and capability shifts, the Snapshot helps CXOs, strategy leads, and GTM planners align business expansion with where the market is headed next.
                </p>
                
                <p className="text-lg font-semibold">
                  📊 Download the report to see where global enterprises are doubling down — and how India's GCC story is entering its next growth phase.
                </p>
              </div>
            </div>
            
            {/* Sidebar Form - 1 column, sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-2xl font-bold mb-4">Download Report</h3>
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                      <h4 className="text-2xl font-bold mb-4">Thank You for Downloading!</h4>
                      <p className="text-muted-foreground text-center">
                        Your report will be sent to your email shortly.
                      </p>
                    </div>
                  ) : (
                    <iframe
                      id="JotFormIFrame-251101747497459"
                      title="[RNXT] Bamboo Reports Leads"
                      allow="geolocation; microphone; camera; fullscreen; payment"
                      src="https://form.jotform.com/251101747497459"
                      style={{ minWidth: "100%", maxWidth: "100%", height: "539px", border: "none" }}
                      scrolling="no"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportGCCSnapshotQ2;
