"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqData } from "./faq-data";

const ACCENT = "#FF0000"; // open question + highlights (swap for any colour)
const WHATSAPP_NUMBER = "2349164860591"; // 0916 486 0591
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Pickars! I have a question."
)}`;

/* 12-point burst, drawn once */
const burstPath = (() => {
  const points = 12;
  const outer = 11;
  const inner = 8.4;
  const c = 12;
  return (
    Array.from({ length: points * 2 }, (_, i) => {
      const r = i % 2 === 0 ? outer : inner;
      const a = (Math.PI * i) / points - Math.PI / 2;
      return `${i === 0 ? "M" : "L"}${(c + r * Math.cos(a)).toFixed(2)} ${(
        c +
        r * Math.sin(a)
      ).toFixed(2)}`;
    }).join("") + "Z"
  );
})();

const Burst: React.FC<{ className?: string; spin?: boolean }> = ({
  className,
  spin = false,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      animate={spin && !reduce ? { rotate: 360 } : undefined}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    >
      <path d={burstPath} />
    </motion.svg>
  );
};

/* plus sign that turns into a minus when the question is open */
const PlusMinus: React.FC<{ open: boolean }> = ({ open }) => (
  <span
    aria-hidden="true"
    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-current"
  >
    <span className="absolute h-0.5 w-4 rounded bg-current" />
    <span
      className={`absolute h-4 w-0.5 rounded bg-current transition-transform duration-300 ${
        open ? "scale-y-0" : "scale-y-100"
      }`}
    />
  </span>
);

const FAQsClientPage: React.FC = () => {
  // null = everything closed
  const [activeId, setActiveId] = useState<string | null>(faqData[0].id);

  const toggle = (id: string) =>
    setActiveId((current) => (current === id ? null : id));

  return (
    <section className="relative min-h-[85vh] w-full bg-white px-4 pb-24 pt-40 font-['Lufga'] text-black sm:px-6 md:pt-48 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* LEFT: heading + contact card (stays in view while the list scrolls) */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="text-6xl font-black leading-none tracking-tight sm:text-8xl"
          >
            FAQs<span style={{ color: ACCENT }}>.</span>
          </motion.h1>

          <p className="mt-6 max-w-sm text-lg leading-relaxed text-black/70 sm:text-xl">
            Quick answers about sending, receiving and getting around with
            Pickars.
          </p>

          <div className="mt-10 rounded-[28px] bg-black p-8 text-white sm:p-10">
            <Burst className="mb-6 h-8 w-8" spin />
            <h2 className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
              Didn&apos;t find your answer?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              Message us on WhatsApp and we&apos;ll get back to you.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: ACCENT }}
              className="mt-8 inline-flex items-center rounded-full px-6 py-3 text-sm font-black text-white transition-transform hover:-translate-y-0.5 sm:text-base"
            >
              Chat with us
            </a>
          </div>
        </aside>

        {/* RIGHT: accordion (works the same on mobile, tablet and desktop) */}
        <div className="flex flex-col gap-3" role="list">
          {faqData.map((faq, i) => {
            const isOpen = faq.id === activeId;
            const panelId = `faq-panel-${faq.id}`;
            const buttonId = `faq-button-${faq.id}`;

            return (
              <motion.div
                key={faq.id}
                role="listitem"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * Math.min(i, 8), duration: 0.35 }}
                className={`overflow-hidden rounded-3xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-transparent text-white"
                    : "border-gray-200 bg-gray-50 text-black hover:bg-gray-100"
                }`}
                style={isOpen ? { backgroundColor: ACCENT } : undefined}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left text-lg font-bold tracking-tight sm:px-8 sm:py-7 sm:text-xl"
                  >
                    <span>{faq.question}</span>
                    <PlusMinus open={isOpen} />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl px-6 pb-8 text-lg font-medium leading-relaxed text-white sm:px-8 sm:pb-10 sm:text-2xl sm:leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQsClientPage;
