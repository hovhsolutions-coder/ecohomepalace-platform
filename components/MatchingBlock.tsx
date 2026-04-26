'use client';

import { useMemo, useState } from 'react';
import {
  countryMarkets,
  publicServiceCatalog,
} from '@/lib/publicData';

export default function MatchingBlock() {
  const [selectedService, setSelectedService] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const selectedServiceOption = publicServiceCatalog.find(
    (service) => service.slug === selectedService,
  );

  const filteredCities = useMemo(() => {
    return countryMarkets.find((market) => market.slug === country)?.cities ?? [];
  }, [country]);

  const isComplete = Boolean(selectedServiceOption && country && city);
  const intakeHref = selectedServiceOption
    ? `/intake?service=${selectedServiceOption.intakeSlug}&country=${country}&city=${city}`
    : '/intake';

  let feedback = 'Select your project details to begin premium matching.';
  if (selectedServiceOption) {
    feedback = 'We can match this project with suitable professionals.';
  }
  if (city) {
    const cityLabel = filteredCities.find((item) => item.slug === city)?.name ?? city;
    feedback = `Matching in ${cityLabel} usually starts within 24 hours.`;
  }
  if (isComplete) {
    feedback = 'Ready to prepare your request.';
  }

  return (
    <section className="glass-panel relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-300)]/60 to-transparent" />

      <div className="mb-7">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold-300)]/75">
          Premium matching
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
          Prepare your request in one step
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-white/68">
          Choose the service, country, and city first. We use that context to
          prepare a more relevant request before you continue.
        </p>
      </div>

      <div className="grid gap-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/78">
            Select service
          </span>
          <div className="premium-select">
            <select
              value={selectedService}
              onChange={(event) => setSelectedService(event.target.value)}
              className="w-full bg-transparent text-base text-white outline-none"
            >
              <option value="" className="bg-[#07111f] text-white/60">
                Choose a project type
              </option>
              {publicServiceCatalog.map((service) => (
                <option
                  key={service.slug}
                  value={service.slug}
                  className="bg-[#07111f] text-white"
                >
                  {service.title}
                </option>
              ))}
            </select>
          </div>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/78">
              Select country
            </span>
            <div className="premium-select">
              <select
                value={country}
                onChange={(event) => {
                  const nextCountry = event.target.value;
                  setCountry(nextCountry);
                  setCity('');
                }}
                className="w-full bg-transparent text-base text-white outline-none"
              >
                <option value="" className="bg-[#07111f] text-white/60">
                  Choose a country
                </option>
                {countryMarkets.map((market) => (
                  <option
                    key={market.slug}
                    value={market.slug}
                    className="bg-[#07111f] text-white"
                  >
                    {market.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/78">
              Select city
            </span>
            <div
              className={`premium-select ${
                country ? '' : 'cursor-not-allowed opacity-60'
              }`}
            >
              <select
                value={city}
                onChange={(event) => setCity(event.target.value)}
                disabled={!country}
                className="w-full bg-transparent text-base text-white outline-none disabled:cursor-not-allowed"
              >
                <option value="" className="bg-[#07111f] text-white/60">
                  {country ? 'Choose a city' : 'Select country first'}
                </option>
                {filteredCities.map((item) => (
                  <option
                    key={item.slug}
                    value={item.slug}
                    className="bg-[#07111f] text-white"
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
      </div>

      <div className="mt-6 rounded-[1.4rem] border border-emerald-400/20 bg-emerald-400/8 px-4 py-3">
        <div className="flex items-start gap-3">
          <span className="emerald-accent mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-sm">
            ✓
          </span>
          <p className="text-sm leading-6 text-white/82">{feedback}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 text-xs text-white/60">
          <span className="emerald-accent rounded-full px-3 py-1.5">
            Free request
          </span>
          <span className="emerald-accent rounded-full px-3 py-1.5">
            No obligation
          </span>
          <span className="emerald-accent rounded-full px-3 py-1.5">
            24-hour matching
          </span>
        </div>

        <a
          href={intakeHref}
          onClick={(event) => {
            if (!isComplete) {
              event.preventDefault();
            }
          }}
          aria-disabled={!isComplete}
          className={`gold-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold ${
            isComplete ? '' : 'pointer-events-auto opacity-55'
          }`}
        >
          Start Project
        </a>
      </div>
    </section>
  );
}
