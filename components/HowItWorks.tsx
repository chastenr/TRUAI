const steps = [
  "Buyer asks a property question",
  "AI answers using listing and brokerage info",
  "AI collects name, email, phone, budget, timeline, and desired neighborhood",
  "Lead is sent to CRM",
  "Agent follows up with context",
];

const questions = [
  "Is this property still available?",
  "Can I schedule a private showing?",
  "What schools are near this home?",
  "Can you send me similar listings?",
  "What is the monthly estimate?",
  "Can I speak with an agent?",
  "Is this a good investment area?",
  "Can I get pre-approved before touring?",
];

export default function HowItWorks() {
  return (
    <>
      <section data-reveal className="bg-[#f7f5f0] py-16 sm:py-20">
        <div className="section-shell">
          <p className="eyebrow">Buyer Questions</p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-950 sm:text-4xl">Common questions answered instantly</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {questions.map((question) => (
              <article key={question} className="soft-lift rounded-lg border border-black/10 bg-white p-5">
                <h3 className="text-base font-semibold leading-6 text-neutral-950">{question}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section data-reveal className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Lead Qualification Flow</p>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-950 sm:text-4xl">
              From listing interest to advisor-ready lead
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <article key={step} className="soft-lift rounded-lg border border-neutral-200 bg-neutral-50 p-5">
                <p className="text-sm font-semibold text-[#8c743f]">Step {index + 1}</p>
                <h3 className="mt-3 text-base font-semibold leading-6 text-neutral-950">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
