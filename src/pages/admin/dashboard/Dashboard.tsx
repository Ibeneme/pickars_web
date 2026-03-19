import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiTruck,
  FiMap,
  FiActivity,
  FiZap,
  FiArrowUpRight,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { type AppDispatch, type RootState } from "../../../api/store";
import { fetchDashboardStats } from "../../../api/slices/dashboardSlice";
import AdminLayout from "../layout/AdminLayout";
import LoadingScreen from "../../../LoadingScreen";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, chartData, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // 🔥 Transform backend arrays [1,2,3] and [labels] into Recharts format [{name: label, val: 1}]
  const formattedChartData = useMemo(() => {
    if (!chartData) return [];
    return chartData.labels.map((label, index) => ({
      name: new Date(label).toLocaleDateString("en-US", { weekday: "short" }),
      revenue: chartData.revenueData[index],
      rides: chartData.ridesData[index],
    }));
  }, [chartData]);

  const distributionData = [
    { name: "Users", value: stats?.users || 0 },
    { name: "Riders", value: stats?.riders || 0 },
  ];

  const COLORS = ["#0A0A0A", "#FF0000"];

  const cards = [
    {
      label: "Active Users",
      val: stats?.users,
      icon: <FiUsers />,
      color: "text-blue-600",
    },
    {
      label: "Total Riders",
      val: stats?.riders,
      icon: <FiTruck />,
      color: "text-emerald-500",
    },
    {
      label: "Total Rides",
      val: stats?.rides,
      icon: <FiMap />,
      color: "text-[#FF0000]",
    },
    {
      label: "Total Revenue",
      val: `₦${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: <FiActivity />,
      color: "text-orange-500",
    },
  ];
  if (loading) {
    <LoadingScreen />;
  }
  return (
    <AdminLayout>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <header className="mb-10 flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-black text-[#0A0A0A] tracking-tighter">
                Overview
              </h1>
              <p className="text-gray-400 font-bold">
                Live platform data from the last 7 days.
              </p>
            </div>
            <div className="bg-red-50 text-[#FF0000] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <FiZap className="animate-pulse" /> Live Aggregation
            </div>
          </header>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={card.label}
                className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gray-50 ${card.color} flex items-center justify-center mb-6 text-xl`}
                >
                  {card.icon}
                </div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  {card.label}
                </p>
                <h3 className="text-3xl font-black text-[#0A0A0A] tracking-tighter mt-1">
                  {loading ? "..." : card.val}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* CHARTS */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* REVENUE AREA CHART */}
            <div className="lg:col-span-2 bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
              <div className="mb-8 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-[#0A0A0A]">
                    Revenue Growth
                  </h3>
                  <p className="text-xs text-gray-400 font-bold">
                    Daily Paystack Settlements
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#FF0000] font-black text-xs">
                  <FiArrowUpRight /> Active
                </div>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={formattedChartData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#FF0000"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#FF0000"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f3f3"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 800 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ stroke: "#FF0000", strokeWidth: 2 }}
                      contentStyle={{
                        borderRadius: "20px",
                        border: "none",
                        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#FF0000"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* DISTRIBUTION PIE */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-[#0A0A0A] text-center mb-8">
                User Ratios
              </h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distributionData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-3">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Total Users
                  </span>
                  <span className="font-black text-[#0A0A0A]">
                    {stats?.users}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF0000]">
                    Total Riders
                  </span>
                  <span className="font-black text-[#FF0000]">
                    {stats?.riders}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY PLACEHOLDER */}
          <div className="mt-8 bg-[#0A0A0A] rounded-[40px] p-10 text-white flex items-center justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0000] rounded-full blur-[100px] opacity-20" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black tracking-tighter">
                Ready for Payouts?
              </h3>
              <p className="text-gray-500 font-bold text-sm mt-1">
                Total Rider Earnings:{" "}
                <span className="text-white">
                  ₦{(stats?.totalRiderEarnings || 0).toLocaleString()}
                </span>
              </p>
            </div>
            <button className="relative z-10 px-10 py-5 bg-[#FF0000] text-white rounded-2xl font-black text-sm shadow-xl shadow-red-600/20 hover:scale-105 transition-all">
              Disburse Earnings
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
