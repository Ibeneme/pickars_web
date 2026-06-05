import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiNavigation,
  FiCreditCard,
  FiClock,
  FiUser,
  FiPhone,
  FiUserPlus,
  FiPlay,
  FiStopCircle,
  FiXCircle,
  FiTruck,
  FiPause,
} from "react-icons/fi";
import { type AppDispatch, type RootState } from "../../../api/store";
import {
  getManualRide,
  updateRideStatus,
} from "../../../api/slices/manualRideSlice";
import { fetchAllRiders } from "../../../api/slices/dashboardSlice";
import AdminLayout from "../layout/AdminLayout";
import LoadingScreen from "../../../LoadingScreen";

const ViewManualRide = () => {
  const { trackingId } = useParams<{ trackingId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { currentRide, loading } = useSelector(
    (state: RootState) => state.manualRide || {}
  );
  const { riders = [] } = useSelector(
    (state: RootState) => state.dashboard || {}
  );

  const [selectedRiderId, setSelectedRiderId] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [pendingRiderId, setPendingRiderId] = useState<string | undefined>(
    undefined
  );
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    if (trackingId) dispatch(getManualRide(trackingId));
    dispatch(fetchAllRiders());
    return ;
  }, [dispatch, trackingId]);

  const openConfirmModal = (
    action: string,
    message: string,
    riderId?: string
  ) => {
    setPendingAction(action);
    setPendingRiderId(riderId);
    setConfirmMessage(message);
    setShowConfirmModal(true);
  };

  const handleConfirmedAction = async () => {
    if (!pendingAction || !currentRide?._id) return;

    setShowConfirmModal(false);
    setActionLoading(true);

    try {
      await dispatch(
        updateRideStatus({
          id: currentRide._id,
          action: pendingAction,
          riderId: pendingRiderId,
        })
      ).unwrap();

      dispatch(getManualRide(trackingId!));
      setSelectedRiderId("");
    } catch (err: any) {
      alert(err?.message || "Action failed");
    } finally {
      setActionLoading(false);
      setPendingAction(null);
      setPendingRiderId(undefined);
    }
  };

  const cancelModal = () => {
    setShowConfirmModal(false);
    setPendingAction(null);
    setPendingRiderId(undefined);
  };

  if (loading)
    return (
      <AdminLayout>
        <LoadingScreen />
      </AdminLayout>
    );

  if (!currentRide) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-2xl font-bold">Ride not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 text-[#FF0000] font-medium"
          >
            ← Go Back
          </button>
        </div>
      </AdminLayout>
    );
  }

  const isAccepted = currentRide.acceptRide === true;
  const isHub = currentRide.isHub === true;
  const isStarted = currentRide.startRide?.isStarted === true;
  const isEnded = currentRide.endRide?.isEnded === true;
  const isCancelled = currentRide.cancelRide?.isCancelled === true;
  const isAwaiting = currentRide.isAwaiting === true;

  const status = isCancelled
    ? "Cancelled"
    : isEnded
    ? "Completed"
    : isStarted
    ? "In Transit"
    : isHub
    ? "At Hub"
    : isAwaiting
    ? "Awaiting"
    : isAccepted
    ? "Accepted"
    : "Pending";

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-600";
      case "In Transit":
        return "bg-blue-50 text-blue-600";
      case "Accepted":
        return "bg-red-50 text-[#FF0000]";
      case "At Hub":
        return "bg-indigo-50 text-indigo-600";
      case "Awaiting":
        return "bg-purple-50 text-purple-600";
      case "Cancelled":
        return "bg-gray-100 text-gray-500";
      default:
        return "bg-orange-50 text-orange-600";
    }
  };

  const canCancel = !isEnded && !isCancelled;

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-gray-500 hover:text-black font-medium"
        >
          <FiArrowLeft /> Back to Manual Dispatch
        </button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="p-12 border-b bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <h1 className="text-4xl font-black tracking-tighter">
                  Ride #{currentRide.trackingId?.slice(0, 8)}
                </h1>
                <p className="text-gray-500 mt-1 font-medium">
                  {currentRide.trackingId}
                </p>
              </div>
              <div className="text-right">
                <div
                  className={`inline-block px-6 py-2 rounded-full font-black text-sm uppercase ${getStatusStyle(
                    status
                  )}`}
                >
                  {status}
                </div>
                <p className="text-5xl font-black text-[#FF0000] mt-4">
                  ₦{currentRide.totalPrice?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="border-b px-12 py-6 bg-gray-50 flex flex-wrap gap-4">
            {/* Accept & Assign Rider */}
            {!isAccepted &&
              !isHub &&
              !isStarted &&
              !isEnded &&
              !isCancelled && (
                <div className="flex items-center gap-3">
                  <select
                    value={selectedRiderId}
                    onChange={(e) => setSelectedRiderId(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-[#FF0000] outline-none min-w-[240px]"
                  >
                    <option value="">Select Rider</option>
                    {riders.map((rider: any) => (
                      <option key={rider._id} value={rider._id}>
                        {rider.firstName} {rider.lastName} •{" "}
                        {rider.plateNumber || "No Plate"}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() =>
                      openConfirmModal(
                        "accept",
                        "Are you sure you want to accept this ride and assign the selected rider?",
                        selectedRiderId
                      )
                    }
                    disabled={!selectedRiderId || actionLoading}
                    className="bg-[#FF0000] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 disabled:opacity-60"
                  >
                    <FiUserPlus /> Accept & Assign Rider
                  </button>
                </div>
              )}

            {/* Mark as Awaiting */}
            {!isStarted && !isEnded && !isCancelled && (
              <button
                onClick={() =>
                  openConfirmModal("awaiting", "Mark this ride as Awaiting?")
                }
                disabled={actionLoading}
                className="border-2 border-purple-600 text-purple-700 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 disabled:opacity-60 flex items-center gap-2"
              >
                <FiPause /> Mark as Awaiting
              </button>
            )}

            {/* Send to Hub */}
            {isAccepted && !isHub && !isStarted && !isEnded && !isCancelled && (
              <button
                onClick={() =>
                  openConfirmModal("send-to-hub", "Send this ride to Hub?")
                }
                disabled={actionLoading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-60"
              >
                <FiTruck /> Send to Hub
              </button>
            )}

            {/* Start Ride */}
            {(isAccepted || isHub || isAwaiting) &&
              !isStarted &&
              !isEnded &&
              !isCancelled && (
                <button
                  onClick={() =>
                    openConfirmModal("start", "Start this ride now?")
                  }
                  disabled={actionLoading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 disabled:opacity-60"
                >
                  <FiPlay /> Start Ride
                </button>
              )}

            {/* End Ride */}
            {isStarted && !isEnded && !isCancelled && (
              <button
                onClick={() =>
                  openConfirmModal(
                    "end",
                    "End this ride? This action cannot be undone."
                  )
                }
                disabled={actionLoading}
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 disabled:opacity-60"
              >
                <FiStopCircle /> End Ride
              </button>
            )}

            {/* Cancel Ride */}
            {canCancel && (
              <button
                onClick={() =>
                  openConfirmModal(
                    "cancel",
                    "Cancel this ride? This action cannot be undone."
                  )
                }
                disabled={actionLoading}
                className="bg-gray-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 disabled:opacity-60"
              >
                <FiXCircle /> Cancel Ride
              </button>
            )}
          </div>

          {/* Main Content (same as before) */}
          <div className="p-12 grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-10">
              <div>
                <h3 className="uppercase tracking-widest text-xs font-black text-gray-400 mb-6 flex items-center gap-2">
                  <FiNavigation size={18} /> Route Information
                </h3>
                {/* Route content remains unchanged */}
                <div className="space-y-12 pl-8 border-l-4 border-gray-100">
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase">
                      PICKUP LOCATION
                    </p>
                    <p className="font-bold text-lg mt-3 leading-tight">
                      {currentRide.pickup?.pickupAddress}
                    </p>
                    <p className="text-[#FF0000] font-mono text-sm mt-1">
                      CODE: {currentRide.pickup?.pickupCode}
                    </p>
                  </div>

                  {currentRide.deliveryDropoff?.map((drop: any, i: number) => (
                    <div key={i}>
                      <p className="text-xs font-black text-[#FF0000] uppercase">
                        DROPOFF {i + 1}
                      </p>
                      <p className="font-bold text-lg mt-3 leading-tight">
                        {drop.deliveryAddress}
                      </p>
                      <div className="mt-6 p-6 bg-gray-50 rounded-3xl">
                        <div className="flex items-start gap-4">
                          <FiUser className="mt-1 text-gray-400" />
                          <div>
                            <p className="font-semibold">{drop.receiverName}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <FiPhone /> {drop.receiverPhoneNumber}
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 pt-5 border-t border-gray-200">
                          <p className="text-xs uppercase font-black text-gray-400 mb-2">
                            Parcel ID
                          </p>
                          <p className="font-mono font-bold">{drop.parcelId}</p>
                        </div>
                        {drop.items?.length > 0 && (
                          <div className="mt-5">
                            <p className="text-xs uppercase font-black text-gray-400 mb-3">
                              Items
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {drop.items.map((item: any, idx: number) => (
                                <span
                                  key={idx}
                                  className="bg-white px-4 py-2 rounded-2xl text-sm font-medium"
                                >
                                  {item.itemName}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Details (unchanged) */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="uppercase tracking-widest text-xs font-black text-gray-400 mb-4 flex items-center gap-2">
                  <FiUser /> Customer
                </h3>
                <div className="bg-gray-50 p-6 rounded-3xl">
                  <p className="font-black text-2xl capitalize">
                    {currentRide.customer?.firstName}{" "}
                    {currentRide.customer?.lastName}
                  </p>
                  <p className="text-gray-600 mt-1">
                    {currentRide.customer?.email}
                  </p>
                  <p className="font-mono text-sm mt-3">
                    {currentRide.customer?.phoneNumber}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="uppercase tracking-widest text-xs font-black text-gray-400 mb-4">
                  Payment
                </h3>
                <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs uppercase font-black">Status</p>
                      <p
                        className={`font-bold ${
                          currentRide.paid?.isPaid
                            ? "text-emerald-600"
                            : "text-orange-600"
                        }`}
                      >
                        {currentRide.paid?.isPaid ? "PAID" : "PENDING"}
                      </p>
                    </div>
                    <FiCreditCard className="text-3xl" />
                  </div>
                  <p className="text-3xl font-black mt-4">
                    ₦{currentRide.totalPrice?.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="uppercase tracking-widest text-xs font-black text-gray-400 mb-4 flex items-center gap-2">
                  <FiClock /> Timeline
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created</span>
                    <span className="font-medium">
                      {new Date(currentRide.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Updated</span>
                    <span className="font-medium">
                      {new Date(currentRide.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4">Confirm Action</h3>
              <p className="text-gray-600 mb-8">{confirmMessage}</p>

              <div className="flex gap-4">
                <button
                  onClick={cancelModal}
                  className="flex-1 py-4 border border-gray-300 rounded-2xl font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmedAction}
                  disabled={actionLoading}
                  className="flex-1 py-4 bg-[#FF0000] text-white rounded-2xl font-bold hover:bg-red-600 disabled:opacity-70"
                >
                  {actionLoading ? "Processing..." : "Yes, Confirm"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default ViewManualRide;
