import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "About Us" };

const stats = [
  { value: "3,500+", label: "members" },
  { value: "~70%", label: "hold PhDs" },
  { value: "600+", label: "BioPacific attendees" },
  { value: "SF", label: "Bay Area based" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Chinese-American Bio/Pharmaceutical Society"
        intro="CABS is a non-profit organization for life sciences, trusted by our professional members. We connect scientists, founders, investors, and industry leaders across the global life sciences community."
      />

      <div className="container-cabs py-10">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card text-center">
              <dt className="text-2xl font-extrabold text-teal">{s.value}</dt>
              <dd className="mt-1 text-sm text-slate-600">{s.label}</dd>
            </div>
          ))}
        </dl>

        <section className="card mt-10">
          <h2 className="text-xl font-bold text-ink">Our mission</h2>
          <p className="mt-3 text-slate-600">
            CABS fosters professional growth, scientific exchange, and entrepreneurship
            within the Chinese-American biopharmaceutical community. Through conferences,
            mentorship, and partnerships, we accelerate therapeutics and build bridges
            across the global life sciences ecosystem.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard" className="btn-primary">Join CABS Today!</Link>
            <Link href="/knowledge-hub" className="btn-teal">2026 BioPacific Conference</Link>
          </div>
        </section>
      </div>
    </>
  );
}
