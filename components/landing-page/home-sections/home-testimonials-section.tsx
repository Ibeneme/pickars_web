"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  tag: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    quote:
      "Pickars has completely transformed how I handle customer deliveries for my online boutique in GRA. Packages get to my buyers across Port Harcourt in record time without any stress!",
    author: "Chiamaka Okoro",
    role: "Boutique Owner, GRA",
    tag: "Merchant",
  },
  {
    id: 2,
    quote:
      "The live map tracking is a game-changer! I can sit in my office in Trans-Amadi and watch my dispatch rider deliver documents right to my client's doorstep in real-time.",
    author: "Tariq Briggs",
    role: "Operations Manager, Trans-Amadi",
    tag: "Live Map",
  },
  {
    id: 3,
    quote:
      "I run a small bakery, and handling fragile cakes used to be a nightmare until I started using Pickars. Their riders are careful, punctual, and extremely polite.",
    author: "Blessing Nnamdi",
    role: "Baker & Vendor, Ada George",
    tag: "Secure",
  },
  {
    id: 4,
    quote:
      "Lightning-fast delivery across Borikiri and Garrison. Whenever I need a package picked up urgently, Pickars never disappoints. Best dispatch service in PH!",
    author: "Godwin Etim",
    role: "E-commerce Seller",
    tag: "Speed",
  },
  {
    id: 5,
    quote:
      "Booking a bike takes less than a minute on the app. Upfront pricing means no hidden charges or arguing with riders over delivery fees. Highly recommended!",
    author: "Dr. Evelyn Peters",
    role: "Pharmacist, Rumuola",
    tag: "Easy App",
  },
  {
    id: 6,
    quote:
      "As someone who sends multiple parcels daily across town, their budget-friendly merchant rates have saved me so much money while keeping my customers happy.",
    author: "Kenneth Woke",
    role: "Gadget Store Owner, Mile 3",
    tag: "Affordable",
  },
  {
    id: 7,
    quote:
      "Reliable, professional, and super fast. Pickars handles our corporate document runs across Port Harcourt seamlessly. Exceptional service all round.",
    author: "Precious Dike",
    role: "Legal Consultant, Old GRA",
    tag: "Corporate",
  },
  {
    id: 8,
    quote:
      "I love how smooth the whole experience is. From ordering to drop-off, everything feels modern, secure, and built specifically for people living in PH.",
    author: "Samuel Jumbo",
    role: "Regular Customer, Eleme",
    tag: "Punctual",
  },
];

const AUTO_ADVANCE_SECONDS = 10;
const CIRCLE_CIRCUMFERENCE = 131.9;

const RED = "#FF0000";
const BG = "#fff";

const getInitials = (name: string) => {
  const words = name.split(" ").filter((w) => w && !/^dr\.?$/i.test(w));
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
};

