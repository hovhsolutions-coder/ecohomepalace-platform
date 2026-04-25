import type { Metadata } from "next";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import { formatCityLabel, formatServiceLabel } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Thanks | Eco Home Palace",
  description:
    "Your project request is being prepared for matching with suitable local professionals.",
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; city?: string }>;
}) {
  const params = await searchParams;
  const service = formatServiceLabel(params.service);
  const city = formatCityLabel(params.city);
  const hasContext = Boolean(service && city);

  return (
    <main className="premium-shell min-h-screen text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="glass-panel px-8 py-10 text-center md:px-12 md:py-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-3xl text-[var(--emerald-300)]">
              ✓
            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.22em] text-[var(--gold-300)]/72">
              Matching started
            </p>
            <h1 className="mt-4 text-3xl font-semibold md:text-5xl">
              Your request has been received
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/72">
              {hasContext
                ? `We started matching for ${service} in ${city}.`
                : "We started preparing your request for suitable local professionals."}
            </p>
            <p className="mt-3 text-sm text-[var(--emerald-300)]">
              Your request is free and without obligation.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                "Request received",
                "Professional review",
                "Contact within 24 hours",
              ].map((item, index) => (
                <div key={item} className="premium-card text-left">
                  <p className="text-sm font-semibold text-[var(--gold-300)]">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-base leading-7 text-white/82">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/intake"
                className="gold-button inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
              >
                Submit another project
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-[var(--gold-border)] px-8 py-4 text-base font-semibold text-white/86 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--gold-300)] hover:bg-white/5"
              >
                Back to Home
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/60">
              <Link href="/services" className="transition hover:text-white">
                Explore Services
              </Link>
              <span>/</span>
              <Link href="/cities" className="transition hover:text-white">
                Explore Cities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
