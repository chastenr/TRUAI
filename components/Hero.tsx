export default function Hero() {
  return (
    <section id="top" className="relative min-h-[700px] overflow-hidden bg-neutral-950 text-white">
      <div
        className="absolute inset-0"
        role="img"
        aria-label="Luxury modern home exterior placeholder at dusk"
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#171717_0%,#353738_34%,#d8d2c6_34%,#eee9df_58%,#2c2d2d_58%,#111_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.5),rgba(0,0,0,.2)_46%,rgba(0,0,0,.58))]" />
        <div className="absolute bottom-0 left-[8%] h-[48%] w-[40%] bg-[#f1eee7]/82" />
        <div className="absolute bottom-[48%] left-[8%] h-[11%] w-[40%] skew-x-[-14deg] bg-[#25282b]" />
        <div className="absolute bottom-0 right-[12%] h-[61%] w-[28%] bg-[#f7f3ea]/82" />
        <div className="absolute bottom-[61%] right-[12%] h-[9%] w-[28%] skew-x-[14deg] bg-[#26282a]" />
        <div className="absolute bottom-[9%] left-[29%] h-[26%] w-[14%] bg-[#c79645]/52" />
      </div>

      <div className="section-shell relative flex min-h-[700px] flex-col items-center justify-center pb-14 pt-28 text-center">
        <div className="reveal-down reveal-delay-1 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/78">Apex Luxe Realty Group</p>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.02] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            Luxury Real Estate, Guided by AI Concierge Support
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/84 sm:text-lg">
            Explore premium properties, ask questions instantly, and connect with the right advisor through an
            AI-powered real estate concierge experience.
          </p>
        </div>

        <div className="reveal-down reveal-delay-2 mt-9 w-full max-w-3xl text-left shadow-xl">
          <div className="flex w-fit bg-white text-sm font-semibold text-neutral-950">
            <a href="#listings" className="px-8 py-3 transition hover:bg-neutral-100">
              Buy
            </a>
            <a href="#crm" className="bg-neutral-100 px-8 py-3 transition hover:bg-neutral-50">
              Sell
            </a>
            <a href="#concierge" className="bg-neutral-100 px-8 py-3 transition hover:bg-neutral-50">
              Concierge
            </a>
          </div>
          <div className="flex flex-col gap-3 bg-white p-3 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="hero-search">
              Search by city, neighborhood, address, school, ZIP, agent, or MLS number
            </label>
            <input
              id="hero-search"
              className="min-h-14 flex-1 px-3 text-base text-neutral-950 outline-none placeholder:text-neutral-400"
              placeholder="City, Neighborhood, Address, School, ZIP, Agent, MLS #"
            />
            <a
              href="#listings"
              className="flex min-h-14 items-center justify-center bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-[#8c743f]"
              aria-label="Search featured listings"
            >
              Search
            </a>
          </div>
        </div>

        <div className="reveal-down reveal-delay-3 mt-5 grid w-full max-w-3xl gap-2 text-left sm:grid-cols-3">
          <a href="#listings" className="border border-white/14 bg-black/28 p-4 backdrop-blur transition hover:bg-black/40">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/58">Explore</span>
            <span className="mt-1 block font-semibold">View Featured Listings</span>
          </a>
          <a href="#concierge" className="border border-white/14 bg-black/28 p-4 backdrop-blur transition hover:bg-black/40">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/58">Instant Answers</span>
            <span className="mt-1 block font-semibold">Ask the AI Concierge</span>
          </a>
          <a href="#crm" className="border border-white/14 bg-black/28 p-4 backdrop-blur transition hover:bg-black/40">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/58">Follow Up</span>
            <span className="mt-1 block font-semibold">Request a Private Showing</span>
          </a>
        </div>

        <div className="reveal-down reveal-delay-4 absolute bottom-5 right-4 hidden w-[340px] rounded-lg border border-white/14 bg-black/28 p-4 text-left text-white backdrop-blur md:block">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral-950">
              AI
            </div>
            <div>
              <h2 className="font-semibold">Apex AI Concierge</h2>
              <p className="text-sm text-white/65">Property answers, tours, CRM routing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
