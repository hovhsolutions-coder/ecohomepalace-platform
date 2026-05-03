import type { Metadata } from "next";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import ServiceCard from "@/components/ServiceCard";
import { popularProjectSearches, publicServiceCatalog } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Services | Eco Home Palace",
  description:
    "Explore sustainable home services including solar panels, heat pumps, insulation, renovation, electrical work, plumbing and more.",
};

export default function ServicesPage() {
  return (
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
              ))}
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
