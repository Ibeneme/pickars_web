import { motion } from "framer-motion";
import bgImage from "../../assets/images/story/rider.jpg";
import {
  FaBullseye,
  FaLightbulb,
  FaShieldAlt,
  FaUsers,
  FaHeart,
  FaRocket,
} from "react-icons/fa";

const CompanyComponent = () => {
  const values = [
    {
      icon: <FaShieldAlt />,
      title: "Reliability",
      text: "Unwavering commitment to consistent, dependable service from pickup to drop-off.",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      text: "Integrating cutting-edge tech to optimize complex logistics and user experience.",
    },
    {
      icon: <FaRocket />,
      title: "Integrity",
      text: "Operating with total transparency and strong ethical principles in every interaction.",
    },
    {
      icon: <FaHeart />,
      title: "Customer-First",
      text: "Your satisfaction is the heartbeat of our operations. We listen, adapt, and deliver.",
    },
    {
      icon: <FaUsers />,
      title: "Empowerment",
      text: "Providing our riders with tools, fair pay, and growth opportunities to thrive.",
    },
    {
      icon: <FaBullseye />,
      title: "Community",
      text: "Fostering an interconnected network that drives collective economic growth.",
    },
  ];

  return (
    <main className="bg-[#0c0c0c] font-['Lufga'] text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pt-32 pb-20">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0c0c0c]/80 via-transparent to-[#0c0c0c]" />

        <div className="relative z-20 mx-auto max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.5em] text-red-600"
          >
            The Pickars Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-5xl font-black leading-tight tracking-tighter md:text-8xl"
          >
            Logistics for the <br />
            <span className="text-red-600">Modern World.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
          >
            Pickars makes sending and receiving packages in Nigeria effortless.
            We connect you with trusted riders to ensure your items reach their
            destination safely, focusing on speed and absolute dependability.
          </motion.p>
        </div>
      </section>

      {/* --- MISSION & VISION (Split Cards) --- */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {[
            {
              label: "Our Vision",
              text: "To be the undisputed leader in logistics tech, empowering businesses with unparalleled delivery solutions that accelerate economic growth across Nigeria.",
            },
            {
              label: "Our Mission",
              text: "To deliver excellence through innovation and integrity, building a secure platform that guarantees reliability for every single delivery, every time.",
            },
          ].map((card, i) => (
            <motion.div
              whileHover={{ y: -10 }}
              key={i}
              className="rounded-[40px] border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl"
            >
              <h2 className="mb-6 text-2xl font-black uppercase tracking-widest text-red-600">
                {card.label}
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CORE VALUES GRID --- */}
      <section className="bg-white py-32 text-[#121212] ">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black tracking-tighter md:text-6xl">
              Our Core Values
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-red-600" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((val, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="group rounded-[32px] border border-gray-100 bg-[#f9f9f9] p-8 md:p-10 transition-all hover:bg-white hover:shadow-2xl hover:shadow-red-500/10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6">
                  {val.icon}
                </div>
                <h3 className="mb-4 text-xl font-black">{val.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {val.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CompanyComponent;
