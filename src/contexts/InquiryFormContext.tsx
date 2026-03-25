import { createContext, useContext, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import JotFormEmbed from "@/components/JotFormEmbed";

interface InquiryFormContextType {
  openInquiryForm: () => void;
}

const InquiryFormContext = createContext<InquiryFormContextType | undefined>(undefined);

export const useInquiryForm = () => {
  const context = useContext(InquiryFormContext);
  if (!context) {
    throw new Error("useInquiryForm must be used within InquiryFormProvider");
  }
  return context;
};

export const InquiryFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openInquiryForm = () => setIsOpen(true);

  return (
    <InquiryFormContext.Provider value={{ openInquiryForm }}>
      {children}

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
        aria-hidden={!isOpen}
      >
        <div
          className={`bg-white rounded-3xl shadow-2xl w-[95vw] lg:w-[420px] max-h-[95vh] lg:max-h-[90vh] relative overflow-hidden ${
            isOpen ? "animate-modal-content" : ""
          }`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-5 bg-[#f39122] hover:bg-[#f39122]/90 text-white w-9 h-9 rounded-full flex items-center justify-center z-10 transition-transform duration-micro ease-smooth hover:scale-105"
            aria-label="Close inquiry form"
          >
            <X size={20} />
          </button>

          <div className="bg-gradient-to-br from-[#F2994A] to-[#F2C94C] text-white p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Bamboo Reports</h2>
            <p className="text-sm opacity-90">Fill out the form below to get started</p>
          </div>

          <div className="h-[600px] lg:h-[539px] overflow-hidden relative">
            <JotFormEmbed
              formId="260714112843450"
              title="[ BR ] - Inquiry"
              height="539px"
            />
          </div>
        </div>
      </div>
    </InquiryFormContext.Provider>
  );
};
