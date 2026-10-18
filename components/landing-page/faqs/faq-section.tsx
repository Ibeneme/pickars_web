"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqData } from "./faq-data";

const ACCENT = "#FF0000"; // answer card + highlights (swap for any colour)
const WHATSAPP_NUMBER = "2349164860591"; // 0916 486 0591

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

const FAQsClientPage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(faqData[0].id);
  const active = faqData.find((f) => f.id === activeId) ?? faqData[0];

  const select = (id: string) => {
    setActiveId(id);
  };

  return (
    <section className="relative min-h-[85vh] w-full bg-white px-4 pb-20 pt-40 font-['Lufga'] text-black sm:px-6 md:pt-48 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="mb-12 text-6xl font-black leading-none tracking-tight sm:text-8xl"
        >
          FAQs<span style={{ color: ACCENT }}>.</span>
        </motion.h1>

        {/* DESKTOP VIEW: 2 Columns (Left: List, Right: Sticky Answer) */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-14">
          {/* LEFT: questions list */}
          <div
            role="list"
            className="flex flex-col gap-3 overflow-y-auto pr-4 h-[640px] max-h-none [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100"
          >
            {faqData.map((faq, i) => {
              const isActive = faq.id === activeId;
              return (
                <motion.button
                  key={faq.id}
                  role="listitem"
                  type="button"
                  onClick={() => select(faq.id)}
                  aria-current={isActive}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * Math.min(i, 8), duration: 0.35 }}
                  className={`flex w-full shrink-0 items-center justify-between rounded-xl border px-6 py-6 text-left text-base font-bold tracking-tight transition-colors sm:text-lg ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-gray-50 text-black hover:bg-gray-100"
                  }`}
                >
                  <span className="pr-4">{faq.question}</span>
                  {isActive && (
                    <span className="shrink-0" style={{ color: ACCENT }}>
                      <Burst className="h-6 w-6" />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: persistent desktop answer card */}
          <div>
            <div
              className="flex min-h-[380px] flex-col justify-between rounded-[28px] p-8 text-white sm:p-12 h-[640px]"
              style={{ backgroundColor: ACCENT }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex min-h-0 flex-1 flex-col overflow-y-auto"
                >
                  <Burst className="mb-8 h-9 w-9 shrink-0 text-black" spin />
                  <p className="text-xl font-medium leading-snug sm:text-3xl sm:leading-snug">
                    {active.answer}
                  </p>
                </motion.div>
              </AnimatePresence>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi Pickars! I have a question."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center self-start rounded-full border-[3px] border-black bg-black px-6 py-3 text-sm font-black text-white transition-transform hover:-translate-y-0.5 sm:text-base"
              >
                Still have questions? Chat with us
              </a>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET VIEW: Accordion (Answer drops right below active question) */}
        <div className="flex flex-col gap-3 lg:hidden" role="list">
          {faqData.map((faq, i) => {
            const isActive = faq.id === activeId;
            return (
              <div key={faq.id} className="flex flex-col gap-3">
                <motion.button
                  role="listitem"
                  type="button"
                  onClick={() => select(faq.id)}
                  aria-current={isActive}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * Math.min(i, 8), duration: 0.35 }}
                  className={`flex w-full items-center justify-between rounded-xl border px-6 py-6 text-left text-base font-bold tracking-tight transition-colors sm:text-lg ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-gray-50 text-black hover:bg-gray-100"
                  }`}
                >
                  <span className="pr-4">{faq.question}</span>
                  {isActive && (
                    <span className="shrink-0" style={{ color: ACCENT }}>
                      <Burst className="h-6 w-6" />
                    </span>
                  )}
                </motion.button>

                {/* Mobile Dropdown Answer */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="flex flex-col justify-between rounded-[24px] p-6 text-white sm:p-8"
                        style={{ backgroundColor: ACCENT }}
                      >
                        <div>
                          <Burst
                            className="mb-6 h-8 w-8 shrink-0 text-black"
                            spin
                          />
                          <p className="text-lg font-medium leading-snug sm:text-2xl sm:leading-snug">
                            {faq.answer}
                          </p>
                        </div>

                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            "Hi Pickars! I have a question."
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-8 inline-flex items-center self-start rounded-full border-[3px] border-black bg-black px-6 py-3 text-sm font-black text-white transition-transform hover:-translate-y-0.5 sm:text-base"
                        >
                          Still have questions? Chat with us
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQsClientPage;
