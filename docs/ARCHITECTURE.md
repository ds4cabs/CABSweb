# CABSweb Architecture

CABSweb is a Next.js (App Router) application backed by Supabase, with an AI layer powered by
OpenAI and a vector database. It is designed so the entire experience is functional **without any
secrets** — each external service is a swappable adapter that falls back to seeded data and
deterministic AI behavior.

## High-level data flow

```
                       ┌──────────────────────────────────────────────┐
                       │                  Next.js app                  │
                       │  App Router pages + /api route handlers        │
                       └───────────────┬───────────────┬──────────────┘
                                       │               │
                  ┌────────────────────┘               └───────────────────┐
                  ▼                                                         ▼
        ┌──────────────────┐                                     ┌──────────────────┐
        │  AI layer        │                                     │  Data layer       │
        │  src/lib/ai/*    │                                     │  Supabase / seed  │
        │  - search        │ ── embeds query ──► Vector DB ◄───── │  members, events, │
        │  - assistant     │ ◄── top-k chunks ──                  │  knowledge, etc.  │
        │  - recommend     │                                     └──────────────────┘
        └──────────────────┘
                  │ generate / chat
                  ▼
            ┌───────────┐     ┌──────────┐   ┌──────────┐   ┌──────────────┐
            │  OpenAI   │     │ HubSpot  │   │  Stripe  │   │ Zoom/Eventbrite│
            └───────────┘     └──────────┘   └──────────┘   └──────────────┘
```

## Capability flags

`src/lib/env.ts` reads environment variables once and derives a `capabilities` object
(`supabase`, `openai`, `hubspot`, `stripe`, `events`). Adapters branch on these flags:

```ts
if (capabilities.openai) {
  // live: embed + vector search + completion
} else {
  // fallback: deterministic token-overlap scoring over seeded data
}
```

This keeps demos instant and CI green while making the production path obvious and one-file-local.

## The AI layer (`src/lib/ai/`)

| File | Responsibility | Production path | Fallback |
| --- | --- | --- | --- |
| `search.ts` | Semantic search across the knowledge graph | Embed query → vector similarity → rerank | Token-overlap scorer over the seed corpus |
| `assistant.ts` | RAG conversational assistant | Retrieve top-k → grounded system prompt → stream completion | Extractive grounded answer with citations |
| `recommend.ts` | Mentor matching + "people to meet" | Cosine similarity over member embeddings + business rules | Transparent expertise/role overlap scoring |

### Knowledge Hub pipeline

1. **Ingest** — Zoom/Eventbrite recordings arrive via webhook after each event.
2. **Transcribe** — speech-to-text → speaker-labeled transcript.
3. **Summarize** — OpenAI distills themes, takeaways, and action items.
4. **Repurpose** — generate newsletters, podcasts, and reports from a single source.
5. **Index** — write embeddings to the vector DB for semantic retrieval.

The `KnowledgeAsset` type captures every derived artifact, with `derivedFrom` linking back to the
source recording.

## Data model

Domain types live in `src/types/index.ts`: `Member`, `KnowledgeAsset`, `Venture`, `Investor`,
`Opportunity`, `EventItem`, `Sponsor`, plus `ChatMessage`/`SearchResult`. Seed data in
`src/lib/data/seed.ts` mirrors the production shape; the Supabase schema should match these types
1:1 (snake_case columns ↔ camelCase fields).

## Integrations (`src/lib/integrations/`)

`index.ts` is the registry the homepage renders. Each entry names the SDK and reports `connected`
from the capability flags. To go live:

- **Supabase** — create tables matching `src/types`, enable RLS, swap `seed.ts` reads for queries.
- **Auth (Clerk/Auth0)** — wrap `app/layout.tsx` with the provider; gate member-only modules in middleware; derive the "current member" from the session instead of the hard-coded demo id in the dashboard.
- **OpenAI** — implement the commented production branches in `ai/*`.
- **Vector DB** — default pgvector inside Supabase; Pinecone/Qdrant adapters select on `VECTOR_PROVIDER`.
- **HubSpot** — sync `Member` and `Sponsor` records; mirror the partnership pipeline stages.
- **Stripe** — membership subscription tiers + event ticketing + webhooks.
- **Zoom/Eventbrite** — webhook handlers feed the Knowledge Hub pipeline.

## Security notes

- Service-role keys (Supabase, Stripe secret, OpenAI) are server-only — never expose them to the client. Only `NEXT_PUBLIC_*` values reach the browser.
- API route handlers (`app/api/*`) run on the Node runtime and are the boundary for any secret-bearing call.
- Member-only data must be protected by Supabase RLS in addition to route gating.
