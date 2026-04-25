import type { Metadata } from "next";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import { formatCityLabel, formatServiceLabel } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Thanks | Eco Home Palace",
  description:
    "Your project request has been received and is now being prepared for matching with suitable professionals.",
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
    <main className="premium-shell min-h-screen text-[var(--foreground)]">
      <PublicHeader />

      <section className="section-padding px-6">
        <div className="mx-auto max-w-3xl">
          <div className="glass-panel rounded-[1.85rem] px-8 py-10 text-center md:px-12 md:py-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(47,138,103,0.12)] text-3xl text-[var(--primary-700)]">
              ✓
            </div>

            <p className="section-kicker mt-6">Matching started</p>
            <h1 className="mt-4 text-3xl font-semibold md:text-5xl">
              Your request is moving forward
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--foreground-soft)]">
              {hasContext
                ? `We started matching for ${service} in ${city}.`
                : "We started preparing your request for trusted local professionals."}
            </p>
            <p className="mt-3 text-sm text-[var(--primary-600)]">
              Your request is free and without obligation.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                "Request received",
                "Professional review",
                "Contact within 24 hours",
              ].map((item, index) => (
                <div key={item} className="premium-card text-left">
                  <p className="text-sm font-semibold text-[var(--primary-600)]">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-base leading-7 text-[var(--foreground)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/intake"
                className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
              >
                Get 3 free quotes
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(20,35,25,0.1)] bg-white/75 px-8 py-4 text-base font-semibold text-[var(--foreground-soft)] transition duration-200 hover:border-[rgba(31,93,69,0.18)] hover:text-[var(--foreground)]"
              >
                Back to homepage
              </Link>
            </div>

            <div className="mt-8">
              <p className="section-kicker">What you can do now</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
                <Link href="/intake" className="soft-pill rounded-full px-4 py-2 font-medium">
                  Submit another project
                </Link>
                <Link href="/services" className="soft-pill rounded-full px-4 py-2 font-medium">
                  Explore services
                </Link>
                <Link href="/cities" className="soft-pill rounded-full px-4 py-2 font-medium">
                  Explore cities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
