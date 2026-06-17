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
  "Zapier webhook",
  "Custom CRM API",
];

export default function LeadCaptureCRM() {
  const [lead, setLead] = useState<LeadFormData>(initialLead);
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);

  function updateLead(field: keyof LeadFormData, value: string) {
    setLead((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedLead(lead);

    /*
      Future CRM integration point:
      - Check process.env.NEXT_PUBLIC_CRM_PROVIDER only for public display config.
      - Send lead data to a server action or API route before calling private CRM APIs.
      - Supported future destinations: HubSpot, Salesforce, Follow Up Boss, Lofty/Chime,
        GoHighLevel, ActiveCampaign, Zapier webhook, or a custom CRM API.
      - Never expose private API keys in this client component.
    */
  }

  const previewLead = submittedLead ?? lead;

  return (
    <section id="crm" data-reveal className="bg-[#f7f5f0] py-16 sm:py-20">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow">CRM-Ready Lead Capture</p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-950 sm:text-4xl">Capture the context agents need</h2>
          <p className="mt-4 text-base leading-8 text-neutral-600">
            This demo stores the form in local state and displays the lead package that would be sent to a CRM once
            approved API credentials are connected.
          </p>
        </div>
        <div className="mt-9 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={handleSubmit} className="rounded-lg border border-black/10 bg-white p-5 sm:p-6">
            {submittedLead ? (
              <div className="mb-5 rounded-lg border border-[#b9985a]/30 bg-[#f5efe1] p-4 text-sm font-medium text-neutral-900">
                Lead captured for demo preview. A production version would route this inquiry through a secure server
                integration.
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-neutral-800">
                Full Name
                <input
                  required
                  value={lead.fullName}
                  onChange={(event) => updateLead("fullName", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#8c743f]"
                  placeholder="Jordan Ellis"
                />
              </label>
              <label className="text-sm font-semibold text-neutral-800">
                Email
                <input
                  required
                  type="email"
                  value={lead.email}
                  onChange={(event) => updateLead("email", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#8c743f]"
                  placeholder="jordan@example.com"
                />
              </label>
              <label className="text-sm font-semibold text-neutral-800">
                Phone
                <input
                  type="tel"
                  value={lead.phone}
                  onChange={(event) => updateLead("phone", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#8c743f]"
                  placeholder="(555) 010-4820"
                />
              </label>
              <label className="text-sm font-semibold text-neutral-800">
                I am a
                <select
                  value={lead.persona}
                  onChange={(event) => updateLead("persona", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#8c743f]"
                >
                  <option>Buyer</option>
                  <option>Seller</option>
                  <option>Investor</option>
                  <option>Relocating</option>
                  <option>Agent</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-neutral-800">
                Budget Range
                <input
                  value={lead.budget}
                  onChange={(event) => updateLead("budget", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#8c743f]"
                  placeholder="$3M - $6M"
                />
              </label>
              <label className="text-sm font-semibold text-neutral-800">
                Preferred Neighborhood
                <input
                  value={lead.neighborhood}
                  onChange={(event) => updateLead("neighborhood", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#8c743f]"
                  placeholder="Malibu, Bel Air, Palisades"
                />
              </label>
              <label className="text-sm font-semibold text-neutral-800 sm:col-span-2">
                Timeline
                <input
                  value={lead.timeline}
                  onChange={(event) => updateLead("timeline", event.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#8c743f]"
                  placeholder="Touring this month, buying within 90 days"
                />
              </label>
              <label className="text-sm font-semibold text-neutral-800 sm:col-span-2">
                Message
                <textarea
                  value={lead.message}
                  onChange={(event) => updateLead("message", event.target.value)}
                  className="mt-2 min-h-32 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#8c743f]"
                  placeholder="I would like details about ocean-view properties with privacy and guest accommodations."
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8c743f] sm:w-auto"
            >
              Preview CRM Lead
            </button>
          </form>
          <aside className="rounded-lg border border-neutral-200 bg-neutral-950 p-5 text-white sm:p-6">
            <h3 className="text-xl font-semibold">Mock CRM Lead Preview</h3>
            <dl className="mt-5 space-y-4 text-sm">
              {Object.entries(previewLead).map(([key, value]) => (
                <div key={key} className="border-b border-white/10 pb-3">
                  <dt className="font-semibold capitalize text-[#d8be84]">{key.replace(/([A-Z])/g, " $1")}</dt>
                  <dd className="mt-1 leading-6 text-white/78">{value || "Awaiting input"}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5">
              <p className="text-sm font-semibold text-white">Future CRM destinations</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {crmProviders.map((provider) => (
                  <span key={provider} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75">
                    {provider}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
