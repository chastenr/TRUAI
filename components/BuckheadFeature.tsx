import { featuredListing as p } from "@/data/listings";
import AskNalaButton from "./AskNalaButton";

export default function BuckheadFeature() {
  return (
    <section data-reveal className="bg-neutral-950 py-16 text-white sm:py-24">
      <div className="section-shell">
        {/* Section header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Featured Listing · {p.neighborhood}</p>
            <h2 className="display-serif mt-3 text-4xl text-white sm:text-5xl">
              {p.address}<br className="hidden sm:block" />
              <span className="text-[#e0be6e]">{p.city}, {p.state}</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-7 text-white/50">
              Real listing data from Abbie Shepherd Real Estate Group, demonstrating NALA&apos;s ability
              to answer property questions, qualify buyers, and route inquiries to an advisor.
            </p>
            <span className="mt-3 inline-block rounded-full border border-[#e0be6e]/30 bg-[#e0be6e]/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[#e0be6e]">
              Public Listing Data · abbieagent.com
            </span>
          </div>
        </div>

        {/* Listing card */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left: property image + overview */}
          <div>
            {/* Property media */}
            <div className={`${p.imageClass} relative h-[320px] overflow-hidden rounded-2xl sm:h-[400px]`}>
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={`${p.address} property photo`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm">
                    Photo Coming Soon
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {/* Specs overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-3xl font-semibold text-white sm:text-4xl">{p.price}</p>
                    <p className="mt-1 text-sm text-white/65">{p.address}</p>
                    <p className="text-sm text-white/50">{p.city}, {p.state} {p.zip}</p>
                  </div>
                  <div className="flex gap-3 text-sm text-white/80">
                    <span>{p.beds} Beds</span>
                    <span className="text-white/30">·</span>
                    <span>{p.baths} Baths</span>
                    <span className="text-white/30">·</span>
                    <span>{p.squareFeet} Sq Ft</span>
                  </div>
                </div>
              </div>
              {/* Status badge */}
              <div className="absolute left-5 top-5 flex items-center gap-2">
                <span className="rounded-full bg-[#c49a3c] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-neutral-950">
                  {p.status}
                </span>
                <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[0.68rem] font-semibold text-white/80 backdrop-blur-sm">
                  {p.neighborhood} · {p.city}
                </span>
              </div>
            </div>

            {/* Key details */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Year Built",  value: p.yearBuilt ? `${p.yearBuilt}` : "Verify with agent" },
                { label: "Lot Size",    value: p.lotSize ?? "Verify with agent" },
                { label: "Garage",      value: p.garage ?? "Verify with agent" },
                { label: "Price/Sq Ft", value: p.pricePerSqFt },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-center">
                  <p className="text-base font-semibold text-[#e0be6e]">{s.value}</p>
                  <p className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-white/40">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">Key Features</p>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                    <span className="mt-0.5 shrink-0 text-[#c49a3c]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: financials + CTAs */}
          <div className="flex flex-col gap-4">
            {/* Overview */}
            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">Property Summary</p>
              <p className="mt-3 text-sm leading-7 text-white/70">{p.summary}</p>
            </div>

            {/* Financials */}
            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">Financial Summary</p>
              <dl className="mt-3 space-y-2.5 text-sm">
                {[
                  ["Est. Monthly",     p.financials.estimatedMonthly],
                  ["Property Tax",     p.financials.estimatedPropertyTax],
                  ["HOA",              p.financials.hoa],
                  ["Showing Req.",     p.financials.showingRequirement],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 border-b border-white/6 pb-2.5 last:border-0">
                    <dt className="text-white/45">{label}</dt>
                    <dd className="text-right font-medium text-white/80">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[0.65rem] leading-5 text-white/30">
                Estimates for demo purposes only. Verify with lender and advisor.
              </p>
            </div>

            {/* Nearby */}
            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">Nearby</p>
              <ul className="mt-3 space-y-1.5">
                {p.nearby.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="text-[#c49a3c]">◎</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <AskNalaButton
                address={p.address}
                className="block rounded-full bg-[#c49a3c] px-5 py-3.5 text-center text-sm font-semibold text-neutral-950 transition hover:bg-white"
              >
                Ask NALA About This Property
              </AskNalaButton>
              <a
                href="/#crm"
                className="block rounded-full border border-white/20 px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Request Private Showing
              </a>
              <a
                href={`/listings/${p.slug}`}
                className="block rounded-full border border-white/10 px-5 py-3.5 text-center text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
              >
                View Full Listing Details →
              </a>
            </div>

            {/* Disclosure */}
            <p className="text-[0.65rem] leading-5 text-white/25 text-center">
              {p.disclosure.split(".")[0]}. All details fictional and for demo purposes only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
