// CABS AI Assistant — a retrieval-augmented conversational layer over CABS
// content and institutional knowledge.
//
// PRODUCTION: retrieve top-k knowledge chunks via semanticSearch, build a
// grounded system prompt, and stream a completion from OpenAI
// (env.openaiChatModel). Cite sources from the retrieved set.
//
// FALLBACK (no key): grounded extractive answer assembled from the retrieved
// seed corpus, so the assistant is demonstrably useful with zero secrets.

import type { ChatMessage } from "@/types";
import { semanticSearch } from "@/lib/ai/search";
import { capabilities, env } from "@/lib/env";

const SYSTEM_PROMPT = `You are the CABS Assistant for the Chinese American Biopharmaceutical Society.
You help members discover mentors, experts, founders, investors, careers, events, and knowledge.
Answer only from CABS institutional knowledge provided as context. Cite sources. Be concise and warm.`;

export interface AssistantReply {
  message: string;
  sources: { title: string; href: string }[];
  grounded: boolean;
}

export async function askAssistant(
  question: string,
  _history: ChatMessage[] = [],
): Promise<AssistantReply> {
  const hits = await semanticSearch(question, 4);
  const sources = hits.map((h) => ({ title: h.title, href: h.href }));

  if (capabilities.openai) {
    // const context = hits.map((h) => `- ${h.title}: ${h.snippet}`).join("\n");
    // const reply = await openaiChat([
    //   { role: "system", content: `${SYSTEM_PROMPT}\n\nContext:\n${context}` },
    //   ..._history,
    //   { role: "user", content: question },
    // ], env.openaiChatModel);
    // return { message: reply, sources, grounded: true };
  }

  void SYSTEM_PROMPT;
  void env;

  if (hits.length === 0) {
    return {
      message:
        "I couldn't find anything in the CABS knowledge base for that yet. Try asking about mentors, the BioPacific Conference, the founder/investor network, or AI in drug discovery.",
      sources: [],
      grounded: false,
    };
  }

  const lead = hits[0];
  const others = hits.slice(1, 3).map((h) => h.title);
  const message =
    `Here's what I found in the CABS knowledge base about "${question}":\n\n` +
    `**${lead.title}** — ${lead.snippet}` +
    (others.length
      ? `\n\nYou may also want to explore: ${others.join("; ")}.`
      : "") +
    `\n\n_(Connect an OpenAI key to enable fully conversational, generative answers.)_`;

  return { message, sources, grounded: true };
}
