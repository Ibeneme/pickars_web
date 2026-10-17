"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  AnimatePresence,
  useAnimationFrame,
  useInView,
  useReducedMotion,
} from "framer-motion";

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
const INK = "#111111";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ───────────── Dispatch rider (one wheel) ───────────── */
const WHEEL_R = 13;



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
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        quoteMarkRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(quoteMarkRef.current, {
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });
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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

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
      className="relative w-full bg-[#fff5f5] py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 flex flex-col font-['Lufga'] justify-center items-center overflow-hidden"
    >
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
        TESTIMONIALS
      </motion.div>

      {/* Header - Centered */}
      <div className="w-full max-w-3xl mb-10 sm:mb-12 md:mb-16 flex flex-col items-center text-center">
        <h3 className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-6xl">
          Loved by businesses across{" "}
          <span className="text-[#ff0000]">Port Harcourt</span>
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mt-3 sm:mt-4 max-w-2xl">
          Hear what everyday senders and merchants have to say about their
          experience with Pickars.
        </p>
      </div>

      {/* Card */}
      <div
        ref={containerRef}
        onMouseEnter={pauseAutoAdvance}
        onMouseLeave={resumeAutoAdvance}
        className="w-full max-w-7xl bg-white rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-red-100 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[480px] sm:min-h-[520px] relative overflow-hidden"
      >
        {/* Decorative Quote Mark */}
        <span
          ref={quoteMarkRef}
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 right-4 sm:right-8 md:right-12 text-[8rem] sm:text-[12rem] md:text-[16rem] font-black leading-none text-red-600/[0.035] select-none"
        >
          &ldquo;
        </span>

        {/* Top bar */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border-b border-red-50 pb-6 sm:pb-8">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-red-400 uppercase truncate">
              0{currentIndex + 1} / 0{testimonials.length}
            </span>
            <p className="text-sm sm:text-base text-gray-700 font-bold truncate max-w-md">
              {current.author} —{" "}
              <span className="text-gray-500 font-medium">{current.role}</span>
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 self-end sm:self-auto shrink-0">
            <button
              ref={prevBtnRef}
              onClick={handlePrev}
              onMouseEnter={() => handleBtnEnter(prevBtnRef.current)}
              onMouseLeave={() => handleBtnLeave(prevBtnRef.current)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-red-100 flex items-center justify-center text-gray-700 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer will-change-transform"
              aria-label="Previous Testimonial"
            >
              <svg
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-current stroke-2 fill-none"
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
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-red-100 flex items-center justify-center text-gray-700 hover:bg-red-50 hover:border-red-200 transition-colors relative cursor-pointer will-change-transform"
              aria-label="Next Testimonial"
            >
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 48 48"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="21"
                  className="stroke-red-100 fill-none"
                  strokeWidth="2"
                />
                <circle
                  ref={progressCircleRef}
                  cx="24"
                  cy="24"
                  r="21"
                  className="stroke-[#FF0000] fill-none"
                  strokeWidth="2.5"
                  strokeDasharray={CIRCLE_CIRCUMFERENCE}
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-current stroke-2 fill-none relative z-10"
                viewBox="0 0 24 24"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quote / Testimonial text */}
        <div className="relative py-8 sm:py-10 md:py-14 flex flex-col justify-center min-h-[180px] sm:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(3px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.4rem] xl:text-[2.6rem] font-extrabold tracking-tight text-gray-900 leading-[1.3] sm:leading-[1.25]">
                &ldquo;{current.quote}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 sm:gap-8 pt-6 border-t border-red-50">
          {/* Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2 order-2 sm:order-1">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-6 sm:w-8 bg-[#FF0000]"
                    : "w-1.5 sm:w-2 bg-red-100 hover:bg-red-200"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