export default function HomeTestimonialsSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLSpanElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    progressTweenRef.current?.kill();
    if (!progressCircleRef.current) return;

    const state = { value: 0 };
    gsap.set(progressCircleRef.current, {
      strokeDashoffset: CIRCLE_CIRCUMFERENCE,
    });

    progressTweenRef.current = gsap.to(state, {
      value: 1,
      duration: AUTO_ADVANCE_SECONDS,
      ease: "none",
      onUpdate: () => {
        if (progressCircleRef.current) {
          progressCircleRef.current.style.strokeDashoffset = String(
            CIRCLE_CIRCUMFERENCE - CIRCLE_CIRCUMFERENCE * state.value
          );
        }
      },
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      },
    });

    return () => {
      progressTweenRef.current?.kill();
    };
  }, [currentIndex]);

  const pauseAutoAdvance = () => progressTweenRef.current?.pause();
  const resumeAutoAdvance = () => progressTweenRef.current?.resume();

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const handleBtnEnter = (btn: HTMLButtonElement | null) => {
    if (!btn) return;
    gsap.to(btn, { y: -2, scale: 1.04, duration: 0.22, ease: "power2.out" });
  };

  const handleBtnLeave = (btn: HTMLButtonElement | null) => {
    if (!btn) return;
    gsap.to(btn, { y: 0, scale: 1, duration: 0.3, ease: "power3.out" });
  };

  const current = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 font-['Lufga'] sm:py-20 md:py-28  "
      style={{ backgroundColor: BG }}
    >
      <div
        ref={containerRef}
        onMouseEnter={pauseAutoAdvance}
        onMouseLeave={resumeAutoAdvance}
        className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
      >
        {/* ───────────── LEFT: Heading + Controls ───────────── */}
        <div className="flex flex-col items-start overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-5 select-none bg-[#000] px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white sm:mb-6 sm:px-6 sm:py-2.5 sm:text-xs md:text-sm"
          >
            TESTIMONIALS
          </motion.div>

          <h2 className="text-6xl font-black text-black leading-none tracking-tight sm:text-8xl">
            Words on the Streets
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
            Hear what everyday senders and merchants have to say about their
            experience with Pickars.
          </p>

          {/* Controls */}
          <div className="mt-8 flex items-center gap-5 sm:mt-10">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                ref={prevBtnRef}
                onClick={handlePrev}
                onMouseEnter={() => handleBtnEnter(prevBtnRef.current)}
                onMouseLeave={() => handleBtnLeave(prevBtnRef.current)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-red-200 bg-white text-gray-700 transition-colors hover:border-red-300 hover:bg-red-50 sm:h-14 sm:w-14"
                aria-label="Previous Testimonial"
              >
                <svg
                  className="h-5 w-5 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button
                ref={nextBtnRef}
                onClick={handleNext}
                onMouseEnter={() => handleBtnEnter(nextBtnRef.current)}
                onMouseLeave={() => handleBtnLeave(nextBtnRef.current)}
                className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-red-200 bg-white text-gray-700 transition-colors hover:border-red-300 hover:bg-red-50 sm:h-14 sm:w-14"
                aria-label="Next Testimonial"
              >
                <svg
                  className="absolute inset-0 h-full w-full -rotate-90"
                  viewBox="0 0 48 48"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="21"
                    className="fill-none stroke-red-100"
                    strokeWidth="2"
                  />
                  <circle
                    ref={progressCircleRef}
                    cx="24"
                    cy="24"
                    r="21"
                    className="fill-none stroke-[#FF0000]"
                    strokeWidth="2.5"
                    strokeDasharray={CIRCLE_CIRCUMFERENCE}
                    strokeLinecap="round"
                  />
                </svg>
                <svg
                  className="relative z-10 h-5 w-5 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5 sm:mt-8 sm:gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 sm:h-2 ${
                  idx === currentIndex
                    ? "w-6 bg-[#FF0000] sm:w-8"
                    : "w-1.5 bg-red-200 hover:bg-red-300 sm:w-2"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ───────────── RIGHT: Stacked Quote Card ───────────── */}
        <div className="relative w-full pb-3 pr-3 sm:pb-5 sm:pr-5">
          {/* Background Decorative Cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rotate-[2deg] rounded-[2rem] border border-red-200 bg-red-100 sm:translate-x-5 sm:translate-y-5 sm:rounded-[2.5rem]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 -rotate-[1deg] rounded-[2rem] border border-red-100 bg-white sm:translate-x-2.5 sm:translate-y-2.5 sm:rounded-[2.5rem]"
          />

          {/* Front Card */}
          <div
            className="relative flex w-full flex-col overflow-hidden rounded-[2rem] p-6 text-white sm:rounded-[2.5rem] sm:p-10 md:p-12"
            style={{ backgroundColor: RED }}
          >
            {/* Decorative Quote Mark */}
            <span
              ref={quoteMarkRef}
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 right-4 select-none text-[8rem] font-black leading-none text-black/[0.1] sm:right-6 sm:text-[11rem]"
            >
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(2px)" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col justify-between gap-8 sm:gap-12"
                aria-live="polite"
              >
                <div>
                  <span className="inline-block rounded-full bg-white px-3.5 py-1 text-[11px] font-black uppercase tracking-widest text-[#FF0000] sm:px-4 sm:py-1.5 sm:text-xs">
                    {current.tag}
                  </span>

                  <p className="mt-6 text-lg font-extrabold leading-relaxed tracking-tight sm:text-xl md:text-2xl">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-white/30 pt-5 sm:pt-6">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-sm font-black text-white sm:h-13 sm:w-13 sm:text-base"
                  >
                    {getInitials(current.author)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold sm:text-base md:text-lg">
                      {current.author}
                    </p>
                    <p className="truncate text-xs font-medium text-white/80 sm:text-sm">
                      {current.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
