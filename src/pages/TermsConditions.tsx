import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiUserCheck,
  FiTruck,
  FiCreditCard,
  FiAlertTriangle,
  FiGlobe,
  FiMail,
} from "react-icons/fi";

const TermsAndConditionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  const sections = [
    { id: "account", label: "User Account", icon: <FiUserCheck /> },
    { id: "services", label: "Responsibilities", icon: <FiTruck /> },
    { id: "payments", label: "Payments & Fees", icon: <FiCreditCard /> },
    { id: "liability", label: "Liability", icon: <FiAlertTriangle /> },
    { id: "legal", label: "Governing Law", icon: <FiGlobe /> },
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
                      ? "bg-[#121212] text-white shadow-2xl shadow-black/20"
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
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px] shadow-sm">
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

            {/* 2. Responsibilities */}
            <section id="services" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-10 tracking-tight">
                2. Your Responsibilities
              </h2>
              <div className="grid gap-6">
                <div className="p-10 bg-[#121212] text-white rounded-[40px]">
                  <h4 className="text-red-600 font-black uppercase tracking-widest text-xs mb-4">
                    Prohibited Items
                  </h4>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    You strictly agree **not** to dispatch: illegal substances,
                    hazardous materials, weapons, stolen goods, or live animals.
                    Pickars reserves the right to cancel any request that
                    violates safety protocols.
                  </p>
                </div>
                <div className="p-10 bg-white border border-gray-100 rounded-[40px]">
                  <h4 className="text-[#121212] font-black mb-2">
                    Professionalism
                  </h4>
                  <p className="text-gray-500 leading-relaxed">
                    Harassment of Riders will result in an immediate and
                    permanent **Account Ban**. Communication must remain
                    professional at all times.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Payments */}
            <section id="payments" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiCreditCard className="text-red-600" /> 3. Payments & Fees
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

            {/* 4. Liability Disclaimer */}
            <section id="liability" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-red-600 rounded-[50px] text-white shadow-2xl shadow-red-600/20">
                <h2 className="text-3xl font-black mb-8">
                  4. Limitation of Liability
                </h2>
                <p className="text-red-100 text-lg leading-relaxed mb-8">
                  Pickars is a **Technology Intermediary**, not a courier
                  service. We facilitate connections but are not responsible for
                  the independent actions, omissions, or conduct of Riders.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <p className="text-xs font-black uppercase mb-2">
                      As-Is Basis
                    </p>
                    <p className="text-sm opacity-80">
                      We do not guarantee the Platform will be 100% error-free
                      or uninterrupted.
                    </p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <p className="text-xs font-black uppercase mb-2">
                      Indemnity
                    </p>
                    <p className="text-sm opacity-80">
                      You agree to hold Pickars harmless from claims arising
                      from your use of the service.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Legal */}
            <section id="legal" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-8">5. Governing Law</h2>
              <div className="p-10 bg-white border border-gray-100 rounded-[40px] flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-lg">
                    These terms are governed by the laws of the **Federal
                    Republic of Nigeria**.
                  </p>
                </div>
                <FiGlobe className="text-5xl text-gray-100" />
              </div>
            </section>

            {/* Footer Contact */}
            <section className="pt-20 text-center">
              <h3 className="text-2xl font-black mb-4 text-[#121212]">
                Have questions about these terms?
              </h3>
              <a
                href="mailto:support@pickars.com"
                className="inline-flex items-center gap-3 bg-red-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#121212] transition-colors"
              >
                <FiMail /> Contact Legal Support
              </a>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
