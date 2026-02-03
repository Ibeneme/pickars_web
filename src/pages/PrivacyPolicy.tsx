import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiEye,
  FiLock,
  FiMapPin,
  FiInfo,
  FiMail,
} from "react-icons/fi";

const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("intro");

  // Sections for the sticky side-nav
  const sections = [
    { id: "intro", label: "Overview", icon: <FiShield /> },
    { id: "collection", label: "Data Collection", icon: <FiInfo /> },
    { id: "cookies", label: "Cookie Policy", icon: <FiEye /> },
    { id: "use", label: "Usage & Analysis", icon: <FiLock /> },
    { id: "location", label: "Location Services", icon: <FiMapPin /> },
    { id: "contact", label: "Contact Us", icon: <FiMail /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[180px] font-['Lufga'] py-24 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600 mb-4 block">
              Trust & Security
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#121212] leading-tight mb-8">
              Privacy <span className="text-gray-300">Policy.</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed">
              At **Pickars Courier Limited**, transparency is a core value. We
              are committed to protecting your personal data and being clear
              about how we use it.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: Sticky Navigation (Hidden on Mobile) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <nav className="space-y-2">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    document
                      .getElementById(sec.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection(sec.id);
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeSection === sec.id
                      ? "bg-[#121212] text-white "
                      : "text-gray-400 hover:bg-gray-100 hover:text-[#121212]"
                  }`}
                >
                  <span className="text-xl">{sec.icon}</span>
                  <span className="text-sm uppercase tracking-widest">
                    {sec.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-12 p-8 bg-red-600 rounded-[32px] text-white ">
              <h4 className="font-black text-xl mb-2">Need Help?</h4>
              <p className="text-red-100 text-sm mb-6 leading-relaxed">
                Questions about your data? Our legal team is here.
              </p>
              <a
                href="mailto:support@pickars.com"
                className="block text-center bg-white text-red-600 py-3 rounded-xl font-bold text-sm"
              >
                Email Support
              </a>
            </div>
          </aside>

          {/* RIGHT: Scrollable Content */}
          <main className="lg:col-span-9 space-y-24">
            {/* Section 1: Intro */}
            <section id="intro" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px] ">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <span className="h-10 w-1 bg-red-600 rounded-full" />
                  1. Introduction
                </h2>
                <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
                  <p>
                    **Pickars Courier Limited** ("Pickars", “we”, “us”) provides
                    a technology platform for logistical needs. Personal
                    information is any data that identifies you—such as your
                    name, email, and live location.
                  </p>
                  <p>
                    This policy is reviewed annually. As we add new features,
                    our practices may evolve. We will always notify you of
                    significant changes by publishing the new version here.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Collection */}
            <section id="collection" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-10 tracking-tight">
                2. How We Collect Data
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Account creation (Name, Phone, Email)",
                  "Booking a rider for delivery",
                  "Subscribing to newsletters",
                  "Customer support inquiries",
                  "Participating in promotions",
                  "App/Website usage tracking",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-8 bg-white border border-gray-50 rounded-[32px] flex items-start gap-4"
                  >
                    <div className="h-8 w-8 rounded-full bg-red-50 text-red-600 flex shrink-0 items-center justify-center font-bold">
                      ✓
                    </div>
                    <p className="text-gray-600 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Cookies */}
            <section id="cookies" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-[#121212] rounded-[50px] text-white">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiEye className="text-red-600" /> 3. The Use of Cookies
                </h2>
                <div className="space-y-6 text-gray-400 text-lg">
                  <p>
                    We use cookies and web beacons to understand platform usage.
                    These tools help us remember your preferences so you don't
                    have to log in every time.
                  </p>
                  <p>
                    Cookies do not harm your computer. You can disable them in
                    your browser, though some features of Pickars may become
                    unavailable.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Usage */}
            <section id="use" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-10 tracking-tight">
                4. Usage & Analysis
              </h2>
              <div className="bg-white border border-gray-100 rounded-[50px] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-8 text-sm uppercase tracking-widest font-black text-gray-400">
                        Purpose
                      </th>
                      <th className="p-8 text-sm uppercase tracking-widest font-black text-gray-400">
                        Benefit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-600">
                    <tr>
                      <td className="p-8 font-bold text-[#121212]">
                        Operational
                      </td>
                      <td className="p-8">
                        Facilitating dispatch and delivery services.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-8 font-bold text-[#121212]">Security</td>
                      <td className="p-8">
                        Verifying identities and preventing fraud.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-8 font-bold text-[#121212]">
                        Marketing
                      </td>
                      <td className="p-8">
                        Keeping you updated on features you'll love.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5: Location */}
            <section id="location" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-red-50 border border-red-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 text-red-600 flex items-center gap-4">
                  <FiMapPin /> 5. Location Services
                </h2>
                <p className="text-red-900/70 text-lg leading-relaxed mb-6">
                  **Enabling location services is essential for Pickars.** We
                  use GPS, IP addresses, and Wi-Fi metadata to connect you with
                  the nearest riders and optimize delivery routes.
                </p>
                <div className="bg-white/50 p-6 rounded-2xl text-red-600 text-sm font-bold border border-red-200">
                  Note: You can manage these settings on your device at any
                  time.
                </div>
              </div>
            </section>

            {/* Footer Notice */}
            <footer className="pt-12 border-t border-gray-100">
              <p className="text-gray-400 text-sm">
                Last Updated: February 2026 • Pickars Courier Limited Legal
                Department
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
