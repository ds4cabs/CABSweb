import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { knowledge, events } from "@/lib/data/seed";

export const metadata: Metadata = { title: "Knowledge Hub" };

const KIND_ICON: Record<string, string> = {
  recording: "🎥",
  transcript: "📝",
  summary: "🧠",
  newsletter: "📰",
  podcast: "🎙️",
  report: "📊",
};

const PIPELINE = [
  { step: "Ingest", detail: "Zoom & Eventbrite recordings land automatically after each event." },
  { step: "Transcribe", detail: "Speech-to-text produces a searchable, speaker-labeled transcript." },
  { step: "Summarize", detail: "OpenAI distills key themes, takeaways, and action items." },
  { step: "Repurpose", detail: "Auto-generate newsletters, podcasts, and reports from one source." },
  { step: "Index", detail: "Embeddings are written to the vector DB for semantic retrieval." },
];

export default function KnowledgeHubPage() {
  return (
    <>
      <PageHeader
        eyebrow="📚 Knowledge Hub"
        title="Every talk becomes living knowledge"
        intro="Conference recordings and events are automatically converted into searchable summaries, transcripts, newsletters, podcasts, and reports — then embedded for semantic search across the entire CABS knowledge base."
      />

      <div className="container-cabs py-10">
        {/* Pipeline */}
        <section className="card">
          <h2 className="font-semibold text-white">The automated content pipeline</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-5">
            {PIPELINE.map((p, i) => (
              <li key={p.step} className="relative">
                <div className="font-mono text-xs text-emerald-soft">0{i + 1}</div>
                <p className="mt-1 font-semibold text-white">{p.step}</p>
                <p className="mt-1 text-xs text-slate-400">{p.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Knowledge assets */}
        <h2 className="mt-12 text-2xl font-bold text-white">Knowledge assets</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {knowledge.map((k) => (
            <article key={k.id} className="card card-hover">
              <div className="flex items-center justify-between">
                <span className="chip">{KIND_ICON[k.kind]} {k.kind}</span>
                <span className="text-xs text-slate-500">{k.date}</span>
              </div>
              <h3 className="mt-3 font-semibold text-white">{k.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{k.source}{k.durationMin ? ` · ${k.durationMin} min` : ""}</p>
              <p className="mt-2 text-sm text-slate-400">{k.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {k.topics.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              {k.derivedFrom && (
                <p className="mt-3 font-mono text-xs text-slate-600">↳ from {k.derivedFrom}</p>
              )}
            </article>
          ))}
        </div>

        {/* Events feed */}
        <h2 className="mt-12 text-2xl font-bold text-white">Upcoming events</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {events.map((e) => (
            <article key={e.id} className="card">
              <span className="chip">{e.format}</span>
              <h3 className="mt-3 font-semibold text-white">{e.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{e.date} · {e.venue}</p>
              <p className="mt-2 text-sm text-slate-400">{e.description}</p>
              {typeof e.registered === "number" && e.capacity && (
                <div className="mt-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full bg-brand-gradient" style={{ width: `${(e.registered / e.capacity) * 100}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{e.registered}/{e.capacity} registered</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
