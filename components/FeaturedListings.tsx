import Image from "next/image";
import { listings } from "@/data/listings";
import AskNalaButton from "./AskNalaButton";

export default function FeaturedListings() {
  return (
    <section id="listings" data-reveal className="bg-[#f7f5f0] py-16 sm:py-24">
      <div className="section-shell">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Atlanta Luxury Demo Listings</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              5 Properties.<br className="hidden sm:block" /> Test the AI Concierge.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-7 text-neutral-500">
              These demo listings give NALA realistic property details to answer questions,
              qualify buyers, request documents, and prepare a CRM-ready lead handoff.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-amber-400" />
              <span className="text-[0.65rem] font-semibold text-amber-700">
                Demo listings only — all details are fictional
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className="soft-lift card-shadow flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white"
            >
              {/* Photo */}
              <div className="relative h-[230px] overflow-hidden">
                <Image
                  src={listing.imageUrl}
                  alt={`${listing.address} — ${listing.neighborhood}`}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-[#c49a3c] px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-neutral-950 shadow-lg">
                    {listing.status}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xl font-semibold text-white drop-shadow">{listing.price}</p>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-white/70">
                    {listing.neighborhood}
                  </p>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[0.82rem] font-semibold text-neutral-950">{listing.address}</p>
                <p className="mt-0.5 text-[0.72rem] text-neutral-500">{listing.city}, {listing.state} {listing.zip}</p>

                <div className="mt-3 flex items-center gap-3 text-[0.75rem] font-semibold text-neutral-600">
                  <span>{listing.beds} Beds</span>
                  <span className="text-neutral-300">·</span>
                  <span>{listing.baths} Baths</span>
                  <span className="text-neutral-300">·</span>
                  <span>{listing.squareFeet} Sq Ft</span>
                </div>

                <p className="mt-3 line-clamp-2 flex-1 text-[0.8rem] leading-6 text-neutral-500">
                  {listing.summary}
                </p>

                <p className="mt-2 text-[0.7rem] text-neutral-400">
                  {listing.pricePerSqFt}/sq ft · Built {listing.yearBuilt}
                </p>

                {/* CTAs */}
                <div className="mt-4 border-t border-neutral-100 pt-4">
                  <AskNalaButton
                    address={listing.address}
                    className="block w-full rounded-full bg-[#c49a3c] px-4 py-2.5 text-center text-[0.78rem] font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
                  >
                    Ask AI About This Property
                  </AskNalaButton>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <a
                      href="/#crm"
                      className="rounded-full border border-neutral-300 px-3 py-2 text-center text-[0.72rem] font-semibold text-neutral-700 transition hover:border-neutral-950"
                    >
                      Private Showing
                    </a>
                    <a
                      href={`/listings/${listing.slug}`}
                      className="rounded-full border border-neutral-300 px-3 py-2 text-center text-[0.72rem] font-semibold text-neutral-700 transition hover:border-neutral-950"
                    >
                      View Details →
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-center text-xs leading-6 text-neutral-500">
          <strong className="font-semibold text-neutral-700">Demo listings only.</strong>{" "}
          Property details, pricing, availability, taxes, HOA, square footage, and showing requirements
          are fictional demo data and must be verified by the brokerage or listing advisor.
          Photos sourced from Unsplash — for demonstration purposes only.
        </p>
      </div>
    </section>
  );
}
