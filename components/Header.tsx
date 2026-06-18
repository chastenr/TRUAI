"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#listings",      label: "Buy" },
  { href: "#crm",           label: "Sell" },
  { href: "#neighborhoods", label: "Neighborhoods" },
  { href: "#team",          label: "Team" },
  { href: "#concierge",     label: "AI Concierge" },
];

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "text-neutral-900" : "text-white";
  const bgClass   = scrolled
    ? "bg-white/98 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md"
    : "bg-transparent";

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${bgClass}`}>
      <div className="section-shell flex min-h-[72px] items-center justify-between gap-6">

        {/* Logo */}
        <a
          href="#top"
          className="flex shrink-0 flex-col leading-tight"
          aria-label="Abbie Shepherd Real Estate Group home"
        >
          <span className={`text-[0.96rem] font-semibold tracking-wide transition-colors duration-300 ${textColor}`}>
            Abbie Shepherd
          </span>
          <span className={`text-[0.56rem] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
            scrolled ? "text-neutral-400" : "text-white/60"
          }`}>
            Real Estate Group · KW Buckhead
          </span>
          <span className={`mt-0.5 text-[0.48rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
            scrolled ? "text-[#c49a3c]" : "text-[#e0be6e]/75"
          }`}>
            Powered by NALA
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[0.82rem] font-medium transition-opacity hover:opacity-55 ${textColor}`}
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
                ? "bg-neutral-950 text-white hover:bg-[#9a7620]"
                : "bg-[#c49a3c] text-neutral-950 hover:bg-[#e0be6e]"
            }`}
          >
            View Listings
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`flex flex-col gap-[5px] p-2 md:hidden ${textColor}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`block h-[1.5px] w-6 bg-current transition-all duration-200 ${mobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] w-6 bg-current transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-6 bg-current transition-all duration-200 ${mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[640px] border-t border-neutral-100 bg-white" : "max-h-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col px-5 pb-6 pt-4" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-neutral-100 py-4 text-sm font-medium text-neutral-800 transition hover:text-[#c49a3c]"
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
              className="rounded-full bg-[#c49a3c] px-5 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:bg-[#9a7620] hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              View Listings
            </a>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-2.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.5rem] font-bold text-white">N</span>
            <span className="text-[0.62rem] font-semibold text-neutral-500">
              NALA-powered demo — Northside Advanced Learning Applications, Inc.
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
