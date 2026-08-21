import { createContext, useContext, useState, type ReactNode } from "react";
import JotFormEmbed from "@/components/JotFormEmbed";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          aria-modal="true"
          className="max-h-[95vh] w-[95vw] max-w-[420px] gap-0 overflow-hidden border-0 bg-white p-0 shadow-2xl lg:max-h-[90vh]"
        >
          <DialogHeader className="space-y-2 bg-accent p-6 text-center text-accent-foreground sm:text-center">
            <DialogTitle className="text-2xl font-bold">Bamboo Reports</DialogTitle>
            <DialogDescription className="text-sm text-accent-foreground/90">
              Fill out the form below to get started
            </DialogDescription>
          </DialogHeader>

          <div className="h-[600px] lg:h-[539px] overflow-hidden relative">
            <JotFormEmbed
              formId="260714112843450"
              title="Bamboo Reports pricing enquiry form"
              height="539px"
            />
          </div>
        </DialogContent>
      </Dialog>
    </InquiryFormContext.Provider>
  );
};
