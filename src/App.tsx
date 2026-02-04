import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Static imports — no lazy loading
import Navbar from "./pages/navbar/Navbar";
import Footer from "./sections/Footer/Footer";
import ScrollToTop from "./ScrollToTop";

// Page components — imported eagerly
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

// Global styles
import "./assets/fonts/fonts.css";
import "./index.css";

// Launcher
import Launcher from "./components/Launcher/Laucher";

const App: React.FC = () => {
  const location = useLocation();

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

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main
        className="content-area"
        style={{
          flex: 1,
          paddingBottom: "90px", // prevents content from hiding behind launcher
        }}
      >
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
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed Bottom Launcher */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
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
    </div>
  );
};

export default App;
