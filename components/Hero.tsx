const stats = [
  { value: "$2.1B+", label: "Sales Volume" },
  { value: "400+", label: "Transactions" },
  { value: "18 yrs", label: "Experience" },
  { value: "24/7", label: "AI Concierge" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#080b14] text-white"
    >
      {/* ── Blue-hour luxury estate scene ───────────────────────────────── */}
      <div
        className="absolute inset-0"
        role="img"
        aria-label="Luxury modern estate at blue hour with lit interior windows"
      >
        {/* Sky — deep blue hour */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07091a] via-[#0e1530] to-[#1a160a]" />
        {/* Horizon warm atmospheric glow */}
        <div className="hero-horizon-glow absolute bottom-[22%] left-0 right-0 h-[32%]" />
        {/* Subtle sky luminance */}
        <div className="hero-sky-stars absolute inset-0 opacity-[0.18]" />

        {/* ── Ground / manicured landscape ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-gradient-to-t from-[#040604] via-[#08100a] to-[#0c1209]" />

        {/* ── Main estate structure — wide, low, horizontal ── */}
        <div className="absolute bottom-[22%] left-[20%] right-[3%] h-[32%] bg-[#cbc3b4]" />
        {/* Flat roof overhang */}
        <div className="hero-roof-main absolute left-[18%] right-[1%] h-[3.5%] bg-[#0e0e10]" />
        {/* Soffit underside shadow */}
        <div className="hero-soffit-main absolute left-[20%] right-[3%] h-[1.5%] bg-[#1c1a16]" />

        {/* ── Left wing / guest pavilion ── */}
        <div className="absolute bottom-[22%] left-[5%] h-[20%] w-[20%] bg-[#c4bdb0]" />
        <div className="hero-roof-wing absolute left-[3%] h-[3%] w-[22%] bg-[#0e0e10]" />
        <div className="hero-soffit-wing absolute left-[5%] h-[1.5%] w-[20%] bg-[#1c1a16]" />

        {/* ── Center entry tower / vertical feature ── */}
        <div className="absolute bottom-[22%] left-[31%] h-[38%] w-[8%] bg-[#d8d0c2]" />
        <div className="hero-roof-entry absolute left-[30%] h-[3%] w-[10%] bg-[#0e0e10]" />

        {/* ── Windows — warm amber lit interior ── */}
        {/* Entry glass panels */}
        <div className="absolute bottom-[22%] left-[32%] h-[33%] w-[3%] bg-[#e0a030]/72" />
        <div className="hero-win-entry absolute bottom-[22%] left-[32%] h-[33%] w-[3%]" />
        <div className="absolute bottom-[22%] left-[36%] h-[33%] w-[3%] bg-[#d89020]/65" />

        {/* Main living room window wall — six floor-to-ceiling panels */}
        <div className="hero-win-1 absolute bottom-[22%] left-[43%] h-[28%] w-[5.5%]" />
        {/* Mullion */}
        <div className="absolute bottom-[22%] left-[49.2%] h-[1%] w-[0.3%] bg-[#0e0e10]" />
        <div className="hero-win-2 absolute bottom-[22%] left-[49.5%] h-[28%] w-[5.5%]" />
        <div className="hero-win-3 absolute bottom-[22%] left-[55.7%] h-[28%] w-[5.5%]" />
        <div className="hero-win-4 absolute bottom-[22%] left-[61.9%] h-[28%] w-[5.5%]" />
        <div className="hero-win-5 absolute bottom-[22%] left-[68%]   h-[28%] w-[5.5%]" />
        <div className="hero-win-6 absolute bottom-[22%] left-[74%]   h-[28%] w-[5.5%]" />

        {/* Clerestory strip — thin window band at roofline */}
        <div className="hero-clerestory absolute left-[20%] right-[3%] h-[3%]" />

        {/* Left wing windows — bedroom scale */}
        <div className="absolute bottom-[22%] left-[7%]  h-[15%] w-[4%] bg-[#b07820]/60" />
        <div className="absolute bottom-[22%] left-[12%] h-[15%] w-[4%] bg-[#a07018]/52" />
        <div className="absolute bottom-[22%] left-[17%] h-[15%] w-[3%] bg-[#987018]/45" />

        {/* Far right wing accent windows */}
        <div className="hero-win-right absolute bottom-[30%] left-[82%] right-[3%] h-[18%]" />

        {/* ── Pool / reflecting water feature ── */}
        <div className="hero-pool absolute bottom-[3%] left-[24%] h-[10%] w-[58%]" />
        {/* Pool coping stone edges */}
        <div className="hero-pool-coping-top    absolute left-[24%] h-[0.6%] w-[58%] bg-[#1a1810]" />
        <div className="hero-pool-coping-bottom absolute left-[24%] h-[0.6%] w-[58%] bg-[#1c1a12]" />
        {/* Window reflections on pool surface */}
        <div className="hero-pool-ref-1 absolute left-[44%] h-[8%] w-[5%]" />
        <div className="hero-pool-ref-2 absolute left-[50%] h-[8%] w-[5%]" />
        <div className="hero-pool-ref-3 absolute left-[56%] h-[8%] w-[5%]" />
        {/* Water shimmer overlay */}
        <div className="hero-pool-shimmer absolute left-[24%] h-[10%] w-[58%]" />

        {/* ── Landscape edges ── */}
        <div className="hero-foliage-left  absolute bottom-[22%] left-0  h-[22%] w-[6%]" />
        <div className="hero-foliage-right absolute bottom-[22%] right-0 h-[30%] w-[4%]" />
        {/* Driveway / motor court */}
        <div className="absolute bottom-[13%] left-[24%] h-[9%] w-[18%] bg-[#0f1010]" />

        {/* ── Exterior ground uplights ── */}
        <div className="hero-uplight-1 absolute" />
        <div className="hero-uplight-2 absolute" />
        <div className="hero-pathlight  absolute" />

        {/* ── Readability overlays ── */}
        {/* Left dark gradient — headline text zone */}
        <div className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-black/88 via-black/54 to-transparent" />
        {/* Top — keeps sticky nav readable */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Bottom — grounds the stats bar */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/72 to-transparent" />
      </div>

      {/* ── Page content ── */}
      <div className="section-shell relative grid min-h-screen pb-12 pt-24 sm:pt-28 lg:grid-cols-[1fr_380px] lg:items-end lg:gap-12">
        {/* Left column: editorial copy */}
        <div className="flex flex-col justify-between gap-10">
          {/* Headline block */}
          <div className="reveal-down max-w-3xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#d4b87a]">
              Apex Luxe Realty Group &nbsp;·&nbsp; Los Angeles
            </p>
            <h1 className="display-serif mt-5 text-[2.8rem] leading-[1.06] text-white drop-shadow-md sm:text-[3.8rem] lg:text-[4.8rem]">
              Exceptional Homes.<br />
              <em className="text-[#d4b87a]">Guided by AI.</em>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/76 sm:text-[1.04rem]">
              Browse curated estate listings across Bel Air, Malibu, Beverly Hills, and the
              Palisades. Ask questions instantly through our AI concierge and connect with
              the right advisor.
            </p>

            {/* Property search */}
            <div className="reveal-down reveal-delay-2 mt-8 w-full max-w-2xl">
              <div className="flex shadow-2xl">
                <label className="sr-only" htmlFor="hero-search">
                  Search by city, neighborhood, address, or ZIP
                </label>
                <input
                  id="hero-search"
                  type="search"
                  className="min-h-[56px] flex-1 bg-white px-5 text-sm text-neutral-950 outline-none placeholder:text-neutral-400"
                  placeholder="City, Neighborhood, Address, or ZIP"
                />
                <a
                  href="#listings"
                  className="flex min-h-[56px] items-center bg-neutral-950 px-7 text-[0.8rem] font-semibold text-white transition hover:bg-[#8c743f]"
                >
                  Search
                </a>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(
                  [
                    ["Buy", "#listings"],
                    ["Sell", "#crm"],
                    ["Neighborhoods", "#neighborhoods"],
                    ["AI Concierge", "#concierge"],
                  ] as const
                ).map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="rounded-full border border-white/22 bg-black/22 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm transition hover:border-white/44 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="reveal-down reveal-delay-3 mt-auto pb-8 lg:pb-10">
            <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-black/36 px-4 py-4 sm:px-5">
                  <p className="text-xl font-semibold text-[#d4b87a] sm:text-2xl">{s.value}</p>
                  <p className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-widest text-white/50">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: floating AI concierge card — desktop only */}
        <div className="reveal-down reveal-delay-4 hidden self-end pb-10 lg:block">
          <div className="rounded-lg border border-white/12 bg-black/44 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#b9985a] text-xs font-semibold text-neutral-950">
                AI
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Apex AI Concierge</p>
                <p className="text-xs text-white/55">Powered by Trulience</p>
              </div>
              <span className="relative flex size-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
            </div>
            <p className="mt-5 text-sm leading-[1.75] text-white/70">
              &ldquo;Hello! I can answer questions about any listing, check availability,
              schedule a private showing, or connect you with one of our advisors.&rdquo;
            </p>
            <div className="mt-5 space-y-2">
              {[
                "Is 31802 Pacific Cove Lane still available?",
                "Which neighborhoods allow short-term rentals?",
                "Can I tour a property this weekend?",
              ].map((q) => (
                <a
                  key={q}
                  href="#concierge"
                  className="block rounded border border-white/12 px-3 py-2.5 text-xs leading-5 text-white/70 transition hover:border-[#b9985a]/50 hover:text-white"
                >
                  {q}
                </a>
              ))}
            </div>
            <a
              href="#concierge"
              className="mt-5 block rounded-full bg-[#b9985a] px-5 py-2.5 text-center text-xs font-semibold text-neutral-950 transition hover:bg-white"
            >
              Ask a Question
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
