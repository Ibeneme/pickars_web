import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiMail,
  FiEye,
  FiX,
  FiUser,
  FiPhone,
  FiCalendar,
  FiAward,
  FiMapPin,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";

import AdminLayout from "../layout/AdminLayout";
import type { AppDispatch, RootState } from "../../../api/store";
import { fetchAllUsers } from "../../../api/slices/dashboardSlice";
import LoadingScreen from "../../../LoadingScreen";

const UsersManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.dashboard);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phoneNumber.includes(searchTerm)
  );

  const handleSendEmail = (email: string) => {
    window.location.href = `mailto:${email}?subject=Message from Pickars Admin`;
  };

  return (
    <AdminLayout>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingScreen />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black text-[#0A0A0A] tracking-tighter">
                  User Directory
                </h1>
                <p className="text-gray-400 font-bold mt-1">
                  Manage and audit {users.length} registered platform customers.
                </p>
              </div>

              <div className="relative w-full md:w-96 group">
                <FiSearch
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF0000] transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-2 border-gray-100 focus:border-red-500/20 py-4 pl-14 pr-6 rounded-[20px] outline-none transition-all shadow-sm font-bold text-sm text-[#0A0A0A]"
                />
              </div>
            </header>

            {/* Table Container */}
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Customer Details
                      </th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Contact Info
                      </th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Platform Rank
                      </th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Activity
                      </th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50/50 transition-all group"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                              {user.imageUrl ? (
                                <img
                                  src={user.imageUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FiUser className="text-gray-400" size={20} />
                              )}
                            </div>
                            <div>
                              <p className="font-black text-[#0A0A0A] capitalize text-sm leading-tight">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-[11px] font-bold text-gray-400 mt-0.5">
                                {user.email || "Guest Account"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="font-bold text-[#0A0A0A] text-sm">
                            <span className="text-gray-300 mr-1">
                              {user.countryCode}
                            </span>
                            {user.phoneNumber}
                          </p>
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
                              user.rank === "Big Stepper" ||
                              user.rank === "Governor"
                                ? "bg-[#0A0A0A] text-white"
                                : "bg-red-50 text-[#FF0000]"
                            }`}
                          >
                            <FiAward size={12} /> {user.rank}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-black text-[#0A0A0A] text-sm">
                              {user.rideCount}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                              Total Rides
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-end gap-3">
                            {user.email && (
                              <button
                                onClick={() => handleSendEmail(user.email)}
                                className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-[#FF0000] rounded-xl transition-all"
                              >
                                <FiMail size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#FF0000] text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
                            >
                              <FiEye size={14} /> Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* USER DETAIL MODAL */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-auto"
            >
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-[#FF0000] rounded-full transition-all z-10"
              >
                <FiX size={24} />
              </button>

              {/* Modal Sidebar - Profile Info */}
              <div className="md:w-1/3 bg-[#0A0A0A] p-12 text-white flex flex-col items-center text-center relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0000] rounded-full blur-[80px] opacity-20" />

                <div className="relative z-10">
                  <div className="w-32 h-32 rounded-[32px] bg-white border-4 border-white shadow-2xl overflow-hidden mb-8 mx-auto">
                    <img
                      src={
                        selectedUser.imageUrl ||
                        `https://ui-avatars.com/api/?name=${selectedUser.firstName}&background=FF0000&color=fff`
                      }
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <h3 className="text-3xl font-black capitalize tracking-tighter">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h3>
                  <div className="inline-flex items-center gap-2 text-[#FF0000] font-black text-[10px] uppercase tracking-[0.2em] mt-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                    <FiAward /> {selectedUser.rank}
                  </div>

                  <div className="mt-12 space-y-4 w-full">
                    <div className="bg-white/5 p-5 rounded-[24px] border border-white/5 text-left">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                        Promo Code
                      </p>
                      <p className="text-sm font-black text-[#FF0000] select-all truncate">
                        {selectedUser.promoCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Main Content */}
              <div className="flex-1 p-12 overflow-y-auto">
                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-10 flex items-center gap-3">
                  <div className="w-6 h-[2px] bg-[#FF0000]" /> Account Overview
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
                  <div className="space-y-2">
                    <p className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <FiPhone className="text-[#FF0000]" size={14} /> Primary
                      Contact
                    </p>
                    <p className="font-black text-[#0A0A0A] text-lg leading-none">
                      {selectedUser.countryCode} {selectedUser.phoneNumber}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <FiMail className="text-[#FF0000]" size={14} /> Email
                      Address
                    </p>
                    <p className="font-black text-[#0A0A0A] text-lg leading-none truncate">
                      {selectedUser.email || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <FiCalendar className="text-[#FF0000]" size={14} />{" "}
                      Membership Date
                    </p>
                    <p className="font-black text-[#0A0A0A] text-lg leading-none">
                      {new Date(selectedUser.createdAt).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <FiCheckCircle className="text-[#FF0000]" size={14} />{" "}
                      Service Stats
                    </p>
                    <p className="font-black text-[#0A0A0A] text-lg leading-none">
                      {selectedUser.rideCount} Completed Rides
                    </p>
                  </div>
                </div>

                <div className="space-y-10">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-3">
                      <FiMapPin className="text-[#FF0000]" /> Recent Activity
                      Locations
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedUser.recentDeliveryLocations?.length > 0 ? (
                        selectedUser.recentDeliveryLocations.map(
                          (loc: any, i: number) => (
                            <div
                              key={i}
                              className="bg-gray-50 p-4 rounded-[18px] border border-gray-100 flex gap-4 items-center"
                            >
                              <div className="w-2 h-2 rounded-full bg-[#FF0000] shrink-0" />
                              <p className="text-xs font-bold text-gray-600 truncate">
                                {loc.address}
                              </p>
                            </div>
                          )
                        )
                      ) : (
                        <p className="text-xs  text-gray-300 ml-1">
                          No delivery history recorded.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Security Section */}
                  <div
                    className={`p-8 rounded-[32px] flex items-center justify-between border-2 transition-all ${
                      selectedUser.loginLock
                        ? "bg-red-50 border-red-100"
                        : "bg-emerald-50 border-emerald-100"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                          selectedUser.loginLock
                            ? "bg-[#FF0000] text-white"
                            : "bg-emerald-500 text-white"
                        }`}
                      >
                        <FiShield size={28} />
                      </div>
                      <div>
                        <p
                          className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                            selectedUser.loginLock
                              ? "text-[#FF0000]"
                              : "text-emerald-600"
                          }`}
                        >
                          Security Protocol
                        </p>
                        <p className="text-xl font-black text-[#0A0A0A] tracking-tight leading-none">
                          {selectedUser.loginLock
                            ? "Account Suspended"
                            : "Active & Secure"}
                        </p>
                      </div>
                    </div>
                    <button
                      className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                        selectedUser.loginLock
                          ? "bg-[#FF0000] text-white hover:bg-black"
                          : "bg-[#0A0A0A] text-white hover:bg-[#FF0000]"
                      }`}
                    >
                      {selectedUser.loginLock ? "Revoke Lock" : "Enforce Lock"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default UsersManagement;
