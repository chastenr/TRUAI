"use client";

import { NALA_LISTINGS } from "@/lib/listings";

export default function NalaSupportPanel() {
  return (
    <div className="flex h-full min-h-[560px] flex-col gap-4">
      <div className="rounded-xl border border-[#c49a3c]/30 bg-[#c49a3c]/8 p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.48rem] font-bold text-neutral-950">
            NALA
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Use the live NALA avatar</p>
            <p className="mt-1 text-xs leading-5 text-white/55">
              Chat and voice are handled inside the live avatar on the left. Use the
              avatar window to ask listing questions, request showing guidance, or speak
              with NALA by voice.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] p-5">
        <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
          Current Listings
        </p>
        <div className="space-y-2">
          {NALA_LISTINGS.map((listing) => (
            <a
              key={listing.slug}
              href={`/listings/${listing.slug}`}
              className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-2.5 text-xs transition hover:border-[#c49a3c]/40 hover:bg-[#c49a3c]/5"
            >
              <div>
                <span className="font-semibold text-white/80">{listing.address}</span>
                <span className="ml-2 text-white/35">
                  {listing.neighborhood.split("·")[1]?.trim() ?? listing.city}
                </span>
              </div>
              <span className="shrink-0 font-semibold text-[#c49a3c]">{listing.price}</span>
            </a>
          ))}
        </div>
        <p className="mt-3 text-[0.62rem] leading-5 text-white/25">
          Listing data is provided as a passive reference. Ask NALA inside the live avatar.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0a0c10] p-5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
          Demo Mode
        </p>
        <p className="mt-2 text-xs leading-6 text-white/50">
          The website chat layer is disabled for now. NALA is the live
          conversation and voice experience.
        </p>
      </div>
    </div>
  );
}
