import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { InquiryFormProvider } from "@/contexts/InquiryFormContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Reports from "./pages/Reports";
import Report52Weeks from "./pages/Report52Weeks";
import ReportGCCSnapshotQ1 from "./pages/ReportGCCSnapshotQ1";
import ReportGCCSnapshotQ2 from "./pages/ReportGCCSnapshotQ2";
import ReportGCCSnapshotQ3 from "./pages/ReportGCCSnapshotQ3";
import ReportGCCSnapshotQ4 from "./pages/ReportGCCSnapshotQ4";
import ReportStateOfGCCs2026 from "./pages/ReportStateOfGCCs2026";
import Insights from "./pages/Insights";
import Articles from "./pages/Articles";
import H1BStrategicReset from "./pages/articles/H1BStrategicReset";
import Resources from "./pages/Resources";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import GCCProspectData from "./pages/GCCProspectData";
import AccountMarketIntelligence from "./pages/AccountMarketIntelligence";
import GCCABM from "./pages/GCCABM";
import Platform from "./pages/Platform";
import SuccessStories from "./pages/SuccessStories";
import ScrollToTop from "./components/ScrollToTop";
import { ensureJotformEmbedHandler } from "@/lib/jotform";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    ensureJotformEmbedHandler();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InquiryFormProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products/explorer" element={<Navigate to="/pricing" replace />} />
            <Route path="/products/navigator" element={<Navigate to="/pricing" replace />} />
            <Route path="/products/enterprise" element={<Navigate to="/pricing" replace />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/52-weeks" element={<Report52Weeks />} />
            <Route path="/reports/gcc-snapshot-q1" element={<ReportGCCSnapshotQ1 />} />
            <Route path="/reports/gcc-snapshot-q2" element={<ReportGCCSnapshotQ2 />} />
            <Route path="/reports/gcc-snapshot-q3" element={<ReportGCCSnapshotQ3 />} />
            <Route path="/reports/gcc-snapshot-q4" element={<ReportGCCSnapshotQ4 />} />
            <Route path="/reports/state-of-gccs-2026" element={<ReportStateOfGCCs2026 />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/roundtables" element={<Articles />} />
            <Route path="/roundtables/h1b-shock-strategic-reset" element={<H1BStrategicReset />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/about-us" element={<Navigate to="/" replace />} />
            <Route path="/contact-us" element={<Navigate to="/" replace />} />
            <Route path="/gcc-prospect-data" element={<GCCProspectData />} />
            <Route path="/account-market-intelligence" element={<AccountMarketIntelligence />} />
            <Route path="/gcc-abm" element={<GCCABM />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/features" element={<Navigate to="/" replace />} />
            <Route path="/use-cases" element={<Navigate to="/" replace />} />
            <Route path="/icp" element={<Navigate to="/" replace />} />
            <Route path="/features/coverage" element={<Navigate to="/pricing" replace />} />
            <Route path="/features/what-if-scenarios" element={<Navigate to="/pricing" replace />} />
            <Route path="/features/proprietary-tam-slicers" element={<Navigate to="/pricing" replace />} />
            <Route path="/features/tailor-made-market-insights" element={<Navigate to="/pricing" replace />} />
            <Route path="/use-cases/gcc-leaders" element={<Navigate to="/pricing" replace />} />
            <Route path="/use-cases/gcc-site-leaders" element={<Navigate to="/pricing" replace />} />
            <Route path="/use-cases/pmo" element={<Navigate to="/pricing" replace />} />
            <Route path="/use-cases/gtm-sellers" element={<Navigate to="/pricing" replace />} />
            <Route path="/use-cases/ecosystem-partners" element={<Navigate to="/pricing" replace />} />
            <Route path="/use-cases/ecosystem-sellers" element={<Navigate to="/pricing" replace />} />
            <Route path="/use-cases/global-pmo" element={<Navigate to="/pricing" replace />} />
            <Route path="/use-cases/india-leadership" element={<Navigate to="/pricing" replace />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </InquiryFormProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
