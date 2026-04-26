"use client";

import { useState, useCallback } from "react";
import { createLead } from "@/lib/marketplaceService";

type IntakeStep = "confirm" | "context" | "home" | "contact" | "confirmation";

interface IntakeData {
  service: string;
  intakeSlug: string;
  impact: string;
  whyItMatters: string;
  propertyType: string;
  ownership: string;
  timeline: string;
  postcode: string;
  name: string;
  email: string;
  phone: string;
}

interface IntakeFlowProps {
  initialService: string;
  initialSlug: string;
  initialImpact: string;
  initialWhyItMatters: string;
}

const PROPERTY_TYPES = [
  { id: "house", label: "House" },
  { id: "apartment", label: "Apartment" },
  { id: "townhouse", label: "Townhouse" },
  { id: "other", label: "Other" },
];

const OWNERSHIP_TYPES = [
  { id: "own", label: "I own the property" },
  { id: "rent", label: "I rent the property" },
];

const TIMELINE_OPTIONS = [
  { id: "soon", label: "Starting soon" },
  { id: "exploring", label: "Just exploring" },
  { id: "flexible", label: "Flexible timeline" },
];

export default function IntakeFlow({
  initialService,
  initialSlug,
  initialImpact,
  initialWhyItMatters,
}: IntakeFlowProps) {
  const [step, setStep] = useState<IntakeStep>("confirm");
  const [data, setData] = useState<Partial<IntakeData>>({
    service: initialService,
    intakeSlug: initialSlug,
    impact: initialImpact,
    whyItMatters: initialWhyItMatters,
  });

  const updateData = useCallback((key: keyof IntakeData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const nextStep = useCallback(() => {
    const steps: IntakeStep[] = ["confirm", "context", "home", "contact", "confirmation"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  }, [step]);

  const prevStep = useCallback(() => {
    const steps: IntakeStep[] = ["confirm", "context", "home", "contact", "confirmation"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  }, [step]);

  const getStepNumber = () => {
    const steps: IntakeStep[] = ["confirm", "context", "home", "contact", "confirmation"];
    return steps.indexOf(step) + 1;
  };

  const getTotalSteps = () => {
    return 4; // confirmation is not counted as a step
  };

  const getProgressLabel = () => {
    const stepNum = getStepNumber();
    const total = getTotalSteps();
    switch (stepNum) {
      case 1:
        return `Almost done — step ${stepNum} of ${total}`;
      case 2:
        return `You're making great progress — step ${stepNum} of ${total}`;
      case 3:
        return `Almost there — step ${stepNum} of ${total}`;
      case 4:
        return `Final details — step ${stepNum} of ${total}`;
      default:
        return `Step ${stepNum} of ${total}`;
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#020a05]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020a05] via-[#0a1f12] to-[#020a05]" />

      {/* Content container */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-20">
        {/* Progress indicator */}
        {step !== "confirmation" && (
          <div className="mb-8 flex items-center gap-2">
            <div className="h-0.5 w-8 bg-[var(--emerald-300)]/60" />
            <p className="text-xs font-medium tracking-wide text-white/40">
              {getProgressLabel()}
            </p>
            <div className="h-0.5 w-8 bg-[var(--emerald-300)]/60" />
          </div>
        )}

        {/* ==================== STEP 1: CONFIRM RECOMMENDATION ==================== */}
        {step === "confirm" && (
          <div className="flex w-full flex-col items-center transition-all duration-700 animate-fadeInUp">
            <p className="text-center text-[11px] text-white/30">
              Takes about 60 seconds
            </p>
            <p className="mt-4 text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--emerald-300)]">
              Recommended for your home
            </p>
            <h1 className="mt-4 text-center text-3xl font-medium text-white sm:text-4xl">
              {data.service}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-white/50">
              {data.whyItMatters}
            </p>
            <p className="mt-3 text-center text-sm font-medium text-[var(--gold-300)]">
              {data.impact}
            </p>

            <div className="mt-10 w-full max-w-sm">
              <button
                type="button"
                onClick={nextStep}
                className="gold-button w-full rounded-full px-8 py-3.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
              >
                Continue with this improvement
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="mt-4 w-full text-center text-xs text-white/30 transition hover:text-white/50"
              >
                Go back
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 2: PROJECT CONTEXT ==================== */}
        {step === "context" && (
          <div className="flex w-full max-w-md flex-col transition-all duration-700 animate-fadeInUp">
            <h2 className="text-center text-xl font-medium text-white sm:text-2xl">
              Tell us about your property
            </h2>
            <p className="mt-3 text-center text-sm text-white/50">
              This helps us match you with the right installers.
            </p>

            {/* Property type */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-white/70">Property type</p>
              <div className="grid grid-cols-2 gap-2">
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => updateData("propertyType", type.id)}
                    className={`rounded-xl border p-3 text-sm transition-all ${
                      data.propertyType === type.id
                        ? "border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)] text-[var(--emerald-300)]"
                        : "border-white/[0.06] bg-white/[0.02] text-white/70 hover:border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ownership */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-white/70">Ownership</p>
              <div className="space-y-2">
                {OWNERSHIP_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => updateData("ownership", type.id)}
                    className={`w-full rounded-xl border p-3 text-left text-sm transition-all ${
                      data.ownership === type.id
                        ? "border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)] text-[var(--emerald-300)]"
                        : "border-white/[0.06] bg-white/[0.02] text-white/70 hover:border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-white/70">Timeline</p>
              <div className="space-y-2">
                {TIMELINE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateData("timeline", option.id)}
                    className={`w-full rounded-xl border p-3 text-left text-sm transition-all ${
                      data.timeline === option.id
                        ? "border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)] text-[var(--emerald-300)]"
                        : "border-white/[0.06] bg-white/[0.02] text-white/70 hover:border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {data.timeline && (
                <p className="mt-2 text-[11px] text-[var(--emerald-300)]/60">
                  Got it — this narrows down the right installers
                </p>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 rounded-full border border-white/10 px-6 py-3 text-sm text-white/50 transition hover:border-white/20 hover:text-white/70"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!data.propertyType || !data.ownership || !data.timeline}
                className="gold-button flex-1 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 3: HOME DETAILS ==================== */}
        {step === "home" && (
          <div className="flex w-full max-w-md flex-col transition-all duration-700 animate-fadeInUp">
            <h2 className="text-center text-xl font-medium text-white sm:text-2xl">
              Where is your property located?
            </h2>
            <p className="mt-3 text-center text-sm text-white/50">
              We only use this to find installers in your area.
            </p>

            <div className="mt-8">
              <label htmlFor="postcode" className="mb-2 block text-sm font-medium text-white/70">
                Postcode
              </label>
              <input
                id="postcode"
                type="text"
                value={data.postcode || ""}
                onChange={(e) => updateData("postcode", e.target.value)}
                placeholder="e.g. 1000 AA"
                className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-border)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-300)]/50"
              />
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 rounded-full border border-white/10 px-6 py-3 text-sm text-white/50 transition hover:border-white/20 hover:text-white/70"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!data.postcode}
                className="gold-button flex-1 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 4: CONTACT DETAILS ==================== */}
        {step === "contact" && (
          <div className="flex w-full max-w-md flex-col transition-all duration-700 animate-fadeInUp">
            {/* Reward anticipation */}
            <div className="mb-6 rounded-xl border border-[var(--gold-border)]/40 bg-[rgba(247,209,123,0.04)] p-4">
              <p className="text-center text-sm text-[var(--gold-300)]">
                You're about to see the most suitable installers for your project.
              </p>
            </div>

            <h2 className="text-center text-xl font-medium text-white sm:text-2xl">
              How should installers contact you?
            </h2>
            <p className="mt-3 text-center text-sm text-white/50">
              You will only be contacted by suitable installers.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/70">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={data.name || ""}
                  onChange={(e) => updateData("name", e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-border)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-300)]/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={data.email || ""}
                  onChange={(e) => updateData("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-border)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-300)]/50"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/70">
                  Phone number <span className="text-white/40">(optional but recommended)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={data.phone || ""}
                  onChange={(e) => updateData("phone", e.target.value)}
                  placeholder="+31 6 12345678"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-border)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-300)]/50"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2 text-center">
              <p className="text-[11px] text-white/30">
                Your details are only used to connect you with suitable installers.
              </p>
              <p className="text-[11px] text-white/30">
                You stay in control — no obligations.
              </p>
              <p className="text-[11px] text-white/30">
                No spam, no random calls. Only verified installers will contact you.
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 rounded-full border border-white/10 px-6 py-3 text-sm text-white/50 transition hover:border-white/20 hover:text-white/70"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  // Create lead in marketplace data
                  createLead({
                    service: data.service || "",
                    serviceName: data.service || "",
                    impact: data.impact || "",
                    whyItMatters: data.whyItMatters || "",
                    propertyType: data.propertyType as any,
                    ownership: data.ownership as any,
                    timeline: data.timeline as any,
                    postcode: data.postcode || "",
                    region: "Unknown", // Will be derived from postcode in production
                    homeownerName: data.name || "",
                    homeownerEmail: data.email || "",
                    homeownerPhone: data.phone,
                  });
                  nextStep();
                }}
                disabled={!data.name || !data.email}
                className="gold-button flex-1 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit request
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 5: CONFIRMATION ==================== */}
        {step === "confirmation" && (
          <div className="flex w-full max-w-md flex-col items-center transition-all duration-700 animate-fadeInUp">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)]">
              <svg className="h-8 w-8 text-[var(--emerald-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-center text-2xl font-medium text-white">
              Request submitted
            </h2>
            <p className="mt-3 text-center text-sm text-white/50">
              We are matching you with suitable installers for your {data.service} project.
            </p>
            <p className="mt-2 text-center text-xs text-white/35">
              Verified installers typically respond within 24 hours with free quotes tailored to your home.
            </p>

            {/* What happens next */}
            <div className="mt-8 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="mb-3 text-sm font-medium text-white/70">What happens next</p>
              <ol className="space-y-2 text-xs text-white/50">
                <li className="flex gap-2">
                  <span className="text-[var(--emerald-300)]">1.</span>
                  <span>We match your request with suitable installers</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--emerald-300)]">2.</span>
                  <span>You receive tailored quotes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--emerald-300)]">3.</span>
                  <span>You choose what fits your needs</span>
                </li>
              </ol>
            </div>

            <div className="mt-8 w-full">
              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="gold-button w-full rounded-full px-8 py-3.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
              >
                Return to home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
