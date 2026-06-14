import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { sponsors } from "@/lib/data/seed";

export const metadata: Metadata = { title: "Sponsorship & Partnerships" };

const TIER_ORDER = ["platinum", "gold", "silver", "community"] as const;
const TIER_STYLE: Record<string, string> = {
  platinum: "border-indigo/50 text-indigo-soft",
  gold: "border-emerald/50 text-emerald-soft",
  silver: "",
  community: "",
};

export default function SponsorshipPage() {
  const byTier = TIER_ORDER.map((tier) => ({
    tier,
    items: sponsors.filter((s) => s.tier === tier),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="🤝 Sponsorship & Partnerships"
        title="Integrated partnership management"
        intro="Manage the full sponsor lifecycle — discovery, deal, activation, and renewal — synced with HubSpot CRM. Partners gain measurable touchpoints across conferences, programming, and the talent pool."
      />

      <div className="container-cabs py-10">
        {/* Tiers overview */}
        <section className="grid gap-4 sm:grid-cols-4">
          {[
            { t: "Platinum", d: "Flagship conference, naming, talent pipeline." },
            { t: "Gold", d: "Program series, mentorship hosting, forums." },
            { t: "Silver", d: "Event presence, perks for member startups." },
            { t: "Community", d: "Mission-aligned nonprofits & academia." },
          ].map((x) => (
            <div key={x.t} className="card">
              <h3 className="font-semibold text-white">{x.t}</h3>
              <p className="mt-1 text-sm text-slate-400">{x.d}</p>
            </div>
          ))}
        </section>

        {/* Current partners */}
        {byTier.map((group) => (
          <section key={group.tier} className="mt-10">
            <h2 className="text-xl font-bold capitalize text-white">{group.tier} partners</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((s) => (
                <article key={s.id} className="card card-hover">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{s.name}</h3>
                    <span className={`chip ${TIER_STYLE[s.tier]}`}>{s.tier}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{s.partnership}</p>
                  <p className="mt-3 text-xs text-slate-500">{s.industry} · partner since {s.since}</p>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* CRM pipeline note */}
        <section className="card mt-12">
          <h2 className="font-semibold text-white">Partnership pipeline (HubSpot-synced)</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {["Prospect", "In discussion", "Activated", "Renewal"].map((stage, i) => (
              <div key={stage} className="rounded-xl border border-line bg-surface-2 p-4">
                <p className="font-mono text-xs text-emerald-soft">stage 0{i + 1}</p>
                <p className="mt-1 font-medium text-white">{stage}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Deals, contacts, and engagement scores flow bidirectionally with HubSpot CRM so the
            partnerships team works from a single source of truth.
          </p>
        </section>
      </div>
    </>
  );
}
