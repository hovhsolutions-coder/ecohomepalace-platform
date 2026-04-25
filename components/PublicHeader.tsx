'use client';

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Cities", href: "/cities" },
  { label: "For installers", href: "/for-installers" },
];

export default function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(20,35,25,0.08)] bg-[rgba(250,248,243,0.82)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <Link
            href="/"
            className="text-base font-semibold tracking-[0.1em] text-[var(--navy-900)] transition duration-200 hover:text-[var(--primary-600)] sm:text-lg"
          >
            Eco Home Palace
          </Link>

          <div className="inline-flex items-center rounded-full border border-[rgba(20,35,25,0.08)] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)] md:order-3">
            Language
            <span className="ml-2 rounded-full bg-[rgba(47,138,103,0.08)] px-2 py-1 text-[10px] text-[var(--primary-600)]">
              EN
            </span>
          </div>

          <nav className="phone-scroll order-3 hidden w-full items-center gap-3 overflow-x-auto text-sm text-[var(--foreground-soft)] md:order-2 md:flex md:w-auto md:justify-center md:gap-6">
            <Link
              href="/"
              className="whitespace-nowrap rounded-full px-1 py-1 transition duration-200 hover:text-[var(--foreground)]"
            >
              Home
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap rounded-full px-1 py-1 transition duration-200 hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-full border border-[rgba(20,35,25,0.08)] bg-white/80 p-2 text-[var(--foreground-soft)] transition hover:border-[rgba(31,93,69,0.18)] hover:text-[var(--foreground)]"
              aria-label="Toggle menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <Link
              href="/intake"
              className="gold-button order-2 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold md:order-4"
            >
              Get 3 free quotes
            </Link>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4">
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/"
                className="rounded-full px-4 py-2 text-[var(--foreground-soft)] transition hover:bg-[rgba(31,93,69,0.08)] hover:text-[var(--foreground)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[var(--foreground-soft)] transition hover:bg-[rgba(31,93,69,0.08)] hover:text-[var(--foreground)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
