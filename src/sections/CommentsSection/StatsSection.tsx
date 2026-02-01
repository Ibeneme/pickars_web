import { motion } from "framer-motion";
import { FaGlobeAfrica, FaBolt, FaMotorcycle, FaStar } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      label: "Deliveries Monthly",
      value: "500+",
      icon: <FaGlobeAfrica className="text-blue-500" />,
      description: "Packages moved safely across major city hubs.",
      color: "border-blue-100 bg-blue-50/30",
    },
    {
      id: 2,
      label: "Average Time",
      value: "45min",
      icon: <FaBolt className="text-amber-500" />,
      description: "From pickup to your doorstep, we value your time.",
      color: "border-amber-100 bg-amber-50/30",
    },
    {
      id: 3,
      label: "Active Riders",
      value: "15+",
      icon: <FaMotorcycle className="text-red-600" />,
      description: "Vetted professionals ready to move on your command.",
      color: "border-red-100 bg-red-50/30",
    },
    {
      id: 4,
      label: "Customer Rating",
      value: "4.9/5",
      icon: <FaStar className="text-yellow-500" />,
      description: "The most trusted delivery partner for local businesses.",
      color: "border-yellow-100 bg-yellow-50/30",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-black tracking-tighter md:text-5xl">
            Our Performance in <span className="text-red-600">Numbers.</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl font-medium">
            We don't just deliver packages; we deliver reliability. Here is how
            we’ve been redefining logistics over the past months.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden rounded-[32px] border ${stat.color} p-8 backdrop-blur-sm transition-shadow hover:shadow-2xl hover:shadow-black/5`}
            >
              {/* Icon Circle */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                {stat.icon}
              </div>

              {/* Data */}
              <div className="space-y-1">
                <h3 className="text-4xl font-black tracking-tighter text-[#121212]">
                  {stat.value}
                </h3>
                <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                  {stat.label}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  {stat.description}
                </p>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
