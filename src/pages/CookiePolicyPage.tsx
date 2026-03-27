import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiEye, FiClock, FiUsers, FiMail } from "react-icons/fi";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { Cookie } from "lucide-react";

import { ANDROID_URL, IOS_URL } from "../sections/Hero/HeroSection";

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[180px] font-['Lufga'] py-24 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600 mb-4 block">
              TRANSPARENCY &amp; PRIVACY
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#121212] leading-tight mb-8">
              Cookie <span className="text-gray-300">Policy.</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed">
              Last updated: March 2026 • We respect your privacy and want you to
              understand how and why we use cookies.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sticky Navigation */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <nav className="space-y-2">
              {[
                {
                  id: "what-are-cookies",
                  label: "What are Cookies?",
                  icon: <Cookie />,
                },
                {
                  id: "how-we-use",
                  label: "How We Use Cookies",
                  icon: <FiEye />,
                },
                { id: "types", label: "Types of Cookies", icon: <FiShield /> },
                { id: "duration", label: "Cookie Duration", icon: <FiClock /> },
                {
                  id: "your-choices",
                  label: "Your Choices",
                  icon: <FiUsers />,
                },
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() =>
                    document
                      .getElementById(sec.id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full flex items-center gap-4 px-6 py-5 rounded-[25px] font-bold text-left text-gray-400 hover:bg-gray-100 hover:text-[#121212] transition-all"
                >
                  <span className="text-xl">{sec.icon}</span>
                  <span className="text-sm uppercase tracking-widest">
                    {sec.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-12 p-10 bg-[#0c0c0c] rounded-[40px] text-white relative overflow-hidden">
              <Cookie className="absolute -right-6 -bottom-6 text-white/5 text-[120px] rotate-12" />
              <h4 className="font-black text-xl mb-2 relative z-10">
                Questions?
              </h4>
              <p className="text-gray-400 text-sm relative z-10">
                admin@pickars.com
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-20">
            {/* Section 1 */}
            <section id="what-are-cookies" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <span className="h-10 w-1 bg-red-600 rounded-full" />
                  1. What Are Cookies?
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Cookies are small text files that are stored on your device
                  when you visit a website or use a mobile app. They help us
                  remember your preferences, improve performance, and provide a
                  better delivery experience.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="how-we-use" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiEye className="text-red-600" /> 2. How We Use Cookies
                </h2>
                <div className="space-y-8 text-gray-500 text-lg">
                  <p>We use cookies to:</p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600">
                    <li>
                      Optimize delivery routes and estimated arrival times
                    </li>
                    <li>
                      Remember your location preferences and saved addresses
                    </li>
                    <li>Keep you signed in securely across sessions</li>
                    <li>Analyze platform usage to improve our services</li>
                    <li>Personalize your experience based on your behavior</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 - Types of Cookies */}
            <section id="types" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiShield className="text-red-600" /> 3. Types of Cookies We
                  Use
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
                    <h4 className="font-black text-lg mb-3 text-[#121212]">
                      Essential Cookies
                    </h4>
                    <p className="text-gray-500">
                      Required for the platform to function properly. You cannot
                      opt out of these.
                    </p>
                  </div>
                  <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
                    <h4 className="font-black text-lg mb-3 text-[#121212]">
                      Performance &amp; Analytics
                    </h4>
                    <p className="text-gray-500">
                      Help us understand how users interact with Pickars to
                      improve the service.
                    </p>
                  </div>
                  <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
                    <h4 className="font-black text-lg mb-3 text-[#121212]">
                      Functional Cookies
                    </h4>
                    <p className="text-gray-500">
                      Remember your preferences like language and saved delivery
                      addresses.
                    </p>
                  </div>
                  <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
                    <h4 className="font-black text-lg mb-3 text-[#121212]">
                      Marketing Cookies
                    </h4>
                    <p className="text-gray-500">
                      Used to show you relevant promotions and offers (you can
                      disable these).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="duration" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-white border border-gray-100 rounded-[50px]">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <FiClock className="text-red-600" /> 4. How Long Do Cookies
                  Stay?
                </h2>
                <p className="text-gray-500 text-lg">
                  • <strong>Session Cookies:</strong> Deleted when you close
                  your browser.
                  <br />• <strong>Persistent Cookies:</strong> Remain on your
                  device for a set period (from a few days up to 2 years).
                </p>
              </div>
            </section>

            {/* Section 5 - Your Choices */}
            <section id="your-choices" className="scroll-mt-32">
              <div className="p-10 md:p-16 bg-red-600 text-white rounded-[50px]">
                <h2 className="text-3xl font-black mb-8">
                  5. Your Choices &amp; Control
                </h2>
                <div className="text-red-100 text-lg leading-relaxed space-y-6">
                  <p>
                    You can manage or delete cookies through your browser
                    settings at any time. However, disabling essential cookies
                    may affect the functionality of the Pickars platform.
                  </p>
                  <p className="font-medium">
                    To manage cookies on mobile, go to your device settings →
                    Apps → Pickars → Permissions → Storage.
                  </p>
                </div>
              </div>
            </section>

            {/* App Download Strip */}
            <section className="mt-20">
              <div className="bg-[#121212] rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tighter mb-2">
                    Prefer the App?
                  </h3>
                  <p className="text-gray-400 font-medium">
                    Get the full Pickars experience with push notifications and
                    faster booking.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={IOS_URL}
                    target="_blank"
                    className="flex items-center gap-3 bg-white text-black px-7 py-4 rounded-2xl font-black hover:scale-105 transition-transform"
                  >
                    <FaApple size={22} /> App Store
                  </a>
                  <a
                    href={ANDROID_URL}
                    target="_blank"
                    className="flex items-center gap-3 bg-white/10 text-white px-7 py-4 rounded-2xl font-black border border-white/10 hover:scale-105 transition-transform"
                  >
                    <BiLogoPlayStore size={22} /> Play Store
                  </a>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="pt-20 text-center">
              <h3 className="text-2xl font-black mb-4 text-[#121212]">
                Questions about our Cookie Policy?
              </h3>
              <a
                href="mailto:admin@pickars.com"
                className="inline-flex items-center gap-3 bg-red-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#121212] transition-colors"
              >
                <FiMail /> Contact Us
              </a>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
