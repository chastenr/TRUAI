export default function Footer() {
  return (
    <footer className="bg-neutral-950 py-10 text-white">
      <div className="section-shell">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-lg font-semibold">Apex Luxe Realty Group</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/65">
              Demo prototype powered by Trulience-style avatar technology and CRM-ready lead capture.
            </p>
          </div>
          <p className="text-sm leading-7 text-white/58">
            Proof-of-concept demo only. Final integrations depend on Trulience account access, CRM provider, and
            approved API credentials.
          </p>
        </div>
      </div>
    </footer>
  );
}
