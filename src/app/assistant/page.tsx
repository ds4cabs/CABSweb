"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import type { ChatMessage } from "@/types";

interface Source { title: string; href: string }
interface Turn extends ChatMessage { sources?: Source[] }

const SUGGESTIONS = [
  "Who can mentor me on the academia-to-industry transition?",
  "What happened at the BioPacific 2026 keynote?",
  "Find investors for a seed-stage gene editing startup.",
  "Summarize recent CABS knowledge on AI in drug discovery.",
];

export default function AssistantPage() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(question: string) {
    const q = question.trim();
    if (!q || loading) return;
    setInput("");
    const history = turns.map(({ role, content }) => ({ role, content }));
    setTurns((t) => [...t, { role: "user", content: q }]);
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history }),
      });
      const data = await res.json();
      setTurns((t) => [...t, { role: "assistant", content: data.message, sources: data.sources }]);
    } catch {
      setTurns((t) => [...t, { role: "assistant", content: "Sorry — something went wrong reaching the assistant." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="🤖 AI Assistant"
        title="Ask anything about CABS"
        intro="A retrieval-augmented assistant grounded in CABS content and institutional knowledge. It cites its sources and never invents facts outside the knowledge base."
      />

      <div className="container-cabs grid gap-6 py-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card min-h-[26rem] flex flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto">
              {turns.length === 0 && (
                <div className="grid h-full place-items-center text-center text-slate-500">
                  <div>
                    <p className="text-4xl">🤖</p>
                    <p className="mt-2 text-sm">Ask a question to get started.</p>
                  </div>
                </div>
              )}
              {turns.map((t, i) => (
                <div key={i} className={t.role === "user" ? "text-right" : ""}>
                  <div
                    className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${
                      t.role === "user"
                        ? "bg-brand-gradient text-white"
                        : "border border-line bg-surface-2 text-slate-200"
                    }`}
                  >
                    {t.content}
                    {t.sources && t.sources.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 border-t border-line/60 pt-2">
                        {t.sources.map((s, j) => (
                          <a key={j} href={s.href} className="chip hover:border-emerald/50 hover:text-emerald-soft">
                            {s.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && <p className="text-sm text-slate-500">Thinking…</p>}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="mt-4 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the CABS Assistant…"
                className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo"
              />
              <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
                Send
              </button>
            </form>
          </div>
        </div>

        <aside className="space-y-3">
          <p className="label">Try asking</p>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="card card-hover w-full text-left text-sm text-slate-300"
            >
              {s}
            </button>
          ))}
        </aside>
      </div>
    </>
  );
}
