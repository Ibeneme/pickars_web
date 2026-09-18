import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiEye,
  FiLock,
  FiMapPin,
  FiInfo,
  FiMail,
  FiUsers,
  FiDatabase,
  FiTrash2,
  FiFileText,
} from "react-icons/fi";

const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("intro");

  const sections = [
    { id: "intro", label: "Overview", icon: <FiShield /> },
    { id: "collection", label: "Data We Collect", icon: <FiInfo /> },
    { id: "use", label: "How We Use Data", icon: <FiLock /> },
    { id: "location", label: "Location Services", icon: <FiMapPin /> },
    { id: "sharing", label: "Data Sharing", icon: <FiUsers /> },
    { id: "cookies", label: "Cookies", icon: <FiEye /> },
    { id: "retention", label: "Retention & Deletion", icon: <FiTrash2 /> },
    { id: "choices", label: "Your Choices", icon: <FiDatabase /> },
    { id: "legal", label: "Legal Basis", icon: <FiFileText /> },
    { id: "contact", label: "Contact Us", icon: <FiMail /> },
  ];

  const scrollToSection = (id: string) => {
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
              Trust & Security
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#121212] leading-[0.95] mb-6">
              Privacy <span className="text-gray-300">Policy.</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl">
              At <strong>Pickars Courier Limited</strong> (“Pickars”, “we”,
              “us”), transparency is a core value. This notice explains what
              personal data we collect, how we use it, and the choices you have
              when you use our dispatch rider services in Port Harcourt,
              Nigeria.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Last updated: 17 September 2026
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
                  onClick={() => scrollToSection(sec.id)}
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

            <div className="mt-10 p-7 bg-red-600 rounded-[28px] text-white">
              <h4 className="font-black text-lg mb-2">Need Help?</h4>
              <p className="text-red-100 text-sm mb-5 leading-relaxed">
                Questions about your data or this policy? Reach out to our team.
              </p>
              <a
                href="mailto:support@pickars.com"
                className="block text-center bg-white text-red-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition"
              >
                Email Privacy Team
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-20 md:space-y-28">
            {/* 1. Overview */}
            <section id="intro" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-white border border-gray-100 rounded-[40px]">
                <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-4">
                  <span className="h-9 w-1 bg-red-600 rounded-full" />
                  1. Overview
                </h2>
                <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                  <p>
                    This Privacy Notice applies when you use the Pickars app or
                    website to request or receive dispatch rider / courier
                    services in <strong>Port Harcourt, Nigeria</strong>.
                  </p>
                  <p>
                    It covers riders (customers who request deliveries), order
                    recipients, and guest users. It does <em>not</em> cover data
                    we collect from dispatch riders who provide services on the
                    platform (those practices are described in a separate notice
                    for delivery partners).
                  </p>
                  <p>
                    Pickars operates only in Port Harcourt for now. Our data
                    practices are designed to comply with the{" "}
                    <strong>Nigeria Data Protection Act 2023</strong> and the
                    Nigeria Data Protection Regulation (NDPR), as well as other
                    applicable Nigerian laws.
                  </p>
                  <p>
                    Personal data means any information that identifies you or
                    can be used to identify you — for example your name, phone
                    number, email address, delivery addresses, and location
                    data.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Data Collection */}
            <section id="collection" className="scroll-mt-36">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                2. The Data We Collect
              </h2>
              <div className="space-y-6">
                <div className="p-8 bg-white border border-gray-100 rounded-[32px]">
                  <h3 className="font-black text-xl mb-4 text-[#121212]">
                    A. Data you provide
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        <strong>Account information</strong> — full name, phone
                        number, email address, profile photo, and payment
                        details.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        <strong>Delivery details</strong> — pickup and drop-off
                        addresses, special instructions, item descriptions, and
                        recipient contact information.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        <strong>Identity verification</strong> —
                        government-issued ID or selfie when required for certain
                        high-value or restricted deliveries.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        <strong>User content</strong> — ratings, feedback,
                        photos of packages, and messages sent through the app.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-8 bg-white border border-gray-100 rounded-[32px]">
                  <h3 className="font-black text-xl mb-4 text-[#121212]">
                    B. Data collected when you use our services
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        <strong>Location data</strong> — approximate and (with
                        your permission) precise location so we can match you
                        with nearby dispatch riders and track deliveries.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        <strong>Order & trip information</strong> — date/time,
                        pickup & drop-off points, distance, order value, payment
                        method, and delivery status.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        <strong>Device & usage data</strong> — device type, OS,
                        IP address, app version, crash logs, and how you
                        interact with the app.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        <strong>Communications</strong> — in-app chats, call
                        logs, and customer support conversations.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-8 bg-white border border-gray-100 rounded-[32px]">
                  <h3 className="font-black text-xl mb-4 text-[#121212]">
                    C. Data from other sources
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        Payment processors and banks (for transaction
                        verification).
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        Identity verification and fraud-prevention partners.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        Other users (e.g. when someone books a delivery for
                        you).
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Public authorities when required by law.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. How We Use Data */}
            <section id="use" className="scroll-mt-36">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                3. How We Use Your Data
              </h2>
              <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-6 md:p-8 text-xs uppercase tracking-widest font-black text-gray-400">
                          Purpose
                        </th>
                        <th className="p-6 md:p-8 text-xs uppercase tracking-widest font-black text-gray-400">
                          Examples
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-600">
                      <tr>
                        <td className="p-6 md:p-8 font-bold text-[#121212] align-top">
                          Providing the service
                        </td>
                        <td className="p-6 md:p-8">
                          Matching you with available dispatch riders,
                          calculating fares, processing payments, sending
                          delivery updates, and generating receipts.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-6 md:p-8 font-bold text-[#121212] align-top">
                          Safety & security
                        </td>
                        <td className="p-6 md:p-8">
                          Verifying accounts, detecting and preventing fraud,
                          enforcing our Community Guidelines, and supporting
                          emergency situations.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-6 md:p-8 font-bold text-[#121212] align-top">
                          Customer support
                        </td>
                        <td className="p-6 md:p-8">
                          Investigating complaints, resolving disputes, and
                          improving our support processes.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-6 md:p-8 font-bold text-[#121212] align-top">
                          Product improvement
                        </td>
                        <td className="p-6 md:p-8">
                          Analysing usage patterns, fixing bugs, and developing
                          new features for Port Harcourt users.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-6 md:p-8 font-bold text-[#121212] align-top">
                          Marketing (with choice)
                        </td>
                        <td className="p-6 md:p-8">
                          Sending promotional messages about Pickars services
                          (you can opt out at any time).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-6 md:p-8 font-bold text-[#121212] align-top">
                          Legal & compliance
                        </td>
                        <td className="p-6 md:p-8">
                          Complying with Nigerian law, responding to lawful
                          requests from authorities, and protecting our legal
                          rights.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 4. Location Services */}
            <section id="location" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-red-50 border border-red-100 rounded-[40px]">
                <h2 className="text-2xl md:text-3xl font-black mb-6 text-red-600 flex items-center gap-3">
                  <FiMapPin className="text-2xl" />
                  4. Location Services
                </h2>
                <div className="space-y-5 text-red-900/80 text-base md:text-lg leading-relaxed">
                  <p>
                    Location data is essential for Pickars to function. We use
                    GPS, network, and Wi-Fi information to:
                  </p>
                  <ul className="space-y-2 ml-1">
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      Match you with the nearest available dispatch rider
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      Show real-time tracking of your delivery
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      Calculate accurate fares and ETAs
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      Improve safety and route efficiency in Port Harcourt
                    </li>
                  </ul>
                  <p>
                    You can turn precise location access on or off in your
                    device settings or inside the Pickars app (Account → Privacy
                    → Location). Without location permission the app may still
                    work, but you will need to enter addresses manually and
                    real-time tracking will be limited.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Data Sharing */}
            <section id="sharing" className="scroll-mt-36">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                5. How We Share Data
              </h2>
              <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  We share personal data only when necessary to provide the
                  service or when required by law. We do <strong>not</strong>{" "}
                  sell your personal data.
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="p-6 bg-white border border-gray-100 rounded-[28px]">
                    <h4 className="font-black text-[#121212] mb-3">
                      With dispatch riders
                    </h4>
                    <p className="text-sm">
                      First name, pickup & drop-off locations, special
                      instructions, and contact number (masked where possible).
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 rounded-[28px]">
                    <h4 className="font-black text-[#121212] mb-3">
                      With service providers
                    </h4>
                    <p className="text-sm">
                      Payment processors, cloud hosting, customer support tools,
                      and identity verification partners (all under strict
                      contracts).
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 rounded-[28px]">
                    <h4 className="font-black text-[#121212] mb-3">
                      For legal reasons
                    </h4>
                    <p className="text-sm">
                      When required by Nigerian law, court order, or to protect
                      the safety of users or the public.
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 rounded-[28px]">
                    <h4 className="font-black text-[#121212] mb-3">
                      With your consent
                    </h4>
                    <p className="text-sm">
                      When you choose to share your live location or ETA with a
                      friend or family member.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Cookies */}
            <section id="cookies" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-[#121212] rounded-[40px] text-white">
                <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3">
                  <FiEye className="text-red-500" />
                  6. Cookies & Similar Technologies
                </h2>
                <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed">
                  <p>
                    We use cookies, device identifiers, and similar technologies
                    on our website and app to:
                  </p>
                  <ul className="space-y-2">
                    <li>• Keep you logged in</li>
                    <li>• Remember your preferences</li>
                    <li>• Understand how the service is used</li>
                    <li>• Measure the performance of our marketing</li>
                  </ul>
                  <p>
                    You can control cookies through your browser settings. Note
                    that disabling certain cookies may affect core features of
                    the Pickars platform.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Retention & Deletion */}
            <section id="retention" className="scroll-mt-36">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                7. Data Retention & Deletion
              </h2>
              <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  We keep your data only as long as necessary for the purposes
                  described in this notice or as required by Nigerian law.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <span>
                      <strong>Account data</strong> — retained for the life of
                      your account.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <span>
                      <strong>Order & location history</strong> — generally kept
                      for up to 7 years for tax, regulatory, and dispute
                      resolution purposes.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <span>
                      <strong>Identity documents</strong> — deleted within a
                      short period after verification unless longer retention is
                      legally required.
                    </span>
                  </li>
                </ul>
                <p>
                  You may request deletion of your account at any time through
                  the app (Account → Privacy → Delete Account) or by emailing
                  us. After a deletion request we generally remove your data
                  within 90 days, except where we must retain it for legal,
                  safety, or fraud-prevention reasons.
                </p>
              </div>
            </section>

            {/* 8. Your Choices */}
            <section id="choices" className="scroll-mt-36">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                8. Your Choices & Rights
              </h2>
              <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  Under the Nigeria Data Protection Act 2023 you have the right
                  to:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    Access the personal data we hold about you
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    Request correction of inaccurate data
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    Request deletion of your data (subject to legal exceptions)
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    Object to or restrict certain processing
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    Withdraw consent where processing is based on consent
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    Lodge a complaint with the Nigeria Data Protection Bureau
                    (NDPB)
                  </li>
                </ul>
                <p>
                  You can manage many of these preferences directly in the app
                  under <strong>Account → Privacy</strong>. For formal requests
                  please email{" "}
                  <a
                    href="mailto:support@pickars.com"
                    className="text-red-600 font-medium underline"
                  >
                    support@pickars.com
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* 9. Legal Basis */}
            <section id="legal" className="scroll-mt-36">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                9. Legal Bases for Processing
              </h2>
              <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  We process your personal data on the following legal bases
                  under Nigerian data protection law:
                </p>
                <ul className="space-y-4">
                  <li>
                    <strong className="text-[#121212]">
                      Performance of a contract
                    </strong>{" "}
                    — when we need the data to provide the dispatch services you
                    request.
                  </li>
                  <li>
                    <strong className="text-[#121212]">Consent</strong> — for
                    certain optional features such as marketing messages or
                    precise location sharing.
                  </li>
                  <li>
                    <strong className="text-[#121212]">
                      Legitimate interests
                    </strong>{" "}
                    — for safety, fraud prevention, service improvement, and
                    non-intrusive analytics, balanced against your rights.
                  </li>
                  <li>
                    <strong className="text-[#121212]">Legal obligation</strong>{" "}
                    — when Nigerian law requires us to process or retain the
                    data.
                  </li>
                </ul>
              </div>
            </section>

            {/* 10. Contact */}
            <section id="contact" className="scroll-mt-36">
              <div className="p-8 md:p-12 bg-white border border-gray-100 rounded-[40px]">
                <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3">
                  <FiMail className="text-red-600" />
                  10. Contact Us
                </h2>
                <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                  <p>
                    If you have questions about this Privacy Notice or want to
                    exercise any of your rights, please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-2">
                    <p>
                      <strong>Pickars Courier Limited</strong>
                    </p>
                    <p>Port Harcourt, Rivers State, Nigeria</p>
                    <p>
                      Email:{" "}
                      <a
                        href="mailto:support@pickars.com"
                        className="text-red-600 font-medium"
                      >
                        support@pickars.com
                      </a>
                    </p>
                    <p>
                      Support:{" "}
                      <a
                        href="mailto:support@pickars.com"
                        className="text-red-600 font-medium"
                      >
                        support@pickars.com
                      </a>
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    We will respond to privacy requests within the timeframes
                    required by the Nigeria Data Protection Act 2023.
                  </p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-10 border-t border-gray-100">
              <p className="text-gray-400 text-sm leading-relaxed">
                This Privacy Notice may be updated from time to time. When we
                make material changes we will notify you through the app or by
                email. Continued use of Pickars after an update constitutes
                acceptance of the revised notice to the extent permitted by law.
              </p>
              <p className="mt-4 text-gray-400 text-sm">
                © {new Date().getFullYear()} Pickars Courier Limited. All rights
                reserved. Operating exclusively in Port Harcourt, Nigeria.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
