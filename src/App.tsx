import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Support from "./pages/Support";
import "./assets/fonts/fonts.css";
import Navbar from "./pages/navbar/Navbar";
import Footer from "./sections/Footer/Footer";
import FAQsPage from "./pages/FAQ/FAQsPage";
import HeroDelivery from "./sections/HeroDelivery/MidImage";
import Company from "./pages/Company";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/app/terms-of-use" element={<TermsConditions />} />
        <Route path="/app/support" element={<Support />} />
        <Route path="/app/faqs" element={<FAQsPage />} />
        <Route path="/app/our-company" element={<Company />} />
      </Routes>
      <HeroDelivery />
      <Footer />
    </>
  );
}

export default App;
