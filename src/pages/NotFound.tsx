
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Use your web router hook
import { FiHome, FiArrowLeft, FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-[180px] bg-white flex items-center justify-center p-6 font-['Lufga',sans-serif] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-lg text-center"
      >
        {/* Floating Background Text */}
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-12"
        >
          <div className="absolute top-0 left-1/2 -translate-x-[140%] -rotate-12 bg-orange-500/10 p-4 rounded-3xl z-10 hidden md:block">
            <FiAlertTriangle className="text-[#FF6600]" size={28} />
          </div>
          <h1 className="text-[12rem] md:text-[16rem] font-black text-[#140700] opacity-5 select-none leading-none tracking-[-0.08em]">
            404
          </h1>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="-mt-16 mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black text-[#140700] tracking-tighter mb-5">
            Lost in transit?
          </h2>
          <p className="text-gray-500 text-xl font-medium leading-relaxed max-w-sm mx-auto">
            The page you are looking for doesn't exist or has been moved to a
            new destination.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center px-10 py-5 bg-gray-50 border border-black/5 rounded-2xl text-[#140700] font-black hover:bg-gray-100 transition-all active:scale-95"
          >
            <FiArrowLeft className="mr-3" size={20} /> Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center px-10 py-5 bg-[#140700] rounded-2xl text-white font-black hover:bg-black/90 shadow-xl shadow-black/10 transition-all active:scale-95"
          >
            <FiHome className="mr-3" size={20} /> Return Home
          </button>
        </motion.div>

        {/* Footer Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex items-center justify-center gap-4 opacity-40"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
          <span className="text-[11px] font-black tracking-[0.4em] text-[#140700] uppercase">
            Pickars Concierge
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
