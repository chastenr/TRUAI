"use client";

import Script from "next/script";

const inquiryForm = {
  scriptSrc: "https://js-na2.hsforms.net/forms/embed/246549006.js",
  region: "na2",
  portalId: "246549006",
  formId: "c9ed69ce-26bc-4cb8-ac71-f93088b241ab",
};

export default function LeadCaptureCRM() {
  return (
    <section id="crm" data-reveal className="bg-[#f8f6f2] py-16 sm:py-24">
      <Script src={inquiryForm.scriptSrc} strategy="afterInteractive" />

      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <p className="eyebrow">Request Information</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              Tell Us What<br className="hidden sm:block" /> You&apos;re Looking For
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-500">
            Share a few details and an advisor will follow up with the right next step.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div
            className="hs-form-frame min-h-[520px]"
            data-region={inquiryForm.region}
            data-form-id={inquiryForm.formId}
            data-portal-id={inquiryForm.portalId}
          />
        </div>
      </div>
    </section>
  );
}
