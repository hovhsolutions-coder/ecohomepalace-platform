import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import {
  cities,
  CitySlug,
  cityOrder,
  combinationHowItWorks,
  getCountrySlugFromName,
  popularServiceSlugs,
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
    title: `${selectedService.title} in ${selectedCity.name} | Eco Home Palace`,
    description: `Explore ${selectedService.title.toLowerCase()} matching in ${selectedCity.name} and continue into a prepared project request.`,
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

  const relatedCities = cityOrder.filter((item) => item !== city).slice(0, 4);
  const relatedServices = popularServiceSlugs
    .filter((item) => item !== service)
    .slice(0, 4);
  const intakeHref = `/intake?service=${service}&country=${getCountrySlugFromName(
    selectedCity.country,
  )}&city=${city}`;

  return (
    <main className="premium-shell min-h-screen text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 text-sm text-white/58">
            <a href="/services" className="transition duration-200 hover:text-white">
              Services
            </a>
            <span>/</span>
            <a href="/cities" className="transition duration-200 hover:text-white">
              Cities
            </a>
          </div>

          <div className="glass-panel mt-8 px-8 py-10 md:px-12 md:py-14">
            <div className="flex flex-wrap items-center gap-3">
              <span className="emerald-accent rounded-full px-4 py-2 text-sm font-medium">
                Matching usually starts within 24 hours
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/72">
                {selectedCity.country}
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              {selectedService.title} professionals in {selectedCity.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              {selectedService.shortDescription} This page combines service
              intent and city context before you continue into a prepared intake
              request.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={intakeHref}
                className="gold-button inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
              >
                Start Project
              </a>
              <a
                href={`/services/${service}`}
                className="inline-flex items-center justify-center rounded-full border border-[var(--gold-border)] px-6 py-4 text-base font-semibold text-white/86 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--gold-300)] hover:bg-white/5"
              >
                View service page
              </a>
              <a
                href={`/cities/${city}`}
                className="inline-flex items-center justify-center rounded-full border border-white/12 px-6 py-4 text-base font-semibold text-white/78 transition duration-200 hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/5"
              >
                View city page
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="premium-card">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold-300)]/72">
                Common project examples
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {selectedService.examples.map((example) => (
                  <div
                    key={example}
                    className="rounded-[1.25rem] border border-white/10 bg-black/20 px-5 py-4"
                  >
                    <p className="text-sm leading-7 text-white/78">{example}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="premium-card">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--emerald-300)]/72">
                Why this path converts
              </p>
              <div className="mt-6 space-y-3">
                <div className="emerald-accent rounded-[1.2rem] px-4 py-3 text-sm leading-6">
                  Local context makes the request easier to review.
                </div>
                <div className="emerald-accent rounded-[1.2rem] px-4 py-3 text-sm leading-6">
                  The service is already defined before intake begins.
                </div>
                <div className="emerald-accent rounded-[1.2rem] px-4 py-3 text-sm leading-6">
                  Homeowners can move into matching without extra friction.
                </div>
              </div>
            </section>
          </div>

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/55">
              3-step process
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {combinationHowItWorks.map((item) => (
                <div key={item.step} className="premium-card">
                  <div className="gold-button inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold">
                    {item.step}
                  </div>
                  <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <section className="premium-card">
              <p className="text-sm uppercase tracking-[0.2em] text-white/55">
                Related cities
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {relatedCities.map((citySlug) => (
                  <a
                    key={citySlug}
                    href={`/${service}/${citySlug}`}
                    className="inline-flex rounded-full border border-white/12 bg-black/20 px-4 py-2 text-sm font-medium text-white/82 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--gold-border)]"
                  >
                    {selectedService.title} in {cities[citySlug].name}
                  </a>
                ))}
              </div>
            </section>

            <section className="premium-card">
              <p className="text-sm uppercase tracking-[0.2em] text-white/55">
                Related services
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {relatedServices.map((serviceSlug) => (
                  <a
                    key={serviceSlug}
                    href={`/${serviceSlug}/${city}`}
                    className="inline-flex rounded-full border border-white/12 bg-black/20 px-4 py-2 text-sm font-medium text-white/82 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--gold-border)]"
                  >
                    {services[serviceSlug].title} in {selectedCity.name}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
