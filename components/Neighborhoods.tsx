const neighborhoods = [
  {
    id: "bel-air",
    name: "Bel Air",
    tagline: "Gated canyon estates with old-money prestige and sweeping views.",
    activeListings: 14,
    startingAt: "$3.2M",
    gradientClass: "neighborhood-gradient-1",
  },
  {
    id: "malibu",
    name: "Malibu",
    tagline: "Beachfront living with Pacific panoramas and private sandy retreats.",
    activeListings: 9,
    startingAt: "$4.8M",
    gradientClass: "neighborhood-gradient-2",
  },
  {
    id: "beverly-hills",
    name: "Beverly Hills",
    tagline: "The global benchmark for luxury real estate and refined living.",
    activeListings: 22,
    startingAt: "$2.9M",
    gradientClass: "neighborhood-gradient-3",
  },
  {
    id: "pacific-palisades",
    name: "Pacific Palisades",
    tagline: "Village charm and hillside elegance near the ocean bluffs.",
    activeListings: 11,
    startingAt: "$3.5M",
    gradientClass: "neighborhood-gradient-4",
  },
  {
    id: "brentwood",
    name: "Brentwood",
    tagline: "Quiet tree-lined streets, elite schools, and curated California estates.",
    activeListings: 8,
    startingAt: "$2.4M",
    gradientClass: "neighborhood-gradient-5",
  },
  {
    id: "west-hollywood",
    name: "West Hollywood",
    tagline: "Urban luxury near the Sunset Strip with full-service building amenities.",
    activeListings: 6,
    startingAt: "$1.8M",
    gradientClass: "neighborhood-gradient-6",
  },
];

export default function Neighborhoods() {
  return (
    <section id="neighborhoods" data-reveal className="bg-[#f8f6f2] py-16 sm:py-24">
      <div className="section-shell">
        {/* Section header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Explore by Neighborhood</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              Los Angeles&apos;<br className="hidden sm:block" /> Premier Markets
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            Our advisors specialize in LA&apos;s most sought-after communities. Ask our AI
            concierge to compare neighborhoods or suggest the right area for your lifestyle.
          </p>
        </div>

        {/* Neighborhood grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n) => (
            <a
              key={n.id}
              href="#listings"
              className="soft-lift group relative flex h-[240px] flex-col justify-end overflow-hidden rounded-lg p-6"
              aria-label={`Explore ${n.name} listings`}
            >
              {/* Background */}
              <div
                className={`${n.gradientClass} absolute inset-0 transition-transform duration-500 group-hover:scale-105`}
                aria-hidden="true"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative">
                <div className="flex items-end justify-between">
                  <h3 className="display-serif text-2xl text-white">{n.name}</h3>
                  <span className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[0.65rem] font-semibold text-white/80 backdrop-blur-sm">
                    {n.activeListings} listings
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">{n.tagline}</p>
                <p className="mt-3 text-xs font-semibold text-[#d4b87a]">
                  From {n.startingAt}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Ask AI CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-lg border border-neutral-200 bg-white px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-semibold text-neutral-950">Not sure which neighborhood fits?</p>
            <p className="mt-1 text-sm text-neutral-500">
              Our AI concierge can compare schools, commutes, lifestyle, and pricing across every market.
            </p>
          </div>
          <a
            href="#concierge"
            className="shrink-0 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8c743f]"
          >
            Ask the AI Concierge
          </a>
        </div>
      </div>
    </section>
  );
}
