const navItems = [
  { href: "#listings", label: "Listings" },
  { href: "#concierge", label: "AI Concierge" },
  { href: "#crm", label: "CRM Demo" },
  { href: "#team", label: "Team" },
];

export default function Header() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50 bg-transparent">
      <div className="reveal-down mx-auto flex min-h-20 w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4">
        <a href="#top" className="flex flex-col leading-tight" aria-label="Apex Luxe Realty Group home">
          <span className="text-base font-semibold tracking-wide text-white drop-shadow">Apex Luxe</span>
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white/80 drop-shadow">
            Realty Group
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-white/92 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="drop-shadow-sm transition hover:text-white/70">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#concierge"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-[#b9985a]"
        >
          Ask Concierge
        </a>
      </div>
    </header>
  );
}
