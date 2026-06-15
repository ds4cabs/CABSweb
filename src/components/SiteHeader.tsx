import Link from "next/link";
import { BrandMark } from "@/components/Brand";
import { AuthControls } from "@/components/AuthControls";
import { mainNav } from "@/lib/nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-cabs flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <BrandMark size={40} />
          <span className="hidden flex-col leading-tight sm:flex">
            <small className="text-[10px] font-medium tracking-wide text-slate-500">
              Chinese-American Bio/Pharmaceutical Society
            </small>
            <small className="text-[12px] text-slate-500">北美华人生物医药协会</small>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href as never} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <AuthControls />
      </div>
    </header>
  );
}
