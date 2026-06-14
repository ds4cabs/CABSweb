import Link from "next/link";
import { features } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line/70 bg-ink/60">
      <div className="container-cabs grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-mono text-sm text-emerald-soft">_~/cabsweb</p>
          <p className="mt-3 max-w-xs text-sm text-slate-400">
            An AI-native talent, knowledge, and innovation ecosystem for the global life
            sciences community.
          </p>
        </div>
        <div>
          <p className="label">Platform</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {features.slice(0, 4).map((f) => (
              <li key={f.href}>
                <Link href={f.href as never} className="hover:text-white">{f.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">More</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {features.slice(4).map((f) => (
              <li key={f.href}>
                <Link href={f.href as never} className="hover:text-white">{f.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">CABS</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><a href="https://www.cabsweb.org/" className="hover:text-white" target="_blank" rel="noopener">cabsweb.org</a></li>
            <li><a href="https://ds4cabs.github.io/" className="hover:text-white" target="_blank" rel="noopener">DS4CABS</a></li>
            <li><a href="https://github.com/ds4cabs/CABSweb" className="hover:text-white" target="_blank" rel="noopener">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="container-cabs flex flex-col items-center justify-between gap-2 border-t border-line/60 py-6 text-xs text-slate-500 sm:flex-row">
        <span>© {new Date().getFullYear()} Chinese American Biopharmaceutical Society.</span>
        <span>Built by <span className="text-slate-300">ds4cabs</span> · Next.js · Supabase · OpenAI</span>
      </div>
    </footer>
  );
}
