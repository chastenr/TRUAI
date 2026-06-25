import { NextRequest, NextResponse } from "next/server";
import { checkVapiSecret } from "@/lib/vapi-auth";

// POST /api/vapi/webhook
// Receives Vapi lifecycle events: call ended, SMS conversation updates,
// status changes, tool-call debug traces, etc.
// Must return 200 quickly — Vapi has a 20-second server timeout.

export async function POST(req: NextRequest) {
  const authError = checkVapiSecret(req);
  if (authError) return authError;

  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // Vapi wraps event data inside a `message` key for server webhooks.
  // For direct API calls the fields sit at the root.
  const message = (raw.message ?? raw) as Record<string, unknown>;
  const eventType = (message.type ?? raw.type ?? "unknown") as string;

  // Safe fields only — never log auth tokens, API keys, or full transcripts.
  console.info(`[Vapi webhook] event=${eventType}`, {
    callId: message.callId ?? raw.callId ?? null,
    sessionId: message.sessionId ?? null,
    channel: message.channel ?? null,
  });

  switch (eventType) {
    // ── Voice: call lifecycle ────────────────────────────────────────────────
    case "end-of-call-report": {
      console.info("[Vapi webhook] call ended:", {
        callId: message.callId,
        endedReason: message.endedReason,
        durationSeconds: message.durationSeconds,
        hasSummary: Boolean(message.summary),
        transcriptLength: typeof message.transcript === "string" ? message.transcript.length : 0,
      });
      break;
    }

    case "status-update": {
      console.info("[Vapi webhook] status:", {
        callId: message.callId,
        status: message.status,
      });
      break;
    }

    // ── SMS / Chat: message events ───────────────────────────────────────────
    // Vapi fires conversation-update for every new message in an SMS session.
    case "conversation-update": {
      const messages = message.messages as Array<Record<string, unknown>> | undefined;
      const last = messages?.at(-1);
      const role = last?.role as string | undefined;
      const channel = message.channel ?? "unknown";

      console.info("[Vapi webhook] conversation-update:", {
        sessionId: message.sessionId,
        channel,
        messageCount: messages?.length ?? 0,
        lastRole: role ?? "none",
      });

      // No action needed — Vapi handles the AI reply directly.
      // Tool calls (capture_lead, book_showing, property_inquiry) have their own endpoints.
      break;
    }

    // ── Tool calls (debugging only — tools have dedicated endpoints) ─────────
    case "tool-calls": {
      const toolCallList = message.toolCallList as Array<{ function?: { name?: string } }> | undefined;
      const toolNames = toolCallList?.map((t) => t.function?.name).filter(Boolean) ?? [];
      console.info("[Vapi webhook] tool-calls:", {
        callId: message.callId,
        sessionId: message.sessionId,
        tools: toolNames,
      });
      break;
    }

    case "hang": {
      console.info("[Vapi webhook] hang detected:", { callId: message.callId });
      break;
    }

    // ── Catch-all: log unknown types so we can add handlers later ────────────
    default: {
      console.info("[Vapi webhook] unhandled event type:", eventType);
      break;
    }
  }

  // Always return 200 immediately. Vapi does not use this response body
  // for anything other than confirming receipt.
  return NextResponse.json({ ok: true, received: eventType });
}
