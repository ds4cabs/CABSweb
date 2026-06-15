import Link from "next/link";
import { auth, signOut } from "@/auth";

// Server component: reads the session and renders sign-in vs. signed-in state.
export async function AuthControls() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <Link href="/login" className="btn-outline">
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard" className="btn-primary">
        {user.name?.split(" ")[0] ?? "Profile"}
      </Link>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit" className="nav-link" title="Sign out">
          Sign out
        </button>
      </form>
    </div>
  );
}
