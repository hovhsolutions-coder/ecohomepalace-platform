import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import TrustSection from "@/components/TrustSection";
import {
  cities,
  cityOrder,
  homeHowItWorks,
  popularProjectSearches,
  publicTrustPoints,
  serviceOrder,
  services,
  trustPoints,
} from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Eco Home Palace | Find Trusted Home Professionals",
  description:
    "Find trusted professionals for renovation, repair, solar, plumbing, electrical work and more.",
};

export default function Home() {
  return (
    <main className="bg-black text-white">
      <PublicHeader />

      <section className="relative overflow-hidden px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-6 text-sm uppercase tracking-[0.2em] text-white/60">
                Trusted Home Professionals Worldwide
              </p>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Find Trusted Help for Every Home Project
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                Eco Home Palace connects homeowners with trusted professionals
                for renovation, repair, solar, plumbing, electrical work, and
                more through a premium public discovery and intake flow.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="/intake"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
                >
                  Start Project
                </a>
                <a
                  href="/services"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-8 py-4 font-medium text-white transition hover:border-white hover:bg-white/5 sm:w-auto"
                >
                  Browse Services
                </a>
              </div>

              <p className="mt-6 max-w-xl text-sm leading-6 text-white/50">
                Free to use. Matched within 24 hours. Trusted public platform.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Premium Matching Flow
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  "Explore service categories",
                  "Choose your city",
                  "Share project scope",
                  "Move into matching",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                      {index + 1}
                    </div>
                    <p className="font-medium text-white/85">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-zinc-950 p-8 md:p-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Project Matching
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Find help for your project
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Choose your project and city. We&apos;ll guide you through the
              request.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
            <label className="block">
              <span className="mb-3 block text-sm font-medium text-white/70">
                What do you need help with?
              </span>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-white/20">
                <select
                  defaultValue=""
                  className="w-full bg-transparent text-base text-white outline-none"
                >
                  <option value="" disabled className="bg-black text-white/50">
                    Select a service
                  </option>
                  {serviceOrder.map((slug) => (
                    <option
                      key={slug}
                      value={slug}
                      className="bg-black"
                    >
                      {services[slug].title}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="block">
              <span className="mb-3 block text-sm font-medium text-white/70">
                Where is the project?
              </span>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-white/20">
                <select
                  defaultValue=""
                  className="w-full bg-transparent text-base text-white outline-none"
                >
                  <option value="" disabled className="bg-black text-white/50">
                    Select a city
                  </option>
                  {cityOrder.map((slug) => (
                    <option key={slug} value={slug} className="bg-black">
                      {cities[slug].name}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <div className="flex items-end">
              <a
                href="/intake"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-center font-semibold text-black transition hover:bg-gray-200 md:w-auto"
              >
                Start Project
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Professional Services
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Explore Trusted Project Categories
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {serviceOrder.map((slug) => {
              const service = services[slug];
              return (
                <a
                  key={slug}
                  href={`/services/${slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10"
                >
                  <p className="text-sm uppercase tracking-[0.16em] text-white/40">
                    {service.heroLabel}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {service.shortDescription}
                  </p>
                  <span className="mt-6 inline-flex text-sm font-semibold text-white/80 transition group-hover:text-white">
                    View service details
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              City Coverage
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Discover the Public Platform by City
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {cityOrder.map((slug) => {
              const city = cities[slug];
              return (
                <a
                  key={slug}
                  href={`/cities/${slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10"
                >
                  <h3 className="text-2xl font-semibold">{city.name}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/40">
                    {city.country}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {city.shortDescription}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Why homeowners use Eco Home Palace
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              A premium public layer built for clarity and momentum
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Homeowners use Eco Home Palace to move from broad search into a
              more structured matching flow without the friction of starting
              from scratch.
            </p>
          </div>
          <TrustSection points={publicTrustPoints} />
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              From request to match
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              A clear path from request to match
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {homeHowItWorks.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/10 bg-black p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-black">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Why Trust Us
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Premium Public Platform Foundations
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="font-semibold text-white">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Popular project searches
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Start from the most searched combinations
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {popularProjectSearches.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10"
              >
                <p className="font-semibold">{item.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-10 text-center md:p-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/70">
            Explore services, compare cities, and continue into intake when
            you&apos;re ready to move into matching.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="/intake"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
            >
              Start Project
            </a>
            <a
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:border-white hover:bg-white/5 sm:w-auto"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
