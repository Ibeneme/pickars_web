"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import axios from "axios";
import { trackInstance } from "@/api/axiosInstance";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const modalVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const DeleteAccountPage: React.FC = () => {
  const [countryCode, setCountryCode] = useState("+234");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Clean raw input: strip non-digit characters
  const getCleanedNumber = (input: string) => {
    return input.replace(/\D/g, "");
  };

  // Helper to format phone numbers for both formats (without zero vs with zero)
  const preparePhoneVariants = (rawNumber: string, prefix: string) => {
    let clean = getCleanedNumber(rawNumber);

    // If user typed national prefix with 234, remove it first to normalize
    if (clean.startsWith("234")) {
      clean = clean.slice(3);
    }

    // Strip leading zero if present
    const withoutZero = clean.replace(/^0+/, "");
    // Force leading zero
    const withZero = clean.startsWith("0") ? clean : `0${clean}`;

    const cleanPrefix = prefix.replace("+", "");

    return {
      // Primary normalized format (without leading zero) e.g., "8012345678" or "+2348012345678"
      primary: `${cleanPrefix}${withoutZero}`,
      // Secondary fallback format (with leading zero) e.g., "08012345678" or "+23408012345678"
      secondary: `${cleanPrefix}${withZero}`,
      rawWithoutZero: withoutZero,
      rawWithZero: withZero,
    };
  };

  const handleOpenModal = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleaned = getCleanedNumber(phoneNumber);
    if (!cleaned) {
      setErrorMsg("Please enter a valid phone number.");
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    setIsDeleting(true);
    setErrorMsg("");

    const phoneFormats = preparePhoneVariants(phoneNumber, countryCode);

    console.log("--> Attempting account deletion with variants:", phoneFormats);

    try {
      // Send primary request without leading zero (e.g. 2348012345678)
      // and secondary fallback with leading zero (e.g. 23408012345678) or raw formats
      const sendDeleteReq = (num: string) =>
        trackInstance.delete("/auth/delete-account", {
          data: { phoneNumber: num },
        });

      // Try primary formatted request first
      let response;
      try {
        response = await sendDeleteReq(phoneFormats.primary);
      } catch (firstErr) {
        // Fallback 1: Try without prefix (e.g., 8012345678)
        try {
          response = await sendDeleteReq(phoneFormats.rawWithoutZero);
        } catch (secondErr) {
          // Fallback 2: Try with local zero (e.g., 08012345678)
          try {
            response = await sendDeleteReq(phoneFormats.rawWithZero);
          } catch (thirdErr) {
            // Fallback 3: Try formatted with zero (e.g., 23408012345678)
            response = await sendDeleteReq(phoneFormats.secondary);
          }
        }
      }

      console.log("--> Delete response success:", response.data);
      setDeleteSuccess(true);
    } catch (err: unknown) {
      console.error("--> Delete account error:", err);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg(
          "Failed to delete account. Please verify your phone number and try again."
        );
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReset = () => {
    setPhoneNumber("");
    setDeleteSuccess(false);
    setErrorMsg("");
  };

  const displayFormattedPhone = `${countryCode} ${phoneFormatsDisplay(
    phoneNumber
  )}`;

  function phoneFormatsDisplay(num: string) {
    const clean = getCleanedNumber(num).replace(/^234/, "").replace(/^0+/, "");
    return clean;
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#fff] min-h-[100vh] flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="bg-black rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 text-white relative overflow-hidden shadow-2xl"
        >
          {/* Badge */}
          <div
            className="mb-6 px-5 py-2 max-w-[210px] bg-[#FF0000] text-white font-black text-xs uppercase tracking-widest cursor-default select-none -rotate-2"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            Data Safety
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Request Account Deletion
          </h1>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            In compliance with Google Play requirements, you can request the
            permanent deletion of your Pickars account and all associated data.
            Select your country code and enter your registered phone number.
          </p>

          {/* SUCCESS BANNER */}
          {deleteSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-200"
            >
              <div className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-emerald-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="text-xl font-bold text-emerald-400">
                  Account Successfully Deleted
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-emerald-300/90">
                Your account for{" "}
                <span className="font-semibold">{displayFormattedPhone}</span>{" "}
                and all associated ride records, messages, and earnings data
                have been permanently removed.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 inline-flex items-center text-xs font-bold text-emerald-400 underline hover:text-emerald-300"
              >
                Submit another deletion request
              </button>
            </motion.div>
          ) : (
            /* FORM */
            <form onSubmit={handleOpenModal} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-semibold text-zinc-300 mb-2"
                >
                  Registered Phone Number
                </label>

                {/* COUNTRY CODE + PHONE INPUT GROUP */}
                <div className="flex items-center gap-3">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={isDeleting}
                    className="px-4 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-medium focus:outline-none focus:border-[#FF0000] transition-colors text-base cursor-pointer disabled:opacity-50"
                  >
                    <option value="+234">🇳🇬 +234 (Nigeria)</option>
                  </select>

                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="801 234 5678"
                    disabled={isDeleting}
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF0000] transition-colors text-base disabled:opacity-50"
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  Enter number with or without leading zero (e.g. 8012345678 or
                  08012345678).
                </p>
              </div>

              {/* ERROR BANNER */}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-950/80 border border-red-500/50 rounded-2xl text-red-300 text-sm font-medium flex items-start space-x-3"
                >
                  <svg
                    className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{errorMsg}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isDeleting}
                className="w-full py-4 px-8 bg-[#FF0000] hover:bg-red-700 text-white font-bold text-base rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Deleting Account...</span>
                  </>
                ) : (
                  <span>Delete My Account</span>
                )}
              </button>
            </form>
          )}

          <p className="mt-8 text-xs text-zinc-500 text-center">
            Warning: This action is irreversible. All rides, driver messages,
            and personal account info will be erased.
          </p>
        </motion.div>
      </div>

      {/* CONFIRMATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariant}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-white relative"
            >
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-[#FF0000] mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Are you absolutely sure?
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                You are about to permanently delete the account linked to{" "}
                <span className="font-semibold text-white">
                  {displayFormattedPhone}
                </span>
                . This action cannot be undone.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 px-5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="w-full py-3 px-5 bg-[#FF0000] hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Yes, Delete Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DeleteAccountPage;
