import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import TrustSection from "@/components/TrustSection";
import { publicTrustPoints, serviceOrder, services } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Services | Eco Home Palace",
  description:
    "Explore renovation, painting, plumbing, electrical, solar, roofing, flooring, kitchen and bathroom services.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Services
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Explore Services for Your Home Project
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/70">
              Browse the core service categories on the public platform, compare
              project types, and continue into intake when you&apos;re ready to
              start a request.
            </p>
            <p className="mt-4 text-white/55">
              Each category is designed to make the next step clearer before
              you move into a structured request.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {serviceOrder.map((slug) => {
              const service = services[slug];
              return (
                <div
                  key={slug}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8"
                >
                  <a
                    href={`/services/${slug}`}
                    className="group block transition hover:text-white/90"
                  >
                    <p className="text-sm uppercase tracking-[0.16em] text-white/40">
                      {service.heroLabel}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      {service.title}
                    </h2>
                    <p className="mt-4 leading-7 text-white/65">
                      {service.shortDescription}
                    </p>
                    <span className="mt-6 inline-flex text-sm font-semibold text-white/80 transition group-hover:text-white">
                      View service details
                    </span>
                  </a>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href={`/intake?service=${slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                    >
                      Start Project
                    </a>
                    <a
                      href="/cities"
                      className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                    >
                      Explore Cities
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <TrustSection
            title="Trust Signals"
            intro="The service layer is designed to keep visitors moving from discovery into the right request path."
            points={publicTrustPoints}
          />

          <section className="mt-12 rounded-[2rem] border border-white/10 bg-zinc-950 p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Not sure what you need?
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Start with your project, not the label
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
              If you&apos;re unsure which category fits best, start intake and
              describe the project in your own words. The public flow still gets
              you moving toward the right match.
            </p>
            <a
              href="/intake"
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
