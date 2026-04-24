import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="max-w-md">
            <div className="text-lg font-semibold tracking-wide text-white">
              Eco Home Palace
            </div>
            <p className="mt-2 text-sm text-white/60">
              Trusted home project platform
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 md:justify-end md:gap-6">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <Link href="/cities" className="transition hover:text-white">
              Cities
            </Link>
            <Link
              href="/intake"
              className="inline-flex rounded-full border border-white/20 px-4 py-2 font-semibold text-white transition hover:border-white hover:bg-white/5"
            >
              Start Project
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
