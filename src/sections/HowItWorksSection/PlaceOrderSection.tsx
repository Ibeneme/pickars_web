import React from "react";
import { motion, useInView } from "framer-motion";
import redRiderImg from "../../assets/images/driver/image.png";
import riders_head from "../../assets/images/driver/riders_head.png";
import DownloadButtons from "../../components/buttons/DownloadButtons";


const PlaceOrderSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reviews = [
    {
      name: "Tamuno",
      date: "September 7, 2026",
      text: "Getting a dispatch rider has never been this smooth! My pickup was accepted instantly and delivered in record time.",
    },
    {
      name: "Charles",
      date: "September 5, 2026",
      text: "Super fast dispatch booking. Found a reliable rider right from my phone within seconds. Highly recommended!",
    },
    {
      name: "Chinedu",
      date: "September 4, 2026",
      text: "No stress at all. Requesting a rider is straightforward, and tracking my package gives total peace of mind.",
    },
    {
      name: "Amina",
      date: "September 3, 2026",
      text: "Quickest dispatch service around. The rider arrived at my doorstep promptly and handled my items with great care.",
    },
    {
      name: "Tolu",
      date: "September 1, 2026",
      text: "Seamless rider matching. Got my delivery sorted across town without any annoying delays or complications.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden font-['Lufga'] text-gray-900 "
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* ── LEFT DARK CARD ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative bg-[#000] rounded-[32px] sm:rounded-[40px] p-4 sm:p-8 md:p-8 flex flex-col justify-between overflow-hidden min-h-[500px] sm:min-h-[580px]"
          >
            {/* Top Text Content with constrained max-width */}
            <div className="relative z-10 max-w-lg mx-auto w-full">
              <h2 className="mb-5 text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-6xl lg:text-7xl">
                Send your packages asap
              </h2>

              {/* App Store Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
                <DownloadButtons dark={true} alignLeft={true} />
              </div>
            </div>

            {/* Bottom Section with Side-View Moving Rider Animation */}
            <div className="relative z-10 mt-12 w-full md:mb-[-84px] mb-[-36px]">
              <img src={riders_head} alt="pickars" />
            </div>
          </motion.div>

          {/* ── RIGHT IMAGE CARD ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative bg-cover bg-center rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 flex items-center justify-center overflow-hidden min-h-[500px] sm:min-h-[580px]"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${redRiderImg})`,
            }}
          >
            {/* Placeholder container mimicking someone holding a mobile phone showing ratings/reviews with increased tilt */}
            <div className="relative w-full max-w-sm bg-white rounded-[32px] p-5 shadow-2xl border border-gray-200/60 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Fake Mobile App Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                    Ratings
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-black text-gray-900">
                      4.3
                    </span>
                    <div className="flex text-amber-400 text-sm">★★★★★</div>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    (329 reviews)
                  </p>
                </div>
                <div className="w-10 h-10 bg-emerald-50 text-[#ff0000] rounded-full flex items-center justify-center font-bold text-xs">
                  ✓ Pro
                </div>
              </div>

              {/* Scrolling Fake Reviews List Container */}
              <div className="mt-4 h-64 overflow-hidden relative">
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "linear",
                  }}
                  className="space-y-3 absolute w-full"
                >
                  {/* Map twice to create an infinite seamless loop effect */}
                  {[...reviews, ...reviews].map((review, index) => (
                    <div key={index} className="bg-gray-50 p-3.5 rounded-2xl">
                      <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                        <span>{review.name}</span>
                        <span className="text-[10px] text-gray-400 font-normal">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Bottom app mock navigation bar */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex justify-around text-gray-400 text-xs">
                <span className="text-[#ff0000] font-bold">● Reviews</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrderSection;
