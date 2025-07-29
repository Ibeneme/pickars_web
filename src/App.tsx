import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Support from './pages/Support';
import "./assets/fonts/fonts.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/app/terms-of-use" element={<TermsConditions />} />
        <Route path="/app/support" element={<Support />} />
      </Routes>
    </>
  );
}

export default App;