'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { countryMarkets, publicServiceCatalog } from '@/lib/publicData'
import { IconStar, IconCheck } from '@/components/icons/MarketplaceIcons'
import { trackEvent } from '@/lib/tracking'

const homeTypes = [
  'Apartment',
  'Terraced house',
  'Semi-detached house',
  'Detached house',
  'New build',
  'Commercial property',
]

const urgencyOptions = [
  'As soon as possible',
  'This month',
  'Within 3 months',
  'Just exploring',
]

const budgetRanges = [
  'Under €5,000',
  '€5,000 - €15,000',
  '€15,000 - €30,000',
  '€30,000+',
  'Not sure yet',
]

function formatSlugLabel(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function IntakePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [homeType, setHomeType] = useState('')
  const [formErrors, setFormErrors] = useState<{
    email?: string
    phone?: string
  }>({})
  const [formData, setFormData] = useState({
    jobType: '',
    country: '',
    city: '',
    urgency: '',
    budgetRange: '',
    description: '',
    name: '',
    email: '',
    phone: '',
  })

  const selectedCountry = useMemo(
    () => countryMarkets.find((item) => item.slug === formData.country),
    [formData.country],
  )

  useEffect(() => {
    const serviceParam = searchParams.get('service')
    const cityParam = searchParams.get('city')
    const countryParam = searchParams.get('country')

    setFormData((prev) => {
      const next = { ...prev }

      if (serviceParam) {
        const match =
          publicServiceCatalog.find((service) => service.slug === serviceParam) ??
          publicServiceCatalog.find((service) => service.intakeSlug === serviceParam)

        if (match) {
          next.jobType = match.title
        }
      }

      if (countryParam) {
        next.country = countryParam
      }

      if (cityParam) {
        const countryMatch = countryMarkets.find((market) => market.slug === countryParam)
        const knownCity =
          countryMatch?.cities.find((city) => city.slug === cityParam)?.name ??
          formatSlugLabel(cityParam)

        next.city = knownCity
      }

      return next
    })
  }, [searchParams])

  // Track drop-off when user leaves intake page
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackEvent('intake_abandoned', { 
        page: 'intake',
        step, 
        service: formData.jobType, 
        city: formData.city,
        country: formData.country 
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [step, formData.jobType, formData.city, formData.country])

  const progress = (step / 3) * 100
  const matchingSummary = [
    formData.jobType || 'Service not selected yet',
    formData.country
      ? countryMarkets.find((item) => item.slug === formData.country)?.name ?? formData.country
      : 'Country not selected yet',
    formData.city || 'City not selected yet',
  ]

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (field === 'email' || field === 'phone') {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Allow international format: +, digits, spaces, hyphens, parentheses
    // Must have at least 8 digits total
    const phoneRegex = /^[\d\+\-\(\)\s]{8,}$/
    const digitCount = (phone.match(/\d/g) || []).length
    return phoneRegex.test(phone) && digitCount >= 8
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return homeType !== '' && formData.jobType !== ''
      case 2:
        return formData.country !== '' && formData.city.trim() !== ''
      case 3:
        const errors: { email?: string; phone?: string } = {}
        if (formData.email.trim() !== '' && !validateEmail(formData.email)) {
          errors.email = 'Please enter a valid email address'
        }
        if (formData.phone.trim() !== '' && !validatePhone(formData.phone)) {
          errors.phone = 'Please enter a valid phone number'
        }
        setFormErrors(errors)
        return (
          formData.name.trim() !== '' &&
          formData.email.trim() !== '' &&
          formData.phone.trim() !== '' &&
          !errors.email &&
          !errors.phone
        )
      default:
        return false
    }
  }

  const nextStep = () => {
    if (step < 3 && isStepValid()) {
      trackEvent(`intake_step_${step}_completed`, { 
        page: 'intake',
        step,
        service: formData.jobType, 
        city: formData.city,
        country: formData.country 
      })
      setStep(step + 1)
      if (step + 1 === 3) {
        trackEvent('intake_step_3_started', { 
          page: 'intake',
          step: 3,
          service: formData.jobType, 
          city: formData.city,
          country: formData.country 
        })
      }
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    const summaryDescription = [
      homeType ? `Home type: ${homeType}` : '',
      formData.description ? `Project notes: ${formData.description}` : '',
      formData.urgency ? `Urgency: ${formData.urgency}` : '',
      formData.budgetRange ? `Budget: ${formData.budgetRange}` : '',
    ]
      .filter(Boolean)
      .join(' | ')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          description: summaryDescription,
        }),
      })

      if (response.ok) {
        trackEvent('intake_form_submitted', { 
          page: 'intake',
          step: 3,
          service: formData.jobType, 
          city: formData.city,
          country: formData.country,
          homeType,
          urgency: formData.urgency,
          budgetRange: formData.budgetRange
        })
        
        const thanksParams = new URLSearchParams()

        if (formData.jobType) {
          thanksParams.set('service', formData.jobType)
        }

        if (formData.city) {
          thanksParams.set('city', formData.city)
        }

        router.push(
          thanksParams.toString() ? `/thanks?${thanksParams.toString()}` : '/thanks',
        )
        return
      }

      alert('Something went wrong. Please try again.')
      setLoading(false)
    } catch {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 bg-[#0b2a22] text-white md:py-16">
      {/* Subtle grid pattern matching homepage */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(33,196,93,0.12),transparent_50%)]"></div>
      
      <div className="mx-auto max-w-3xl relative">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#21c45d] md:text-sm">
            FREE HOME IMPROVEMENT COMPARISON
          </p>
          
          {/* Personalized intro based on query params */}
          {formData.jobType && formData.city ? (
            <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.02] md:mt-4">
              Compare 3 verified installers for {formData.jobType} in {formData.city}
            </h1>
          ) : formData.jobType ? (
            <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.02] md:mt-4">
              Compare 3 verified installers for {formData.jobType}
            </h1>
          ) : (
            <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.02] md:mt-4">
              Compare 3 verified installers in your area
            </h1>
          )}
          
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-300 md:text-lg md:leading-8 md:mt-5">
            Access matched installers quickly. No obligation.
          </p>

          {/* Compact trust reinforcement */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
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

          {/* Marketplace context */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Active installers in your area • Fast response times
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-[#0f172a] p-6 sm:p-8 border border-[rgba(255,255,255,0.1)] shadow-2xl">
          <div className="mb-8">
            <div className="flex items-center justify-between gap-4 text-sm text-gray-400">
              <span>Step {step} of 3: {step === 1 ? 'Project' : step === 2 ? 'Location' : 'Contact'}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]">
              <div
                className="h-full rounded-full bg-[#21c45d] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                What type of home do you have?
              </h2>

              <div className="mt-6 grid gap-3">
                {homeTypes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setHomeType(option)}
                    className={`relative overflow-hidden rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all duration-200 hover:scale-[1.01] ${
                      homeType === option
                        ? 'border-[#21c45d] bg-[rgba(33,196,93,0.15)] text-white shadow-[0_0_0_3px_rgba(33,196,93,0.2),0_8px_24px_rgba(33,196,93,0.3)]'
                        : 'border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] text-gray-300 hover:border-[rgba(33,196,93,0.4)] hover:bg-[rgba(255,255,255,0.1)]'
                    }`}
                  >
                    {option}
                    {homeType === option && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <IconCheck size={20} className="text-[#21c45d]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {homeType && (
                <p className="mt-3 text-xs text-[#21c45d]">
                  ✓ Home type selected
                </p>
              )}

              <div className="mt-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  What are you interested in?
                </h2>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {publicServiceCatalog.map((service) => (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => updateField('jobType', service.title)}
                    className={`relative overflow-hidden rounded-xl border px-5 py-4 text-left transition-all duration-200 hover:scale-[1.01] ${
                      formData.jobType === service.title
                        ? 'border-[#21c45d] bg-[rgba(33,196,93,0.15)] shadow-[0_0_0_3px_rgba(33,196,93,0.2),0_8px_24px_rgba(33,196,93,0.3)]'
                        : 'border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] hover:border-[rgba(33,196,93,0.4)] hover:bg-[rgba(255,255,255,0.1)]'
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#21c45d]">
                      {service.eyebrow}
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {service.title}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-gray-400">
                      {service.description}
                    </p>
                    {formData.jobType === service.title && (
                      <div className="absolute right-4 top-4">
                        <IconCheck size={20} className="text-[#21c45d]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {formData.jobType && (
                <p className="mt-3 text-xs text-[#21c45d]">
                  ✓ Service selected
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Where is your home located?
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-300">
                    Country
                  </span>
                  <div className="rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-3.5 transition focus-within:border-[#21c45d] focus-within:shadow-[0_0_0_3px_rgba(33,196,93,0.15)]">
                    <select
                      value={formData.country}
                      onChange={(event) => {
                        updateField('country', event.target.value)
                        updateField('city', '')
                      }}
                      className="w-full bg-transparent text-base text-white outline-none"
                    >
                      <option value="" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Choose a country</option>
                      {countryMarkets.map((market) => (
                        <option key={market.slug} value={market.slug} style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                          {market.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-300">
                    City
                  </span>
                  <div className={`rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-3.5 transition focus-within:border-[#21c45d] focus-within:shadow-[0_0_0_3px_rgba(33,196,93,0.15)] ${formData.country ? '' : 'opacity-60'}`}>
                    <select
                      value={formData.city}
                      onChange={(event) => updateField('city', event.target.value)}
                      disabled={!formData.country}
                      className="w-full bg-transparent text-base text-white outline-none"
                    >
                      <option value="" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                        {formData.country ? 'Choose a city' : 'Select country first'}
                      </option>
                      {(selectedCountry?.cities ?? []).map((city) => (
                        <option key={city.slug} value={city.name} style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-300">
                    Urgency
                  </span>
                  <div className="rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-3.5 transition focus-within:border-[#21c45d] focus-within:shadow-[0_0_0_3px_rgba(33,196,93,0.15)]">
                    <select
                      value={formData.urgency}
                      onChange={(event) => updateField('urgency', event.target.value)}
                      className="w-full bg-transparent text-base text-white outline-none"
                    >
                      <option value="" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Select timing</option>
                      {urgencyOptions.map((option) => (
                        <option key={option} value={option} style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-300">
                    Budget range
                  </span>
                  <div className="rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-3.5 transition focus-within:border-[#21c45d] focus-within:shadow-[0_0_0_3px_rgba(33,196,93,0.15)]">
                    <select
                      value={formData.budgetRange}
                      onChange={(event) => updateField('budgetRange', event.target.value)}
                      className="w-full bg-transparent text-base text-white outline-none"
                    >
                      <option value="" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Select budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <label className="mt-6 block">
                <span className="mb-2 block text-sm font-medium text-gray-300">
                  Project notes (optional)
                </span>
                <textarea
                  value={formData.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  rows={3}
                  placeholder="Optional details about your project, property, or preferences."
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-white outline-none transition focus:border-[#21c45d] focus:shadow-[0_0_0_3px_rgba(33,196,93,0.15)]"
                />
              </label>

              {formData.city && (
                <p className="mt-3 text-xs text-[#21c45d]">
                  ✓ Location set
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-sm font-semibold text-[#21c45d]">
                Almost done — just your contact details
              </p>
              <p className="mt-1 text-xs text-gray-400">
                You'll receive 3 installer options within 24 hours
              </p>

              <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-white">
                How should installers contact you?
              </h2>

              <div className="mt-6 rounded-xl border border-[rgba(33,196,93,0.3)] bg-[rgba(33,196,93,0.08)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#21c45d]">
                  Your matching request
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {matchingSummary.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm text-gray-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-3.5 text-white outline-none transition focus:border-[#21c45d] focus:shadow-[0_0_0_3px_rgba(33,196,93,0.15)]"
                />
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className={`w-full rounded-xl border bg-[rgba(255,255,255,0.05)] px-4 py-3.5 text-white outline-none transition focus:shadow-[0_0_0_3px_rgba(33,196,93,0.15)] ${
                      formErrors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[rgba(255,255,255,0.15)] focus:border-[#21c45d]'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-2 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className={`w-full rounded-xl border bg-[rgba(255,255,255,0.05)] px-4 py-3.5 text-white outline-none transition focus:shadow-[0_0_0_3px_rgba(33,196,93,0.15)] ${
                      formErrors.phone
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[rgba(255,255,255,0.15)] focus:border-[#21c45d]'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-2 text-sm text-red-500">{formErrors.phone}</p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    Only used so matched professionals can contact you about your request.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Free comparison</span>
              <span>•</span>
              <span>No obligation</span>
              <span>•</span>
              <span>Takes about 1 minute</span>
            </div>
            <div className="flex gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-6 py-3 font-medium text-gray-300 transition hover:border-[rgba(33,196,93,0.4)] hover:text-white"
                >
                  Back
                </button>
              ) : null}

              {step < 3 ? (
                <div className="flex flex-col items-end gap-1">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 font-semibold bg-[#21c45d] text-white shadow-[0_16px_40px_rgba(33,196,93,0.4)] hover:bg-[#16a34a] hover:shadow-[0_20px_48px_rgba(33,196,93,0.5)] transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue
                  </button>
                  <p className="text-xs text-gray-500">
                    {step === 1 ? 'Takes a few seconds' : step === 2 ? 'We use this to find local installers' : ''}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-end gap-1">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isStepValid() || loading}
                    className="inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 font-semibold bg-[#21c45d] text-white shadow-[0_16px_40px_rgba(33,196,93,0.4)] hover:bg-[#16a34a] hover:shadow-[0_20px_48px_rgba(33,196,93,0.5)] transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? 'Sending request…' : 'Get my 3 installer options'}
                  </button>
                  <p className="text-xs text-gray-500">
                    Installers will contact you directly
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function IntakeFallback() {
  return (
    <main className="min-h-screen px-6 py-20 bg-[#0b2a22] text-white">
      {/* Subtle grid pattern matching homepage */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(33,196,93,0.12),transparent_50%)]"></div>
      
      <div className="mx-auto max-w-xl relative">
        <div className="rounded-2xl bg-[#0f172a] p-8 text-center border border-[rgba(255,255,255,0.1)] shadow-2xl">
          <h1 className="text-3xl font-semibold text-white">Compare trusted professionals</h1>
          <p className="mt-3 text-gray-400">
            Loading your project comparison...
          </p>
        </div>
      </div>
    </main>
  )
}

export default function IntakePage() {
  return (
    <Suspense fallback={<IntakeFallback />}>
      <IntakePageContent />
    </Suspense>
  )
}
