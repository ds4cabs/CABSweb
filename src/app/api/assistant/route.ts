import { NextResponse } from "next/server";
import { askAssistant } from "@/lib/ai/assistant";
import type { ChatMessage } from "@/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { question?: string; history?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }
  const question = (body.question ?? "").trim();
  if (!question) return NextResponse.json({ error: "question is required" }, { status: 400 });

  const reply = await askAssistant(question, body.history ?? []);
  return NextResponse.json(reply);
}
