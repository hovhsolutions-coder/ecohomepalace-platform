import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import TrustSection from "@/components/TrustSection";
import {
  cityHowItWorks,
  cityOrder,
  getCityBySlug,
  popularServiceSlugs,
  publicTrustPoints,
  services,
} from "@/lib/publicData";

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
    <main className="premium-shell min-h-screen text-[var(--foreground)]">
      <PublicHeader />

      <section className="section-padding px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Cities", href: "/cities" },
              { label: city.name, href: `/cities/${slug}` },
            ]}
          />

          <div className="glass-panel mt-8 rounded-[1.85rem] px-8 py-10 md:px-12 md:py-14">
            <p className="section-kicker">{city.country}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Find trusted home professionals in {city.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--foreground-soft)]">
              {city.detailDescription}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`/intake?city=${slug}`}
                className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-8 py-4 font-semibold"
              >
                Compare installers in your area
              </a>
              <a
                href="/services"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(20,35,25,0.1)] bg-white/75 px-6 py-4 font-semibold text-[var(--foreground-soft)] transition hover:border-[rgba(31,93,69,0.18)] hover:text-[var(--foreground)]"
              >
                Explore Services
              </a>
            </div>
          </div>

          <section className="mt-12">
            <p className="section-kicker">City explanation</p>
            <div className="premium-card mt-6">
              <p className="max-w-4xl text-lg leading-8 text-[var(--foreground-soft)]">
                {city.shortDescription} Eco Home Palace uses city pages like{" "}
                {city.name} to connect local discovery with a clearer intake
                path and more relevant comparison.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <p className="section-kicker">Popular services in this city</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {popularServiceSlugs.map((serviceSlug) => (
                <a
                  key={serviceSlug}
                  href={`/services/${serviceSlug}`}
                  className="premium-card"
                >
                  <span className="font-semibold">{services[serviceSlug].title}</span>
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
            <p className="section-kicker">How it works</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {cityHowItWorks.map((item) => (
                <div key={item.step} className="premium-card">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(31,93,69,0.12)] text-lg font-bold text-[var(--primary-700)]">
                    {item.step}
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <p className="section-kicker">Example combination pages</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {popularServiceSlugs.slice(0, 3).map((serviceSlug) => (
                <a
                  key={serviceSlug}
                  href={`/${serviceSlug}/${slug}`}
                  className="soft-pill inline-flex rounded-full px-5 py-3 text-sm font-semibold transition hover:text-[var(--foreground)]"
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
