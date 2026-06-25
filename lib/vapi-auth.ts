import { NextRequest, NextResponse } from "next/server";

// Returns a 401 response when VAPI_WEBHOOK_SECRET is set and the
// x-vapi-secret header doesn't match. Returns null to allow the request.
export function checkVapiSecret(req: NextRequest): NextResponse | null {
  const secret = process.env.VAPI_WEBHOOK_SECRET;
  if (!secret) return null;

  const provided = req.headers.get("x-vapi-secret");
  if (!provided || provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  return null;
}

// Vapi server tools wrap arguments inside message.toolCallList[0].function.arguments.
// This helper extracts them so routes can treat either format uniformly.
export function extractVapiArgs(raw: Record<string, unknown>): Record<string, unknown> | null {
  try {
    const message = raw.message as Record<string, unknown> | undefined;
    const list = message?.toolCallList as Array<Record<string, unknown>> | undefined;
    const fn = list?.[0]?.function as Record<string, unknown> | undefined;
    if (typeof fn?.arguments === "string") {
      return JSON.parse(fn.arguments) as Record<string, unknown>;
    }
    if (fn?.arguments && typeof fn.arguments === "object") {
      return fn.arguments as Record<string, unknown>;
    }
  } catch {
    // fall through — body is direct field format
  }
  return null;
}
