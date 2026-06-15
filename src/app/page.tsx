import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Intro + primary calls to action */}
      <section className="container-cabs pt-12 pb-8 text-center sm:pt-16">
        <p className="mx-auto max-w-3xl text-lg font-medium text-ink sm:text-xl">
          CABS is a non-profit organization for life sciences trusted by our
          professional members. Join the community!
        </p>

        <div className="mt-10 flex flex-col items-center gap-5">
          <Link
            href="/dashboard"
            className="btn-primary w-full max-w-md py-4 text-base"
          >
            Join CABS Today!
          </Link>
          <Link
            href="/knowledge-hub"
            className="btn-teal w-full max-w-xl py-4 text-base"
          >
            Register for 2026 BioPacific Conference
          </Link>
          <Link
            href="/sponsorship"
            className="btn-teal w-full max-w-md py-4 text-base"
          >
            Become a Sponsor
          </Link>
        </div>
      </section>

      {/* Save the Date — 2026 BioPacific Conference banner */}
      <section className="container-cabs pb-16">
        <div className="relative overflow-hidden rounded-lg">
          {/* Golden-Gate-at-dusk wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a4654] via-[#3a5663] to-[#1f3a44]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          <div className="relative px-6 py-16 text-center sm:px-12 sm:py-24">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 font-mono text-xs uppercase tracking-[0.3em] text-teal-soft">
              CABS · BioPacific Conference 2026
            </span>

            <h2 className="mt-8 text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
              Save the Date
            </h2>
            <p className="mt-4 text-2xl font-extrabold uppercase tracking-wide text-orange sm:text-4xl">
              2026 BioPacific Conference
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-xl font-light leading-snug text-slate-100 sm:text-3xl">
              Accelerating Therapeutics:
              <br />
              Innovation, Integration, and Impact
            </p>

            <div className="mx-auto mt-8 h-px w-40 bg-orange/70" />

            <p className="mt-8 text-3xl font-extrabold tracking-wide text-white sm:text-5xl">
              SEPT 19, 2026
            </p>

            <div className="mt-10">
              <Link href="/knowledge-hub" className="btn-primary py-3">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
