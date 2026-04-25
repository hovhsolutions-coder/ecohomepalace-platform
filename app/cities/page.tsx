import type { Metadata } from "next";
import Link from "next/link";
import CityCard from "@/components/CityCard";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import { countryMarkets } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Cities | Eco Home Palace",
  description:
    "Explore the international markets where Eco Home Palace helps homeowners compare trusted local professionals.",
};

export default function CitiesPage() {
  return (
    <main className="premium-shell min-h-screen text-[var(--foreground)]">
      <PublicHeader />

      <section className="section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Cities and countries</p>
            <h1 className="section-title mt-4">Available in your region</h1>
            <p className="section-copy mt-5">
              Eco Home Palace is built as a global platform first, then made
              locally relevant through markets, cities, and service-specific
              comparison paths.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {countryMarkets.map((market) => (
              <CityCard key={market.slug} market={market} />
            ))}
          </div>

          <div className="glass-panel mt-12 grid gap-6 rounded-[1.75rem] px-8 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="section-kicker">Expanding city by city</p>
              <h2 className="mt-3 text-3xl font-semibold">
                Local comparison, international platform standards
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                We are expanding across high-intent homeowner markets where
                clarity, trust, and faster access to suitable professionals
                matter most.
              </p>
            </div>
            <Link
              href="/intake"
              className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
            >
              Get 3 free quotes
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
