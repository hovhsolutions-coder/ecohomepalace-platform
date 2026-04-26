import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center md:p-10">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Page Not Found
            </p>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              We couldn&apos;t find that public page
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              The service, city, or route you requested is not available in the
              current Eco Home Palace public platform. You can continue from
              the overview pages below or start a new project request directly.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                Explore Services
              </Link>
              <Link
                href="/cities"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                Explore Cities
              </Link>
              <Link
                href="/intake"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
              >
                Start Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
