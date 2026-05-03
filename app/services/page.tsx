import type { Metadata } from "next";
<<<<<<< HEAD
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import ServiceCard from "@/components/ServiceCard";
import {
  popularProjectSearches,
  publicServiceCatalog,
} from "@/lib/publicData";
=======
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import ServiceCard from "@/components/ServiceCard";
import { popularProjectSearches, publicServiceCatalog } from "@/lib/publicData";
>>>>>>> origin/main

export const metadata: Metadata = {
  title: "Services | Eco Home Palace",
  description:
<<<<<<< HEAD
    "Explore the premium services Eco Home Palace matches for across renovation, energy, comfort, and home-upgrade projects.",
=======
    "Explore sustainable home services including solar panels, heat pumps, insulation, renovation, electrical work, plumbing and more.",
>>>>>>> origin/main
};

export default function ServicesPage() {
  return (
<<<<<<< HEAD
    <main className="premium-shell min-h-screen text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold-300)]/72">
              Premium demand categories
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Services We Match For
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Eco Home Palace is designed to turn high-intent homeowner demand
              into better prepared requests for premium local professionals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {publicServiceCatalog.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                showDetailLink={false}
              />
            ))}
          </div>

          <div className="glass-panel mt-14 grid gap-6 px-8 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/55">
                Not sure what you need?
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Start with the project outcome, not the trade label
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">
                If you are still deciding between categories, begin with intake
                and describe the result you want. We will still prepare the
                request for a suitable matching path.
              </p>
            </div>
            <a
              href="/intake"
              className="gold-button inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
            >
              Start Project
            </a>
          </div>

          <div className="mt-16">
            <p className="text-sm uppercase tracking-[0.22em] text-white/55">
              Popular searches
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {popularProjectSearches.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/82 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--gold-border)] hover:text-white"
                >
                  {item.label}
                </a>
=======
    <main className="premium-shell min-h-screen text-[var(--foreground)]">
      <PublicHeader />

      <section className="section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="section-kicker">Services</p>
            <h1 className="section-title mt-4">
              Sustainable solutions for every home
            </h1>
            <p className="section-copy mt-5">
              Explore the main project categories Eco Home Palace supports. Each
              path is designed to help homeowners move from early interest to a
              clear request and better local comparison.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {publicServiceCatalog.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="glass-panel mt-12 grid gap-6 rounded-[1.75rem] px-8 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="section-kicker">Not sure what you need?</p>
              <h2 className="mt-3 text-3xl font-semibold">
                Start with your home goal, not the trade label
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                If you are deciding between categories, start your comparison
                and describe what you want to improve. We will help prepare the
                right project path from there.
              </p>
            </div>
            <Link
              href="/intake"
              className="gold-button inline-flex min-h-14 items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
            >
              Get 3 free quotes
            </Link>
          </div>

          <div className="mt-14">
            <p className="section-kicker">Popular searches</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {popularProjectSearches.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="soft-pill inline-flex rounded-full px-4 py-2 text-sm font-medium transition hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
>>>>>>> origin/main
              ))}
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
