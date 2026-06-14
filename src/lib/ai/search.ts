// Semantic search across the CABS knowledge graph.
//
// PRODUCTION: embed the query with OpenAI (env.openaiEmbeddingModel), run a
// vector similarity search against the configured vector store (pgvector /
// Pinecone / Qdrant), then optionally rerank. See docs/ARCHITECTURE.md.
//
// FALLBACK (no key): a deterministic token-overlap scorer so the UI is fully
// functional offline. The interface is identical, so swapping in real
// embeddings is a one-file change.

import type { SearchResult } from "@/types";
import { members, knowledge, ventures, opportunities, events } from "@/lib/data/seed";
import { capabilities } from "@/lib/env";

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function score(query: string, haystack: string): number {
  const q = new Set(tokenize(query));
  if (q.size === 0) return 0;
  const h = tokenize(haystack);
  if (h.length === 0) return 0;
  let hits = 0;
  for (const tok of h) if (q.has(tok)) hits++;
  // Normalize by query size, lightly reward density.
  return hits / q.size + hits / (h.length + 10);
}

function corpus(): { result: Omit<SearchResult, "score">; text: string }[] {
  const out: { result: Omit<SearchResult, "score">; text: string }[] = [];
  for (const m of members)
    out.push({
      result: { id: m.id, kind: "member", title: m.name, snippet: `${m.headline} · ${m.company}`, href: "/talent-graph" },
      text: [m.name, m.headline, m.company, m.bio, ...m.expertise, ...m.role].join(" "),
    });
  for (const k of knowledge)
    out.push({
      result: { id: k.id, kind: "knowledge", title: k.title, snippet: k.summary, href: "/knowledge-hub" },
      text: [k.title, k.summary, k.source, ...k.topics].join(" "),
    });
  for (const v of ventures)
    out.push({
      result: { id: v.id, kind: "venture", title: v.company, snippet: v.oneLiner, href: "/network" },
      text: [v.company, v.oneLiner, v.therapeuticArea, v.modality, v.stage].join(" "),
    });
  for (const o of opportunities)
    out.push({
      result: { id: o.id, kind: "opportunity", title: o.title, snippet: `${o.org} · ${o.location}`, href: "/careers" },
      text: [o.title, o.org, o.description, ...o.tags].join(" "),
    });
  for (const e of events)
    out.push({
      result: { id: e.id, kind: "event", title: e.title, snippet: `${e.venue} · ${e.date}`, href: "/knowledge-hub" },
      text: [e.title, e.description, e.venue, e.format].join(" "),
    });
  return out;
}

export async function semanticSearch(query: string, limit = 8): Promise<SearchResult[]> {
  // if (capabilities.openai) { return await vectorSearch(query, limit); }
  void capabilities; // referenced so the prod branch is discoverable
  return corpus()
    .map(({ result, text }) => ({ ...result, score: score(query, text) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
