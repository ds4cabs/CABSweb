// Core domain types for the CABSweb platform.

export type MemberRole =
  | "scientist"
  | "founder"
  | "investor"
  | "executive"
  | "mentor"
  | "student"
  | "clinician"
  | "regulatory";

export interface Member {
  id: string;
  name: string;
  headline: string;
  role: MemberRole[];
  company: string;
  location: string;
  expertise: string[]; // therapeutic areas, modalities, functions
  bio: string;
  openToMentoring: boolean;
  seekingMentor: boolean;
  avatarInitials: string;
  links?: { label: string; url: string }[];
  // Precomputed semantic similarity score, populated by search/recommendation calls.
  matchScore?: number;
}

export interface KnowledgeAsset {
  id: string;
  title: string;
  kind: "recording" | "transcript" | "summary" | "newsletter" | "podcast" | "report";
  source: string; // e.g. "BioPacific 2026", "AI in Biomedicine Seminar"
  date: string; // ISO
  durationMin?: number;
  summary: string;
  topics: string[];
  // Generated artifacts derived from a source recording.
  derivedFrom?: string;
}

export interface Venture {
  id: string;
  company: string;
  stage: "idea" | "pre-seed" | "seed" | "series-a" | "series-b+";
  oneLiner: string;
  therapeuticArea: string;
  modality: string;
  founders: string[]; // member ids
  raising?: { amountUsd: number; round: string };
  location: string;
}

export interface Investor {
  id: string;
  name: string;
  firm: string;
  checkSizeUsd: [number, number];
  stages: Venture["stage"][];
  thesis: string;
  focus: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  org: string;
  type: "full-time" | "contract" | "advisory" | "internship" | "board";
  location: string;
  remote: boolean;
  postedAt: string; // ISO
  tags: string[];
  description: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO
  format: "in-person" | "virtual" | "hybrid";
  venue: string;
  platform?: "zoom" | "eventbrite";
  registrationUrl?: string;
  description: string;
  capacity?: number;
  registered?: number;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "platinum" | "gold" | "silver" | "community";
  industry: string;
  since: number;
  partnership: string;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface SearchResult {
  id: string;
  kind: "member" | "knowledge" | "venture" | "opportunity" | "event";
  title: string;
  snippet: string;
  score: number;
  href: string;
}
