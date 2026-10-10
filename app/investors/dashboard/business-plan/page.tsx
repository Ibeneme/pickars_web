"use client";

/**
 * Pickars Courier Limited – 15-Month Business Plan
 * Place at: app/investors/dashboard/business-plan/page.tsx
 *
 * Professional investor presentation
 */
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  Layers,
  MapPin,
  ShieldCheck,
  Target,
  TrendingUp,
  Truck,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const REVENUE_STREAMS = [
  {
    title: "Pay-Per-Delivery",
    price: "₦3,500 average fee",
    split: "Pickars 20% · Rider 80%",
    description:
      "Everyday customers, food vendors and local shops requiring sub-45-minute delivery across Port Harcourt.",
    icon: Zap,
    accent: "bg-[#b9f03a]",
  },
  {
    title: "Monthly Subscriptions",
    price: "Fixed monthly fee",
    split: "Guaranteed rider allocation",
    description:
      "Targeted at commercial hubs: GRA, Trans-Amadi, Aba Road, Garrison and Eliozu.",
    icon: Layers,
    accent: "bg-sky-400",
  },
  {
    title: "TEMU Partnership",
    price: "₦500 flat per parcel",
    split: "High-volume baseline + organic growth",
    description:
      "Last-mile fulfillment for TEMU orders. Every package carries promotional inserts driving free app downloads.",
    icon: Compass,
    accent: "bg-violet-400",
  },
];

const MILESTONES = [
  {
    phase: "Phase 1",
    months: "Month 1",
    title: "Foundation & Fleet",
    details:
      "Deploy 5 elite, fully trained riders with premium safety gear. 12 pre-screened backup riders on standby. Activate TEMU partnership for baseline volume.",
  },
  {
    phase: "Phase 2",
    months: "Months 2–5",
    title: "Controlled Expansion",
    details:
      "Progressively activate standby riders as daily order volume scales. Maintain zero idle capacity to maximise contribution margin per bike.",
  },
  {
    phase: "Phase 3",
    months: "Months 6–15",
    title: "Market Dominance",
    details:
      "Scale to 20 active riders averaging 700 deliveries monthly. Secure top commercial hubs, sign 50+ vendor plans, and prepare neighbouring-city expansion.",
  },
];

