import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FiFileText,
  FiTruck,
  FiCreditCard,
  FiAlertTriangle,
  FiCalendar,
  FiShield,
  FiUserPlus,
} from "react-icons/fi";
import { FaMotorcycle, FaTshirt } from "react-icons/fa";

const DispatchRiderTermsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("application");

  const sections = [
    { id: "application", label: "Application", icon: <FiUserPlus /> },
    { id: "schedule", label: "Work Schedule", icon: <FiCalendar /> },
    { id: "compensation", label: "Compensation", icon: <FiCreditCard /> },
    { id: "vehicle", label: "Bike & Uniform", icon: <FaMotorcycle /> },
    { id: "conduct", label: "Strict Conduct", icon: <FiAlertTriangle /> },
    { id: "duties", label: "Duties & Scope", icon: <FiTruck /> },
    { id: "compliance", label: "Compliance", icon: <FiShield /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[180px] font-['Lufga'] py-24 px-6 md:px-12">
      <Helmet>
        <title>
          Dispatch Rider Terms &amp; Conditions | Pickars Logistics - Port
          Harcourt
        </title>
        <meta
          name="description"
          content="Official Dispatch Rider Terms and Conditions for Pickars Courier Limited in Port Harcourt."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600 mb-4 block">
              RIDER AGREEMENT — PORT HARCOURT
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#121212] leading-tight mb-8">
              Dispatch Rider <span className="text-gray-300">Terms.</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed">
              These terms govern the engagement of Dispatch Riders with Pickars
              Courier Limited operating across Port Harcourt and its environs.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
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
              <p className="text-gray-500 text-sm relative z-10">July 2026</p>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-20">
            {/* 1. Application */}
            <section id="application" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <span className="h-10 w-1 bg-red-600 rounded-full" />
                  1. Application Requirements
                </h2>
                <div className="prose text-gray-600 text-[17px] leading-relaxed">
                  <p>
                    All prospective Dispatch Riders must be residents of Port
                    Harcourt or its immediate environs (such as Iwofe, Rumuigbo,
                    NTA, RumuOkwuta). To be considered, you are required to
                    provide <strong>two (2) credible guarantors</strong>
                    who are gainfully employed and resident within Port
                    Harcourt.
                  </p>
                  <p className="mt-6">
                    Guarantors must be ready to sign documentation and may be
                    contacted for verification.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Work Schedule */}
            <section id="schedule" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiCalendar className="text-red-600" /> 2. Work Schedule
                </h2>
                <div className="space-y-10 text-[17px] text-gray-600">
                  <div>
                    <h4 className="font-bold text-xl text-[#121212] mb-4">
                      Core Working Days &amp; Hours
                    </h4>
                    <p>
                      Riders operate from <strong>Monday to Saturday</strong>,
                      9:00 AM to 5:00 PM. This covers major routes across Port
                      Harcourt including Diobu, Mile 1-4, Rumuokwuta, Woji, and
                      Elekahia.
                    </p>
                  </div>

                  <div className="p-8 bg-green-50 border border-green-100 rounded-3xl">
                    <strong>Wednesday</strong> is your designated day off.
                    However, if you choose to work on Wednesday, you will
                    receive full payment for the day.
                  </div>

                  <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl">
                    On <strong>Saturdays</strong>, operations may extend until
                    8:00 PM depending on delivery volume. Riders who work till
                    8:00 PM will receive an additional{" "}
                    <strong>₦1,500 - ₦3,000 </strong> bonus for that day.
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Compensation */}
            <section id="compensation" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-[#121212] text-white rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiCreditCard className="text-red-500" /> 3. Compensation
                  &amp; Benefits
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 p-8 rounded-3xl">
                    <div className="text-6xl font-black mb-1">₦80,000</div>
                    <div className="text-sm uppercase tracking-widest text-gray-400">
                      Monthly Base Salary
                    </div>
                    <p className="mt-6 text-gray-300 text-[15px]">
                      Paid for consistent performance across all assigned
                      deliveries in Port Harcourt metropolis.
                    </p>
                  </div>
                  <div className="bg-white/10 p-8 rounded-3xl">
                    <div className="text-6xl font-black text-emerald-400 mb-1">
                      ₦10,000
                    </div>
                    <div className="text-sm uppercase tracking-widest text-gray-400">
                      Monthly Airtime Allowance
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-8 bg-white/10 rounded-3xl">
                  <p className="text-emerald-400 font-bold">
                    Saturday Extension Bonus: ₦1,500 - ₦3,000
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Paid when you work beyond normal hours up to 8:00 PM.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Bike & Uniform */}
            <section id="vehicle" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FaMotorcycle className="text-red-600" /> 4. Bike, Uniform
                  &amp; Pickup
                </h2>
                <div className="space-y-8 text-[17px] text-gray-600">
                  <div>
                    <h4 className="font-bold text-xl mb-4">
                      Bike Pickup Location
                    </h4>
                    <p>
                      You are to pick up the company bike daily from the
                      Manager’s residence around{" "}
                      <strong>
                        Jesus Avenue, Rumugbo (Rumuigbo axis) or behind Location
                        Junction
                      </strong>
                      , Port Harcourt.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-xl mb-4 flex items-center gap-3">
                        <FaMotorcycle /> Maintenance
                      </h4>
                      <p>
                        The company has a dedicated mechanic. Riders must not
                        fuel or repair the bike themselves.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-4 flex items-center gap-3">
                        <FaTshirt /> Uniform
                      </h4>
                      <p>
                        You will be issued two (2) official Pickars shirts.
                        These must be worn while on duty, with your personal
                        black trousers as our riders branding is black
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Strict Conduct */}
            <section id="conduct" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-red-600 text-white rounded-[50px]">
                <h2 className="text-3xl font-black mb-8">
                  5. Strict Conduct Rules
                </h2>
                <div className="space-y-6">
                  <div className="bg-white/10 p-7 rounded-2xl flex gap-5">
                    <FiAlertTriangle className="text-3xl flex-shrink-0" />
                    <p>
                      You must not add any amount (even ₦1) to the company’s
                      quoted delivery price.
                    </p>
                  </div>
                  <div className="bg-white/10 p-7 rounded-2xl flex gap-5">
                    <FiAlertTriangle className="text-3xl flex-shrink-0" />
                    <p>
                      Never send your personal bank account number to any
                      customer. This is a serious offence that may lead to
                      arrest.
                    </p>
                  </div>
                  <div className="bg-white/10 p-7 rounded-2xl flex gap-5">
                    <FiAlertTriangle className="text-3xl flex-shrink-0" />
                    <p>
                      Do not contact company customers using your personal
                      phone. Use only the company-provided phone and SIM.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Duties */}
            <section id="duties" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiTruck className="text-red-600" /> 6. Duties &amp; Scope of
                  Work
                </h2>
                <div className="text-[17px] text-gray-600 space-y-6">
                  <p>
                    Your primary and only responsibility is to deliver packages
                    assigned to you by Pickars Courier Limited. This includes
                    deliveries within Port Harcourt and surrounding areas such
                    as Obio-Akpor, Elelenwo, and Rumuepirikom.
                  </p>
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                    <p className="font-bold mb-4">Prohibited Activities:</p>
                    <ul className="space-y-3 list-disc pl-6">
                      <li>
                        Carrying out private or extra deliveries not assigned by
                        the company.
                      </li>
                      <li>
                        Using company bike, phone, or uniform for personal
                        business.
                      </li>
                      <li>
                        Sharing or exchanging contacts of company clients.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Compliance */}
            <section id="compliance" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8">
                  7. Compliance &amp; Verification
                </h2>
                <div className="text-[17px] text-gray-600">
                  <p>
                    To maintain high standards of trust and professionalism
                    across Port Harcourt, all riders will undergo monthly
                    personal and professional verification checks at the police
                    station.
                  </p>
                  <p className="mt-6">
                    This is mandatory and forms part of our commitment to
                    security and regulatory compliance.
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-16 text-center">
              <div className="inline-block bg-white border border-gray-100 rounded-[40px] p-12 max-w-xl">
                <p className="text-2xl font-medium text-gray-700">
                  Thank you for riding with Pickars — Port Harcourt’s trusted
                  courier service.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DispatchRiderTermsPage;
