"use client";

import type { RefObject } from "react";
import InquiryForm from "@/components/InquiryForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Changes on every open so the form always starts fresh. */
  formKey: number;
  sent: boolean;
  onSent: () => void;
  /** Element to return focus to when the dialog closes. */
  openerRef: RefObject<HTMLElement | null>;
}

/** The pricing dialog. Loaded on demand by InquiryFormProvider. */
const InquiryDialog = ({ open, onOpenChange, formKey, sent, onSent, openerRef }: InquiryDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      aria-modal="true"
      className="max-h-[95vh] w-[95vw] max-w-[520px] gap-0 overflow-y-auto border border-line bg-background p-0 shadow-2xl"
      onCloseAutoFocus={(event) => {
        if (!openerRef.current) return;
        event.preventDefault();
        const opener = openerRef.current;
        openerRef.current = null;
        window.setTimeout(() => {
          if (opener.isConnected && !document.querySelector('[role="dialog"]')) {
            opener.focus({ preventScroll: true });
          }
        }, 250);
      }}
    >
      <DialogHeader className="space-y-2 border-b border-line px-6 pb-5 pt-6 text-left sm:px-8 sm:text-left">
        <p className="flex items-center gap-3 text-sm font-semibold text-primary">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-[1px] bg-accent" />
          Bamboo Reports
        </p>
        <DialogTitle className="text-title font-display-soft text-ink">
          {sent ? "Request received" : "Pricing"}
        </DialogTitle>
        <DialogDescription className={sent ? "sr-only" : "text-base text-ink-soft"}>
          {sent ? "Your pricing request has been sent." : "Fill out the form below to get started"}
        </DialogDescription>
      </DialogHeader>

      <div className="px-6 py-6 sm:px-8">
        <InquiryForm key={formKey} onSent={onSent} />
      </div>
    </DialogContent>
  </Dialog>
);

export default InquiryDialog;
