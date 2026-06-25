import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { NALA_LISTINGS } from "@/lib/listings";

// POST /api/twilio/sms
// Receives inbound SMS from Twilio (application/x-www-form-urlencoded).
// Generates an AI reply via Anthropic and returns TwiML so Twilio sends it back.
// Set this URL as the Twilio Messaging Service inbound webhook.

const ANTHROPIC = new Anthropic();

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function twimlReply(message: string): NextResponse {
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${xmlEscape(message)}</Message></Response>`,
    { status: 200, headers: { "Content-Type": "text/xml" } }
  );
}

// Empty TwiML — tells Twilio "received, no reply needed" (used for errors we don't want to expose)
function twimlEmpty(): NextResponse {
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
    { status: 200, headers: { "Content-Type": "text/xml" } }
  );
}

function buildListingContext(): string {
  return NALA_LISTINGS.map(
    (l) =>
      `${l.address}, ${l.city} ${l.state} | ${l.price} | ${l.beds}bd ${l.baths}ba | ${l.sqFt} sqft | ${l.status}`
  ).join("\n");
}

// SMS-optimized system prompt — short replies, one question at a time
const SMS_SYSTEM = `You are NALA, AI real estate concierge for Abbie Shepherd Real Estate Group / Keller Williams Buckhead in Atlanta, GA.

You are replying via SMS text message. Follow these rules strictly:
- Keep every reply to 1-2 short sentences (under 300 characters total).
- Ask only one question per message. Never stack multiple questions.
- Be warm and professional. No bullet lists, no headers, no long paragraphs.
- Never confirm a showing appointment — say "the team will follow up to confirm."
- Never describe a property that is not in the listings below.
- Collect naturally in conversation: name, buying/selling intent, budget, timeline, preferred area.
- For showing requests, collect property address and preferred date/time.
- For urgent or legal questions, direct to: (404) 275-5561 or abbieagent.com.

Active listings:
${buildListingContext()}`;

export async function POST(req: NextRequest) {
  // Twilio sends application/x-www-form-urlencoded
  let from: string;
  let body: string;
  let messageSid: string;

  try {
    const fd = await req.formData();
    from = String(fd.get("From") ?? "").trim();
    body = String(fd.get("Body") ?? "").trim();
    messageSid = String(fd.get("MessageSid") ?? "");
  } catch {
    console.error("[SMS] Failed to parse Twilio form body.");
    return twimlEmpty();
  }

  console.info("[SMS] inbound:", { from, messageSid, bodyLen: body.length });

  if (!body) {
    // Empty message — don't reply
    return twimlEmpty();
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("[SMS] ANTHROPIC_API_KEY not set — sending fallback reply.");
    return twimlReply(
      "Hi! This is NALA from Abbie Shepherd Real Estate. Our AI is setting up. Call (404) 275-5561 for immediate help."
    );
  }

  try {
    const completion = await ANTHROPIC.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 120,
      system: SMS_SYSTEM,
      messages: [{ role: "user", content: body }],
    });

    const reply = completion.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    console.info("[SMS] reply sent:", { to: from, replyLen: reply.length });
    return twimlReply(reply);
  } catch (error) {
    console.error("[SMS] Anthropic error:", error);
    // Graceful fallback — never expose the error to the customer
    return twimlReply(
      "Hi! This is NALA from Abbie Shepherd Real Estate. For help, call (404) 275-5561 or visit abbieagent.com."
    );
  }
}
