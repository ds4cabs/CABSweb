import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { capabilities } from "@/lib/env";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in or register for CABSweb with your Google account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await auth();
  const callbackUrl = searchParams.callbackUrl ?? "/dashboard";
  if (session?.user) redirect(callbackUrl);

  return (
    <div className="container-cabs flex min-h-[70vh] items-center justify-center py-16">
      <div className="card w-full max-w-md text-center">
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Welcome to <span className="grad-text">CABSweb</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in or create your member account with Google.
        </p>

        {capabilities.googleAuth ? (
          <form
            className="mt-8"
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: callbackUrl });
            }}
          >
            <button type="submit" className="btn-outline w-full">
              <GoogleGlyph />
              Continue with Google
            </button>
          </form>
        ) : (
          <div className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-left text-sm text-amber-800">
            <p className="font-medium">Google sign-in isn’t configured yet.</p>
            <p className="mt-1 text-amber-700">
              Set <code>AUTH_GOOGLE_ID</code> and{" "}
              <code>AUTH_GOOGLE_SECRET</code> in <code>.env.local</code>, then
              restart the dev server.
            </p>
            {capabilities.devAuth && (
              <form
                className="mt-4"
                action={async () => {
                  "use server";
                  await signIn("dev", { redirectTo: callbackUrl });
                }}
              >
                <button type="submit" className="btn-primary w-full">
                  Continue as test member (dev only)
                </button>
              </form>
            )}
          </div>
        )}

        <p className="mt-6 text-xs text-slate-400">
          By continuing you agree to the CABS community guidelines.
        </p>
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}
