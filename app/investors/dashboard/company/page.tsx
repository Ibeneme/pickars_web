"use client";

/**
 * Pickars Courier Limited – Corporate & Cap Table Overview
 * Place at: app/investors/dashboard/company/page.tsx
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  FileArchive,
  FileText,
  Hash,
  Landmark,
  MapPin,
  PieChart,
  Smartphone,
  Truck,
  TrendingUp,
  Users,
  CreditCard,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa6";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const COMPANY_NUMBER = "RC - 8559727";
const OPAY_ACCOUNT = "6444788035";
const STERLING_ACCOUNT = "0125209974";

type Holder = {
  name: string;
  category: string;
  pct: number;
  context: string;
  entityUrl: string | null;
  isLead?: boolean;
  reserved?: boolean;
  color: string;
};

const CAP_TABLE: Holder[] = [
  {
    name: "Boring Thinkers Limited",
    category: "Institutional",
    pct: 35,
    context:
      "Holds the largest single equity block, reflecting a substantial capital injection and ongoing technical/operational backing.",
    entityUrl: "https://www.boringthinkers.com",
    isLead: true,
    color: "#111111",
  },
  {
    name: "Ikenna Ibeneme",
    category: "Founder / Core Management",
    pct: 30,
    context:
      "Represents the primary founding and operational stake, ensuring strong alignment with long-term company growth and leadership.",
    entityUrl: "https://www.ibeneme.com",
    color: "#ff0000",
  },
  {
    name: "Mr. Shine",
    category: "Strategic Investor",
    pct: 21,
    context:
      "Strategic investment partnership bringing crucial expansion capital, market access, and high-level advisory.",
    entityUrl: null,
    color: "#b9f03a",
  },
  {
    name: "Option Pool / Equity Reserve",
    category: "Employee & Future Talent Pool",
    pct: 9,
    context:
      "Set aside for key management hires, technical talent, and future advisory allocations.",
    entityUrl: null,
    reserved: true,
    color: "#60a5fa",
  },
  {
    name: "Mr. Benson Ogholi",
    category: "Early Supporter / Advisor",
    pct: 2.5,
    context: "Maintaining early-stage founding equity and strategic advisory.",
    entityUrl: null,
    color: "#c084fc",
  },
  {
    name: "Victor, Esq",
    category: "Legal / Advisory",
    pct: 2.5,
    context:
      "Compensated via equity for foundational legal structuring, regulatory alignment, and ongoing corporate advisory.",
    entityUrl: null,
    color: "#fbbf24",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/pickars_official?igsh=MWY4aTJieHVtMGltYg%3D%3D&utm_source=qr",
    icon: <FaInstagram size={18} />,
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/pickars_app?s=21",
    icon: <FaXTwitter size={18} />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1cW4kyitrJ/?mibextid=wwXIfr&wa_status_inline=true",
    icon: <FaFacebookF size={18} />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/pickars/",
    icon: <FaLinkedinIn size={18} />,
  },
];

const corporateDocuments = [
  {
    title: "Founders Agreement & Shareholder Pact",
    type: "PDF",
    size: "2.4 MB",
    description: "Governing terms, vesting schedules, and shareholder rights.",
    actionUrl: "#",
  },
  {
    title: "Articles & Memorandum of Association",
    type: "PDF",
    size: "1.8 MB",
    description:
      "Official Corporate Affairs Commission (CAC) incorporation records.",
    actionUrl: "#",
  },
  {
    title: "Investor Pitch Deck & Financial Projections",
    type: "PDF",
    size: "5.1 MB",
    description:
      "Comprehensive expansion roadmap, unit economics, and target metrics.",
    actionUrl: "#",
  },
  {
    title: "Brand Asset & Media Kit",
    type: "ZIP",
    size: "14.2 MB",
    description:
      "Official high-resolution logos, brand palette guidelines, and typography.",
    actionUrl: "#",
  },
];

const FACTS: { icon: LucideIcon; label: string; value: string }[] = [
  {
    icon: Building2,
    label: "Registered name",
    value: "Pickars Courier Limited",
  },
  {
    icon: Landmark,
    label: "Registry",
    value: "Corporate Affairs Commission (CAC)",
  },
  { icon: Truck, label: "Industry", value: "Courier & last-mile logistics" },
  { icon: MapPin, label: "Primary market", value: "Port Harcourt, Nigeria" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const fmtPct = (n: number) => `${n % 1 === 0 ? n : n.toFixed(1)}%`;

const initials = (name: string) =>
  name
    .replace(/[^\p{L}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

const sum = (rows: Holder[]) => rows.reduce((a, r) => a + r.pct, 0);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function CompanyOverviewPage() {
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  function showToast(msg: string) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }

  async function copyText(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      showToast("Couldn't copy. Select the text and copy it manually.");
    }
  }

  function handleDownload(index: number, title: string, url: string) {
    setDownloadingIndex(index);
    setTimeout(() => {
      setDownloadingIndex(null);
      if (url.startsWith("http")) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        showToast(`${title} isn't published for download yet.`);
      }
    }, 700);
  }

  const held = CAP_TABLE.filter((h) => !h.reserved);
  const reserved = CAP_TABLE.filter((h) => h.reserved);
  const lead = CAP_TABLE.find((h) => h.isLead);
  const others = CAP_TABLE.filter((h) => !h.isLead);

  return (
    <div className="rounded-[2rem] bg-white p-6 sm:p-8 text-neutral-900 border border-neutral-200/80 ">
      {/* ============ Header ============ */}
      <header className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-block rounded border border-neutral-300 bg-neutral-50 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-neutral-600">
            Corporate registry &amp; banking
          </span>
          <h1 className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight text-neutral-400 sm:text-5xl lg:text-6xl">
            Pickars Courier
            <br />
            <span className="text-black">Limited</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg">
            Redefining doorstep deliveries and logistics infrastructure across
            Port Harcourt and beyond. Built for speed, security, and transparent
            equity partnership.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 lg:items-end">
          <Link
            href="https://www.pickars.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-3 rounded-full bg-[#18181b] py-2 pl-6 pr-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 ${FOCUS}`}
          >
            Visit pickars.com
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-[#ff0000]">
              <ArrowUpRight size={16} aria-hidden />
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className={`grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white ${FOCUS}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ============ Registry pill bar ============ */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 rounded-full bg-black py-2 pl-6 pr-2 text-white">
          <span className="text-base font-medium">Company number</span>
          <span className="flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 text-sm tracking-wider">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
              <Hash size={16} aria-hidden />
            </span>
            {COMPANY_NUMBER}
          </span>
        </div>

        <button
          type="button"
          onClick={() => copyText(COMPANY_NUMBER, "cac")}
          aria-label={
            copiedKey === "cac"
              ? "Company number copied"
              : "Copy company number"
          }
          className={`flex items-center gap-2 rounded-full bg-[#b9f03a] py-3 pl-5 pr-6 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${FOCUS}`}
        >
          {copiedKey === "cac" ? (
            <Check size={16} aria-hidden />
          ) : (
            <Copy size={16} aria-hidden />
          )}
          {copiedKey === "cac" ? "Copied" : "Copy number"}
        </button>

        <span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-700 ">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          Corporate filings active
        </span>
      </div>

      {/* ============ Corporate Bank Accounts ============ */}
      <section className="mt-14">
        <SectionHeading
          icon={Landmark}
          title="Corporate Bank Accounts & Payment Channels"
          subtitle="Official accounts for daily operations, official reserves, and secure card payment routing via Paystack."
        />

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* OPay Card */}
          <div className="rounded-[2rem] border border-neutral-200/80 bg-[#fafafa] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ff0000] text-white">
                  <Wallet size={20} />
                </span>
                <span className="rounded-full bg-neutral-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-700">
                  Daily Runs &amp; Operations
                </span>
              </div>
              <h3 className="mt-5 text-xl font-medium">
                OPay (Pickars Courier Limited)
              </h3>
              <p className="mt-1 font-mono text-2xl font-semibold tracking-wider text-black">
                {OPAY_ACCOUNT}
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                Primary operational account dedicated to daily dispatch runs and
                immediate merchant liquidity.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-600">
                Account Name: PICKARS COURIER LIMITED
              </span>
              <button
                type="button"
                onClick={() => copyText(OPAY_ACCOUNT, "opay")}
                className={`inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:bg-black hover:text-white ${FOCUS}`}
              >
                {copiedKey === "opay" ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}
                {copiedKey === "opay" ? "Copied" : "Copy Account"}
              </button>
            </div>
          </div>

          {/* Sterling Bank Card */}
          <div className="rounded-[2rem] border border-neutral-200/80 bg-[#fafafa] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black text-white">
                  <Landmark size={20} />
                </span>
                <span className="rounded-full bg-neutral-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-700">
                  Official Corporate Bank
                </span>
              </div>
              <h3 className="mt-5 text-xl font-medium">Sterling Bank</h3>
              <p className="mt-1 font-mono text-2xl font-semibold tracking-wider text-black">
                {STERLING_ACCOUNT}
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                Official corporate reserve and institutional banking account for
                Pickars Courier Limited.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-600">
                Account Name: PICKARS COURIER LIMITED
              </span>
              <button
                type="button"
                onClick={() => copyText(STERLING_ACCOUNT, "sterling")}
                className={`inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:bg-black hover:text-white ${FOCUS}`}
              >
                {copiedKey === "sterling" ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}
                {copiedKey === "sterling" ? "Copied" : "Copy Account"}
              </button>
            </div>
          </div>
        </div>

        {/* Paystack Notice Banner */}
        <div className="mt-5 rounded-[2rem] bg-black p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#b9f03a]">
              <CreditCard size={22} />
            </span>
            <div>
              <h4 className="font-medium text-lg">
                Card Payments &amp; Automated Collections
              </h4>
              <p className="text-xs text-white/70 mt-0.5">
                All debit card payments and online checkout transactions are
                securely processed through our official Paystack merchant
                accounts.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-[#b9f03a] px-4 py-2 text-xs font-semibold text-black shrink-0 text-center">
            Paystack Integrated
          </span>
        </div>
      </section>

      {/* ============ Key metrics ============ */}
      <section
        aria-label="Key figures"
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <MetricCard
          icon={TrendingUp}
          label="Current valuation"
          value="₦50,000,000"
          note="Post-seed baseline valuation estimate"
        />
        <MetricCard
          icon={Award}
          label="Lead investment injection"
          value="₦5,000,000"
          note="Provided by Boring Thinkers Ltd (35%)"
        />
        <div className="rounded-[2rem] border border-neutral-200/80 bg-white p-6 sm:col-span-2 lg:col-span-1">
          <IconTile icon={Smartphone} />
          <p className="mt-5 text-sm text-neutral-400">Mobile distribution</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.pickars.app"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full bg-[#18181b] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 ${FOCUS}`}
            >
              <FaGooglePlay size={15} />
              Play Store
            </a>
            <a
              href="https://apps.apple.com/ng/app/pickars/id6746796884"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full bg-[#18181b] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 ${FOCUS}`}
            >
              <FaApple size={16} />
              App Store
            </a>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            Live applications on both major stores
          </p>
        </div>
      </section>

      {/* ============ Company at a glance ============ */}
      <section className="mt-14">
        <SectionHeading
          icon={Building2}
          title="Company at a glance"
          subtitle="Registration and operating details."
        />

        <div className="mt-6 rounded-[2rem] border border-neutral-200/80 bg-[#fafafa] p-2">
          <dl className="grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-[1.5rem] bg-black p-5 text-white sm:col-span-2">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 ring-4 ring-white/5">
                <Hash size={20} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <dt className="text-sm text-white/60">Company number</dt>
                <dd className="mt-0.5 text-3xl font-medium tracking-[0.08em]">
                  {COMPANY_NUMBER}
                </dd>
              </div>
              <button
                type="button"
                onClick={() => copyText(COMPANY_NUMBER, "cac")}
                aria-label={
                  copiedKey === "cac" ? "Copied" : "Copy company number"
                }
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {copiedKey === "cac" ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>

            {FACTS.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className="flex items-center gap-4 rounded-[1.5rem] border border-neutral-200/80 bg-white p-5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-neutral-100 text-neutral-700">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-sm text-neutral-400">{f.label}</dt>
                    <dd className="mt-0.5 font-medium">{f.value}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* ============ Cap table ============ */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHeading
            icon={PieChart}
            title="Stakeholder percentage & cap table"
            subtitle="Equity distribution, governance roles, and strategic context."
          />
          <span className="rounded-full border border-neutral-200/80 bg-white px-4 py-2 text-xs font-medium text-neutral-600 ">
            Total {fmtPct(sum(CAP_TABLE))} equity allocation
          </span>
        </div>

        {/* Equity bar */}
        <div className="mt-6 rounded-[2rem] border border-neutral-200/80 bg-white p-6">
          <div
            className="flex h-14 gap-1 overflow-hidden rounded-2xl"
            role="img"
            aria-label={`Equity split: ${CAP_TABLE.map(
              (h) => `${h.name}${fmtPct(h.pct)}`
            ).join(", ")}`}
          >
            {CAP_TABLE.map((h, i) => (
              <motion.div
                key={h.name}
                initial={{ flexGrow: 0, opacity: 0 }}
                animate={{ flexGrow: h.pct, opacity: 1 }}
                transition={{
                  delay: 0.1 + i * 0.07,
                  type: "spring",
                  stiffness: 110,
                  damping: 20,
                }}
                onMouseEnter={() => setHovered(h.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ background: h.color, flexBasis: 0 }}
                className={`min-w-[6px] transition-opacity ${
                  hovered && hovered !== h.name ? "opacity-40" : ""
                }`}
                title={`${h.name}: ${fmtPct(h.pct)}`}
              />
            ))}
          </div>

          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {CAP_TABLE.map((h) => (
              <li
                key={h.name}
                onMouseEnter={() => setHovered(h.name)}
                onMouseLeave={() => setHovered(null)}
                className="flex items-center gap-3 text-sm"
              >
                <span
                  aria-hidden
                  className="h-3 w-3 shrink-0 rounded-full ring-1 ring-black/10"
                  style={{ background: h.color }}
                />
                <span className="min-w-0 flex-1 truncate text-neutral-600">
                  {h.name}
                </span>
                <span className="font-medium">{fmtPct(h.pct)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Group summary */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <StatPill
            label="Issued to holders"
            value={fmtPct(sum(held))}
            tone="black"
          />
          <StatPill
            label="Reserved for growth"
            value={fmtPct(sum(reserved))}
            tone="lime"
          />
          <StatPill label="Founder & Core" value={fmtPct(30)} tone="white" />
        </div>

        {/* Stakeholder cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {lead && (
            <HolderCard holder={lead} featured className="md:col-span-2" />
          )}
          {others.map((h) => (
            <HolderCard key={h.name} holder={h} />
          ))}
        </div>
      </section>

      {/* ============ Documents ============ */}
      <section className="mt-14">
        <SectionHeading
          icon={FileText}
          title="Founders' documents & corporate files"
          subtitle="Verified legal agreements, governance documents, and brand toolkits."
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {corporateDocuments.map((doc, idx) => {
            const Icon = doc.type === "ZIP" ? FileArchive : FileText;
            const busy = downloadingIndex === idx;
            return (
              <article
                key={doc.title}
                className="flex items-start gap-4 rounded-[2rem] border border-neutral-200/80 bg-white p-5 "
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-b from-neutral-700 to-black text-white ring-4 ring-white">
                  <Icon size={22} aria-hidden />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span className="rounded-md bg-black px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {doc.type}
                    </span>
                    {doc.size}
                  </div>
                  <h4 className="mt-1.5 font-medium leading-snug">
                    {doc.title}
                  </h4>
                  <p className="mt-1 text-sm text-neutral-500">
                    {doc.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownload(idx, doc.title, doc.actionUrl)}
                  disabled={busy}
                  aria-label={`Download ${doc.title}`}
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-neutral-200 bg-white transition-colors hover:border-black hover:bg-black hover:text-white disabled:opacity-60 ${FOCUS}`}
                >
                  {busy ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  ) : (
                    <Download size={16} aria-hidden />
                  )}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* ============ Footer ============ */}
      <footer className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 text-xs text-neutral-400 sm:flex-row">
        <p>
          © 2026 Pickars Courier Limited · Company No. {COMPANY_NUMBER}. Built
          &amp; powered by Boring Thinkers Limited.
        </p>
        <span className="flex items-center gap-1.5 font-medium text-emerald-600">
          <CheckCircle2 size={13} aria-hidden /> Corporate filings active
        </span>
      </footer>

      {/* Toast */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      >
        {toast && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full bg-[#18181b] px-5 py-3 text-sm font-medium text-white"
          >
            {toast}
          </motion.p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-b from-neutral-700 to-black text-white ring-4 ring-white">
      <Icon size={22} aria-hidden />
    </span>
  );
}

function MetricCard({
  icon,
  label,
  value,
  note,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[2rem] border border-neutral-200/80 bg-white p-6 ">
      <IconTile icon={icon} />
      <p className="mt-5 text-sm text-neutral-400">{label}</p>
      <p className="mt-1 text-3xl font-medium tracking-tight">{value}</p>
      <p className="mt-3 text-xs text-neutral-500">{note}</p>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-medium tracking-tight">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-neutral-200/60 bg-white ">
          <Icon size={18} className="text-[#ff0000]" aria-hidden />
        </span>
        {title}
      </h2>
      <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}

function StatPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "black" | "lime" | "white";
}) {
  const styles = {
    black: "bg-black text-white",
    lime: "bg-[#b9f03a] text-black",
    white: "bg-white text-black border border-neutral-200/80 ",
  }[tone];
  const muted = tone === "black" ? "text-white/60" : "text-black/60";
  return (
    <div
      className={`flex items-baseline justify-between rounded-full px-6 py-4 ${styles}`}
    >
      <span className={`text-sm ${muted}`}>{label}</span>
      <span className="text-3xl font-light tracking-tight">{value}</span>
    </div>
  );
}

function HolderCard({
  holder: h,
  featured = false,
  className = "",
}: {
  holder: Holder;
  featured?: boolean;
  className?: string;
}): ReactNode {
  const dark = featured;
  return (
    <article
      className={`flex flex-col rounded-[2rem] p-6 ${
        dark ? "bg-black text-white" : "border border-neutral-200/80 bg-white "
      } ${className}`}
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-semibold ring-4"
          style={{
            background: h.color,
            color:
              h.color === "#111111" || h.color === "#ff0000" ? "#fff" : "#111",
            ["--tw-ring-color" as string]: dark
              ? "rgba(255,255,255,0.1)"
              : "#f3f4f6",
          }}
        >
          {initials(h.name)}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-2 text-lg font-medium leading-snug">
            {h.name}
            {h.entityUrl && (
              <a
                href={h.entityUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${h.name}`}
                className={`${
                  dark
                    ? "text-white/50 hover:text-white"
                    : "text-neutral-400 hover:text-black"
                } transition-colors`}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </h3>
          <p
            className={`mt-0.5 text-sm ${
              dark ? "text-white/60" : "text-neutral-500"
            }`}
          >
            {h.category}
          </p>
        </div>

        <p className="text-5xl font-light leading-none tracking-tight">
          {fmtPct(h.pct)}
        </p>
      </div>

      <p
        className={`mt-5 text-sm leading-relaxed ${
          dark ? "text-white/70" : "text-neutral-500"
        }`}
      >
        {h.context}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
    
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            dark
              ? "bg-white/10 text-white/80"
              : "border border-neutral-200/60 bg-neutral-50 text-neutral-600"
          }`}
        >
          <Users size={12} aria-hidden />
          {h.reserved ? "Reserved" : "Held"}
        </span>
      </div>
    </article>
  );
}
