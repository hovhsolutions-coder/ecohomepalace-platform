import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(4,8,17,0.74)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-[0.08em] text-white transition duration-200 hover:text-[var(--gold-300)]"
          >
            Eco Home Palace
          </Link>

          <Link
            href="/intake"
            className="gold-button inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold sm:w-auto md:hidden"
          >
            Start Project
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-6">
          <nav className="flex flex-wrap items-center gap-3 text-sm text-white/76 md:gap-6">
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
          </nav>

          <Link
            href="/intake"
            className="gold-button hidden items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold md:inline-flex"
          >
            Start Project
          </Link>
        </div>
      </div>
    </header>
  );
}
