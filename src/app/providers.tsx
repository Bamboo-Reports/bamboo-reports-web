"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { InquiryFormProvider } from "@/contexts/InquiryFormContext";

export function Providers({ children }: { children: ReactNode }) {
  // One client per browser session; a module-level client would be shared
  // across requests on the server.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <InquiryFormProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </InquiryFormProvider>
    </QueryClientProvider>
  );
}
