'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { countryMarkets, publicServiceCatalog } from '@/lib/publicData'

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
      setStep(step + 1)
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
    <main className="premium-shell min-h-screen px-6 py-10 text-[var(--foreground)] md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="section-kicker">Project comparison</p>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            Compare trusted professionals in a few quick steps
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
            Takes less than 1 minute. Free and without obligation. We only
            connect you with trusted professionals.
          </p>
        </div>

        <div className="glass-panel mt-10 rounded-[1.85rem] p-6 sm:p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between gap-4 text-sm text-[var(--foreground-soft)]">
              <span>Step {step} of 3: {step === 1 ? 'Project' : step === 2 ? 'Location' : 'Contact'}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(20,35,25,0.08)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#3b8568,#1f5d45)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-3xl font-semibold">Tell us about your project</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                What type of home do you have and what are you interested in?
              </p>

              <div className="mt-8 grid gap-4">
                <div>
                  <label className="mb-3 block text-sm font-medium text-[var(--foreground-soft)]">
                    Home type
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {homeTypes.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setHomeType(option)}
                        className={`rounded-[1.2rem] border px-5 py-4 text-left text-sm font-medium transition ${
                          homeType === option
                            ? 'border-[rgba(31,93,69,0.24)] bg-[rgba(47,138,103,0.08)] text-[var(--foreground)]'
                            : 'border-[rgba(20,35,25,0.08)] bg-white/80 text-[var(--foreground-soft)] hover:border-[rgba(31,93,69,0.18)]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-[var(--foreground-soft)]">
                    Service interest
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {publicServiceCatalog.map((service) => (
                      <button
                        key={service.slug}
                        type="button"
                        onClick={() => updateField('jobType', service.title)}
                        className={`rounded-[1.2rem] border px-5 py-4 text-left transition ${
                          formData.jobType === service.title
                            ? 'border-[rgba(31,93,69,0.24)] bg-[rgba(47,138,103,0.08)]'
                            : 'border-[rgba(20,35,25,0.08)] bg-white/80 hover:border-[rgba(31,93,69,0.18)]'
                        }`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-600)]">
                          {service.eyebrow}
                        </p>
                        <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                          {service.title}
                        </p>
                        <p className="mt-1 text-sm leading-7 text-[var(--foreground-soft)]">
                          {service.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-semibold">Where is your home located?</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                We ask location details after you've chosen your project, so matching stays relevant.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[var(--foreground-soft)]">
                    Country
                  </span>
                  <div className="premium-select">
                    <select
                      value={formData.country}
                      onChange={(event) => {
                        updateField('country', event.target.value)
                        updateField('city', '')
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
                    City
                  </span>
                  <div className={`premium-select ${formData.country ? '' : 'opacity-60'}`}>
                    <select
                      value={formData.city}
                      onChange={(event) => updateField('city', event.target.value)}
                      disabled={!formData.country}
                      className="w-full bg-transparent text-base text-[var(--foreground)] outline-none"
                    >
                      <option value="">
                        {formData.country ? 'Choose a city' : 'Select country first'}
                      </option>
                      {(selectedCountry?.cities ?? []).map((city) => (
                        <option key={city.slug} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[var(--foreground-soft)]">
                    Urgency
                  </span>
                  <div className="premium-select">
                    <select
                      value={formData.urgency}
                      onChange={(event) => updateField('urgency', event.target.value)}
                      className="w-full bg-transparent text-base text-[var(--foreground)] outline-none"
                    >
                      <option value="">Select timing</option>
                      {urgencyOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[var(--foreground-soft)]">
                    Budget range
                  </span>
                  <div className="premium-select">
                    <select
                      value={formData.budgetRange}
                      onChange={(event) => updateField('budgetRange', event.target.value)}
                      className="w-full bg-transparent text-base text-[var(--foreground)] outline-none"
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-medium text-[var(--foreground-soft)]">
                  Project notes (optional)
                </span>
                <textarea
                  value={formData.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  rows={3}
                  placeholder="Optional details about your project, property, or preferences."
                  className="w-full rounded-[1.2rem] border border-[rgba(20,35,25,0.08)] bg-white/82 px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[rgba(31,93,69,0.24)] focus:shadow-[0_0_0_4px_rgba(47,138,103,0.08)]"
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl font-semibold">Contact details</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                Your request is free and without obligation. We only connect you with trusted professionals.
              </p>

              <div className="mt-6 rounded-[1.4rem] border border-[rgba(47,138,103,0.16)] bg-[rgba(47,138,103,0.08)] p-5">
                <p className="section-kicker">Your matching request</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {matchingSummary.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1rem] border border-[rgba(20,35,25,0.08)] bg-white/76 px-4 py-3 text-sm text-[var(--foreground-soft)]"
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
                  className="w-full rounded-[1.2rem] border border-[rgba(20,35,25,0.08)] bg-white/82 px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[rgba(31,93,69,0.24)] focus:shadow-[0_0_0_4px_rgba(47,138,103,0.08)]"
                />
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className={`w-full rounded-[1.2rem] border bg-white/82 px-4 py-3 text-[var(--foreground)] outline-none transition focus:shadow-[0_0_0_4px_rgba(47,138,103,0.08)] ${
                      formErrors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[rgba(20,35,25,0.08)] focus:border-[rgba(31,93,69,0.24)]'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className={`w-full rounded-[1.2rem] border bg-white/82 px-4 py-3 text-[var(--foreground)] outline-none transition focus:shadow-[0_0_0_4px_rgba(47,138,103,0.08)] ${
                      formErrors.phone
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[rgba(20,35,25,0.08)] focus:border-[rgba(31,93,69,0.24)]'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                  <p className="mt-2 text-xs text-[var(--foreground-muted)]">
                    Only used so matched professionals can contact you about your request.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(20,35,25,0.1)] bg-white/78 px-6 py-3 font-medium text-[var(--foreground-soft)] transition hover:border-[rgba(31,93,69,0.18)] hover:text-[var(--foreground)]"
              >
                Back
              </button>
            ) : null}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="gold-button ml-auto inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid() || loading}
                className="gold-button ml-auto inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Sending request…' : 'Submit Request'}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function IntakeFallback() {
  return (
    <main className="premium-shell min-h-screen px-6 py-20 text-[var(--foreground)]">
      <div className="mx-auto max-w-xl">
        <div className="glass-panel rounded-[1.75rem] p-8 text-center">
          <h1 className="text-3xl font-semibold">Compare trusted professionals</h1>
          <p className="mt-3 text-[var(--foreground-soft)]">
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
