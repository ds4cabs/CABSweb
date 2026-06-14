// Personalized recommendations: mentor matching and "people you should meet".
//
// PRODUCTION: cosine similarity over member embeddings + business rules
// (complementary roles, mentoring availability, shared expertise, geography).
// FALLBACK: transparent expertise/role overlap scoring over the seed data.

import type { Member } from "@/types";
import { members } from "@/lib/data/seed";

function overlap<T>(a: T[], b: T[]): number {
  const set = new Set(a);
  return b.filter((x) => set.has(x)).length;
}

/** Rank potential mentors for a given member (seeking a mentor). */
export function matchMentors(member: Member, limit = 3): Member[] {
  return members
    .filter((m) => m.id !== member.id && m.openToMentoring)
    .map((m) => {
      const expertise = overlap(member.expertise, m.expertise) * 3;
      const seniority = m.role.includes("executive") || m.role.includes("mentor") ? 2 : 0;
      const local = m.location.split(",").pop() === member.location.split(",").pop() ? 1 : 0;
      return { ...m, matchScore: expertise + seniority + local };
    })
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
    .slice(0, limit);
}

/** "People you should meet" — complementary connections across the network. */
export function suggestConnections(member: Member, limit = 4): Member[] {
  return members
    .filter((m) => m.id !== member.id)
    .map((m) => {
      const shared = overlap(member.expertise, m.expertise) * 2;
      // Reward complementary roles (e.g. founder <-> investor).
      const complementary =
        (member.role.includes("founder") && m.role.includes("investor")) ||
        (member.role.includes("investor") && m.role.includes("founder"))
          ? 3
          : 0;
      return { ...m, matchScore: shared + complementary + 1 };
    })
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
    .slice(0, limit);
}
