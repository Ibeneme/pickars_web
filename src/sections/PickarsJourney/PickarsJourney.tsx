import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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

  // Function to handle the actual scrolling
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Check scroll position to hide/show arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <section className="bg-[#fdfdfd] py-24 font-['Lufga'] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header with Integrated Navigation Arrows */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-black uppercase tracking-[0.4em] text-red-600"
            >
              The Evolution
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mt-4 text-5xl font-black tracking-tighter text-[#121212] md:text-7xl"
            >
              Our Story <span className="text-gray-300">In Motion.</span>
            </motion.h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all ${
                canScrollLeft
                  ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  : "border-gray-200 text-gray-200 cursor-not-allowed"
              }`}
            >
              <FiChevronLeft size={28} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all ${
                canScrollRight
                  ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  : "border-gray-200 text-gray-200 cursor-not-allowed"
              }`}
            >
              <FiChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* Scrollable Container (Scrollbar hidden via CSS class) */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="no-scrollbar flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory transition-all"
        >
          {pickarsJourney.map((stage) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative min-w-[380px] md:min-w-[440px] snap-start"
            >
              <span className="absolute -top-12 left-6 z-0 text-[10rem] font-black text-gray-100/60 select-none">
                {stage.id}
              </span>

              <div className="group relative z-10 overflow-hidden rounded-[48px] border border-gray-100 bg-white p-4 shadow-xl shadow-gray-200/30 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10">
                <div className="relative h-72 w-full overflow-hidden rounded-[38px]">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>

                <div className="p-2 py-10">
                  <div className="mb-4 inline-block rounded-xl bg-red-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-red-600">
                    {stage.phase}
                  </div>
                  <h3 className="mb-3 text-2xl font-black tracking-tight text-[#121212]">
                    {stage.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {stage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Invisible spacer to allow full scroll of last item */}
          <div className="min-w-[100px] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default PickarsJourney;
