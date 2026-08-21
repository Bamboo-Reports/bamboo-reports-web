import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { InquiryFormProvider } from "@/contexts/InquiryFormContext";
import IndexV2 from "./pages/IndexV2";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Reads from "./pages/Reads";
import AgenticEnterprise from "./pages/reads/AgenticEnterprise";
import AgenticSupplyChainControlTower from "./pages/events/AgenticSupplyChainControlTower";
import AgenticSupplyChainControlTowerThankYou from "./pages/events/AgenticSupplyChainControlTowerThankYou";
import Reports from "./pages/Reports";
import IndiaGccReportQ22026 from "./pages/reports/IndiaGccReportQ22026";
import IndiaGccReportQ22026ThankYou from "./pages/reports/IndiaGccReportQ22026ThankYou";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import GCCProspectData from "./pages/GCCProspectData";
import AccountMarketIntelligence from "./pages/AccountMarketIntelligence";
import GCCABM from "./pages/GCCABM";
import Platform from "./pages/Platform";
import SuccessStories from "./pages/SuccessStories";
import Tracker from "./pages/Tracker";
import MapYourGCCOpportunity from "./pages/MapYourGCCOpportunity";
import ScrollToTop from "./components/ScrollToTop";
import { GCC_TRACKER_ENABLED } from "@/lib/featureFlags";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <InquiryFormProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
            <Route path="/" element={<IndexV2 />} />
            <Route path="/v2" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/events/agentic-supply-chain-control-tower"
              element={<AgenticSupplyChainControlTower />}
            />
            <Route
              path="/events/agentic-supply-chain-control-tower/thank-you"
              element={<AgenticSupplyChainControlTowerThankYou />}
            />
            <Route path="/resources" element={<Resources />} />
            <Route path="/reads" element={<Reads />} />
            <Route path="/reads/agentic-enterprise" element={<AgenticEnterprise />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/india-gcc-report-q2-2026" element={<IndiaGccReportQ22026 />} />
            <Route path="/reports/india-gcc-report-q2-2026/thank-you" element={<IndiaGccReportQ22026ThankYou />} />
            <Route
              path="/reports/india-gcc-report-q1-fy27"
              element={<Navigate to="/reports/india-gcc-report-q2-2026" replace />}
            />
            <Route
              path="/reports/india-gcc-report-q1-fy27/thank-you"
              element={<Navigate to="/reports/india-gcc-report-q2-2026/thank-you" replace />}
            />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/gcc-prospect-data" element={<GCCProspectData />} />
            <Route path="/account-market-intelligence" element={<AccountMarketIntelligence />} />
            <Route path="/gcc-abm" element={<GCCABM />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/gcc" element={GCC_TRACKER_ENABLED ? <Tracker /> : <NotFound />} />
            <Route
              path="/tracker"
              element={GCC_TRACKER_ENABLED ? <Navigate to="/gcc" replace /> : <NotFound />}
            />
            <Route path="/map-your-gcc-opportunity" element={<MapYourGCCOpportunity />} />
            <Route
              path="/map-your-gcc-oppurtunity"
              element={<Navigate to="/map-your-gcc-opportunity" replace />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </InquiryFormProvider>
    </QueryClientProvider>
  );
};

export default App;
