"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type IntakeStep = "confirm" | "context" | "details" | "contact" | "confirmation";

interface IntakeData {
  recommendation: string;
  service: string;
  goal: string;
  country: string;
  propertyType: string;
  ownership: string;
  timeline: string;
  postcode: string;
  houseType: string;
  name: string;
  email: string;
  phone: string;
}

const PROPERTY_TYPES = [
  { id: "house", label: "House", icon: "🏠" },
  { id: "apartment", label: "Apartment", icon: "🏢" },
  { id: "townhouse", label: "Townhouse", icon: "🏘️" },
];

const OWNERSHIP_TYPES = [
  { id: "own", label: "I own the property", icon: "🔑" },
  { id: "rent", label: "I rent the property", icon: "📋" },
];

const TIMELINE_TYPES = [
  { id: "soon", label: "Ready to start soon", icon: "⚡" },
  { id: "exploring", label: "Exploring options", icon: "🔍" },
  { id: "flexible", label: "Flexible timeline", icon: "📅" },
];

const HOUSE_TYPES = [
  { id: "detached", label: "Detached house" },
  { id: "semi-detached", label: "Semi-detached" },
  { id: "terraced", label: "Terraced house" },
  { id: "apartment", label: "Apartment" },
];

export default function IntakeFlow() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<IntakeStep>("confirm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [intakeData, setIntakeData] = useState<IntakeData>({
    recommendation: "",
    service: "",
    goal: "",
    country: "",
    propertyType: "",
    ownership: "",
    timeline: "",
    postcode: "",
    houseType: "",
    name: "",
    email: "",
    phone: "",
  });

  // Initialize data from URL params
  useEffect(() => {
    const service = searchParams.get("service") || "";
    const goal = searchParams.get("goal") || "";
    const country = searchParams.get("country") || "";
    
    // Map service to recommendation
    const recommendationMap: Record<string, string> = {
      "solar": "Solar panels",
      "heat-pumps": "Heat pump",
      "renovation": "Windows & renovation",
      "insulation": "Insulation",
    };

    setIntakeData(prev => ({
      ...prev,
      service,
      goal,
      country,
      recommendation: recommendationMap[service] || "Home improvement",
    }));
  }, [searchParams]);

  const updateIntakeData = (updates: Partial<IntakeData>) => {
    setIntakeData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    const steps: IntakeStep[] = ["confirm", "context", "details", "contact", "confirmation"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: IntakeStep[] = ["confirm", "context", "details", "contact", "confirmation"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const submitIntake = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, submit to backend
      console.log("Submitting intake data:", intakeData);
      
      setIsComplete(true);
    } catch (error) {
      console.error("Error submitting intake:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepNumber = () => {
    const steps: IntakeStep[] = ["confirm", "context", "details", "contact", "confirmation"];
    return steps.indexOf(currentStep) + 1;
  };

  const getTotalSteps = () => {
    return 5;
  };

  // Step 1: Confirm Recommendation
  if (currentStep === "confirm") {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#020a05] via-[#0b2e1d] to-[#020a05]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px bg-emerald-400/20 flex-1 max-w-xs" />
              <span className="text-sm font-medium text-emerald-300/60 uppercase tracking-wider">
                Step {getStepNumber()} of {getTotalSteps()} — Confirm your improvement
              </span>
              <div className="h-px bg-emerald-400/20 flex-1 max-w-xs" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-amber-400/30">
                <span className="text-3xl text-emerald-900">🎯</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
              Complete your {intakeData.recommendation} upgrade
            </h1>
            
            <p className="text-lg text-emerald-200/80 max-w-2xl mx-auto mb-8">
              Based on your home analysis, {intakeData.recommendation.toLowerCase()} is the most effective first step 
              for properties like yours in {intakeData.country === "nl" ? "the Netherlands" : intakeData.country}.
            </p>
          </div>

          {/* Recommendation Card */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-emerald-800/20 to-emerald-800/10 backdrop-blur-sm border border-emerald-700/30 rounded-3xl p-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {intakeData.recommendation}
                </h2>
                <p className="text-emerald-200/80 mb-6">
                  This upgrade typically provides the best return on investment for homes with similar characteristics 
                  to yours, improving both comfort and long-term value.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 rounded-full">
                  <span className="text-amber-300 text-sm">Recommended for your situation</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={nextStep}
              className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-base font-medium text-emerald-950 transition-all hover:bg-amber-300 hover:scale-105 shadow-lg shadow-amber-400/20"
            >
              Continue with this improvement
              <span>→</span>
            </button>
            
            <p className="mt-4 text-sm text-emerald-200/60">
              Takes about 2 minutes to complete your request
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Step 2: Project Context
  if (currentStep === "context") {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#020a05] via-[#0b2e1d] to-[#020a05]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px bg-emerald-400/20 flex-1 max-w-xs" />
              <span className="text-sm font-medium text-emerald-300/60 uppercase tracking-wider">
                Step {getStepNumber()} of {getTotalSteps()} — Project details
              </span>
              <div className="h-px bg-emerald-400/20 flex-1 max-w-xs" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
              Tell us about your project
            </h1>
            <p className="text-lg text-emerald-200/80">
              This helps us match you with the most suitable installers
            </p>
          </div>

          {/* Property Type */}
          <div className="max-w-2xl mx-auto mb-8">
            <h2 className="text-lg font-medium text-white mb-4">Property type</h2>
            <div className="grid gap-3">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateIntakeData({ propertyType: type.id })}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    intakeData.propertyType === type.id
                      ? "border-emerald-400 bg-emerald-400/20"
                      : "border-emerald-700/30 bg-emerald-800/10 hover:border-emerald-600/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-white font-medium">{type.label}</span>
                    {intakeData.propertyType === type.id && (
                      <span className="ml-auto text-emerald-400">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Ownership */}
          <div className="max-w-2xl mx-auto mb-8">
            <h2 className="text-lg font-medium text-white mb-4">Ownership</h2>
            <div className="grid gap-3">
              {OWNERSHIP_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateIntakeData({ ownership: type.id })}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    intakeData.ownership === type.id
                      ? "border-emerald-400 bg-emerald-400/20"
                      : "border-emerald-700/30 bg-emerald-800/10 hover:border-emerald-600/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-white font-medium">{type.label}</span>
                    {intakeData.ownership === type.id && (
                      <span className="ml-auto text-emerald-400">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-lg font-medium text-white mb-4">Timeline</h2>
            <div className="grid gap-3">
              {TIMELINE_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateIntakeData({ timeline: type.id })}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    intakeData.timeline === type.id
                      ? "border-emerald-400 bg-emerald-400/20"
                      : "border-emerald-700/30 bg-emerald-800/10 hover:border-emerald-600/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-white font-medium">{type.label}</span>
                    {intakeData.timeline === type.id && (
                      <span className="ml-auto text-emerald-400">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            <button
              onClick={prevStep}
              className="px-6 py-3 rounded-full border border-emerald-600/50 text-emerald-200 hover:bg-emerald-800/20 transition-all"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!intakeData.propertyType || !intakeData.ownership || !intakeData.timeline}
              className="px-8 py-3 rounded-full bg-amber-400 text-emerald-950 font-medium hover:bg-amber-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Step 3: Home Details
  if (currentStep === "details") {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#020a05] via-[#0b2e1d] to-[#020a05]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px bg-emerald-400/20 flex-1 max-w-xs" />
              <span className="text-sm font-medium text-emerald-300/60 uppercase tracking-wider">
                Step {getStepNumber()} of {getTotalSteps()} — Location details
              </span>
              <div className="h-px bg-emerald-400/20 flex-1 max-w-xs" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
              Where is your property located?
            </h1>
            <p className="text-lg text-emerald-200/80">
              We use this to match you with installers in your area
            </p>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-800/20 to-emerald-800/10 backdrop-blur-sm border border-emerald-700/30 rounded-3xl p-8">
              {/* Postcode */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Postcode *
                </label>
                <input
                  type="text"
                  value={intakeData.postcode}
                  onChange={(e) => updateIntakeData({ postcode: e.target.value })}
                  placeholder="Enter your postcode"
                  className="w-full px-4 py-3 rounded-xl bg-emerald-900/30 border border-emerald-600/50 text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 focus:bg-emerald-900/40 transition-all"
                />
              </div>

              {/* House Type */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  House type (optional)
                </label>
                <select
                  value={intakeData.houseType}
                  onChange={(e) => updateIntakeData({ houseType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-emerald-900/30 border border-emerald-600/50 text-white focus:outline-none focus:border-emerald-400 focus:bg-emerald-900/40 transition-all"
                >
                  <option value="">Select house type</option>
                  {HOUSE_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reassurance */}
              <div className="text-center">
                <p className="text-sm text-emerald-300/60">
                  Your location helps us find the most qualified installers for your area
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prevStep}
              className="px-6 py-3 rounded-full border border-emerald-600/50 text-emerald-200 hover:bg-emerald-800/20 transition-all"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!intakeData.postcode}
              className="px-8 py-3 rounded-full bg-amber-400 text-emerald-950 font-medium hover:bg-amber-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Step 4: Contact Details
  if (currentStep === "contact") {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#020a05] via-[#0b2e1d] to-[#020a05]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px bg-emerald-400/20 flex-1 max-w-xs" />
              <span className="text-sm font-medium text-emerald-300/60 uppercase tracking-wider">
                Step {getStepNumber()} of {getTotalSteps()} — Contact details
              </span>
              <div className="h-px bg-emerald-400/20 flex-1 max-w-xs" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
              Almost done
            </h1>
            <p className="text-lg text-emerald-200/80">
              Add your contact details to receive installer matches
            </p>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-800/20 to-emerald-800/10 backdrop-blur-sm border border-emerald-700/30 rounded-3xl p-8">
              {/* Name */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Full name *
                </label>
                <input
                  type="text"
                  value={intakeData.name}
                  onChange={(e) => updateIntakeData({ name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl bg-emerald-900/30 border border-emerald-600/50 text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 focus:bg-emerald-900/40 transition-all"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Email address *
                </label>
                <input
                  type="email"
                  value={intakeData.email}
                  onChange={(e) => updateIntakeData({ email: e.target.value })}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl bg-emerald-900/30 border border-emerald-600/50 text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 focus:bg-emerald-900/40 transition-all"
                />
              </div>

              {/* Phone */}
              <div className="mb-8">
                <label className="block text-white font-medium mb-2">
                  Phone number (recommended)
                </label>
                <input
                  type="tel"
                  value={intakeData.phone}
                  onChange={(e) => updateIntakeData({ phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-xl bg-emerald-900/30 border border-emerald-600/50 text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 focus:bg-emerald-900/40 transition-all"
                />
                <p className="mt-2 text-sm text-emerald-300/60">
                  Installers often prefer phone contact for project discussions
                </p>
              </div>

              {/* Reassurance */}
              <div className="bg-emerald-900/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-emerald-200 text-center">
                  You will only be contacted by suitable installers for your {intakeData.recommendation.toLowerCase()} project
                </p>
                <p className="text-sm text-emerald-300/60 text-center mt-1">
                  No spam, no random calls
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prevStep}
              className="px-6 py-3 rounded-full border border-emerald-600/50 text-emerald-200 hover:bg-emerald-800/20 transition-all"
            >
              Back
            </button>
            <button
              onClick={submitIntake}
              disabled={!intakeData.name || !intakeData.email || isSubmitting}
              className="px-8 py-3 rounded-full bg-amber-400 text-emerald-950 font-medium hover:bg-amber-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Get matched with installers"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Step 5: Confirmation
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#020a05] via-[#0b2e1d] to-[#020a05]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Content */}
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-amber-400/30">
              {isComplete ? (
                <span className="text-3xl text-emerald-900">✓</span>
              ) : (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-900 border-t-transparent"></div>
              )}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
            {isComplete ? "Request submitted successfully" : "Matching you with suitable installers"}
          </h1>

          <p className="text-lg text-emerald-200/80 max-w-2xl mx-auto mb-12">
            {isComplete 
              ? `We're matching you with verified ${intakeData.recommendation.toLowerCase()} installers in your area. You'll receive contact details within 24-48 hours.`
              : "We're finding the best installers for your specific project requirements..."
            }
          </p>

          {isComplete && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-800/20 to-emerald-800/10 backdrop-blur-sm border border-emerald-700/30 rounded-3xl p-8 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">What happens next?</h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">1</span>
                    <div>
                      <p className="text-white font-medium">We review your project</p>
                      <p className="text-emerald-200/60 text-sm">Our team matches your requirements with suitable installers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">2</span>
                    <div>
                      <p className="text-white font-medium">Installers receive your request</p>
                      <p className="text-emerald-200/60 text-sm">Only qualified installers for your area and project type</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">3</span>
                    <div>
                      <p className="text-white font-medium">You receive quotes</p>
                      <p className="text-emerald-200/60 text-sm">Direct contact from 1-3 verified installers within 24-48 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <a
              href="/"
              className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-base font-medium text-emerald-950 transition-all hover:bg-amber-300 hover:scale-105 shadow-lg shadow-amber-400/20"
            >
              Return to homepage
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
