"use client";

import { useEffect, useState } from "react";

const starters = [
  "What homes are available in Buckhead?",
  "Schedule a private showing",
  "What are the monthly costs?",
  "I'd like to speak with an advisor",
];

export default function NalaFloatButton() {
  const [open, setOpen]           = useState(false);
  const [mounted, setMounted]     = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show tooltip hint after 3s to nudge first-time visitors
    const t = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Hide tooltip once opened
  const handleOpen = () => {
    setOpen(true);
    setShowTooltip(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ── Floating trigger ── */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2 sm:bottom-8 sm:right-8">

        {/* Tooltip callout — shows automatically after 3s */}
        <div className={`pointer-events-none flex max-w-[220px] flex-col rounded-2xl rounded-br-sm border border-white/12 bg-neutral-900 px-4 py-3 shadow-2xl transition-all duration-300 ${
          showTooltip && !open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}>
          <p className="text-[0.72rem] font-semibold text-white">Hi! I&apos;m NALA 👋</p>
          <p className="mt-0.5 text-[0.68rem] leading-5 text-white/55">
            Ask me anything about our Atlanta luxury listings.
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[0.6rem] font-semibold text-emerald-400">Online now</span>
          </div>
        </div>

        {/* FAB */}
        <button
          type="button"
          onClick={open ? () => setOpen(false) : handleOpen}
          aria-label={open ? "Close NALA chat" : "Chat with NALA AI Concierge"}
          aria-expanded={open ? "true" : "false"}
          className={`nala-fab group relative flex size-14 items-center justify-center rounded-full shadow-[0_8px_32px_rgba(196,154,60,0.45)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(196,154,60,0.6)] sm:h-14 sm:w-auto sm:rounded-full sm:px-5 sm:gap-2.5 ${
            open
              ? "bg-neutral-800 hover:bg-neutral-700"
              : "bg-[#c49a3c] hover:bg-[#e0be6e]"
          }`}
        >
          {/* Pulse ring — only when closed */}
          {!open && (
            <span className="absolute inset-0 rounded-full animate-ping bg-[#c49a3c] opacity-20" />
          )}

          {/* Icon: chat ↔ X */}
          <span className="relative flex size-6 shrink-0 items-center justify-center transition-transform duration-200">
            {open ? (
              /* X icon */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="size-5 text-white" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              /* Chat bubble icon */
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-neutral-950" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.03 2 11c0 2.6 1.18 4.95 3.07 6.63L4 22l4.72-1.57A10.5 10.5 0 0 0 12 21c5.52 0 10-4.03 10-9C22 6.03 17.52 2 12 2Z" />
                <circle cx="8.5"  cy="11" r="1.1" fill="white" />
                <circle cx="12"   cy="11" r="1.1" fill="white" />
                <circle cx="15.5" cy="11" r="1.1" fill="white" />
              </svg>
            )}
          </span>

          {/* Label — desktop only */}
          <span className={`relative hidden text-sm font-semibold sm:block ${open ? "text-white" : "text-neutral-950"}`}>
            {open ? "Close" : "Ask NALA"}
          </span>

          {/* Live dot — only when closed */}
          {!open && (
            <span className="relative hidden size-2 shrink-0 sm:flex">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
          )}
        </button>
      </div>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Panel — always mounted so iframe preloads ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="NALA AI Concierge"
        className={`fixed z-50 flex flex-col overflow-hidden bg-neutral-950 shadow-2xl transition-all duration-300 ease-out
          bottom-0 left-0 right-0 h-[90dvh] rounded-t-2xl
          sm:bottom-6 sm:right-6 sm:left-auto sm:h-[700px] sm:w-[420px] sm:rounded-2xl
          ${open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none sm:translate-y-6"
          }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-neutral-900 px-4 py-3.5">
          <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.55rem] font-bold text-neutral-950">
            NALA
            <span className="absolute -bottom-0.5 -right-0.5 flex size-2.5 items-center justify-center rounded-full border border-neutral-900 bg-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">NALA AI Concierge</p>
            <p className="text-[0.65rem] text-white/40">
              Luxury Real Estate · Atlanta · 24/7
            </p>
          </div>
          {/* Call button */}
          <a
            href="tel:+13100000000"
            aria-label="Call an advisor"
            className="flex h-8 items-center gap-1.5 rounded-full border border-white/15 px-3 text-[0.68rem] font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.69 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            Call
          </a>
          {/* Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close NALA chat"
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/30 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-4" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Live avatar iframe — always mounted so it pre-connects */}
        <div className="relative flex-1 overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://trulience.com/avatar/8657426931336757879"
            frameBorder="0"
            allow="camera; microphone; fullscreen; accelerometer; magnetometer; xr-spatial-tracking; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="NALA — Luminary Realty AI Concierge"
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Quick-start chips */}
        <div className="shrink-0 border-t border-white/8 bg-neutral-900 px-3 py-3">
          <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/30">
            Quick questions
          </p>
          <div className="flex flex-wrap gap-1.5">
            {starters.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[0.68rem] font-medium text-white/65 transition hover:border-[#c49a3c]/50 hover:bg-[#c49a3c]/10 hover:text-white active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
