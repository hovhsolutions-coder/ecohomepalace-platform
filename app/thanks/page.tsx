import type { Metadata } from "next";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import TrustSection from "@/components/TrustSection";
import { publicTrustPoints } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Thanks | Eco Home Palace",
  description:
    "Your project request has been received. We are checking suitable professionals and starting the matching process.",
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; city?: string }>;
}) {
  const params = await searchParams;
  const service = params.service;
  const city = params.city;
  const hasRequestContext = Boolean(service && city);

  return (
    <main className="min-h-screen bg-black text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <svg
                className="h-10 w-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-semibold">
            Your request has been received
          </h1>
          {hasRequestContext ? (
            <p className="mb-2 text-lg text-gray-400">
              We started matching for {service} in {city}
            </p>
          ) : (
            <p className="mb-2 text-lg text-gray-400">
              We are checking suitable professionals for your project
            </p>
          )}
          <p className="mb-8 text-sm text-green-400">
            You will receive a response within 24 hours
          </p>

          <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-green-400">
              Matching started
            </p>
            <p className="mt-2 text-white/75">
              Your request is now in the first stage of professional matching.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <p className="mb-4 text-sm text-gray-400">What happens next?</p>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-800 text-xs font-medium">
                  1
                </span>
                <span className="text-gray-300">Request received</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-800 text-xs font-medium">
                  2
                </span>
                <span className="text-gray-300">Professional review</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-800 text-xs font-medium">
                  3
                </span>
                <span className="text-gray-300">Contact within 24 hours</span>
              </li>
            </ul>
          </div>

          <p className="mt-6 text-sm text-white/60">
            Your request is free and without obligation.
          </p>

          <TrustSection
            title="Trust Signals"
            intro="Your request is already moving through the public matching flow."
            points={publicTrustPoints}
          />

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              What you can do now
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Submit another project
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
              <Link
                href="/cities"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Cities
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/intake"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Submit another project
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
