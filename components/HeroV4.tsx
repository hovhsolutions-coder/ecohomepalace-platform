'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { countryMarkets, heroProjectOptions, countryFlags, defaultCountry } from '@/lib/publicData';
import { IconSolar, IconBattery, IconInsulation, IconRenovation, IconCheck, IconStar, IconLightning } from './icons/MarketplaceIcons';
import { trackEvent } from '@/lib/tracking';
import ImagePanel from './ImagePanel';

const projectIcons: Record<string, React.ReactNode> = {
  'solar-panels': <IconSolar size={32} className="text-white" />,
  'heat-pumps': <IconBattery size={32} className="text-white" />,
  'insulation': <IconInsulation size={32} className="text-white" />,
  'renovation': <IconRenovation size={32} className="text-white" />,
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

  const countryFlag = countryFlags[country] || '';
  const countryName = countryMarkets.find((m) => m.slug === country)?.name || country;

  const isComplete = Boolean(selectedProjectOption && city);
  
  const intakeHref = selectedProjectOption && city
    ? `/intake?service=${selectedProjectOption.slug}&country=${country}&city=${city}`
    : '/intake';

  // CTA text based on state
  let ctaText = 'Compare 3 installers';
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
    <section className="relative overflow-hidden px-6 pb-12 pt-8 md:pt-16 bg-[#0b2a22]">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(33,196,93,0.12),transparent_50%)]"></div>
      
      <div className="mx-auto max-w-7xl relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left: Content and interaction */}
          <div className="space-y-6 md:space-y-8">
            {/* Hero content */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#21c45d] md:text-sm">
                FREE HOME IMPROVEMENT COMPARISON
              </p>
              <h1 className="mt-3 max-w-[600px] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] text-white md:mt-4">
                Compare 3 verified installers in your area
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300 md:text-lg md:leading-8 md:mt-5">
                Access matched installers quickly. No obligation.
              </p>
            </div>

            {/* Geo UX */}
            <div>
              {showCountrySelector ? (
                <div className="inline-flex items-center gap-3">
                  <span className="text-sm text-gray-400">Showing results for:</span>
                  <select
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setCity('');
                    }}
                    onBlur={() => setShowCountrySelector(false)}
                    className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white outline-none hover:border-[#21c45d] transition-colors"
                  >
                    {countryMarkets.map((market) => (
                      <option key={market.slug} value={market.slug}>
                        {market.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowCountrySelector(false)}
                    className="text-sm font-medium text-[#21c45d] hover:underline"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCountrySelector(true)}
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                >
                  Showing results for {countryName} {countryFlag}
                  <span className="font-medium text-[#21c45d]">Change</span>
                </button>
              )}
            </div>

            {/* Action question - Step 1 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#21c45d] text-xs font-bold text-white">1</span>
                <p className="text-base font-medium text-white">
                  What do you want to improve?
                </p>
              </div>
              
              {/* Project selector */}
              <div className="grid gap-3 sm:grid-cols-2">
                {heroProjectOptions.map((project) => (
                  <button
                    key={project.slug}
                    onClick={() => {
                      setSelectedProject(project.slug);
                      trackEvent('hero_project_selected', { 
                        page: 'hero',
                        service: project.slug 
                      });
                    }}
                    className={`relative overflow-hidden rounded-[1.2rem] border px-6 py-5 text-left transition-all duration-300 hover:scale-[1.02] ${
                      selectedProject === project.slug
                        ? 'border-[#21c45d] bg-[rgba(33,196,93,0.15)] shadow-[0_0_0_4px_rgba(33,196,93,0.2),0_12px_32px_rgba(33,196,93,0.3)]'
                        : 'border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] hover:border-[rgba(33,196,93,0.4)] hover:bg-[rgba(255,255,255,0.1)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{projectIcons[project.slug]}</span>
                      <p className="font-semibold text-white">{project.label}</p>
                    </div>
                    {selectedProject === project.slug && (
                      <div className="absolute top-5 right-5 h-6 w-6 rounded-full bg-[#21c45d] flex items-center justify-center shadow-lg">
                        <IconCheck size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* City input - Step 2 (shown after project selection) */}
            {selectedProjectOption && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#21c45d] text-xs font-bold text-white">2</span>
                  <label className="text-sm font-medium text-white">
                    Where is your home?
                  </label>
                </div>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      trackEvent('hero_city_selected', { 
                        page: 'hero',
                        city: e.target.value, 
                        service: selectedProject,
                        country 
                      });
                      
                      // Track funnel start when both project and city are selected
                      if (selectedProject && e.target.value) {
                        trackEvent('funnel_started', { 
                          page: 'hero',
                          service: selectedProject,
                          city: e.target.value,
                          country 
                        });
                      }
                    }}
                    className={`w-full rounded-[1.2rem] border px-5 py-4 text-base text-white outline-none transition-all duration-300 ${
                      city ? 'border-[#21c45d] shadow-[0_0_0_4px_rgba(33,196,93,0.15)]' : 'border-[rgba(255,255,255,0.2)]'
                    } bg-[rgba(255,255,255,0.1)]`}
                  >
                    <option value="">Enter your city (e.g. Amsterdam)</option>
                    {filteredCities.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Micro social proof when project selected */}
                {city && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#21c45d]">
                    <IconCheck size={12} />
                    <span>Most chosen in {city} this week</span>
                  </div>
                )}
              </div>
            )}

            {/* CTA - Final action */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#21c45d] text-xs font-bold text-white">3</span>
                <p className="text-sm font-medium text-white">
                  Get your matches
                </p>
              </div>
              <Link
                href={intakeHref}
                onClick={(e) => {
                  if (!isComplete) {
                    e.preventDefault();
                  } else {
                    trackEvent('hero_cta_clicked', { 
                      page: 'hero',
                      service: selectedProject, 
                      city, 
                      country 
                    });
                    
                    // Track funnel start if not already tracked
                    if (selectedProject && city) {
                      trackEvent('funnel_started', { 
                        page: 'hero',
                        service: selectedProject,
                        city,
                        country 
                      });
                    }
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
              <p className="mt-3 text-sm text-gray-400">
                Takes 30 seconds • No commitment
              </p>
            </div>

            {/* Trust indicators - simplified */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <IconStar size={14} className="text-[#fbbf24]" filled />
                <span>4.8/5 rating</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconCheck size={14} className="text-[#21c45d]" />
                <span>Verified installers</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[#21c45d]">•</span>
                <span>Free comparison</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[#21c45d]">•</span>
                <span>No obligation</span>
              </span>
            </div>

            {/* Live marketplace bar - desktop only, moved below trust to not compete with CTA */}
            <div className="rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] px-5 py-4 hidden md:block">
              <div className="grid gap-3 sm:grid-cols-3 text-center sm:text-left">
                <div className="flex items-center gap-3 sm:block">
                  <div className="h-2 w-2 rounded-full bg-[#21c45d] sm:hidden"></div>
                  <div>
                    <p className="text-base font-semibold text-white">12</p>
                    <p className="text-xs text-gray-400">Installers available</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:block">
                  <div className="h-2 w-2 rounded-full bg-[#21c45d] sm:hidden"></div>
                  <div>
                    <p className="text-base font-semibold text-white">38</p>
                    <p className="text-xs text-gray-400">Quotes today</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:block">
                  <div className="h-2 w-2 rounded-full bg-[#21c45d] sm:hidden"></div>
                  <div>
                    <p className="text-base font-semibold text-white">2h</p>
                    <p className="text-xs text-gray-400">Avg. response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Real image visual - desktop only */}
          <div className="hidden lg:block">
            <ImagePanel 
              imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400"
              alt="Modern residential house with solar panels on roof"
              overlay="dark-green"
              badge="Verified installers"
              badgePosition="top-right"
              className="h-[450px] shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

