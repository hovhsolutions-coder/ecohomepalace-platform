import Link from "next/link";
import type { MarketCountry } from "@/lib/publicData";

export default function CityCard({ market }: { market: MarketCountry }) {
  return (
    <article className="premium-card h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--emerald-300)]/80">
            Active market
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            {market.name}
          </h3>
        </div>
        <span className="emerald-accent rounded-full px-3 py-1 text-xs font-medium">
          {market.cities.length} cities
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/68">
        {market.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {market.cities.map((city) => (
          <span
            key={city.slug}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-medium text-white/80"
          >
            {city.name}
          </span>
        ))}
      </div>

      <Link
        href={`/intake?country=${market.slug}`}
        className="mt-8 inline-flex items-center rounded-full border border-white/14 px-4 py-2 text-sm font-semibold text-white/84 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--gold-300)] hover:bg-white/5"
      >
        Start Project
      </Link>
    </article>
  );
}
