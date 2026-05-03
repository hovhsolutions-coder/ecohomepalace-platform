import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
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
    description: `Find trusted ${selectedService.title.toLowerCase()} professionals in ${selectedCity.name}. Submit your project request and get matched.`,
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
    <main className="premium-shell min-h-screen text-[var(--foreground)]">
      <PublicHeader />

      <section className="section-padding px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: selectedService.title, href: `/services/${service}` },
              { label: selectedCity.name, href: `/${service}/${city}` },
            ]}
          />

          <div className="glass-panel mt-8 rounded-[1.85rem] px-8 py-10 md:px-12 md:py-14">
            <div className="flex flex-wrap items-center gap-3">
              <span className="emerald-accent rounded-full px-4 py-2 text-sm font-medium">
                Matching usually starts within 24 hours
              </span>
              <span className="soft-pill rounded-full px-4 py-2 text-sm font-medium">
                {selectedCity.country}
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              {selectedService.title} professionals in {selectedCity.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--foreground-soft)]">
              {selectedService.shortDescription} Eco Home Palace helps you move
              from local intent to a clearer comparison path with trusted
              professionals in {selectedCity.name}.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={intakeHref}
                className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
              >
                Compare installers in your area
              </a>
              <a
                href={`/services/${service}`}
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(20,35,25,0.1)] bg-white/75 px-6 py-4 text-base font-semibold text-[var(--foreground-soft)] transition duration-200 hover:border-[rgba(31,93,69,0.18)] hover:text-[var(--foreground)]"
              >
                View service page
              </a>
              <a
                href={`/cities/${city}`}
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(20,35,25,0.1)] bg-white/75 px-6 py-4 text-base font-semibold text-[var(--foreground-soft)] transition duration-200 hover:border-[rgba(31,93,69,0.18)] hover:text-[var(--foreground)]"
              >
                View city page
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="premium-card">
              <p className="section-kicker">Common project examples</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {selectedService.examples.map((example) => (
                  <div
                    key={example}
                    className="rounded-[1.25rem] border border-[rgba(20,35,25,0.08)] bg-white/76 px-5 py-4"
                  >
                    <p className="text-sm leading-7 text-[var(--foreground-soft)]">
                      {example}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="premium-card">
              <p className="section-kicker">Trust</p>
              <div className="mt-6 space-y-3">
                <div className="emerald-accent rounded-[1.2rem] px-4 py-3 text-sm leading-6">
                  Verified professionals and clear local matching context.
                </div>
                <div className="emerald-accent rounded-[1.2rem] px-4 py-3 text-sm leading-6">
                  Free comparison flow without obligation.
                </div>
                <div className="emerald-accent rounded-[1.2rem] px-4 py-3 text-sm leading-6">
                  A premium platform experience before the first call starts.
                </div>
              </div>
            </section>
          </div>

          <section className="mt-12">
            <p className="section-kicker">3-step process</p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {combinationHowItWorks.map((item) => (
                <div key={item.step} className="premium-card">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(31,93,69,0.12)] text-sm font-semibold text-[var(--primary-700)]">
                    {item.step}
                  </div>
                  <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <section className="premium-card">
              <p className="section-kicker">Related cities</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {relatedCities.map((citySlug) => (
                  <a
                    key={citySlug}
                    href={`/${service}/${citySlug}`}
                    className="soft-pill inline-flex rounded-full px-4 py-2 text-sm font-medium transition hover:text-[var(--foreground)]"
                  >
                    {selectedService.title} in {cities[citySlug].name}
                  </a>
                ))}
              </div>
            </section>

            <section className="premium-card">
              <p className="section-kicker">Related services</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {relatedServices.map((serviceSlug) => (
                  <a
                    key={serviceSlug}
                    href={`/${serviceSlug}/${city}`}
                    className="soft-pill inline-flex rounded-full px-4 py-2 text-sm font-medium transition hover:text-[var(--foreground)]"
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