const FINANCIAL_PROJECTIONS = [
  {
    month: 1,
    riders: "5",
    perRider: 200,
    total: 1000,
    processed: "₦3,500,000",
    revenue: "₦700,000",
  },
  {
    month: 2,
    riders: "6",
    perRider: 225,
    total: 1350,
    processed: "₦4,725,000",
    revenue: "₦945,000",
  },
  {
    month: 3,
    riders: "7.5",
    perRider: 250,
    total: 1875,
    processed: "₦6,562,500",
    revenue: "₦1,312,500",
  },
  {
    month: 4,
    riders: "8",
    perRider: 280,
    total: 2240,
    processed: "₦7,840,000",
    revenue: "₦1,568,000",
  },
  {
    month: 5,
    riders: "9",
    perRider: 310,
    total: 2790,
    processed: "₦9,765,000",
    revenue: "₦1,953,000",
  },
  {
    month: 6,
    riders: "10",
    perRider: 340,
    total: 3400,
    processed: "₦11,900,000",
    revenue: "₦2,380,000",
  },
  {
    month: 7,
    riders: "11",
    perRider: 380,
    total: 4180,
    processed: "₦14,630,000",
    revenue: "₦2,926,000",
  },
  {
    month: 8,
    riders: "12",
    perRider: 420,
    total: 5040,
    processed: "₦17,640,000",
    revenue: "₦3,528,000",
  },
  {
    month: 9,
    riders: "13",
    perRider: 460,
    total: 5980,
    processed: "₦20,930,000",
    revenue: "₦4,186,000",
  },
  {
    month: 10,
    riders: "14",
    perRider: 500,
    total: 7000,
    processed: "₦24,500,000",
    revenue: "₦4,900,000",
  },
  {
    month: 11,
    riders: "15",
    perRider: 540,
    total: 8100,
    processed: "₦28,350,000",
    revenue: "₦5,670,000",
  },
  {
    month: 12,
    riders: "16",
    perRider: 580,
    total: 9280,
    processed: "₦32,480,000",
    revenue: "₦6,496,000",
  },
  {
    month: 13,
    riders: "17.5",
    perRider: 620,
    total: 10850,
    processed: "₦37,975,000",
    revenue: "₦7,595,000",
  },
  {
    month: 14,
    riders: "18.5",
    perRider: 660,
    total: 12210,
    processed: "₦42,735,000",
    revenue: "₦8,547,000",
  },
  {
    month: 15,
    riders: "20",
    perRider: 700,
    total: 14000,
    processed: "₦49,000,000",
    revenue: "₦9,800,000",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function BusinessPlanPage() {
  const [showAllMonths, setShowAllMonths] = useState(false);

  return (
    <div className="min-h-screen rounded-[2rem] bg-[#f0f1f5] p-5 font-['Lufga',sans-serif] text-neutral-900 sm:p-8 lg:p-10">
      {/* ============ Header ============ */}
      <header className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-block rounded border border-neutral-300 bg-white px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
            Strategic Roadmap
          </span>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-neutral-400 sm:text-5xl">
            15-Month
            <br />
            <span className="text-black">Business Plan</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-500 sm:text-lg">
            A clear, capital-efficient blueprint showing how Pickars solves
            last-mile friction in Port Harcourt, monetises operations, and
            scales to ₦9.8M monthly revenue.
          </p>
        </div>

        {/* Key metrics */}
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <div className="flex items-center gap-4 rounded-2xl bg-black p-5 text-white ">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
              <Wallet size={20} aria-hidden />
            </span>
            <div>
              <p className="text-xs text-white/60">Seed Capital</p>
              <p className="text-2xl font-medium tracking-tight">₦13,000,000</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={20} aria-hidden />
            </span>
            <div>
              <p className="text-xs text-neutral-400">15-Month Revenue</p>
              <p className="text-2xl font-medium tracking-tight">₦62.5M</p>
            </div>
          </div>
        </div>
      </header>

      {/* ============ 1. Overview ============ */}
      <section className="mt-16">
        <SectionHeading
          number="01"
          title="What is Pickars?"
          subtitle="Fast, reliable last-mile delivery infrastructure for Port Harcourt."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          {/* Mission card */}
          <div className="rounded-[1.75rem] bg-white p-7  lg:col-span-2">
            <h3 className="text-lg font-medium">Core Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Pickars connects local shops, online sellers, restaurants and
              everyday customers with vetted delivery riders through a simple
              mobile app and dedicated phone lines.
            </p>
            <div className="mt-6 flex items-center gap-2 border-t border-neutral-100 pt-5 text-xs font-medium text-neutral-500">
              <MapPin size={14} className="text-red-500" />
              Primary Market · Port Harcourt, Rivers State
            </div>
          </div>

          {/* Problem cards */}
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3">
            <ProblemCard
              icon={Clock}
              title="Unreliable Riders"
              description="Customers waste time on informal riders who arrive late or disappear. Pickars enforces full accountability."
            />
            <ProblemCard
              icon={Calculator}
              title="Opaque Pricing"
              description="Street prices are arbitrary. Pickars uses transparent, distance-based pricing that customers can trust."
            />
            <ProblemCard
              icon={ShieldCheck}
              title="Cash Flow Friction"
              description="Pay-on-delivery merchants wait days for settlement. Pickars remits funds fast and securely."
            />
          </div>
        </div>
      </section>

      {/* ============ 2. Revenue Streams ============ */}
      <section className="mt-16">
        <SectionHeading
          number="02"
          title="How Pickars Makes Money"
          subtitle="Three complementary revenue streams combining high-frequency commissions, recurring subscriptions and enterprise volume."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {REVENUE_STREAMS.map((stream) => {
            const Icon = stream.icon;
            return (
              <div
                key={stream.title}
                className="flex flex-col rounded-[1.75rem] bg-white p-6 "
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${stream.accent} text-black `}
                  >
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                    {stream.price}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-medium">{stream.title}</h3>
                <p className="mt-1 text-xs font-medium text-emerald-600">
                  {stream.split}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                  {stream.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* TEMU spotlight */}
        <div className="mt-6 rounded-[1.75rem] bg-black p-7 text-white sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#b9f03a]">
                Strategic Growth Engine
              </span>
              <h4 className="mt-3 text-2xl font-medium tracking-tight">
                TEMU Partnership & Organic Acquisition
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Handling 200–1,000 TEMU parcels daily generates steady
                ₦500-per-parcel revenue while every package acts as free
                advertising. Delivery notifications and inserts drive app
                downloads at zero acquisition cost.
              </p>
            </div>
            <div className="shrink-0 rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="text-xs text-white/60">Net daily contribution</p>
              <p className="mt-1 text-3xl font-medium text-[#b9f03a]">
                ₦15,000
              </p>
              <p className="mt-0.5 text-xs text-white/60">per TEMU bike</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. Game Plan ============ */}
      <section className="mt-16">
        <SectionHeading
          number="03"
          title="15-Month Execution Plan"
          subtitle="Disciplined capital deployment across three clearly defined operational phases."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {MILESTONES.map((m) => (
            <div
              key={m.phase}
              className="flex flex-col justify-between rounded-[1.75rem] bg-white p-6 "
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {m.phase}
                  </span>
                  <span className="rounded-full bg-black px-3 py-1 text-[11px] font-medium text-white">
                    {m.months}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-medium leading-snug">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {m.details}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-neutral-100 pt-4 text-xs font-medium text-neutral-600">
                <CheckCircle2 size={14} className="text-emerald-500" />
                Fully funded & structured
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 4. Financials ============ */}
      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            number="04"
            title="Financial Projections"
            subtitle="Monthly scaling path from 5 to 20 active riders and ₦9.8M monthly revenue."
          />
          <button
            type="button"
            onClick={() => setShowAllMonths(!showAllMonths)}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:bg-black hover:text-white"
          >
            {showAllMonths ? "Show First 6 Months" : "Show All 15 Months"}
            {showAllMonths ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-neutral-200/80 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-neutral-200 bg-[#fafafa] text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Month</th>
                  <th className="px-6 py-4 font-semibold">Riders</th>
                  <th className="px-6 py-4 font-semibold">Per Rider</th>
                  <th className="px-6 py-4 font-semibold">Total Deliveries</th>
                  <th className="px-6 py-4 font-semibold">Processed</th>
                  <th className="px-6 py-4 text-right font-semibold">
                    Pickars Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {(showAllMonths
                  ? FINANCIAL_PROJECTIONS
                  : FINANCIAL_PROJECTIONS.slice(0, 6)
                ).map((row) => (
                  <tr
                    key={row.month}
                    className="transition-colors hover:bg-neutral-50/70"
                  >
                    <td className="px-6 py-4 font-medium">Month {row.month}</td>
                    <td className="px-6 py-4 text-neutral-600">{row.riders}</td>
                    <td className="px-6 py-4 text-neutral-600">
                      {row.perRider}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {row.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-neutral-800">
                      {row.processed}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-emerald-600">
                      {row.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-neutral-200 bg-neutral-50 font-semibold">
                <tr>
                  <td className="px-6 py-4" colSpan={3}>
                    15-Month Totals
                  </td>
                  <td className="px-6 py-4">89,295</td>
                  <td className="px-6 py-4">₦312,532,500</td>
                  <td className="px-6 py-4 text-right text-emerald-700">
                    ₦62,506,500
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* ============ 5. Success Pillars ============ */}
      <section className="mt-16">
        <SectionHeading
          number="05"
          title="What Success Requires"
          subtitle="Three non-negotiable operational pillars that protect long-term unit economics and market position."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            {
              num: "01",
              title: "Motivated Riders",
              body: "Riders keep 80% (₦2,800 per delivery). At full capacity a rider can earn up to ₦2.8M monthly gross, ensuring loyalty, politeness and low turnover.",
            },
            {
              num: "02",
              title: "Frictionless App",
              body: "An intuitive mobile experience engineered to remain usable even on slow or intermittent network conditions common in the target market.",
            },
            {
              num: "03",
              title: "Word-of-Mouth Growth",
              body: "Uncompromising service quality so local merchants naturally recommend Pickars to peers across Port Harcourt’s commercial hubs.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="rounded-[1.75rem] bg-white p-6 "
            >
              <span className="text-2xl font-light text-red-500">
                {item.num}
              </span>
              <h3 className="mt-3 text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ Footer ============ */}
      <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-200/80 pt-8 text-xs text-neutral-400 sm:flex-row">
        <p>
          © 2026 Pickars Courier Limited · RC 8559727 · Built by Boring Thinkers
          Limited
        </p>
        <Link
          href="/investors/dashboard/company"
          className="inline-flex items-center gap-1.5 font-medium text-neutral-800 transition-colors hover:text-black"
        >
          View Corporate Registry & Cap Table
          <ArrowUpRight size={13} />
        </Link>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */

function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-black text-xs font-semibold text-white">
          {number}
        </span>
        <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}

function ProblemCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col rounded-[1.5rem] bg-white p-5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100 text-neutral-700">
        <Icon size={18} aria-hidden />
      </span>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-neutral-500">
        {description}
      </p>
    </div>
  );
}
