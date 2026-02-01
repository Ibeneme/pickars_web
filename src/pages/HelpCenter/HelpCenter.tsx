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
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// --- Types ---
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  faqs: FAQItem[];
}

// --- Data ---
const categories: Category[] = [
  {
    id: "support",
    name: "General Support",
    icon: <FiHelpCircle />,
    description:
      "Contact information, operating hours, and insurance coverage.",
    faqs: [
      {
        id: "gen1",
        question: "How do I contact Pickars customer support?",
        answer:
          "Our support team is available **24/7**. For the fastest response, message our official WhatsApp at **09164860591**. You can also reach us via email at **support@pickars.com** for less urgent inquiries.",
      },
      {
        id: "gen2",
        question: "What are your operating hours?",
        answer:
          "Pickars dispatch services are available **24/7, 365 days a year**. Our human support agents are online to assist you between **8 AM and 10 PM daily**.",
      },
      {
        id: "gen4",
        question: "Are my items insured during transit?",
        answer:
          "Yes. Every delivery is covered by our **Standard Transit Insurance**. For high-value goods, we recommend selecting **Extended Coverage** within the app during the booking process for total peace of mind.",
      },
    ],
  },
  {
    id: "customers",
    name: "For Customers",
    icon: <FiUser />,
    description: "Guides on booking, tracking, and managing your deliveries.",
    faqs: [
      {
        id: "cust3",
        question: "How do I book a delivery?",
        answer:
          "Open the app and follow these steps:\n1. Enter **Pickup & Drop-off** locations.\n2. Select your **Package Category**.\n3. Choose a **Rider** based on proximity or rating.\n4. Confirm your **Payment Method** and track your rider in real-time.",
      },
      {
        id: "cust5",
        question: "What payment methods do you accept?",
        answer:
          "We support **Debit/Credit Cards**, **Bank Transfers**, and our secure **In-app Wallet**. You can top up your wallet for faster, one-click checkout on future orders.",
      },
      {
        id: "cust7",
        question: "Can I send items to multiple locations?",
        answer:
          "Yes! Use our **Multi-Stop** feature during booking to add multiple drop-off points. Our algorithm will optimize the route to ensure efficiency and lower costs.",
      },
    ],
  },
  {
    id: "riders",
    name: "For Riders",
    icon: <FiTruck />,
    description: "Earnings, onboarding, and safety for our rider partners.",
    faqs: [
      {
        id: "rider1",
        question: "How do I become a Pickars Rider?",
        answer:
          "Download the **Pickars Rider App**, upload your valid **Driver’s License** and **Vehicle Documentation**, and complete our mandatory **Safety Training**. Once verified, you can start earning immediately.",
      },
      {
        id: "rider3",
        question: "How and when do I get paid?",
        answer:
          "Earnings are processed on a **Weekly Payout** cycle. All your completed deliveries from the previous week are deposited into your linked bank account every **Monday morning**.",
      },
      {
        id: "rider6",
        question: "Can I choose my own working hours?",
        answer:
          "Absolutely. As an independent partner, you have **100% autonomy**. Simply toggle your status to **Online** in the app when you want to receive orders, and **Offline** when you are done.",
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
        '<strong class="text-red-600 font-bold">$1</strong>'
      )
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[160px] font-['Lufga'] py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Title Section */}
        <header className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600 mb-4 block">
              Help Center
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#121212] leading-tight">
              Simple <span className="text-gray-300">Answers.</span>
            </h1>
            <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
              Everything you need to know about Nigeria's most reliable delivery
              network.
            </p>
          </motion.div>
        </header>

        {/* Search Input */}
        <div className="relative max-w-3xl mx-auto mb-20 group">
          <FiSearch
            className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors"
            size={24}
          />
          <input
            type="text"
            placeholder="Search topics, keywords, or guides..."
            value={searchTerm}
            className="w-full bg-white border border-gray-100 rounded-[40px] py-8 pl-20 pr-10 shadow-xl shadow-gray-200/40 outline-none focus:border-red-600/20 focus:ring-8 focus:ring-red-600/5 transition-all text-xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <AnimatePresence mode="wait">
          {searchTerm === "" && !selectedCategory ? (
            /* BENTO GRID VIEW */
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="group p-12 bg-white border border-gray-100 rounded-[50px] text-left hover:border-red-600/20 hover:shadow-2xl hover:shadow-red-600/5 transition-all relative overflow-hidden"
                >
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-3xl group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                    {cat.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-3">{cat.name}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-red-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    View Articles <FiSend />
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            /* ACCORDION LIST VIEW */
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                }}
                className="flex items-center gap-3 text-red-600 font-black mb-12 hover:gap-5 transition-all text-lg"
              >
                <FiArrowLeft size={24} /> Back to Categories
              </button>

              <div className="space-y-6">
                {(selectedCategory ? selectedCategory.faqs : filteredFaqs).map(
                  (faq) => (
                    <div
                      key={faq.id}
                      className={`rounded-[35px] border transition-all duration-500 ${
                        openFAQ === faq.id
                          ? "border-red-600/20 bg-white shadow-2xl shadow-red-600/5"
                          : "border-gray-100 bg-white/60"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setOpenFAQ(openFAQ === faq.id ? null : faq.id)
                        }
                        className="w-full p-10 flex items-center justify-between text-left outline-none"
                      >
                        <span
                          className={`text-2xl font-black tracking-tight transition-colors ${
                            openFAQ === faq.id
                              ? "text-red-600"
                              : "text-[#121212]"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <div
                          className={`shrink-0 h-12 w-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${
                            openFAQ === faq.id
                              ? "bg-red-600 text-white rotate-180"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {openFAQ === faq.id ? (
                            <FiMinus size={24} />
                          ) : (
                            <FiPlus size={24} />
                          )}
                        </div>
                      </button>
                      <AnimatePresence>
                        {openFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="px-10 pb-10 text-gray-500 text-xl leading-relaxed border-t border-gray-50 pt-8"
                              dangerouslySetInnerHTML={{
                                __html: formatAnswer(faq.answer),
                              }}
                            />
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

        {/* WhatsApp Floating Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 p-16 rounded-[60px] bg-[#121212] text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Still Need Assistance?
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-xl mx-auto">
              Our experts are ready to help you move your business forward.
              Connect with us on WhatsApp.
            </p>
            <a
              href="https://wa.me/2349164860591"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-4 bg-[#25D366] text-white px-12 py-6 rounded-[25px] font-black text-xl hover:scale-105 transition-transform"
            >
              <FaWhatsapp size={28} /> Chat with Support
            </a>
          </div>
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32" />
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;
