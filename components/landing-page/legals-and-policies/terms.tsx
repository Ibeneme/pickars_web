"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  FiLock,
} from "react-icons/fi";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";

const TermsAndConditions: React.FC = () => {
  const [activeSection, setActiveSection] = useState("intro");

  const sections = [
    { id: "intro", label: "Agreement", icon: <FiFileText /> },
    { id: "services", label: "The Services", icon: <FiTruck /> },
    { id: "account", label: "User Accounts", icon: <FiUserCheck /> },
    { id: "conduct", label: "User Conduct", icon: <FiLock /> },
    { id: "payments", label: "Payments & Fees", icon: <FiCreditCard /> },
    { id: "damage", label: "Damage & Insurance", icon: <FiPackage /> },
    { id: "liability", label: "Liability", icon: <FiAlertTriangle /> },
    { id: "disputes", label: "Disputes", icon: <FiBriefcase /> },
    { id: "final", label: "Final Provisions", icon: <FiShield /> },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[140px] md:pt-[180px] font-['Lufga'] py-16 md:py-24 px-5 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600 mb-4 block">
              User Agreement
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#121212] leading-[0.95] mb-6">
              Terms of <span className="text-gray-300">Service.</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl">
              These Terms of Service (“Terms”) govern your access to and use of
              the Pickars platform. By using our app or website you agree to be
              bound by these Terms.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Last updated: 17 September 2026 • Applicable only in Port
              Harcourt, Nigeria
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sticky Side Nav */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-36 h-fit">
            <nav className="space-y-1.5">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl font-bold transition-all text-left ${
                    activeSection === sec.id
                      ? "bg-[#121212] text-white"
                      : "text-gray-400 hover:bg-gray-100 hover:text-[#121212]"
                  }`}
                >
                  <span className="text-lg">{sec.icon}</span>
                  <span className="text-xs uppercase tracking-widest">
                    {sec.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-10 p-7 bg-[#0c0c0c] rounded-[28px] text-white relative overflow-hidden">
              <FiFileText className="absolute -right-3 -bottom-3 text-white/5 text-8xl rotate-12" />
              <h4 className="font-black text-lg mb-1 relative z-10">
                Last Updated
              </h4>
              <p className="text-gray-400 text-sm relative z-10">
                17 September 2026
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-20 md:space-y-28">
            {/* 1. Contractual Relationship */}
            <section id="intro" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-white border border-gray-100 rounded-[40px]">
                <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-4">
                  <span className="h-9 w-1 bg-red-600 rounded-full" />
                  1. Contractual Relationship
                </h2>
                <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                  <p>
                    These Terms of Service (“Terms”) govern your access to and
                    use of the applications, websites, content, products and
                    services (the “Services”) made available by{" "}
                    <strong>Pickars Courier Limited</strong> (“Pickars”, “we”,
                    “us”), a company registered in Nigeria and operating
                    exclusively in Port Harcourt, Rivers State.
                  </p>
                  <p>
                    Your access to and use of the Services constitutes your
                    agreement to be bound by these Terms and creates a
                    contractual relationship between you and Pickars. If you do
                    not agree to these Terms, you may not access or use the
                    Services.
                  </p>
                  <p>
                    Pickars may amend these Terms from time to time. Amended
                    Terms will be effective upon posting on this page or within
                    the app. Your continued use of the Services after such
                    posting constitutes your acceptance of the amended Terms.
                  </p>
                  <p>
                    Our collection and use of personal data is governed by our{" "}
                    <Link
                      href="/app/privacy-policy"
                      className="text-red-600 font-medium underline"
                    >
                      Privacy Notice.
                    </Link>
                  </p>
                </div>
              </div>
            </section>

            {/* 2. The Services */}
            <section id="services" className="scroll-mt-36">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                2. The Services
              </h2>
              <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  Pickars provides a technology platform that enables users to
                  arrange and schedule logistics and delivery services with
                  independent third-party dispatch riders (“Riders”) who are
                  under agreement with Pickars.
                </p>
                <p>
                  Subject to your compliance with these Terms, Pickars grants
                  you a limited, non-exclusive, non-transferable, revocable
                  licence to access and use the Pickars app and website solely
                  for your personal, non-commercial use in connection with the
                  Services.
                </p>
                <p>
                  You may not reverse-engineer, scrape, copy, modify, sell or
                  otherwise exploit the Services except as expressly permitted
                  by Pickars.
                </p>
              </div>
            </section>

            {/* 3. User Accounts */}
            <section id="account" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-white border border-gray-100 rounded-[40px]">
                <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-4">
                  <span className="h-9 w-1 bg-red-600 rounded-full" />
                  3. User Accounts
                </h2>
                <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
                  <p>
                    To use most features of the Services you must register and
                    maintain an active personal account. You must be at least{" "}
                    <strong>18 years of age</strong> (or the age of legal
                    majority in Nigeria) to create an account.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      You agree to provide accurate, complete and up-to-date
                      information.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      You are solely responsible for all activity that occurs
                      under your account.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      You may possess only one account unless Pickars expressly
                      permits otherwise.
                    </li>
                  </ul>
                  <p>
                    Pickars may suspend or terminate your account at any time if
                    you breach these Terms or if we reasonably believe your
                    account is being used for fraudulent or unlawful purposes.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. User Conduct */}
            <section id="conduct" className="scroll-mt-36">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                4. User Conduct & Prohibited Items
              </h2>
              <div className="space-y-6">
                <div className="p-8 bg-white border border-gray-100 rounded-[32px]">
                  <h3 className="font-black text-xl mb-4 text-[#121212]">
                    Acceptable Use
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    You agree to use the Services only for lawful purposes and
                    in accordance with all applicable Nigerian laws. You will
                    not cause nuisance, annoyance, inconvenience or property
                    damage to any Rider or third party.
                  </p>
                </div>

                <div className="p-8 bg-[#121212] text-white rounded-[32px]">
                  <h3 className="font-black text-xl mb-4 text-red-400">
                    Strictly Prohibited Items
                  </h3>
                  <p className="text-gray-300 mb-5 leading-relaxed">
                    You may not request the delivery of any of the following:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-3 text-gray-300">
                    <li>• Illegal substances or drugs</li>
                    <li>• Weapons, explosives or ammunition</li>
                    <li>• Hazardous or flammable materials</li>
                    <li>• Stolen goods</li>
                    <li>• Live animals</li>
                    <li>• Counterfeit or pirated items</li>
                    <li>• Any item prohibited under Nigerian law</li>
                  </ul>
                </div>

                <div className="p-6 bg-red-50 border border-red-100 rounded-[28px]">
                  <p className="text-red-800 font-medium leading-relaxed">
                    <FiAlertTriangle className="inline mr-2 text-red-600" />
                    <strong>No Offline Transactions:</strong> Attempting to
                    arrange or pay a Rider directly outside the Pickars platform
                    to avoid platform fees is strictly prohibited. Doing so may
                    result in permanent account termination and Pickars will
                    have no liability for any resulting loss or dispute.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Payments */}
            <section id="payments" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-white border border-gray-100 rounded-[40px]">
                <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-4">
                  <FiCreditCard className="text-red-600" />
                  5. Payments, Fees & Cancellations
                </h2>
                <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                  <p>
                    Use of the Services may result in charges for the delivery
                    services you request (“Charges”). Pickars facilitates
                    payment of the Charges on behalf of the independent Rider as
                    a limited payment collection agent. Payment through the
                    platform is considered payment made directly to the Rider.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      Charges are calculated based on distance, time, demand
                      (including surge pricing) and any applicable fees or
                      taxes.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      All Charges are due immediately and are generally
                      non-refundable except as required by Nigerian law or as
                      determined by Pickars in its discretion.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      You may cancel a request before the Rider arrives. A
                      cancellation fee may apply once a Rider has been
                      dispatched.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      Tips/gratuities are voluntary and entirely at your
                      discretion.
                    </li>
                  </ul>
                  <p>
                    Pickars reserves the right to revise Charges at any time.
                    You will always see the applicable price (or estimate)
                    before confirming a booking.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Damage & Insurance */}
            <section id="damage" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-white border border-gray-100 rounded-[40px]">
                <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-4">
                  <FiPackage className="text-red-600" />
                  6. Package Damage, Loss & Insurance
                </h2>
                <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                  <p>
                    Pickars is a technology intermediary and does not physically
                    handle packages. Responsibility for the safe packaging and
                    condition of items rests primarily with the sender.
                  </p>
                  <div className="p-6 bg-red-50 border border-red-100 rounded-[28px]">
                    <h4 className="font-black text-red-900 mb-2">
                      Fragile & High-Value Items
                    </h4>
                    <p className="text-red-800">
                      If your item is fragile, perishable or of significant
                      value, you should select any available{" "}
                      <strong>Insured Delivery</strong> option at the time of
                      booking (where offered). If you do not purchase insurance,
                      you accept the full risk of loss or damage and Pickars
                      shall not be liable for compensation.
                    </p>
                  </div>
                  <p>
                    In the event a Rider reports damage to their vehicle or
                    property caused by your package beyond normal wear and tear,
                    and the claim is verified by Pickars, we reserve the right
                    to charge your payment method for the reasonable cost of
                    repair or cleaning.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Liability */}
            <section id="liability" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-red-600 rounded-[40px] text-white">
                <h2 className="text-2xl md:text-3xl font-black mb-6">
                  7. Disclaimers & Limitation of Liability
                </h2>
                <div className="space-y-5 text-red-50 text-base md:text-lg leading-relaxed">
                  <p>
                    THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE”. TO THE
                    MAXIMUM EXTENT PERMITTED BY NIGERIAN LAW, PICKARS DISCLAIMS
                    ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                    NON-INFRINGEMENT.
                  </p>
                  <p>
                    Pickars does not guarantee the quality, suitability, safety
                    or ability of any independent Rider. You agree that the
                    entire risk arising from your use of the Services and any
                    delivery obtained through them remains with you.
                  </p>
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, PICKARS SHALL NOT BE
                    LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL
                    OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, DATA,
                    GOODWILL OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR
                    RELATED TO YOUR USE OF THE SERVICES.
                  </p>
                  <p>
                    In no event shall Pickars’ total aggregate liability to you
                    in connection with the Services exceed the total amount of
                    Charges paid by you to Pickars in the three (3) months
                    preceding the claim, or ₦50,000, whichever is higher.
                  </p>
                  <p className="text-sm opacity-90">
                    Nothing in these Terms excludes or limits liability that
                    cannot be excluded or limited under applicable Nigerian law
                    (including liability for death or personal injury caused by
                    negligence, or fraud).
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Dispute Resolution */}
            <section id="disputes" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-white border border-gray-100 rounded-[40px]">
                <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-4">
                  <FiBriefcase className="text-red-600" />
                  8. Governing Law & Dispute Resolution
                </h2>
                <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                  <p>
                    These Terms shall be governed by and construed in accordance
                    with the laws of the Federal Republic of Nigeria.
                  </p>
                  <p>
                    In the event of any dispute, claim or controversy arising
                    out of or relating to these Terms or the Services, the
                    parties agree to first attempt to resolve the matter
                    amicably through good-faith negotiation. You must notify
                    Pickars in writing at{" "}
                    <a
                      href="mailto:support@pickars.com"
                      className="text-red-600 font-medium"
                    >
                      support@pickars.com
                    </a>{" "}
                    before commencing any formal proceedings.
                  </p>
                  <p>
                    If the dispute is not resolved within thirty (30) days, it
                    may be referred to mediation under the rules of a recognised
                    mediation centre in Port Harcourt or Lagos. If mediation
                    fails, the dispute shall be subject to the exclusive
                    jurisdiction of the courts of Rivers State, Nigeria.
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Final Provisions */}
            <section id="final" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-white border border-gray-100 rounded-[40px]">
                <h2 className="text-2xl md:text-3xl font-black mb-8">
                  9. Final Provisions
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-gray-600 text-sm md:text-base leading-relaxed">
                  <div>
                    <h4 className="font-black text-[#121212] mb-2 uppercase tracking-tight text-xs">
                      Force Majeure
                    </h4>
                    <p>
                      Pickars shall not be liable for any failure or delay
                      caused by circumstances beyond its reasonable control,
                      including acts of God, natural disasters, civil unrest,
                      strikes, network failures or government actions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-black text-[#121212] mb-2 uppercase tracking-tight text-xs">
                      Severability
                    </h4>
                    <p>
                      If any provision of these Terms is held to be invalid or
                      unenforceable, the remaining provisions shall continue in
                      full force and effect.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-black text-[#121212] mb-2 uppercase tracking-tight text-xs">
                      Entire Agreement
                    </h4>
                    <p>
                      These Terms, together with the Privacy Notice and any
                      supplemental terms, constitute the entire agreement
                      between you and Pickars regarding the Services.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-black text-[#121212] mb-2 uppercase tracking-tight text-xs">
                      Assignment
                    </h4>
                    <p>
                      You may not assign these Terms without Pickars’ prior
                      written consent. Pickars may assign these Terms to an
                      affiliate or successor without restriction.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-black text-[#121212] mb-2 uppercase tracking-tight text-xs">
                      Notices
                    </h4>
                    <p>
                      Pickars may provide notices via the app, email or other
                      electronic means. You may contact us at the address below.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-black text-[#121212] mb-2 uppercase tracking-tight text-xs">
                      No Agency
                    </h4>
                    <p>
                      Nothing in these Terms creates a partnership, joint
                      venture, employment or agency relationship between you,
                      Pickars or any Rider.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact / Download strip */}
            <section className="space-y-10">
              <div className="bg-[#121212] rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                    Ready to deliver?
                  </h3>
                  <p className="text-gray-400 font-medium">
                    Download the Pickars app for the best experience in Port
                    Harcourt.
                  </p>
                </div>
                <DownloadButtons dark={true} />
              </div>

              <div className="text-center pt-6">
                <h3 className="text-xl font-black mb-4 text-[#121212]">
                  Questions about these Terms?
                </h3>
                <a
                  href="mailto:support@pickars.com"
                  className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#121212] transition-colors"
                >
                  <FiMail /> Contact Legal Team
                </a>
                <p className="mt-6 text-sm text-gray-400">
                  Pickars Courier Limited • Port Harcourt, Rivers State, Nigeria
                  <br />
                  Email: support@pickars.com
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
