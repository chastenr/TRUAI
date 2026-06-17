import type { Metadata } from "next";
import Image from "next/image";
import { buckheadListing as p } from "@/data/listings";

export const metadata: Metadata = {
  title: `${p.address} | The Buckhead Ridge Estate | Luminary Realty Group`,
  description: p.summary,
};

const galleryGradients = [
  { cls: "property-gradient-3", label: "Main Facade" },
  { cls: "property-gradient-1", label: "Great Room" },
  { cls: "property-gradient-5", label: "Pool & Outdoor" },
  { cls: "property-gradient-2", label: "Primary Suite" },
];

export default function BuckheadEstatePage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2]">
      {/* ── Hero banner ── */}
      <div className="relative h-[52vh] min-h-[400px] overflow-hidden bg-neutral-950 sm:h-[62vh]">
        {/*
          Place hero image at: /public/images/concierge-header.png
          (same image used in the AI Concierge section)
        */}
        <Image
          src="/images/concierge-header.png"
          alt="The Buckhead Ridge Estate exterior"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/75" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-10">
          <div className="w-[min(1160px,calc(100%-40px))] mx-auto">
            {p.status && (
              <span className="rounded-full bg-[#c49a3c] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-neutral-950">
                {p.status}
              </span>
            )}
            <h1 className="display-serif mt-3 text-3xl text-white drop-shadow-lg sm:text-5xl">
              The Buckhead Ridge Estate
            </h1>
            <p className="mt-1 text-sm text-white/70">{p.address}, {p.city}, {p.state} {p.zip}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-white">
              <span className="text-2xl font-semibold sm:text-3xl">{p.price}</span>
              <span className="text-sm text-white/60">{p.pricePerSqFt}/sq ft</span>
            </div>
          </div>
        </div>
        {/* Back nav */}
        <a
          href="/#listings"
          className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm transition hover:bg-black/50"
        >
          ← All Listings
        </a>
      </div>

      {/* ── Main content ── */}
      <div className="w-[min(1160px,calc(100%-40px))] mx-auto py-12 lg:py-16">
        {/* Key specs strip */}
        <div className="grid grid-cols-2 gap-3 rounded-lg border border-neutral-200 bg-white p-5 sm:grid-cols-4 lg:grid-cols-8">
          {[
            { label: "Bedrooms",    value: `${p.beds}` },
            { label: "Full Baths",  value: `${p.baths}` },
            { label: "Half Baths",  value: `${p.halfBaths}` },
            { label: "Sq Footage",  value: p.squareFeet },
            { label: "Lot Size",    value: p.lotSize ?? "—" },
            { label: "Year Built",  value: `${p.yearBuilt}` },
            { label: "Garage",      value: p.garage ?? "—" },
            { label: "HOA",         value: p.financials.hoa },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-base font-semibold text-neutral-950 sm:text-lg">{s.value}</p>
              <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-neutral-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left: details */}
          <div className="space-y-8">
            {/* Gallery */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400">Photo Gallery</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {galleryGradients.map((g) => (
                  <div key={g.label} className={`${g.cls} relative h-28 overflow-hidden rounded-lg sm:h-36`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <p className="absolute bottom-2 left-3 text-[0.65rem] font-semibold text-white/80">{g.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[0.7rem] text-neutral-400">
                Gallery placeholder — professional photography available upon request.
              </p>
            </section>

            {/* Overview */}
            <section className="rounded-lg border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-950">Property Overview</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{p.summary}</p>
            </section>

            {/* Features */}
            <section className="rounded-lg border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-950">Key Features</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                    <span className="mt-0.5 text-[#c49a3c]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Rooms */}
            <section className="rounded-lg border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-950">Room Details</h2>
              <div className="mt-4 divide-y divide-neutral-100">
                {p.rooms.map((r) => (
                  <div key={r.name} className="flex justify-between gap-4 py-3 text-sm">
                    <span className="font-semibold text-neutral-900">{r.name}</span>
                    <span className="text-right text-neutral-500">{r.detail}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Neighborhood */}
            <section className="rounded-lg border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-950">Neighborhood Highlights</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {p.nearby.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm text-neutral-700">
                    <span className="text-[#c49a3c]">◎</span>
                    {n}
                  </li>
                ))}
              </ul>
            </section>

            {/* Disclosure */}
            <p className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-6 text-neutral-500">
              <strong className="font-semibold text-neutral-700">Disclosure:</strong> {p.disclosure}
            </p>
          </div>

          {/* Right: sticky sidebar */}
          <aside className="space-y-4">
            {/* Financial summary */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">Financial Summary</p>
              <p className="mt-3 text-2xl font-semibold text-neutral-950">{p.price}</p>
              <dl className="mt-4 divide-y divide-neutral-100 text-sm">
                {[
                  ["Est. Monthly Payment", p.financials.estimatedMonthly],
                  ["Est. Property Tax",    p.financials.estimatedPropertyTax],
                  ["HOA",                  p.financials.hoa],
                  ["Price Per Sq Ft",      p.pricePerSqFt],
                  ["Showing Requirement",  p.financials.showingRequirement],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 py-2.5">
                    <dt className="text-neutral-500">{label}</dt>
                    <dd className="text-right font-medium text-neutral-900">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[0.65rem] leading-5 text-neutral-400">
                Estimates are for illustration only. Verify with your lender and advisor.
              </p>
            </div>

            {/* CTAs */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <p className="text-sm font-semibold text-neutral-950">Ready to take the next step?</p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="/#crm"
                  className="block rounded-full bg-neutral-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#9a7620]"
                >
                  Request Private Showing
                </a>
                <a
                  href="/#concierge"
                  className="block rounded-full border border-neutral-300 px-5 py-3 text-center text-sm font-semibold text-neutral-800 transition hover:border-[#c49a3c] hover:text-[#9a7620]"
                >
                  Ask AI About This Property
                </a>
                <a
                  href="/#crm"
                  className="block rounded-full border border-neutral-300 px-5 py-3 text-center text-sm font-semibold text-neutral-800 transition hover:border-neutral-950"
                >
                  Request Buyer Consultation
                </a>
              </div>
            </div>

            {/* NALA AI badge */}
            <div className="rounded-lg border border-[#c49a3c]/25 bg-gradient-to-br from-neutral-950 to-[#1a1510] p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.65rem] font-bold text-neutral-950">
                  NALA
                </div>
                <div>
                  <p className="text-sm font-semibold">Ask NALA About This Listing</p>
                  <p className="text-[0.7rem] text-white/50">AI Real Estate Concierge · 24/7</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-6 text-white/65">
                NALA can answer questions about pricing, features, neighborhood, showing availability,
                financial estimates, and more — instantly, any time of day.
              </p>
              <a
                href="/#concierge"
                className="mt-4 block rounded-full bg-[#c49a3c] px-5 py-2.5 text-center text-xs font-semibold text-neutral-950 transition hover:bg-white"
              >
                Chat with NALA Now
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
