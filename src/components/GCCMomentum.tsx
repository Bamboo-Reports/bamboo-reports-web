import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X, ArrowRight, FileText } from "lucide-react";
import gccMomentumReport from "@/assets/gcc-momentum-report.png";
import JotFormEmbed from "@/components/JotFormEmbed";

const GCCMomentum = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isPopupOpen) {
        setIsPopupOpen(false);
      }
    };

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
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        <div className="relative enterprise-section">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-white/10 text-white/90 mb-6">
                  <FileText className="h-3.5 w-3.5" />
                  Free Report
                </span>
                <h2 className="text-white mb-6">
                  Ride the Wave of India's GCC Momentum
                </h2>
                <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                  A quick guide with insights on GCC growth over the past year and a snapshot of the latest quarter. Download your complimentary copy.
                </p>
                <Button
                  onClick={openPopup}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base rounded-lg font-semibold shadow-lg shadow-accent/30 hover:shadow-xl transition-all"
                >
                  Get Your Free Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/10 rounded-2xl blur-xl" />
                  <img
                    src={gccMomentumReport}
                    alt="GCC Momentum Report"
                    className="relative w-full max-w-md rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
          isPopupOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
        aria-hidden={!isPopupOpen}
      >
        <div
          className={`bg-white rounded-2xl shadow-2xl w-[95vw] lg:w-[420px] max-h-[95vh] lg:max-h-[90vh] relative overflow-hidden ${
            isPopupOpen ? "animate-modal-content" : ""
          }`}
        >
          <button
            onClick={closePopup}
            className="absolute top-4 right-5 bg-accent hover:bg-accent/90 text-white w-9 h-9 rounded-full flex items-center justify-center z-10 transition-transform duration-micro ease-smooth hover:scale-105"
          >
            <X size={20} />
          </button>

          <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Bamboo Reports</h2>
            <p className="text-sm opacity-90">Fill out the form below to download your report</p>
          </div>

          <div className="h-[600px] lg:h-[539px] overflow-hidden relative">
            <JotFormEmbed
              formId="251101747497459"
              title="[RNXT] Bamboo Reports Leads"
              height="539px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GCCMomentum;
