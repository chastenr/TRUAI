import { faqs } from "@/data/faqs";

export default function FAQ() {
  return (
    <section id="faq" data-reveal className="bg-[#f8f6f2] py-16 sm:py-24">
      <div className="section-shell">
        {/* Section header */}
        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              Common Questions
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            Everything real estate teams ask before deploying an AI concierge into their
            brokerage website or listing portal.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-8 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-semibold text-neutral-950 marker:content-none">
                {faq.question}
                <span
                  className="flex size-6 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-base font-light text-[#8c743f] transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl pb-1 text-sm leading-7 text-neutral-500">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* More questions CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            Have a question not listed here?{" "}
            <a
              href="#concierge"
              className="font-semibold text-neutral-950 underline underline-offset-4 transition hover:text-[#8c743f]"
            >
              Ask the AI Concierge
            </a>{" "}
            or{" "}
            <a
              href="#crm"
              className="font-semibold text-neutral-950 underline underline-offset-4 transition hover:text-[#8c743f]"
            >
              reach out directly
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
