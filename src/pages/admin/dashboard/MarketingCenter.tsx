import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiUsers,
  FiBell,
  FiClock,
  FiSmartphone,
  FiActivity,
  FiX,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiRotateCcw,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../api/store";
import {
  fetchAllUsers,
  sendPushNotification,
  fetchNotificationHistory,
} from "../../../api/slices/dashboardSlice";
import AdminLayout from "../layout/AdminLayout";
import LoadingScreen from "../../../LoadingScreen";

const MarketingCenter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, notificationHistory, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendToAll, setSendToAll] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userSearch, setUserSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [resendingId, setResendingId] = useState<string | null>(null);

  const [modalStatus, setModalStatus] = useState<{
    show: boolean;
    type: "success" | "error";
    text: string;
  }>({
    show: false,
    type: "success",
    text: "",
  });

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchNotificationHistory());
  }, [dispatch]);

  const filteredUsers = users
    .filter(
      (u) =>
        `${u.firstName} ${u.lastName}`
          .toLowerCase()
          .includes(userSearch.toLowerCase()) ||
        u.phoneNumber.includes(userSearch)
    )
    .slice(0, 5);

  const handleActionSend = async (payload: any, logId?: string) => {
    if (logId) setResendingId(logId);

    const result = await dispatch(sendPushNotification(payload));

    if (sendPushNotification.fulfilled.match(result)) {
      setModalStatus({
        show: true,
        type: "success",
        text: payload.sendToAll
          ? "Broadcast transmitted to all active devices."
          : "Notification sent successfully.",
      });
      if (!payload.isResend) {
        setTitle("");
        setMessage("");
        setSelectedUser(null);
      }
      dispatch(fetchNotificationHistory());
    } else {
      setModalStatus({
        show: true,
        type: "error",
        text: (result.payload as string) || "Transmission failed.",
      });
    }
    setResendingId(null);
  };

  const onResendClick = (log: any) => {
    const resendPayload = {
      title: log.title,
      message: log.message,
      sendToAll: log.targetType === "BROADCAST",
      userId: log.targetUserId?._id || log.targetUserId,
      isResend: true,
    };
    handleActionSend(resendPayload, log._id);
  };

  if (loading && notificationHistory.length === 0) return <LoadingScreen />;

  return (
    <AdminLayout>
      <div className="flex flex-col gap-10 font-['Lufga',sans-serif]">
        <header>
          <h1 className="text-4xl font-black text-[#0A0A0A] tracking-tighter">
            Marketing Center
          </h1>
          <p className="text-gray-400 font-bold  text-sm">
            Target specific customers or broadcast to the entire fleet.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* COMPOSER */}
          <section className="xl:col-span-1">
            <div className="bg-white p-10 rounded-[48px] shadow-sm border border-gray-100 sticky top-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-[#FF0000] rounded-2xl flex items-center justify-center shadow-xl shadow-red-600/30">
                  <FiBell className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-black text-[#0A0A0A]">
                  New Alert
                </h3>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleActionSend({
                    title,
                    message,
                    sendToAll,
                    userId: sendToAll ? undefined : selectedUser?._id,
                  });
                }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <FiUsers
                      className={sendToAll ? "text-[#FF0000]" : "text-gray-400"}
                    />
                    <span className="text-[10px] font-black uppercase text-[#0A0A0A] tracking-widest">
                      Broadcast Mode
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSendToAll(!sendToAll)}
                    className={`w-12 h-6 rounded-full transition-all relative ${
                      sendToAll ? "bg-[#FF0000]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        sendToAll ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {!sendToAll && (
                  <div className="relative">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2 mb-2 block">
                      Search User
                    </label>
                    {selectedUser ? (
                      <div className="w-full p-5 bg-red-50 border-2 border-[#FF0000]/10 rounded-[20px] flex items-center justify-between animate-in fade-in zoom-in duration-300">
                        <span className="font-black text-sm text-[#FF0000] capitalize">
                          {selectedUser.firstName} {selectedUser.lastName}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedUser(null)}
                        >
                          <FiX className="text-[#FF0000]" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Start typing name..."
                          value={userSearch}
                          onFocus={() => setIsDropdownOpen(true)}
                          onChange={(e) => setUserSearch(e.target.value)}
                          className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-red-500/10 rounded-[20px] outline-none font-bold text-sm transition-all"
                        />
                        <AnimatePresence>
                          {isDropdownOpen && userSearch && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute z-50 w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-[24px] overflow-hidden"
                            >
                              {filteredUsers.map((u) => (
                                <button
                                  key={u._id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedUser(u);
                                    setIsDropdownOpen(false);
                                  }}
                                  className="w-full p-5 text-left hover:bg-red-50 flex flex-col transition-colors border-b border-gray-50 last:border-0"
                                >
                                  <span className="font-black text-sm text-[#0A0A0A] capitalize">
                                    {u.firstName} {u.lastName}
                                  </span>
                                  <span className="text-[10px] font-bold text-gray-400">
                                    {u.phoneNumber}
                                  </span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2 block">
                    Subject
                  </label>
                  <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-5 bg-gray-50 rounded-[20px] outline-none font-bold text-sm border-2 border-transparent focus:border-red-500/10 transition-all"
                    placeholder="Enter title..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2 block">
                    Message Body
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-5 bg-gray-50 rounded-[20px] outline-none font-bold text-sm resize-none border-2 border-transparent focus:border-red-500/10 transition-all"
                    placeholder="Enter message..."
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full py-6 bg-[#0A0A0A] hover:bg-[#FF0000] text-white rounded-[24px] font-black text-sm transition-all shadow-xl shadow-red-600/10 flex items-center justify-center gap-3"
                >
                  {loading && !resendingId ? (
                    "Transmitting..."
                  ) : (
                    <>
                      Send Notification <FiSend />
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* TRANSMISSION LOGS */}
          <section className="xl:col-span-2 space-y-8">
            <h3 className="text-2xl font-black text-[#0A0A0A] flex items-center gap-4">
              <FiClock className="text-[#FF0000]" /> Transmission Logs
            </h3>

            <div className="bg-white rounded-[48px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Target
                      </th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Content
                      </th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Device Reach
                      </th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">
                        Retry
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {notificationHistory.map((log) => (
                      <tr
                        key={log._id}
                        className="hover:bg-gray-50/30 transition-colors group"
                      >
                        <td className="px-10 py-8">
                          <p className="font-black text-xs text-[#0A0A0A]">
                            {new Date(log.createdAt).toLocaleDateString()}
                          </p>
                          <span
                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md inline-block mt-1 ${
                              log.targetType === "BROADCAST"
                                ? "bg-red-50 text-[#FF0000]"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {log.targetType}
                          </span>
                        </td>
                        <td className="px-10 py-8 max-w-xs">
                          <p className="font-black text-sm text-[#0A0A0A] truncate">
                            {log.title}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 truncate mt-1">
                            {log.message}
                          </p>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex gap-8">
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-blue-500 flex items-center gap-1.5">
                                <FiSmartphone />{" "}
                                {log.deliveryStats?.iosCount || 0}
                              </span>
                              <span className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">
                                iOS
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-emerald-500 flex items-center gap-1.5">
                                <FiActivity />{" "}
                                {log.deliveryStats?.androidCount || 0}
                              </span>
                              <span className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">
                                Android
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button
                            onClick={() => onResendClick(log)}
                            disabled={!!resendingId}
                            className="p-4 bg-gray-50 hover:bg-[#FF0000] text-gray-300 hover:text-white rounded-[20px] transition-all shadow-sm flex items-center justify-center ml-auto"
                            title="Retransmit Message"
                          >
                            {resendingId === log._id ? (
                              <FiRefreshCw className="animate-spin" size={18} />
                            ) : (
                              <FiRotateCcw size={18} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* STATUS MODAL */}
      <AnimatePresence>
        {modalStatus.show && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalStatus((p) => ({ ...p, show: false }))}
              className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-sm rounded-[48px] p-12 text-center relative shadow-2xl"
            >
              <div
                className={`w-24 h-24 mx-auto rounded-[32px] flex items-center justify-center mb-10 ${
                  modalStatus.type === "success"
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-red-50 text-[#FF0000]"
                }`}
              >
                {modalStatus.type === "success" ? (
                  <FiCheckCircle size={48} />
                ) : (
                  <FiAlertCircle size={48} />
                )}
              </div>
              <h4 className="text-3xl font-black text-[#0A0A0A] mb-4">
                {modalStatus.type === "success"
                  ? "Dispatch Success"
                  : "Error Occurred"}
              </h4>
              <p className="text-gray-500 font-bold text-sm leading-relaxed mb-10">
                {modalStatus.text}
              </p>
              <button
                onClick={() => setModalStatus((p) => ({ ...p, show: false }))}
                className="w-full py-5 bg-[#0A0A0A] text-white rounded-[24px] font-black text-sm hover:bg-[#FF0000] transition-all"
              >
                Dismiss
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default MarketingCenter;
