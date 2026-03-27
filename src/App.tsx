import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Static imports
import Navbar from "./pages/navbar/Navbar";
import Footer from "./sections/Footer/Footer";
import ScrollToTop from "./ScrollToTop";

// Page components
import Home from "./pages/Home/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Support from "./pages/Support";
import FAQsPage from "./pages/FAQ/FAQsPage";
import Company from "./pages/Company";
import LostItemPage from "./pages/LostItemPage/LostItemPage";
import HelpCenter from "./pages/HelpCenter/HelpCenter";
import AppFeatures from "./pages/AppFeatures/AppFeatures";
import TrackingPage from "./pages/TrackingPage/TrackingPage";
import NotFound from "./pages/NotFound";

// Admin Components
import AdminLogin from "./pages/admin/auth/adminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import UsersManagement from "./pages/admin/dashboard/UserManagement";
import RidersManagement from "./pages/admin/dashboard/RiderManagement";

// Navigation & Security
import Launcher from "./components/Launcher/Laucher";
import ProtectedRoute from "./pages/navigation/ProtectedRoute";
import RidesManagement from "./pages/admin/dashboard/RidesManagement";
import PaymentsManagement from "./pages/admin/dashboard/PaymentsManagement";
import MarketingCenter from "./pages/admin/dashboard/MarketingCenter";
import WhatsAppButton from "./components/whatsapp/WhatsApp";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import CookiePolicyPage from "./pages/CookiePolicyPage";

const App: React.FC = () => {
  const location = useLocation();
  const STORAGE_KEY = "pickars_cookies_accepted";

  // Track if any choice was made (to hide/show banner)
  const [hasMadeChoice, setHasMadeChoice] = useState<boolean>(true);
  // Track if choice was specifically "Accept" (to enable features)
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);

  // Check storage on mount
  useEffect(() => {
    const choice = localStorage.getItem(STORAGE_KEY);

    console.warn(cookiesAccepted)
    if (choice !== null) {
      setHasMadeChoice(true);
      setCookiesAccepted(choice === "true");
    } else {
      setHasMadeChoice(false);
    }
  }, []);

  const handleCookieDecision = (accepted: boolean) => {
    setHasMadeChoice(true);
    setCookiesAccepted(accepted);
  };

  const isAdminRoute = location.pathname.startsWith("/app/admin");

  return (
    <div
      className="app-main-wrapper"
      style={{
        backgroundColor: "#FAFAFA",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <main className="content-area" style={{ flex: 1 }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/app/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/app/terms-of-use" element={<TermsConditions />} />
          <Route path="/app/support" element={<Support />} />
          <Route path="/app/faqs" element={<FAQsPage />} />
          <Route path="/app/our-company" element={<Company />} />
          <Route path="/app/find-item" element={<LostItemPage />} />
          <Route path="/app/help-center" element={<HelpCenter />} />
          <Route path="/app/app-features" element={<AppFeatures />} />
          <Route path="/app/tracking" element={<TrackingPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/app/admin" element={<AdminLogin />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/app/admin/dashboard" element={<Dashboard />} />
            <Route
              path="/app/admin/payments"
              element={<PaymentsManagement />}
            />
            <Route path="/app/admin/users" element={<UsersManagement />} />
            <Route path="/app/admin/marketing" element={<MarketingCenter />} />
            <Route path="/app/admin/riders" element={<RidersManagement />} />
            <Route path="/app/admin/rides" element={<RidesManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* ─── GLOBAL ELEMENTS ────────────────────────────────────────── */}

      {/* Show Banner if user hasn't made a choice yet */}
      {!isAdminRoute && !hasMadeChoice && (
        <CookieBanner onChoice={handleCookieDecision} />
      )}

      {/* Show WhatsApp & Launcher ONLY if user explicitly accepted cookies */}
      {!isAdminRoute && hasMadeChoice && (
        <>
          <WhatsAppButton />
          <div
            style={{
              position: "fixed",
              bottom: -2,
              left: 0,
              right: 0,
              zIndex: 9999,
              background: "transparent",
              pointerEvents: "none",
            }}
          >
            <div style={{ pointerEvents: "auto" }}>
              <Launcher />
            </div>
          </div>
        </>
      )}

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
