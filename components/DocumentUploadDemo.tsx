import DocUpload from "./DocUpload";

const documentTypes = [
  "Proof of Funds",
  "Pre-qualification Letter",
  "Buyer Documents",
  "Seller Disclosures",
  "Surveys",
  "Property Documents",
];

export default function DocumentUploadDemo() {
  return (
    <section data-reveal className="bg-white py-16 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">Document Upload Demo</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              Capture Buyer<br className="hidden sm:block" /> Readiness Signals
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-500">
              Buyers can share readiness documents as part of the showing workflow.
              This demo does not store files yet. In production, uploads can be securely
              stored and linked to the CRM lead.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {documentTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-600"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <DocUpload listingAddress="Demo buyer file packet" />
        </div>
      </div>
    </section>
  );
}
