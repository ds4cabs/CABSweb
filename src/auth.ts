// Auth.js (NextAuth v5) configuration.
//
// Google sign-in, JWT session strategy (no database — "login-only"). The
// provider auto-reads AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET and the session is
// signed with AUTH_SECRET. To persist members later, add a database adapter
// here without changing the rest of the app.
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { capabilities } from "@/lib/env";

// Dev-only mock provider: one-click sign-in as a seeded test member so the
// authenticated areas are testable without Google OAuth. `capabilities.devAuth`
// is false in production and whenever real Google credentials are present, so
// this provider is never registered there.
const devProvider = Credentials({
  id: "dev",
  name: "Dev test member",
  credentials: {},
  authorize: () => ({
    id: "m4",
    name: "Kevin Wu (test)",
    email: "kevin.wu@example.com",
  }),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Vercel/most hosts terminate TLS upstream; trust the forwarded host so
  // callback URLs resolve correctly in production.
  trustHost: true,
  providers: capabilities.devAuth ? [Google, devProvider] : [Google],
  pages: {
    signIn: "/login",
  },
});
