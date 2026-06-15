// Centralized environment access + capability flags.
//
// The platform is designed to run end-to-end with NO secrets configured: every
// integration degrades gracefully to seeded mock data. As you add real keys,
// the corresponding `has*` flag flips to `true` and the live adapter is used.

function get(key: string): string | undefined {
  const v = process.env[key];
  return v && v.length > 0 ? v : undefined;
}

export const env = {
  appUrl: get("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000",
  appName: get("NEXT_PUBLIC_APP_NAME") ?? "CABSweb",

  supabaseUrl: get("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: get("NEXT_PUBLIC_SUPABASE_ANON_KEY"),

  authGoogleId: get("AUTH_GOOGLE_ID"),
  authGoogleSecret: get("AUTH_GOOGLE_SECRET"),

  openaiKey: get("OPENAI_API_KEY"),
  openaiChatModel: get("OPENAI_CHAT_MODEL") ?? "gpt-4o",
  openaiEmbeddingModel: get("OPENAI_EMBEDDING_MODEL") ?? "text-embedding-3-large",

  vectorProvider: (get("VECTOR_PROVIDER") ?? "pgvector") as
    | "pgvector"
    | "pinecone"
    | "qdrant",

  hubspotToken: get("HUBSPOT_ACCESS_TOKEN"),
  stripeKey: get("STRIPE_SECRET_KEY"),
  eventbriteToken: get("EVENTBRITE_API_TOKEN"),
  zoomClientId: get("ZOOM_CLIENT_ID"),
} as const;

export const capabilities = {
  googleAuth: Boolean(env.authGoogleId && env.authGoogleSecret),
  // Dev-only escape hatch: when Google isn't configured and we're not in
  // production, expose a one-click mock sign-in so member/dashboard areas are
  // testable locally. Never active in a production build.
  devAuth:
    process.env.NODE_ENV !== "production" &&
    !(env.authGoogleId && env.authGoogleSecret),
  supabase: Boolean(env.supabaseUrl && env.supabaseAnonKey),
  openai: Boolean(env.openaiKey),
  hubspot: Boolean(env.hubspotToken),
  stripe: Boolean(env.stripeKey),
  events: Boolean(env.eventbriteToken || env.zoomClientId),
} as const;
