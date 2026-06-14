import Link from "next/link";
import { BrandMark } from "@/components/Brand";
import { features } from "@/lib/nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/80 backdrop-blur">
      <div className="container-cabs flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandMark />
          <span className="flex flex-col leading-none">
            <strong className="text-sm font-extrabold tracking-tight text-white">CABSweb</strong>
            <small className="text-[11px] text-slate-400">Chinese American Biopharmaceutical Society</small>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {features.slice(0, 6).map((f) => (
            <Link
              key={f.href}
              href={f.href as never}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-surface-2 hover:text-white"
            >
              {f.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="btn-outline hidden sm:inline-flex">
            Sign in
          </Link>
          <Link href="/dashboard" className="btn-primary">
            Join CABS
          </Link>
        </div>
      </div>
    </header>
  );
}
