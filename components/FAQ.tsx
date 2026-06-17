import { faqs } from "@/data/faqs";

export default function FAQ() {
  return (
    <section data-reveal className="bg-[#f7f5f0] py-16 sm:py-20">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-950 sm:text-4xl">AI concierge questions for real estate teams</h2>
        </div>
        <div className="mt-8 divide-y divide-black/10 rounded-lg border border-black/10 bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-950">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-xl text-[#8c743f] group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
