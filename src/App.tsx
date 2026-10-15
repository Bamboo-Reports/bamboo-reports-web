import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { InquiryFormProvider } from "@/contexts/InquiryFormContext";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Platform from "@/pages/Platform";
import GCCProspectData from "@/pages/GCCProspectData";
import AccountMarketIntelligence from "@/pages/AccountMarketIntelligence";
import GCCABM from "@/pages/GCCABM";
import SuccessStories from "@/pages/SuccessStories";
import MapYourGCCOpportunity from "@/pages/MapYourGCCOpportunity";
import Resources from "@/pages/Resources";
import IndiaGccReportQ22026 from "@/pages/reports/IndiaGccReportQ22026";
import ThankYou from "@/pages/ThankYou";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import NotFound from "@/pages/NotFound";

const App = () => (
  <BrowserRouter>
    {/* Inside the router: the enquiry dialog's JotFormEmbed reads useLocation(). */}
    <InquiryFormProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/platform" element={<Platform />} />

        {/* Offerings */}
        <Route path="/gcc-prospect-data" element={<GCCProspectData />} />
        <Route path="/account-market-intelligence" element={<AccountMarketIntelligence />} />
        <Route path="/gcc-abm" element={<GCCABM />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/map-your-gcc-opportunity" element={<MapYourGCCOpportunity />} />

        {/* Resources */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/reports/india-gcc-report-q2-2026" element={<IndiaGccReportQ22026 />} />

        {/* Legal and transactional */}
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />

        {/* Legacy URLs */}
        <Route path="/v2" element={<Navigate to="/" replace />} />
        <Route path="/reads" element={<Navigate to="/resources" replace />} />
        <Route path="/reports" element={<Navigate to="/resources" replace />} />
        <Route
          path="/reports/india-gcc-report-q1-fy27"
          element={<Navigate to="/reports/india-gcc-report-q2-2026" replace />}
        />
        <Route
          path="/reports/india-gcc-report-q1-fy27/thank-you"
          element={<Navigate to="/reports/india-gcc-report-q2-2026" replace />}
        />
        <Route
          path="/map-your-gcc-oppurtunity"
          element={<Navigate to="/map-your-gcc-opportunity" replace />}
        />

        {/* Keep the catch-all last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </InquiryFormProvider>
  </BrowserRouter>
);

export default App;
