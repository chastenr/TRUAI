import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      disabled: true,
      message: "Website chat is disabled. Use the Trulience avatar for chat and voice.",
    },
    { status: 410 }
  );
}
