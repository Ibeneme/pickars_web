"use client";

/**
 * Pickars Courier Limited – Completed Logistics & Settlement
 * Place at: app/investors/dashboard/rides/page.tsx
 */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/api/store";
import { fetchPaidAndEndedRides } from "@/api/slices/investors/auth.investor.slice";
import {
  CheckCircle2,
  Download,
  Filter,
  Search,
  Calendar,
  ArrowUpDown,
} from "lucide-react";

export default function InvestorRidesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { paidAndEndedRides, loading } = useSelector(
    (state: RootState) => state.investor
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    dispatch(fetchPaidAndEndedRides());
  }, [dispatch]);

  // 1. Filter rides from July 2026 onwards (YYYY-MM >= '2026-07')
  const validRides = (paidAndEndedRides || []).filter((ride: any) => {
    const rideDateStr = ride.date || "";
    return rideDateStr >= "2026-07";
  });

  // Extract unique available months for the month filter dropdown
  const availableMonths = Array.from(
    new Set(validRides.map((r: any) => r.date?.substring(0, 7)).filter(Boolean))
  )
    .sort()
    .reverse();

  // 2. Apply search query & month filter
  const filteredRides = validRides.filter((ride: any) => {
    const rideDateStr = ride.date || "";
    const matchesMonth =
      selectedMonth === "all" || rideDateStr.startsWith(selectedMonth);
    const matchesSearch =
      rideDateStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.paid?.toString().includes(searchQuery);

    return matchesMonth && matchesSearch;
  });

  // Group filtered rides by month (YYYY-MM)
  const groupedByMonth = filteredRides.reduce(
    (acc: Record<string, any[]>, ride: any) => {
      const monthKey = ride.date?.substring(0, 7) || "Unknown";
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(ride);
      return acc;
    },
    {}
  );

  const sortedMonthKeys = Object.keys(groupedByMonth).sort().reverse();

  const totalRidesCount = filteredRides.length;
  const totalRevenueProcessed = filteredRides.reduce(
    (acc: number, r: any) => acc + (Number(r.paid) || 0),
    0
  );

  // Function to download ALL valid records (July 2026+) as CSV
  function handleDownloadAllCSV() {
    setDownloading(true);
    try {
      const headers = ["Date & Time", "Ride Total (NGN)", "Status"];
      const rows = validRides.map((r: any) => [
        `"${r.date || ""}"`,
        r.paid ?? 0,
        `"Paid & Completed"`,
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((e: any[]) => e.join(","))].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `pickars_settlements_july_2026_onwards.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Fallback silently if download fails
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  }

  // Format YYYY-MM into readable label (e.g. "July 2026")
  function formatMonthLabel(monthStr: string) {
    if (!monthStr || monthStr === "Unknown") return "Other Dates";
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  return (
    <div className="rounded-[2rem] bg-white p-6 sm:p-8 text-neutral-900 border border-neutral-200/80">
      {/* ============ Header ============ */}
      <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-block rounded border border-neutral-300 bg-neutral-50 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-neutral-600">
            Logistics & Settlement Registry
          </span>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-neutral-400 sm:text-5xl">
            Completed Logistics <br />
            <span className="text-black">&amp; Settlement</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg">
            Reviewing fully paid and successfully concluded delivery trips from
            July 2026 onwards, grouped by month with active red primary
            highlights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadAllCSV}
            disabled={downloading || validRides.length === 0}
            className="inline-flex items-center gap-2 rounded-full bg-[#ff0000] py-3 px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0000] disabled:opacity-60"
          >
            {downloading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Download size={16} aria-hidden />
            )}
            {downloading ? "Preparing CSV..." : "Download All Records (CSV)"}
          </button>
        </div>
      </header>

      {/* ============ Summary Cards (Shadowless) ============ */}
      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-[2rem] border border-neutral-200/80 bg-[#fafafa] p-6">
          <p className="text-xs text-neutral-400">
            Total Concluded Trips (July 2026+)
          </p>
          <p className="mt-2 text-3xl font-medium tracking-tight text-black">
            {totalRidesCount}
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            Verified paid delivery orders
          </p>
        </div>
        <div className="rounded-[2rem] border border-neutral-200/80 bg-black p-6 text-white">
          <p className="text-xs text-white/60">Total Value Processed</p>
          <p className="mt-2 text-3xl font-medium tracking-tight text-[#ff0000]">
            ₦{totalRevenueProcessed.toLocaleString()}
          </p>
          <p className="mt-2 text-xs text-white/60">
            Gross customer delivery fees
          </p>
        </div>
      </section>

      {/* ============ Search & Month Filter Bar ============ */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by date or amount (e.g. 2026-07-15)..."
            className="w-full rounded-full border border-neutral-200/80 bg-[#fafafa] py-3 pl-11 pr-5 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Month Filter Dropdown */}
          <div className="flex items-center gap-2 rounded-full border border-neutral-200/80 bg-[#fafafa] px-4 py-2.5">
            <Calendar size={15} className="text-[#ff0000]" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              aria-label="Filter by month"
              className="bg-transparent text-xs font-medium text-neutral-800 focus:outline-none cursor-pointer"
            >
              <option value="all">All Months (July 2026+)</option>
              {availableMonths.map((m) => (
                <option key={m} value={m}>
                  {formatMonthLabel(m)}
                </option>
              ))}
            </select>
          </div>

          <span className="flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-white px-4 py-2.5 text-xs font-medium text-neutral-600">
            <Filter size={13} className="text-[#ff0000]" />{" "}
            {filteredRides.length} records
          </span>
        </div>
      </div>

      {/* ============ Grouped Rides Tables by Month (Shadowless) ============ */}
      {loading ? (
        <div className="mt-6 rounded-[2rem] border border-neutral-200/80 bg-white py-16 text-center text-sm text-neutral-500">
          Loading settled delivery trips...
        </div>
      ) : filteredRides.length === 0 ? (
        <div className="mt-6 rounded-[2rem] border border-neutral-200/80 bg-white py-16 text-center text-sm text-neutral-500">
          No matching logistics settlement records found for the selected
          filter.
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {sortedMonthKeys.map((monthKey) => {
            const monthRides = groupedByMonth[monthKey];
            const monthTotalValue = monthRides.reduce(
              (acc: number, r: any) => acc + (Number(r.paid) || 0),
              0
            );

            return (
              <div key={monthKey} className="space-y-4">
                {/* Month Group Header Banner */}
                <div className="flex items-center justify-between rounded-2xl bg-neutral-900 px-6 py-4 text-white">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#ff0000]">
                      <Calendar size={18} />
                    </span>
                    <div>
                      <h3 className="font-medium tracking-tight text-base sm:text-lg">
                        {formatMonthLabel(monthKey)}
                      </h3>
                      <p className="text-xs text-white/60">
                        {monthRides.length} completed trip
                        {monthRides.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60">Monthly Volume</p>
                    <p className="text-lg font-medium text-[#b9f03a]">
                      ₦{monthTotalValue.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Table for this month (Shadowless) */}
                <div className="overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-[#fafafa] border-b border-neutral-200/80 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                          <th className="px-8 py-4">
                            <span className="inline-flex items-center gap-1.5">
                              Date &amp; Time <ArrowUpDown size={12} />
                            </span>
                          </th>
                          <th className="px-8 py-4">Ride Total</th>
                          <th className="px-8 py-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {monthRides.map((ride: any, index: number) => (
                          <tr
                            key={index}
                            className="transition-colors hover:bg-neutral-50/60"
                          >
                            <td className="px-8 py-4 text-sm font-medium text-neutral-900">
                              {ride.date}
                            </td>
                            <td className="px-8 py-4 text-sm font-semibold text-[#ff0000]">
                              ₦{ride.paid?.toLocaleString()}
                            </td>
                            <td className="px-8 py-4 text-right">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                                <CheckCircle2 size={13} /> Paid &amp; Completed
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============ Footer ============ */}
      <footer className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 text-xs text-neutral-400 sm:flex-row">
        <p>
          © 2026 Pickars Courier Limited · Company No. RC - 8559727. Built &amp;
          powered by Boring Thinkers Limited.
        </p>
        <span className="flex items-center gap-1.5 font-medium text-emerald-600">
          <CheckCircle2 size={13} aria-hidden /> Real-time settlement sync
          active
        </span>
      </footer>
    </div>
  );
}
