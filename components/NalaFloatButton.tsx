"use client";

import { useEffect, useState } from "react";

export default function NalaFloatButton() {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Chat with NALA AI Concierge"
        className={`nala-fab group fixed bottom-6 right-5 z-40 flex items-center gap-3 rounded-full bg-[#c49a3c] px-4 py-3.5 shadow-[0_8px_32px_rgba(196,154,60,0.45)] transition-all duration-300 hover:bg-[#e0be6e] hover:shadow-[0_12px_40px_rgba(196,154,60,0.55)] sm:bottom-8 sm:right-8 ${
          open ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-[#c49a3c] opacity-20" />

        {/* Chat icon */}
        <span className="relative flex size-7 shrink-0 items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden="true">
            <path
              d="M12 2C6.48 2 2 6.03 2 11c0 2.6 1.18 4.95 3.07 6.63L4 22l4.72-1.57A10.5 10.5 0 0 0 12 20.98c5.52 0 10-4.02 10-8.99C22 6.03 17.52 2 12 2Z"
              fill="currentColor"
              className="text-neutral-950"
            />
            <circle cx="8.5"  cy="11" r="1.1" fill="white" />
            <circle cx="12"   cy="11" r="1.1" fill="white" />
            <circle cx="15.5" cy="11" r="1.1" fill="white" />
          </svg>
        </span>

        {/* Label — hidden on very small screens */}
        <span className="relative hidden text-sm font-semibold text-neutral-950 sm:block">
          Ask NALA
        </span>

        {/* Online dot */}
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
        </span>
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Slide-in panel ── */}
      {/*
        Desktop: slides in from bottom-right as a 420px wide panel
        Mobile:  slides up from bottom as a full-width sheet
      */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="NALA AI Concierge"
        className={`fixed z-50 flex flex-col overflow-hidden bg-neutral-950 shadow-2xl transition-all duration-300 ease-out
          /* Mobile: bottom sheet */
          bottom-0 left-0 right-0 h-[88dvh] rounded-t-2xl
          /* Desktop: side panel */
          sm:bottom-6 sm:right-6 sm:left-auto sm:h-[680px] sm:w-[420px] sm:rounded-2xl
          ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 sm:translate-y-8"}`}
      >
        {/* Panel header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-neutral-900 px-5 py-4">
          {/* NALA avatar icon */}
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.56rem] font-bold text-neutral-950">
            NALA
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-white">NALA AI Concierge</p>
              <span className="relative flex size-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
            </div>
            <p className="truncate text-[0.68rem] text-white/45">
              Powered by NALA · Northside Advanced Learning Applications
            </p>
          </div>
          {/* Close button */}
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

        {/* Iframe — fills remaining space */}
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

        {/* Footer strip */}
        <div className="shrink-0 border-t border-white/8 bg-neutral-900 px-5 py-2.5">
          <p className="text-center text-[0.6rem] text-white/25">
            Powered by NALA — Northside Advanced Learning Applications, Inc. · Trulience Avatar
          </p>
        </div>
      </div>
    </>
  );
}
