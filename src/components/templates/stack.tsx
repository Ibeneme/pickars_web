import appImage from "../../assets/images/dark.png";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PickarsFeatureCard {
  badge: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  bgClass: string;
  textClass: string;
  accentBorderClass: string;
}

export const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en";

// Reusable SVG Icons for App Store, Google Play, and trust elements
export const AppleSvgIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 5.39c.65-.79 1.09-1.89.97-2.99-.96.04-2.13.64-2.82 1.43-.61.69-1.14 1.8-1 2.87 1.08.08 2.19-.52 2.85-1.31z" />
  </svg>
);

export const GooglePlaySvgIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.125 1.125 0 0 1-.61-.996V2.81c0-.41.22-.79.609-.996zM15.208 13.416l2.122 2.122-10.97 6.334 8.848-8.456zM17.33 11.294l2.122 1.226a1.125 1.125 0 0 1 0 1.95l-2.122 1.226-2.122-2.122 2.122-2.28zm-2.122-2.122L6.36 2.816l10.97 6.334-2.122 2.122z" />
  </svg>
);

export const ArrowRightSvg = ({
  className = "w-4 h-4",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

export default function PickarsFeatureStackingScrollSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const pickarsCards: PickarsFeatureCard[] = [
    {
      badge: "Status: Instant Order Match",
      title: "Get a Dispatch Rider Instantly.",
      metric: "< 15s",
      metricLabel: "Average Match Time",
      description:
        "Whether you're a walk-in customer, busy vendor, or growing enterprise, Pickars instantly connects you with the nearest trusted dispatch rider via live GPS so your items start moving immediately.",
      bgClass: "bg-[#FFF5F5]",
      textClass: "text-[#ff0000]",
      accentBorderClass: "",
    },
    {
      badge: "Status: Rider En Route",
      title: "Real-Time Tracking & Live GPS Navigation",
      metric: "100%",
      metricLabel: "Route Visibility",
      description:
        "Track your package or delivery personnel live from pickup to drop-off. Enjoy secure in-app messaging, seamless status updates, and precise delivery ETAs.",
      bgClass: "bg-[#E3D5FF]",
      textClass: "text-[#270A61]",
      accentBorderClass: "",
    },
    {
      badge: "Status: Vendor & Business Scale",
      title: "Bulk Deliveries & Multi-Stop Dispatch",
      metric: "0",
      metricLabel: "Logistics Hassles",
      description:
        "Designed specifically for local vendors and multi-branch businesses. Bundle several drop-offs under one unified dashboard to save time, reduce costs, and maximize rider efficiency.",
      bgClass: "bg-[#000]",
      textClass: "text-[#fff]",
      accentBorderClass: "",
    },
    {
      badge: "Status: Bulletproof Reliability",
      title: "Smart Safeguards & Guaranteed Drop-offs",
      metric: "99.8%",
      metricLabel: "On-Time Success Rate",
      description:
        "Smart automated rerouting bypasses heavy traffic zones instantly, keeping your shipments safe, secure, and delivered precisely on schedule every single time.",
      bgClass: "bg-[#ff0000]",
      textClass: "text-[#FFF0F5]",
      accentBorderClass: "",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length || !stackRef.current) return;

      cards.forEach((card) => {
        gsap.set(card, { transformOrigin: "50% 100%" });
      });

      gsap.set(cards[0], {
        yPercent: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        filter: "brightness(1)",
      });

      cards.slice(1).forEach((card) => {
        gsap.set(card, {
          yPercent: 100,
          scale: 1,
          rotate: 0,
          opacity: 1,
          filter: "brightness(1)",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top top",
          end: `+=${(cards.length - 1) * 100}%`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const segment = i - 1;

        tl.to(
          cards[i - 1],
          {
            scale: 0.9,
            y: -36,
            rotate: -8,
            filter: "brightness(0.75)",
            duration: 1,
            ease: "none",
          },
          segment
        );

        tl.to(
          card,
          {
            yPercent: 0,
            duration: 1,
            ease: "none",
          },
          segment
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-cover bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1590506995460-d0d9892b54da?q=80&w=663&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 z-0 bg-[#00000075]" />

      <div className="relative z-10 w-full flex flex-col items-center px-4 md:px-8 lg:px-12">
        <div className="text-center pt-28 md:pt-36 pb-20 mb-[-100px] w-full max-w-6xl mx-auto">
          {/* <span className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#ff0000] block mb-4">
            www.pickars.com • Instant Logistics Network
          </span> */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] drop-shadow-2xl">
            getting a dispatch rider going.
          </h2>
          <p className="mt-6 text-base sm:text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Built for everyday customers, local vendors, and scaling businesses.
            Request, track, and complete fast deliveries with absolute peace of
            mind.
          </p>

          {/* Quick Action Download Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white text-slate-950 hover:bg-slate-200 transition-all duration-300 font-bold px-7 py-4 rounded-2xl shadow-xl"
            >
              <AppleSvgIcon className="w-6 h-6 text-slate-950" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                  Download on the
                </div>
                <div className="text-sm md:text-base font-extrabold leading-none">
                  App Store
                </div>
              </div>
              <ArrowRightSvg className="w-4 h-4 ml-2  group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#ff0000] text-white0  transition-all duration-300 font-bold px-7 py-4 rounded-2xl shadow-xl"
            >
              <GooglePlaySvgIcon className="w-6 h-6 text-white" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-semibold text-white tracking-wider">
                  Get it on
                </div>
                <div className="text-sm md:text-base text-white font-extrabold leading-none">
                  Google Play
                </div>
              </div>
              <ArrowRightSvg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-white" />
            </a>
          </div>
        </div>

        <div
          ref={stackRef}
          className="relative w-full max-w-5xl xl:max-w-6xl h-screen flex items-center justify-center"
        >
          {pickarsCards.map((card, idx) => (
            <div
              key={idx}
              ref={(el: any) => (cardsRef.current[idx] = el)}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
              style={{ zIndex: idx + 1 }}
            >
              <div
                className={`relative w-full ${card.bgClass} rounded-[2.5rem] p-8 md:p-14 min-h-[460px] md:min-h-[500px] max-h-[82vh] flex flex-col justify-between shadow-2xl overflow-hidden`}
              >
                <div className="flex items-center justify-between pb-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-extrabold uppercase tracking-wider ${card.textClass}`}
                  >
                    {card.badge}
                  </span>
                  <div className="text-right">
                    <span
                      className={`text-3xl md:text-6xl font-black tracking-tight block ${card.textClass}`}
                    >
                      {card.metric}
                    </span>
                    <span
                      className={`text-xs md:text-sm font-semibold opacity-80 uppercase tracking-wider block ${card.textClass}`}
                    >
                      {card.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="my-6">
                  <h3
                    className={`text-4xl md:text-8xl font-extrabold tracking-tight leading-tight ${card.textClass}`}
                  >
                    {card.title}
                  </h3>
                </div>

                <div className="pt-2">
                  <p
                    className={`text-base md:text-xl font-medium leading-relaxed max-w-3xl opacity-90 ${card.textClass}`}
                  >
                    {card.description}
                  </p>
                </div>

                {appImage && (
                  <img
                    src={appImage}
                    alt="Pickars App Logo"
                    className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 md:w-16 md:h-16 object-contain pointer-events-none opacity-80"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
