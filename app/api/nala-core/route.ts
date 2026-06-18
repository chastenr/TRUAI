import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { NALA_SYSTEM_PROMPT } from "@/lib/prompt";
import { NALA_LISTINGS } from "@/lib/listings";

const NALA_MODEL = "claude-haiku-4-5-20251001";

type Message = { role: "user" | "assistant"; content: string };

type LeadDelta = {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  budget?: string | null;
  timeline?: string | null;
  financing?: string | null;
  property?: string | null;
  intent?: string | null;
  summary?: string | null;
  nextStep?: string | null;
  escalate?: boolean;
  escalateReason?: string | null;
};

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        reply:
          "NALA demo mode — the AI brain is not yet configured. Add ANTHROPIC_API_KEY to your environment variables to activate real conversations.",
        leadDelta: {},
      },
      { status: 200 }
    );
  }

  let messages: Message[];
  try {
    const body = await req.json();
    messages = body.messages ?? [];
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages array is required" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const listingContext =
    "\n\n## ACTIVE LISTINGS (use only these for property questions)\n" +
    JSON.stringify(NALA_LISTINGS, null, 2);

  const fullSystem = NALA_SYSTEM_PROMPT + listingContext;

  // Call 1 — conversational reply
  const replyResponse = await client.messages.create({
    model: NALA_MODEL,
    max_tokens: 600,
    system: fullSystem,
    messages,
  });

  const reply =
    replyResponse.content[0]?.type === "text" ? replyResponse.content[0].text : "";

  // Call 2 — lead extraction (silent, lightweight)
  const conversationText = messages
    .map((m) => `${m.role === "user" ? "Buyer" : "NALA"}: ${m.content}`)
    .join("\n");

  const extractionPrompt = `Extract buyer lead information from this real estate conversation. Return ONLY valid JSON — no markdown, no explanation.

Required JSON shape:
{
  "name": string | null,
  "phone": string | null,
  "email": string | null,
  "budget": string | null,
  "timeline": string | null,
  "financing": string | null,
  "property": string | null,
  "intent": string | null,
  "summary": string | null,
  "nextStep": string | null,
  "escalate": boolean,
  "escalateReason": string | null
}

Rules:
- Only populate fields where the buyer explicitly stated the information
- "property" = address or listing name the buyer is interested in
- "intent" = buyer intent: "browsing" | "serious" | "ready to offer" | "relocating"
- "summary" = 1-sentence summary of the conversation so far
- "nextStep" = recommended agent action: e.g. "Schedule private showing", "Send financing info", "Connect with advisor"
- "escalate" = true if buyer has an urgent timeline, wants to make an offer, or asks legal/contract questions
- Return null for fields you cannot determine

Conversation:
${conversationText}
NALA: ${reply}`;

  let leadDelta: LeadDelta = {};
  try {
    const extractResponse = await client.messages.create({
      model: NALA_MODEL,
      max_tokens: 400,
      messages: [{ role: "user", content: extractionPrompt }],
    });

    const raw =
      extractResponse.content[0]?.type === "text"
        ? extractResponse.content[0].text
        : "{}";

    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    leadDelta = JSON.parse(cleaned) as LeadDelta;
  } catch {
    // Lead extraction is best-effort; never break the conversation
  }

  return NextResponse.json({ reply, leadDelta });
}
