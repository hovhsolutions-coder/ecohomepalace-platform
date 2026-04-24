import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import TrustSection from "@/components/TrustSection";
import { cities, cityOrder, publicTrustPoints } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Cities | Eco Home Palace",
  description:
    "Explore cities where Eco Home Palace is building its trusted home project platform across Europe and beyond.",
};

export default function CitiesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Cities
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Explore Cities Where Matching Starts
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/70">
              Discover the early city footprint of Eco Home Palace and move
              from local exploration into service discovery and intake.
            </p>
            <p className="mt-4 text-white/55">
              City pages help you anchor a request in the right market before
              choosing the service path that fits best.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {cityOrder.map((slug) => {
              const city = cities[slug];
              return (
                <a
                  key={slug}
                  href={`/cities/${slug}`}
                  className="block rounded-[1.75rem] border border-white/10 bg-white/5 p-8 transition hover:border-white/30 hover:bg-white/10"
                >
                  <p className="text-sm uppercase tracking-[0.16em] text-white/40">
                    {city.country}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">{city.name}</h2>
                  <p className="mt-4 leading-7 text-white/65">
                    {city.shortDescription}
                  </p>
                  <span className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
                    View city page
                  </span>
                  <p className="mt-3 text-sm text-white/50">
                    Choose your project type in the next step.
                  </p>
                </a>
              );
            })}
          </div>

          <TrustSection
            title="Trust Signals"
            intro="The city layer helps visitors understand where the platform is growing and how matching becomes more relevant."
            points={publicTrustPoints}
          />

          <section className="mt-12 rounded-[2rem] border border-white/10 bg-zinc-950 p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Expanding city by city
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              A market-led public rollout
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
              Eco Home Palace is building outward through clear city-based
              discovery, helping homeowners connect service intent with local
              context before they submit a project request.
            </p>
            <a
              href="/intake"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200"
            >
              Start Project
            </a>
          </section>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
