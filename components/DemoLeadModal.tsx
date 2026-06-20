"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type DemoMode = "lead" | "showing";

type DemoLead = {
  fullName: string;
  email: string;
  phone: string;
  interestedProperty: string;
  buyerOrSeller: string;
  budget: string;
  timeline: string;
  financingStatus: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
};

type DemoEvent = CustomEvent<{
  mode?: DemoMode;
  property?: string;
  message?: string;
}>;

const initialLead: DemoLead = {
  fullName: "",
  email: "",
  phone: "",
  interestedProperty: "",
  buyerOrSeller: "Buyer",
  budget: "",
  timeline: "",
  financingStatus: "Not provided yet",
  message: "",
  preferredDate: "",
  preferredTime: "",
};

const eventName = "nala:open-lead-demo";

export function openLeadDemo(detail: { mode?: DemoMode; property?: string; message?: string } = {}) {
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
}

export default function DemoLeadModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<DemoMode>("lead");
  const [lead, setLead] = useState<DemoLead>(initialLead);
  const [submitted, setSubmitted] = useState<DemoLead | null>(null);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as DemoEvent).detail ?? {};
      setMode(detail.mode ?? "lead");
      setLead((current) => ({
        ...current,
        interestedProperty: detail.property ?? current.interestedProperty,
        message: detail.message ?? current.message,
      }));
      setSubmitted(null);
      setOpen(true);
    };

    window.addEventListener(eventName, handleOpen);
    return () => window.removeEventListener(eventName, handleOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const crmSummary = useMemo(() => {
    const activeLead = submitted ?? lead;
    const property = activeLead.interestedProperty || "Property not selected";
    const intent = activeLead.buyerOrSeller || "Buyer";
    const timeline = activeLead.timeline || "Timeline pending";

    return `${intent} interested in ${property}. Budget: ${activeLead.budget || "not provided"}. Timeline: ${timeline}. Financing: ${activeLead.financingStatus || "not provided"}.`;
  }, [lead, submitted]);

  function update(field: keyof DemoLead, value: string) {
    setLead((current) => ({ ...current, [field]: value }));
    setSubmitted(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(lead);
  }

  if (!open) return null;

  const title = mode === "showing" ? "Request a Private Showing" : "Request Information";
  const activeLead = submitted ?? lead;
  const nextAction =
    mode === "showing"
      ? "Agent confirms showing window and follows up with buyer."
      : "Agent follows up with property guidance and next-step recommendations.";

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-neutral-950/70 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto flex min-h-full max-w-5xl items-center">
        <div className="relative w-full overflow-hidden rounded-2xl bg-[#f8f6f2] shadow-2xl">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-950"
            aria-label="Close lead demo"
          >
            ×
          </button>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8">
              <p className="eyebrow">{mode === "showing" ? "Showing Request Demo" : "Lead Capture Demo"}</p>
              <h2 className="display-serif mt-3 pr-10 text-3xl text-neutral-950 sm:text-4xl">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-500">
                This demo captures the details an agent needs for fast, useful follow-up.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800">
                  Full name
                  <input
                    required
                    value={lead.fullName}
                    onChange={(event) => update("fullName", event.target.value)}
                    className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                    placeholder="Jordan Ellis"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800">
                  Email
                  <input
                    required
                    type="email"
                    value={lead.email}
                    onChange={(event) => update("email", event.target.value)}
                    className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                    placeholder="jordan@example.com"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800">
                  Phone
                  <input
                    type="tel"
                    value={lead.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                    placeholder="(404) 555-0198"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800">
                  Buyer or seller
                  <select
                    value={lead.buyerOrSeller}
                    onChange={(event) => update("buyerOrSeller", event.target.value)}
                    className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                  >
                    <option>Buyer</option>
                    <option>Seller</option>
                    <option>Investor</option>
                    <option>Relocating buyer</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800 sm:col-span-2">
                  Interested property
                  <input
                    value={lead.interestedProperty}
                    onChange={(event) => update("interestedProperty", event.target.value)}
                    className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                    placeholder="395 Spindle CT"
                  />
                </label>
                {mode === "showing" && (
                  <>
                    <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800">
                      Preferred date
                      <input
                        type="date"
                        value={lead.preferredDate}
                        onChange={(event) => update("preferredDate", event.target.value)}
                        className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800">
                      Preferred time
                      <input
                        type="time"
                        value={lead.preferredTime}
                        onChange={(event) => update("preferredTime", event.target.value)}
                        className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                      />
                    </label>
                  </>
                )}
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800">
                  Budget
                  <input
                    value={lead.budget}
                    onChange={(event) => update("budget", event.target.value)}
                    className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                    placeholder="$900K - $1.1M"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800">
                  Timeline
                  <input
                    value={lead.timeline}
                    onChange={(event) => update("timeline", event.target.value)}
                    className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                    placeholder="Ready within 60 days"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800 sm:col-span-2">
                  Financing status
                  <input
                    value={lead.financingStatus}
                    onChange={(event) => update("financingStatus", event.target.value)}
                    className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                    placeholder="Prequalified, cash buyer, needs lender intro"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-800 sm:col-span-2">
                  Message / question
                  <textarea
                    rows={4}
                    value={lead.message}
                    onChange={(event) => update("message", event.target.value)}
                    className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#c49a3c]"
                    placeholder="I would like to know about availability, showing times, and similar homes."
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9a7620]"
              >
                {mode === "showing" ? "Capture Showing Request" : "Capture Lead"}
              </button>
            </form>

            <div className="bg-neutral-950 p-6 text-white sm:p-8">
              {submitted ? (
                <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4">
                  <p className="text-sm font-semibold text-emerald-200">
                    {mode === "showing"
                      ? "Showing request captured."
                      : "Lead captured."}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-emerald-100/70">
                    {mode === "showing"
                      ? "In production, this can create a Google Calendar event for the agent and sync the buyer into the CRM."
                      : "In production, this can sync into the CRM, notify the agent, and start follow-up workflows."}
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-white">Demo output appears here</p>
                  <p className="mt-2 text-xs leading-6 text-white/45">
                    Submit the form to show the CRM-ready summary and next-step preview.
                  </p>
                </div>
              )}

              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#e0be6e]">
                  CRM-Ready Lead Preview
                </p>
                <dl className="mt-3 space-y-2 text-xs">
                  {[
                    ["Lead source", "Website / NALA AI Concierge"],
                    ["Name", activeLead.fullName || "Pending"],
                    ["Phone", activeLead.phone || "Pending"],
                    ["Email", activeLead.email || "Pending"],
                    ["Interested property", activeLead.interestedProperty || "Pending"],
                    ["Buyer intent", activeLead.buyerOrSeller || "Pending"],
                    ["Budget", activeLead.budget || "Pending"],
                    ["Timeline", activeLead.timeline || "Pending"],
                    ["Conversation summary", crmSummary],
                    ["Showing requested", mode === "showing" ? "Yes" : "No"],
                    ["Next action", nextAction],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[120px_1fr] gap-3 border-b border-white/8 pb-2">
                      <dt className="text-white/35">{label}</dt>
                      <dd className="text-white/75">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {mode === "showing" && (
                <div className="mt-5 rounded-xl border border-[#c49a3c]/25 bg-[#c49a3c]/10 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#e0be6e]">
                    Calendar Preview
                  </p>
                  <div className="mt-3 space-y-2 text-xs text-white/70">
                    <p><span className="text-white/35">Event:</span> Private Showing - {activeLead.interestedProperty || "Selected property"}</p>
                    <p><span className="text-white/35">Buyer:</span> {activeLead.fullName || "Pending"}</p>
                    <p>
                      <span className="text-white/35">Requested:</span>{" "}
                      {activeLead.preferredDate || "Date pending"} {activeLead.preferredTime || "time pending"}
                    </p>
                    <p><span className="text-white/35">Notes:</span> {activeLead.message || "No notes yet"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
