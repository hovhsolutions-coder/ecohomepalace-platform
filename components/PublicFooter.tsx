import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="premium-divider mt-24 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div className="max-w-lg">
          <p className="text-lg font-semibold tracking-[0.08em] text-white">
            Eco Home Palace
          </p>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Premium lead-generation platform for homeowners who want trusted
            local professionals, faster project preparation, and stronger quote
            comparison across major markets.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/72 md:justify-end">
            <Link href="/" className="transition duration-200 hover:text-white">
              Home
            </Link>
            <Link
              href="/services"
              className="transition duration-200 hover:text-white"
            >
              Services
            </Link>
            <Link
              href="/cities"
              className="transition duration-200 hover:text-white"
            >
              Cities
            </Link>
            <Link
              href="/for-installers"
              className="transition duration-200 hover:text-white"
            >
              For Installers
            </Link>
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            <Link
              href="/intake"
              className="gold-button inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
