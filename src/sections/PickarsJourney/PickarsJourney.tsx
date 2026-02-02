import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Note: Replace these imports with your actual asset paths
import Founding from "../../assets/images/story/dev.jpg";
import Growth from "../../assets/images/story/timer.jpg";
import Excellence from "../../assets/images/story/rider.jpg";
import Future from "../../assets/images/story/earth.jpg";

const pickarsJourney = [
  {
    id: "01",
    phase: "Founding",
    title: "Built from Scratch",
    description:
      "Pickars began with our founder coding the initial platform. A laptop, a vision, and the determination to solve frustration.",
    image: Founding,
  },
  {
    id: "02",
    phase: "Growth",
    title: "Scaling Our Impact",
    description:
      "Expansion became our focus. We grew our network of verified riders and urban presence through strategic local partnerships.",
    image: Growth,
  },
  {
    id: "03",
    phase: "Excellence",
    title: "Refining the Experience",
    description:
      "We prioritized operational excellence—enhancing rider training and optimizing real-time tracking for absolute reliability.",
    image: Excellence,
  },
  {
    id: "04",
    phase: "Innovation",
    title: "Pioneering Tomorrow",
    description:
      "Moving forward with AI-driven route optimization and expansion into new verticals to remain the leader in delivery tech.",
    image: Future,
  },
];

const PickarsJourney: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Progressive Scroll Tracking
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <section className="bg-white py-24 font-['Lufga'] md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-3"
            >
              <span className="h-[1px] w-8 bg-red-600" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-600">
                The Evolution
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-black tracking-tighter text-[#121212] md:text-7xl"
            >
              Our Story <span className="text-gray-300">In Motion.</span>
            </motion.h2>
          </div>

          {/* Nav Controls */}
          <div className="flex gap-3">
            <NavButton
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              icon={<FiChevronLeft size={24} />}
            />
            <NavButton
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              icon={<FiChevronRight size={24} />}
            />
          </div>
        </div>

        {/* Story Slider */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="no-scrollbar flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory lg:gap-10"
          >
            {pickarsJourney.map((stage) => (
              <motion.div
                key={stage.id}
                className="relative min-w-[85vw] snap-start first:pl-2 md:min-w-[480px]"
              >
                {/* Large Background ID */}
                <div className="absolute -top-10 left-4 z-0 opacity-[0.03] text-[12rem] font-black leading-none pointer-events-none">
                  {stage.id}
                </div>

                <div className="group relative z-10 flex h-full flex-col overflow-hidden rounded-[40px] border border-gray-100 bg-white p-4 transition-all duration-500 hover:border-red-100 hover:shadow-[0_20px_50px_rgba(239,68,68,0.08)]">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px]">
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6 pt-10">
                    <div className="mb-4 inline-flex w-fit rounded-full border border-red-100 bg-red-50/50 px-5 py-1 text-[10px] font-black uppercase tracking-widest text-red-600">
                      Phase {stage.id}: {stage.phase}
                    </div>
                    <h3 className="mb-4 text-3xl font-black leading-tight text-[#121212]">
                      {stage.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-500">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Last Spacer */}
            <div className="min-w-[5vw] flex-shrink-0" />
          </div>

          {/* Visual Progress Bar */}
          <div className="relative mx-auto mt-4 h-1 w-full max-w-7xl overflow-hidden rounded-full bg-gray-100">
            <motion.div
              style={{ scaleX }}
              className="absolute inset-0 origin-left bg-red-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component for Navigation Buttons to keep code clean
const NavButton = ({
  onClick,
  disabled,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
      disabled
        ? "border-gray-100 text-gray-200"
        : "border-gray-900 text-gray-900 hover:bg-red-600 hover:border-red-600 hover:text-white active:scale-95"
    }`}
  >
    {icon}
  </button>
);

export default PickarsJourney;
