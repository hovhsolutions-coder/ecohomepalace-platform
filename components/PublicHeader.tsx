import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-wide text-white transition hover:text-white/80"
            >
              Eco Home Palace
            </Link>

            <Link
              href="/intake"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto md:hidden"
            >
              Start Project
            </Link>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-white/80 md:gap-6">
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
              className="hidden rounded-full bg-white px-5 py-2.5 font-semibold text-black transition hover:bg-gray-200 md:inline-flex"
            >
              Start Project
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
