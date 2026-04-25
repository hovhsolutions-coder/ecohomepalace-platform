import type { Metadata } from "next";
import Link from "next/link";
import MatchingBlock from "@/components/MatchingBlock";
import PopularSearches from "@/components/PopularSearches";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import {
  authorityStats,
  featuredTestimonial,
  globalMarkets,
  heroChecks,
  heroTrustBar,
  homeownerReviews,
  partnerMarks,
  popularProjectSearches,
  problemCards,
  qualityEngineModules,
  serviceProblemCards,
  solutionCards,
  whatYouGetCards,
} from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Eco Home Palace | Find Trusted Home Professionals",
  description:
    "Find trusted professionals for renovation, repair, solar, plumbing, electrical work and more.",
};

export default function Home() {
  return (
    <main className="premium-shell text-[var(--foreground)]">
      <PublicHeader />

      {/* SECTION 1 — HERO V3: RESULT-FOCUSED */}
      <section className="relative overflow-hidden px-6 pb-16 pt-10 md:pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(31,93,69,0.03)] via-transparent to-transparent"></div>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 text-[var(--foreground-soft)]">
                <span className="text-[var(--gold-300)]">⭐</span>
                <span>4.8/5 from 10,000+ homeowners</span>
              </span>
              <span className="inline-flex items-center gap-2 text-[var(--foreground-soft)]">
                <span className="text-[var(--primary-600)]">✔</span>
                <span>Verified professionals only</span>
              </span>
              <span className="inline-flex items-center gap-2 text-[var(--foreground-soft)]">
                <span className="text-[var(--primary-600)]">✔</span>
                <span>Active in 10+ countries</span>
              </span>
            </div>
            
            <h1 className="max-w-[600px] text-[clamp(2.8rem,6vw,4.2rem)] font-semibold leading-[1.02] text-[var(--foreground)]">
              Compare 3 verified installers in your area — in minutes
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--foreground-soft)]">
              No searching, no uncertainty. Just clear options you can trust for your home.
            </p>

            <div className="mt-8">
              <Link
                href="/intake"
                className="gold-button inline-flex min-h-16 items-center justify-center rounded-full px-10 py-4 text-lg font-semibold shadow-[0_16px_36px_rgba(31,93,69,0.24)] transition hover:shadow-[0_20px_44px_rgba(31,93,69,0.28)]"
              >
                Get 3 free quotes
              </Link>
              <p className="mt-4 text-sm text-[var(--foreground-muted)]">
                Free • No obligation • Takes less than 30 seconds
              </p>
            </div>
          </div>

          <div className="result-panel relative overflow-hidden rounded-[1.85rem] border border-[rgba(31,93,69,0.12)] bg-white shadow-[0_24px_56px_rgba(31,93,69,0.15)]">
            <div className="border-b border-[rgba(20,35,25,0.08)] px-6 py-4 bg-gradient-to-r from-[rgba(47,138,103,0.04)] to-transparent">
              <p className="text-sm font-semibold text-[var(--foreground)]">Your matches in Amsterdam</p>
              <p className="mt-1 text-xs text-[var(--foreground-soft)]">Matched within 24 hours</p>
            </div>
            
            <div className="divide-y divide-[rgba(20,35,25,0.06)]">
              <div className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[var(--foreground)]">SolarPro Netherlands</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[var(--foreground-soft)]">
                    <span className="text-[var(--gold-300)]">⭐ 4.9</span>
                    <span>•</span>
                    <span>€4,500 – €6,200</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-[var(--primary-600)] bg-[rgba(47,138,103,0.08)] px-3 py-1.5 rounded-full">Available this week</span>
              </div>
              
              <div className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[var(--foreground)]">Green Energy Solutions</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[var(--foreground-soft)]">
                    <span className="text-[var(--gold-300)]">⭐ 4.7</span>
                    <span>•</span>
                    <span>€5,100 – €6,800</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-[var(--primary-600)] bg-[rgba(47,138,103,0.08)] px-3 py-1.5 rounded-full">Available this week</span>
              </div>
              
              <div className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[var(--foreground)]">EcoInstall Amsterdam</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[var(--foreground-soft)]">
                    <span className="text-[var(--gold-300)]">⭐ 4.8</span>
                    <span>•</span>
                    <span>€4,800 – €6,500</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-[var(--primary-600)] bg-[rgba(47,138,103,0.08)] px-3 py-1.5 rounded-full">Available this week</span>
              </div>
            </div>

            <div className="border-t border-[rgba(20,35,25,0.08)] px-6 py-3 bg-[rgba(47,138,103,0.02)]">
              <p className="text-xs text-center text-[var(--foreground-soft)]">
                Based on your project type and location • All professionals verified
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INSTANT PROOF */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {authorityStats.map((item) => (
              <article key={item.label} className="premium-card border border-[rgba(31,93,69,0.12)] bg-gradient-to-br from-white to-[rgba(47,138,103,0.02)] px-6 py-8 text-center shadow-[0_8px_24px_rgba(31,93,69,0.06)]">
                <p className="text-5xl font-bold text-[var(--primary-700)]">{item.value}</p>
                <p className="mt-3 text-sm font-medium text-[var(--foreground-soft)]">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROBLEM */}
      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">The problem</p>
            <h2 className="section-title mt-4">Finding the right installer shouldn't be this hard</h2>
            <p className="section-copy mt-5">
              Home upgrades are expensive, technical, and hard to compare. Most homeowners don't know who to trust, what a fair price is, or which installer is actually available.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {problemCards.map((item, index) => (
              <article key={item.title} className="premium-card border-l-4 border-l-[rgba(220,38,38,0.3)] px-6 py-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(220,38,38,0.08)] text-[var(--danger-600)]">
                    <span className="text-lg">!</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — SOLUTION / POWER MOMENT */}
      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">The solution</p>
            <h2 className="section-title mt-4">Eco Home Palace fixes this</h2>
            <p className="section-copy mt-5">
              We turn a confusing search into a clear comparison between verified professionals near you.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {solutionCards.slice(0, 2).map((item) => (
                <article key={item.title} className="premium-card border-l-4 border-l-[rgba(47,138,103,0.4)] px-6 py-5 shadow-[0_8px_24px_rgba(47,138,103,0.08)]">
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="space-y-4">
              {solutionCards.slice(2).map((item) => (
                <article key={item.title} className="premium-card border-l-4 border-l-[rgba(47,138,103,0.4)] px-6 py-5 shadow-[0_8px_24px_rgba(47,138,103,0.08)]">
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — MATCHING EXPERIENCE */}
      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-8">
            <p className="section-kicker">Start your comparison</p>
            <h2 className="section-title mt-4">Tell us what you need — we'll prepare your match</h2>
            <p className="section-copy mt-5">
              Choose your project, country and city. We use this to guide you toward relevant professionals in your region.
            </p>
          </div>
          <MatchingBlock />
        </div>
      </section>

      {/* SECTION 6 — WHAT YOU GET */}
      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">What you get</p>
            <h2 className="section-title mt-4">What you get when you use Eco Home Palace</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whatYouGetCards.map((item) => (
              <article key={item.title} className="premium-card px-6 py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(47,138,103,0.12)] text-[var(--primary-700)]">
                  <span className="text-xl">✓</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — EXPERTISE / QUALITY ENGINE */}
      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Quality engine</p>
            <h2 className="section-title mt-4">How we ensure quality matches</h2>
            <p className="section-copy mt-5">
              We focus on relevance, reliability and homeowner clarity before showing professionals in your area.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {qualityEngineModules.map((item) => (
              <article key={item.title} className="glass-panel rounded-[1.4rem] border border-[rgba(31,93,69,0.12)] bg-gradient-to-br from-white to-[rgba(47,138,103,0.03)] px-6 py-5">
                <h3 className="text-base font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — SOCIAL PROOF WITH IMPACT */}
      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Social proof</p>
            <h2 className="section-title mt-4">Homeowners use Eco Home Palace to make better decisions</h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {homeownerReviews.map((item) => (
              <article key={item.name} className="premium-card px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(31,93,69,0.12)] text-sm font-semibold text-[var(--primary-700)]">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{item.name}</p>
                    <p className="text-sm text-[var(--foreground-muted)]">{item.city}</p>
                  </div>
                </div>
                <p className="mt-5 text-lg leading-8 text-[var(--foreground)]">"{item.quote}"</p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm tracking-[0.18em] text-[var(--gold-300)]">★★★★★</p>
                  {item.result && (
                    <p className="text-xs font-medium text-[var(--primary-600)]">{item.result}</p>
                  )}
                </div>
                {item.date && (
                  <p className="mt-2 text-xs text-[var(--foreground-muted)]">Verified homeowner · {item.date}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — SERVICES AS PROBLEMS TO SOLVE */}
      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Services</p>
            <h2 className="section-title mt-4">What do you want to improve in your home?</h2>
            <p className="section-copy mt-5">
              Choose the project that matters most and compare professionals who understand your type of upgrade.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {serviceProblemCards.map((item) => (
              <article key={item.title} className="premium-card group relative overflow-hidden px-6 py-6 transition hover:shadow-[0_12px_32px_rgba(31,93,69,0.12)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(47,138,103,0.03)] to-transparent opacity-0 transition group-hover:opacity-100"></div>
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-600)]">{item.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{item.description}</p>
                  <p className="mt-4 text-sm text-[var(--foreground-muted)] italic">{item.problem}</p>
                  <Link
                    href="/intake"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-700)] transition group-hover:gap-3"
                  >
                    {item.cta}
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — GLOBAL SCALE / LOCAL RELEVANCE */}
      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Global platform</p>
            <h2 className="section-title mt-4">Global platform. Local professionals.</h2>
            <p className="section-copy mt-5">
              Eco Home Palace is designed to work across markets while keeping every comparison relevant to the homeowner's region.
            </p>
          </div>

          <div className="mt-10">
            <div className="glass-panel rounded-[1.6rem] border border-[rgba(31,93,69,0.1)] bg-gradient-to-br from-white to-[rgba(47,138,103,0.02)] px-8 py-8 shadow-[0_12px_32px_rgba(31,93,69,0.08)]">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {globalMarkets.map((market) => (
                  <div key={market.name} className="flex items-center gap-3 rounded-[1rem] border border-[rgba(20,35,25,0.06)] bg-white/60 px-4 py-3 transition hover:border-[rgba(47,138,103,0.2)] hover:bg-white/80">
                    <span className="text-2xl">{market.flag}</span>
                    <span className="text-sm font-medium text-[var(--foreground)]">{market.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 — FINAL CTA / CLOSER */}
      <section className="premium-divider px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="glass-panel soft-glow relative overflow-hidden rounded-[2rem] border border-[rgba(199,141,47,0.2)] bg-gradient-to-br from-[rgba(199,141,47,0.08)] via-[rgba(47,138,103,0.06)] to-[rgba(31,93,69,0.08)] px-8 py-12 text-center md:px-16 md:py-16 shadow-[0_24px_56px_rgba(31,93,69,0.18)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(199,141,47,0.12),transparent_60%)]"></div>
            <div className="relative">
              <p className="section-kicker">Ready to start?</p>
              <h2 className="section-title mx-auto mt-4 text-center max-w-2xl">
                Ready to compare verified professionals for your home?
              </h2>
              <p className="mt-5 max-w-xl mx-auto text-base leading-8 text-[var(--foreground-soft)]">
                Start free, stay in control, and receive relevant options for your project.
              </p>
              <div className="mt-8">
                <Link
                  href="/intake"
                  className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-8 py-4 text-base font-semibold shadow-[0_16px_36px_rgba(31,93,69,0.24)]"
                >
                  Get 3 free quotes
                </Link>
              </div>
              <p className="mt-5 text-sm text-[var(--foreground-muted)]">
                Free • No obligation • Matched with verified professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mobile-sticky-cta md:hidden">
        <Link
          href="/intake"
          className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-6 py-4 text-sm font-semibold shadow-[0_18px_35px_rgba(31,93,69,0.22)]"
        >
          Get 3 free quotes
        </Link>
      </div>

      <PublicFooter />
    </main>
  );
}
