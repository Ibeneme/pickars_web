import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiHelpCircle,
  FiUser,
  FiTruck,
  FiSend,
  FiCreditCard,
  FiMapPin,
  FiAlertTriangle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// ──────────────────────────────────────────────────────────────
// Types & Expanded Data
// ──────────────────────────────────────────────────────────────

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  annotations?: { type: "tip" | "warning" | "important"; text: string }[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  faqs: FAQItem[];
}

const categories: Category[] = [
  {
    id: "support",
    name: "General Support",
    icon: <FiHelpCircle />,
    description: "Contact, hours, insurance & general questions",
    faqs: [
      {
        id: "gen1",
        question: "How do I contact Pickars customer support?",
        answer:
          "Our support team is available **24/7**. For fastest response, message our official WhatsApp: **0916 486 0591**.\n\nEmail: **support@pickars.com** (usually answered within 4–12 hours).",
        annotations: [
          { type: "tip", text: "WhatsApp is usually 3–10× faster than email" },
        ],
      },
      {
        id: "gen2",
        question: "What are your operating hours?",
        answer:
          "Dispatch riders are available **24 hours a day, 365 days** a year.\n\nLive human support is online daily from **8:00 AM – 10:00 PM**.",
        annotations: [
          {
            type: "important",
            text: "After 10 PM, use WhatsApp for urgent issues",
          },
        ],
      },
      {
        id: "gen4",
        question: "Are my items insured during transit?",
        answer:
          "Yes — every delivery includes **Standard Transit Insurance** (up to ₦150,000).\n\nFor higher-value items we strongly recommend adding **Extended Coverage** during booking.",
        annotations: [
          {
            type: "warning",
            text: "Standard coverage has limits — declare high-value items!",
          },
        ],
      },
    ],
  },
  {
    id: "customers",
    name: "For Customers",
    icon: <FiUser />,
    description: "Booking, tracking, payments, cancellations",
    faqs: [
      {
        id: "cust3",
        question: "How do I book a delivery?",
        answer:
          "1. Open app → enter **Pickup** & **Drop-off** locations\n2. Choose **package type** & size\n3. Select rider (see rating & estimated time)\n4. Confirm payment method → track in real-time",
      },
      {
        id: "cust5",
        question: "What payment methods do you accept?",
        answer:
          "• Debit & Credit Cards (Visa, Verve, Mastercard)\n• Bank Transfer\n• Pickars Wallet (fastest – top-up once, reuse)",
      },
      {
        id: "cust7",
        question: "Can I send to multiple locations?",
        answer:
          "Yes — use **Multi-Stop** feature.\nAdd up to 5 stops. Our system automatically optimizes the route to save time & money.",
      },
    ],
  },
  {
    id: "riders",
    name: "For Riders",
    icon: <FiTruck />,
    description: "Onboarding, earnings, safety & support",
    faqs: [
      {
        id: "rider1",
        question: "How do I become a Pickars Rider?",
        answer:
          "1. Download **Pickars Rider** app\n2. Upload valid Driver’s License + Bike/Car documents\n3. Complete short safety & service training\n4. Get verified (usually 24–48h) → start accepting orders",
      },
      {
        id: "rider3",
        question: "How and when do I get paid?",
        answer:
          "Weekly payouts every **Monday morning**.\nAll completed trips from previous week are automatically transferred to your linked bank account.",
      },
      {
        id: "rider6",
        question: "Can I choose my own working hours?",
        answer:
          "Yes — 100% flexible.\nGo **Online** when you want orders, **Offline** when you’re done. No minimum hours required.",
      },
    ],
  },
  {
    id: "payments",
    name: "Payments & Refunds",
    icon: <FiCreditCard />,
    description: "Wallet, pricing, refunds, failed payments",
    faqs: [
      {
        id: "pay1",
        question: "How do refunds work?",
        answer:
          "Refunds are processed within **24–72 hours** to your original payment method or Pickars Wallet.\n\nFull refund if: rider cancels, item not picked up, or delivery fails due to our fault.",
        annotations: [
          {
            type: "tip",
            text: "Wallet refunds are instant — choose Wallet for faster access",
          },
        ],
      },
      {
        id: "pay2",
        question: "Why was I charged extra?",
        answer:
          "Extra charges may apply for:\n• Waiting time > 10 min\n• Oversized / overweight packages\n• Additional stops not declared\n• Night surcharge (10 PM – 6 AM)",
      },
    ],
  },
  {
    id: "tracking",
    name: "Tracking & Delivery Status",
    icon: <FiMapPin />,
    description: "Live tracking, estimated time, status updates",
    faqs: [
      {
        id: "track1",
        question: "How accurate is the live tracking?",
        answer:
          "Tracking updates every **10–30 seconds** when the rider is moving.\n\nYou can see rider location, speed, and estimated time of arrival in real-time.",
      },
      {
        id: "track2",
        question: "What does 'Package Secured' mean?",
        answer:
          "**Package Secured** = rider has confirmed pickup and item is safely with them.\nNext statuses: **In Transit** → **Arrived** → **Delivered**.",
      },
    ],
  },
  {
    id: "troubleshooting",
    name: "Common Issues & Troubleshooting",
    icon: <FiAlertTriangle />,
    description: "App crashes, login problems, rider no-show",
    faqs: [
      {
        id: "trb1",
        question: "Rider is not moving / delayed — what should I do?",
        answer:
          "1. Message rider directly in chat\n2. If no response in 5 min → contact support via WhatsApp\n3. You can cancel & re-book if delay > 30 min (no fee if rider fault)",
        annotations: [
          {
            type: "warning",
            text: "Don't cancel before contacting support if you want compensation",
          },
        ],
      },
      {
        id: "trb2",
        question: "App keeps crashing or not loading",
        answer:
          "Try these steps:\n1. Clear app cache (Settings → Apps → Pickars → Storage → Clear Cache)\n2. Update to latest version\n3. Restart phone\n4. Use mobile data instead of Wi-Fi (or vice versa)",
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────────────────────

const HelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const filteredFaqs = categories
    .flatMap((cat) => cat.faqs)
    .filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const formatAnswer = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-red-600">$1</strong>')
      .replace(/\n/g, "<br/>");
  };

  const hasSearch = searchTerm.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 font-['Lufga']">
      {/* Hero */}
      <header className="pt-16 pb-12 px-5 md:pt-24 md:pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-5 py-2 text-sm font-black uppercase tracking-wider pt-[120px] text-red-700 rounded-full mb-6">
            Help & Support Center
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-gray-900 leading-tight">
            Answers that <span className="text-gray-400">actually help</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Quick solutions for customers, riders, payments, tracking and more.
          </p>
        </motion.div>
      </header>

      {/* Search */}
      <div className="px-5 max-w-3xl mx-auto mb-16 md:mb-20">
        <div className="relative group">
          <FiSearch
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors"
            size={22}
          />
          <input
            type="search"
            placeholder="Search any question..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpenFAQ(null);
            }}
            className="w-full bg-white border border-gray-200 rounded-full py-5 pl-14 pr-6 text-lg shadow-sm focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 pb-24">
        <AnimatePresence mode="wait">
          {/* Category Grid */}
          {!hasSearch && !selectedCategory && (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(cat)}
                  className="group bg-white border border-gray-100 rounded-3xl p-8 md:p-10 text-left hover:border-red-200 hover:shadow-2xl hover:shadow-red-100/40 transition-all duration-300"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 text-3xl group-hover:bg-red-600 group-hover:text-white transition-all duration-400">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-base md:text-lg">
                    {cat.description}
                  </p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 flex items-center gap-2 text-red-600 font-semibold transition-opacity">
                    Explore{" "}
                    <FiSend className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* FAQ List */}
          {(hasSearch || selectedCategory) && (
            <motion.div
              key="faqs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                  setOpenFAQ(null);
                }}
                className="group flex items-center gap-3 text-red-600 font-bold mb-10 hover:gap-5 transition-all text-lg"
              >
                <FiArrowLeft size={24} />
                Back {selectedCategory ? "to Categories" : "to Search"}
              </button>

              <div className="space-y-6">
                {(selectedCategory ? selectedCategory.faqs : filteredFaqs).map(
                  (faq) => (
                    <motion.div
                      key={faq.id}
                      layout
                      className={`rounded-3xl border overflow-hidden transition-all duration-400 ${
                        openFAQ === faq.id
                          ? "border-red-200 bg-gradient-to-b from-white to-gray-50 shadow-xl shadow-red-100/30"
                          : "border-gray-100 bg-white hover:border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setOpenFAQ(openFAQ === faq.id ? null : faq.id)
                        }
                        className="w-full px-7 py-8 md:px-10 md:py-10 flex items-center justify-between text-left"
                      >
                        <span
                          className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${
                            openFAQ === faq.id
                              ? "text-red-600"
                              : "text-gray-900"
                          }`}
                        >
                          {faq.question}
                        </span>

                        <div
                          className={`min-w-[52px] h-12 md:h-14 flex items-center justify-center rounded-2xl transition-all duration-400 ${
                            openFAQ === faq.id
                              ? "bg-red-600 text-white rotate-180 shadow-md"
                              : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                          }`}
                        >
                          {openFAQ === faq.id ? (
                            <FiMinus size={22} />
                          ) : (
                            <FiPlus size={22} />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.4,
                              ease: [0.04, 0.62, 0.23, 0.98],
                            }}
                          >
                            <div className="px-7 pb-10 md:px-10 md:pb-12 border-t border-gray-100 pt-6 md:pt-8">
                              <div
                                className="text-gray-700 text-base md:text-lg leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html: formatAnswer(faq.answer),
                                }}
                              />

                              {/* Annotations / Callouts */}
                              {faq.annotations &&
                                faq.annotations.length > 0 && (
                                  <div className="mt-6 space-y-4">
                                    {faq.annotations.map((note, idx) => (
                                      <div
                                        key={idx}
                                        className={`p-5 rounded-2xl border-l-4 flex items-start gap-4 ${
                                          note.type === "tip"
                                            ? "bg-green-50 border-green-500"
                                            : note.type === "warning"
                                            ? "bg-orange-50 border-orange-500"
                                            : "bg-blue-50 border-blue-500"
                                        }`}
                                      >
                                        {note.type === "tip" && (
                                          <span className="text-green-600 text-xl">
                                            💡
                                          </span>
                                        )}
                                        {note.type === "warning" && (
                                          <span className="text-orange-600 text-xl">
                                            ⚠️
                                          </span>
                                        )}
                                        {note.type === "important" && (
                                          <span className="text-blue-600 text-xl">
                                            ★
                                          </span>
                                        )}
                                        <p className="text-sm md:text-base font-medium">
                                          {note.text}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-24 md:mt-32 max-w-5xl mx-auto px-6 py-16 md:py-20 rounded-[40px] md:rounded-[60px] bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-32 -right-20 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-green-600 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Need help right now?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-12">
              Our team usually replies in <strong>under 5 minutes</strong> on
              WhatsApp — day or night.
            </p>

            <a
              href="https://wa.me/2349164860591"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-[#25D366] hover:bg-[#1ebe50] text-white px-10 py-6 md:px-16 md:py-8 rounded-full font-bold text-xl shadow-2xl shadow-green-900/40 hover:shadow-green-900/60 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <FaWhatsapp size={32} />
              Message Support on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;
