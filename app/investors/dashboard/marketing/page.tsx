"use client";

/**
 * Pickars Courier Limited – Marketing Strategy & Campaign Roadmap
 * Place at: app/investors/dashboard/marketing/page.tsx
 */

import {
  Megaphone,
  MapPin,
  Users,
  GraduationCap,
  Store,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="rounded-[2rem] bg-white p-6 sm:p-8 text-neutral-900 border border-neutral-200/80">
      {/* ============ Header ============ */}
      <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-block rounded border border-neutral-300 bg-neutral-50 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-neutral-600">
            Growth &amp; Acquisition Strategy
          </span>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-neutral-400 sm:text-5xl">
            Marketing Campaigns <br />
            <span className="text-black">&amp; Version 2 Rollout</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg">
            Comprehensive acquisition roadmap targeting Port Harcourt&apos;s
            highest-density recreational parks, major tertiary campuses, and
            commercial vendors. Campaign analytics coming soon.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-4 py-2.5 text-xs font-semibold text-[#ff0000]">
            <Sparkles size={14} /> Version 2 Rollout Soon
          </span>
        </div>
      </header>

      {/* ============ Banner Notice (Analytics Coming Soon) ============ */}
      <div className="mt-10 rounded-[2rem] bg-black p-6 sm:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#b9f03a]">
              Campaign Analytics Coming Soon
            </span>
            <h2 className="mt-3 text-2xl font-medium tracking-tight">
              Version 2 Campaign Analytics &amp; Live Telemetry
            </h2>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Detailed digital impressions, conversion tracking, campus sign-up
              analytics, and vendor onboarding telemetry are currently in
              development and will be documented here shortly once Version 2
              rolls out.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-5 shrink-0 border border-white/10">
            <p className="text-xs text-white/60">Target Acquisition Focus</p>
            <p className="mt-1 text-2xl font-medium text-[#ff0000]">
              Port Harcourt
            </p>
            <p className="text-xs text-white/60 mt-0.5">
              Parks, Campuses &amp; Commercial Hubs
            </p>
          </div>
        </div>
      </div>

      {/* ============ Target Campaigns Section ============ */}
      <section className="mt-14">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-neutral-200/60 bg-white">
            <MapPin size={18} className="text-[#ff0000]" aria-hidden />
          </span>
          <div>
            <h2 className="text-2xl font-medium tracking-tight">
              Active &amp; Upcoming Campaign Targets
            </h2>
            <p className="text-sm text-neutral-500">
              Strategic physical footprint across Port Harcourt.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {/* Weekend Parks */}
          <div className="rounded-[2rem] border border-neutral-200/80 bg-[#fafafa] p-6 flex flex-col justify-between">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ff0000] text-white">
                <Users size={20} />
              </span>
              <span className="inline-block mt-4 rounded-full bg-neutral-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-700">
                Weekend Activations
              </span>
              <h3 className="mt-3 text-lg font-medium">Recreational Parks</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                High-impact weekend experiential marketing and brand activations
                at Port Harcourt Pleasure Park and Oak Park to capture engaged
                youth and families.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center gap-2 text-xs font-medium text-neutral-700">
              <Calendar size={14} className="text-[#ff0000]" /> Weekends (Sat
              &amp; Sun)
            </div>
          </div>

          {/* Tertiary Campuses */}
          <div className="rounded-[2rem] border border-neutral-200/80 bg-[#fafafa] p-6 flex flex-col justify-between">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black text-white">
                <GraduationCap size={20} />
              </span>
              <span className="inline-block mt-4 rounded-full bg-neutral-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-700">
                Weekday Blitz
              </span>
              <h3 className="mt-3 text-lg font-medium">Major Campuses</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Targeting student communities and campus entrepreneurs across
                Rivers State University (UST), University of Port Harcourt
                (Uniport), and Ignatius Ajuru University.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center gap-2 text-xs font-medium text-neutral-700">
              <Clock size={14} className="text-[#ff0000]" /> Weekdays (Mon –
              Fri)
            </div>
          </div>

          {/* Vendors */}
          <div className="rounded-[2rem] border border-neutral-200/80 bg-[#fafafa] p-6 flex flex-col justify-between">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#b9f03a] text-black">
                <Store size={20} />
              </span>
              <span className="inline-block mt-4 rounded-full bg-neutral-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-700">
                Commercial Core
              </span>
              <h3 className="mt-3 text-lg font-medium">
                Port Harcourt Vendors
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Direct merchant outreach and partnership drives with boutiques,
                restaurants, and social media vendors across GRA, Trans-Amadi,
                Aba Road, and Garrison.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center gap-2 text-xs font-medium text-neutral-700">
              <CheckCircle2 size={14} className="text-emerald-600" /> Ongoing
              Onboarding
            </div>
          </div>
        </div>
      </section>

      {/* ============ Footer ============ */}
      <footer className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 text-xs text-neutral-400 sm:flex-row">
        <p>
          © 2026 Pickars Courier Limited · Company No. RC - 8559727. Built &amp;
          powered by Boring Thinkers Limited.
        </p>
        <span className="flex items-center gap-1.5 font-medium text-[#ff0000]">
          <Megaphone size={13} aria-hidden /> Version 2 Campaign Analytics
          Coming Soon
        </span>
      </footer>
    </div>
  );
}
