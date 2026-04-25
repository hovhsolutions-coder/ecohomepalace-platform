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
  let ctaText = 'Compare 3 installers';
  if (selectedProjectOption && city) {
    ctaText = `Compare 3 installers in ${city}`;
  }

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-10 md:pt-16 bg-[#0b2a22]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(33,196,93,0.08),transparent_50%)]"></div>
      
      <div className="mx-auto max-w-7xl relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left: Content and interaction */}
          <div className="space-y-8">
            {/* Hero content */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21c45d]">
                GLOBAL PLATFORM FOR SMART HOME UPGRADES
              </p>
              <h1 className="mt-4 max-w-[600px] text-[clamp(2.8rem,6vw,4rem)] font-semibold leading-[1.02] text-white">
                Compare 3 verified installers in your area — in minutes
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
                No searching, no uncertainty. Just clear options you can trust.
              </p>
            </div>

            {/* Action question */}
            <div>
              <p className="text-base font-medium text-white mb-4">
                What do you want to improve in your home?
              </p>
              
              {/* Project selector */}
              <div className="grid gap-3 sm:grid-cols-2">
                {heroProjectOptions.map((project) => (
                  <button
                    key={project.slug}
                    onClick={() => setSelectedProject(project.slug)}
                    className={`relative overflow-hidden rounded-[1.2rem] border px-6 py-5 text-left transition-all duration-300 hover:scale-[1.02] ${
                      selectedProject === project.slug
                        ? 'border-[#21c45d] bg-[rgba(33,196,93,0.12)] shadow-[0_0_0_4px_rgba(33,196,93,0.2),0_12px_32px_rgba(33,196,93,0.25)]'
                        : 'border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] hover:border-[rgba(33,196,93,0.4)] hover:bg-[rgba(255,255,255,0.1)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{projectIcons[project.slug]}</span>
                      <p className="font-semibold text-white">{project.label}</p>
                    </div>
                    {selectedProject === project.slug && (
                      <div className="absolute top-5 right-5 h-6 w-6 rounded-full bg-[#21c45d] flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Location selector */}
            {selectedProjectOption && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-[1.2rem] border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] px-5 py-4 text-base text-white outline-none transition-all duration-300 hover:border-[#21c45d]"
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
              </div>
            )}

            {/* CTA */}
            <div>
              <Link
                href={intakeHref}
                onClick={(e) => {
                  if (!isComplete) {
                    e.preventDefault();
                  }
                }}
                className={`inline-flex min-h-16 w-full items-center justify-center rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] ${
                  isComplete
                    ? 'bg-[#21c45d] text-white shadow-[0_16px_40px_rgba(33,196,93,0.4)] hover:bg-[#16a34a] hover:shadow-[0_20px_48px_rgba(33,196,93,0.5)]'
                    : 'bg-[#21c45d] text-white opacity-50 cursor-not-allowed shadow-[0_8px_24px_rgba(33,196,93,0.2)]'
                }`}
              >
                {ctaText}
              </Link>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
              <span className="inline-flex items-center gap-2">
                <span className="text-[#fbbf24]">⭐</span>
                <span>4.8/5 from 10,000+ homeowners</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[#21c45d]">✔</span>
                <span>Verified professionals only</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[#21c45d]">⚡</span>
                <span>Response within 24 hours</span>
              </span>
            </div>
          </div>

          {/* Right: Visual placeholder for installer image */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden border-2 border-[rgba(255,255,255,0.1)] bg-[#101827] shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(33,196,93,0.1)] to-[rgba(21,196,93,0.05)]"></div>
              
              {/* Image placeholder frame */}
              <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center">
                    <span className="text-4xl">🏠</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Verified Installer</p>
                    <p className="text-gray-400 text-sm mt-1">Amsterdam, Netherlands</p>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <span className="text-[#fbbf24]">⭐ 4.9</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-300">Solar Specialist</span>
                  </div>
                </div>
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#101827] via-[#101827]/80 to-transparent px-6 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">Your local matches</p>
                    <p className="text-gray-400 text-sm">Matched within 24 hours</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[#21c45d] flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[rgba(33,196,93,0.15)] rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[rgba(251,191,36,0.1)] rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

