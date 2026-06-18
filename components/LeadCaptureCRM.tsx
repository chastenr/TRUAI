"use client";

import { FormEvent, useState } from "react";
import type { LeadFormData } from "@/types";

const initialLead: LeadFormData = {
  fullName: "",
  email: "",
  phone: "",
  persona: "Buyer",
  budget: "",
  neighborhood: "",
  timeline: "",
  message: "",
};

const crmProviders = [
  "HubSpot",
  "Salesforce",
  "Follow Up Boss",
  "Lofty / Chime",
  "GoHighLevel",
  "ActiveCampaign",
  "Zapier Webhook",
  "Custom CRM",
];

const fieldLabel: Record<keyof LeadFormData, string> = {
  fullName: "Full Name",
  email: "Email",
  phone: "Phone",
  persona: "Client Type",
  budget: "Budget Range",
  neighborhood: "Preferred Neighborhood",
  timeline: "Timeline",
  message: "Notes",
};

type LeadErrors = Partial<Record<keyof LeadFormData, string>>;

function validateLead(lead: LeadFormData): LeadErrors {
  const errors: LeadErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = lead.phone.replace(/\D/g, "");

  if (!lead.fullName.trim()) errors.fullName = "Please enter a name.";
  if (!lead.email.trim()) {
    errors.email = "Please enter an email.";
  } else if (!emailPattern.test(lead.email.trim())) {
    errors.email = "Please enter a valid email.";
  }
  if (lead.phone.trim() && phoneDigits.length < 10) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!lead.persona.trim()) errors.persona = "Please select a client type.";
  if (!lead.timeline.trim()) errors.timeline = "Please add a timeline.";

  return errors;
}

function cxInput(hasError: boolean) {
  return `rounded-lg border px-4 py-3 text-sm font-normal text-neutral-950 outline-none transition focus:ring-1 ${
    hasError
      ? "border-red-300 bg-red-50/40 focus:border-red-500 focus:ring-red-500/15"
      : "border-neutral-200 bg-white focus:border-[#9a7620] focus:ring-[#9a7620]/20"
  }`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-xs font-medium text-red-600">{message}</span>;
}

export default function LeadCaptureCRM() {
  const [lead, setLead] = useState<LeadFormData>(initialLead);
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  function update(field: keyof LeadFormData, value: string) {
    setLead((cur) => ({ ...cur, [field]: value }));
    setErrors((cur) => {
      if (!cur[field]) return cur;
      const next = { ...cur };
      delete next[field];
      return next;
    });
    setSuccessMessage("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors = validateLead(lead);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage("");
      return;
    }

    setSubmittedLead(lead);
    setSuccessMessage(
      "Lead captured for the demo. The CRM card is ready for advisor follow-up."
    );
  }

  const preview = submittedLead ?? lead;

  return (
    <section id="crm" data-reveal className="bg-[#f8f6f2] py-16 sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">CRM-Ready Lead Capture</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              Capture the Context<br className="hidden sm:block" /> Advisors Need
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            Collect clean buyer and seller details, qualify intent, and preview the
            exact record an advisor would receive.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8"
            noValidate
          >
            {successMessage && (
              <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
                {successMessage}
              </div>
            )}

            <fieldset>
              <legend className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Contact Information
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Full Name
                  <input
                    autoComplete="name"
                    value={lead.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className={cxInput(!!errors.fullName)}
                    placeholder="Jordan Ellis"
                    aria-invalid={!!errors.fullName}
                  />
                  <FieldError message={errors.fullName} />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Email
                  <input
                    type="email"
                    autoComplete="email"
                    value={lead.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={cxInput(!!errors.email)}
                    placeholder="jordan@example.com"
                    aria-invalid={!!errors.email}
                  />
                  <FieldError message={errors.email} />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Phone
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={lead.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={cxInput(!!errors.phone)}
                    placeholder="(310) 555-0110"
                    aria-invalid={!!errors.phone}
                  />
                  <FieldError message={errors.phone} />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Client Type
                  <select
                    value={lead.persona}
                    onChange={(e) => update("persona", e.target.value)}
                    className={cxInput(!!errors.persona)}
                    aria-invalid={!!errors.persona}
                  >
                    <option>Buyer</option>
                    <option>Seller</option>
                    <option>Investor</option>
                    <option>Relocating</option>
                    <option>Agent / Partner</option>
                  </select>
                  <FieldError message={errors.persona} />
                </label>
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Property Intent
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Budget Range
                  <input
                    value={lead.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    className={cxInput(!!errors.budget)}
                    placeholder="$900K - $1.2M"
                    aria-invalid={!!errors.budget}
                  />
                  <FieldError message={errors.budget} />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Preferred Neighborhood
                  <input
                    value={lead.neighborhood}
                    onChange={(e) => update("neighborhood", e.target.value)}
                    className={cxInput(!!errors.neighborhood)}
                    placeholder="Sandy Springs, Buckhead, Roswell"
                    aria-invalid={!!errors.neighborhood}
                  />
                  <FieldError message={errors.neighborhood} />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800 sm:col-span-2">
                  Timeline
                  <input
                    value={lead.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    className={cxInput(!!errors.timeline)}
                    placeholder="Touring this month, ready within 90 days"
                    aria-invalid={!!errors.timeline}
                  />
                  <FieldError message={errors.timeline} />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800 sm:col-span-2">
                  Message
                  <textarea
                    rows={4}
                    value={lead.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={cxInput(!!errors.message)}
                    placeholder="Interested in a private showing, financing status, or similar homes."
                    aria-invalid={!!errors.message}
                  />
                  <FieldError message={errors.message} />
                </label>
              </div>
            </fieldset>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="rounded-full bg-neutral-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#9a7620] sm:w-auto"
              >
                Create CRM Lead Preview
              </button>
              <p className="text-xs text-neutral-400">
                Demo mode keeps this preview local until a CRM is connected.
              </p>
            </div>
          </form>

          <aside className="flex flex-col gap-4">
            <div className="flex-1 rounded-lg border border-neutral-200 bg-neutral-950 p-6 text-white sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">CRM Lead Card</h3>
                <span className="rounded-full border border-white/14 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-white/50">
                  Demo Ready
                </span>
              </div>

              <dl className="mt-5 divide-y divide-white/8">
                {(Object.keys(fieldLabel) as Array<keyof LeadFormData>).map((key) => (
                  <div key={key} className="py-3">
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#e0be6e]">
                      {fieldLabel[key]}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-white/70">
                      {preview[key] || (
                        <span className="italic text-white/28">Awaiting input</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                CRM Destinations
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {crmProviders.map((provider) => (
                  <span
                    key={provider}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[0.7rem] font-medium text-neutral-600"
                  >
                    {provider}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-neutral-400">
                Lead records are structured for routing, tagging, advisor assignment,
                showing requests, and follow-up workflows.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
