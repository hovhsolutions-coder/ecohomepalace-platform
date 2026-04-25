'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { countryMarkets, heroProjectOptions, countryFlags, defaultCountry } from '@/lib/publicData';

const projectIcons: Record<string, string> = {
  'solar-panels': '☀️',
  'heat-pumps': '🔋',
  'insulation': '🛡️',
  'renovation': '🔧',
};

export default function HeroV4() {
  const [selectedProject, setSelectedProject] = useState('');
  const [country, setCountry] = useState(defaultCountry);
  const [city, setCity] = useState('');
  const [showCountrySelector, setShowCountrySelector] = useState(false);

  const selectedProjectOption = heroProjectOptions.find((p) => p.slug === selectedProject);
  
  const filteredCities = useMemo(() => {
    return countryMarkets.find((market) => market.slug === country)?.cities ?? [];
  }, [country]);

  const countryFlag = countryFlags[country] || '🌍';
  const countryName = countryMarkets.find((m) => m.slug === country)?.name || country;

  const isComplete = Boolean(selectedProjectOption && city);
  
  const intakeHref = selectedProjectOption && city
    ? `/intake?service=${selectedProjectOption.slug}&country=${country}&city=${city}`
    : '/intake';

  // CTA text based on state
  let ctaText = 'Show my matches';
  if (selectedProjectOption && !city) {
    ctaText = 'Choose your city to continue';
  } else if (selectedProjectOption && city) {
    ctaText = `Compare 3 installers in ${city}`;
  }

  // Result preview panel title
  let resultTitle = 'Your matches';
  if (selectedProjectOption && city) {
    resultTitle = `Your matches in ${city}`;
  }

  // Specialist label for preview rows
  const specialistLabel = selectedProjectOption?.specialist || 'Verified installer';

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-10 md:pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(31,93,69,0.02)] via-[rgba(47,138,103,0.03)] to-[rgba(199,141,47,0.02)]"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[rgba(47,138,103,0.08)] rounded-full blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl relative">
        {/* Hero kicker and headline */}
        <div className="mb-6">
          <p className="section-kicker">GLOBAL PLATFORM FOR SMART HOME UPGRADES</p>
          <p className="mt-3 text-base font-medium text-[rgba(220,38,38,0.8)]">
            Stop wasting time comparing installers
          </p>
          <h1 className="mt-4 max-w-[600px] text-[clamp(2.8rem,6vw,4rem)] font-semibold leading-[1.02] text-[var(--foreground)]">
            Compare 3 verified installers in your area — in minutes
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--foreground-soft)]">
            No searching, no uncertainty. Just clear options you can trust.
          </p>
        </div>

        {/* Geo UX */}
        <div className="mb-6">
          {showCountrySelector ? (
            <div className="inline-flex items-center gap-3">
              <span className="text-sm text-[var(--foreground-soft)]">Showing results for:</span>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCity('');
                }}
                onBlur={() => setShowCountrySelector(false)}
                className="premium-select inline-flex min-h-10 items-center rounded-full border border-[rgba(31,93,69,0.2)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)]"
              >
                {countryMarkets.map((market) => (
                  <option key={market.slug} value={market.slug}>
                    {market.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowCountrySelector(false)}
                className="text-sm font-medium text-[var(--primary-600)] hover:underline"
              >
                Done
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowCountrySelector(true)}
              className="inline-flex items-center gap-2 text-sm text-[var(--foreground-soft)] hover:text-[var(--foreground)] transition"
            >
              Showing results for {countryName} {countryFlag}
              <span className="font-medium text-[var(--primary-600)]">Change</span>
            </button>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left: Interaction module */}
          <div className="space-y-6">
            {/* Project selector */}
            <div>
              <label className="mb-3 block text-sm font-medium text-[var(--foreground)]">
                Choose your project
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                {heroProjectOptions.map((project) => (
                  <button
                    key={project.slug}
                    onClick={() => setSelectedProject(project.slug)}
                    className={`relative overflow-hidden rounded-[1.2rem] border px-6 py-5 text-left transition-all duration-300 hover:scale-[1.02] ${
                      selectedProject === project.slug
                        ? 'border-[#1f6f54] bg-[rgba(31,111,84,0.08)] shadow-[0_0_0_4px_rgba(31,111,84,0.15),0_12px_32px_rgba(31,111,84,0.2)]'
                        : 'border-[rgba(20,35,25,0.1)] bg-white hover:border-[rgba(31,111,84,0.3)] hover:shadow-[0_8px_24px_rgba(31,93,69,0.12)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{projectIcons[project.slug]}</span>
                      <p className="font-semibold text-[var(--foreground)]">{project.label}</p>
                    </div>
                    {selectedProject === project.slug && (
                      <div className="absolute top-5 right-5 h-6 w-6 rounded-full bg-[#1f6f54] flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* City input (shown after project selection) */}
            {selectedProjectOption && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="mb-3 block text-sm font-medium text-[var(--foreground)]">
                  Where is your home?
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`premium-select w-full rounded-[1.2rem] border px-5 py-4 text-base text-[var(--foreground)] outline-none transition-all duration-300 ${
                      city ? 'border-[#1f6f54] shadow-[0_0_0_4px_rgba(31,111,84,0.15)]' : 'border-[rgba(20,35,25,0.12)]'
                    }`}
                  >
                    <option value="">Enter your city (e.g. Amsterdam)</option>
                    {filteredCities.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-4">
              <Link
                href={intakeHref}
                onClick={(e) => {
                  if (!isComplete) {
                    e.preventDefault();
                  }
                }}
                className={`inline-flex min-h-16 w-full items-center justify-center rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] ${
                  isComplete
                    ? 'bg-[#1f6f54] text-white shadow-[0_16px_40px_rgba(0,0,0,0.2)] hover:bg-[#145c44] hover:shadow-[0_20px_48px_rgba(0,0,0,0.25)]'
                    : 'bg-[#1f6f54] text-white opacity-50 cursor-not-allowed shadow-[0_8px_24px_rgba(31,111,84,0.15)]'
                }`}
              >
                {ctaText}
              </Link>
              <p className="mt-3 text-sm text-[var(--foreground-muted)]">
                Free • No obligation • Takes less than 30 seconds
              </p>
            </div>

            {/* Trust line */}
            <div className="flex flex-wrap gap-4 text-sm text-[var(--foreground-soft)]">
              <span className="inline-flex items-center gap-2">
                <span className="text-[var(--gold-300)]">⭐</span>
                <span>4.8/5 from 10,000+ homeowners</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[var(--primary-600)]">✔</span>
                <span>Verified professionals only</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[var(--primary-600)]">⚡</span>
                <span>Response within 24 hours</span>
              </span>
            </div>
          </div>

          {/* Right: Dark result preview panel */}
          <div className="result-panel relative overflow-hidden rounded-[1.85rem] bg-[#0f172a] shadow-[0_24px_56px_rgba(15,23,42,0.4)] border border-[rgba(255,255,255,0.1)]">
            <div className="border-b border-[rgba(255,255,255,0.1)] px-6 py-5 bg-[#1e293b]">
              <p className="text-sm font-semibold text-white">{resultTitle}</p>
              <p className="mt-1 text-xs text-gray-400">Matched within 24 hours</p>
            </div>

            <div className="divide-y divide-[rgba(255,255,255,0.08)]">
              {[1, 2, 3].map((num) => (
                <div key={num} className="px-6 py-5 flex items-center justify-between gap-4 transition hover:bg-[#1e293b]">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#334155] text-white text-sm font-semibold">
                      {specialistLabel.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm">
                        {specialistLabel} {city ? `in ${city}` : ''}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                        <span className="text-[var(--gold-300)]">⭐ 4.{8 - num + 1}</span>
                        <span>•</span>
                        <span>€{(4 + num) * 1000} – €{(6 + num) * 1000}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                    Available this week
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[rgba(255,255,255,0.1)] px-6 py-4 bg-[#1e293b]">
              <p className="text-xs text-center text-gray-400">
                Based on your project and location • All professionals verified
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
