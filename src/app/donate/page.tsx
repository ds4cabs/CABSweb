import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Donate" };

const ways = [
  { title: "Support members", blurb: "Fund scholarships, travel grants, and early-career programming." },
  { title: "Advance science", blurb: "Back the BioPacific Conference and our knowledge programs." },
  { title: "Grow the community", blurb: "Help us expand mentorship and networking across the Bay Area and beyond." },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Support the CABS community"
        intro="CABS is a non-profit organization. Your contribution helps us deliver programs, conferences, and mentorship for the life sciences community."
      />

      <div className="container-cabs py-10">
        <section className="grid gap-4 sm:grid-cols-3">
          {ways.map((w) => (
            <div key={w.title} className="card">
              <h3 className="font-semibold text-ink">{w.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{w.blurb}</p>
            </div>
          ))}
        </section>

        <section className="card mt-10 text-center">
          <h2 className="text-xl font-bold text-ink">Make a donation</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Every gift directly supports our mission. Contact the CABS team to set up a
            one-time or recurring contribution.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/dashboard" className="btn-primary">Donate Now</Link>
            <Link href="/sponsorship" className="btn-teal">Become a Sponsor</Link>
          </div>
        </section>
      </div>
    </>
  );
}
