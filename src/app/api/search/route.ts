import { NextResponse } from "next/server";
import { semanticSearch } from "@/lib/ai/search";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  if (!q.trim()) return NextResponse.json({ query: q, results: [] });
  const results = await semanticSearch(q);
  return NextResponse.json({ query: q, results });
}
