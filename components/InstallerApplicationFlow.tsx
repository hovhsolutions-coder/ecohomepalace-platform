"use client";

import { useState, useCallback } from "react";
import { ServiceType, MembershipTier } from "@/lib/matching";
import { createInstallerApplication } from "@/lib/marketplaceService";

type ApplicationStep = "company" | "services" | "region" | "capacity" | "review" | "confirmation";

interface ApplicationData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  services: ServiceType[];
  mainPostcode: string;
  serviceRadius: number;
  region: string;
  monthlyCapacity: string;
  isCertified: boolean;
  hasInsurance: boolean;
  yearsOfExperience: string;
  website: string;
}

const SERVICE_OPTIONS: { id: ServiceType; label: string }[] = [
  { id: "solar", label: "Solar panels" },
  { id: "heat-pumps", label: "Heat pumps" },
  { id: "insulation", label: "Insulation" },
  { id: "renovation", label: "Renovation" },
  { id: "roofing", label: "Roofing" },
  { id: "electrical", label: "Electrical" },
  { id: "bathroom", label: "Bathroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "other", label: "Other" },
];

const RADIUS_OPTIONS = [
  { id: 10, label: "10 km" },
  { id: 25, label: "25 km" },
  { id: 50, label: "50 km" },
  { id: 75, label: "75 km" },
  { id: 999, label: "Netherlands-wide" },
];

const CAPACITY_OPTIONS = [
  { id: "1-3", label: "1-3 projects per month" },
  { id: "4-8", label: "4-8 projects per month" },
  { id: "9-15", label: "9-15 projects per month" },
  { id: "16+", label: "16+ projects per month" },
];

export default function InstallerApplicationFlow() {
  const [step, setStep] = useState<ApplicationStep>("company");
  const [data, setData] = useState<Partial<ApplicationData>>({});

  const updateData = useCallback((key: keyof ApplicationData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleService = useCallback((serviceId: ServiceType) => {
    setData((prev) => {
      const services = prev.services || [];
      const newServices = services.includes(serviceId)
        ? services.filter((s) => s !== serviceId)
        : [...services, serviceId];
      return { ...prev, services: newServices };
    });
  }, []);

  const nextStep = useCallback(() => {
    const steps: ApplicationStep[] = ["company", "services", "region", "capacity", "review", "confirmation"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  }, [step]);

  const prevStep = useCallback(() => {
    const steps: ApplicationStep[] = ["company", "services", "region", "capacity", "review", "confirmation"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  }, [step]);

  const getStepNumber = () => {
    const steps: ApplicationStep[] = ["company", "services", "region", "capacity", "review", "confirmation"];
    return steps.indexOf(step) + 1;
  };

  const getTotalSteps = () => {
    return 5; // confirmation is not counted
  };

  const getProgressLabel = () => {
    const stepNum = getStepNumber();
    const total = getTotalSteps();
    switch (stepNum) {
      case 1:
        return `Application — step ${stepNum} of ${total}`;
      case 2:
        return `Almost done — step ${stepNum} of ${total}`;
      case 3:
        return `Almost there — step ${stepNum} of ${total}`;
      case 4:
        return `Final details — step ${stepNum} of ${total}`;
      case 5:
        return `Review — step ${stepNum} of ${total}`;
      default:
        return `Step ${stepNum} of ${total}`;
    }
  };

  const submitApplication = useCallback(() => {
    // Store application in localStorage
    if (data.companyName && data.contactPerson && data.email && data.phone && data.services && data.mainPostcode && data.serviceRadius && data.region && data.monthlyCapacity && data.yearsOfExperience) {
      createInstallerApplication({
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        services: data.services,
        mainPostcode: data.mainPostcode,
        serviceRadius: data.serviceRadius,
        region: data.region,
        monthlyCapacity: data.monthlyCapacity,
        isCertified: data.isCertified || false,
        hasInsurance: data.hasInsurance || false,
        yearsOfExperience: data.yearsOfExperience,
        website: data.website,
      });
    }
    nextStep();
  }, [data, nextStep]);

  return (
    <section className="relative min-h-screen w-full bg-[#020a05]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020a05] via-[#0a1f12] to-[#020a05]" />

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

        {/* ==================== STEP 1: COMPANY BASICS ==================== */}
        {step === "company" && (
          <div className="flex w-full max-w-md flex-col transition-all duration-700 animate-fadeInUp">
            <h2 className="text-center text-xl font-medium text-white sm:text-2xl">
              Company information
            </h2>
            <p className="mt-3 text-center text-sm text-white/50">
              Tell us about your business
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-white/70">
                  Company name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={data.companyName || ""}
                  onChange={(e) => updateData("companyName", e.target.value)}
                  placeholder="Your company name"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-border)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-300)]/50"
                />
              </div>

              <div>
                <label htmlFor="contactPerson" className="mb-2 block text-sm font-medium text-white/70">
                  Contact person
                </label>
                <input
                  id="contactPerson"
                  type="text"
                  value={data.contactPerson || ""}
                  onChange={(e) => updateData("contactPerson", e.target.value)}
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
                  placeholder="your@company.com"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-border)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-300)]/50"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/70">
                  Phone number
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

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => (window.location.href = "/installers")}
                className="flex-1 rounded-full border border-white/10 px-6 py-3 text-sm text-white/50 transition hover:border-white/20 hover:text-white/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!data.companyName || !data.contactPerson || !data.email || !data.phone}
                className="gold-button flex-1 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 2: SERVICES ==================== */}
        {step === "services" && (
          <div className="flex w-full max-w-md flex-col transition-all duration-700 animate-fadeInUp">
            <h2 className="text-center text-xl font-medium text-white sm:text-2xl">
              What services do you offer?
            </h2>
            <p className="mt-3 text-center text-sm text-white/50">
              Select all that apply
            </p>

            <div className="mt-8 grid grid-cols-2 gap-2">
              {SERVICE_OPTIONS.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`rounded-xl border p-3 text-sm transition-all ${
                    data.services?.includes(service.id)
                      ? "border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)] text-[var(--emerald-300)]"
                      : "border-white/[0.06] bg-white/[0.02] text-white/70 hover:border-white/10 hover:bg-white/[0.05]"
                  }`}
                >
                  {service.label}
                </button>
              ))}
            </div>

            {data.services && data.services.length > 0 && (
              <p className="mt-4 text-center text-[11px] text-[var(--emerald-300)]/60">
                Great — this helps us match you with the right projects
              </p>
            )}

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
                disabled={!data.services || data.services.length === 0}
                className="gold-button flex-1 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 3: REGION ==================== */}
        {step === "region" && (
          <div className="flex w-full max-w-md flex-col transition-all duration-700 animate-fadeInUp">
            <h2 className="text-center text-xl font-medium text-white sm:text-2xl">
              Where do you operate?
            </h2>
            <p className="mt-3 text-center text-sm text-white/50">
              We use this to match you with local requests
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label htmlFor="mainPostcode" className="mb-2 block text-sm font-medium text-white/70">
                  Main postcode / city
                </label>
                <input
                  id="mainPostcode"
                  type="text"
                  value={data.mainPostcode || ""}
                  onChange={(e) => updateData("mainPostcode", e.target.value)}
                  placeholder="e.g. 1000 AA or Amsterdam"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-border)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-300)]/50"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-white/70">Service radius</p>
                <div className="space-y-2">
                  {RADIUS_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => updateData("serviceRadius", option.id)}
                      className={`w-full rounded-xl border p-3 text-left text-sm transition-all ${
                        data.serviceRadius === option.id
                          ? "border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)] text-[var(--emerald-300)]"
                          : "border-white/[0.06] bg-white/[0.02] text-white/70 hover:border-white/10 hover:bg-white/[0.05]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
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
                disabled={!data.mainPostcode || !data.serviceRadius}
                className="gold-button flex-1 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 4: CAPACITY & QUALITY ==================== */}
        {step === "capacity" && (
          <div className="flex w-full max-w-md flex-col transition-all duration-700 animate-fadeInUp">
            <h2 className="text-center text-xl font-medium text-white sm:text-2xl">
              Capacity and quality
            </h2>
            <p className="mt-3 text-center text-sm text-white/50">
              Help us understand your capabilities
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <p className="mb-3 text-sm font-medium text-white/70">Projects per month</p>
                <div className="space-y-2">
                  {CAPACITY_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => updateData("monthlyCapacity", option.id)}
                      className={`w-full rounded-xl border p-3 text-left text-sm transition-all ${
                        data.monthlyCapacity === option.id
                          ? "border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)] text-[var(--emerald-300)]"
                          : "border-white/[0.06] bg-white/[0.02] text-white/70 hover:border-white/10 hover:bg-white/[0.05]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-white/70">Years of experience</p>
                <input
                  type="number"
                  value={data.yearsOfExperience || ""}
                  onChange={(e) => updateData("yearsOfExperience", e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-border)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-300)]/50"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.isCertified || false}
                    onChange={(e) => updateData("isCertified", e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/[0.02] text-[var(--emerald-300)] focus:ring-[var(--emerald-300)]/50"
                  />
                  <span className="text-sm text-white/70">We are certified</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.hasInsurance || false}
                    onChange={(e) => updateData("hasInsurance", e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/[0.02] text-[var(--emerald-300)] focus:ring-[var(--emerald-300)]/50"
                  />
                  <span className="text-sm text-white/70">We have business insurance</span>
                </label>
              </div>

              <div>
                <label htmlFor="website" className="mb-2 block text-sm font-medium text-white/70">
                  Website <span className="text-white/40">(optional)</span>
                </label>
                <input
                  id="website"
                  type="url"
                  value={data.website || ""}
                  onChange={(e) => updateData("website", e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-border)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-300)]/50"
                />
              </div>
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
                disabled={!data.monthlyCapacity || !data.yearsOfExperience}
                className="gold-button flex-1 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review application
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 5: REVIEW ==================== */}
        {step === "review" && (
          <div className="flex w-full max-w-md flex-col transition-all duration-700 animate-fadeInUp">
            <h2 className="text-center text-xl font-medium text-white sm:text-2xl">
              Review your application
            </h2>
            <p className="mt-3 text-center text-sm text-white/50">
              Please confirm your details before submitting
            </p>

            <div className="mt-8 space-y-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
              <div>
                <p className="text-xs font-medium text-white/40">Company</p>
                <p className="mt-1 text-sm text-white">{data.companyName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-white/40">Contact</p>
                <p className="mt-1 text-sm text-white">{data.contactPerson}</p>
                <p className="text-sm text-white/60">{data.email}</p>
                <p className="text-sm text-white/60">{data.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-white/40">Services</p>
                <p className="mt-1 text-sm text-white">
                  {data.services?.map((s) => SERVICE_OPTIONS.find((opt) => opt.id === s)?.label).join(", ")}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-white/40">Region</p>
                <p className="mt-1 text-sm text-white">{data.mainPostcode}</p>
                <p className="text-sm text-white/60">
                  {RADIUS_OPTIONS.find((r) => r.id === data.serviceRadius)?.label}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-white/40">Capacity</p>
                <p className="mt-1 text-sm text-white">
                  {CAPACITY_OPTIONS.find((c) => c.id === data.monthlyCapacity)?.label}
                </p>
                <p className="text-sm text-white/60">{data.yearsOfExperience} years experience</p>
              </div>
              <div>
                <p className="text-xs font-medium text-white/40">Quality</p>
                <p className="mt-1 text-sm text-white">
                  {data.isCertified && "✓ Certified"}
                  {data.isCertified && data.hasInsurance && " · "}
                  {data.hasInsurance && "✓ Insured"}
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[11px] text-white/30">
                We review every installer before showing them to homeowners.
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
                onClick={submitApplication}
                className="gold-button flex-1 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
              >
                Submit application
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 6: CONFIRMATION ==================== */}
        {step === "confirmation" && (
          <div className="flex w-full max-w-md flex-col items-center transition-all duration-700 animate-fadeInUp">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)]">
              <svg className="h-8 w-8 text-[var(--emerald-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-center text-2xl font-medium text-white">
              Application received
            </h2>
            <p className="mt-3 text-center text-sm text-white/50">
              Thank you for your interest in joining Eco Home Palace.
            </p>
            <p className="mt-2 text-center text-xs text-white/35">
              We review every installer before showing them to homeowners. You will hear from us within 3-5 business days.
            </p>

            <div className="mt-8 w-full">
              <button
                type="button"
                onClick={() => (window.location.href = "/installers")}
                className="gold-button w-full rounded-full px-8 py-3.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
              >
                Return to installers page
              </button>
            </div>
          </div>
        )}
      </div>

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
