import type { Metadata } from "next";
import MatchingBlock from "@/components/MatchingBlock";
import PopularSearches from "@/components/PopularSearches";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import ServiceCard from "@/components/ServiceCard";
import TrustBadges from "@/components/TrustBadges";
import CityCard from "@/components/CityCard";
import {
  countryMarkets,
  heroChecks,
  popularProjectSearches,
  publicServiceCatalog,
  testimonials,
} from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Eco Home Palace | Find Trusted Home Professionals",
  description:
    "We match homeowners with trusted local professionals in 24 hours across premium renovation, energy, and home-improvement categories.",
};

const homepageTrustStats = [
  {
    fullLabel: "10,000+ homeowners matched",
    value: "10,000+",
    label: "homeowners matched",
  },
  {
    fullLabel: "4.8/5 average rating",
    value: "4.8/5",
    label: "average rating",
  },
  {
    fullLabel: "10+ countries active",
    value: "10+",
    label: "countries active",
  },
];

export default function Home() {
  return (
    <main className="premium-shell text-white">
      <PublicHeader />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div
          className="luxury-bg-image absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(4,8,17,0.88), rgba(7,16,29,0.7)), url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,209,123,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(94,231,187,0.12),transparent_18%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-20 md:pb-16 md:pt-24 lg:pt-28">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--gold-300)]/82">
                Premium homeowner matching
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                We Match You with Trusted Home Professionals in 24 Hours
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
                Select your project, country, and city. We prepare your request
                and match you with suitable local professionals — free and
                without obligation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {heroChecks.map((item) => (
                  <div
                    key={item}
                    className="emerald-accent inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                  >
                    <span>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-4">
              <MatchingBlock />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-4 px-6">
        <TrustBadges items={homepageTrustStats} />
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/52">
              Premium service categories
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Services We Match For
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
              From clean-energy upgrades to major interior work, Eco Home Palace
              prepares high-intent homeowner requests before they move toward
              suitable local professionals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {publicServiceCatalog.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="premium-divider px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/52">
              International coverage
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Active Across Major Markets
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
              We are building a premium demand layer across markets where
              homeowners expect faster responses, stronger trust, and better
              local fit from the first request.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {countryMarkets.map((market) => (
              <CityCard key={market.slug} market={market} />
            ))}
          </div>
        </div>
      </section>

      <section className="premium-divider px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/52">
              Homeowner feedback
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Trusted by homeowners who value clarity
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="premium-card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-white/55">{item.city}</p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--gold-300)]">
                    {item.rating}
                  </span>
                </div>
                <p className="mt-6 text-base leading-8 text-white/72">
                  “{item.quote}”
                </p>
                <p className="mt-6 text-sm tracking-[0.2em] text-[var(--gold-300)]">
                  ***** 
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-divider px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/52">
              Fast entry points
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Popular project searches
            </h2>
          </div>

          <div className="mt-12">
            <PopularSearches items={popularProjectSearches} />
          </div>
        </div>
      </section>

      <section className="premium-divider px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="glass-panel soft-glow px-8 py-10 text-center md:px-14 md:py-16">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold-300)]/72">
              Premium matching flow
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Ready to Start Your Project Matching?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
              Start with one structured request and compare serious local
              professionals without chasing quotes one by one.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/intake"
                className="gold-button inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
              >
                Get Matched Now
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-[var(--gold-border)] px-8 py-4 text-base font-semibold text-white/88 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--gold-300)] hover:bg-white/5"
              >
                Explore Services
              </a>
            </div>
            <p className="mt-6 text-sm text-white/58">
              Free • No obligation • Compare multiple offers
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
