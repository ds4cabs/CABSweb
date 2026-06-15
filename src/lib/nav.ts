// Single source of truth for primary navigation / feature modules.

export interface NavItem {
  href: string;
  label: string;
  blurb: string;
  icon: string; // emoji glyph, kept dependency-free
}

// Public top-nav, mirrors cabsweb.org.
export interface MainNavItem {
  href: string;
  label: string;
}

export const mainNav: MainNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/knowledge-hub", label: "News & Events" },
  { href: "/talent-graph", label: "Members" },
  { href: "/sponsorship", label: "Sponsors" },
  { href: "/donate", label: "Donate" },
  { href: "/about", label: "About Us" },
];

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
