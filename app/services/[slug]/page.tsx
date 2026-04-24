import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import TrustSection from "@/components/TrustSection";
import {
  featuredCitySlugs,
  getServiceBySlug,
  publicTrustPoints,
  ServiceSlug,
  serviceHowItWorks,
  serviceOrder,
  cities,
} from "@/lib/publicData";
import { notFound } from "next/navigation";

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
    <main className="min-h-screen bg-black text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <a
            href="/services"
            className="inline-flex text-sm text-white/60 transition hover:text-white"
          >
            Back to Services
          </a>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 md:p-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              {service.heroLabel}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              {service.title} projects with a clearer path to matching
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {service.detailDescription}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`/intake?service=${slug}`}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200"
              >
                Start Project
              </a>
              <a
                href="/cities"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-4 font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                Explore Cities
              </a>
            </div>
          </div>

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Service Explanation
            </p>
            <div className="mt-6 rounded-[2rem] border border-white/10 bg-zinc-950 p-8">
              <p className="max-w-4xl text-lg leading-8 text-white/70">
                {service.shortDescription} This page helps homeowners move from
                early service discovery into a more structured intake flow with
                better context already in place.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Common project examples
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {service.examples.map((example) => (
                <div
                  key={example}
                  className="rounded-2xl border border-white/10 bg-zinc-950 p-6"
                >
                  <p className="font-medium text-white/85">{example}</p>
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
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              How it works
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {serviceHowItWorks.map((item) => (
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
              Popular cities for this service
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {featuredCitySlugs.map((citySlug) => (
                <a
                  key={citySlug}
                  href={`/cities/${citySlug}`}
                  className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                >
                  {cities[citySlug].name}
                </a>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Example combination pages
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {featuredCitySlugs.slice(0, 3).map((citySlug) => (
                <a
                  key={citySlug}
                  href={`/${slug}/${citySlug}`}
                  className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
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
