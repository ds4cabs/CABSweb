import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { opportunities } from "@/lib/data/seed";

export const metadata: Metadata = { title: "Careers" };

const TYPE_STYLE: Record<string, string> = {
  "full-time": "border-emerald/40 text-emerald-soft",
  advisory: "border-indigo/40 text-indigo-soft",
  internship: "",
  contract: "",
  board: "",
};

export default function CareersPage() {
  const sorted = [...opportunities].sort((a, b) => b.postedAt.localeCompare(a.postedAt));

  return (
    <>
      <PageHeader
        eyebrow="💼 Careers & development"
        title="Opportunities across the life sciences ecosystem"
        intro="Full-time roles, advisory seats, board positions, and internships from across the CABS network and its sponsors — matched to your expertise and career stage."
      />

      <div className="container-cabs py-10">
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Development resources */}
          <aside className="space-y-3 lg:order-2">
            <div className="card">
              <h2 className="font-semibold text-white">Career development</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>· AI-reviewed résumé & profile optimization</li>
                <li>· Mock interviews with industry mentors</li>
                <li>· Academia → industry transition tracks</li>
                <li>· Negotiation & leadership workshops</li>
              </ul>
            </div>
            <div className="card">
              <h2 className="font-semibold text-white">For employers</h2>
              <p className="mt-2 text-sm text-slate-400">
                Sponsors and member companies post roles and tap a curated talent pool of 3,500+
                life-sciences professionals (~70% PhDs).
              </p>
            </div>
          </aside>

          {/* Listings */}
          <div className="space-y-4 lg:col-span-2 lg:order-1">
            {sorted.map((o) => (
              <article key={o.id} className="card card-hover">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-white">{o.title}</h3>
                  <span className={`chip ${TYPE_STYLE[o.type] ?? ""}`}>{o.type}</span>
                </div>
                <p className="mt-1 text-sm text-slate-300">
                  {o.org} · {o.location}{o.remote ? " · remote" : ""}
                </p>
                <p className="mt-2 text-sm text-slate-400">{o.description}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {o.tags.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">posted {o.postedAt}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
