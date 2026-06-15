import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { members, events, opportunities, knowledge } from "@/lib/data/seed";
import { suggestConnections, matchMentors } from "@/lib/ai/recommend";
import { features } from "@/lib/nav";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  // Demo "current member" — in production this comes from the auth session.
  const me = members.find((m) => m.id === "m4")!; // Kevin Wu, seeking a mentor
  const connections = suggestConnections(me, 3);
  const mentors = matchMentors(me, 2);
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  return (
    <>
      <PageHeader
        eyebrow="🎛️ Your dashboard"
        title={<>Welcome back, {me.name.split(" ")[0]}</>}
        intro="A personalized home that surfaces the right people, knowledge, and opportunities for where you are in your career."
      />

      <div className="container-cabs grid gap-6 py-10 lg:grid-cols-3">
        {/* Profile + quick links */}
        <section className="card lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient font-bold text-ink">
              {me.avatarInitials}
            </div>
            <div>
              <p className="font-semibold text-ink">{me.name}</p>
              <p className="text-sm text-slate-400">{me.headline}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400">{me.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {me.expertise.map((e) => (
              <span key={e} className="chip">{e}</span>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {features.slice(1, 5).map((f) => (
              <Link key={f.href} href={f.href as never} className="btn-outline justify-start text-xs">
                <span>{f.icon}</span> {f.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-ink">🧭 Recommended mentors</h2>
              <Link href="/mentorship" className="text-sm text-teal-deep hover:underline">View all</Link>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {mentors.map((m) => (
                <li key={m.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{m.name}</p>
                    <p className="text-xs text-slate-400">{m.headline} · {m.company}</p>
                  </div>
                  <span className="chip border-teal/40 text-teal-deep">match {m.matchScore}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card">
              <h2 className="font-semibold text-ink">👋 People to meet</h2>
              <ul className="mt-4 space-y-3">
                {connections.map((c) => (
                  <li key={c.id} className="text-sm">
                    <p className="font-medium text-ink">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.headline}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-ink">📅 Upcoming</h2>
                <Link href="/knowledge-hub" className="text-sm text-teal-deep hover:underline">All events</Link>
              </div>
              <ul className="mt-4 space-y-3">
                {upcoming.map((e) => (
                  <li key={e.id} className="text-sm">
                    <p className="font-medium text-ink">{e.title}</p>
                    <p className="text-xs text-slate-400">{e.date} · {e.venue}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-ink">💼 Opportunities for you</h2>
              <Link href="/careers" className="text-sm text-teal-deep hover:underline">Browse</Link>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {opportunities.slice(0, 2).map((o) => (
                <li key={o.id} className="py-3">
                  <p className="text-sm font-medium text-ink">{o.title}</p>
                  <p className="text-xs text-slate-400">{o.org} · {o.location}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="font-semibold text-ink">📚 Fresh from the Knowledge Hub</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {knowledge.slice(0, 3).map((k) => (
                <li key={k.id}>· {k.title}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
