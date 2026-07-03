import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { InquiryFormProvider } from "@/contexts/InquiryFormContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Insights from "./pages/Insights";
import Articles from "./pages/Articles";
import H1BStrategicReset from "./pages/articles/H1BStrategicReset";
import Resources from "./pages/Resources";
import Reads from "./pages/Reads";
import AgenticEnterprise from "./pages/reads/AgenticEnterprise";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import GCCProspectData from "./pages/GCCProspectData";
import AccountMarketIntelligence from "./pages/AccountMarketIntelligence";
import GCCABM from "./pages/GCCABM";
import Platform from "./pages/Platform";
import SuccessStories from "./pages/SuccessStories";
import MapYourGCCOpportunity from "./pages/MapYourGCCOpportunity";
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
            <Route path="/insights" element={<Insights />} />
            <Route path="/roundtables" element={<Articles />} />
            <Route path="/roundtables/h1b-shock-strategic-reset" element={<H1BStrategicReset />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/reads" element={<Reads />} />
            <Route path="/reads/agentic-enterprise" element={<AgenticEnterprise />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/gcc-prospect-data" element={<GCCProspectData />} />
            <Route path="/account-market-intelligence" element={<AccountMarketIntelligence />} />
            <Route path="/gcc-abm" element={<GCCABM />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/map-your-gcc-oppurtunity" element={<MapYourGCCOpportunity />} />
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
