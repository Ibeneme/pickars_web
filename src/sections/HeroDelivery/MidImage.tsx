import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    id: "feat-1",
    number: "01",
    title: "Instant Dispatch",
    description:
      "Request a rider in seconds and get matched with the closest available rider near you. No phone calls, no waiting around — nearby riders get notified instantly and head straight to your pickup point so your package is on the move before you know it.",
  },
  {
    id: "feat-2",
    number: "02",
    title: "Live Tracking",
    description:
      "Watch your package move across Port Harcourt in real time. Get accurate ETAs, live map updates, and status alerts every step of the way — from pickup to final delivery — so you always know exactly where your package is.",
  },
  {
    id: "feat-3",
    number: "03",
    title: "Secure Handling",
    description:
      "Every delivery is handled with care by verified riders. From fragile items to important documents, we ensure safe handling, proper packaging checks, and full delivery confirmation so you can send with complete peace of mind.",
  },
  {
    id: "feat-4",
    number: "04",
    title: "Easy Booking",
    description:
      "Book a dispatch in just a few taps. Enter your pickup and drop-off locations, choose your package type, and confirm — no long forms, no complicated steps. Simple, fast, and built for everyday sending across the city.",
  },
  {
    id: "feat-5",
    number: "05",
    title: "Fair for Riders",
    description:
      "Transparent earnings, clear routes, and a clean app experience designed for riders who hustle across Port Harcourt. See your jobs, track your income, and focus on delivering — without the usual stress of unclear payments or confusing routes.",
  },
];

export default function PickarsFeaturesSection(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerChildren = headerRef.current?.children;
      if (headerChildren) {
        gsap.fromTo(
          headerChildren,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const cards = cardRefs.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven progression (Desktop only)
  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: "top 20%",
        end: `+=${features.length * 45}%`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const nextIndex = Math.min(
            features.length - 1,
            Math.floor(progress * features.length)
          );
          setActiveIndex(nextIndex);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Content reveal when active card changes
  useEffect(() => {
    const content = contentRefs.current[activeIndex];
    if (!content) return;

    const elements = content.querySelectorAll(
      "[data-feat-num], [data-feat-title], [data-feat-desc], [data-feat-footer]"
    );

    gsap.fromTo(
      elements,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        overwrite: true,
      }
    );
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 lg:py-28 px-4 sm:px-6 bg-[#fff] overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-10 md:mb-14 lg:mb-16 will-change-transform"
        >
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <span className="text-xs md:text-sm font-bold tracking-widest text-[#FF0000] uppercase">
              Features
            </span>
            <div className="w-10 md:w-12 h-[2px] bg-[#FF0000]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black max-w-2xl leading-[1.15]">
            Everything you need to move packages faster
          </h2>
        </div>

        {/* Cards Container */}
        <div
          ref={cardsContainerRef}
          className="w-full flex flex-col lg:flex-row gap-3 md:gap-5 items-stretch will-change-transform py-4"
        >
          {features.map((feature, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={feature.id}
                ref={(el: any) => (cardRefs.current[idx] = el)}
                onClick={() => setActiveIndex(idx)}
                style={{
                  backgroundColor: isActive ? "#000000" : "#FFF5F5",
                  color: isActive ? "#FFFFFF" : "#000000",
                }}
                className={`
                  transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  rounded-2xl md:rounded-[32px] transform-gpu
                  cursor-pointer select-none relative overflow-hidden 
                  ${
                    isActive
                      ? "lg:w-[54%] min-h-0 lg:min-h-[480px] p-6 sm:p-8 md:p-10 -rotate-1 sm:-rotate-2 lg:-rotate-1 -translate-y-2 lg:-translate-y-3 scale-[1.02] z-20 shadow-2xl shadow-black/20 border-transparent"
                      : "lg:w-[11.5%] min-h-0 lg:min-h-[480px] p-5 sm:p-6 md:p-8 hover:bg-white rotate-0 translate-y-0 scale-100 z-10 shadow-none"
                  }
                `}
              >
                {/* Active state */}
                {isActive ? (
                  <div
                    ref={(el: any) => (contentRefs.current[idx] = el)}
                    className="flex flex-col h-full justify-between z-10 relative"
                  >
                    <div className="flex items-start justify-between w-full">
                      <span
                        data-feat-num
                        className="text-xl sm:text-2xl font-bold tracking-tight text-white/40"
                      >
                        {feature.number}
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#FF0000] text-white">
                        Feature
                      </span>
                    </div>

                    <div className="my-4 sm:my-6 lg:my-auto py-2 sm:py-4 lg:py-6">
                      <h3
                        data-feat-title
                        className="text-2xl sm:text-3xl md:text-4xl text-[#fff] font-extrabold tracking-tight mb-3 sm:mb-4 leading-snug"
                      >
                        {feature.title}
                      </h3>
                      <p
                        data-feat-desc
                        className="text-white/85 text-base sm:text-lg leading-relaxed font-normal max-w-2xl"
                      >
                        {feature.description}
                      </p>
                    </div>

                    <div
                      data-feat-footer
                      className="pt-4 flex items-center justify-between border-t border-white/15"
                    >
                      <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/50">
                        Pickars
                      </span>
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FF0000] flex items-center justify-center text-white shrink-0">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 -rotate-45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Inactive state */
                  <>
                    {/* Mobile / tablet */}
                    <div className="flex lg:hidden items-center gap-4 w-full">
                      <span className="text-2xl sm:text-3xl font-bold tracking-tight text-red-300 shrink-0 w-10">
                        {feature.number}
                      </span>
                      <h3 className="flex-1 text-base sm:text-lg font-bold tracking-tight text-black leading-snug">
                        {feature.title}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#FF0000] shrink-0">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Desktop */}
                    <div className="hidden lg:flex flex-col items-center justify-between h-full py-2 z-10">
                      <span className="text-5xl font-extrabold tracking-tight text-red-200">
                        {feature.number}
                      </span>

                      <div className="my-auto" />

                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#FF0000]">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}