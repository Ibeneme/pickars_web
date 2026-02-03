import { motion, useScroll, useTransform } from "framer-motion";
import { FaShieldAlt, FaClock, FaRoute, FaStar } from "react-icons/fa";

/* ----------------------------- */
/* Types */
/* ----------------------------- */

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  desc: string;
  delay: number;
};

/* ----------------------------- */
/* Stat Card - Refined Padding & Text for Mobile */
/* ----------------------------- */

const StatCard = ({ icon, label, value, desc, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -10 }}
    className="relative group bg-[#fafafa] p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 overflow-hidden"
  >
    <div className="absolute -right-10 -top-10 h-32 w-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />

    <div className="relative z-10">
      <div className="mb-8 md:mb-14 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-white  text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
        {icon}
      </div>

      <div className="space-y-2">
        <h3 className="text-5xl md:text-6xl font-black text-[#121212] tracking-tighter">
          {value}
        </h3>
        <p className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#121212]">
          {label}
        </p>
        <p className="text-sm font-bold text-gray-400 leading-relaxed max-w-[200px]">
          {desc}
        </p>
      </div>
    </div>
  </motion.div>
);

/* ----------------------------- */
/* Trust Stats Section */
/* ----------------------------- */

const TrustStatsSection = () => (
  <section className="bg-white py-20 md:py-48 font-['Lufga']">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start mb-16 md:mb-24">
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-red-200 text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 md:mb-8"
          >
            Logistics Excellence
          </motion.span>

          <h2 className="text-5xl md:text-8xl font-black text-[#121212] tracking-tighter leading-[0.9] md:leading-[0.85]">
            We move <span className="text-gray-300">faster</span> <br />
            than the city <span className="text-red-600">breathes.</span>
          </h2>
        </div>

        <div className="lg:col-span-5 lg:pt-12">
          <p className="text-lg md:text-2xl font-bold text-gray-500 leading-snug">
            Built for the hustlers of Port Harcourt. We’ve optimized every
            street corner to ensure your packages never see a red light.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaRoute size={24} />}
          value="50k+"
          label="Deliveries"
          desc="Successfully landed across Rivers State."
          delay={0.1}
        />
        <StatCard
          icon={<FaClock size={24} />}
          value="12m"
          label="Pickup"
          desc="Our average time to reach your doorstep."
          delay={0.2}
        />
        <StatCard
          icon={<FaShieldAlt size={24} />}
          value="100%"
          label="Security"
          desc="Military-grade handling for every item."
          delay={0.3}
        />
        <StatCard
          icon={<FaStar size={24} />}
          value="4.9"
          label="Rating"
          desc="The highest rated dispatch in the city."
          delay={0.4}
        />
      </div>
    </div>
  </section>
);

/* ----------------------------- */
/* Final Booking Section */
/* ----------------------------- */

const FinalBookingSection = () => {
  const { scrollYProgress } = useScroll();
  const backgroundTextX = useTransform(scrollYProgress, [0.8, 1], [100, -100]);

  return (
    <div className="bg-white pb-10 md:pb-20">
      <TrustStatsSection />

      <section className="relative overflow-hidden bg-[#ff0000] font-['Lufga'] max-w-7xl mx-auto rounded-[0rem] md:rounded-[3rem]  py-16 md:py-24 px-6 md:px-12">
        {/* Pattern Backgrounds */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* LEFT SIDE - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white text-left"
            >
              <h2 className="text-6xl md:text-8xl font-black leading-[0.9] md:leading-[0.85] tracking-tighter">
                Get Your <br />
                <span className="text-white/30">Packages</span> <br />
                Moving.
              </h2>

              <div className="mt-8 md:mt-12 space-y-6">
                <p className="text-xl md:text-2xl font-bold max-w-md">
                  Experience the fastest dispatch network in Port Harcourt.
                </p>

                <div className="flex items-center justify-start gap-4">
                  <div className="hidden md:block h-[2px] w-12 bg-white" />
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/70">
                    Web booking coming soon
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - Request Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="rounded-[2.5rem] md:rounded-[3.5rem] bg-white p-8 md:p-14 ">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mb-10 md:mb-12 text-center sm:text-left">
                  <h3 className="text-3xl md:text-4xl font-black text-[#121212]">
                    Request Delivery
                  </h3>
                  <span className="bg-red-50 text-red-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-red-100 whitespace-nowrap">
                    App Live
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-red-600" />
                    <input
                      disabled
                      placeholder="Pickup point"
                      className="w-full bg-gray-50 rounded-2xl py-5 md:py-6 pl-12 md:pl-14 pr-6 font-bold text-gray-400 outline-none border border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gray-300" />
                    <input
                      disabled
                      placeholder="Destination"
                      className="w-full bg-gray-50 rounded-2xl py-5 md:py-6 pl-12 md:pl-14 pr-6 font-bold text-gray-400 outline-none border border-transparent"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 md:mt-10 w-full bg-[#121212] text-white py-5 md:py-6 rounded-2xl text-lg md:text-xl font-black hover:bg-black transition-all "
                >
                  Download our App
                </motion.button>

                <p className="mt-8 text-center text-[10px] md:text-xs font-bold text-gray-400 leading-relaxed">
                  Web booking is restricted to corporate accounts.{" "}
                  <br className="hidden md:block" />
                  <span className="text-red-600">
                    Download the mobile app to book instantly.
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BACKGROUND TEXT - Responsive sizing */}
        <motion.div
          style={{ x: backgroundTextX }}
          className="absolute -bottom-10 md:-bottom-20 left-0 text-[10rem] md:text-[20rem] font-black text-white/[0.04] whitespace-nowrap select-none pointer-events-none"
        >
          PORT HARCOURT DISPATCH
        </motion.div>
      </section>
    </div>
  );
};

export default FinalBookingSection;
