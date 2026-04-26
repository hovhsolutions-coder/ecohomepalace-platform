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
    <header className="sticky top-0 z-50 border-b border-[#d8b45f]/20 bg-[linear-gradient(180deg,#061f18_0%,#0b2a22_48%,#12382d_100%)] backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Main nav row */}
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Logo block with champagne/gold accents */}
          <Link
            href="/"
            className="flex items-center gap-4 group"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#21c45d] to-[#16a34a] shadow-[0_0_24px_rgba(216,180,95,0.22)] group-hover:shadow-[0_0_30px_rgba(216,180,95,0.32)] transition-all duration-300">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#f0c96a]/20 to-transparent"></div>
              <svg
                className="relative h-5 w-5 text-[#f8f1dc]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-[#f8f1dc] sm:text-lg">
                Eco Home Palace
              </span>
              <span className="text-[10px] font-medium tracking-[0.22em] text-[#d8cfaa] uppercase">
                Home Improvement Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop navigation - champagne text with gold underline */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="relative px-3 py-2 text-sm font-medium text-[#efe6c8] transition-all duration-300 hover:bg-white/6 hover:text-[#f8f1dc] focus-visible:ring-2 focus-visible:ring-[#f0c96a]/70 focus-visible:outline-none"
            >
              Home
              <span className="absolute bottom-0 left-0 right-0 h-px bg-[#f0c96a]"></span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-[#efe6c8] transition-all duration-300 hover:bg-white/6 hover:text-[#f8f1dc] focus-visible:ring-2 focus-visible:ring-[#f0c96a]/70 focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right action cluster */}
          <div className="flex items-center gap-2">
            {/* Support button - dark translucent pill with gold border */}
            <a
              href="mailto:support@ecohomepalace.com"
              className="hidden xl:flex h-11 items-center gap-2 rounded-full border border-[#d8b45f]/30 bg-white/6 px-4 text-sm font-medium text-[#efe6c8] transition-all duration-300 hover:border-[#d8b45f]/50 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[#f0c96a]/70 focus-visible:outline-none"
            >
              <svg
                className="h-4 w-4 text-[#efe6c8]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Support
            </a>

            {/* Language switcher - dark segmented pill */}
            <div className="hidden sm:flex items-center rounded-full border border-[#d8b45f]/25 bg-white/6 p-0.5">
              <button className="rounded-full bg-[#21c45d] px-3 py-1 text-xs font-semibold text-[#f8f1dc]">
                EN
              </button>
              <button className="rounded-full px-3 py-1 text-xs font-medium text-[#b9c7bd] transition-colors hover:text-[#efe6c8]">
                NL
              </button>
            </div>

            {/* Primary CTA - green gradient with gold ring and dark text */}
            <Link
              href="/intake"
              className="hidden sm:inline-flex h-11 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#21c45d_0%,#16a34a_100%)] px-5 text-sm font-semibold text-[#062018] ring-1 ring-[#f0c96a]/35 shadow-[0_12px_34px_rgba(33,196,93,0.35),0_0_20px_rgba(216,180,95,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(33,196,93,0.45),0_0_25px_rgba(216,180,95,0.22)] focus-visible:ring-2 focus-visible:ring-[#f0c96a]/70 focus-visible:outline-none"
            >
              Compare 3 installers
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            {/* Mobile menu button - dark outlined */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-lg border border-[#d8b45f]/30 bg-white/6 text-[#efe6c8] transition hover:border-[#d8b45f]/50 hover:text-[#f8f1dc] focus-visible:ring-2 focus-visible:ring-[#f0c96a]/70 focus-visible:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
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
          </div>
        </div>

        {/* Trust row - champagne text with gold dividers */}
        <div className="hidden lg:flex items-center justify-between border-t border-[#d8b45f]/12 py-3">
          <div className="flex items-center gap-0 text-xs">
            <div className="flex items-center gap-2 px-4 text-[#f8f1dc]">
              <svg
                className="h-4 w-4 text-[#d8b45f]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-medium">4.8/5 rating</span>
            </div>
            <div className="h-4 w-px border-l border-[#d8b45f]/18"></div>
            <div className="flex items-center gap-2 px-4 text-[#f8f1dc]">
              <svg
                className="h-4 w-4 text-[#21c45d]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-medium">Verified installers</span>
            </div>
            <div className="h-4 w-px border-l border-[#d8b45f]/18"></div>
            <div className="flex items-center gap-2 px-4 text-[#f8f1dc]">
              <div className="h-1.5 w-1.5 rounded-full bg-[#d8b45f]"></div>
              <span className="font-medium">Free comparison</span>
            </div>
            <div className="h-4 w-px border-l border-[#d8b45f]/18"></div>
            <div className="flex items-center gap-2 px-4 text-[#f8f1dc]">
              <svg
                className="h-4 w-4 text-[#d8b45f]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="font-medium">Fast response</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#b9c7bd]">
            <svg
              className="h-4 w-4 text-[#f8f1dc]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">support@ecohomepalace.com</span>
          </div>
        </div>

        {/* Mobile menu - luxury dark theme */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className="rounded-lg px-4 py-3 text-sm font-medium text-[#efe6c8] transition-colors hover:bg-white/6 hover:text-[#f8f1dc] focus-visible:ring-2 focus-visible:ring-[#f0c96a]/70 focus-visible:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-[#efe6c8] transition-colors hover:bg-white/6 hover:text-[#f8f1dc] focus-visible:ring-2 focus-visible:ring-[#f0c96a]/70 focus-visible:outline-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile credibility strip - horizontal scroll */}
              <div className="mt-4 flex gap-6 overflow-x-auto px-4 pb-2 text-xs text-[#efe6c8] scrollbar-hide">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <svg
                    className="h-3.5 w-3.5 text-[#d8b45f]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="font-medium">4.8/5 rating</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <svg
                    className="h-3.5 w-3.5 text-[#21c45d]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium">Verified installers</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#d8b45f]"></div>
                  <span className="font-medium">Free comparison</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <svg
                    className="h-3.5 w-3.5 text-[#d8b45f]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="font-medium">Fast response</span>
                </div>
              </div>

              <div className="mt-4 px-4">
                <a
                  href="mailto:support@ecohomepalace.com"
                  className="flex h-11 items-center gap-2 rounded-lg border border-[#d8b45f]/30 bg-white/6 px-4 text-sm font-medium text-[#efe6c8] transition-colors hover:border-[#d8b45f]/50 hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="h-4 w-4 text-[#efe6c8]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Support
                </a>
              </div>

              <div className="mt-4 px-4">
                <Link
                  href="/intake"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#21c45d_0%,#16a34a_100%)] px-5 text-sm font-semibold text-[#062018] ring-1 ring-[#f0c96a]/35 shadow-[0_12px_34px_rgba(33,196,93,0.35),0_0_20px_rgba(216,180,95,0.16)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#f0c96a]/70 focus-visible:outline-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compare 3 installers
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
