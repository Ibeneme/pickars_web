import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  FiSearch,
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiHelpCircle,
  FiUser,
  FiTruck,
  FiCreditCard,
  FiMessageSquare,
  FiMail,
  FiX,
} from "react-icons/fi";

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
        id: "gen3",
        question: "Are my packages insured during transit?",
        answer:
          "Yes! All packages booked directly through the Pickars app are covered against loss or damage up to specified limits based on declared package value.",
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
        id: "cust7",
        question: "Can I send to multiple locations?",
        answer:
          "Yes — use our **Multi-Stop** feature.\nAdd up to 5 stops. Our system automatically optimizes the route to save time & money.",
      },
      {
        id: "cust8",
        question: "How do I track my active delivery?",
        answer:
          "Once a rider accepts your order, tap **Live Tracking** on the home screen. You'll see their exact GPS location moving on the map in real time.",
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
        id: "rider2",
        question: "When and how do I receive my earnings?",
        answer:
          "Earnings are tracked instantly in-app after every completed drop-off. Payouts are processed directly to your registered bank account daily or weekly.",
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
        question: "What payment methods do you accept?",
        answer:
          "We accept debit/credit cards, bank transfers, USSD, and direct funding via your in-app Pickars Wallet.",
      },
    ],
  },
];

const HelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const filteredFaqs = categories
    .flatMap((cat) => cat.faqs)
    .filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const formatAnswer = (text: string) => {
    return text
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="text-red-600 font-extrabold">$1</strong>'
      )
      .replace(/\n/g, "<br/>");
  };

  const hasSearch = searchTerm.trim().length > 0;

  return (
    <div className="min-h-screen bg-white font-['Lufga'] selection:bg-red-100 selection:text-red-600">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-red-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Hero Header */}
      <header className="pt-28 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-red-50/70 via-red-50/20 to-transparent -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block text-[11px] font-black uppercase tracking-[0.4em] text-red-600 mb-6 px-5 py-2.5 bg-white shadow-sm border border-red-100 rounded-full">
            Pickars Concierge Hub
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-[-0.04em] text-[#121212] leading-[0.9] mb-8">
            How can we <br /> <span className="text-gray-300">assist you?</span>
          </h1>
          <p className="text-gray-500 font-bold max-w-xl mx-auto text-lg mb-10">
            Find fast answers about dispatch tracking, wallet top-ups, rider
            onboarding, and merchant solutions.
          </p>

          <div className="max-w-2xl mx-auto relative group mt-6">
            <FiSearch
              className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors"
              size={24}
            />
            <input
              type="search"
              placeholder="Search issues (e.g. 'refunds', 'rider tracking')..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setOpenFAQ(null);
              }}
              className="w-full bg-white border-2 border-gray-100 rounded-3xl py-6 pl-16 pr-14 text-lg md:text-xl focus:border-red-600 outline-none transition-all duration-300 shadow-2xl shadow-gray-200/20 placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                aria-label="Clear search"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </motion.div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          {!hasSearch && !selectedCategory && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedCategory(cat)}
                  className="group cursor-pointer bg-gray-50/50 border border-gray-100 p-8 rounded-[2.5rem] hover:bg-white hover:border-red-100 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-8 h-14 w-14 flex items-center justify-center rounded-2xl bg-white shadow-md text-2xl text-red-600 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-black text-[#121212] mb-3 tracking-tight">
                      {cat.name}
                    </h3>
                    <p className="text-gray-500 font-bold text-sm leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-600 opacity-70 group-hover:opacity-100 transition-opacity">
                    View Topics <FiArrowLeft className="rotate-180" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {(hasSearch || selectedCategory) && (
            <motion.div
              key="faqs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchTerm("");
                  }}
                  className="flex items-center gap-3 text-[#121212] font-black text-xs uppercase tracking-widest hover:text-red-600 transition-colors"
                >
                  <FiArrowLeft size={18} /> Back to Categories
                </button>
                {hasSearch && (
                  <span className="text-xs font-bold text-gray-400">
                    Found {filteredFaqs.length} result
                    {filteredFaqs.length === 1 ? "" : "s"} for "{searchTerm}"
                  </span>
                )}
              </div>

              {selectedCategory && (
                <div className="mb-8 p-8 bg-red-50/50 border border-red-100 rounded-3xl flex items-center gap-4">
                  <div className="text-3xl text-red-600">
                    {selectedCategory.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#121212]">
                      {selectedCategory.name}
                    </h2>
                    <p className="text-gray-500 font-bold text-sm">
                      {selectedCategory.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Empty Search State */}
              {hasSearch && filteredFaqs.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-2xl font-black text-[#121212] mb-2">
                    No matching questions found
                  </p>
                  <p className="text-gray-500 font-bold mb-6">
                    Try searching with alternative keywords or contact us
                    directly.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {(selectedCategory ? selectedCategory.faqs : filteredFaqs).map(
                  (faq) => (
                    <div
                      key={faq.id}
                      className={`rounded-[2rem] border transition-all duration-300 ${
                        openFAQ === faq.id
                          ? "bg-white border-red-200 shadow-xl shadow-red-500/5"
                          : "bg-gray-50/50 border-gray-100 hover:bg-white hover:border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setOpenFAQ(openFAQ === faq.id ? null : faq.id)
                        }
                        className="w-full p-6 md:p-8 flex items-center justify-between text-left outline-none gap-4"
                      >
                        <span
                          className={`text-lg md:text-xl font-black tracking-tight transition-colors ${
                            openFAQ === faq.id
                              ? "text-red-600"
                              : "text-[#121212]"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <div
                          className={`h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl transition-all ${
                            openFAQ === faq.id
                              ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                              : "bg-white text-gray-400 shadow-sm border border-gray-100"
                          }`}
                        >
                          {openFAQ === faq.id ? (
                            <FiMinus size={16} />
                          ) : (
                            <FiPlus size={16} />
                          )}
                        </div>
                      </button>
                      <AnimatePresence>
                        {openFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 md:px-8 pb-8"
                          >
                            <div
                              className="pt-4 border-t border-gray-100 text-gray-600 font-bold text-base md:text-lg leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: formatAnswer(faq.answer),
                              }}
                            />
                            {faq.annotations?.map((note, idx) => (
                              <div
                                key={idx}
                                className={`mt-6 p-5 rounded-2xl border-l-4 ${
                                  note.type === "warning"
                                    ? "bg-orange-50 border-orange-500 text-orange-900"
                                    : "bg-red-50 border-red-600 text-red-900"
                                }`}
                              >
                                <p className="text-xs font-black uppercase tracking-widest mb-1">
                                  {note.type}
                                </p>
                                <p className="text-sm font-bold opacity-90">
                                  {note.text}
                                </p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Support Help Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-[#121212] text-white rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute right-0 top-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center md:text-left z-10">
            <span className="text-red-500 font-black uppercase tracking-widest text-xs mb-3 block">
              Still have questions?
            </span>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
              We're available round-the-clock
            </h3>
            <p className="text-gray-400 font-bold max-w-md">
              Reach out directly to our support engineers via WhatsApp or send
              us an email for immediate assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 z-10 w-full md:w-auto">
            <a
              href="https://wa.me/2349164860591"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 hover:scale-105"
            >
              <FiMessageSquare size={18} /> WhatsApp Chat
            </a>
            <a
              href="mailto:support@pickars.com"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all backdrop-blur-sm hover:scale-105"
            >
              <FiMail size={18} /> Send Email
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HelpCenter;
