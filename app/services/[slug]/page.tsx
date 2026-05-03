import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import TrustSection from "@/components/TrustSection";
import {
  cities,
  featuredCitySlugs,
  getServiceBySlug,
  publicTrustPoints,
  ServiceSlug,
  serviceHowItWorks,
  serviceOrder,
} from "@/lib/publicData";

export function generateStaticParams() {
  return serviceOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return {
    title: `${service.title} services | Eco Home Palace`,
    description: `Find trusted ${service.title.toLowerCase()} professionals and submit your project request through Eco Home Palace.`,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
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
              { label: "Services", href: "/services" },
              { label: service.title, href: `/services/${slug}` },
            ]}
          />

          <div className="glass-panel mt-8 rounded-[1.85rem] px-8 py-10 md:px-12 md:py-14">
            <p className="section-kicker">{service.heroLabel}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              {service.title} projects with a clearer path to matching
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--foreground-soft)]">
              {service.detailDescription}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`/intake?service=${slug}`}
                className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-8 py-4 font-semibold"
              >
                Get quotes
              </a>
              <a
                href="/cities"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(20,35,25,0.1)] bg-white/75 px-6 py-4 font-semibold text-[var(--foreground-soft)] transition hover:border-[rgba(31,93,69,0.18)] hover:text-[var(--foreground)]"
              >
                Explore Cities
              </a>
            </div>
          </div>

          <section className="mt-12">
            <p className="section-kicker">Service explanation</p>
            <div className="premium-card mt-6">
              <p className="max-w-4xl text-lg leading-8 text-[var(--foreground-soft)]">
                {service.shortDescription} This page helps homeowners move from
                early service discovery into a more structured intake flow with
                better context already in place.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <p className="section-kicker">Common project examples</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {service.examples.map((example) => (
                <div key={example} className="premium-card">
                  <p className="font-medium text-[var(--foreground)]">{example}</p>
                </div>
              ))}
            </div>
          </section>

          <TrustSection
            title="Trust Signals"
            intro="This service page is designed to help visitors move from category confidence into a more structured request."
            points={publicTrustPoints}
          />

          <section className="mt-12">
            <p className="section-kicker">How it works</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {serviceHowItWorks.map((item) => (
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
            <p className="section-kicker">Popular cities for this service</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {featuredCitySlugs.map((citySlug) => (
                <a
                  key={citySlug}
                  href={`/cities/${citySlug}`}
                  className="soft-pill inline-flex rounded-full px-5 py-3 text-sm font-semibold transition hover:text-[var(--foreground)]"
                >
                  {cities[citySlug].name}
                </a>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <p className="section-kicker">Example combination pages</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {featuredCitySlugs.slice(0, 3).map((citySlug) => (
                <a
                  key={citySlug}
                  href={`/${slug}/${citySlug}`}
                  className="soft-pill inline-flex rounded-full px-5 py-3 text-sm font-semibold transition hover:text-[var(--foreground)]"
                >
                  {service.title} in {cities[citySlug].name}
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
