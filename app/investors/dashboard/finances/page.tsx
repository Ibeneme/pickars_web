"use client";

/**
 * Pickars – Investor Finances & Payout Summary
 * Place at: app/investors/dashboard/finances/page.tsx
 */

import { useEffect, useState, useRef, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/api/store";
import {
  fetchCompanyExpenses,
  fetchFinancialSummary,
  fetchInvestorProfile,
} from "@/api/slices/investors/auth.investor.slice";
import { Calendar, Check, ChevronDown } from "lucide-react";

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const naira = (n: number) => `₦${Math.round(n || 0).toLocaleString()}`;

const SOFT = " border border-neutral-200/60";

export default function InvestorFinancesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { investor, expenses, financialSummary, loading } = useSelector(
    (state: RootState) => state.investor
  );

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Custom dropdown state
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMonthOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (investor?.phone && !investor?._id) {
      dispatch(fetchInvestorProfile(investor.phone));
    }
  }, [dispatch, investor?.phone, investor?._id]);

  useEffect(() => {
    dispatch(
      fetchCompanyExpenses({ year: selectedYear, month: selectedMonth })
    );
    const investorId = investor?._id || investor?.id;
    if (investorId) {
      dispatch(
        fetchFinancialSummary({
          year: selectedYear,
          month: selectedMonth,
          investorId,
        })
      );
    }
  }, [dispatch, selectedYear, selectedMonth, investor?._id, investor?.id]);

  const pending = Boolean(loading) && !financialSummary;
  const share = investor?.investorShare || 0;

  const currentMonthName =
    MONTHS.find((m) => m.value === selectedMonth)?.label || "Month";

  return (
    <div className="rounded-[2rem] bg-white p-5 font-['Lufga',sans-serif] text-neutral-900 sm:p-8 lg:p-10 border border-neutral-100">
      {/* ============ Header & Filter Controls ============ */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-neutral-400 sm:text-4xl">
            Finances & <span className="text-black">Payouts</span>
          </h1>
          <p className="mt-1.5 text-base text-neutral-500">
            Inspect monthly revenue, operational costs, and equity returns.
          </p>
        </div>

        {/* Date Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Custom Month Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsMonthOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-semibold text-black cursor-pointer hover:bg-neutral-100 transition-colors"
            >
              <Calendar size={15} className="text-neutral-500" />
              <span>{currentMonthName}</span>
              <ChevronDown
                size={14}
                className={`text-neutral-500 transition-transform duration-200 ${
                  isMonthOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMonthOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-2xl bg-white p-2 shadow-xl border border-neutral-100 z-50 max-h-60 overflow-y-auto">
                <div className="space-y-0.5">
                  {MONTHS.map((m) => {
                    const isSelected = m.value === selectedMonth;
                    return (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => {
                          setSelectedMonth(m.value);
                          setIsMonthOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                          isSelected
                            ? "bg-black text-white"
                            : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                        }`}
                      >
                        <span>{m.label}</span>
                        {isSelected && (
                          <Check size={14} className="text-red-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-24 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-center text-sm font-semibold text-black outline-none"
          />
        </div>
      </header>

      {/* ============ Financial Summary Cards ============ */}
      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className={`rounded-3xl bg-neutral-50 p-6 border border-neutral-200 ${SOFT}`}
        >
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            Gross Income
          </p>
          <h4 className="text-3xl font-medium tracking-tight text-black">
            <Val pending={pending}>{naira(financialSummary?.totalIncome)}</Val>
          </h4>
          <p className="mt-2 text-xs text-neutral-500">
            {currentMonthName} deliveries
          </p>
        </div>

        <div
          className={`rounded-3xl bg-neutral-50 p-6 border border-neutral-200 ${SOFT}`}
        >
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            Total Expenses
          </p>
          <h4 className="text-3xl font-medium tracking-tight text-red-600">
            <Val pending={pending}>
              {naira(financialSummary?.totalExpenses)}
            </Val>
          </h4>
          <p className="mt-2 text-xs text-neutral-500">
            Operations & Logistics
          </p>
        </div>

        <div
          className={`rounded-3xl bg-neutral-50 p-6 border border-neutral-200 ${SOFT}`}
        >
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            Net Balance
          </p>
          <h4 className="text-3xl font-medium tracking-tight text-black">
            <Val pending={pending}>{naira(financialSummary?.totalBalance)}</Val>
          </h4>
          <p className="mt-2 text-xs text-neutral-500">Gross less expenses</p>
        </div>

        <div className={`rounded-3xl bg-black p-6 text-white ${SOFT}`}>
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            Your Dividend ({share}%)
          </p>
          <h4 className="text-3xl font-medium tracking-tight text-red-500">
            <Val pending={pending}>
              {naira(financialSummary?.investor?.payout)}
            </Val>
          </h4>
          <p className="mt-2 text-xs text-neutral-400">Equity share payout</p>
        </div>
      </section>

      {/* ============ Expenses Table Breakdown ============ */}
      <section className="mt-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-medium tracking-tight">
              Company Expenses Log
            </h3>
            <p className="text-sm text-neutral-500">
              Expenditures recorded for {currentMonthName} {selectedYear}
            </p>
          </div>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
            {expenses.length} Records
          </span>
        </div>

        <div
          className={`overflow-hidden rounded-3xl bg-white border border-neutral-200 ${SOFT}`}
        >
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {expenses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-neutral-400"
                    >
                      No expense records found for this period.
                    </td>
                  </tr>
                ) : (
                  expenses.map((exp: any) => (
                    <tr
                      key={exp._id}
                      className="hover:bg-neutral-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-black">
                        {exp.title}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-neutral-500">
                        {exp.category || "General"}
                      </td>
                      <td className="px-6 py-4 font-semibold text-red-600">
                        ₦{exp.amount?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-xs text-neutral-500 text-right">
                        {exp.notes || "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function Val({ pending, children }: { pending: boolean; children: ReactNode }) {
  if (pending) {
    return (
      <span
        aria-busy
        className="inline-block h-[0.8em] w-24 animate-pulse rounded-md bg-black/10 align-middle"
      />
    );
  }
  return <>{children}</>;
}
