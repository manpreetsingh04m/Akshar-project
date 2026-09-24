import { findChecklist } from "@/lib/sanity/seed/checklists";
import { NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  country: z.string().min(1, "Country is required."),
  visaType: z.string().min(1, "Visa type is required."),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    country: searchParams.get("country") ?? "",
    visaType: searchParams.get("visaType") ?? "",
  });

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Invalid query parameters.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const checklist = findChecklist(parsed.data.country, parsed.data.visaType);
  if (!checklist) {
    return NextResponse.json(
      { error: "No checklist found for that country and visa type." },
      { status: 404 },
    );
  }

  return NextResponse.json(checklist);
}
