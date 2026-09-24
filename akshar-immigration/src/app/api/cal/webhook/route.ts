import { createHubSpotContact } from "@/lib/hubspot/client";
import { NextResponse } from "next/server";

type CalPayload = {
  triggerEvent?: string;
  payload?: {
    attendees?: { email?: string; name?: string }[];
    responses?: Record<string, { value?: string }>;
    title?: string;
  };
};

export async function POST(request: Request) {
  const secret = process.env.CAL_COM_WEBHOOK_SECRET;
  if (secret) {
    const headerSecret = request.headers.get("x-cal-signature-256")
      ?? request.headers.get("cal-signature")
      ?? request.headers.get("x-cal-secret");
    if (headerSecret !== secret) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  let body: CalPayload;
  try {
    body = (await request.json()) as CalPayload;
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const attendee = body.payload?.attendees?.[0];
  const email =
    attendee?.email ??
    body.payload?.responses?.email?.value ??
    body.payload?.responses?.attendeeEmail?.value;

  if (!email) {
    return NextResponse.json(
      { error: "No attendee email in booking payload." },
      { status: 422 },
    );
  }

  const fullName = attendee?.name ?? "";
  const [firstName, ...rest] = fullName.trim().split(/\s+/);
  const lastName = rest.join(" ") || undefined;

  try {
    const result = await createHubSpotContact({
      email,
      firstname: firstName || undefined,
      lastname: lastName,
      source: "cal-com-booking",
      purpose: body.payload?.title,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status ?? 502 },
      );
    }

    return NextResponse.json({ ok: true, id: result.data.id });
  } catch {
    return NextResponse.json(
      { error: "Failed to sync booking to CRM." },
      { status: 500 },
    );
  }
}
