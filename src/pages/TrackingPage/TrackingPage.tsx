import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  FaSearch,
  FaBicycle,
  FaClock,
  FaBoxOpen,
  FaCheckCircle,
  FaUser,
  FaMapMarkerAlt,
  FaHistory,
  FaTimes,
  FaCreditCard,
  FaCheck,
  FaCalendarAlt,
} from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async"; // Imported Helmet
import { getManualRide } from "../../api/slices/manualRideSlice";
import { verifyPayment } from "../../api/slices/paymentSlice";
import type { AppDispatch, RootState } from "../../api/store";

const TRACKING_HISTORY_KEY = "recentTrackingIds";

const TrackingPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { currentRide, loading, error } = useSelector(
    (state: RootState) => state.manualRide || {}
  );

  const {
    checkoutUrl,
    reference,
    isPaid: paymentSuccess,
  } = useSelector((state: RootState) => state.payment || {});

  const [trackingId, setTrackingId] = useState("");
  const [searched, setSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(TRACKING_HISTORY_KEY);
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // Auto-redirect to Paystack when checkout URL is ready
  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  // Handle Paystack Callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("reference") || params.get("trxref");

    if (ref && currentRide?._id) {
      dispatch(
        verifyPayment({
          orderID: currentRide._id,
          reference: ref,
        })
      );
    }
  }, [dispatch, currentRide?._id]);

  // Show success message after payment verification
  useEffect(() => {
    if (paymentSuccess && currentRide) {
      setShowPaymentModal(false);
      dispatch(getManualRide(currentRide._id));
    }
  }, [paymentSuccess, currentRide, dispatch]);

  const saveToHistory = (id: string) => {
    if (!id.trim()) return;
    const updated = [
      id.trim(),
      ...recentSearches.filter((item) => item !== id),
    ].slice(0, 6);
    setRecentSearches(updated);
    localStorage.setItem(TRACKING_HISTORY_KEY, JSON.stringify(updated));
  };

  const handleSearch = async (e?: React.FormEvent, id?: string) => {
    e?.preventDefault();
    const searchId = id || trackingId.trim();
    if (!searchId) return;
    setTrackingId(searchId);
    setSearched(true);
    await dispatch(getManualRide(searchId));
    saveToHistory(searchId);
  };

  const removeFromHistory = (idToRemove: string) => {
    const updated = recentSearches.filter((id) => id !== idToRemove);
    setRecentSearches(updated);
    localStorage.setItem(TRACKING_HISTORY_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem(TRACKING_HISTORY_KEY);
  };

  const getStatus = (ride: any) => {
    if (ride?.cancelRide?.isCancelled)
      return { label: "Cancelled", color: "text-gray-500", bg: "bg-gray-100" };
    if (ride?.endRide?.isEnded)
      return {
        label: "Delivered",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
      };
    if (ride?.startRide?.isStarted)
      return {
        label: "Ride Started",
        color: "text-blue-600",
        bg: "bg-blue-50",
      };
    if (ride?.acceptRide)
      return {
        label: "Rider Assigned",
        color: "text-amber-600",
        bg: "bg-amber-50",
      };
    if (ride?.isAwaiting)
      return {
        label: "Awaiting Rider",
        color: "text-purple-600",
        bg: "bg-purple-50",
      };
    if (ride?.isManual)
      return {
        label: "Manual Booking",
        color: "text-orange-600",
        bg: "bg-orange-50",
      };
    return {
      label: "Order Confirmed",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    };
  };

  const statusInfo = currentRide ? getStatus(currentRide) : null;

  const steps = [
    { label: "Order Confirmed", icon: FaCheckCircle, active: true },
    { label: "Rider Assigned", icon: FaUser, active: currentRide?.acceptRide },
    { label: "Awaiting Rider", icon: FaClock, active: currentRide?.isAwaiting },
    {
      label: "Ride Started",
      icon: FaBicycle,
      active: currentRide?.startRide?.isStarted,
    },
    {
      label: "Delivered",
      icon: FaBoxOpen,
      active: currentRide?.endRide?.isEnded,
    },
  ];

  const isRidePaid = currentRide?.paid?.isPaid === true;

  const formatDate = (dateString?: string) => {
    if (!dateString)
      return new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Lufga'] text-[#121212] pt-[120px]">
      <Helmet>
        <title>
          {currentRide
            ? `Track Order ${currentRide.trackingId} | Pickars`
            : "Live Delivery Tracking | Pickars Logistics"}
        </title>
        <meta
          name="description"
          content="Track your Pickars packages in real-time. Input your courier tracking ID to see your active dispatcher route and delivery status instantly."
        />
        <link rel="canonical" href="https://pickars.com/app/tracking" />
        <meta
          property="og:title"
          content="Real-Time Dispatch Tracking | Pickars Logistics"
        />
        <meta
          property="og:description"
          content="Securely track parcel deliveries and view official invoices instantly."
        />
      </Helmet>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-1 bg-red-600 origin-left"
        style={{ scaleX }}
      />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.5em] text-red-600"
          >
            REAL-TIME LOGISTICS
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-black tracking-tighter"
          >
            Track your <span className="text-red-600">Delivery</span>
          </motion.h1>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Enter your tracking ID for live updates and rider location.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Enter Tracking ID (e.g. RD-938472)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-full rounded-3xl border border-gray-200 bg-white px-8 py-7 text-lg outline-none focus:border-red-600 focus:ring-4 focus:ring-red-100 transition-all duration-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-bold transition-all disabled:opacity-70 flex items-center gap-2"
            >
              {loading ? "Searching..." : <FaSearch className="text-xl" />}
            </button>
          </form>

          {recentSearches.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaHistory />
                  <span>Recent Searches</span>
                </div>
                <button
                  onClick={clearHistory}
                  className="text-xs text-gray-400 hover:text-red-600 transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((id) => (
                  <motion.button
                    key={id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSearch(undefined, id)}
                    className="group flex items-center gap-2 bg-white border border-gray-200 hover:border-red-200 px-5 py-3 rounded-2xl text-sm font-medium text-gray-700 hover:text-red-700 transition-all"
                  >
                    {id}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(id);
                      }}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <FaTimes size={14} />
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {error ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-red-100">
                <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                  <FaSearch className="text-4xl text-red-500" />
                </div>
                <p className="text-red-600 text-3xl font-bold">
                  Ride not found
                </p>
                <p className="text-gray-500 mt-3 max-w-sm mx-auto">
                  Please double-check your tracking ID and try again.
                </p>
              </div>
            ) : currentRide ? (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                  {/* Status Header */}
                  <div className="p-10 border-b bg-gradient-to-br from-gray-50 to-white">
                    <div className="flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
                      <div>
                        <p className="text-sm font-bold text-gray-400 tracking-widest">
                          TRACKING ID
                        </p>
                        <p className="text-4xl font-black tracking-tighter mt-1">
                          {currentRide.trackingId}
                        </p>
                      </div>
                      <div
                        className={`px-10 py-4 rounded-3xl font-bold text-xl flex items-center gap-3 ${statusInfo?.bg} ${statusInfo?.color}`}
                      >
                        {statusInfo?.label}
                      </div>
                    </div>
                  </div>

                  {/* Payment Banner */}
                  {isRidePaid && (
                    <div className="bg-amber-50 border-b border-amber-200 px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                          <FaCreditCard size={22} />
                        </div>
                        <div>
                          <p className="font-semibold text-amber-700">
                            Payment
                          </p>
                          <p className="text-sm text-amber-600">
                            Complete payment by clicking this button
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowPaymentModal(true)}
                        className="bg-[#ff0000] hover:bg-red-700 text-white px-8 py-3.5 rounded-[64px] font-bold flex items-center gap-2 transition-all"
                      >
                        Pay Now • ₦
                        {(currentRide.totalPrice || 0).toLocaleString()}
                      </motion.button>
                    </div>
                  )}

                  {/* Map Section */}
                  <div className="relative h-[480px] w-full overflow-hidden border-b bg-[#f8fafc]">
                    <div className="absolute inset-0 opacity-40">
                      <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <pattern
                            id="grid"
                            width="50"
                            height="50"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 50 0 L 0 0 0 50"
                              fill="none"
                              stroke="#e2e8f0"
                              strokeWidth="1"
                            />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 800 400"
                    >
                      <motion.path
                        d="M 150 280 Q 280 180 420 260 Q 580 140 680 220"
                        fill="none"
                        stroke="#e11d48"
                        strokeWidth="7"
                        strokeDasharray="12 8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.8, ease: "easeOut" }}
                      />
                    </svg>

                    <div className="absolute top-[130px] left-[110px] z-20">
                      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 flex items-center gap-4">
                        <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                          <FaMapMarkerAlt size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400">
                            PICKUP
                          </p>
                          <p className="font-medium text-sm max-w-[200px] line-clamp-1">
                            {currentRide.pickup?.pickupAddress}
                          </p>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        x: [130, 320, 480, 620],
                        y: [260, 160, 230, 110],
                        rotate: [-12, 8, -15, 10],
                      }}
                      transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute z-30"
                    >
                      <div className="relative">
                        <div className="absolute -inset-8 bg-red-500/20 rounded-full animate-ping" />
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-600 to-rose-600 text-white">
                          <FaBicycle size={42} />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{
                        x: [180, 390, 540, 690],
                        y: [300, 200, 270, 150],
                        rotate: [15, -10, 12, -8],
                      }}
                      transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2.5,
                      }}
                      className="absolute z-30"
                    >
                      <div className="relative">
                        <div className="absolute -inset-8 bg-amber-500/20 rounded-full animate-ping" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-600 to-orange-600 text-white">
                          <FaBicycle size={36} />
                        </div>
                      </div>
                    </motion.div>

                    <div className="absolute bottom-20 right-12 z-20">
                      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 flex items-center gap-4">
                        <div>
                          <p className="text-xs font-bold text-gray-400">
                            DROPOFF
                          </p>
                          <p className="font-medium text-sm max-w-[200px] line-clamp-1">
                            {currentRide.deliveryDropoff?.[0]?.deliveryAddress}
                          </p>
                        </div>
                        <div className="w-9 h-9 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                          <FaMapMarkerAlt size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ride Details */}
                  <div className="p-10 grid md:grid-cols-2 gap-12 border-b">
                    <div>
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
                        <FaUser className="text-red-600" /> Customer
                      </h3>
                      <p className="text-3xl font-semibold capitalize">
                        {currentRide.customer?.firstName}{" "}
                        {currentRide.customer?.lastName}
                      </p>
                      <p className="text-gray-600 mt-2 text-lg">
                        {currentRide.customer?.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
                        <FaBoxOpen className="text-red-600" /> Delivery Details
                      </h3>
                      {currentRide.deliveryDropoff?.map(
                        (drop: any, i: number) => (
                          <div key={i} className="mb-8 last:mb-0">
                            <p className="font-medium text-lg">
                              {drop.deliveryAddress}
                            </p>
                            <p className="text-gray-600 mt-1">
                              {drop.receiverName} • {drop.receiverPhoneNumber}
                            </p>
                            {drop.items?.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {drop.items.map((item: any, idx: number) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 text-xs bg-gray-100 px-4 py-2 rounded-2xl font-medium"
                                  >
                                    📦 {item.itemName}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Delivery Progress */}
                <div className="py-14">
                  <h3 className="font-bold text-2xl mb-10 text-center tracking-tight">
                    Delivery Progress
                  </h3>
                  <div className="space-y-4 max-w-3xl mx-auto">
                    {steps.map((step, i) => {
                      const isActive = step.active;
                      const isOpen = openStep === i;
                      return (
                        <div
                          key={i}
                          onClick={() => setOpenStep(isOpen ? null : i)}
                          className={`border rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                            isActive
                              ? "border-black bg-black text-white"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div className="px-8 py-6 flex items-center gap-5">
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                                isActive
                                  ? "bg-white text-black"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              <step.icon size={26} />
                            </div>
                            <div className="flex-1">
                              <p
                                className={`font-bold text-lg ${
                                  isActive ? "text-white" : "text-gray-800"
                                }`}
                              >
                                {step.label}
                              </p>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                          {isOpen && (
                            <div className="px-8 pb-8 text-[15px] leading-relaxed text-[#666]">
                              {step.label === "Order Confirmed" &&
                                "Your order has been received and is being prepared for pickup."}
                              {step.label === "Rider Assigned" &&
                                "A rider has accepted your order and is heading to the pickup point."}
                              {step.label === "Awaiting Rider" &&
                                "We are looking for an available rider near your pickup location."}
                              {step.label === "Ride Started" &&
                                "The rider has started the journey with your package."}
                              {step.label === "Delivered" &&
                                "Your package has been successfully delivered. Thank you for choosing Pickars!"}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Receipt */}
                {(paymentSuccess || isRidePaid) && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-10">
                      <div className="flex justify-between items-start mb-10">
                        <div>
                          <h2 className="text-3xl font-black tracking-tight">
                            Payment Receipt
                          </h2>
                          <p className="text-gray-500 mt-1">
                            Official transaction record
                          </p>
                        </div>
                      </div>

                      <div className="px-6 py-3 mb-12 bg-emerald-100 text-emerald-700 rounded-2xl font-bold flex items-center gap-2">
                        <FaCheck /> PAID SUCCESSFULLY
                      </div>

                      <div className="text-center mb-12">
                        <p className="text-gray-500 text-sm uppercase tracking-widest">
                          Total Amount Paid
                        </p>
                        <div className="flex items-baseline justify-center mt-3">
                          <span className="text-4xl font-bold text-red-600">
                            ₦
                          </span>
                          <span className="text-7xl font-black tracking-tighter ml-1">
                            {(
                              currentRide.discountedPrice ||
                              currentRide.totalPrice ||
                              0
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="h-px bg-gray-200 my-8" />

                      <div className="grid md:grid-cols-2 gap-10">
                        <div>
                          <p className="uppercase text-xs tracking-widest text-gray-400 mb-5">
                            TRANSACTION DETAILS
                          </p>
                          <div className="space-y-6">
                            <div className="flex gap-4">
                              <FaCalendarAlt className="text-2xl text-gray-400 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Date &amp; Time
                                </p>
                                <p className="font-medium">
                                  {formatDate(currentRide.paid?.timestamp)}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <FaCheckCircle className="text-2xl text-gray-400 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Reference
                                </p>
                                <p className="font-medium font-mono">
                                  {currentRide.paid?.details?.reference ||
                                    reference}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <FaCreditCard className="text-2xl text-gray-400 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Payment Method
                                </p>
                                <p className="font-medium">Card via Paystack</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="uppercase text-xs tracking-widest text-gray-400 mb-5">
                            CUSTOMER INFORMATION
                          </p>
                          <div className="space-y-6">
                            <div className="flex gap-4">
                              <FaUser className="text-2xl text-gray-400 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Billed To
                                </p>
                                <p className="font-medium">
                                  {currentRide.customer?.firstName}{" "}
                                  {currentRide.customer?.lastName}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <FaMapMarkerAlt className="text-2xl text-gray-400 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Tracking ID
                                </p>
                                <p className="font-medium">
                                  {currentRide.trackingId}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-sm text-gray-400 mt-12 pt-8 border-t">
                        This is a computer-generated receipt. No signature
                        required.
                        <br />
                        Thank you for choosing Pickars!
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : null}
          </motion.div>
        )}
      </div>

      {/* Payment Confirmation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[200] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Complete Payment</h2>
                  <p className="text-gray-500 mt-1">
                    Please make a manual bank transfer
                  </p>
                </div>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Amount Section */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <p className="text-sm text-gray-500 mb-1">Amount to pay</p>
                <p className="text-3xl font-bold text-red-600">
                  • ₦{(currentRide?.totalPrice || 0).toLocaleString()}
                </p>
              </div>

              {/* Bank Account Details */}
              <div className="border border-gray-100 rounded-2xl p-5 mb-6 space-y-4 bg-gray-50/50">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Bank Name
                  </p>
                  <p className="text-lg font-bold text-gray-800">OPay</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Account Number
                  </p>
                  <p className="text-xl font-mono font-bold text-gray-900 tracking-wide">
                    6444788035
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Account Name
                  </p>
                  <p className="text-md font-bold text-gray-800">
                    PICKARS COURIER LIMITED
                  </p>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
                <p className="font-semibold mb-1">⚠️ Important Instruction:</p>
                <p>
                  Please use your <strong>Booking ID</strong> as the
                  narration/payment reference so we can confirm your payment
                  automatically.
                </p>
              </div>
            </div>

            <div className="border-t px-8 py-6 flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-4 rounded-2xl border border-gray-200 font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
};

export default TrackingPage;
