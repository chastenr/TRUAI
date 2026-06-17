import { listings } from "@/data/listings";

export default function FeaturedListings() {
  return (
    <section id="listings" data-reveal className="bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Featured Listings</p>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-950 sm:text-4xl">Private estates and signature homes</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-600">
            Each listing card connects the browsing moment to an AI-assisted conversation, helping visitors ask before
            they leave the page.
          </p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {listings.map((listing) => (
            <article key={listing.id} className="soft-lift overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
              <div
                className={`${listing.imageClass} flex h-64 items-end p-5`}
                role="img"
                aria-label={`${listing.address} luxury property placeholder`}
              >
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-950">
                  {listing.neighborhood}
                </span>
              </div>
              <div className="p-5">
                <p className="text-2xl font-semibold text-neutral-950">{listing.price}</p>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">{listing.address}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{listing.summary}</p>
                <p className="mt-4 text-sm font-medium text-neutral-700">
                  {listing.beds} Beds / {listing.baths} Baths / {listing.squareFeet} Sq Ft
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <a
                    href="#concierge"
                    data-listing-id={listing.id}
                    className="rounded-full bg-neutral-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#8c743f]"
                  >
                    Ask About This Property
                  </a>
                  <a
                    href="#crm"
                    className="rounded-full border border-neutral-300 px-4 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:border-[#8c743f] hover:text-[#8c743f]"
                  >
                    Schedule Showing
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
