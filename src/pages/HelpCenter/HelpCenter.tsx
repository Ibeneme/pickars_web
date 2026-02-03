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
} from "react-icons/fi";
import { FaWhatsapp, FaTwitter, FaInstagram } from "react-icons/fa";

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
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-red-600">$1</strong>')
      .replace(/\n/g, "<br/>");
  };

  const hasSearch = searchTerm.trim().length > 0;

  return (
    <div className="min-h-screen bg-white font-['Lufga'] selection:bg-red-100 selection:text-red-600">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-red-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      <div className="bg-gray-50 border-b border-gray-100 py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              System Status: All Services Operational
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <p className="text-[10px] font-bold text-gray-400">
              Current Wait: <span className="text-gray-900">~4 mins</span>
            </p>
            <p className="text-[10px] font-bold text-gray-400">
              Riders Online: <span className="text-gray-900">1,240+</span>
            </p>
          </div>
        </div>
      </div>

      <header className="pt-24 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-red-50/50 to-transparent -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-6 px-4 py-2 bg-red-50 rounded-full">
            Pickars Concierge
          </span>
          <h1 className="text-6xl md:text-[7rem] font-black tracking-[-0.04em] text-[#121212] leading-[0.85] mb-8">
            How can we <br /> <span className="text-gray-300">assist you?</span>
          </h1>

          <div className="max-w-2xl mx-auto relative group mt-12">
            <FiSearch
              className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors"
              size={24}
            />
            <input
              type="search"
              placeholder="Describe your issue (e.g. 'refunds', 'rider tracking')..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setOpenFAQ(null);
              }}
              className="w-full bg-white border-2 border-gray-100 rounded-3xl py-7 pl-16 pr-8 text-xl focus:border-red-600 outline-none transition-all duration-500 shadow-xl shadow-gray-200/10"
            />
          </div>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          {!hasSearch && !selectedCategory && (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedCategory(cat)}
                  className="group cursor-pointer bg-gray-50/50 border border-gray-100 p-10 rounded-[3rem] hover:bg-white hover:border-red-100 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5"
                >
                  <div className="mb-10 text-3xl text-red-600 group-hover:scale-110 transition-transform origin-left">
                    {cat.icon}
                  </div>
                  <h3 className="text-3xl font-black text-[#121212] mb-3 tracking-tighter">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 font-bold leading-tight lowercase">
                    {cat.description}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
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
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                }}
                className="flex items-center gap-3 text-[#121212] font-black text-sm uppercase tracking-widest mb-12 hover:text-red-600 transition-colors"
              >
                <FiArrowLeft size={20} /> Back to Categories
              </button>

              <div className="space-y-4">
                {(selectedCategory ? selectedCategory.faqs : filteredFaqs).map(
                  (faq) => (
                    <div
                      key={faq.id}
                      className={`rounded-[2.5rem] border transition-all duration-500 ${
                        openFAQ === faq.id
                          ? "bg-white border-red-100 shadow-lg shadow-red-500/5"
                          : "bg-gray-50/50 border-gray-100 hover:bg-white"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setOpenFAQ(openFAQ === faq.id ? null : faq.id)
                        }
                        className="w-full p-8 md:p-10 flex items-center justify-between text-left outline-none"
                      >
                        <span
                          className={`text-xl md:text-2xl font-black tracking-tight ${
                            openFAQ === faq.id
                              ? "text-red-600"
                              : "text-[#121212]"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <div
                          className={`h-12 w-12 flex items-center justify-center rounded-2xl transition-all ${
                            openFAQ === faq.id
                              ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                              : "bg-white text-gray-400 shadow-sm"
                          }`}
                        >
                          {openFAQ === faq.id ? <FiMinus /> : <FiPlus />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {openFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-8 md:px-10 pb-10"
                          >
                            <div
                              className="pt-6 border-t border-gray-50 text-gray-500 font-bold text-lg leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: formatAnswer(faq.answer),
                              }}
                            />
                            {faq.annotations?.map((note, idx) => (
                              <div
                                key={idx}
                                className={`mt-6 p-6 rounded-3xl border-l-4 ${
                                  note.type === "warning"
                                    ? "bg-orange-50 border-orange-500 text-orange-800"
                                    : "bg-red-50 border-red-600 text-red-900"
                                }`}
                              >
                                <p className="text-sm font-black uppercase tracking-widest mb-1">
                                  {note.type}
                                </p>
                                <p className="text-sm font-bold opacity-80">
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

        <section className="mt-32">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#121212] p-12 rounded-[3.5rem] text-white flex flex-col justify-between group hover:bg-red-600 transition-colors duration-700">
              <div>
                <h4 className="text-4xl font-black tracking-tighter mb-4 leading-none">
                  Corporate <br />
                  Logistics
                </h4>
                <p className="text-gray-400 font-bold group-hover:text-white/80 transition-colors">
                  Custom business solutions & bulk delivery contracts.
                </p>
              </div>
              <a
                href="mailto:biz@pickars.com"
                className="mt-12 inline-flex items-center gap-3 font-black uppercase tracking-[0.2em] text-xs"
              >
                Email Sales <FiArrowLeft className="rotate-180" />
              </a>
            </div>

            <div className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 flex flex-col justify-between group hover:border-red-100 transition-all">
              <div>
                <h4 className="text-4xl font-black tracking-tighter mb-4 leading-none text-[#121212]">
                  Social <br />
                  Updates
                </h4>
                <p className="text-gray-500 font-bold">
                  Follow us for real-time traffic alerts & holiday hours.
                </p>
              </div>
              <div className="mt-12 flex gap-4">
                <a
                  href="#"
                  className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div className="bg-red-50 p-12 rounded-[3.5rem] border border-red-100 flex flex-col justify-between group">
              <div>
                <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse mb-6" />
                <h4 className="text-4xl font-black tracking-tighter mb-4 leading-none text-red-600">
                  Call Dispatch
                </h4>
                <p className="text-red-900/60 font-bold">
                  Urgent issue with an active delivery? Speak to a lead
                  controller.
                </p>
              </div>
              <a
                href="tel:+2349164860591"
                className="mt-12 text-[#121212] font-black text-2xl tracking-tighter hover:text-red-600 transition-colors"
              >
                +234 916 486 0591
              </a>
            </div>
          </div>
        </section>

        <section className="mt-40 relative max-w-7xl ">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-[4rem] bg-[#0A0A0A] shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#25D366_0%,transparent_50%)] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />

            <div className="relative z-10 bg-[#0A0A0A] rounded-[3.8rem] px-8 py-20 md:py-28 text-center border border-white/5">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 mb-10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                  Riders & Support Online
                </span>
              </div>

              <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] mb-8">
                Immediate Support.
              </h2>

              <p className="text-gray-500 text-lg md:text-xl font-bold max-w-xl mx-auto mb-14 leading-relaxed">
                Skip the queue. Our average response time is{" "}
                <span className="text-white">4m 12s</span>. Connect directly
                with our dispatch controllers.
              </p>

              <motion.a
                href="https://wa.me/2349164860591"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-5 bg-white text-[#0A0A0A] px-6 py-6 rounded-[2.5rem] font-black text-xl md:text-xl transition-all shadow-2xl"
              >
                <FaWhatsapp size={28} className="text-[#25D366]" />
                Message Now
              </motion.a>

              <div className="absolute -bottom-10 -right-10 opacity-[0.03] text-white rotate-12 pointer-events-none">
                <FaWhatsapp size={400} />
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default HelpCenter;
