"use client";

export default function TrulienceEmbed() {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-xl border border-white/10">
      {/*
        ── Trulience Live Avatar Embed ────────────────────────────────────
        Avatar ID: 8657426931336757879
        ─────────────────────────────────────────────────────────────────
      */}
      <iframe
        width="100%"
        height="100%"
        src="https://trulience.com/avatar/8657426931336757879"
        frameBorder="0"
        allow="camera; microphone; fullscreen; accelerometer; magnetometer; xr-spatial-tracking; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="NALA — Luminary Realty AI Concierge powered by Trulience"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
