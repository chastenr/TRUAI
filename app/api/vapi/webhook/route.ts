import { NextRequest, NextResponse } from "next/server";
import { checkVapiSecret } from "@/lib/vapi-auth";

// Vapi event types sent to server webhooks
type VapiEventType =
  | "end-of-call-report"
  | "transcript"
  | "status-update"
  | "tool-calls"
  | "hang"
  | "speech-update"
  | "conversation-update"
  | string;

type VapiCallSummary = {
  callId?: string;
  type?: VapiEventType;
  summary?: string;
  transcript?: string;
  durationSeconds?: number;
  endedReason?: string;
};

function safeLog(label: string, data: Record<string, unknown>) {
  // Never log secrets or tokens — only safe operational fields
  const { callId, type, summary, endedReason, durationSeconds } = data as VapiCallSummary & Record<string, unknown>;
  console.info(label, { callId, type, summary: summary ? "[present]" : "(none)", endedReason, durationSeconds });
}

export async function POST(req: NextRequest) {
  const authError = checkVapiSecret(req);
  if (authError) return authError;

  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // Vapi wraps all event data inside a `message` key
  const message = (raw.message ?? raw) as Record<string, unknown>;
  const eventType = (message.type ?? raw.type ?? "unknown") as string;

  safeLog(`[Vapi webhook] event: ${eventType}`, message);

  switch (eventType) {
    case "end-of-call-report": {
      const callId = message.callId as string | undefined;
      const endedReason = message.endedReason as string | undefined;
      const durationSeconds = message.durationSeconds as number | undefined;
      const summary = message.summary as string | undefined;
      const transcript = message.transcript as string | undefined;

      console.info("[Vapi webhook] call ended:", {
        callId,
        endedReason,
        durationSeconds,
        hasSummary: Boolean(summary),
        transcriptLength: typeof transcript === "string" ? transcript.length : 0,
      });
      break;
    }

    case "status-update": {
      console.info("[Vapi webhook] status update:", {
        callId: message.callId,
        status: message.status,
      });
      break;
    }

    case "tool-calls": {
      const toolCallList = message.toolCallList as Array<{ function?: { name?: string } }> | undefined;
      const toolNames = toolCallList?.map((t) => t.function?.name).filter(Boolean) ?? [];
      console.info("[Vapi webhook] tool calls:", { callId: message.callId, tools: toolNames });
      break;
    }

    default:
      console.info("[Vapi webhook] unhandled event type:", eventType);
  }

  // Vapi expects a 200 with any JSON body to acknowledge receipt
  return NextResponse.json({ ok: true, received: eventType });
}
