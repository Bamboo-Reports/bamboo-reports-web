import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const GCCMomentum = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Load JotForm script
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-251101747497459']",
          "https://form.jotform.com/"
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isPopupOpen) {
        setIsPopupOpen(false);
      }
    };

    // Handle form submission message
    const handleMessage = (event) => {
      if (event.origin === 'https://form.jotform.com' && event.data.type === 'form-submit') {
        setTimeout(() => {
          setIsPopupOpen(false);
        }, 2000);
      }
    };

    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
      window.addEventListener('message', handleMessage);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('message', handleMessage);
    };
  }, [isPopupOpen]);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <>
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Ride the Wave of India's GCC Momentum
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                A quick guide with insights on GCC growth over the past year and a snapshot of the latest quarter
              </p>
              <Button 
                onClick={openPopup}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
              >
                GET YOUR REPORT NOW
              </Button>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="/placeholder.svg" 
                alt="GCC Momentum Report" 
                className="w-full max-w-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popup Overlay */}
      {isPopupOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={handleOverlayClick}
          style={{ opacity: isPopupOpen ? 1 : 0 }}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-[95vw] lg:w-[420px] max-h-[95vh] lg:max-h-[90vh] relative overflow-hidden transition-transform duration-300"
            style={{ transform: isPopupOpen ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(50px)' }}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-5 bg-[#f39122] hover:bg-[#f39122]/90 text-white w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all hover:rotate-90"
            >
              <X size={20} />
            </button>

            {/* Form Header */}
            <div className="bg-gradient-to-br from-[#F2994A] to-[#F2C94C] text-white p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Bamboo Reports</h2>
              <p className="text-sm opacity-90">Fill out the form below to download your report</p>
            </div>

            {/* Form Container */}
            <div className="h-[600px] lg:h-[539px] overflow-hidden">
              <iframe
                id="JotFormIFrame-251101747497459"
                title="[RNXT] Bamboo Reports Leads"
                allowTransparency="true"
                allow="geolocation; microphone; camera; fullscreen; payment"
                src="https://form.jotform.com/251101747497459"
                scrolling="no"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GCCMomentum;
