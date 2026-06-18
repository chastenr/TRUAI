"use client";

import { useSyncExternalStore } from "react";
import { getLeadSnapshot, subscribeToLead } from "@/lib/lead-store";
import { NALA_LISTINGS } from "@/lib/listings";

function useLead() {
  return useSyncExternalStore(subscribeToLead, getLeadSnapshot, getLeadSnapshot);
}

export default function NalaSupportPanel() {
  const lead = useLead();
  const hasData = !!(lead.name || lead.phone || lead.email || lead.propertyInterest || lead.budget);

  return (
    <div className="flex h-full min-h-[560px] flex-col gap-4">

      {/* Avatar redirect banner */}
      <div className="rounded-xl border border-[#c49a3c]/30 bg-[#c49a3c]/8 p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.48rem] font-bold text-neutral-950">
            NALA
          </div>
          <div>
            <p className="text-sm font-semibold text-white">NALA is live in the avatar</p>
            <p className="mt-1 text-xs leading-5 text-white/55">
              Talk to NALA directly in the avatar window on the left — by voice or by typing
              in the avatar chat. NALA has full knowledge of all current listings and will
              qualify your inquiry in real time.
            </p>
          </div>
        </div>
      </div>

      {/* Listing quick reference */}
      <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] p-5">
        <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
          Current Listings · Ask NALA About These
        </p>
        <div className="space-y-2">
          {NALA_LISTINGS.map((l) => (
            <a
              key={l.slug}
              href={`/listings/${l.slug}`}
              className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-2.5 text-xs transition hover:border-[#c49a3c]/40 hover:bg-[#c49a3c]/5"
            >
              <div>
                <span className="font-semibold text-white/80">{l.address}</span>
                <span className="ml-2 text-white/35">{l.neighborhood.split("·")[1]?.trim() ?? l.city}</span>
              </div>
              <span className="shrink-0 font-semibold text-[#c49a3c]">{l.price}</span>
            </a>
          ))}
        </div>
        <p className="mt-3 text-[0.62rem] leading-5 text-white/25">
          All data from abbieagent.com · Verify details with listing agent
        </p>
      </div>

      {/* Mini live lead card */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0c10]">
        <div className="flex items-center gap-2 border-b border-white/8 bg-black/40 px-4 py-2.5">
          <span className="relative flex size-1.5">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${
                hasData ? "bg-emerald-400" : "bg-white/20"
              }`}
            />
            <span
              className={`relative inline-flex size-1.5 rounded-full ${
                hasData ? "bg-emerald-400" : "bg-white/20"
              }`}
            />
          </span>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/40">
            Live Lead Preview
          </p>
          {hasData && (
            <span className="ml-auto text-[0.6rem] font-semibold text-emerald-400">
              Capturing
            </span>
          )}
        </div>

        <div className="divide-y divide-white/6">
          {[
            { label: "Buyer Name", value: lead.name },
            { label: "Interested Property", value: lead.propertyInterest },
            { label: "Budget", value: lead.budget },
            { label: "Timeline", value: lead.timeline },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-4 py-2.5">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/30">
                {label}
              </span>
              <span
                className={`text-xs font-medium transition-colors duration-500 ${
                  value ? "text-[#e0be6e]" : "italic text-white/20"
                }`}
              >
                {value ?? "Awaiting input"}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 px-4 py-3">
          <a
            href="#crm-handoff"
            className="block rounded-full border border-white/10 py-2 text-center text-[0.65rem] font-semibold text-white/40 transition hover:border-white/25 hover:text-white/60"
          >
            View full CRM lead card ↓
          </a>
        </div>
      </div>
    </div>
  );
}
