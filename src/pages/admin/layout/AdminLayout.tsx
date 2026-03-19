import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPieChart,
  FiUsers,
  FiTruck,
  FiMap,
  FiCreditCard,
  FiLogOut,
  FiMenu,
  FiShield,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../api/store";
import { logoutAdmin } from "../../../api/slices/adminSlice";
import { SlEnvolopeLetter } from "react-icons/sl";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const menuItems = [
    { name: "Overview", path: "/app/admin/dashboard", icon: <FiPieChart /> },
    { name: "Users", path: "/app/admin/users", icon: <FiUsers /> },
    { name: "Riders", path: "/app/admin/riders", icon: <FiTruck /> },
    { name: "Rides", path: "/app/admin/rides", icon: <FiMap /> },
    { name: "Payments", path: "/app/admin/payments", icon: <FiCreditCard /> },
    { name: "Marketing", path: "/app/admin/marketing", icon: <SlEnvolopeLetter /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-['Lufga',sans-serif]">
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A0A0A] text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:inset-0`}
      >
        <div className="h-full flex flex-col p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-10 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
              <FiShield className="text-white" size={22} />
            </div>
            <span className="font-black tracking-[0.2em] text-xs">
              PICKARS ADMIN
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                      isActive
                        ? "bg-[#FF0000] text-white shadow-lg shadow-red-600/20"
                        : "text-gray-500 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={() => dispatch(logoutAdmin())}
            className="flex items-center gap-4 px-6 py-4 mt-auto rounded-2xl font-bold text-sm text-gray-500 hover:text-[#FF0000] transition-colors"
          >
            <FiLogOut className="text-lg" /> Logout
          </button>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-30">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 text-gray-600"
          >
            <FiMenu size={24} />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-gray-400 font-bold text-xs uppercase tracking-widest">
              System Status: <span className="text-green-500">Live</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-[#0A0A0A]">
                Operations Lead
              </p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">
                Super Admin
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=FF0000&color=fff"
                alt="avatar"
              />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 lg:p-12 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
