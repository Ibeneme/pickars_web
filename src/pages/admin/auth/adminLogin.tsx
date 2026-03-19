import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  FiMail,
  FiShield,
  FiArrowRight,
  FiRefreshCw,
  FiLock,
  FiArrowLeft,
  FiAlertCircle,
} from "react-icons/fi";
import type { AppDispatch, RootState } from "../../../api/store";
import {
  requestAdminOtp,
  verifyAdminOtp,
  clearAdminError,
} from "../../../api/slices/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, otpSent } = useSelector(
    (state: RootState) => state.admin
  );

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1, maximum-scale=1";
    document.getElementsByTagName("head")[0].appendChild(meta);

    if (otpSent) setStep(2);

    return () => {
      meta.content = "width=device-width, initial-scale=1";
    };
  }, [otpSent]);

  // Resend Timer Logic
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // STEP 1: Request OTP
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearAdminError());

    const result = await dispatch(requestAdminOtp(email));
    if (requestAdminOtp.fulfilled.match(result)) {
      setStep(2);
      setTimer(59);
    }
  };
  const navigate = useNavigate();
  // STEP 2: Verify OTP
  const handleFinalVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearAdminError());

    const result = await dispatch(verifyAdminOtp({ email, otp }));

    if (verifyAdminOtp.fulfilled.match(result)) {
      console.log(
        "%c--- AUTHENTICATION SUCCESS ---",
        "color: #FF0000; font-weight: bold;"
      );
      console.log("Admin:", result.payload.admin);

      // 3. Navigate to the protected dashboard
      // We use { replace: true } so they can't go "back" to the login screen
      navigate("/app/admin/dashboard", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-['Lufga',sans-serif] overflow-hidden">
      {/* LEFT VISUAL PANEL */}
      <div className="hidden md:flex md:w-1/2 bg-[#0A0A0A] p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF0000] rounded-full blur-[140px] opacity-20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#FF0000] rounded-full blur-[100px] opacity-10" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg shadow-red-600/40">
              <FiShield className="text-white" size={20} />
            </div>
            <span className="text-white font-black tracking-[0.3em] text-xs">
              PICKARS ADMIN
            </span>
          </div>
          <h1 className="text-white text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter">
            Secure <br />
            <span className="text-gray-500">Access.</span>
          </h1>
        </motion.div>

        <div className="relative z-10 text-gray-500 text-sm font-bold">
          Proprietary access for Pickars administrators.
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-20 bg-white relative">
        <div className="w-full max-w-md">
          {/* Global Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-[#FF0000] text-[#FF0000] flex items-center gap-3 rounded-r-xl font-bold text-sm"
              >
                <FiAlertCircle className="shrink-0" size={18} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <header className="mb-12">
                  <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tighter mb-3">
                    Admin Access
                  </h2>
                  <p className="text-gray-400 font-bold">
                    Verification code will be sent to your email.
                  </p>
                </header>

                <form onSubmit={handleEmailSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <FiMail
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF0000] transition-colors"
                        size={20}
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ fontSize: "16px" }} // Mobile zoom fix
                        className="w-full py-6 pl-16 pr-6 bg-gray-50 border-2 border-transparent focus:border-red-500/10 focus:bg-white rounded-[24px] outline-none transition-all font-bold text-[#0A0A0A] shadow-sm"
                        placeholder="admin@pickars.com"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={loading}
                    className="w-full bg-[#0A0A0A] text-white py-6 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-2xl hover:bg-black transition-all"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Request Code <FiArrowRight />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-400 hover:text-[#FF0000] font-bold text-xs uppercase tracking-widest mb-8 transition-colors"
                >
                  <FiArrowLeft /> Edit Email
                </button>

                <header className="mb-10">
                  <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tighter mb-3">
                    Verify Identity
                  </h2>
                  <p className="text-gray-400 font-bold">
                    Enter code sent to{" "}
                    <span className="text-[#FF0000]">{email}</span>
                  </p>
                </header>

                <form onSubmit={handleFinalVerify} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase ml-1">
                      6-Digit Code
                    </label>
                    <div className="relative group">
                      <FiLock
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF0000] transition-colors"
                        size={20}
                      />
                      <input
                        autoFocus
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ fontSize: "16px" }} // Mobile zoom fix
                        className="w-full py-6 pl-16 pr-6 bg-gray-50 border-2 border-transparent focus:border-red-500/10 focus:bg-white rounded-[24px] outline-none transition-all font-bold text-[#FF0000] shadow-sm tracking-[0.4em] text-2xl"
                        placeholder="000000"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={loading}
                      className="w-full bg-[#FF0000] text-white py-6 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-red-500/30 transition-all"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Confirm Access"
                      )}
                    </motion.button>

                    <button
                      type="button"
                      disabled={timer > 0 || loading}
                      onClick={handleEmailSubmit}
                      className={`w-full text-center text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${
                        timer > 0
                          ? "text-gray-300"
                          : "text-[#FF0000] hover:underline"
                      }`}
                    >
                      <FiRefreshCw
                        className={timer > 0 ? "" : "animate-spin-slow"}
                      />
                      {timer > 0 ? `Resend in ${timer}s` : "Resend Access Code"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
