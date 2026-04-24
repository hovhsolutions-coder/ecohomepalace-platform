'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const jobCategories = [
  { name: 'Renovation', icon: '🏗️' },
  { name: 'Painting', icon: '🎨' },
  { name: 'Plumbing', icon: '🔧' },
  { name: 'Electrical', icon: '⚡' },
  { name: 'Roofing', icon: '🏠' },
  { name: 'Solar', icon: '☀️' },
  { name: 'Heat Pumps', icon: '🌡️' },
  { name: 'Windows & Doors', icon: '🪟' },
  { name: 'Insulation', icon: '🧱' },
  { name: 'Bathroom', icon: '🚿' },
  { name: 'Kitchen', icon: '🍳' },
  { name: 'Flooring', icon: '📐' },
]

const urgencyOptions = [
  'As soon as possible',
  'This week',
  'This month',
  'Flexible',
]

const budgetRanges = [
  'Under €1,000',
  '€1,000 - €5,000',
  '€5,000 - €15,000',
  '€15,000+',
  'Not sure yet',
]

const serviceSlugToJobType: Record<string, string> = {
  renovation: 'Renovation',
  painting: 'Painting',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  roofing: 'Roofing',
  solar: 'Solar',
  'heat-pumps': 'Heat Pumps',
  'windows-doors': 'Windows & Doors',
  insulation: 'Insulation',
  bathroom: 'Bathroom',
  kitchen: 'Kitchen',
  flooring: 'Flooring',
}

function IntakePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    const serviceParam = searchParams.get('service')
    const cityParam = searchParams.get('city')

    setFormData((prev) => ({
      ...prev,
      jobType: serviceParam ? serviceSlugToJobType[serviceParam] ?? prev.jobType : prev.jobType,
      city: cityParam
        ? cityParam
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ')
        : prev.city,
    }))
  }, [searchParams])

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < 6) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const thanksParams = new URLSearchParams()

        if (formData.jobType) {
          thanksParams.set('service', formData.jobType)
        }

        if (formData.city) {
          thanksParams.set('city', formData.city)
        }

        const thanksUrl = thanksParams.toString()
          ? `/thanks?${thanksParams.toString()}`
          : '/thanks'

        router.push(thanksUrl)
      } else {
        alert('Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.jobType !== ''
      case 2:
        return formData.country.trim() !== '' && formData.city.trim() !== ''
      case 3:
        return formData.urgency !== ''
      case 4:
        return formData.budgetRange !== ''
      case 5:
        return formData.description.trim() !== ''
      case 6:
        return (
          formData.name.trim() !== '' &&
          formData.email.trim() !== '' &&
          formData.phone.trim() !== ''
        )
      default:
        return false
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold">Tell us what you need</h1>
          <p className="text-gray-400">We use your details to match you with suitable professionals</p>
        </div>

        {/* Progress */}
        <div className="mb-10 flex justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-2 w-10 rounded-full ${
                s <= step ? 'bg-white' : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        {/* Form Steps */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
          {step === 1 && (
            <div>
              <label className="mb-2 block text-lg font-medium">
                What type of work do you need?
              </label>
              <p className="mb-4 text-sm text-gray-400">Select a category</p>
              <div className="grid grid-cols-2 gap-3">
                {jobCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => updateField('jobType', cat.name)}
                    className={`rounded-xl border px-4 py-4 text-center transition ${
                      formData.jobType === cat.name
                        ? 'border-white bg-white text-black'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <span className="mb-1 block text-2xl">{cat.icon}</span>
                    <span className="text-sm">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="mb-2 block text-lg font-medium">
                Where are you located?
              </label>
              <p className="mb-4 text-sm text-gray-400">Enter your country and city</p>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Country</label>
                  <input
                    type="text"
                    placeholder="e.g., Netherlands"
                    value={formData.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">City</label>
                  <input
                    type="text"
                    placeholder="e.g., Amsterdam"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="mb-2 block text-lg font-medium">
                When do you need this done?
              </label>
              <p className="mb-4 text-sm text-gray-400">Select your timeline</p>
              <div className="grid gap-3">
                {urgencyOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => updateField('urgency', option)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      formData.urgency === option
                        ? 'border-white bg-white text-black'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <span className="text-sm">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <label className="mb-2 block text-lg font-medium">
                What is your estimated budget?
              </label>
              <p className="mb-4 text-sm text-gray-400">This helps us match you with the right professionals</p>
              <div className="grid gap-3">
                {budgetRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => updateField('budgetRange', range)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      formData.budgetRange === range
                        ? 'border-white bg-white text-black'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <span className="text-sm">{range}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <label className="mb-2 block text-lg font-medium">
                Describe your project
              </label>
              <p className="mb-4 text-sm text-gray-400">The more details, the better we can match you</p>
              <textarea
                placeholder="Tell us about your project, timeline, specific requirements, or anything else professionals should know..."
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={6}
                className="w-full resize-none rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white"
              />
            </div>
          )}

          {step === 6 && (
            <div>
              <label className="mb-2 block text-lg font-medium">
                Your contact details
              </label>
              <p className="mb-4 text-sm text-gray-400">Professionals will reach out to you directly</p>
              
              <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                <div className="flex items-center gap-2 text-green-400">
                  <span className="text-xl">✓</span>
                  <span className="text-sm font-medium">No obligation • Free request • Response within 24 hours</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="mb-6 rounded-2xl border border-white/10 bg-gray-800/60 p-5 text-left">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                    Your matching request
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                        Selected service
                      </p>
                      <p className="mt-2 text-sm font-medium text-white/85">
                        {formData.jobType || 'Not selected yet'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                        Country
                      </p>
                      <p className="mt-2 text-sm font-medium text-white/85">
                        {formData.country || 'Not provided'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                        City
                      </p>
                      <p className="mt-2 text-sm font-medium text-white/85">
                        {formData.city || 'Not provided'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                        Urgency
                      </p>
                      <p className="mt-2 text-sm font-medium text-white/85">
                        {formData.urgency || 'Not selected yet'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 sm:col-span-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                        Budget range
                      </p>
                      <p className="mt-2 text-sm font-medium text-white/85">
                        {formData.budgetRange || 'Not selected yet'}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-white/60">
                    We&apos;ll use this information to check suitable professionals for your project.
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex gap-4">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="rounded-full border border-gray-700 px-6 py-3 font-medium text-white transition hover:border-gray-500"
              >
                Back
              </button>
            )}
            {step < 6 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="ml-auto rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-600"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid() || loading}
                className="ml-auto rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-600"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          <span>🔒 Your data is secure</span>
          <span>✓ No spam, ever</span>
          <span>⚡ Response within 24h</span>
        </div>
      </div>
    </main>
  )
}

function IntakeFallback() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 text-center">
          <h1 className="text-3xl font-semibold">Tell us what you need</h1>
          <p className="mt-3 text-gray-400">
            Loading your project request...
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
