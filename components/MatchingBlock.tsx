'use client';

import { useMemo, useState } from 'react';
import { countryMarkets, publicServiceCatalog } from '@/lib/publicData';

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

  const selectedCity = filteredCities.find((item) => item.slug === city);
  const isComplete = Boolean(selectedServiceOption && country && city);
  const intakeHref = selectedServiceOption
    ? `/intake?service=${selectedServiceOption.intakeSlug}&country=${country}&city=${city}`
    : '/intake';

  let feedback = 'Choose your project details to begin your free comparison.';
  if (selectedServiceOption) {
    feedback = 'We can match this project with suitable professionals.';
  }
  if (selectedCity) {
    feedback = `Matching in ${selectedCity.name} usually starts within 24 hours.`;
  }
  if (isComplete) {
    feedback = 'Ready to prepare your request.';
  }

  return (
    <section className="glass-panel relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(31,93,69,0.28)] to-transparent" />

      <div className="mb-7">
        <p className="section-kicker">Start your comparison</p>
        <h2 className="mt-3 text-2xl font-semibold text-[var(--foreground)] md:text-[2rem]">
          Compare trusted professionals near you
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
          Select your service, country, and city. We use that information to
          prepare a more relevant request before you continue.
        </p>
      </div>

      <div className="grid gap-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--foreground-soft)]">
            Select service
          </span>
          <div className="premium-select">
            <select
              value={selectedService}
              onChange={(event) => setSelectedService(event.target.value)}
              className="w-full bg-transparent text-base text-[var(--foreground)] outline-none"
            >
              <option value="">Choose your project type</option>
              {publicServiceCatalog.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--foreground-soft)]">
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
                className="w-full bg-transparent text-base text-[var(--foreground)] outline-none"
              >
                <option value="">Choose a country</option>
                {countryMarkets.map((market) => (
                  <option key={market.slug} value={market.slug}>
                    {market.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--foreground-soft)]">
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
                className="w-full bg-transparent text-base text-[var(--foreground)] outline-none disabled:cursor-not-allowed"
              >
                <option value="">
                  {country ? 'Choose a city' : 'Select country first'}
                </option>
                {filteredCities.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
      </div>

      <div className="mt-6 rounded-[1.2rem] border border-[rgba(47,138,103,0.16)] bg-[rgba(47,138,103,0.08)] px-4 py-3">
        <div className="flex items-start gap-3">
          <span className="emerald-accent mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-sm">
            ✓
          </span>
          <p className="text-sm leading-6 text-[var(--foreground-soft)]">{feedback}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="emerald-accent rounded-full px-3 py-1.5">
            Free request
          </span>
          <span className="emerald-accent rounded-full px-3 py-1.5">
            No obligation
          </span>
          <span className="emerald-accent rounded-full px-3 py-1.5">
            Trusted professionals
          </span>
        </div>

        <div className="flex flex-col items-end gap-2">
          <a
            href={intakeHref}
            onClick={(event) => {
              if (!isComplete) {
                event.preventDefault();
              }
            }}
            aria-disabled={!isComplete}
            className={`gold-button inline-flex min-h-14 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold ${
              isComplete ? '' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Compare installers in your area
          </a>
          <p className="text-xs text-[var(--foreground-muted)]">
            {isComplete
              ? "Ready — we'll guide you through the next steps."
              : "Select a service, country and city to continue."}
          </p>
        </div>
      </div>
    </section>
  );
}
