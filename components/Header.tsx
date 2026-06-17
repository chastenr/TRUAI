"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#listings", label: "Buy" },
  { href: "#crm", label: "Sell" },
  { href: "#neighborhoods", label: "Neighborhoods" },
  { href: "#team", label: "Team" },
  { href: "#concierge", label: "AI Concierge" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrolledText = scrolled ? "text-neutral-900" : "text-white";
  const scrolledBg = scrolled ? "bg-white/98 shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolledBg} ${scrolled ? "backdrop-blur-md" : ""}`}
    >
      <div className="section-shell flex min-h-[72px] items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#top"
          className="flex shrink-0 flex-col leading-tight"
          aria-label="Apex Luxe Realty Group home"
        >
          <span
            className={`text-[0.92rem] font-semibold tracking-wide transition-colors duration-300 ${scrolledText}`}
          >
            Apex Luxe
          </span>
          <span
            className={`text-[0.58rem] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
              scrolled ? "text-neutral-400" : "text-white/65"
            }`}
          >
            Realty Group
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[0.82rem] font-medium transition-opacity hover:opacity-55 ${scrolledText}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#crm"
            className={`rounded-full px-5 py-2 text-[0.78rem] font-semibold transition-all ${
              scrolled
                ? "border border-neutral-300 text-neutral-800 hover:border-neutral-900"
                : "border border-white/28 text-white hover:border-white"
            }`}
          >
            Schedule Showing
          </a>
          <a
            href="#listings"
            className={`rounded-full px-5 py-2 text-[0.78rem] font-semibold transition-all ${
              scrolled
                ? "bg-neutral-950 text-white hover:bg-[#8c743f]"
                : "bg-white text-neutral-950 hover:bg-[#b9985a] hover:text-white"
            }`}
          >
            View Listings
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`flex flex-col gap-[5px] p-2 md:hidden ${scrolledText}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={mobileOpen ? "true" : "false"}
        >
          <span
            className={`block h-[1.5px] w-6 bg-current transition-all duration-200 ${
              mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-current transition-all duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-current transition-all duration-200 ${
              mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[600px] border-t border-neutral-100 bg-white" : "max-h-0"
        }`}
        aria-hidden={mobileOpen ? "false" : "true"}
      >
        <nav className="flex flex-col px-5 pb-6 pt-4" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-neutral-100 py-4 text-sm font-medium text-neutral-800 transition hover:text-[#b9985a]"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-5 flex flex-col gap-3">
            <a
              href="#crm"
              className="rounded-full border border-neutral-300 px-5 py-3 text-center text-sm font-semibold text-neutral-800 transition hover:border-neutral-950"
              onClick={() => setMobileOpen(false)}
            >
              Schedule a Showing
            </a>
            <a
              href="#listings"
              className="rounded-full bg-neutral-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#8c743f]"
              onClick={() => setMobileOpen(false)}
            >
              View Listings
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
