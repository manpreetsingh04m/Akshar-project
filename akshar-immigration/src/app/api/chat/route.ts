import { buildChatSystemPrompt } from "@/lib/skills/immigration";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(8000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please send a valid message history." },
      { status: 400 },
    );
  }

  const apiKey =
    process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is temporarily unavailable." },
      { status: 503 },
    );
  }

  const modelName =
    process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";

  try {
    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({
      model: modelName,
      systemInstruction: buildChatSystemPrompt(),
    });

    const history = parsed.data.messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    }));

    // Gemini requires history to start with a user turn
    while (history.length > 0 && history[0].role !== "user") {
      history.shift();
    }

    const last = parsed.data.messages[parsed.data.messages.length - 1];
    if (last.role !== "user") {
      return NextResponse.json(
        { error: "Last message must be from the user." },
        { status: 400 },
      );
    }

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(last.content);
    const reply = result.response.text().trim() ||
      "I could not generate a reply. Please try again.";

    return NextResponse.json({ message: reply });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 },
    );
  }
}
