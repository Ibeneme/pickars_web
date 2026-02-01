import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBox,
  FiUser,
  FiMail,
  FiHash,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

const LostItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    itemDescription: "",
    pickupDeliveryCode: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API Call
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      itemDescription: "",
      pickupDeliveryCode: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[180px] font-['Lufga'] py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <header className="mb-16 text-center">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600 mb-4 block underline decoration-2 underline-offset-8">
            Safety & Security
          </span>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-[#121212] mb-6">
            Lost <span className="text-gray-300">Something?</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-xl mx-auto leading-relaxed">
            Don't worry, we're here to help. Provide the details below and our
            recovery team will begin tracking your item immediately.
          </p>
        </header>

        <div className="bg-white border border-gray-100 rounded-[50px] p-8 md:p-16 shadow-2xl shadow-gray-200/50">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            onSubmit={handleSubmit}
          >
            {/* Name Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400">
                <FiUser className="text-red-600" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 outline-none focus:ring-4 focus:ring-red-600/5 transition-all text-lg font-medium"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400">
                <FiMail className="text-red-600" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 outline-none focus:ring-4 focus:ring-red-600/5 transition-all text-lg font-medium"
              />
            </div>

            {/* Delivery Code Field */}
            <div className="md:col-span-2 space-y-3">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400">
                <FiHash className="text-red-600" /> Delivery Tracking Code
              </label>
              <input
                type="text"
                name="pickupDeliveryCode"
                value={formData.pickupDeliveryCode}
                onChange={handleChange}
                placeholder="e.g. PK-882-X9"
                className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 outline-none focus:ring-4 focus:ring-red-600/5 transition-all text-lg font-medium font-mono"
              />
            </div>

            {/* Description Field */}
            <div className="md:col-span-2 space-y-3">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400">
                <FiBox className="text-red-600" /> Item Description
              </label>
              <textarea
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Describe the item (color, brand, size, etc.)"
                className="w-full bg-gray-50 border-none rounded-3xl py-5 px-6 outline-none focus:ring-4 focus:ring-red-600/5 transition-all text-lg font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-[#121212] text-white py-6 rounded-2xl font-black text-xl hover:bg-red-600 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-500 flex items-center justify-center gap-3"
            >
              Submit Recovery Request
            </button>
          </form>
        </div>
      </motion.div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitted(false)}
              className="absolute inset-0 bg-[#121212]/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[50px] p-12 md:p-16 max-w-xl w-full text-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8">
                🥹
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-[#121212] mb-4">
                We're on it.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                Your report has been received. Our support team is currently
                contacting the rider associated with your delivery code. Expect
                a WhatsApp update shortly.
              </p>

              <div className="space-y-4 mb-12">
                <div className="flex items-center gap-4 text-left p-4 bg-gray-50 rounded-2xl">
                  <FiCheckCircle className="text-green-500 text-xl" />
                  <span className="text-sm font-bold">Report Received</span>
                </div>
                <div className="flex items-center gap-4 text-left p-4 bg-gray-50 rounded-2xl">
                  <FiClock className="text-red-600 text-xl animate-pulse" />
                  <span className="text-sm font-bold">
                    Rider Investigation in Progress...
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-[#121212] text-white py-5 rounded-xl font-black transition-all hover:bg-red-600"
              >
                Got it, Thanks
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LostItem;
