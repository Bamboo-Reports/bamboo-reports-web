import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const Report52Weeks = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleFormSubmit = (e: MessageEvent) => {
      if (e.data && typeof e.data === 'string' && e.data.includes('formSubmit')) {
        setIsSubmitted(true);
        
        // Trigger confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#10b981', '#3b82f6', '#8b5cf6']
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#10b981', '#3b82f6', '#8b5cf6']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
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
              <h1 className="text-5xl font-bold mb-6">52 Weeks Report - Bamboo Reports</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  India's Global Capability Centers (GCCs) have entered a phase of unprecedented growth. Over the last 52 weeks, global enterprises have set up new innovation, R&D, and delivery hubs across India at a pace never seen before. From Bengaluru and Hyderabad leading the charge to emerging activity in Pune, Chennai, and NCR — the data paints a clear picture of India's strategic rise as the world's GCC powerhouse.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  This exclusive "52 Weeks – GCC Momentum" report by Bamboo Reports, Research NXT captures every wave of that expansion — week by week, city by city, and sector by sector. It uncovers how North American and European multinationals are recalibrating their India footprint, and how the nature of these centers is shifting from back-office operations to high-value innovation and product engineering.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Whether you're tracking industry peers, planning your next expansion, or evaluating the GCC landscape for opportunities, this report gives you a pulse on how the ecosystem evolved through FY 2024-25.
                </p>
                
                <p className="text-lg font-semibold">
                  📈 Explore the patterns, hotspots, and sectors that defined India's year of GCC acceleration — download your copy today.
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
                      <div className="text-6xl mb-4">🎉</div>
                      <h4 className="text-2xl font-bold mb-2">Thank You!</h4>
                      <p className="text-muted-foreground text-center">
                        Your report is on its way to your inbox.
                      </p>
                    </div>
                  ) : (
                    <iframe
                      id="JotFormIFrame-251101747497459"
                      title="[RNXT] Bamboo Reports Leads"
                      onLoad={(e) => {
                        window.parent.scrollTo(0, 0);
                      }}
                      allowTransparency={true}
                      allow="geolocation; microphone; camera; fullscreen; payment"
                      src="https://form.jotform.com/251101747497459"
                      frameBorder="0"
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

export default Report52Weeks;
