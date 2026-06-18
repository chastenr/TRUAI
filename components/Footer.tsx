const quickLinks = [
  { label: "Featured Listings", href: "#listings" },
  { label: "Neighborhoods", href: "#neighborhoods" },
  { label: "AI Concierge", href: "#concierge" },
  { label: "Our Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

const services = [
  { label: "Buy a Home", href: "#listings" },
  { label: "Sell Your Property", href: "#crm" },
  { label: "Schedule a Showing", href: "#crm" },
  { label: "Request Buyer Consultation", href: "#crm" },
  { label: "Relocation Services", href: "#crm" },
  { label: "Investment Properties", href: "#listings" },
];

const demoLinks = [
  { label: "AI Concierge Demo", href: "#concierge" },
  { label: "CRM Lead Preview", href: "#crm" },
  { label: "NALA Chat Demo", href: "#concierge" },
  { label: "Buyer Journey Flow", href: "#concierge" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      {/* Main footer grid */}
      <div className="section-shell py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <div>
              <p className="text-base font-semibold tracking-wide text-white">Luminary Realty</p>
              <p className="text-[0.56rem] font-semibold uppercase tracking-[0.28em] text-white/40">
                Luxury Real Estate Group
              </p>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/52">
              Premier luxury real estate advisory serving Buckhead, North Buckhead, Sandy Springs,
              Vinings, Chastain Park, Brookhaven, and greater Atlanta, Georgia.
            </p>
            {/* NALA powered-by attribution */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c49a3c]/25 bg-[#c49a3c]/10 px-3 py-1.5">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#c49a3c] text-[0.5rem] font-bold text-neutral-950">N</span>
              <span className="text-[0.62rem] font-semibold text-[#e0be6e]/80">
                Powered by NALA — Northside Advanced Learning Applications, Inc.
              </span>
            </div>
            <div className="mt-6 space-y-1 text-sm text-white/50">
              <p>Atlanta, GA 30327</p>
              <p>(310) 000 – 0000</p>
              <p>info@luminaryrealty.com</p>
            </div>
            <div className="mt-6 flex gap-3">
              {/* Social icon placeholders */}
              {["Ig", "Li", "Fb"].map((s) => (
                <span
                  key={s}
                  className="flex size-8 items-center justify-center rounded-full border border-white/14 text-[0.65rem] font-semibold text-white/45 transition hover:border-white/30 hover:text-white"
                  aria-label={s}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/35">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/35">
              Services
            </p>
            <ul className="mt-4 space-y-2.5">
              {services.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo / Tech */}
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/35">
              Demo Features
            </p>
            <ul className="mt-4 space-y-2.5">
              {demoLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg border border-[#c49a3c]/25 bg-[#c49a3c]/10 p-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#e0be6e]">
                Powered by NALA
              </p>
              <p className="mt-2 text-xs leading-5 text-white/45">
                AI concierge for real estate lead qualification, 24/7 answering, and CRM routing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/8" />

      {/* Disclaimer bar */}
      <div className="section-shell py-6">
        <div className="flex flex-col gap-3 text-xs leading-6 text-white/32 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Luminary Realty Group. All rights reserved.
          </p>
          <p className="max-w-2xl sm:text-right">
            <strong className="font-semibold text-white/42">Proof-of-concept demo only.</strong>{" "}
            Luminary Realty Group is a fictional brokerage created solely to demonstrate
            NALA AI concierge technology and AI-powered CRM lead routing for real estate.
            No real transactions, listings, agents, or services are offered.
            All property details and pricing are fictional demo data only.
          </p>
        </div>
      </div>
    </footer>
  );
}
