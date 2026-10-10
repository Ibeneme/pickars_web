"use client";

/**
 * Pickars – Investor overview
 * Place at: app/investors/dashboard/dashboard/page.tsx
 */

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/api/store";
import {
  fetchRideStats,
  fetchInvestorProfile,
} from "@/api/slices/investors/auth.investor.slice";
import {
  ArrowDownUp,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  Package,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

const BASE = "/investors/dashboard";

type PeriodKey = "today" | "sevenDays" | "oneMonth";

const PERIODS: { key: PeriodKey; tab: string; name: string; unit: string }[] = [
  { key: "today", tab: "Today", name: "Today", unit: "today" },
  { key: "sevenDays", tab: "7 days", name: "Past 7 days", unit: "7 days" },
  { key: "oneMonth", tab: "Month", name: "This month", unit: "month" },
];

const naira = (n: number) => `₦${Math.round(n).toLocaleString()}`;

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

/* ------------------------------------------------------------------ */

export default function InvestorOverviewPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { investor, rideStats, loading } = useSelector(
    (state: RootState) => state.investor
  );

  const [now, setNow] = useState<Date | null>(null);
  const [panelPeriod, setPanelPeriod] = useState<PeriodKey>("today");
  const [barMetric, setBarMetric] = useState<"count" | "amount">("count");

  useEffect(() => {
    setNow(new Date());
  }, []);

  useEffect(() => {
    if (investor?.phone) {
      dispatch(fetchInvestorProfile(investor.phone));
    }
    dispatch(fetchRideStats());
  }, [dispatch, investor?.phone]);

  const pending = Boolean(loading) && !rideStats;

  const get = (k: PeriodKey) => ({
    count: rideStats?.[k]?.count || 0,
    amount: rideStats?.[k]?.totalAmount || 0,
  });
  const today = get("today");
  const seven = get("sevenDays");
  const month = get("oneMonth");
  const share = investor?.investorShare || 0;
  const avg = (p: { count: number; amount: number }) =>
    p.count > 0 ? p.amount / p.count : 0;

  const hour = now?.getHours();
  const greeting =
    hour === undefined
      ? "Welcome back"
      : hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : "Good evening";
  const dateLabel = now
    ? now.toLocaleDateString("en-GB", { day: "numeric", month: "long" })
    : "Today";
  const firstName = (investor?.name || "Investor");

  const panelStats = get(panelPeriod);
  const barValues = PERIODS.map((p) => ({
    ...p,
    value: get(p.key)[barMetric],
  }));
  const barMax = Math.max(...barValues.map((b) => b.value), 1);

  return (
    <div className="rounded-[2rem] border border-neutral-200/80 bg-white p-6 sm:p-8 text-neutral-900 ">
      {/* ============ 1. Greeting ============ */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-neutral-400 sm:text-4xl">
            {greeting},{" "}
            <span className="text-black">
              {firstName}{" "}
      
            </span>
          </h1>
          <p className="mt-1.5 text-base text-neutral-500">
            What would you like to do today?
          </p>
        </div>

        <div className="flex items-center gap-2.5 rounded-full border border-neutral-200/80 bg-white py-1.5 pl-1.5 pr-5 ">
          <span
            aria-hidden
            className="h-9 w-9 rounded-full bg-gradient-to-br from-lime-200 via-emerald-300 to-teal-400"
          />
          <span className="text-sm font-medium">
            {investor?.name || "Investor"}
          </span>
        </div>
      </header>

      {/* ============ 2. Schedule-style pill bar ============ */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 rounded-full bg-black py-2 pl-6 pr-2 text-white">
          <span className="text-base font-medium">Today's Date</span>
          <span className="flex items-center gap-2.5 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 text-sm">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
              <CalendarDays size={16} aria-hidden />
            </span>
            {dateLabel}
          </span>
        </div>

        <div className="flex items-center gap-4 rounded-full bg-[#b9f03a] py-2 pl-6 pr-2">
          <span className="text-sm font-semibold">
            <Val pending={pending}>{today.count}</Val> orders today
          </span>
          <span className="hidden text-sm text-black/60 sm:inline">
            <Val pending={pending}>{naira(today.amount)}</Val>
          </span>
          <Link
            href={`${BASE}/rides`}
            aria-label="Open logistics and rides"
            className={`grid h-10 w-10 place-items-center rounded-full bg-black/10 transition-colors hover:bg-black hover:text-white ${FOCUS}`}
          >
            <ArrowUpRight size={18} aria-hidden />
          </Link>
        </div>

        <div className="ml-auto flex items-baseline gap-2">
          <span className="text-5xl font-light tracking-tight sm:text-6xl">
            {share}
          </span>
          <span className="text-lg text-neutral-400">% equity</span>
        </div>
      </div>

      {/* ============ 3. Two-tone headline ============ */}
      <section className="mt-14 sm:mt-16">
        <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.08] tracking-tight text-neutral-400 sm:text-5xl lg:text-[4rem]">
          Deliveries moving,
          <br />
          revenue growing
          <br />
          behind your <span className="text-black">{share}% stake.</span>
        </h2>

        <Link
          href={`${BASE}/finances`}
          className={`mt-6 inline-flex items-center gap-3 text-base text-neutral-500 hover:text-black ${FOCUS}`}
        >
          <span>
            Open <span className="font-semibold text-black">finances</span>
          </span>
          <ArrowRight size={22} strokeWidth={1.25} aria-hidden />
        </Link>
      </section>

      {/* ============ 4. Stacked gradient action cards ============ */}
      <section
        aria-label="Order volume"
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <HeroCard
          tone="blue"
          icon={Package}
          count={today.count}
          pending={pending}
          title="Today's orders"
          blurb={`Total value ${naira(today.amount)}`}
          cta="View rides"
          href={`${BASE}/rides`}
        />
        <HeroCard
          tone="green"
          icon={TrendingUp}
          count={seven.count}
          pending={pending}
          title="Past 7 days"
          blurb={`Total value ${naira(seven.amount)}`}
          cta="View investments"
          href={`${BASE}/investments`}
        />
        <HeroCard
          tone="red"
          icon={Banknote}
          count={month.count}
          pending={pending}
          title="Monthly scope"
          blurb={`Revenue ${naira(month.amount)}`}
          cta="Finances & payouts"
          href={`${BASE}/finances`}
          className="sm:col-span-2 lg:col-span-1"
        />
      </section>

      {/* ============ 6. Panel + chart card ============ */}
      <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        {/* Bars */}
        <div className="rounded-[1.75rem] border border-neutral-200/80 bg-white p-6 ">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-medium">Volume at a glance</h3>
            <div
              role="tablist"
              aria-label="Metric"
              className="flex gap-1 rounded-full border border-neutral-200/60 bg-neutral-100 p-1 text-sm"
            >
              {(
                [
                  ["count", "Orders"],
                  ["amount", "Revenue"],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={barMetric === k}
                  onClick={() => setBarMetric(k)}
                  className={`relative rounded-full px-4 py-1.5 font-medium transition-colors ${FOCUS} ${
                    barMetric === k ? "text-black" : "text-neutral-400"
                  }`}
                >
                  {barMetric === k && (
                    <motion.span
                      layoutId="bar-metric"
                      className="absolute inset-0 rounded-full border border-neutral-200/80 bg-white "
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-8 space-y-6">
            {barValues.map((b) => (
              <li key={b.key}>
                <div className="mb-2 flex items-baseline justify-between text-sm">
                  <span className="text-neutral-500">{b.name}</span>
                  <span className="text-lg font-medium">
                    <Val pending={pending}>
                      {barMetric === "amount"
                        ? naira(b.value)
                        : b.value.toLocaleString()}
                    </Val>
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full border border-neutral-200/60 bg-neutral-100">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-600"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.max(
                        (b.value / barMax) * 100,
                        b.value ? 4 : 0
                      )}%`,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-neutral-100 pt-5">
            <p className="text-sm text-neutral-400">Average order this month</p>
            <p className="mt-1 text-2xl font-medium">
              <Val pending={pending}>{naira(avg(month))}</Val>
            </p>
          </div>
        </div>

        {/* Order-style panel */}
        <div className="overflow-hidden rounded-[1.75rem] border border-neutral-200/80 bg-white ">
          <div
            role="tablist"
            aria-label="Period"
            className="flex items-center gap-6 border-b border-neutral-100 px-6 pt-5"
          >
            {PERIODS.map((p) => (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={panelPeriod === p.key}
                onClick={() => setPanelPeriod(p.key)}
                className={`relative pb-4 text-lg transition-colors ${FOCUS} ${
                  panelPeriod === p.key
                    ? "font-medium text-black"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {p.tab}
                {panelPeriod === p.key && (
                  <motion.span
                    layoutId="panel-period"
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-black"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div role="tabpanel">
            <div className="px-6 pb-7 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span>Orders</span>
                <span className="text-neutral-400">Equity: {share}%</span>
              </div>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 py-1 pl-1 pr-3 text-sm font-medium text-emerald-900">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white">
                  <Package size={14} aria-hidden />
                </span>
                Deliveries
              </span>
              <p className="mt-4 text-5xl font-medium tracking-tight">
                <Val pending={pending}>{panelStats.count}</Val>
              </p>
            </div>

            <div className="relative border-t border-neutral-100">
              <span
                aria-hidden
                className="absolute left-1/2 top-0 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-neutral-200 bg-white "
              >
                <ArrowDownUp size={16} />
              </span>
              <div className="px-6 pb-7 pt-8">
                <div className="flex items-center justify-between text-sm">
                  <span>Revenue</span>
                  <span className="text-neutral-400">
                    {PERIODS.find((p) => p.key === panelPeriod)?.name}
                  </span>
                </div>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 py-1 pl-1 pr-3 text-sm font-medium text-indigo-900">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                    ₦
                  </span>
                  NGN
                </span>
                <p className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
                  <Val pending={pending}>{naira(panelStats.amount)}</Val>
                </p>
              </div>
            </div>

            <dl className="space-y-3 border-t border-neutral-100 px-6 py-5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-neutral-500">Average order</dt>
                <dd className="font-medium">
                  <Val pending={pending}>{naira(avg(panelStats))}</Val>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-neutral-500">
                  <Users size={14} aria-hidden />
                  Equity share
                </dt>
                <dd className="font-medium">{share}%</dd>
              </div>
            </dl>

            <div className="border-t border-neutral-100 p-6">
              <Link
                href={`${BASE}/finances`}
                className={`block rounded-full bg-[#18181b] py-4 text-center text-lg font-medium text-white transition-transform hover:-translate-y-0.5 ${FOCUS}`}
              >
                View finances &amp; payouts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Val({ pending, children }: { pending: boolean; children: ReactNode }) {
  if (pending) {
    return (
      <span
        aria-busy
        className="inline-block h-[0.8em] w-14 animate-pulse rounded-md bg-black/10 align-middle"
      />
    );
  }
  return <>{children}</>;
}

const TONES = {
  blue: {
    card: "from-[#1d4ed8] via-[#2d62ee] to-[#6c9bff]",
    l1: "bg-blue-200/70",
    l2: "bg-blue-300/80",
    cta: "bg-[#1e3fb8]/90 hover:bg-[#1e3fb8]",
    badge: "text-blue-700",
  },
  green: {
    card: "from-[#0f9d45] via-[#1fc25a] to-[#5be08a]",
    l1: "bg-green-200/70",
    l2: "bg-green-300/80",
    cta: "bg-[#0b7a35]/80 hover:bg-[#0b7a35]",
    badge: "text-green-700",
  },
  red: {
    card: "from-[#d90000] via-[#ff1a1a] to-[#ff7a66]",
    l1: "bg-red-200/70",
    l2: "bg-red-300/80",
    cta: "bg-[#a80000]/80 hover:bg-[#a80000]",
    badge: "text-red-600",
  },
} as const;

function HeroCard({
  tone,
  count,
  pending,
  title,
  blurb,
  cta,
  href,
  className = "",
}: {
  tone: keyof typeof TONES;
  icon: LucideIcon;
  count: number;
  pending: boolean;
  title: string;
  blurb: string;
  cta: string;
  href: string;
  className?: string;
}) {
  const t = TONES[tone];
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative pt-5 ${className}`}
    >
      {/* stacked layers behind the card */}
      <span
        aria-hidden
        className={`absolute inset-x-8 top-0 h-24 rounded-[1.75rem] ${t.l1}`}
      />
      <span
        aria-hidden
        className={`absolute inset-x-4 top-2.5 h-24 rounded-[1.75rem] ${t.l2}`}
      />

      <div
        className={`relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-6 text-white ${t.card}`}
      >
        <div className="relative max-w-[65%]">
          <h3 className="flex flex-wrap items-center gap-2.5 text-xl font-medium">
            <span
              className={`rounded-full bg-white px-2.5 py-0.5 text-sm font-bold ${t.badge}`}
            >
              <Val pending={pending}>{count}</Val>
            </span>
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">{blurb}</p>
        </div>

        <Link
          href={href}
          className={`relative mt-8 inline-flex w-fit items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-white transition-colors ${t.cta} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
        >
          {cta}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </motion.div>
  );
}
