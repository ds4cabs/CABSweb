import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ventures, investors, members } from "@/lib/data/seed";

export const metadata: Metadata = { title: "Founder & Investor Network" };

const usd = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M` : `$${(n / 1000).toFixed(0)}K`;

export default function NetworkPage() {
  const founderName = (id: string) => members.find((m) => m.id === id)?.name ?? id;

  return (
    <>
      <PageHeader
        eyebrow="🚀 Founder & Investor Network"
        title="Where startups get formed and funded"
        intro="Connect founders with co-founders, advisors, and capital. The network matches ventures to investors by stage, thesis, and therapeutic focus — accelerating startup formation across the CABS community."
      />

      <div className="container-cabs grid gap-10 py-10 lg:grid-cols-2">
        {/* Ventures */}
        <section>
          <h2 className="text-2xl font-bold text-ink">Ventures raising</h2>
          <div className="mt-4 space-y-4">
            {ventures.map((v) => (
              <article key={v.id} className="card card-hover">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-ink">{v.company}</h3>
                  <span className="chip">{v.stage}</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{v.oneLiner}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="chip">{v.therapeuticArea}</span>
                  <span className="chip">{v.modality}</span>
                  <span className="chip">{v.location}</span>
                </div>
                <p className="mt-3 text-sm text-slate-400">
                  Founders: {v.founders.map(founderName).join(", ")}
                </p>
                {v.raising && (
                  <p className="mt-2 text-sm font-medium text-teal-deep">
                    Raising {usd(v.raising.amountUsd)} · {v.raising.round}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Investors */}
        <section>
          <h2 className="text-2xl font-bold text-ink">Active investors</h2>
          <div className="mt-4 space-y-4">
            {investors.map((inv) => (
              <article key={inv.id} className="card card-hover">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-ink">{inv.name}</h3>
                  <span className="chip">{inv.firm}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{inv.thesis}</p>
                <p className="mt-3 text-sm text-slate-300">
                  Checks {usd(inv.checkSizeUsd[0])}–{usd(inv.checkSizeUsd[1])} · {inv.stages.join(", ")}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {inv.focus.map((f) => (
                    <span key={f} className="chip">{f}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
