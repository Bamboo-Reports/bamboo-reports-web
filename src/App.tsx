import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Reports from "./pages/Reports";
import Report52Weeks from "./pages/Report52Weeks";
import ReportGCCSnapshotQ2 from "./pages/ReportGCCSnapshotQ2";
import GCCList from "./pages/GCCList";
import Insights from "./pages/Insights";
import Articles from "./pages/Articles";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/52-weeks" element={<Report52Weeks />} />
          <Route path="/reports/gcc-snapshot-q2" element={<ReportGCCSnapshotQ2 />} />
          <Route path="/gcc-list" element={<GCCList />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
