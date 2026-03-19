import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiCreditCard,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiFileText,
} from "react-icons/fi";

import { fetchAllPayments } from "../../../api/slices/dashboardSlice";
import AdminLayout from "../layout/AdminLayout";
import LoadingScreen from "../../../LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../api/store";

const PaymentsManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  const filteredPayments = payments.filter(
    (p) =>
      p.trackingId.includes(searchTerm) ||
      p.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.paid?.details?.reference?.includes(searchTerm)
  );

  if (loading && payments.length === 0) return <LoadingScreen />;

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-[#0A0A0A] tracking-tighter">
              Revenue Audit
            </h1>
            <p className="text-gray-400 font-bold ">
              Verify settlements and Paystack transaction logs.
            </p>
          </div>

          <div className="relative group w-full md:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF0000] transition-colors" />
            <input
              type="text"
              placeholder="Ref or Tracking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-transparent focus:border-red-500/10 py-4 pl-12 pr-6 rounded-2xl outline-none font-bold text-sm shadow-sm"
            />
          </div>
        </header>

        {/* Payment Summary Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A0A0A] p-8 rounded-[32px] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF0000] rounded-full blur-3xl opacity-20" />
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2">
              Processed (Total)
            </p>
            <h3 className="text-3xl font-black text-white">
              ₦
              {payments
                .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0)
                .toLocaleString()}
            </h3>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">
              Volume
            </p>
            <h3 className="text-3xl font-black text-[#0A0A0A]">
              {payments.length}{" "}
              <span className="text-sm text-gray-300">Transactions</span>
            </h3>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">
              Platform Fee
            </p>
            <h3 className="text-3xl font-black text-[#FF0000]">
              10% <span className="text-sm text-gray-300">Average</span>
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Date & Ref
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Customer
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Amount
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Status
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPayments.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-gray-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <p className="font-black text-xs text-[#0A0A0A]">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 truncate w-32 tracking-tighter">
                        {p.paid?.details?.reference || "N/A"}
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-bold text-sm text-[#0A0A0A] capitalize">
                        {p.customer.firstName} {p.customer.lastName}
                      </p>
                      <p className="text-[10px] font-black text-[#FF0000] uppercase tracking-tighter">
                        ID: #{p.trackingId.slice(0, 8)}
                      </p>
                    </td>
                    <td className="px-8 py-5 font-black text-[#0A0A0A]">
                      ₦{p.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-8 py-5">
                      <div
                        className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                          p.paid?.isPaid
                            ? "text-emerald-500"
                            : "text-orange-500"
                        }`}
                      >
                        {p.paid?.isPaid ? <FiCheckCircle /> : <FiClock />}
                        {p.paid?.isPaid ? "Success" : "Pending"}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => setSelectedPayment(p)}
                        className="p-3 bg-gray-50 hover:bg-[#FF0000] text-gray-400 hover:text-white rounded-xl transition-all"
                      >
                        <FiFileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PAYMENT DETAILS MODAL */}
      <AnimatePresence>
        {selectedPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPayment(null)}
              className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl relative overflow-hidden"
            >
              <div className="p-12">
                <header className="flex justify-between items-start mb-12">
                  <div>
                    <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center mb-6">
                      <FiCreditCard className="text-[#FF0000]" size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tighter">
                      Payment Receipt
                    </h2>
                    <p className="text-gray-400 font-bold text-sm">
                      Ref: {selectedPayment.paid?.details?.reference}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="p-2 text-gray-400 hover:text-black transition-colors"
                  >
                    <FiXCircle size={32} />
                  </button>
                </header>

                <div className="space-y-8">
                  {/* Amount Block */}
                  <div className="bg-gray-50 p-8 rounded-[32px] text-center border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Transaction Amount
                    </p>
                    <h4 className="text-5xl font-black text-[#0A0A0A]">
                      ₦{selectedPayment.totalPrice.toLocaleString()}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-8 px-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Payment Method
                      </p>
                      <p className="font-black text-[#0A0A0A] uppercase">
                        {selectedPayment.paid.paymentMethod} •{" "}
                        {selectedPayment.paid.paymentService}
                      </p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Gateway Status
                      </p>
                      <p className="font-black text-emerald-500 uppercase">
                        {selectedPayment.paid.details?.status || "Successful"}
                      </p>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="space-y-6 px-4">
                    <h5 className="text-[10px] font-black text-[#FF0000] uppercase tracking-[0.3em]">
                      Channel Information
                    </h5>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">
                          Card Type
                        </p>
                        <p className="font-bold text-[#0A0A0A]">
                          {selectedPayment.paid.details?.authorization
                            ?.card_type || "Visa/Mastercard"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">
                          Bank
                        </p>
                        <p className="font-bold text-[#0A0A0A]">
                          {selectedPayment.paid.details?.authorization?.bank ||
                            "Settled via Paystack"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      className="w-full bg-[#0A0A0A] text-white py-6 rounded-3xl font-black text-sm flex items-center justify-center gap-3 hover:bg-black transition-all"
                      onClick={() => window.print()}
                    >
                      <FiFileText /> Export as PDF
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

export default PaymentsManagement;
