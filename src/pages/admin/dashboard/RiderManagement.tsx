import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiTruck,
  FiEye,
  FiX,
  FiCheckCircle,
  FiDollarSign,
  FiCreditCard,
  FiMapPin,
  FiSlash,
  FiClock,
} from "react-icons/fi";

import { fetchAllRiders } from "../../../api/slices/dashboardSlice";
import AdminLayout from "../layout/AdminLayout";
import { type AppDispatch, type RootState } from "../../../api/store";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../../LoadingScreen";

const RidersManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { riders, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRider, setSelectedRider] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAllRiders());
  }, [dispatch]);

  const filteredRiders = riders.filter(
    (r) =>
      r.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) {
  }
  return (
    <AdminLayout>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {" "}
          <div className="flex flex-col gap-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black text-[#0A0A0A] tracking-tighter">
                  Rider Fleet
                </h1>
                <p className="text-gray-400 font-bold ">
                  Manage {riders.length} registered riders and their
                  credentials.
                </p>
              </div>

              <div className="relative group w-full md:w-80">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF0000] transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name or plate..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-2 border-transparent focus:border-red-500/10 focus:bg-white py-4 pl-12 pr-6 rounded-2xl outline-none transition-all shadow-sm font-bold text-sm"
                />
              </div>
            </header>

            {/* Riders Table */}
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Rider Information
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Vehicle & Plate
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Security / Status
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading
                      ? [...Array(5)].map((_, i) => (
                          <tr key={i} className="animate-pulse h-20">
                            <td colSpan={5} className="bg-gray-50/20" />
                          </tr>
                        ))
                      : filteredRiders.map((rider) => (
                          <tr
                            key={rider._id}
                            className="hover:bg-gray-50/50 transition-colors group"
                          >
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#0A0A0A] overflow-hidden flex items-center justify-center text-[#FF0000] border border-gray-100">
                                  {rider.imageUrl ? (
                                    <img
                                      src={rider.imageUrl}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <FiTruck size={22} />
                                  )}
                                </div>
                                <div>
                                  <p className="font-black text-[#0A0A0A] capitalize text-sm">
                                    {rider.firstName} {rider.lastName}
                                  </p>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                    {rider.countryCode} {rider.phoneNumber}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <p className="font-black text-[#0A0A0A] text-xs uppercase">
                                {rider.vehicleName || "Unknown Vehicle"}
                              </p>
                              <p className="text-[10px] font-bold text-[#FF0000] tracking-widest">
                                {rider.plateNumber}
                              </p>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex flex-col gap-1">
                                <div
                                  className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${
                                    rider.verified
                                      ? "text-emerald-500"
                                      : "text-orange-500"
                                  }`}
                                >
                                  {rider.verified ? (
                                    <FiCheckCircle />
                                  ) : (
                                    <FiClock />
                                  )}{" "}
                                  {rider.verified
                                    ? "Fully Verified"
                                    : "Pending Review"}
                                </div>
                                {rider.suspend && (
                                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#FF0000]">
                                    <FiSlash /> Account Suspended
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <button
                                onClick={() => setSelectedRider(rider)}
                                className="p-3 bg-gray-50 hover:bg-[#FF0000] text-gray-400 hover:text-white rounded-xl transition-all"
                              >
                                <FiEye size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* RIDER DETAIL MODAL */}
          <AnimatePresence>
            {selectedRider && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedRider(null)}
                  className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-md"
                />

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto"
                >
                  {/* Profile Sidebar */}
                  <div className="md:w-[35%] bg-[#0A0A0A] p-10 text-white flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0000] rounded-full blur-[80px] opacity-20" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-[32px] bg-white/5 border-2 border-white/10 p-1 mb-6">
                        <img
                          src={
                            selectedRider.imageUrl ||
                            `https://ui-avatars.com/api/?name=${selectedRider.firstName}&background=FF0000&color=fff`
                          }
                          className="w-full h-full object-cover rounded-[28px]"
                        />
                      </div>
                      <h3 className="text-2xl font-black capitalize tracking-tighter">
                        {selectedRider.firstName} {selectedRider.lastName}
                      </h3>
                      <p className="text-gray-500 font-bold text-xs mt-1">
                        {selectedRider.email || "No email provided"}
                      </p>

                      <div className="mt-8 grid grid-cols-2 gap-3 w-full">
                        <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-black text-gray-500 uppercase">
                            Rating
                          </p>
                          <p className="text-sm font-black text-orange-400">
                            {selectedRider.driverRating?.rating || 0} / 5
                          </p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-black text-gray-500 uppercase">
                            Total Rides
                          </p>
                          <p className="text-sm font-black text-white">
                            {selectedRider.totalRides || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-10 space-y-4 relative z-10">
                      <div className="flex items-center gap-3 text-xs">
                        <FiCheckCircle
                          className={
                            selectedRider.NINverified
                              ? "text-emerald-500"
                              : "text-gray-600"
                          }
                        />
                        <span className="font-bold text-gray-400">
                          NIN Verified: {selectedRider.NIN}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <FiMapPin className="text-[#FF0000]" />
                        <span className="font-bold text-gray-300 truncate">
                          {selectedRider.riderLocation?.ridersAddress ||
                            "No location data"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Data Body */}
                  <div className="flex-1 p-10 overflow-y-auto bg-white">
                    <button
                      onClick={() => setSelectedRider(null)}
                      className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"
                    >
                      <FiX size={24} />
                    </button>

                    <div className="space-y-10">
                      {/* Financials */}
                      <section>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                          <FiDollarSign className="text-[#FF0000]" /> Financial
                          Summary
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                              Total Earnings
                            </p>
                            <h4 className="text-3xl font-black text-emerald-900 mt-1">
                              ₦{selectedRider.totalEarnings.toLocaleString()}
                            </h4>
                          </div>
                          <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
                            <p className="text-[9px] font-black text-[#FF0000] uppercase tracking-widest">
                              Total Withdrawals
                            </p>
                            <h4 className="text-3xl font-black text-red-900 mt-1">
                              ₦{selectedRider.totalWithdrawals.toLocaleString()}
                            </h4>
                          </div>
                        </div>
                      </section>

                      {/* Vehicle Details */}
                      <section>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                          <FiTruck className="text-[#FF0000]" /> Vehicle
                          Information
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50 p-8 rounded-[32px]">
                          <div>
                            <p className="text-[8px] font-black text-gray-400 uppercase">
                              Vehicle Name
                            </p>
                            <p className="font-black text-[#0A0A0A]">
                              {selectedRider.vehicleName || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-gray-400 uppercase">
                              Type
                            </p>
                            <p className="font-black text-[#0A0A0A]">
                              {selectedRider.vehicleType || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-gray-400 uppercase">
                              Color
                            </p>
                            <p className="font-black text-[#0A0A0A] capitalize">
                              {selectedRider.vehicleColor || "N/A"}
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* Banking */}
                      <section>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                          <FiCreditCard className="text-[#FF0000]" /> Settlement
                          Accounts
                        </h4>
                        {selectedRider.accountDetails?.length > 0 ? (
                          selectedRider.accountDetails.map(
                            (acc: any, i: number) => (
                              <div
                                key={i}
                                className="flex items-center justify-between p-5 border-2 border-dashed border-gray-100 rounded-2xl"
                              >
                                <div>
                                  <p className="font-black text-sm text-[#0A0A0A]">
                                    {acc.accountName}
                                  </p>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                                    {acc.bank} • {acc.accountNumber}
                                  </p>
                                </div>
                                <div className="text-[10px] font-black text-gray-300">
                                  #{acc.bankCode}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <p className="text-xs  text-gray-300 px-2">
                            No bank accounts linked yet.
                          </p>
                        )}
                      </section>

                      {/* Final Actions */}
                      <div className="flex gap-4 pt-6">
                        <button className="flex-1 bg-[#FF0000] text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-red-500/20 hover:scale-105 transition-all">
                          Modify Status
                        </button>
                        <button className="px-8 py-5 border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all">
                          Logs
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </AdminLayout>
  );
};

export default RidersManagement;
