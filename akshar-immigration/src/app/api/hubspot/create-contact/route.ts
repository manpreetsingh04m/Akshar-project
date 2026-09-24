import { createHubSpotContact } from "@/lib/hubspot/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  destination: z.string().optional(),
  purpose: z.string().optional(),
  source: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Please check your details and try again.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { email, firstName, lastName, phone, destination, purpose, source, message } =
    parsed.data;

  try {
    const result = await createHubSpotContact({
      email,
      firstname: firstName,
      lastname: lastName,
      phone,
      destination,
      purpose,
      source,
      message,
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
      { error: "We could not save your details right now. Please try again." },
      { status: 500 },
    );
  }
}
