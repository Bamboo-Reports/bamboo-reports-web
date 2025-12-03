import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Purchases from "./pages/Purchases";
import MyContent from "./pages/MyContent";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Explorer from "./pages/products/Explorer";
import Navigator from "./pages/products/Navigator";
import Enterprise from "./pages/products/Enterprise";
import Coverage from "./pages/features/Coverage";
import WhatIfScenarios from "./pages/features/WhatIfScenarios";
import ProprietaryTAMSlicers from "./pages/features/ProprietaryTAMSlicers";
import TailorMadeMarketInsights from "./pages/features/TailorMadeMarketInsights";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products/explorer" element={<Explorer />} />
            <Route path="/products/navigator" element={<Navigator />} />
            <Route path="/products/enterprise" element={<Enterprise />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/52-weeks" element={<Report52Weeks />} />
            <Route path="/reports/gcc-snapshot-q2" element={<ReportGCCSnapshotQ2 />} />
            <Route path="/gcc-list" element={<GCCList />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailure />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/features/coverage" element={<Coverage />} />
            <Route path="/features/what-if-scenarios" element={<WhatIfScenarios />} />
            <Route path="/features/proprietary-tam-slicers" element={<ProprietaryTAMSlicers />} />
            <Route path="/features/tailor-made-market-insights" element={<TailorMadeMarketInsights />} />
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
            <Route
              path="/purchases"
              element={
                <ProtectedRoute>
                  <Purchases />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-content"
              element={
                <ProtectedRoute>
                  <MyContent />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
