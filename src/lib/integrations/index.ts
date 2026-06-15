// Integration registry — the platform's external service map.
//
// Each entry is a thin, swappable adapter. In dev they report `connected:false`
// and the app uses seeded data + deterministic AI fallbacks. Wire real keys in
// .env.local to light them up. See docs/ARCHITECTURE.md for the data flow.

import { capabilities, env } from "@/lib/env";

export interface IntegrationStatus {
  key: string;
  name: string;
  purpose: string;
  sdk: string;
  connected: boolean;
}

export const integrations: IntegrationStatus[] = [
  {
    key: "supabase",
    name: "Supabase",
    purpose: "Postgres database, auth tables, storage, row-level security, realtime.",
    sdk: "@supabase/supabase-js",
    connected: capabilities.supabase,
  },
  {
    key: "auth",
    name: "NextAuth (Google)",
    purpose: "Member identity, SSO, session management, org/role gating.",
    sdk: "next-auth",
    connected: capabilities.googleAuth,
  },
  {
    key: "openai",
    name: "OpenAI",
    purpose: "Embeddings, semantic search, recommendations, content generation, assistant.",
    sdk: "openai",
    connected: capabilities.openai,
  },
  {
    key: "vector",
    name: `Vector DB (${env.vectorProvider})`,
    purpose: "Semantic retrieval across CABS knowledge assets.",
    sdk: env.vectorProvider === "pinecone" ? "@pinecone-database/pinecone" : "pgvector",
    connected: capabilities.openai && capabilities.supabase,
  },
  {
    key: "hubspot",
    name: "HubSpot",
    purpose: "CRM, member lifecycle, engagement campaigns, sponsorship pipeline.",
    sdk: "@hubspot/api-client",
    connected: capabilities.hubspot,
  },
  {
    key: "stripe",
    name: "Stripe",
    purpose: "Membership subscriptions, event ticketing, payments.",
    sdk: "stripe",
    connected: capabilities.stripe,
  },
  {
    key: "events",
    name: "Zoom + Eventbrite",
    purpose: "Virtual programming, registration, recordings ingested into the Knowledge Hub.",
    sdk: "zoom-api + eventbrite",
    connected: capabilities.events,
  },
];
