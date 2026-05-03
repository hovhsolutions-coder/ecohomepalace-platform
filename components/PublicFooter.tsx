import Link from "next/link";
import { countryMarkets, footerCityLinks } from "@/lib/publicData";

export default function PublicFooter() {
  return (
    <footer className="premium-divider mt-20 bg-[rgba(255,255,255,0.52)] px-6 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
        <div className="max-w-md">
          <p className="text-lg font-semibold tracking-[0.08em] text-[var(--navy-900)]">
            Eco Home Palace
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
            Eco Home Palace connects homeowners with trusted professionals for
            sustainable home improvements across international markets, while
            keeping the experience clear, local, and easy to start.
          </p>
          <div className="mt-6 rounded-[1.2rem] border border-[rgba(20,35,25,0.08)] bg-white/72 px-5 py-4 text-sm text-[var(--foreground-soft)]">
            <p className="font-semibold text-[var(--foreground)]">Company info</p>
            <p className="mt-2">Global homeowner matching platform</p>
            <p>The Hague, Netherlands</p>
            <p className="mt-2">Company registration details will be published here.</p>
            <p className="mt-1">Contact: hello@ecohomepalace.com</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
            About
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--foreground-soft)]">
            <Link href="/" className="transition hover:text-[var(--foreground)]">
              About Eco Home Palace
            </Link>
            <a
              href="mailto:hello@ecohomepalace.com"
              className="transition hover:text-[var(--foreground)]"
            >
              Contact
            </a>
            <Link
              href="/services"
              className="transition hover:text-[var(--foreground)]"
            >
              Services
            </Link>
            <Link
              href="/cities"
              className="transition hover:text-[var(--foreground)]"
            >
              Cities
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
            Trust
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--foreground-soft)]">
            <Link
              href="/privacy"
              className="transition hover:text-[var(--foreground)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition hover:text-[var(--foreground)]"
            >
              Terms
            </Link>
            <Link
              href="/intake"
              className="transition hover:text-[var(--foreground)]"
            >
              Start your comparison
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
            Countries / cities
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {countryMarkets.slice(0, 5).map((country) => (
              <span
                key={country.slug}
                className="soft-pill rounded-full px-3 py-1.5 text-xs font-medium"
              >
                {country.name}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {footerCityLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-[rgba(20,35,25,0.08)] bg-white/78 px-3 py-1.5 text-xs font-medium text-[var(--foreground-soft)] transition hover:border-[rgba(31,93,69,0.16)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
