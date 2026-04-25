import type { Metadata } from "next";
import Link from "next/link";
import MatchingBlock from "@/components/MatchingBlock";
import PopularSearches from "@/components/PopularSearches";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import ServiceCard from "@/components/ServiceCard";
import TrustBadges from "@/components/TrustBadges";
import {
  authorityStats,
  countryMarkets,
  featuredTestimonial,
  heroChecks,
  heroTrustBar,
  homeHowItWorks,
  homeownerReviews,
  homepageServiceHighlights,
  partnerMarks,
  popularProjectSearches,
  regionSpotlight,
  trustStats,
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

      <section className="relative overflow-hidden px-6 pb-10 pt-10 md:pt-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="section-kicker">Global sustainable home platform</p>
            <h1 className="mt-5 max-w-[600px] text-[clamp(2.8rem,6vw,4rem)] font-semibold leading-[1.02] text-[var(--foreground)]">
              Find the best sustainable home solutions in your area
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--foreground-soft)]">
              Compare certified installers for solar panels, heat pumps,
              insulation and more — fast, free and without obligation.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {heroTrustBar.map((item, index) => (
                <div
                  key={item}
                  className="soft-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                >
                  <span className="text-[var(--primary-600)]">
                    {index === 0 ? "★" : "✓"}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/intake"
                className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-7 py-4 text-base font-semibold"
              >
                Get 3 free quotes
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(20,35,25,0.1)] bg-white/75 px-7 py-4 text-base font-semibold text-[var(--foreground-soft)] transition duration-200 hover:border-[rgba(31,93,69,0.18)] hover:text-[var(--foreground)]"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-[var(--foreground-muted)]">
              {heroChecks.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.7)] px-3 py-1.5"
                >
                  <span className="text-[var(--primary-600)]">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="platform-preview relative overflow-hidden rounded-[1.75rem] min-h-[24rem] border border-[rgba(255,255,255,0.4)] p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(31,93,69,0.12)] via-[rgba(47,138,103,0.08)] to-[rgba(199,141,47,0.06)]"></div>
            <div className="absolute top-8 right-8 glass-panel rounded-[1.2rem] px-4 py-3 max-w-[180px]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-600)]">Service</p>
              <p className="mt-2 text-sm font-medium text-[var(--foreground)]">Solar panels</p>
              <p className="mt-1 text-xs text-[var(--foreground-soft)]">Clean energy</p>
            </div>
            <div className="absolute top-8 left-8 glass-panel rounded-[1.2rem] px-4 py-3 max-w-[180px]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-600)]">Region</p>
              <p className="mt-2 text-sm font-medium text-[var(--foreground)]">Netherlands</p>
              <p className="mt-1 text-xs text-[var(--foreground-soft)]">10+ cities active</p>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel rounded-[1.3rem] px-5 py-4 max-w-[220px]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-600)]">Matching</p>
              <p className="mt-2 text-sm font-medium text-[var(--foreground)]">Verified professionals</p>
              <p className="mt-1 text-xs text-[var(--foreground-soft)]">Response within 24 hours</p>
            </div>
            <div className="absolute top-1/2 right-8 -translate-y-1/2 glass-panel rounded-[1.2rem] px-4 py-3 max-w-[160px]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-600)]">Rating</p>
              <p className="mt-2 text-lg font-semibold text-[var(--primary-700)]">4.8/5</p>
              <p className="mt-1 text-xs text-[var(--foreground-soft)]">Homeowner rating</p>
            </div>
            <div className="absolute bottom-8 right-8 rounded-full bg-[rgba(47,138,103,0.12)] px-4 py-2">
              <p className="text-xs font-semibold text-[var(--primary-700)]">10,000+ matched</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl">
          <MatchingBlock />
        </div>
      </section>

      <section className="px-6 pb-6">
        <TrustBadges items={trustStats} />
      </section>

      <section id="how-it-works" className="section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">How it works</p>
            <h2 className="section-title mt-4">How Eco Home Palace works</h2>
            <p className="section-copy mt-5">
              We keep the process simple so homeowners can move from interest to
              comparison without friction.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {homeHowItWorks.map((item) => (
              <article key={item.step} className="premium-card">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(31,93,69,0.12)] text-base font-semibold text-[var(--primary-700)]">
                  {item.step}
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--foreground-soft)]">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--foreground-muted)]">
              Takes less than 1 minute — completely free
            </p>
            <Link
              href="/intake"
              className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-7 py-4 text-base font-semibold"
            >
              Get 3 free quotes
            </Link>
          </div>
        </div>
      </section>

      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Trust and authority</p>
            <h2 className="section-title mt-4">
              Trusted by homeowners worldwide
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {authorityStats.map((item) => (
              <article key={item.label} className="premium-card text-center">
                <p className="text-4xl font-semibold text-[var(--primary-700)]">
                  {item.value}
                </p>
                <p className="mt-3 text-sm text-[var(--foreground-soft)]">
                  {item.label}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {partnerMarks.map((item) => (
              <div
                key={item}
                className="soft-pill rounded-full px-4 py-2 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="glass-panel mt-10 max-w-4xl rounded-[1.75rem] px-8 py-8">
            <p className="text-xl leading-9 text-[var(--foreground)]">
              "{featuredTestimonial.quote}"
            </p>
            <p className="mt-4 text-sm font-medium text-[var(--foreground-soft)]">
              — {featuredTestimonial.name}, {featuredTestimonial.city}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {homeownerReviews.map((item) => (
              <article key={item.name} className="premium-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(31,93,69,0.12)] text-sm font-semibold text-[var(--primary-700)]">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">
                      {item.name}
                    </p>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      {item.city}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-lg leading-8 text-[var(--foreground)]">
                  "{item.quote}"
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm tracking-[0.18em] text-[var(--gold-300)]">
                    ★★★★★
                  </p>
                  {item.date && (
                    <p className="text-xs text-[var(--foreground-muted)]">
                      Verified homeowner · {item.date}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Services</p>
            <h2 className="section-title mt-4">
              Sustainable solutions for every home
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homepageServiceHighlights.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Major markets</p>
            <h2 className="section-title mt-4">Available across major markets</h2>
            <p className="section-copy mt-5">
              Eco Home Palace is built to feel international first, then locally
              relevant once the homeowner is ready to compare.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {countryMarkets.map((market) => (
              <article key={market.slug} className="premium-card">
                <h3 className="text-xl font-semibold">{market.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                  {market.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {market.cities.map((city) => (
                    <span
                      key={city.slug}
                      className="soft-pill rounded-full px-3 py-1.5 text-xs font-medium"
                    >
                      {city.name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-divider section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Popular searches</p>
            <h2 className="section-title mt-4">Popular project searches</h2>
          </div>
          <div className="mt-10">
            <PopularSearches items={popularProjectSearches} />
          </div>
        </div>
      </section>

      <section className="premium-divider px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="glass-panel soft-glow rounded-[1.9rem] px-8 py-10 text-center md:px-12 md:py-14">
            <p className="section-kicker">Final step</p>
            <h2 className="section-title mx-auto mt-4 text-center">
              Ready to find the best solution for your home?
            </h2>
            <div className="mt-8">
              <Link
                href="/intake"
                className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
              >
                Get 3 free quotes
              </Link>
            </div>
            <p className="mt-5 text-sm text-[var(--foreground-muted)]">
              Free, no obligation, matched with verified professionals.
            </p>
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
