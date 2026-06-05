import { useEffect, useState, useMemo } from "react";
import {
  FiSearch,
  FiPlus,
  FiEye,
  FiTrash2,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type AppDispatch, type RootState } from "../../../api/store";
import {
  getAllManualRides,
  deleteRideRequest,
} from "../../../api/slices/manualRideSlice";
import AdminLayout from "../layout/AdminLayout";
import LoadingScreen from "../../../LoadingScreen";

const ManualRideDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const manualRide = useSelector((state: RootState) => state.manualRide);
  const { allRides = [], rideCount = 0, loading = false } = manualRide || {};

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllManualRides());
  }, [dispatch]);

  // Status Counts
  const statusCounts = useMemo(() => {
    const counts = {
      Pending: 0,
      Awaiting: 0,
      Accepted: 0,
      "In Transit": 0,
      Completed: 0,
      Cancelled: 0,
    };

    allRides.forEach((ride: any) => {
      let status = "Pending";
      if (ride?.cancelRide?.isCancelled) status = "Cancelled";
      else if (ride?.endRide?.isEnded) status = "Completed";
      else if (ride?.startRide?.isStarted) status = "In Transit";
      else if (ride?.acceptRide) status = "Accepted";
      else if (ride?.isManual && !ride?.acceptRide) status = "Awaiting"; // New status

      if (counts[status as keyof typeof counts] !== undefined) {
        counts[status as keyof typeof counts]++;
      } else {
        counts.Pending++;
      }
    });

    return counts;
  }, [allRides]);

  const getStatus = (ride: any) => {
    if (ride?.cancelRide?.isCancelled)
      return { label: "Cancelled", color: "text-gray-400", bg: "bg-gray-100" };
    if (ride?.endRide?.isEnded)
      return {
        label: "Completed",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      };
    if (ride?.startRide?.isStarted)
      return { label: "In Transit", color: "text-blue-500", bg: "bg-blue-50" };
    if (ride?.acceptRide)
      return { label: "Accepted", color: "text-[#FF0000]", bg: "bg-red-50" };
    if (ride?.isAwaiting)
      return {
        label: "Awaiting",
        color: "text-purple-600",
        bg: "bg-purple-50",
      };

    return { label: "Pending", color: "text-orange-500", bg: "bg-orange-50" };
  };

  const filteredRides = allRides.filter(
    (r: any) =>
      r.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customer?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customer?.phoneNumber?.includes(searchTerm)
  );

  const handleViewRide = (ride: any) => {
    if (ride?.trackingId) {
      navigate(`/admin/manual-rides/${ride.trackingId}`);
    }
  };

  const handleDeleteRide = (id: string) => {
    if (window.confirm("Are you sure you want to delete this ride?")) {
      dispatch(deleteRideRequest(id));
    }
  };

  return (
    <AdminLayout>
      {loading && allRides.length === 0 ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col gap-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-[#0A0A0A] tracking-tighter">
                Manual Booking Dispatch
              </h1>
              <p className="text-gray-400 font-bold">
                Manage {rideCount} manual rides
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group w-full md:w-80">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Tracking ID or Customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-2 border-transparent focus:border-red-500/10 py-4 pl-12 pr-6 rounded-2xl outline-none font-bold text-sm shadow-sm"
                />
              </div>

              <button
                onClick={() => navigate("/admin/manual-rides/create")}
                className="flex items-center gap-3 bg-[#FF0000] hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95"
              >
                <FiPlus size={20} />
                NEW MANUAL RIDE
              </button>
            </div>
          </header>

          {/* Status Counts */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div
                key={status}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                  {status}
                </p>
                <p className="text-4xl font-black text-[#0A0A0A] mt-2">
                  {count}
                </p>
              </div>
            ))}
          </div>

          {/* Table */}
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
                      Route
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Status
                    </th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredRides.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-8 py-16 text-center text-gray-400 font-bold"
                      >
                        No manual rides found
                      </td>
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
                            <span className="font-black text-[#0A0A0A]">
                              #{ride.trackingId?.slice(0, 8)}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <p className="font-black capitalize">
                              {ride.customer?.firstName}{" "}
                              {ride.customer?.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {ride.customer?.phoneNumber}
                            </p>
                          </td>
                          <td className="px-8 py-5 text-sm text-gray-600 line-clamp-1">
                            {ride.pickup?.pickupAddress?.slice(0, 45)}... →{" "}
                            {ride.deliveryDropoff?.[0]?.deliveryAddress?.slice(
                              0,
                              45
                            )}
                          </td>
                          <td className="px-8 py-5">
                            <span
                              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase ${status.bg} ${status.color}`}
                            >
                              {status.label}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right flex gap-2 justify-end">
                            <button
                              onClick={() => handleViewRide(ride)}
                              className="p-3 bg-gray-50 hover:bg-[#FF0000] hover:text-white rounded-xl transition-all"
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteRide(ride._id)}
                              className="p-3 bg-gray-50 hover:bg-red-100 hover:text-red-600 rounded-xl transition-all"
                            >
                              <FiTrash2 size={18} />
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
      )}
    </AdminLayout>
  );
};

export default ManualRideDispatch;
