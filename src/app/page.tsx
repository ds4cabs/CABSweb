import Link from "next/link";
import { features } from "@/lib/nav";
import { integrations } from "@/lib/integrations";

const stats = [
  { value: "3,500+", label: "members" },
  { value: "~70%", label: "hold PhDs" },
  { value: "600+", label: "BioPacific attendees" },
  { value: "8", label: "AI-native modules" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-cabs py-20 sm:py-28">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
            CABS · Chinese American Biopharmaceutical Society · San Francisco
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
            The AI-native ecosystem for the <span className="grad-text">global life sciences</span> community.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-400">
            CABSweb transforms CABS from an events-and-membership site into a comprehensive
            talent, knowledge, and innovation platform. Discover mentors, experts, founders,
            investors, careers, and institutional knowledge through a personalized, AI-powered
            experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="btn-primary">Enter your dashboard</Link>
            <Link href="/assistant" className="btn-outline">Ask the AI Assistant</Link>
          </div>

          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface p-5">
                <dt className="text-2xl font-extrabold text-white">{s.value}</dt>
                <dd className="text-sm text-slate-400">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Feature grid */}
      <section className="container-cabs py-12">
        <h2 className="text-2xl font-bold text-white">One platform, eight intelligent modules</h2>
        <p className="mt-2 text-slate-400">Every module is AI-personalized and connected to a shared knowledge graph.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Link key={f.href} href={f.href as never} className="card card-hover group">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-3 font-semibold text-white group-hover:text-emerald-soft">{f.label}</h3>
              <p className="mt-1 text-sm text-slate-400">{f.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech / integrations */}
      <section className="container-cabs py-12">
        <h2 className="text-2xl font-bold text-white">Built on a modern, AI-first stack</h2>
        <p className="mt-2 text-slate-400">
          Each integration is a swappable adapter. The platform runs fully on seeded data until you
          connect live keys.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((i) => (
            <div key={i.key} className="card">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{i.name}</h3>
                <span className={`chip ${i.connected ? "border-emerald/50 text-emerald-soft" : ""}`}>
                  {i.connected ? "connected" : "mock"}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{i.purpose}</p>
              <p className="mt-3 font-mono text-xs text-slate-500">{i.sdk}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
