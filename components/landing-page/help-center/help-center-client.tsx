"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  FiHelpCircle,
  FiUser,
  FiTruck,
  FiCreditCard,
  FiSearch,
  FiChevronDown,
  FiZap,
  FiAlertCircle,
  FiMessageCircle,
  FiMail,
  FiClock,
  FiX,
} from "react-icons/fi";

type AnnotationType = "tip" | "important";

interface Annotation {
  type: AnnotationType;
  text: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  annotations?: Annotation[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  faqs: FAQ[];
}

export const categories: Category[] = [
  {
    id: "support",
    name: "General Support",
    icon: <FiHelpCircle className="h-5 w-5" />,
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
    icon: <FiUser className="h-5 w-5" />,
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
          "Yes use our **Multi-Stop** feature.\nAdd up to 5 stops. Our system automatically optimizes the route to save time & money.",
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
    icon: <FiTruck className="h-5 w-5" />,
    description: "Onboarding, earnings, safety & support",
    faqs: [
      {
        id: "rider1",
        question: "How do I become a Pickars Rider?",
        answer:
          "1. Download **Pickars Rider** app\n2. Upload valid Driver's License + Bike/Car documents\n3. Complete short safety & service training\n4. Get verified (usually 24–48h) → start accepting orders",
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
    icon: <FiCreditCard className="h-5 w-5" />,
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
            text: "Wallet refunds are instant  choose Wallet for faster access",
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

function parseBold(line: string, keyPrefix: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g).filter((p) => p.length > 0);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={`${keyPrefix}-b-${i}`} className="font-bold text-gray-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={`${keyPrefix}-s-${i}`}>{part}</span>
    )
  );
}

function renderAnswer(answer: string) {
  const lines = answer.split("\n").filter((l) => l.trim() !== "");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let key = 0;

  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ol key={`ol-${key++}`} className="mt-3 space-y-2.5 pl-1">
          {list.map((item, idx) => (
            <li
              key={idx}
              className="flex gap-3 text-[15px] leading-relaxed text-gray-600 font-medium"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF0000]/10 text-[11px] font-black text-[#FF0000]">
                {idx + 1}
              </span>
              <span>
                {parseBold(item.replace(/^\d+\.\s*/, ""), `li-${idx}`)}
              </span>
            </li>
          ))}
        </ol>
      );
      list = [];
    }
  };

  lines.forEach((line, idx) => {
    if (/^\d+\.\s/.test(line.trim())) {
      list.push(line.trim());
    } else {
      flushList();
      blocks.push(
        <p
          key={`p-${idx}`}
          className="mt-2.5 text-[15px] leading-relaxed text-gray-600 font-medium first:mt-0"
        >
          {parseBold(line, `p-${idx}`)}
        </p>
      );
    }
  });
  flushList();
  return blocks;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 110, damping: 16 },
  },
};

