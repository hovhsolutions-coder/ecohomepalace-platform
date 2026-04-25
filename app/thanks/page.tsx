import type { Metadata } from "next";
import Link from "next/link";
import { IconCheck, IconStar } from "@/components/icons/MarketplaceIcons";
import { formatCityLabel, formatServiceLabel } from "@/lib/publicData";
import { ThanksTracking } from "@/components/ThanksTracking";

export const metadata: Metadata = {
  title: "Thanks | Eco Home Palace",
  description:
    "Your project request has been received and is now being prepared for matching with verified installers.",
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
    <main className="min-h-screen px-6 py-16 bg-[#0b2a22] text-white">
      {/* Subtle grid pattern matching homepage */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(33,196,93,0.12),transparent_50%)]"></div>
      
      <ThanksTracking />
      
      <div className="mx-auto max-w-3xl relative">
        <div className="rounded-2xl bg-[#0f172a] p-8 md:p-12 border border-[rgba(255,255,255,0.1)] shadow-2xl text-center">
          {/* Success icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(33,196,93,0.15)] border-4 border-[#21c45d] shadow-[0_0_0_4px_rgba(33,196,93,0.2),0_16px_40px_rgba(33,196,93,0.3)]">
            <IconCheck size={40} className="text-[#21c45d]" />
          </div>

          {/* Confirmation headline */}
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#21c45d] md:text-sm">
            REQUEST RECEIVED
          </p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.02] md:mt-4">
            Your request has been received
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-300 md:text-lg md:leading-8 md:mt-5">
            Your project is now being matched with 3 verified installers. You'll typically receive installer options within 24–48 hours.
          </p>

          {/* Priority feeling */}
          <div className="mt-6 rounded-xl border border-[rgba(33,196,93,0.2)] bg-[rgba(33,196,93,0.08)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#21c45d]">
              Your matching request
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm text-gray-300">
                {service || 'Service selected'}
              </div>
              <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm text-gray-300">
                {city || 'City selected'}
              </div>
              <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm text-gray-300">
                3 verified installers
              </div>
            </div>
          </div>

          {/* Trust reinforcement */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <IconStar size={14} className="text-[#fbbf24]" filled />
              <span>4.8/5 rating</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconCheck size={14} className="text-[#21c45d]" />
              <span>Verified installers</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-[#21c45d]">•</span>
              <span>Free comparison</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-[#21c45d]">•</span>
              <span>No obligation</span>
            </span>
          </div>

          {/* Marketplace context */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Active installers in your area • Fast response times
            </p>
          </div>

          {/* What happens next */}
          <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
              What happens next
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { number: "01", title: "Request received", description: "Your project details are being processed." },
                { number: "02", title: "3 installers reviewed", description: "We review verified installers shortly after your request." },
                { number: "03", title: "You receive options", description: "You receive 3 installer options within 24–48 hours." },
              ].map((step) => (
                <div key={step.number} className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-5 text-left">
                  <p className="text-xs font-semibold text-[#21c45d]">
                    {step.number}
                  </p>
                  <p className="mt-3 text-base font-semibold text-white">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What you can do now */}
          <div className="mt-12">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
              What you can do now
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[rgba(33,196,93,0.15)] flex items-center justify-center mt-0.5">
                  <IconCheck size={12} className="text-[#21c45d]" />
                </div>
                <p className="text-sm text-gray-300 leading-6">
                  Keep your phone available for installer contact
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[rgba(33,196,93,0.15)] flex items-center justify-center mt-0.5">
                  <IconCheck size={12} className="text-[#21c45d]" />
                </div>
                <p className="text-sm text-gray-300 leading-6">
                  Check your email for updates
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[rgba(33,196,93,0.15)] flex items-center justify-center mt-0.5">
                  <IconCheck size={12} className="text-[#21c45d]" />
                </div>
                <p className="text-sm text-gray-300 leading-6">
                  Prepare any details about your project
                </p>
              </div>
            </div>
          </div>

          {/* Optional soft engagement action */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400 mb-4">
              Want to explore more options while you wait?
            </p>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-6 py-3 text-sm font-medium text-gray-300 transition hover:border-[#21c45d] hover:text-white hover:bg-[rgba(33,196,93,0.1)]"
            >
              View other services
            </Link>
          </div>

          {/* Secondary action */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-8 py-4 text-base font-semibold text-gray-300 transition hover:border-[#21c45d] hover:text-white hover:bg-[rgba(33,196,93,0.1)]"
            >
              Back to homepage
            </Link>
          </div>

          {/* Reassurance loop */}
          <p className="mt-8 text-xs text-gray-500 text-center">
            You're all set — we'll take it from here.
          </p>
        </div>
      </div>
    </main>
  );
}
