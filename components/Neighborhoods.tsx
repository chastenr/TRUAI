const neighborhoods = [
  {
    id: "buckhead",
    name: "Buckhead",
    tagline: "Intown Atlanta's premier address — upscale living, top private schools, Buckhead Village dining.",
    activeListings: 14,
    startingAt: "$800K+",
    gradientClass: "neighborhood-gradient-1",
  },
  {
    id: "brookhaven",
    name: "Brookhaven",
    tagline: "Vibrant intown community with strong walkability, award-winning schools, and a thriving dining scene.",
    activeListings: 11,
    startingAt: "$500K+",
    gradientClass: "neighborhood-gradient-6",
  },
  {
    id: "sandy-springs",
    name: "Sandy Springs",
    tagline: "Spacious homes, top-rated Fulton County schools, and easy GA-400 access.",
    activeListings: 10,
    startingAt: "$600K+",
    gradientClass: "neighborhood-gradient-4",
  },
  {
    id: "east-cobb-roswell",
    name: "East Cobb / Roswell",
    tagline: "Family-friendly communities, excellent Cobb County schools, and north Atlanta convenience.",
    activeListings: 18,
    startingAt: "$450K+",
    gradientClass: "neighborhood-gradient-2",
  },
  {
    id: "midtown-decatur",
    name: "Midtown / Decatur",
    tagline: "Urban living with arts, dining, and walkable neighborhoods in the heart of Atlanta.",
    activeListings: 9,
    startingAt: "$400K+",
    gradientClass: "neighborhood-gradient-3",
  },
  {
    id: "peachtree-city",
    name: "Peachtree City / South Atlanta",
    tagline: "Golf cart community living, Fayette County schools, and family-focused neighborhoods.",
    activeListings: 7,
    startingAt: "$400K+",
    gradientClass: "neighborhood-gradient-5",
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
              Atlanta&apos;s<br className="hidden sm:block" /> Premier Markets
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            Abbie Shepherd Real Estate Group serves buyers and sellers across greater Atlanta.
            Ask NALA to compare neighborhoods, schools, commutes, or pricing — instantly.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n) => (
            <a
              key={n.id}
              href="#listings"
              className="soft-lift group relative flex h-[240px] flex-col justify-end overflow-hidden rounded-lg p-6"
              aria-label={`Explore ${n.name} listings`}
            >
              <div
                className={`${n.gradientClass} absolute inset-0 transition-transform duration-500 group-hover:scale-105`}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-end justify-between">
                  <h3 className="display-serif text-2xl text-white">{n.name}</h3>
                  <span className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[0.65rem] font-semibold text-white/80 backdrop-blur-sm">
                    {n.activeListings} listings
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">{n.tagline}</p>
                <p className="mt-3 text-xs font-semibold text-[#e0be6e]">
                  From {n.startingAt}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Ask AI CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-lg border border-neutral-200 bg-white px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-semibold text-neutral-950">Not sure which Greater Atlanta community fits your needs?</p>
            <p className="mt-1 text-sm text-neutral-500">
              NALA can compare schools, commutes, lifestyle, and pricing across every Abbie Shepherd market — instantly.
            </p>
          </div>
          <a
            href="#concierge"
            className="shrink-0 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9a7620]"
          >
            Ask NALA
          </a>
        </div>
      </div>
    </section>
  );
}
