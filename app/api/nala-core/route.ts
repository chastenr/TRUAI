import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { NALA_LISTINGS } from "@/lib/listings";
import { NALA_SYSTEM_PROMPT } from "@/lib/prompt";

const NALA_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001";

type ChatMessage = { role: "user" | "assistant"; content: string };

type NalaLeadDelta = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  propertyInterest?: string | null;
  budget?: string | null;
  timeline?: string | null;
  financingStatus?: string | null;
  showingRequest?: boolean | null;
  intent?: string | null;
  summary?: string | null;
  nextStep?: string | null;
  escalate?: boolean;
  escalateReason?: string | null;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const maybeMessage = value as Partial<ChatMessage>;
  return (
    (maybeMessage.role === "user" || maybeMessage.role === "assistant") &&
    typeof maybeMessage.content === "string" &&
    maybeMessage.content.trim().length > 0
  );
}

function cleanJson(raw: string) {
  return raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

function normalizeLeadDelta(value: unknown): NalaLeadDelta {
  if (!value || typeof value !== "object") return {};
  const raw = value as Record<string, unknown>;

  return {
    name: typeof raw.name === "string" ? raw.name : null,
    email: typeof raw.email === "string" ? raw.email : null,
    phone: typeof raw.phone === "string" ? raw.phone : null,
    propertyInterest:
      typeof raw.propertyInterest === "string"
        ? raw.propertyInterest
        : typeof raw.property === "string"
          ? raw.property
          : null,
    budget: typeof raw.budget === "string" ? raw.budget : null,
    timeline: typeof raw.timeline === "string" ? raw.timeline : null,
    financingStatus:
      typeof raw.financingStatus === "string"
        ? raw.financingStatus
        : typeof raw.financing === "string"
          ? raw.financing
          : null,
    showingRequest: typeof raw.showingRequest === "boolean" ? raw.showingRequest : null,
    intent: typeof raw.intent === "string" ? raw.intent : null,
    summary: typeof raw.summary === "string" ? raw.summary : null,
    nextStep: typeof raw.nextStep === "string" ? raw.nextStep : null,
    escalate: raw.escalate === true,
    escalateReason: typeof raw.escalateReason === "string" ? raw.escalateReason : null,
  };
}

export async function POST(req: NextRequest) {
  let messages: ChatMessage[];

  try {
    const body = await req.json();
    messages = Array.isArray(body.messages) ? body.messages.filter(isChatMessage) : [];
  } catch {
    return NextResponse.json(
      { reply: "", leadDelta: {}, error: "invalid_request" },
      { status: 400 }
    );
  }

  if (messages.length === 0) {
    return NextResponse.json(
      { reply: "", leadDelta: {}, error: "messages_required" },
      { status: 400 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { reply: "", leadDelta: {}, error: "nala_unavailable" },
      { status: 503 }
    );
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const listingContext =
    "\n\n## ACTIVE LISTINGS\nUse only this listing data for property-specific answers:\n" +
    JSON.stringify(NALA_LISTINGS, null, 2);
  const fullSystem = NALA_SYSTEM_PROMPT + listingContext;

  try {
    const replyResponse = await client.messages.create({
      model: NALA_MODEL,
      max_tokens: 650,
      system: fullSystem,
      messages,
    });

    const reply =
      replyResponse.content[0]?.type === "text" ? replyResponse.content[0].text : "";

    const conversationText = [...messages, { role: "assistant", content: reply } satisfies ChatMessage]
      .map((message) => `${message.role === "user" ? "Buyer" : "NALA"}: ${message.content}`)
      .join("\n");

    const extractionPrompt = `Extract buyer lead information from this real estate conversation. Return only valid JSON with this exact shape:
{
  "name": string | null,
  "email": string | null,
  "phone": string | null,
  "propertyInterest": string | null,
  "budget": string | null,
  "timeline": string | null,
  "financingStatus": string | null,
  "showingRequest": boolean | null,
  "intent": string | null,
  "summary": string | null,
  "nextStep": string | null,
  "escalate": boolean,
  "escalateReason": string | null
}

Rules:
- Only populate fields explicitly stated or clearly implied by the buyer.
- propertyInterest is the listing address, neighborhood, or property type the buyer is asking about.
- financingStatus captures prequalified, cash, financing, proof-of-funds, or unknown status.
- showingRequest is true only when the buyer asks to tour, view, schedule, or see a property.
- summary is a concise CRM note.
- nextStep is the recommended advisor action.
- Return null for unknown fields.

Conversation:
${conversationText}`;

    let leadDelta: NalaLeadDelta = {};

    try {
      const extractResponse = await client.messages.create({
        model: NALA_MODEL,
        max_tokens: 450,
        messages: [{ role: "user", content: extractionPrompt }],
      });

      const raw =
        extractResponse.content[0]?.type === "text" ? extractResponse.content[0].text : "{}";
      leadDelta = normalizeLeadDelta(JSON.parse(cleanJson(raw)));
    } catch {
      leadDelta = {};
    }

    return NextResponse.json({ reply, leadDelta });
  } catch {
    return NextResponse.json(
      { reply: "", leadDelta: {}, error: "nala_unavailable" },
      { status: 502 }
    );
  }
}
