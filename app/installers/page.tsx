import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Installers | Eco Home Palace",
  description: "Join the curated installer network. Receive better home improvement requests from homeowners who have completed a guided diagnosis.",
};

export default function InstallersPage() {
  return (
    <main className="min-h-screen bg-[#020a05] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020a05] via-[#0a1f12] to-[#020a05]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--emerald-300)]">
            For verified installers
          </p>
          <h1 className="mt-6 text-4xl font-medium leading-[1.15] text-white sm:text-5xl md:text-6xl">
            Receive better home improvement requests{" "}
            <span className="text-[var(--gold-300)]">— not random leads</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-white/60">
            Eco Home Palace connects verified installers with homeowners who have already completed a guided home diagnosis. Every request is structured, relevant, and high-intent.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/installers/apply"
              className="gold-button inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
            >
              Apply as installer
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-4 text-sm font-medium text-white/70 transition hover:border-white/20 hover:text-white"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/40">
              The problem
            </p>
            <h2 className="mt-4 text-3xl font-medium text-white">
              Most lead platforms send you noise, not signal
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Low-quality leads from price shoppers",
              "Irrelevant projects outside your expertise",
              "Too many competitors per single lead",
              "Wasted time on unqualified requests",
              "No insight into homeowner intent",
              "Random forwarding without matching",
            ].map((problem, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-white/30" />
                  <p className="text-sm text-white/60">{problem}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-transparent via-[#0a1f12]/30 to-transparent">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--emerald-300)]">
              Our approach
            </p>
            <h2 className="mt-4 text-3xl font-medium text-white">
              Curated requests, matched by relevance
            </h2>
            <p className="mt-4 text-white/60">
              Eco Home Palace sends you requests based on what actually matters
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Project type",
                description: "Matched to your specific services and expertise",
              },
              {
                title: "Region",
                description: "Within your service radius and preferred areas",
              },
              {
                title: "Homeowner intent",
                description: "Captured through guided diagnosis before contact",
              },
              {
                title: "Installer expertise",
                description: "Aligned with your capabilities and capacity",
              },
              {
                title: "Availability",
                description: "Respects your current project load",
              },
              {
                title: "Quality fit",
                description: "Verified installers receive priority matching",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-[var(--emerald-border)]/30 bg-[rgba(94,231,187,0.04)] p-6"
              >
                <h3 className="text-sm font-medium text-[var(--emerald-300)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Better Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/40">
              Why different
            </p>
            <h2 className="mt-4 text-3xl font-medium text-white">
              Quality over volume, relevance over reach
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "Higher homeowner intent",
                description: "Homeowners complete a guided diagnosis before requesting installers",
              },
              {
                label: "Structured requests",
                description: "Every request includes project type, timeline, and property context",
              },
              {
                label: "Fewer competitors per lead",
                description: "Maximum 2 installers per homeowner request, not dozens",
              },
              {
                label: "No random forwarding",
                description: "Requests are matched by service, region, and fit before delivery",
              },
              {
                label: "Verified installer network",
                description: "Every installer is reviewed before accessing homeowner requests",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--gold-border)]/40 bg-[rgba(247,209,123,0.08)]">
                  <span className="text-sm font-medium text-[var(--gold-300)]">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{item.label}</h3>
                  <p className="mt-1 text-sm text-white/50">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-24 bg-gradient-to-b from-transparent via-[#0a1f12]/30 to-transparent">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--emerald-300)]">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-medium text-white">
              From application to better projects
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Apply as installer",
                description: "Complete a guided application to join our verified network",
              },
              {
                step: "2",
                title: "Get reviewed",
                description: "Our team reviews your services, region, and quality standards",
              },
              {
                step: "3",
                title: "Receive suitable requests",
                description: "Get matched with homeowner requests that fit your expertise",
              },
              {
                step: "4",
                title: "Choose your projects",
                description: "Review requests and accept only the projects you want",
              },
              {
                step: "5",
                title: "Win better customers",
                description: "Connect with homeowners who have clear project intent",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)]">
                  <span className="text-lg font-medium text-[var(--emerald-300)]">
                    {item.step}
                  </span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/50">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/40">
              Pricing
            </p>
            <h2 className="mt-4 text-3xl font-medium text-white">
              Flexible options for your business
            </h2>
            <p className="mt-4 text-sm text-white/50">
              Choose the model that fits your growth goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                description: "For installers starting with the platform",
                features: [
                  "Access to suitable leads",
                  "Basic matching priority",
                  "Lead-by-lead purchasing",
                  "Email support",
                ],
                price: "Pay per lead",
              },
              {
                name: "Growth",
                description: "For installers ready to scale",
                features: [
                  "Priority matching",
                  "Discounted lead pricing",
                  "Lead volume guarantees",
                  "Dashboard access",
                  "Priority support",
                ],
                price: "Monthly membership",
                highlighted: true,
              },
              {
                name: "Premium Partner",
                description: "For established installers",
                features: [
                  "Highest matching priority",
                  "Exclusive lead access",
                  "Best lead pricing",
                  "Advanced analytics",
                  "Dedicated account manager",
                  "Profile visibility boost",
                ],
                price: "Custom pricing",
              },
            ].map((tier, index) => (
              <div
                key={index}
                className={`rounded-xl border p-6 ${
                  tier.highlighted
                    ? "border-[var(--gold-border)] bg-[rgba(247,209,123,0.04)]"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
              >
                <h3 className="text-lg font-medium text-white">{tier.name}</h3>
                <p className="mt-2 text-sm text-white/50">{tier.description}</p>
                <div className="mt-4">
                  <p className="text-2xl font-medium text-[var(--gold-300)]">
                    {tier.price}
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm text-white/60">
                      <div className="mt-1.5 h-1 w-1 rounded-full bg-[var(--emerald-300)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-transparent via-[#0a1f12]/30 to-transparent">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium text-white">
            Join a curated installer network
          </h2>
          <p className="mt-4 text-white/60">
            Apply to receive better home improvement requests from homeowners who have clear project intent.
          </p>
          <Link
            href="/installers/apply"
            className="gold-button mt-8 inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
          >
            Apply to join the network
          </Link>
        </div>
      </section>
    </main>
  );
}
