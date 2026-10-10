"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiNavigation,
  FiPackage,
  FiClock,
  FiXCircle,
  FiEye,
  FiCreditCard,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/api/store";
import { fetchAllRides } from "@/api/slices/dashboardSlice";
import LoadingScreen from "@/components/atoms/loaders/loading-screen";

export default function RidesManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { rides, loading } = useSelector((state: RootState) => state.dashboard);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRide, setSelectedRide] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAllRides());
  }, [dispatch]);

  const getStatus = (ride: any) => {
    if (ride.cancelRide?.isCancelled)
      return { label: "Cancelled", color: "text-gray-400", bg: "bg-gray-100" };
    if (ride.endRide?.isEnded)
      return {
        label: "Completed",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      };
    if (ride.startRide?.isStarted)
      return { label: "In Transit", color: "text-blue-500", bg: "bg-blue-50" };
    if (ride.acceptRide)
      return { label: "Accepted", color: "text-[#FF0000]", bg: "bg-red-50" };
    return { label: "Pending", color: "text-orange-500", bg: "bg-orange-50" };
  };

  const filteredRides = rides.filter(
    (r: any) =>
      r.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.rider?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="flex flex-col gap-8 font-['Lufga',sans-serif] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-16">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tighter">
                  Logistics Tracking
                </h1>
                <p className="text-gray-400 font-bold text-sm mt-1">
                  Monitor {rides.length} live deliveries and platform activity.
                </p>
              </div>
              <div className="relative group w-full lg:w-80">
                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF0000] transition-colors" />
                <input
                  type="text"
                  placeholder="Search Tracking ID or Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-2 border-gray-100 focus:border-red-500/20 py-4 pl-12 pr-6 rounded-2xl outline-none font-bold text-sm transition-all"
                />
              </div>
            </header>

            <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 sm:px-8 py-5 sm:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Tracking ID
                      </th>
                      <th className="px-6 sm:px-8 py-5 sm:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Customer
                      </th>
                      <th className="px-6 sm:px-8 py-5 sm:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Rider Info
                      </th>
                      <th className="px-6 sm:px-8 py-5 sm:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Status
                      </th>
                      <th className="px-6 sm:px-8 py-5 sm:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr className="animate-pulse">
                        <td colSpan={5} className="h-24 bg-gray-50/10"></td>
                      </tr>
                    ) : (
                      filteredRides.map((ride: any) => {
                        const status = getStatus(ride);
                        return (
                          <tr
                            key={ride._id}
                            className="hover:bg-gray-50/30 transition-colors group"
                          >
                            <td className="px-6 sm:px-8 py-5 sm:py-6">
                              <span className="font-black text-[#0A0A0A] text-xs uppercase tracking-tighter">
                                #{ride.trackingId?.split("-")[0]}
                              </span>
                              {ride.reportThisRide && (
                                <span className="ml-2 inline-block w-2 h-2 bg-[#FF0000] rounded-full animate-ping" />
                              )}
                            </td>
                            <td className="px-6 sm:px-8 py-5 sm:py-6">
                              <p className="font-black text-sm text-[#0A0A0A] capitalize">
                                {ride.customer.firstName}{" "}
                                {ride.customer.lastName}
                              </p>
                              <p className="text-[10px] font-bold text-gray-400 mt-0.5">
                                {ride.customer.phoneNumber}
                              </p>
                            </td>
                            <td className="px-6 sm:px-8 py-5 sm:py-6">
                              {ride.rider?.firstName ? (
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                    <img
                                      src={ride.rider.imageUrl}
                                      className="w-full h-full object-cover"
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <p className="font-bold text-xs text-[#0A0A0A]">
                                      {ride.rider.firstName}
                                    </p>
                                    <p className="text-[9px] font-black text-[#FF0000]">
                                      {ride.rider.plateNumber}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-[10px] font-bold text-orange-400 bg-orange-50 px-3 py-1 rounded-full uppercase inline-block">
                                  Searching Rider...
                                </span>
                              )}
                            </td>
                            <td className="px-6 sm:px-8 py-5 sm:py-6">
                              <span
                                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest inline-block ${status.bg} ${status.color}`}
                              >
                                {status.label}
                              </span>
                            </td>
                            <td className="px-6 sm:px-8 py-5 sm:py-6 text-right">
                              <button
                                onClick={() => setSelectedRide(ride)}
                                className="p-3.5 bg-gray-50 hover:bg-[#FF0000] text-gray-400 hover:text-white rounded-2xl transition-all ml-auto shrink-0"
                                title="View Details"
                              >
                                <FiEye size={18} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* COMPACT RIDE DETAILS MODAL */}
          <AnimatePresence>
            {selectedRide && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedRide(null)}
                  className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-md"
                />
                <motion.div
                  initial={{ scale: 0.95, y: 10, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.95, y: 10, opacity: 0 }}
                  className="bg-white w-full max-w-4xl rounded-[32px] sm:rounded-[40px] relative overflow-hidden flex flex-col md:flex-row max-h-[85vh] border border-gray-100"
                >
                  {/* Left Column: Route History (Compact) */}
                  <div className="md:w-[40%] bg-[#0A0A0A] p-6 sm:p-8 text-white flex flex-col overflow-y-auto">
                    <header className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center shrink-0">
                          <FiNavigation size={20} className="text-white" />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                          Route Details
                        </h3>
                      </div>
                    </header>

                    <div className="relative border-l-2 border-white/10 ml-2 space-y-6 text-xs">
                      <div className="relative pl-6">
                        <div className="absolute left-[-7px] top-0 w-3 h-3 rounded-full bg-white border-2 border-[#0A0A0A]" />
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                          Pickup Address
                        </p>
                        <p className="font-bold mt-1 leading-snug">
                          {selectedRide.pickup.pickupAddress}
                        </p>
                        <p className="text-[9px] font-black text-[#FF0000] mt-0.5">
                          CODE: {selectedRide.pickup.pickupCode}
                        </p>
                      </div>

                      {selectedRide.deliveryDropoff.map(
                        (drop: any, i: number) => (
                          <div key={i} className="relative pl-6">
                            <div className="absolute left-[-7px] top-0 w-3 h-3 rounded-full bg-[#FF0000] border-2 border-[#0A0A0A]" />
                            <p className="text-[9px] font-black text-[#FF0000] uppercase tracking-widest">
                              Dropoff {i + 1}
                            </p>
                            <p className="font-bold mt-1 leading-snug">
                              {drop.deliveryAddress}
                            </p>

                            <div className="mt-3 p-3.5 bg-white/5 rounded-2xl border border-white/5">
                              <div className="flex justify-between items-start mb-1.5">
                                <p className="text-[9px] font-black uppercase text-gray-400">
                                  Receiver
                                </p>
                                <p className="text-[9px] font-black text-[#FF0000]">
                                  ID: {drop.parcelId}
                                </p>
                              </div>
                              <p className="font-bold">{drop.receiverName}</p>
                              <p className="text-[10px] text-gray-400">
                                {drop.receiverPhoneNumber}
                              </p>

                              <div className="mt-2.5 pt-2.5 border-t border-white/5">
                                <p className="text-[9px] font-black uppercase text-gray-400 mb-1.5">
                                  Items
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {drop.items.map((item: any, idx: number) => (
                                    <span
                                      key={idx}
                                      className="bg-white/10 px-2 py-0.5 rounded-md text-[9px] font-bold"
                                    >
                                      {item.itemName}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-6 pt-4">
                      <div className="bg-[#FF0000] p-5 rounded-2xl text-center">
                        <p className="text-[9px] font-black text-white/70 uppercase tracking-widest mb-0.5">
                          Final Settlement
                        </p>
                        <h4 className="text-2xl font-black">
                          ₦{selectedRide.totalPrice.toLocaleString()}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Meta & Actions (Compact) */}
                  <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-white flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tighter">
                            Ride Analytics
                          </h2>
                          <p className="text-gray-400 font-bold mt-0.5 uppercase text-[10px] tracking-widest">
                            Tracking: {selectedRide.trackingId}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedRide(null)}
                          className="p-1 text-gray-300 hover:text-[#0A0A0A] transition-colors shrink-0"
                        >
                          <FiXCircle size={26} />
                        </button>
                      </div>

                      {/* Status Bar */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div
                          className={`p-4 rounded-2xl flex flex-col gap-2 border border-gray-50 ${
                            selectedRide.paid.isPaid
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-[#FF0000]"
                          }`}
                        >
                          <FiCreditCard size={18} />
                          <div>
                            <p className="text-[8px] font-black uppercase tracking-widest opacity-60">
                              Payment
                            </p>
                            <p className="text-xs font-black">
                              {selectedRide.paid.isPaid
                                ? "Verified Paid"
                                : "Pending"}
                            </p>
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50 flex flex-col gap-2 border border-gray-50">
                          <FiClock size={18} className="text-gray-400" />
                          <div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                              Method
                            </p>
                            <p className="text-xs font-black text-[#0A0A0A] uppercase truncate">
                              {selectedRide.paid.paymentService}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <section>
                          <h5 className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />{" "}
                            Customer Profile
                          </h5>
                          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 overflow-hidden shrink-0">
                              <img
                                src={
                                  selectedRide.customer.imageUrl ||
                                  `https://ui-avatars.com/api/?name=${selectedRide.customer.firstName}&background=FF0000&color=fff`
                                }
                                className="w-full h-full object-cover"
                                alt=""
                              />
                            </div>
                            <div>
                              <p className="font-black text-[#0A0A0A] capitalize text-sm leading-tight">
                                {selectedRide.customer.firstName}{" "}
                                {selectedRide.customer.lastName}
                              </p>
                              <p className="text-[10px] font-bold text-gray-400">
                                {selectedRide.customer.phoneNumber}
                              </p>
                            </div>
                          </div>
                        </section>

                        <section className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-[9px] text-gray-400 uppercase">
                              Creation
                            </span>
                            <span className="font-black text-[#0A0A0A]">
                              {new Date(
                                selectedRide.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-[9px] text-gray-400 uppercase">
                              Verification Code
                            </span>
                            <span className="font-black text-[#FF0000]">
                              {selectedRide.pickup.pickupCode}
                            </span>
                          </div>
                        </section>
                      </div>
                    </div>

                    {/* Final Control Area */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                      <button
                        className="flex-1 bg-[#0A0A0A] text-white py-3.5 rounded-2xl font-black text-xs hover:bg-[#FF0000] transition-all"
                        onClick={() => window.print()}
                      >
                        Generate Audit Report
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
