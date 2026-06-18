import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { listings } from "@/data/listings";
import DocUpload from "@/components/DocUpload";

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
    title: `${listing.address} | ${listing.neighborhood} | Luminary Realty Group`,
    description: listing.summary,
  };
}

const galleryExtras = [
  { url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=400&fit=crop&auto=format&q=80", label: "Great Room" },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format&q=80", label: "Chef's Kitchen" },
  { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop&auto=format&q=80", label: "Pool & Outdoor" },
  { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop&auto=format&q=80", label: "Primary Suite" },
];

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = listings.find((l) => l.slug === slug);
  if (!p) notFound();

  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      {/* Hero banner */}
      <div className="relative h-[52vh] min-h-[400px] overflow-hidden bg-neutral-950 sm:h-[62vh]">
        <Image
          src="/images/concierge-header.png"
          alt={`${p.address} exterior`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
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
          {[
            { label: "Bedrooms",   value: `${p.beds}` },
            { label: "Full Baths", value: `${p.baths}` },
            { label: "Half Baths", value: `${p.halfBaths}` },
            { label: "Sq Ft",      value: p.squareFeet },
            { label: "Lot Size",   value: p.lotSize },
            { label: "Year Built", value: `${p.yearBuilt}` },
            { label: "Garage",     value: p.garage },
            { label: "HOA",        value: p.financials.hoa },
          ].map((s) => (
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
            {/* Gallery */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400">Photo Gallery</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {/* Main listing photo */}
                <div className="relative col-span-2 h-44 overflow-hidden rounded-lg sm:col-span-2">
                  <Image
                    src={p.imageUrl}
                    alt={`${p.address} exterior`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-[0.65rem] font-semibold text-white/90">Main Facade</p>
                </div>
                {/* Extra gallery tiles */}
                {galleryExtras.map((g) => (
                  <div key={g.label} className="relative h-44 overflow-hidden rounded-lg">
                    <Image
                      src={g.url}
                      alt={g.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <p className="absolute bottom-2 left-3 text-[0.65rem] font-semibold text-white/90">{g.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[0.7rem] text-neutral-400">Gallery placeholder — professional photography available upon request.</p>
            </section>

            {/* Overview */}
            <section className="rounded-xl border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-950">Property Overview</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{p.summary}</p>
            </section>

            {/* Features */}
            <section className="rounded-xl border border-neutral-200 bg-white p-6">
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

            {/* Neighborhood */}
            <section className="rounded-xl border border-neutral-200 bg-white p-6">
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
            <p className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-6 text-neutral-500">
              <strong className="font-semibold text-neutral-700">Disclosure:</strong> {p.disclosure}
            </p>
          </div>

          {/* Right: sticky sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {/* Financial summary */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">Financial Summary</p>
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
                Estimates for demo purposes only. Verify with lender and advisor.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <a
                href="/#concierge"
                className="block rounded-full bg-[#c49a3c] px-5 py-3.5 text-center text-sm font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
              >
                Ask AI About This Property
              </a>
              <a
                href="/#crm"
                className="block rounded-full bg-neutral-950 px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#9a7620]"
              >
                Request Private Showing
              </a>
              <a
                href="/#crm"
                className="block rounded-full border border-neutral-300 px-5 py-3.5 text-center text-sm font-semibold text-neutral-800 transition hover:border-neutral-950"
              >
                Request Buyer Consultation
              </a>
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
                NALA can answer questions about pricing, features, neighborhood, showing
                availability, and financial estimates instantly, any time of day.
              </p>
              <a
                href="/#concierge"
                className="mt-4 block rounded-full bg-[#c49a3c] px-5 py-2.5 text-center text-xs font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
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
