import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import TrustSection from "@/components/TrustSection";
import {
  cities,
  cityHowItWorks,
  cityOrder,
  getCityBySlug,
  popularServiceSlugs,
  publicTrustPoints,
  services,
} from "@/lib/publicData";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return cityOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  return {
    title: `${city.name} home professionals | Eco Home Palace`,
    description: `Find trusted home professionals in ${city.name} and continue to intake with Eco Home Palace.`,
  };
}

export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <a
            href="/cities"
            className="inline-flex text-sm text-white/60 transition hover:text-white"
          >
            Back to Cities
          </a>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 md:p-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              {city.country}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Connect with Verified Home Professionals in {city.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {city.detailDescription}
            </p>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Local specialists in {city.name}
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free quotes
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No obligation
              </span>
            </div>

            {/* Pre-commitment messaging */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white/90">
                📍 Connecting you with professionals in {city.name}
              </p>
              <p className="mt-2 text-sm text-white/60">
                Local specialists in {city.name} typically respond within 24 hours.
                Get free quotes, compare offers, no obligation to hire.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`/intake?city=${slug}`}
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-lg font-semibold text-black transition hover:bg-gray-200"
              >
                Continue to Get Matched →
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-4 font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                Browse Services
              </a>
            </div>
          </div>

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              City / platform explanation
            </p>
            <div className="mt-6 rounded-[2rem] border border-white/10 bg-zinc-950 p-8">
              <p className="max-w-4xl text-lg leading-8 text-white/70">
                {city.shortDescription} Eco Home Palace uses city pages like{" "}
                {city.name} to connect local discovery with a clearer intake
                path.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Popular services in this city
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {popularServiceSlugs.map((serviceSlug) => (
                <a
                  key={serviceSlug}
                  href={`/services/${serviceSlug}`}
                  className="rounded-2xl border border-white/10 bg-zinc-950 px-6 py-5 transition hover:border-white/20"
                >
                  <span className="font-semibold">
                    {services[serviceSlug].title}
                  </span>
                </a>
              ))}
            </div>
          </section>

          <TrustSection
            title="Trust Signals"
            intro="The city layer helps visitors understand how local context supports more relevant project matching."
            points={publicTrustPoints}
          />

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              How it works
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {cityHowItWorks.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-white/10 bg-zinc-950 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-black">
                    {item.step}
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 leading-7 text-white/65">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Example combination pages
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {popularServiceSlugs.slice(0, 3).map((serviceSlug) => (
                <a
                  key={serviceSlug}
                  href={`/${serviceSlug}/${slug}`}
                  className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                >
                  {services[serviceSlug].title} in {city.name}
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
