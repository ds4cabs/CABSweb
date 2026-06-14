// Single source of truth for primary navigation / feature modules.

export interface NavItem {
  href: string;
  label: string;
  blurb: string;
  icon: string; // emoji glyph, kept dependency-free
}

export const features: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", blurb: "Your personalized member home.", icon: "🎛️" },
  { href: "/talent-graph", label: "Talent Graph", blurb: "Searchable graph of members & industry leaders.", icon: "🕸️" },
  { href: "/assistant", label: "AI Assistant", blurb: "Ask anything about CABS knowledge.", icon: "🤖" },
  { href: "/knowledge-hub", label: "Knowledge Hub", blurb: "Talks → summaries, transcripts, podcasts.", icon: "📚" },
  { href: "/network", label: "Founder & Investor", blurb: "Startup formation & fundraising network.", icon: "🚀" },
  { href: "/mentorship", label: "Mentorship", blurb: "AI-matched mentor relationships.", icon: "🧭" },
  { href: "/careers", label: "Careers", blurb: "Opportunities & career development.", icon: "💼" },
  { href: "/sponsorship", label: "Partnerships", blurb: "Sponsorship & partnership management.", icon: "🤝" },
];
