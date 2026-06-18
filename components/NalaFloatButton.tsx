"use client";

import { useEffect, useState } from "react";

const TRULIENCE_FLOAT_URL =
  "https://trulience.com/avatar/8657426931336757879?dialPageBackground=transparent&screenAspectRatio=9:16&controlButtonPosition=center&hideChatInput=false&hideChatHistory=false";

export default function NalaFloatButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(tooltipTimer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const togglePanel = () => {
    setOpen((current) => !current);
    setShowTooltip(false);
  };

  if (!mounted) return null;

  return (
    <>
      <div className="fixed bottom-6 right-5 z-[90] flex flex-col items-end gap-2 sm:bottom-8 sm:right-8">
        <div
          className={`pointer-events-none flex max-w-[240px] flex-col rounded-2xl rounded-br-sm border border-white/12 bg-neutral-900 px-4 py-3 shadow-2xl transition-all duration-300 ${
            showTooltip && !open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <p className="text-[0.72rem] font-semibold text-white">NALA is live</p>
          <p className="mt-0.5 text-[0.68rem] leading-5 text-white/55">
            Open the Trulience avatar for chat and voice.
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[0.6rem] font-semibold text-emerald-400">Trulience online</span>
          </div>
        </div>

        <button
          type="button"
          onClick={togglePanel}
          aria-label={open ? "Close live NALA avatar" : "Open live NALA avatar"}
          aria-expanded={open}
          className={`nala-fab group relative flex size-14 items-center justify-center rounded-full shadow-[0_8px_32px_rgba(196,154,60,0.45)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(196,154,60,0.6)] sm:h-14 sm:w-auto sm:gap-2.5 sm:rounded-full sm:px-5 ${
            open ? "bg-neutral-800 hover:bg-neutral-700" : "bg-[#c49a3c] hover:bg-[#e0be6e]"
          }`}
        >
          {!open && (
            <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#c49a3c] opacity-20" />
          )}
          <span className="relative flex size-6 shrink-0 items-center justify-center">
            {open ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="size-5 text-white"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-neutral-950"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.03 2 11c0 2.6 1.18 4.95 3.07L4 22l4.72-1.57A10.5 10.5 0 0 0 12 21c5.52 0 10-4.03 10-9C22 6.03 17.52 2 12 2Z" />
                <circle cx="8.5" cy="11" r="1.1" fill="white" />
                <circle cx="12" cy="11" r="1.1" fill="white" />
                <circle cx="15.5" cy="11" r="1.1" fill="white" />
              </svg>
            )}
          </span>
          <span className={`relative hidden text-sm font-semibold sm:block ${open ? "text-white" : "text-neutral-950"}`}>
            {open ? "Close" : "Live NALA"}
          </span>
          {!open && (
            <span className="relative hidden size-2 shrink-0 sm:flex">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
          )}
        </button>
      </div>

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm transition-all duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Live NALA avatar"
        className={`fixed z-[100] flex flex-col overflow-hidden bg-neutral-950 shadow-2xl transition-all duration-300 ease-out bottom-0 left-0 right-0 h-[92dvh] rounded-t-2xl sm:bottom-6 sm:right-6 sm:left-auto sm:h-[760px] sm:w-[430px] sm:rounded-2xl ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0 sm:translate-y-6"
        }`}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-neutral-900 px-4 py-3.5">
          <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.55rem] font-bold text-neutral-950">
            NALA
            <span className="absolute -bottom-0.5 -right-0.5 flex size-2.5 items-center justify-center rounded-full border border-neutral-900 bg-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">NALA Live Avatar</p>
            <p className="text-[0.65rem] text-white/40">Trulience chat and voice</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close live NALA avatar"
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/30 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative min-h-0 flex-1 bg-black">
          <iframe
            src={TRULIENCE_FLOAT_URL}
            title="NALA Trulience avatar chat"
            className="absolute inset-0 h-full w-full"
            allow="camera; microphone; fullscreen; accelerometer; magnetometer; xr-spatial-tracking; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
