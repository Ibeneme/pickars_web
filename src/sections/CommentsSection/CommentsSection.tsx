import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import packageImg from "../../assets/images/driver/package.png";

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  tag: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "How fast is delivery with Pickars in Port Harcourt?",
    answer:
      "Pickars delivers packages across Port Harcourt in under an hour depending on the route, connecting you instantly with riders near you for lightning-fast dispatch.",
    category: "Delivery Speed",
    tag: "Speed",
  },
  {
    id: 2,
    question: "Can I track my package in real-time while it's being delivered?",
    answer:
      "Yes! Real-time tracking is built directly into Pickars so you can monitor your rider's exact location from pickup to final drop-off at your destination.",
    category: "Tracking",
    tag: "Live Map",
  },
  {
    id: 3,
    question: "What areas in Port Harcourt does Pickars cover?",
    answer:
      "Pickars covers all major areas across Port Harcourt including Borikiri, Garrison, Eleme, Oil Mill, GRA, Ada George, Trans-Amadi, Diobu, and beyond.",
    category: "Coverage",
    tag: "PH Coverage",
  },
  {
    id: 4,
    question:
      "Is Pickars reliable for sending business stock and daily orders?",
    answer:
      "Absolutely. Many online boutique owners and small businesses rely on Pickars daily to dispatch products securely and efficiently across PH without stress.",
    category: "Business",
    tag: "Merchants",
  },
  {
    id: 5,
    question: "How do I book a dispatch rider on the app?",
    answer:
      "Booking a bike is effortless—just open the app, enter your pickup and drop-off locations, view upfront pricing, and tap to match with an available rider instantly.",
    category: "Booking",
    tag: "Easy Steps",
  },
  {
    id: 6,
    question: "Are fragile items safe with Pickars dispatch riders?",
    answer:
      "Yes, our trained riders handle every package with care, ensuring fragile items, documents, and valuables arrive safely without any damage.",
    category: "Safety",
    tag: "Secure",
  },
  {
    id: 7,
    question: "Do Pickars riders stick to delivery schedules?",
    answer:
      "Pickars takes time management seriously, respecting delivery windows and schedules better than standard local dispatch services in Port Harcourt.",
    category: "Schedule",
    tag: "Punctual",
  },
  {
    id: 8,
    question: "Are the delivery rates affordable for small business owners?",
    answer:
      "We offer competitive, budget-friendly rates designed specifically to help small business owners scale their daily deliveries without breaking the bank.",
    category: "Pricing",
    tag: "Affordable",
  },
];

const AUTO_ADVANCE_SECONDS = 10;
const CIRCLE_CIRCUMFERENCE = 131.9;

export default function PickarsTestimonialsSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLSpanElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);

  const [currentIndex, setCurrentIndex] = useState(2);

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
        setCurrentIndex((prev) => (prev + 1) % faqs.length);
      },
    });

    return () => {
      progressTweenRef.current?.kill();
    };
  }, [currentIndex]);

  const pauseAutoAdvance = () => progressTweenRef.current?.pause();
  const resumeAutoAdvance = () => progressTweenRef.current?.resume();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % faqs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + faqs.length) % faqs.length);
  };

  const handleBtnEnter = (btn: HTMLButtonElement | null) => {
    if (!btn) return;
    gsap.to(btn, { y: -2, scale: 1.04, duration: 0.22, ease: "power2.out" });
  };

  const handleBtnLeave = (btn: HTMLButtonElement | null) => {
    if (!btn) return;
    gsap.to(btn, { y: 0, scale: 1, duration: 0.3, ease: "power3.out" });
  };

  const current = faqs[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FFF5F5] py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 font-sans flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Header - Centered */}
      <div className="w-full max-w-7xl mb-10 sm:mb-12 md:mb-16 flex flex-col items-center text-center">
        <h3 className="max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-950 tracking-tight leading-[1.1]">
          Got questions about <span className="text-[#ff0000]">Pickars?</span>
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mt-3 sm:mt-4 max-w-2xl">
          Everything you need to know about our dispatch rider service in Port
          Harcourt.
        </p>
      </div>

      {/* Card */}
      <div
        ref={containerRef}
        onMouseEnter={pauseAutoAdvance}
        onMouseLeave={resumeAutoAdvance}
        className="w-full max-w-7xl bg-white rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-red-100 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[480px] sm:min-h-[520px] relative overflow-hidden"
      >
        {/* Decorative ? */}
        <span
          ref={quoteMarkRef}
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 right-4 sm:right-8 md:right-12 text-[8rem] sm:text-[12rem] md:text-[16rem] font-black leading-none text-red-600/[0.035] select-none"
        >
          ?
        </span>

        {/* Top bar */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border-b border-red-50 pb-6 sm:pb-8">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-red-400 uppercase truncate">
              0{currentIndex + 1} / 0{faqs.length} — {current.tag}
            </span>
            <p className="text-sm sm:text-base text-gray-500 font-medium truncate max-w-md">
              {current.question}
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
              aria-label="Previous Question"
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
              aria-label="Next Question"
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

        {/* Answer */}
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
                {current.answer}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 sm:gap-8 pt-6 border-t border-red-50">
          {/* Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2 order-2 sm:order-1">
            {faqs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-6 sm:w-8 bg-[#FF0000]"
                    : "w-1.5 sm:w-2 bg-red-100 hover:bg-red-200"
                }`}
                aria-label={`Go to question ${idx + 1}`}
              />
            ))}
          </div>

          {/* Package image – responsive, no shadow */}
          <img
            src={packageImg}
            alt="Package"
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain order-1 sm:order-2 -mb-2 sm:-mb-4 md:-mb-6"
          />
        </div>
      </div>
    </section>
  );
}
