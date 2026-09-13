"use client";

import { useMemo, useState } from "react";
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

// Font classes below assume "Space Grotesk" and "Inter" are loaded globally
// (see setup note at the bottom of this file for the two ways to do that in Vite).
const heading = "font-heading";
const body = "font-body";

/* ---------------------------------- Types --------------------------------- */

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

/* ---------------------------------- Data ---------------------------------- */

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

/* ------------------------------ Text rendering ----------------------------- */

function parseBold(line: string, keyPrefix: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g).filter((p) => p.length > 0);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong
        key={`${keyPrefix}-b-${i}`}
        className="font-semibold text-[var(--ink)]"
      >
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
        <ol key={`ol-${key++}`} className="mt-2 space-y-1.5 pl-1">
          {list.map((item, idx) => (
            <li
              key={idx}
              className="flex gap-2.5 text-[15px] leading-relaxed text-[var(--ink)]/75"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--slate)]/10 text-[11px] font-semibold text-[var(--slate)]">
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
          className="mt-2 text-[15px] leading-relaxed text-[var(--ink)]/75 first:mt-0"
        >
          {parseBold(line, `p-${idx}`)}
        </p>
      );
    }
  });
  flushList();
  return blocks;
}

/* ---------------------------------- Page ---------------------------------- */

