import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout Components
import Navbar from "./pages/navbar/Navbar";
import Footer from "./sections/Footer/Footer";
import ScrollToTop from "./ScrollToTop";

// Page Components
import Home from "./pages/Home/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Support from "./pages/Support";
import FAQsPage from "./pages/FAQ/FAQsPage";
import Company from "./pages/Company";
import LostItemPage from "./pages/LostItemPage/LostItemPage";
import HelpCenter from "./pages/HelpCenter/HelpCenter";
import AppFeatures from "./pages/AppFeatures/AppFeatures";

// Sections
import HeroDelivery from "./sections/HeroDelivery/MidImage";

// Styles
import "./assets/fonts/fonts.css";

const App: React.FC = () => {
  const location = useLocation();

  /**
   * Logic to conditionally show HeroDelivery.
   * It will only render on the landing page, company page, and FAQ page.
   */
  const heroEnabledPaths = ["/", "/app/faqs", "/app/our-company"];

  const shouldShowHero = heroEnabledPaths.includes(location.pathname);

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Ensures page always starts at the top on route change */}
      <ScrollToTop />

      {/* Global Navigation */}
      <Navbar />

      <main className="content-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/app/terms-of-use" element={<TermsConditions />} />
          <Route path="/app/support" element={<Support />} />
          <Route path="/app/faqs" element={<FAQsPage />} />
          <Route path="/app/our-company" element={<Company />} />
          <Route path="/app/find-item" element={<LostItemPage />} />
          <Route path="/app/help-center" element={<HelpCenter />} />
          <Route path="/app/app-features" element={<AppFeatures />} />
        </Routes>
      </main>

      {/* HeroDelivery restyled as a high-impact 'Mid-Image' section. 
          This only appears on the main marketing pages.
      */}
      {shouldShowHero && (
        <div className="section-divider-container">
          <HeroDelivery />
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
