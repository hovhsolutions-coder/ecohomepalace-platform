import Link from "next/link";
import type { MarketCountry } from "@/lib/publicData";

export default function CityCard({ market }: { market: MarketCountry }) {
  return (
    <article className="premium-card flex h-full flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-kicker">Major market</p>
            <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">
              {market.name}
            </h3>
          </div>
          <span className="emerald-accent rounded-full px-3 py-1.5 text-xs font-medium">
            {market.cities.length} cities
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
          {market.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {market.cities.map((city) => (
            <span
              key={city.slug}
              className="soft-pill rounded-full px-3 py-1.5 text-xs font-medium"
            >
              {city.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/intake?country=${market.slug}`}
          className="gold-button inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
        >
          Compare installers in your area
        </Link>
        <Link
          href="/cities"
          className="inline-flex items-center justify-center rounded-full border border-[rgba(20,35,25,0.1)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--foreground-soft)] transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(31,93,69,0.2)] hover:text-[var(--foreground)]"
        >
          View markets
        </Link>
      </div>
    </article>
  );
}
