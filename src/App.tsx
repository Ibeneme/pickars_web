import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

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
import AppFeatures from "./pages/AppFeatures/AppFeatures";

// Admin Components
import AdminLogin from "./pages/admin/auth/adminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import UsersManagement from "./pages/admin/dashboard/UserManagement";
import RidersManagement from "./pages/admin/dashboard/RiderManagement";
import RidesManagement from "./pages/admin/dashboard/RidesManagement";
import PaymentsManagement from "./pages/admin/dashboard/PaymentsManagement";
import MarketingCenter from "./pages/admin/dashboard/MarketingCenter";

// Manual Ride Components
import ManualRideDispatch from "./pages/admin/dashboard/ManualRidesManagement";
import CreateManualRide from "./pages/admin/manualRides/CreateMR";
import ViewManualRide from "./pages/admin/manualRides/ViewManualRide";

// Navigation & Security
import ProtectedRoute from "./pages/navigation/ProtectedRoute";
import PaymentSuccess from "./pages/TrackingPage/PaymentSuccess";
import DispatchRiderTermsPage from "./pages/DispatchRiderTermsPage";
import CompanyPage from "./pages/OurCompany";
import TrackingPageMain from "./pages/TrackingPage/TrackingPageMain";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  const location = useLocation();
  const adminPaths = ["/app/admin", "/admin"];

  const isAdminRoute = adminPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div>
      <ScrollToTop />

      {!isAdminRoute && <Navbar />}

      <main style={{ marginBottom: 0 }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/app/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/app/terms-of-use" element={<TermsConditions />} />
          <Route path="/app/support" element={<Support />} />
          <Route path="/app/faqs" element={<FAQsPage />} />
          <Route path="/app/our-company" element={<CompanyPage />} />

          <Route path="/app/find-item" element={<FAQsPage />} />
          <Route path="/app/help-center" element={<FAQsPage />} />
          <Route path="/app/app-features" element={<AppFeatures />} />
          <Route path="/app/tracking" element={<TrackingPageMain />} />
          <Route path="/track" element={<PaymentSuccess />} />
          <Route path="/rider-terms" element={<DispatchRiderTermsPage />} />
          <Route
            path="/quick-delivery/dispatch-rider-and-delivery/port-harcourt"
            element={<Home />}
          />
          <Route path="/dispatch-riders-in-port-harcourt" element={<Home />} />
          <Route path="/dispatch-rider-near-me" element={<Home />} />
          <Route path="/get-a-rider" element={<Home />} />
          <Route path="/fast-delivery-port-harcourt" element={<Home />} />
          <Route path="/same-day-delivery-port-harcourt" element={<Home />} />
          <Route path="/bike-delivery-services" element={<Home />} />
          <Route path="/dispatch-rider-gra-port-harcourt" element={<Home />} />
          <Route path="/dispatch-rider-trans-amadi" element={<Home />} />
          <Route path="/dispatch-rider-woji" element={<Home />} />

          <Route path="/app/admin" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/app/admin/dashboard" element={<Dashboard />} />
            <Route path="/app/admin/users" element={<UsersManagement />} />
            <Route path="/app/admin/riders" element={<RidersManagement />} />
            <Route path="/app/admin/rides" element={<RidesManagement />} />
            <Route
              path="/app/admin/payments"
              element={<PaymentsManagement />}
            />
            <Route path="/app/admin/marketing" element={<MarketingCenter />} />
            <Route
              path="/app/admin/manual-booking"
              element={<ManualRideDispatch />}
            />
            <Route
              path="/admin/manual-rides/create"
              element={<CreateManualRide />}
            />
            <Route
              path="/admin/manual-rides/:trackingId"
              element={<ViewManualRide />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
