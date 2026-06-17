import { listings } from "@/data/listings";

export default function FeaturedListings() {
  return (
    <section id="listings" data-reveal className="bg-white py-16 sm:py-24">
      <div className="section-shell">
        {/* Section header */}
        <div className="flex flex-col gap-5 border-b border-neutral-100 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Featured Properties</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              Private Estates &amp;<br className="hidden sm:block" /> Signature Homes
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-7 text-neutral-500">
              Each listing connects the browsing moment to an instant AI-assisted
              conversation — buyers get answers before they leave the page.
            </p>
            <a
              href="#listings"
              className="mt-4 inline-block text-sm font-semibold text-neutral-950 underline underline-offset-4 transition hover:text-[#8c743f]"
            >
              View all listings &rarr;
            </a>
          </div>
        </div>

        {/* Listing grid — 3 col on desktop */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className="soft-lift group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white"
            >
              {/* Property image placeholder */}
              <div
                className={`${listing.imageClass} relative flex h-[230px] flex-col justify-between p-4`}
                role="img"
                aria-label={`${listing.address} luxury property`}
              >
                {/* Status badge */}
                {listing.status && (
                  <span className="self-start rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-neutral-950">
                    {listing.status}
                  </span>
                )}
                {/* Neighborhood badge — bottom left */}
                <div className="flex items-end justify-between">
                  <span className="rounded-full bg-black/50 px-3 py-1 text-[0.7rem] font-semibold text-white/90 backdrop-blur-sm">
                    {listing.neighborhood}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-5">
                {/* Price */}
                <p className="text-2xl font-semibold tracking-tight text-neutral-950">
                  {listing.price}
                </p>

                {/* Address */}
                <h3 className="mt-1.5 text-[0.88rem] font-medium text-neutral-700">
                  {listing.address}
                </h3>

                {/* Specs row */}
                <div className="mt-3 flex items-center gap-3 text-[0.78rem] text-neutral-500">
                  <span>{listing.beds} Beds</span>
                  <span className="text-neutral-300">&middot;</span>
                  <span>{listing.baths} Baths</span>
                  <span className="text-neutral-300">&middot;</span>
                  <span>{listing.squareFeet} Sq Ft</span>
                </div>

                {/* Summary */}
                <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">
                  {listing.summary}
                </p>

                {/* Divider */}
                <div className="my-4 border-t border-neutral-100" />

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="#concierge"
                    data-listing-id={listing.id}
                    className="rounded-full bg-neutral-950 px-3 py-2.5 text-center text-[0.75rem] font-semibold text-white transition hover:bg-[#8c743f]"
                  >
                    Ask AI About This Home
                  </a>
                  <a
                    href="#crm"
                    className="rounded-full border border-neutral-300 px-3 py-2.5 text-center text-[0.75rem] font-semibold text-neutral-900 transition hover:border-[#8c743f] hover:text-[#8c743f]"
                  >
                    Private Showing
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-neutral-100 pt-10 sm:flex-row sm:justify-between">
          <p className="text-sm text-neutral-500">
            Showing {listings.length} curated listings · New properties added weekly
          </p>
          <a
            href="#concierge"
            className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
          >
            Ask AI to Find More Matches
          </a>
        </div>
      </div>
    </section>
  );
}
