import Image from "next/image";

const stats = [
  { value: "$2.1B+", label: "Sales Volume" },
  { value: "400+",   label: "Transactions" },
  { value: "18 yrs", label: "Experience" },
  { value: "24/7",   label: "AI Concierge" },
];

const quickLinks = [
  ["Buy",           "#listings"],
  ["Sell",          "#crm"],
  ["Neighborhoods", "#neighborhoods"],
  ["AI Concierge",  "#concierge"],
] as const;

const aiQuestions = [
  "Is 31802 Pacific Cove Lane still available?",
  "Which neighborhoods allow short-term rentals?",
  "Can I tour a property this weekend?",
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#06090f] text-white">

      {/* ── Background photograph (future.png → /public/hero-bg.png) ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-bg.png"
          alt="Luxury modern estate — Luminary Realty Group powered by NALA"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Layered overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/65 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/80 to-transparent" />
        {/* Subtle blue-gold rim light */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_60%_at_70%_30%,rgba(30,58,138,0.18),transparent_70%)]" />
      </div>

      {/* ── Content ── */}
      <div className="section-shell relative grid min-h-screen gap-8 pb-12 pt-24 sm:pt-28 lg:grid-cols-[1fr_380px] lg:items-end lg:gap-12">

        {/* Left: editorial copy */}
        <div className="flex flex-col justify-between gap-10">
          <div className="reveal-down max-w-3xl">
            {/* NALA badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c49a3c]/30 bg-[#c49a3c]/10 px-3 py-1.5 backdrop-blur-sm">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#c49a3c] text-[0.48rem] font-bold text-neutral-950">N</span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#e0be6e]">
                Powered by NALA — Northside Advanced Learning Applications
              </span>
            </div>

            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#c49a3c]">
              Luminary Realty Group &nbsp;·&nbsp; Los Angeles &amp; Atlanta
            </p>
            <h1 className="display-serif mt-4 text-[2.8rem] leading-[1.06] text-white drop-shadow-xl sm:text-[3.8rem] lg:text-[4.8rem]">
              Exceptional Homes.<br />
              <em className="italic text-[#e0be6e]">Guided by AI.</em>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/78 sm:text-[1.04rem]">
              Browse curated estate listings across Bel Air, Malibu, Beverly Hills, and
              Buckhead Atlanta. Ask questions instantly through NALA — our 24/7 AI
              concierge — and connect with the right advisor.
            </p>

            {/* Search bar */}
            <div className="reveal-down reveal-delay-2 mt-8 w-full max-w-2xl">
              <div className="flex overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <label className="sr-only" htmlFor="hero-search">
                  Search by city, neighborhood, address, or ZIP
                </label>
                <input
                  id="hero-search"
                  type="search"
                  className="min-h-[56px] flex-1 bg-white/95 px-5 text-sm text-neutral-950 outline-none backdrop-blur-md placeholder:text-neutral-400"
                  placeholder="City, Neighborhood, Address, or ZIP…"
                />
                <a
                  href="#listings"
                  className="flex min-h-[56px] items-center bg-[#c49a3c] px-7 text-[0.8rem] font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
                >
                  Search
                </a>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {quickLinks.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="rounded-full border border-white/20 bg-black/25 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm transition hover:border-white/45 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="reveal-down reveal-delay-3 mt-auto pb-8 lg:pb-10">
            <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-black/40 px-5 py-4 backdrop-blur-sm">
                  <p className="text-xl font-semibold text-[#e0be6e] sm:text-2xl">{s.value}</p>
                  <p className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-widest text-white/45">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: NALA glassmorphism card — desktop only */}
        <div className="reveal-down reveal-delay-4 hidden self-end pb-10 lg:block">
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-black/55 shadow-2xl backdrop-blur-xl">
            {/* Card header */}
            <div className="flex items-center gap-3 border-b border-white/8 bg-gradient-to-r from-[#c49a3c]/20 to-transparent px-5 py-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.6rem] font-bold text-neutral-950">
                NALA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">NALA AI Concierge</p>
                <p className="text-[0.68rem] text-white/50">Powered by Trulience · 24/7</p>
              </div>
              <span className="relative flex size-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
            </div>

            {/* Card body */}
            <div className="p-5">
              <p className="text-sm leading-7 text-white/70">
                &ldquo;Hello! I&apos;m NALA — I can answer questions about any listing, check
                availability, schedule a private showing, or connect you with one of our
                advisors any time.&rdquo;
              </p>
              <div className="mt-4 space-y-2">
                {aiQuestions.map((q) => (
                  <a
                    key={q}
                    href="#concierge"
                    className="block rounded-lg border border-white/10 px-3 py-2.5 text-xs leading-5 text-white/65 transition hover:border-[#c49a3c]/50 hover:bg-white/5 hover:text-white"
                  >
                    {q}
                  </a>
                ))}
              </div>
              <a
                href="#concierge"
                className="mt-5 block rounded-full bg-[#c49a3c] px-5 py-2.5 text-center text-xs font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
              >
                Ask NALA a Question
              </a>
            </div>

            {/* Card footer */}
            <div className="border-t border-white/6 bg-black/20 px-5 py-2.5">
              <p className="text-[0.6rem] text-white/30">
                Powered by NALA — Northside Advanced Learning Applications, Inc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
