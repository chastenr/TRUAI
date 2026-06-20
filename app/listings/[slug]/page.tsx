import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listings } from "@/data/listings";
import DocUpload from "@/components/DocUpload";
import AskNalaButton from "@/components/AskNalaButton";
import DemoLeadModal from "@/components/DemoLeadModal";
import DemoModalButton from "@/components/DemoModalButton";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = listings.find((l) => l.slug === slug);
  if (!listing) return { title: "Listing Not Found" };
  return {
    title: `${listing.address} | ${listing.neighborhood} | Abbie Shepherd Real Estate Group`,
    description: listing.summary,
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = listings.find((l) => l.slug === slug);
  if (!p) notFound();

  const specs = [
    { label: "Bedrooms",   value: `${p.beds}` },
    { label: "Full Baths", value: `${p.baths}` },
    { label: "Half Baths", value: `${p.halfBaths}` },
    { label: "Sq Ft",      value: p.squareFeet },
    { label: "Lot Size",   value: p.lotSize ?? "Verify with agent" },
    { label: "Year Built", value: p.yearBuilt ? `${p.yearBuilt}` : "Verify with agent" },
    { label: "Garage",     value: p.garage ?? "Verify with agent" },
    { label: "HOA",        value: p.financials.hoa },
  ];

  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      {/* Hero banner */}
      <div className={`${p.imageClass} relative h-[52vh] min-h-[400px] overflow-hidden sm:h-[62vh]`}>
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={`${p.address} property photo`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm">
              Photo Coming Soon
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />

        {/* Back link */}
        <a
          href="/#listings"
          className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm transition hover:bg-black/50"
        >
          ← All Listings
        </a>

        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-10">
          <div className="w-[min(1160px,calc(100%-40px))] mx-auto">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#c49a3c] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-neutral-950">
                {p.status}
              </span>
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[0.68rem] font-semibold text-white/80 backdrop-blur-sm">
                {p.neighborhood} · {p.city}, {p.state}
              </span>
            </div>
            <h1 className="display-serif mt-3 text-3xl text-white drop-shadow-lg sm:text-5xl">
              {p.address}
            </h1>
            <p className="mt-1 text-sm text-white/60">{p.city}, {p.state} {p.zip}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-white">
              <span className="text-2xl font-semibold sm:text-3xl">{p.price}</span>
              <span className="text-sm text-white/55">{p.pricePerSqFt}/sq ft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-[min(1160px,calc(100%-40px))] mx-auto py-10 lg:py-14">

        {/* Specs strip */}
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-neutral-200 bg-white p-5 sm:grid-cols-4 lg:grid-cols-8">
          {specs.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-base font-semibold text-neutral-950 sm:text-lg">{s.value}</p>
              <p className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-neutral-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Left: details */}
          <div className="space-y-6">
            {/* Overview */}
            <section className="rounded-xl border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-950">Property Overview</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{p.summary}</p>
              {p.listingUrl && (
                <a
                  href={p.listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#9a7620] hover:underline"
                >
                  View original listing on abbieagent.com →
                </a>
              )}
            </section>

            {/* Features */}
            <section className="rounded-xl border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-950">Key Facts</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                    <span className="mt-0.5 text-[#c49a3c]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Neighborhood */}
            <section className="rounded-xl border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-950">Area Highlights</h2>
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
            <p className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-6 text-neutral-500">
              <strong className="font-semibold text-neutral-700">Data Notice:</strong> {p.disclosure}
            </p>
          </div>

          {/* Right: sticky sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {/* Financial summary */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">Listing Price</p>
              <p className="mt-2 text-2xl font-semibold text-neutral-950">{p.price}</p>
              <dl className="mt-4 divide-y divide-neutral-100 text-sm">
                {[
                  ["Est. Monthly",    p.financials.estimatedMonthly],
                  ["Property Tax",   p.financials.estimatedPropertyTax],
                  ["HOA",            p.financials.hoa],
                  ["Price / Sq Ft",  p.pricePerSqFt],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 py-2.5">
                    <dt className="text-neutral-500">{label}</dt>
                    <dd className="text-right font-medium text-neutral-900">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[0.65rem] leading-5 text-neutral-400">
                Financial details must be verified with the listing agent and your lender.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <AskNalaButton
                address={p.address}
                className="block w-full rounded-full bg-[#c49a3c] px-5 py-3.5 text-center text-sm font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
              >
                Ask NALA About This Property
              </AskNalaButton>
              <DemoModalButton
                mode="showing"
                property={p.address}
                className="block w-full rounded-full bg-neutral-950 px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#9a7620]"
              >
                Request Private Showing
              </DemoModalButton>
              <DemoModalButton
                mode="lead"
                property={p.address}
                className="block w-full rounded-full border border-neutral-300 px-5 py-3.5 text-center text-sm font-semibold text-neutral-800 transition hover:border-neutral-950"
              >
                Request Buyer Consultation
              </DemoModalButton>
            </div>

            {/* Document upload */}
            <DocUpload listingAddress={p.address} />

            {/* NALA badge */}
            <div className="rounded-xl border border-[#c49a3c]/25 bg-gradient-to-br from-neutral-950 to-[#1a1208] p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.6rem] font-bold text-neutral-950">
                  NALA
                </div>
                <div>
                  <p className="text-sm font-semibold">Ask NALA About This Listing</p>
                  <p className="text-[0.7rem] text-white/50">AI Real Estate Concierge · 24/7</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-6 text-white/65">
                NALA can answer questions about pricing, neighborhood, showing
                availability, and area comparisons — instantly, any time of day.
              </p>
              <AskNalaButton
                address={p.address}
                className="mt-4 block w-full rounded-full bg-[#c49a3c] px-5 py-2.5 text-center text-xs font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
              >
                Chat with NALA Now
              </AskNalaButton>
            </div>
          </aside>
        </div>
      </div>
      <DemoLeadModal />
    </main>
  );
}
