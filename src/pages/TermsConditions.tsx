import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiUserCheck,
  FiTruck,
  FiCreditCard,
  FiAlertTriangle,
  FiMail,
  FiBriefcase,
  FiShield,
  FiPackage,
} from "react-icons/fi";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

// Shared store constants
import { ANDROID_URL, IOS_URL } from "../sections/Hero/HeroSection";

const TermsAndConditionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  const sections = [
    { id: "account", label: "User Account", icon: <FiUserCheck /> },
    { id: "services", label: "Responsibilities", icon: <FiTruck /> },
    { id: "damage", label: "Damage Policy", icon: <FiPackage /> }, // NEW SECTION
    { id: "payments", label: "Payments & Fees", icon: <FiCreditCard /> },
    { id: "liability", label: "Liability", icon: <FiAlertTriangle /> },
    { id: "legal", label: "Dispute Resolution", icon: <FiBriefcase /> },
    { id: "final", label: "Final Provisions", icon: <FiShield /> },
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
              User Agreement
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#121212] leading-tight mb-8">
              Terms of <span className="text-gray-300">Service.</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed">
              Welcome to **Pickars Courier Limited**. By using our platform, you
              agree to the following terms. We act as a technology bridge
              connecting you with independent delivery professionals.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: Sticky Navigation */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <nav className="space-y-2">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    document
                      .getElementById(sec.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                    setActiveTab(sec.id);
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-5 rounded-[25px] font-bold transition-all ${
                    activeTab === sec.id
                      ? "bg-[#121212] text-white"
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

            <div className="mt-12 p-10 bg-[#0c0c0c] rounded-[40px] text-white relative overflow-hidden">
              <FiFileText className="absolute -right-4 -bottom-4 text-white/5 text-9xl rotate-12" />
              <h4 className="font-black text-xl mb-2 relative z-10">
                Last Updated
              </h4>
              <p className="text-gray-500 text-sm relative z-10">
                February 2026
              </p>
            </div>
          </aside>

          {/* RIGHT: Content Sections */}
          <main className="lg:col-span-9 space-y-20">
            {/* 1. User Account */}
            <section id="account" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px] ">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <span className="h-10 w-1 bg-red-600 rounded-full" />
                  1. User Account
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-gray-500 leading-relaxed">
                  <div>
                    <h4 className="text-[#121212] font-black mb-3">
                      1.1 Eligibility
                    </h4>
                    <p>
                      You must be at least **18 years old** to use Pickars. By
                      registering, you warrant that you meet this requirement
                      and all information provided is accurate.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[#121212] font-black mb-3">
                      1.2 Security
                    </h4>
                    <p>
                      You are the sole custodian of your password. Any activity
                      occurring under your account is your legal responsibility.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Responsibilities & No Offline */}
            <section id="services" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-10 tracking-tight">
                2. Your Responsibilities
              </h2>
              <div className="grid gap-6">
                <div className="p-10 bg-[#121212] text-white rounded-[40px]">
                  <h4 className="text-red-600 font-black uppercase tracking-widest text-xs mb-4">
                    Prohibited Items & Activities
                  </h4>
                  <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    You strictly agree **not** to dispatch: illegal substances,
                    hazardous materials, weapons, stolen goods, or live animals.
                  </p>
                  <p className="text-white font-bold p-4 bg-red-600/20 rounded-xl border border-red-600/30">
                    <FiAlertTriangle className="inline mr-2" /> NO OFFLINE
                    TRANSACTIONS: If you attempt to pay a Rider directly to
                    circumvent Pickars fees, we are not liable for any damages,
                    losses, or disputes. Your account will be permanently
                    terminated.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Damage Policy (NEW) */}
            <section id="damage" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiPackage className="text-red-600" /> 3. Package Damage
                  Policy
                </h2>
                <div className="space-y-6 text-gray-500 text-lg">
                  <p>
                    Pickars Courier Limited acts as an intermediary. We do not
                    physically handle packages. Therefore, we **do not**
                    compensate for damaged items by default.
                  </p>
                  <div className="p-8 bg-red-50 rounded-3xl border border-red-100">
                    <h4 className="text-red-900 font-black mb-2">
                      Fragile Items Notice
                    </h4>
                    <p className="text-red-800">
                      If your item is **fragile**, you MUST select the **Insured
                      Delivery** option when booking. If you do not select
                      insurance, you bear all risk of loss or damage, and
                      Pickars is not liable for compensation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Payments */}
            <section id="payments" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiCreditCard className="text-red-600" /> 4. Payments & Fees
                </h2>
                <div className="space-y-6 text-gray-500 text-lg">
                  <p>
                    All pricing is transparently displayed before confirmation.
                    Fees are calculated based on **Distance, Demand, and Time**.
                  </p>
                  <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-sm">
                      **Cancellation Policy:** A fee may apply if a Rider has
                      already been dispatched to your pickup location.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Limitation of Liability (STRENGTHENED) */}
            <section id="liability" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-red-600 rounded-[50px] text-white ">
                <h2 className="text-3xl font-black mb-8">
                  5. Limitation of Liability
                </h2>
                <p className="text-red-100 text-lg leading-relaxed mb-8">
                  Pickars is a **Technology Intermediary**. We are not liable
                  for damages arising from offline trips, uninsured fragile
                  items, or misconduct by independent Riders.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <p className="text-xs font-black uppercase mb-2">
                      Rider Independent Contractor
                    </p>
                    <p className="text-sm opacity-80">
                      Riders are not employees of Pickars. Pickars is not
                      responsible for their negligence.
                    </p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <p className="text-xs font-black uppercase mb-2">
                      Indemnity
                    </p>
                    <p className="text-sm opacity-80">
                      You agree to indemnify and hold Pickars harmless from all
                      claims, damages, and legal fees arising from your breach
                      of these terms.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Dispute Resolution */}
            <section id="legal" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiBriefcase className="text-red-600" /> 6. Dispute Resolution
                </h2>
                <div className="space-y-8 text-gray-500 leading-relaxed">
                  <div>
                    <h4 className="text-[#121212] font-black mb-3">
                      6.1 Mediation First
                    </h4>
                    <p>
                      In the event of a dispute, both parties agree to first
                      attempt **Informal Mediation**. You must notify our legal
                      department at **admin@pickars.com** before taking any
                      formal action.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Nice-to-Have Protective Clauses */}
            <section id="final" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8">
                  7. Final Provisions
                </h2>
                <div className="grid md:grid-cols-2 gap-10 text-sm text-gray-400 font-medium">
                  <div>
                    <h4 className="text-[#121212] font-black mb-2 uppercase tracking-tighter">
                      Force Majeure
                    </h4>
                    <p>
                      Pickars is not liable for delays caused by "Acts of God,"
                      severe weather, civil unrest, or major network failures.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[#121212] font-black mb-2 uppercase tracking-tighter">
                      Severability
                    </h4>
                    <p>
                      If any part of these terms is found unenforceable, the
                      remaining sections stay in full legal effect.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[#121212] font-black mb-2 uppercase tracking-tighter">
                      Electronic Consent
                    </h4>
                    <p>
                      By clicking "I Agree," you consent to receiving all legal
                      notices and updates electronically via the App.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[#121212] font-black mb-2 uppercase tracking-tighter">
                      Amendments
                    </h4>
                    <p>
                      We may update these terms. Continued use of Pickars after
                      updates constitutes acceptance of new terms.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* --- DOWNLOAD THE APP STRIP --- */}
            <section className="mt-20">
              <div className="bg-[#121212] rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 shadow-2xl">
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-black text-white tracking-tighter mb-2">
                    Ready to ship?
                  </h3>
                  <p className="text-gray-500 font-bold">
                    Download Pickars for the best experience.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={IOS_URL}
                    target="_blank"
                    className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-black transition-transform hover:scale-105"
                  >
                    <FaApple size={20} /> App Store
                  </a>
                  <a
                    href={ANDROID_URL}
                    target="_blank"
                    className="flex items-center gap-3 bg-white/10 text-white px-6 py-4 rounded-2xl font-black border border-white/10 transition-transform hover:scale-105"
                  >
                    <BiLogoPlayStore size={20} /> Play Store
                  </a>
                </div>
              </div>
            </section>

            {/* Footer Contact */}
            <section className="pt-20 text-center">
              <h3 className="text-2xl font-black mb-4 text-[#121212]">
                Have questions about these terms?
              </h3>
              <a
                href="mailto:admin@pickars.com"
                className="inline-flex items-center gap-3 bg-red-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#121212] transition-colors"
              >
                <FiMail /> Contact Legal Administration
              </a>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
