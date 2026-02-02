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
/* Stat Card */
/* ----------------------------- */

const StatCard = ({ icon, label, value, desc, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -10 }}
    className="relative group bg-[#fafafa] p-10 rounded-[3rem] border border-gray-100 overflow-hidden"
  >
    {/* Glow Blob */}
    <div className="absolute -right-10 -top-10 h-32 w-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />

    <div className="relative z-10">
      <div className="mb-14 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
        {icon}
      </div>

      <div className="space-y-2">
        <h3 className="text-6xl font-black text-[#121212] tracking-tighter">
          {value}
        </h3>

        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#121212]">
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
  <section className="bg-white py-32 md:py-48 font-['Lufga']">
    <div className="mx-auto max-w-7xl px-6">
      {/* Header */}
      <div className="grid lg:grid-cols-12 gap-16 items-start mb-24">
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-red-200 text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-8"
          >
            Logistics Excellence
          </motion.span>

          <h2 className="text-6xl md:text-8xl font-black text-[#121212] tracking-tighter leading-[0.85]">
            We move <span className="text-gray-300">faster</span> <br />
            than the city <span className="text-red-600">breathes.</span>
          </h2>
        </div>

        <div className="lg:col-span-5 lg:pt-12">
          <p className="text-xl md:text-2xl font-bold text-gray-500 leading-snug">
            Built for the hustlers of Port Harcourt. We’ve optimized every
            street corner to ensure your packages never see a red light.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <div className="bg-white">
      <TrustStatsSection />

      <section
        className="
    relative overflow-hidden 
    bg-[#ff0000] 
    py-20 md:py-40 
    font-['Lufga']
    mx-4 md:mx-12 rounded-[4rem]
    md:rounded-[7rem] mb-16
    shadow-2xl
  "
      >
        {/* Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
        linear-gradient(#fff 1px, transparent 1px),
        linear-gradient(90deg, #fff 1px, transparent 1px)
      `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Animated Mesh */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter">
                Get Your <br />
                <span className="text-white/30">Packages</span> <br />
                Moving.
              </h2>

              <div className="mt-12 space-y-6">
                <p className="text-2xl md:text-3xl font-bold max-w-md">
                  Experience the fastest dispatch network in Port Harcourt.
                </p>

                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-white" />
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
                    Web booking coming soon
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="rounded-[3rem] bg-white p-10 md:p-14 shadow-[0_50px_100px_rgba(0,0,0,0.3)]">
                <div className="flex justify-between items-start mb-12">
                  <h3 className="text-4xl font-black text-[#121212]">
                    Request <br /> Delivery
                  </h3>

                  <span className="bg-red-50 text-red-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-red-100">
                    App Live
                  </span>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <input
                    disabled
                    placeholder="Pickup point"
                    className="w-full bg-gray-50 rounded-2xl py-6 pl-14 pr-6 font-bold text-gray-400 outline-none"
                  />

                  <input
                    disabled
                    placeholder="Destination"
                    className="w-full bg-gray-50 rounded-2xl py-6 pl-14 pr-6 font-bold text-gray-400 outline-none"
                  />
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-10 w-full bg-[#121212] text-white py-6 rounded-2xl text-xl font-black hover:bg-black transition-all"
                >
                  Check Pricing
                </motion.button>

                <p className="mt-8 text-center text-xs font-bold text-gray-400">
                  Web booking is restricted to corporate accounts. <br />
                  <span className="text-red-600">
                    Download the mobile app to book instantly.
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BACKGROUND TEXT */}
        <motion.div
          style={{ x: backgroundTextX }}
          className="absolute -bottom-10 left-0 text-[20rem] font-black text-white/[0.04] whitespace-nowrap select-none pointer-events-none"
        >
          PORT HARCOURT DISPATCH
        </motion.div>
      </section>
    </div>
  );
};

export default FinalBookingSection;
