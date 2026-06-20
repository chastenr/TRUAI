const integrations = [
  ["Trulience", "Website avatar and AI concierge layer"],
  ["Twilio", "SMS updates and phone call routing"],
  ["Client CRM", "Lead database, pipeline notes, and drip campaigns"],
  ["Google Calendar", "Showing bookings and agent calendar events"],
  ["Supabase / secure storage", "Document uploads linked to the lead record"],
  ["DocuSign", "Buyer agreements and intent-to-purchase documents"],
];

export default function IntegrationRoadmap() {
  return (
    <section data-reveal className="bg-[#f8f6f2] py-16 sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Integration Roadmap</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              What NALA<br className="hidden sm:block" /> Connects To
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            The current site is the visual demo. The next implementation phase connects
            the live backend workflows for messaging, calendars, storage, and CRM sync.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map(([name, description]) => (
            <article key={name} className="rounded-lg border border-neutral-200 bg-white p-5">
              <p className="text-sm font-semibold text-neutral-950">{name}</p>
              <p className="mt-2 text-xs leading-6 text-neutral-500">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