export default function HelpCenterClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const counts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const map = new Map<string, number>();
    categories.forEach((cat) => {
      const n = cat.faqs.filter(
        (f) =>
          !q ||
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      ).length;
      map.set(cat.id, n);
    });
    return map;
  }, [query]);

  const visibleCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        faqs: cat.faqs.filter(
          (f) =>
            !q ||
            f.question.toLowerCase().includes(q) ||
            f.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.faqs.length > 0);
  }, [query, activeCategory]);

  const totalResults = visibleCategories.reduce(
    (sum, c) => sum + c.faqs.length,
    0
  );

  return (
    <div className="min-h-screen bg-[#fff] font-['Lufga'] text-gray-900 selection:bg-[#FF0000] selection:text-white">
      {/*  HERO HEADER  */}
      <section className="relative isolate overflow-hidden bg-[#fff] pt-36 pb-12 md:pt-48 md:pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6"
        >
          {/* Ticket Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            HELP CENTER
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl"
          >
            What can we help you{" "}
            <span className="relative inline-block text-[#FF0000]">
              get moving?
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-xl text-[16px] sm:text-[19px] font-medium leading-relaxed text-gray-600"
          >
            Answers on bookings, riders, payments, and support  search below or
            browse by category.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-xl"
          >
            <FiSearch className="pointer-events-none absolute left-4.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for answers…"
              className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50/70 py-4.5 pl-12 pr-12 text-[15px] font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FF0000] focus:bg-white focus:shadow-xl focus:shadow-[#FF0000]/5"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/*  STICKY CATEGORY NAV  */}
      <div className="sticky top-0 z-20 border-y border-gray-100 bg-white/90 px-4 py-3.5 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold tracking-wide transition-all ${
              activeCategory === "all"
                ? "bg-[#FF0000] text-white shadow-md shadow-[#FF0000]/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            All Topics
          </button>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-full px-4.5 py-2 text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-[#FF0000] text-white shadow-md shadow-[#FF0000]/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
                <span
                  className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {counts.get(cat.id)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/*  MAIN CONTENT  */}
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {query && (
          <p className="mb-8 text-sm font-semibold text-gray-500">
            Found {totalResults} result{totalResults === 1 ? "" : "s"} for "
            {query}"
          </p>
        )}

        {visibleCategories.length === 0 ? (
          <div className="rounded-[32px] border-2 border-dashed border-gray-200 px-6 py-16 text-center">
            <p className="text-base font-semibold text-gray-600">
              No answers matched "{query}". Try a different search, or reach out
              to us below.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {visibleCategories.map((cat) => (
              <section key={cat.id}>
                {/* Category Header */}
                <div className="mb-5 flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FF0000]/10 text-[#FF0000]">
                    {cat.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight sm:text-2xl">
                      {cat.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Accordion Container */}
                <div className="overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm divide-y divide-gray-100">
                  {cat.faqs.map((faq) => {
                    const isOpen = openIds.has(faq.id);
                    return (
                      <div key={faq.id} className="transition-colors">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          aria-expanded={isOpen}
                          className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-gray-50/80"
                        >
                          <span
                            className={`text-base font-bold transition-colors ${
                              isOpen
                                ? "text-[#FF0000]"
                                : "text-gray-900 group-hover:text-[#FF0000]"
                            }`}
                          >
                            {faq.question}
                          </span>
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                              isOpen
                                ? "bg-[#FF0000] text-white rotate-180"
                                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                            }`}
                          >
                            <FiChevronDown className="h-4 w-4" />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6 pt-1 border-t border-gray-50">
                            {renderAnswer(faq.answer)}

                            {faq.annotations?.map((a, i) => (
                              <div
                                key={i}
                                className={`mt-4 flex items-start gap-3 rounded-xl border p-3.5 text-xs sm:text-sm font-semibold ${
                                  a.type === "tip"
                                    ? "border-gray-200 bg-gray-50 text-gray-700"
                                    : "border-[#FF0000]/20 bg-[#FF0000]/5 text-[#FF0000]"
                                }`}
                              >
                                {a.type === "tip" ? (
                                  <FiZap className="mt-0.5 h-4 w-4 shrink-0 text-[#FF0000]" />
                                ) : (
                                  <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                )}
                                <span className="leading-snug">{a.text}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/*  CALL TO ACTION FOOTER CARD  */}
      <footer className="pb-16 pt-8 px-4 sm:px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-gray-900 p-8 sm:p-12 text-white">
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
                Still need a hand<span className="text-[#FF0000]">?</span>
              </h3>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-400">
                <FiClock className="h-4 w-4 text-[#FF0000]" />
                Human support online 8:00 AM – 10:00 PM, daily
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="https://wa.me/2349164860591"
                className="flex items-center justify-center gap-2.5 rounded-full bg-[#FF0000] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#FF0000]/30 transition hover:brightness-110 active:scale-[0.98]"
              >
                <FiMessageCircle className="h-4.5 w-4.5" />
                WhatsApp 0916 486 0591
              </a>
              <a
                href="mailto:support@pickars.com"
                className="flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 hover:border-white/40 active:scale-[0.98]"
              >
                <FiMail className="h-4.5 w-4.5" />
                support@pickars.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
