import { listings } from "@/data/listings";
import AskNalaButton from "./AskNalaButton";

export default function FeaturedListings() {
  return (
    <section id="listings" data-reveal className="bg-[#f7f5f0] py-16 sm:py-24">
      <div className="section-shell">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Abbie Shepherd Real Estate Group</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              Current Listings.<br className="hidden sm:block" /> Powered by NALA.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-7 text-neutral-500">
              Active listings from Abbie Shepherd Real Estate Group. Ask NALA about any
              property — pricing, neighborhoods, showing requests, and buyer qualification,
              all handled 24/7.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#c49a3c]/30 bg-[#c49a3c]/10 px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-[#c49a3c]" />
              <span className="text-[0.65rem] font-semibold text-[#9a7620]">
                Data from abbieagent.com · Verify details with listing agent
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
              {/* Listing media */}
              <div className={`${listing.imageClass} relative h-[230px] overflow-hidden`}>
                {listing.imageUrl ? (
                  <img
                    src={listing.imageUrl}
                    alt={`${listing.address} property photo`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm">
                      Photo Coming Soon
                    </div>
                  </div>
                )}
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
                  <span>{listing.baths}{listing.halfBaths > 0 ? `.${listing.halfBaths > 0 ? "5" : ""}` : ""} Baths</span>
                  <span className="text-neutral-300">·</span>
                  <span>{listing.squareFeet} Sq Ft</span>
                </div>

                <p className="mt-3 line-clamp-2 flex-1 text-[0.8rem] leading-6 text-neutral-500">
                  {listing.summary}
                </p>

                <p className="mt-2 text-[0.7rem] text-neutral-400">
                  {listing.pricePerSqFt}/sq ft
                </p>

                {/* CTAs */}
                <div className="mt-4 border-t border-neutral-100 pt-4">
                  <AskNalaButton
                    address={listing.address}
                    className="block w-full rounded-full bg-[#c49a3c] px-4 py-2.5 text-center text-[0.78rem] font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
                  >
                    Ask NALA About This Property
                  </AskNalaButton>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <a
                      href="/#crm"
                      className="rounded-full border border-neutral-300 px-3 py-2 text-center text-[0.72rem] font-semibold text-neutral-700 transition hover:border-neutral-950"
                    >
                      Request Showing
                    </a>
                    <a
                      href={listing.listingUrl ?? "https://www.abbieagent.com/listings/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-neutral-300 px-3 py-2 text-center text-[0.72rem] font-semibold text-neutral-700 transition hover:border-neutral-950"
                    >
                      View on Site →
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-center text-xs leading-6 text-neutral-500">
          <strong className="font-semibold text-neutral-700">Public listing data only.</strong>{" "}
          Address, price, bed/bath count, and square footage sourced from{" "}
          <a href="https://www.abbieagent.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-900">abbieagent.com</a>.{" "}
          All details must be verified with Abbie Shepherd Real Estate Group / Keller Williams Buckhead.
          This page is a NALA technology demonstration.
        </p>
      </div>
    </section>
  );
}
