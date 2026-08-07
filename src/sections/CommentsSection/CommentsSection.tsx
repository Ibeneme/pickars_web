import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Fastest delivery service in Port Harcourt! My package was delivered to Borikiri in under an hour.",
    author: "Tamuno S.",
    location: "Borikiri",
    initials: "TS",
  },
  {
    id: 2,
    quote:
      "The real-time tracking is a game changer for my online boutique at Garrison market.",
    author: "Nneka O.",
    location: "Garrison",
    initials: "NO",
  },
  {
    id: 3,
    quote:
      "Affordable door-to-door delivery all the way to Eleme. Very respectful riders!",
    author: "Baridule K.",
    location: "Eleme",
    initials: "BK",
  },
  {
    id: 4,
    quote:
      "Reliable and honest. Pickars helps me send stock across PH without any stress.",
    author: "Musa A.",
    location: "Oil Mill",
    initials: "MA",
  },
  {
    id: 5,
    quote:
      "I love how easy it is to book a bike. Makes sending urgent documents so effortless.",
    author: "Tariere P.",
    location: "GRA Phase 2",
    initials: "TP",
  },
  {
    id: 6,
    quote:
      "Safe and dependable. I never worry about fragile items getting damaged when dispatched.",
    author: "Chidubem E.",
    location: "Ada George",
    initials: "CE",
  },
  {
    id: 7,
    quote:
      "Pickars respects delivery schedules better than any other local dispatch service in PH.",
    author: "Sira M.",
    location: "Trans-Amadi",
    initials: "SM",
  },
  {
    id: 8,
    quote:
      "Great rates for small business owners. Highly recommended to deliver daily packages.",
    author: "Ibrahim S.",
    location: "Mile 1, Diobu",
    initials: "IS",
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

  // Default to index 2 which corresponds to Baridule K. from Eleme (BK)
  const [currentIndex, setCurrentIndex] = useState(2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        quoteMarkRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(quoteMarkRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
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
    gsap.to(btn, { y: -3, scale: 1.05, duration: 0.25, ease: "power2.out" });
  };
  const handleBtnLeave = (btn: HTMLButtonElement | null) => {
    if (!btn) return;
    gsap.to(btn, { y: 0, scale: 1, duration: 0.35, ease: "power3.out" });
  };

  const current = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FFF5F5] py-20 md:py-28 px-4 sm:px-6 font-sans flex justify-center items-center overflow-hidden"
    >
      {/* Main Container Card */}
      <div
        ref={containerRef}
        onMouseEnter={pauseAutoAdvance}
        onMouseLeave={resumeAutoAdvance}
        className="w-full max-w-5xl bg-white rounded-[2rem] md:rounded-[2.5rem] border border-red-100 p-6 sm:p-10 md:p-16 flex flex-col justify-between min-h-[520px] relative overflow-hidden "
      >
        {/* Decorative oversized quote mark */}
        <span
          ref={quoteMarkRef}
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-6 md:right-14 text-[10rem] md:text-[16rem] font-black leading-none text-red-600/[0.04] select-none"
        >
          "
        </span>

        {/* Top Header & Control Bar */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-red-50 pb-8">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-widest text-red-400 uppercase">
              0{currentIndex + 1} / 0{testimonials.length} — Real Stories
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
              Trusted across Port Harcourt
            </h3>
          </div>

          {/* Navigation Controls & Timer Circle */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              ref={prevBtnRef}
              onClick={handlePrev}
              onMouseEnter={() => handleBtnEnter(prevBtnRef.current)}
              onMouseLeave={() => handleBtnLeave(prevBtnRef.current)}
              className="w-12 h-12 rounded-full border border-red-100 flex items-center justify-center text-gray-700 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer will-change-transform"
              aria-label="Previous Testimonial"
            >
              <svg
                className="w-5 h-5 stroke-current stroke-2 fill-none"
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
              className="w-12 h-12 rounded-full border border-red-100 flex items-center justify-center text-gray-700 hover:bg-red-50 hover:border-red-200 transition-colors relative cursor-pointer will-change-transform"
              aria-label="Next Testimonial"
            >
              <svg
                className="absolute inset-0 w-12 h-12 -rotate-90"
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
                className="w-5 h-5 stroke-current stroke-2 fill-none relative z-10"
                viewBox="0 0 24 24"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dynamic Testimonial Quote Content Area */}
        <div className="relative py-10 md:py-14 flex flex-col justify-center min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-gray-900 leading-[1.25]">
                "{current.quote}"
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-red-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + "-author"}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 p-4 rounded-2xl bg-[#FFF5F5] text-[#ff0000] font-extrabold text-base flex items-center justify-center ">
                  {current.initials}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-gray-900">
                    {current.author}
                  </h4>
                  <span className="inline-block text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100">
                    {current.location}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs sm:text-sm font-medium text-gray-500">
                    Port Harcourt
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Jump Pagination Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 bg-[#FF0000]"
                    : "w-2 bg-red-100 hover:bg-red-200"
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
