<div align="center">

# CABSweb

### The AI-native talent, knowledge, and innovation ecosystem for CABS

**CABS — Chinese American Biopharmaceutical Society** · San Francisco Bay Area · 3,500+ members

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[cabsweb.org](https://www.cabsweb.org/) · [DS4CABS](https://ds4cabs.github.io/) · Built by **ds4cabs**

</div>

---

CABSweb transforms CABS from a traditional event- and membership-focused website into a
comprehensive **talent, knowledge, and innovation ecosystem** for the global life sciences
community. Members discover mentors, experts, founders, investors, careers, educational
resources, and strategic collaborations through an AI-powered, personalized experience.

The site is built in **two layers**:

1. **Public site** — a fast, welcoming marketing presence that mirrors cabsweb.org (Home, News & Events, Members, Sponsors, Donate, About).
2. **Member app** — eight AI-powered modules that turn CABS's people and content into a living, searchable ecosystem.

## 🌐 Public site

| Page | Route | Purpose |
| --- | --- | --- |
| 🏠 **Home** | [`/`](src/app/page.tsx) | Landing page with the CABS story and module entry points. |
| 📰 **News & Events** | [`/knowledge-hub`](src/app/knowledge-hub/page.tsx) | Conferences, talks, and the content pipeline. |
| 👥 **Members** | [`/talent-graph`](src/app/talent-graph/page.tsx) | The searchable community of members and leaders. |
| 🤝 **Sponsors** | [`/sponsorship`](src/app/sponsorship/page.tsx) | Sponsorship tiers and partnership management. |
| 💝 **Donate** | [`/donate`](src/app/donate/page.tsx) | Support CABS as a non-profit — scholarships, programs, conferences. |
| ℹ️ **About Us** | [`/about`](src/app/about/page.tsx) | Mission, community stats, and what CABS stands for. |

## ✨ Modules

| Module | What it does |
| --- | --- |
| 🎛️ **Dashboard** | Personalized member home — AI-surfaced people, knowledge, events, and opportunities. |
| 🕸️ **Talent Graph** | Searchable graph of members and industry leaders by name, company, and expertise. |
| 🤖 **AI Assistant** | Retrieval-augmented assistant grounded in CABS content and institutional knowledge, with citations. |
| 📚 **Knowledge Hub** | Auto-converts conference recordings into searchable summaries, transcripts, newsletters, podcasts, and reports. |
| 🚀 **Founder & Investor Network** | Startup formation and fundraising — matches ventures to investors by stage, thesis, and focus. |
| 🧭 **Mentorship Matching** | AI-ranked mentor↔mentee matches with a transparent scoring rationale. |
| 💼 **Careers** | Roles, advisory seats, and internships matched to expertise and career stage. |
| 🤝 **Sponsorship & Partnerships** | End-to-end sponsor lifecycle management, synced with HubSpot CRM. |

## 🧱 Tech stack

- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript + Tailwind CSS
- **Typography:** [Inter](https://rsms.me/inter/) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via `next/font` (self-hosted, zero layout shift)
- **Backend / DB:** [Supabase](https://supabase.com/) (Postgres, storage, RLS, realtime)
- **Auth / identity:** [Clerk](https://clerk.com/) (default) or [Auth0](https://auth0.com/)
- **AI:** [OpenAI](https://platform.openai.com/) — embeddings, semantic search, recommendations, generation, assistant
- **Vector search:** pgvector (default) / Pinecone / Qdrant
- **CRM:** [HubSpot](https://www.hubspot.com/)
- **Payments:** [Stripe](https://stripe.com/) (membership + ticketing)
- **Events:** [Zoom](https://zoom.us/) + [Eventbrite](https://www.eventbrite.com/) (recordings feed the Knowledge Hub)

> **Runs with zero secrets.** Every integration is a swappable adapter that degrades gracefully to
> seeded demo data and deterministic AI fallbacks. Add real keys in `.env.local` to light each one
> up — the corresponding badge on the homepage flips from `mock` to `connected`.

## 🚀 Getting started

```bash
git clone https://github.com/ds4cabs/CABSweb.git
cd CABSweb
npm install
cp .env.example .env.local   # optional — fill in keys to enable live integrations
npm run dev                  # http://localhost:3000
```

Useful scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # next lint
npm run typecheck   # tsc --noEmit
```

## 📁 Project structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # root layout, fonts, header/footer
│   ├── page.tsx              # landing page
│   ├── about/                # mission + community stats
│   ├── donate/               # non-profit giving
│   ├── dashboard/            # personalized member home
│   ├── talent-graph/         # searchable member/leader graph (client)
│   ├── assistant/            # AI assistant chat (client)
│   ├── knowledge-hub/        # content pipeline + assets + events
│   ├── network/              # founder & investor network
│   ├── mentorship/           # AI mentor matching
│   ├── careers/              # opportunities + development
│   ├── sponsorship/          # partnership management
│   └── api/{search,assistant}/route.ts
├── components/               # SiteHeader, SiteFooter, Brand, PageHeader
├── lib/
│   ├── ai/                   # search, assistant, recommend (OpenAI + fallbacks)
│   ├── integrations/         # external service registry / adapters
│   ├── data/seed.ts          # seeded demo data modeled on CABS
│   ├── env.ts                # env access + capability flags
│   └── nav.ts                # navigation / module registry
└── types/                    # domain types
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full data flow and how to wire each
integration into production.

## 🗺️ Roadmap

- [ ] Wire Supabase schema + row-level security and replace seed data
- [ ] Clerk/Auth0 session gating on member-only modules
- [ ] Live OpenAI embeddings + pgvector semantic search
- [ ] Zoom/Eventbrite ingestion → automated transcript/summary/podcast pipeline
- [ ] Stripe membership tiers + event ticketing
- [ ] HubSpot bidirectional CRM sync for members and sponsors

## 🤝 Contributing

This project is developed and maintained by **ds4cabs**, the data-science and AI initiative of CABS.
Contributions from the community are welcome — open an issue or PR.

## 📄 License

MIT © Chinese American Biopharmaceutical Society (CABS). See [LICENSE](LICENSE).
