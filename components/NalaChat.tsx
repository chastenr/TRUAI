"use client";

import { useEffect, useRef, useState } from "react";
import { mergeLead } from "@/lib/lead-store";

type Message = { role: "user" | "assistant"; content: string };

const CHIPS = [
  "Is 395 Spindle CT in Sandy Springs still available?",
  "Tell me about the Grant Park property on Hill ST.",
  "What's the price per sq ft on the Roswell estate?",
  "I'm relocating to Atlanta — where should I start looking?",
  "Can I schedule a showing this week?",
  "Tell me about the Peachtree City listing.",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm NALA, your AI real estate concierge for Abbie Shepherd Real Estate Group. I have details on current Atlanta-area listings and I'm here 24/7. What would you like to know?",
};

export default function NalaChat() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  // Listen for "nala-ask" events from listing card buttons
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ question: string }>;
      if (ce.detail?.question) {
        send(ce.detail.question);
      }
    };
    window.addEventListener("nala-ask", handler);
    return () => window.removeEventListener("nala-ask", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/nala-core", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const { reply, leadDelta } = (await res.json()) as {
        reply: string;
        leadDelta: Parameters<typeof mergeLead>[0];
      };

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (leadDelta && typeof leadDelta === "object") mergeLead(leadDelta);
    } catch {
      setError("NALA is temporarily unavailable. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full min-h-[560px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c10]">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-white/8 bg-black/40 px-4 py-3">
        <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.52rem] font-bold text-neutral-950">
          NALA
          <span className="absolute -bottom-0.5 -right-0.5 flex size-2 rounded-full border border-[#0a0c10] bg-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white">NALA AI Concierge</p>
          <p className="text-[0.6rem] text-white/40">Atlanta Luxury Real Estate · 24/7</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[0.6rem] font-semibold text-emerald-400">
          <span className="relative flex size-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          Online
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((msg, i) =>
          msg.role === "assistant" ? (
            <div key={i} className="flex items-start gap-2.5">
              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.42rem] font-bold text-neutral-950">
                N
              </div>
              <div className="max-w-[82%] rounded-xl rounded-tl-none bg-white/[0.06] px-4 py-3 text-sm leading-7 text-white/90">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="max-w-[78%] rounded-xl rounded-tr-none bg-[#c49a3c]/90 px-4 py-3 text-sm leading-7 text-neutral-950">
                {msg.content}
              </div>
            </div>
          )
        )}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-[0.42rem] font-bold text-neutral-950">
              N
            </div>
            <div className="flex items-center gap-1 rounded-xl rounded-tl-none bg-white/[0.06] px-4 py-3.5">
              <span className="size-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-white/50" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mx-auto rounded-lg bg-red-500/10 px-4 py-2 text-center text-xs text-red-400">
            {error}
          </p>
        )}
      </div>

      {/* Chips */}
      <div className="shrink-0 border-t border-white/8 bg-black/20 px-3 pt-3 pb-0">
        <p className="mb-2 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/25">
          Quick questions
        </p>
        <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
          {CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={loading}
              onClick={() => send(chip)}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.65rem] text-white/60 transition hover:border-[#c49a3c]/40 hover:bg-[#c49a3c]/8 hover:text-white disabled:opacity-40"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-white/8 bg-black/30 px-3 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask about a listing, neighborhood, or showing…"
            className="min-h-[42px] flex-1 rounded-full bg-white/[0.07] px-4 text-sm text-white placeholder:text-white/30 outline-none border border-white/10 focus:border-[#c49a3c]/40 transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-[#c49a3c] text-neutral-950 transition hover:bg-[#e0be6e] disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
