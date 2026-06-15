import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { members } from "@/lib/data/seed";
import { matchMentors } from "@/lib/ai/recommend";

export const metadata: Metadata = { title: "Mentorship Matching" };

export default function MentorshipPage() {
  const mentees = members.filter((m) => m.seekingMentor);
  const mentors = members.filter((m) => m.openToMentoring);

  return (
    <>
      <PageHeader
        eyebrow="🧭 Mentorship Matching"
        title="The right mentor, matched by AI"
        intro="We score potential mentors on shared expertise, complementary seniority, and proximity, then surface the strongest matches. Mentors opt in; mentees get a ranked shortlist with a clear rationale."
      />

      <div className="container-cabs py-10">
        {/* How matching works */}
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Shared expertise", d: "Overlap in therapeutic areas, modalities, and functions (weighted highest).", w: "×3" },
            { t: "Complementary seniority", d: "Executives and experienced mentors are prioritized for early-career mentees.", w: "×2" },
            { t: "Proximity", d: "Same region for in-person coffee chats and local programming.", w: "×1" },
          ].map((x) => (
            <div key={x.t} className="card">
              <span className="chip border-teal/40 text-teal-deep">{x.w}</span>
              <h3 className="mt-3 font-semibold text-ink">{x.t}</h3>
              <p className="mt-1 text-sm text-slate-400">{x.d}</p>
            </div>
          ))}
        </section>

        {/* Live matches for mentees */}
        <h2 className="mt-12 text-2xl font-bold text-ink">Suggested matches</h2>
        <div className="mt-4 space-y-6">
          {mentees.map((mentee) => {
            const matches = matchMentors(mentee, 3);
            return (
              <article key={mentee.id} className="card">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient font-bold text-ink">
                    {mentee.avatarInitials}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{mentee.name} <span className="chip border-orange/40 text-orange">seeking mentor</span></p>
                    <p className="text-sm text-slate-400">{mentee.headline} · {mentee.company}</p>
                  </div>
                </div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {matches.map((m) => (
                    <li key={m.id} className="rounded-xl border border-line bg-surface-2 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-ink">{m.name}</p>
                        <span className="chip border-teal/40 text-teal-deep">{m.matchScore}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{m.headline}</p>
                      <p className="mt-2 text-xs text-slate-500">{m.company}</p>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Mentor roster */}
        <h2 className="mt-12 text-2xl font-bold text-ink">Mentors accepting mentees</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((m) => (
            <article key={m.id} className="card card-hover">
              <h3 className="font-semibold text-ink">{m.name}</h3>
              <p className="text-sm text-slate-400">{m.headline} · {m.company}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.expertise.map((e) => (
                  <span key={e} className="chip">{e}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
