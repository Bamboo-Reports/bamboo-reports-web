"use client";

import dynamic from "next/dynamic";
import { createContext, useContext, useRef, useState, type ReactNode } from "react";

const InquiryDialog = dynamic(() => import("@/components/InquiryDialog"), { ssr: false });

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
  const [sent, setSent] = useState(false);
  // Bumped on every open so the form always starts fresh.
  const [openCount, setOpenCount] = useState(0);
  const openerRef = useRef<HTMLElement | null>(null);

  const openInquiryForm = () => {
    openerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setSent(false);
    setOpenCount((count) => count + 1);
    setIsOpen(true);
  };

  return (
    <InquiryFormContext.Provider value={{ openInquiryForm }}>
      {children}

      {/* Mounted on first open, so the form and dialog code only load
          when someone asks for pricing. */}
      {openCount > 0 && (
        <InquiryDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          formKey={openCount}
          sent={sent}
          onSent={() => setSent(true)}
          openerRef={openerRef}
        />
      )}
    </InquiryFormContext.Provider>
  );
};
