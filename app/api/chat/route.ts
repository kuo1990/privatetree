import { NextRequest } from "next/server";
import { chat } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: { role: "user" | "model"; content: string }[] =
      body.messages;

    if (!messages || messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 });
    }

    const reply = await chat(messages);
    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "小樹現在沒辦法回應，請稍後再試 🌿" },
      { status: 500 }
    );
  }
}