export default function HelpCenterPage() {
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
    <div
      className={`${body} min-h-screen bg-[var(--paper)] text-[var(--ink)]`}
      style={
        {
          "--ink": "#141416",
          "--paper": "#FAFAFA",
          "--panel": "#FFFFFF",
          "--line": "#E9E7E4",
          "--red": "#FF0000",
          "--slate": "#565B66",
        } as React.CSSProperties
      }
    >
      {/* ------------------------------- Hero ------------------------------- */}
      <header className="relative overflow-hidden bg-[var(--ink)] px-6 pb-20 pt-16 sm:px-10 sm:pt-24">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-25 blur-[100px]"
          style={{
            background: "radial-gradient(circle, var(--red), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full opacity-10 blur-[110px]"
          style={{
            background: "radial-gradient(circle, var(--red), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--red)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--red)]" />
            </span>
            Riders live 24/7 · Pickars Help Center
          </span>
          <h1
            className={`${heading} mx-auto mt-6 max-w-2xl text-[36px] font-semibold leading-[1.12] tracking-[-0.01em] text-white sm:text-[48px]`}
          >
            What can we help you get moving?
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15.5px] leading-relaxed text-white/55 sm:text-base">
            Answers on bookings, riders, payments and support — search below or
            browse by topic.
          </p>

          <div className="relative mx-auto mt-9 max-w-xl">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for answers…"
              className="w-full rounded-xl border border-white/10 bg-white/[0.07] py-4 pl-11 pr-11 text-[15px] text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] outline-none ring-[var(--red)] transition placeholder:text-white/35 focus:border-white/20 focus:ring-2"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white/80"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ---------------------------- Category chips --------------------------- */}
      <div className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--panel)]/90 px-6 py-4 backdrop-blur sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
              activeCategory === "all"
                ? "border-[var(--red)] bg-[var(--red)]/[0.06] text-[var(--red)]"
                : "border-[var(--line)] text-[var(--ink)]/60 hover:border-[var(--ink)]/25 hover:text-[var(--ink)]"
            }`}
          >
            All topics
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
                activeCategory === cat.id
                  ? "border-[var(--red)] bg-[var(--red)]/[0.06] text-[var(--red)]"
                  : "border-[var(--line)] text-[var(--ink)]/60 hover:border-[var(--ink)]/25 hover:text-[var(--ink)]"
              }`}
            >
              <span className="text-[14px]">{cat.icon}</span>
              {cat.name}
              <span
                className={`ml-0.5 text-[12px] ${
                  activeCategory === cat.id
                    ? "text-[var(--red)]/60"
                    : "text-[var(--ink)]/30"
                }`}
              >
                {counts.get(cat.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* --------------------------------- Body -------------------------------- */}
      <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10 sm:py-14">
        {query && (
          <p className="mb-6 text-[13.5px] text-[var(--ink)]/50">
            {totalResults} result{totalResults === 1 ? "" : "s"} for "{query}"
          </p>
        )}

        {visibleCategories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--line)] px-6 py-16 text-center">
            <p className="text-[15px] text-[var(--ink)]/60">
              No answers matched "{query}". Try a different search, or message
              us directly below.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {visibleCategories.map((cat) => (
              <section key={cat.id}>
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--red)]/[0.07] text-[17px] text-[var(--red)]">
                    {cat.icon}
                  </span>
                  <div>
                    <h2
                      className={`${heading} text-[19px] font-semibold text-[var(--ink)]`}
                    >
                      {cat.name}
                    </h2>
                    <p className="text-[13.5px] text-[var(--ink)]/50">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-[var(--line)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-[0_1px_2px_rgba(20,20,22,0.03)]">
                  {cat.faqs.map((faq) => {
                    const isOpen = openIds.has(faq.id);
                    return (
                      <div
                        key={faq.id}
                        className={`border-l-2 transition-colors ${
                          isOpen ? "border-[var(--red)]" : "border-transparent"
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          aria-expanded={isOpen}
                          className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[var(--ink)]/[0.02] sm:px-6"
                        >
                          <span
                            className={`text-[15px] font-medium transition-colors ${
                              isOpen
                                ? "text-[var(--ink)]"
                                : "text-[var(--ink)]/90 group-hover:text-[var(--ink)]"
                            }`}
                          >
                            {faq.question}
                          </span>
                          <FiChevronDown
                            className={`h-4.5 w-4.5 shrink-0 transition-all duration-200 ${
                              isOpen
                                ? "rotate-180 text-[var(--red)]"
                                : "text-[var(--ink)]/35"
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 sm:px-6">
                            {renderAnswer(faq.answer)}

                            {faq.annotations?.map((a, i) => (
                              <div
                                key={i}
                                className={`mt-3 flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-[13.5px] ${
                                  a.type === "tip"
                                    ? "border-[var(--line)] bg-[var(--ink)]/[0.02] text-[var(--ink)]/65"
                                    : "border-[var(--red)]/15 bg-[var(--red)]/[0.05] text-[var(--red)]"
                                }`}
                              >
                                {a.type === "tip" ? (
                                  <FiZap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--red)]" />
                                ) : (
                                  <FiAlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
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

      {/* -------------------------------- Contact ------------------------------- */}
      <footer className="border-t border-[var(--line)] bg-[var(--panel)] px-6 py-12 sm:px-10">
        <div
          className="relative mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 overflow-hidden rounded-2xl p-8 sm:flex-row sm:items-center sm:p-10"
          style={{
            background: "linear-gradient(135deg, var(--ink) 55%, #2A0B0B 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--red), transparent 70%)",
            }}
          />
          <div className="relative">
            <h3 className={`${heading} text-[21px] font-semibold text-white`}>
              Still need a hand?
            </h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-[13.5px] text-white/50">
              <FiClock className="h-3.5 w-3.5" />
              Human support online 8:00 AM – 10:00 PM, daily
            </p>
          </div>
          <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="https://wa.me/2349164860591"
              className="flex items-center justify-center gap-2 rounded-xl bg-[var(--red)] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,0,0,0.6)] transition hover:brightness-110"
            >
              <FiMessageCircle className="h-4 w-4" />
              WhatsApp 0916 486 0591
            </a>
            <a
              href="mailto:support@pickars.com"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-[14px] font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              <FiMail className="h-4 w-4" />
              support@pickars.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* -----------------------------------------------------------------------
   SETUP NOTE (Vite, not Next.js — no next/font here)

   1) Load the two fonts. Easiest: add this to your index.html <head>:

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      >

      (Or use @fontsource/space-grotesk + @fontsource/inter and import them
      in main.tsx if you'd rather bundle instead of using Google's CDN.)

   2) Register the two Tailwind font families in tailwind.config.js:

      theme: {
        extend: {
          fontFamily: {
            heading: ["Space Grotesk", "sans-serif"],
            body: ["Inter", "sans-serif"],
          },
        },
      },

   Without step 2, "font-heading" / "font-body" are no-op classes and the
   page falls back to your default Tailwind sans font — it'll still work,
   just without the intended type contrast.
------------------------------------------------------------------------ */
