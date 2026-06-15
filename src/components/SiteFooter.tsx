import Link from "next/link";
import { mainNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface-2">
      <div className="container-cabs grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-extrabold tracking-tight text-teal">CABS</p>
          <p className="mt-1 text-xs text-slate-500">北美华人生物医药协会</p>
          <p className="mt-3 max-w-xs text-sm text-slate-600">
            A non-profit organization for life sciences, trusted by our professional
            members. Join the community!
          </p>
        </div>
        <div>
          <p className="label">Navigate</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href as never} className="hover:text-teal">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Get involved</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/dashboard" className="hover:text-teal">Join CABS Today</Link></li>
            <li><Link href="/knowledge-hub" className="hover:text-teal">BioPacific Conference</Link></li>
            <li><Link href="/sponsorship" className="hover:text-teal">Become a Sponsor</Link></li>
            <li><Link href="/donate" className="hover:text-teal">Donate</Link></li>
          </ul>
        </div>
        <div>
          <p className="label">CABS</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><a href="https://www.cabsweb.org/" className="hover:text-teal" target="_blank" rel="noopener">cabsweb.org</a></li>
            <li><a href="https://ds4cabs.github.io/" className="hover:text-teal" target="_blank" rel="noopener">DS4CABS</a></li>
            <li><a href="https://github.com/ds4cabs/CABSweb" className="hover:text-teal" target="_blank" rel="noopener">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="container-cabs flex flex-col items-center justify-between gap-2 border-t border-line py-6 text-xs text-slate-500 sm:flex-row">
        <span>© {new Date().getFullYear()} Chinese-American Bio/Pharmaceutical Society.</span>
        <span>San Francisco · Life Sciences Community</span>
      </div>
    </footer>
  );
}
