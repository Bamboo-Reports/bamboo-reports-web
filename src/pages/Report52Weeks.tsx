import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";

const Report52Weeks = () => {
  usePageTitle("52 Weeks of GCC Momentum");
  const [formKey, setFormKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if ((window as any).jotformEmbedHandler) {
        (window as any).jotformEmbedHandler("iframe[id='JotFormIFrame-253031221972448']", "https://form.jotform.com/");
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [formKey]);

  const handleIframeLoad = () => {
    // Only check after initial load
    if (!hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      return;
    }

    // If iframe has loaded again (navigated to download link), reset the form
    console.log('Form navigated to download link, resetting form...');
    hasNavigatedRef.current = false;

    // Small delay to ensure download starts
    setTimeout(() => {
      setFormKey(prev => prev + 1);
    }, 500);
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if message is from JotForm
      if (typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);

          // Detect form submission completion
          if (
            data.action === 'submission-completed' ||
            data.type === 'form.submit' ||
            event.data.includes('submission-completed')
          ) {
            console.log('Form submission detected');
          }
        } catch (e) {
          // Not JSON, ignore
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
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
              <h1 className="text-5xl font-bold mb-6">52 Weeks of GCC Momentum - Bamboo Reports</h1>
              
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
                  <iframe
                    key={formKey}
                    ref={iframeRef}
                    id="JotFormIFrame-253031221972448"
                    title="[ BR ] - 52 Weeks Leads"
                    onLoad={(e) => {
                      window.parent.scrollTo(0, 0);
                      handleIframeLoad();
                    }}
                    allowTransparency={true}
                    allow="geolocation; microphone; camera; fullscreen; payment"
                    src="https://form.jotform.com/253031221972448"
                    frameBorder="0"
                    style={{ minWidth: "100%", maxWidth: "100%", height: "539px", border: "none" }}
                    scrolling="no"
                  />
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
