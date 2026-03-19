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
import { type AppDispatch, type RootState } from "../../../api/store";
import { fetchAllRides } from "../../../api/slices/dashboardSlice";
import AdminLayout from "../layout/AdminLayout";
import LoadingScreen from "../../../LoadingScreen";

const RidesManagement = () => {
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
    <AdminLayout>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="flex flex-col gap-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black text-[#0A0A0A] tracking-tighter">
                  Logistics Tracking
                </h1>
                <p className="text-gray-400 font-bold">
                  Monitor {rides.length} live deliveries and platform activity.
                </p>
              </div>
              <div className="relative group w-full md:w-80">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF0000] transition-colors" />
                <input
                  type="text"
                  placeholder="Search Tracking ID or Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-2 border-transparent focus:border-red-500/10 py-4 pl-12 pr-6 rounded-2xl outline-none font-bold text-sm shadow-sm"
                />
              </div>
            </header>

            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Tracking ID
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Customer
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Rider Info
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Status
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">
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
                            <td className="px-8 py-5">
                              <span className="font-black text-[#0A0A0A] text-xs uppercase tracking-tighter">
                                #{ride.trackingId?.split("-")[0]}
                              </span>
                              {ride.reportThisRide && (
                                <span className="ml-2 inline-block w-2 h-2 bg-[#FF0000] rounded-full animate-ping" />
                              )}
                            </td>
                            <td className="px-8 py-5">
                              <p className="font-black text-sm text-[#0A0A0A] capitalize">
                                {ride.customer.firstName}{" "}
                                {ride.customer.lastName}
                              </p>
                              <p className="text-[10px] font-bold text-gray-400">
                                {ride.customer.phoneNumber}
                              </p>
                            </td>
                            <td className="px-8 py-5">
                              {ride.rider?.firstName ? (
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100">
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
                                <span className="text-[10px] font-bold text-orange-400 bg-orange-50 px-3 py-1 rounded-full uppercase">
                                  Searching Rider...
                                </span>
                              )}
                            </td>
                            <td className="px-8 py-5">
                              <span
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.color}`}
                              >
                                {status.label}
                              </span>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <button
                                onClick={() => setSelectedRide(ride)}
                                className="p-3 bg-gray-50 hover:bg-[#FF0000] text-gray-400 hover:text-white rounded-xl transition-all shadow-sm"
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

          <AnimatePresence>
            {selectedRide && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedRide(null)}
                  className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-md"
                />
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="bg-white w-full max-w-6xl rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row h-[90vh]"
                >
                  {/* Left Column: Route History */}
                  <div className="md:w-[35%] bg-[#0A0A0A] p-12 text-white flex flex-col overflow-y-auto">
                    <header className="mb-12">
                      <div className="w-12 h-12 bg-[#FF0000] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-600/30">
                        <FiNavigation size={24} className="text-white" />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">
                        Route Details
                      </h3>
                    </header>

                    <div className="relative border-l-2 border-white/5 ml-3 space-y-12">
                      <div className="relative pl-8">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-[#0A0A0A]" />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                          Pickup Address
                        </p>
                        <p className="text-sm font-bold mt-2 leading-relaxed">
                          {selectedRide.pickup.pickupAddress}
                        </p>
                        <p className="text-[10px] font-black text-[#FF0000] mt-1">
                          CODE: {selectedRide.pickup.pickupCode}
                        </p>
                      </div>

                      {selectedRide.deliveryDropoff.map(
                        (drop: any, i: number) => (
                          <div key={i} className="relative pl-8">
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#FF0000] border-4 border-[#0A0A0A]" />
                            <p className="text-[10px] font-black text-[#FF0000] uppercase tracking-widest">
                              Dropoff {i + 1}
                            </p>
                            <p className="text-sm font-bold mt-2 leading-relaxed">
                              {drop.deliveryAddress}
                            </p>

                            <div className="mt-4 p-5 bg-white/5 rounded-[24px] border border-white/5">
                              <div className="flex justify-between items-start mb-3">
                                <p className="text-[10px] font-black uppercase text-gray-400">
                                  Receiver
                                </p>
                                <p className="text-[10px] font-black text-[#FF0000]">
                                  ID: {drop.parcelId}
                                </p>
                              </div>
                              <p className="text-sm font-bold">
                                {drop.receiverName}
                              </p>
                              <p className="text-xs font-medium text-gray-500">
                                {drop.receiverPhoneNumber}
                              </p>

                              <div className="mt-4 pt-4 border-t border-white/5">
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-2">
                                  Items
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {drop.items.map((item: any, idx: number) => (
                                    <span
                                      key={idx}
                                      className="bg-white/10 px-3 py-1 rounded-lg text-[10px] font-bold"
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

                    <div className="mt-auto pt-10">
                      <div className="bg-[#FF0000] p-8 rounded-[32px] text-center shadow-2xl shadow-red-600/20">
                        <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">
                          Final Settlement
                        </p>
                        <h4 className="text-4xl font-black">
                          ₦{selectedRide.totalPrice.toLocaleString()}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Meta & Actions */}
                  <div className="flex-1 p-12 overflow-y-auto bg-white">
                    <div className="flex justify-between items-start mb-16">
                      <div>
                        <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tighter">
                          Ride Analytics
                        </h2>
                        <p className="text-gray-400 font-bold mt-1 uppercase text-xs tracking-widest">
                          Tracking: {selectedRide.trackingId}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedRide(null)}
                        className="p-2 text-gray-300 hover:text-[#0A0A0A] transition-colors"
                      >
                        <FiXCircle size={32} />
                      </button>
                    </div>

                    {/* Status Bar */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                      <div
                        className={`p-6 rounded-[24px] flex flex-col gap-3 ${
                          selectedRide.paid.isPaid
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-[#FF0000]"
                        }`}
                      >
                        <FiCreditCard size={20} />
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest opacity-60">
                            Payment Status
                          </p>
                          <p className="text-sm font-black">
                            {selectedRide.paid.isPaid
                              ? "Verified Paid"
                              : "Pending Payment"}
                          </p>
                        </div>
                      </div>
                      <div className="p-6 rounded-[24px] bg-gray-50 flex flex-col gap-3">
                        <FiClock size={20} className="text-gray-400" />
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                            Method
                          </p>
                          <p className="text-sm font-black text-[#0A0A0A] uppercase">
                            {selectedRide.paid.paymentService} -{" "}
                            {selectedRide.paid.paymentMethod}
                          </p>
                        </div>
                      </div>
                      <div className="p-6 rounded-[24px] bg-gray-50 flex flex-col gap-3">
                        <FiNavigation size={20} className="text-gray-400" />
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                            Vehicle
                          </p>
                          <p className="text-sm font-black text-[#0A0A0A]">
                            {selectedRide.rider?.vehicleName || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="p-6 rounded-[24px] bg-[#0A0A0A] text-white flex flex-col gap-3">
                        <FiPackage size={20} className="text-[#FF0000]" />
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                            Logistics
                          </p>
                          <p className="text-sm font-black">
                            {selectedRide.deliveryDropoff.length} Dropoff Points
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <section>
                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />{" "}
                          Customer Profile
                        </h5>
                        <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 overflow-hidden">
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
                            <p className="font-black text-[#0A0A0A] capitalize text-lg leading-tight">
                              {selectedRide.customer.firstName}{" "}
                              {selectedRide.customer.lastName}
                            </p>
                            <p className="text-xs font-bold text-gray-400">
                              {selectedRide.customer.phoneNumber}
                            </p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />{" "}
                          Audit Timeline
                        </h5>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-gray-400 uppercase">
                              Creation
                            </span>
                            <span className="font-black text-[#0A0A0A]">
                              {new Date(
                                selectedRide.createdAt
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-gray-400 uppercase">
                              Last Update
                            </span>
                            <span className="font-black text-[#0A0A0A]">
                              {new Date(
                                selectedRide.updatedAt
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-gray-400 uppercase">
                              Verification Code
                            </span>
                            <span className="font-black text-[#FF0000]">
                              {selectedRide.pickup.pickupCode}
                            </span>
                          </div>
                        </div>
                      </section>
                    </div>

                    {/* Final Control Area */}
                    <div className="mt-16 pt-10 border-t border-gray-100 flex gap-4">
                      <button className="flex-1 bg-[#0A0A0A] text-white py-5 rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-black/10">
                        Generate Audit Report
                      </button>
                      <button className="flex-1 border-2 border-gray-100 text-gray-400 py-5 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all">
                        Contact Support
                      </button>
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

export default RidesManagement;
