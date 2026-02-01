import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// 1. Static Layout Components (Loaded immediately)
import Navbar from "./pages/navbar/Navbar";
import Footer from "./sections/Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import LoadingScreen from "./LoadingScreen"; // The new premium loader

// 2. Global Styles
import "./assets/fonts/fonts.css";

// 3. Lazy Loaded Page Components (Code Splitting)
const Home = lazy(() => import("./pages/Home/Home"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const Support = lazy(() => import("./pages/Support"));
const FAQsPage = lazy(() => import("./pages/FAQ/FAQsPage"));
const Company = lazy(() => import("./pages/Company"));
const LostItemPage = lazy(() => import("./pages/LostItemPage/LostItemPage"));
const HelpCenter = lazy(() => import("./pages/HelpCenter/HelpCenter"));
const AppFeatures = lazy(() => import("./pages/AppFeatures/AppFeatures"));
const TrackingPage = lazy(() => import("./pages/TrackingPage/TrackingPage"));

// 4. Lazy Loaded Sections
const HeroDelivery = lazy(() => import("./sections/HeroDelivery/MidImage"));

const App: React.FC = () => {
  const location = useLocation();

  /**
   * Logic to conditionally show HeroDelivery.
   * Only renders on landing, company, and FAQ pages.
   */
  const heroEnabledPaths = ["/", "/app/faqs", "/app/our-company"];
  const shouldShowHero = heroEnabledPaths.includes(location.pathname);

  return (
    <div
      className="app-main-wrapper"
      style={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}
    >
      {/* Resets scroll position on route change */}
      <ScrollToTop />

      {/* Persistent Navigation */}
      <Navbar />

      <main className="content-area">
        {/* Suspense handles the 'wait' while lazy components load.
            AnimatePresence allows the LoadingScreen to fade out smoothly.
        */}
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingScreen />}>
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
          </Suspense>
        </AnimatePresence>
      </main>

      {/* Bottom Hero Section (Lazy Loaded) */}
      {shouldShowHero && (
        <Suspense fallback={null}>
          <div className="section-divider-container">
            <HeroDelivery />
          </div>
        </Suspense>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
