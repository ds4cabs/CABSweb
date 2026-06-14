"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { members } from "@/lib/data/seed";
import type { MemberRole } from "@/types";

const ROLES: MemberRole[] = [
  "scientist", "founder", "investor", "executive", "mentor", "student", "clinician", "regulatory",
];

export default function TalentGraphPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<MemberRole | "all">("all");

  const results = useMemo(() => {
    const needle = q.toLowerCase();
    return members.filter((m) => {
      const matchesRole = role === "all" || m.role.includes(role);
      const matchesQuery =
        !needle ||
        [m.name, m.headline, m.company, m.bio, ...m.expertise].join(" ").toLowerCase().includes(needle);
      return matchesRole && matchesQuery;
    });
  }, [q, role]);

  return (
    <>
      <PageHeader
        eyebrow="🕸️ Talent Graph"
        title="Discover the people behind the science"
        intro="A searchable graph of CABS members and industry leaders — mentors, experts, founders, and investors. Search by name, company, or expertise. (Semantic, embedding-powered search activates when an OpenAI key is connected.)"
      />

      <div className="container-cabs py-10">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search expertise, e.g. 'gene editing', 'regulatory', 'AI drug discovery'…"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as MemberRole | "all")}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-white outline-none focus:border-indigo"
          >
            <option value="all">All roles</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <p className="mt-4 text-sm text-slate-400">{results.length} member{results.length === 1 ? "" : "s"}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((m) => (
            <article key={m.id} className="card card-hover">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient font-bold text-white">
                  {m.avatarInitials}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{m.name}</h3>
                  <p className="text-xs text-slate-400">{m.headline}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-300">{m.company} · {m.location}</p>
              <p className="mt-2 text-sm text-slate-400">{m.bio}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.expertise.map((e) => (
                  <span key={e} className="chip">{e}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                {m.openToMentoring && <span className="chip border-emerald/40 text-emerald-soft">mentoring</span>}
                {m.seekingMentor && <span className="chip border-indigo/40 text-indigo-soft">seeking mentor</span>}
              </div>
            </article>
          ))}
        </div>

        {results.length === 0 && (
          <p className="mt-10 text-center text-slate-500">No members match your search yet.</p>
        )}
      </div>
    </>
  );
}
