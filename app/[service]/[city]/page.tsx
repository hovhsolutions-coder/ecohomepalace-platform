import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import TrustSection from "@/components/TrustSection";
import {
  cities,
  CitySlug,
  cityOrder,
  combinationHowItWorks,
  publicTrustPoints,
  services,
  ServiceSlug,
} from "@/lib/publicData";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return (Object.keys(services) as ServiceSlug[]).flatMap((service) =>
    cityOrder.map((city) => ({ service, city })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}): Promise<Metadata> {
  const { service, city } = await params;
  const selectedService = services[service as ServiceSlug];
  const selectedCity = cities[city as CitySlug];

  if (!selectedService || !selectedCity) {
    notFound();
  }

  return {
    title: `${selectedService.title} professionals in ${selectedCity.name} | Eco Home Palace`,
    description: `Find trusted ${selectedService.title.toLowerCase()} professionals in ${selectedCity.name.toLowerCase()}. Submit your project request and get matched.`,
  };
}

export default async function CombinationPage({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { service, city } = await params;
  const selectedService = services[service as ServiceSlug];
  const selectedCity = cities[city as CitySlug];

  if (!selectedService || !selectedCity) {
    notFound();
  }

  const relatedCities = cityOrder
    .filter((citySlug) => citySlug !== city)
    .slice(0, 4);
  const relatedServices = (Object.keys(services) as ServiceSlug[])
    .filter((serviceSlug) => serviceSlug !== service)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-black text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 text-sm text-white/60">
            <a href="/services" className="transition hover:text-white">
              Back to Services
            </a>
            <span>/</span>
            <a href="/cities" className="transition hover:text-white">
              Back to Cities
            </a>
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 md:p-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Public Combination Page
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              {selectedService.title} professionals in {selectedCity.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {selectedService.detailDescription} This page gives homeowners a
              clear service-and-city starting point before they move into
              intake.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`/intake?service=${service}&city=${city}`}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200"
              >
                Start Project
              </a>
              <a
                href={`/services/${service}`}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-4 font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                View Service Page
              </a>
              <a
                href={`/cities/${city}`}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-4 font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                View City Page
              </a>
            </div>
          </div>

          <TrustSection
            title="Trust Signals"
            intro="Combination pages give users service intent and city context at the same time, which makes the next intake step feel more grounded."
            points={publicTrustPoints}
          />

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Common project examples
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {selectedService.examples.map((example) => (
                <div
                  key={example}
                  className="rounded-2xl border border-white/10 bg-zinc-950 p-6"
                >
                  <p className="font-medium text-white/85">{example}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              3-step process
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {combinationHowItWorks.map((item) => (
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
              Related cities
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedCities.map((citySlug) => (
                <a
                  key={citySlug}
                  href={`/${service}/${citySlug}`}
                  className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                >
                  {selectedService.title} in {cities[citySlug].name}
                </a>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Related services
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedServices.map((serviceSlug) => (
                <a
                  key={serviceSlug}
                  href={`/${serviceSlug}/${city}`}
                  className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                >
                  {services[serviceSlug].title} in {selectedCity.name}
                </a>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 text-center">
            <h2 className="text-3xl font-bold">Ready to move into intake?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/70">
              Submit your {selectedService.title.toLowerCase()} project in{" "}
              {selectedCity.name} and continue to the matching flow.
            </p>
            <a
              href={`/intake?service=${service}&city=${city}`}
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
