import type { Metadata } from "next";
import CityCard from "@/components/CityCard";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import { countryMarkets } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Cities | Eco Home Palace",
  description:
    "Explore the major markets where Eco Home Palace is active across Europe, the United States, the UAE, and India.",
};

export default function CitiesPage() {
  return (
    <main className="premium-shell min-h-screen text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--emerald-300)]/78">
              Market coverage
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Active Across Major Markets
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Eco Home Palace is expanding city by city across high-intent
              homeowner markets where premium project preparation and faster
              local matching matter most.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {countryMarkets.map((market) => (
              <CityCard key={market.slug} market={market} />
            ))}
          </div>

          <div className="glass-panel mt-14 grid gap-6 px-8 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/55">
                City-first matching
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Choose the market first, then refine the project
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">
                The city layer helps homeowners frame where the work happens
                before the request moves into a prepared intake flow.
              </p>
            </div>
            <a
              href="/intake"
              className="gold-button inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
            >
              Start Project
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
