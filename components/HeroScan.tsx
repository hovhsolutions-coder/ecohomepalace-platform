"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Step = "landing" | "goal" | "country" | "services" | "scanning" | "results";

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface Service {
  id: string;
  name: string;
  icon: string;
  benefit: string;
}

const COUNTRIES: Country[] = [
  { code: "nl", name: "Netherlands", flag: "🇳🇱" },
  { code: "be", name: "Belgium", flag: "🇧🇪" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "pl", name: "Poland", flag: "🇵🇱" },
];

const SERVICES: Service[] = [
  { id: "solar", name: "Solar panels", icon: "☀️", benefit: "Reduce energy costs and increase home value" },
  { id: "heat-pump", name: "Heat pump", icon: "🌡️", benefit: "Efficient heating and cooling year-round" },
  { id: "battery", name: "Home battery", icon: "🔋", benefit: "Store energy and gain independence" },
  { id: "ev-charger", name: "EV charger", icon: "🚗", benefit: "Convenient home charging for electric vehicles" },
  { id: "insulation", name: "Insulation", icon: "🏠", benefit: "Improve comfort and reduce heating costs" },
  { id: "windows", name: "Windows & frames", icon: "🪟", benefit: "Better insulation and modern appearance" },
  { id: "roofing", name: "Roofing", icon: "🏠", benefit: "Protect your home with quality roofing" },
  { id: "bathroom", name: "Bathroom renovation", icon: "🚿", benefit: "Modern comfort and increased home value" },
  { id: "kitchen", name: "Kitchen renovation", icon: "🍳", benefit: "Transform your daily living experience" },
  { id: "full-renovation", name: "Full home renovation", icon: "🔨", benefit: "Complete home transformation" },
  { id: "electrical", name: "Electrical work", icon: "⚡", benefit: "Safe and modern electrical systems" },
  { id: "plumbing", name: "Plumbing", icon: "🚰", benefit: "Reliable plumbing and water systems" },
];

const GOALS = [
  "My energy bill is too high",
  "My home feels cold or uncomfortable",
  "I want to renovate or upgrade",
  "I want to future-proof my home",
  "I want advice first",
];

const SCAN_MESSAGES = [
  "Reading selected goal",
  "Checking country availability", 
  "Combining selected services",
  "Preparing installer match profile",
];

export default function HeroScan() {
  const [step, setStep] = useState<Step>("landing");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [scanMessage, setScanMessage] = useState(0);
  const [scanningComplete, setScanningComplete] = useState(false);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAnalysis = useCallback(() => {
    setStep("goal");
  }, []);

  const selectGoal = useCallback((goal: string) => {
    setSelectedGoal(goal);
    setStep("country");
  }, []);

  const selectCountry = useCallback((country: Country) => {
    setSelectedCountry(country);
    setStep("services");
  }, []);

  const toggleService = useCallback((serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  }, []);

  const runAnalysis = useCallback(() => {
    if (selectedServices.length === 0) return;
    setStep("scanning");
    setScanningComplete(false);
    setScanMessage(0);

    const msgInterval = setInterval(() => {
      setScanMessage(prev => {
        const next = prev + 1;
        if (next >= SCAN_MESSAGES.length) {
          clearInterval(msgInterval);
        }
        return next;
      });
    }, 800);

    scanTimerRef.current = setTimeout(() => {
      setScanningComplete(true);
      setTimeout(() => {
        setStep("results");
      }, 800);
    }, 4000);

    return () => {
      clearInterval(msgInterval);
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
  }, [selectedServices]);

  const restart = useCallback(() => {
    setStep("landing");
    setSelectedGoal(null);
    setSelectedCountry(null);
    setSelectedServices([]);
    setScanningComplete(false);
    setScanMessage(0);
  }, []);

  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950">
      {/* Premium background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,191,36,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_30%,rgba(16,185,129,0.03)_50%,transparent_70%)]" />
      
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-7xl">
          
          {/* Landing Step - Premium Hero */}
          {step === "landing" && (
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left Column - Content */}
              <div className="text-center lg:text-left">
                <div className="mb-6">
                  <p className="text-sm font-medium tracking-[0.22em] text-amber-400/80 uppercase">
                    Home upgrade intelligence
                  </p>
                </div>
                <div className="mb-8">
                  <h1 className="text-4xl font-medium leading-tight text-white md:text-5xl lg:text-6xl">
                    Upgrade your home with{" "}
                    <span className="text-amber-400">selected professionals</span>
                  </h1>
                  <p className="mt-6 text-lg leading-relaxed text-emerald-100 md:text-xl lg:text-2xl">
                    Start with a guided home analysis. We'll map your goal, location and selected upgrades before showing installer options.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={startAnalysis}
                    className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-base font-medium text-emerald-950 transition-all hover:bg-amber-300 hover:scale-105 shadow-lg shadow-amber-400/20"
                  >
                    Start home analysis
                  </button>
                </div>
                
                <div className="mt-8 text-sm text-emerald-200/60">
                  No obligation · Selected installers · Built for serious home upgrades
                </div>
              </div>

              {/* Right Column - Premium Analysis Panel */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-emerald-400/10 rounded-3xl blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Home analysis</h3>
                      <p className="text-emerald-200/60 text-sm">Complete in 60 seconds</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                          <span className="text-emerald-300 text-sm">🎯</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">Goal</div>
                          <div className="text-emerald-200/60 text-sm">Your primary objective</div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400/40" />
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                          <span className="text-emerald-300 text-sm">🌍</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">Country</div>
                          <div className="text-emerald-200/60 text-sm">Regional availability</div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400/40" />
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                          <span className="text-emerald-300 text-sm">⚙️</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">Services</div>
                          <div className="text-emerald-200/60 text-sm">Selected upgrades</div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400/40" />
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center">
                          <span className="text-amber-300 text-sm">👥</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">Installer matches</div>
                          <div className="text-emerald-200/60 text-sm">Verified professionals</div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-amber-400/40" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Goal Step - Premium Cards */}
          {step === "goal" && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="h-px bg-emerald-400/20 flex-1" />
                    <span className="text-sm font-medium text-emerald-300/60 uppercase tracking-wider">Step 1 of 6</span>
                    <div className="h-px bg-emerald-400/20 flex-1" />
                  </div>
                </div>
                <h2 className="text-3xl font-medium text-white md:text-4xl mb-4">
                  What brings you here today?
                </h2>
                <p className="text-lg text-emerald-200/80">
                  Select your primary goal to help us prepare the right upgrade path
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {GOALS.map((goal, index) => (
                  <button
                    key={goal}
                    onClick={() => selectGoal(goal)}
                    className="group relative text-left p-6 rounded-2xl border border-emerald-700/30 bg-gradient-to-br from-emerald-800/20 to-emerald-800/10 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:bg-gradient-to-br hover:from-amber-400/10 hover:to-emerald-400/10 hover:shadow-lg hover:shadow-amber-400/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                        <span className="text-emerald-300 group-hover:text-amber-300 font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-2 group-hover:text-amber-200 transition-colors">{goal}</h3>
                        <p className="text-emerald-200/60 text-sm">
                          {index === 0 && "Focus on energy efficiency and cost reduction"}
                          {index === 1 && "Improve temperature control and living comfort"}
                          {index === 2 && "Modernize spaces and increase home value"}
                          {index === 3 && "Prepare your home for future technologies"}
                          {index === 4 && "Get expert guidance for your project"}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Country Step - Premium with Availability */}
          {step === "country" && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="h-px bg-emerald-400/20 flex-1" />
                    <span className="text-sm font-medium text-emerald-300/60 uppercase tracking-wider">Step 2 of 6</span>
                    <div className="h-px bg-emerald-400/20 flex-1" />
                  </div>
                </div>
                <h2 className="text-3xl font-medium text-white md:text-4xl mb-4">
                  Where is your project located?
                </h2>
                <p className="text-lg text-emerald-200/80">
                  We use your country to prepare relevant installer availability
                </p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => selectCountry(country)}
                    className="group p-6 rounded-2xl border border-emerald-700/30 bg-gradient-to-br from-emerald-800/20 to-emerald-800/10 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:bg-gradient-to-br hover:from-amber-400/10 hover:to-emerald-400/10 hover:shadow-lg hover:shadow-amber-400/10"
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{country.flag}</div>
                      <h3 className="text-white font-medium mb-2 group-hover:text-amber-200 transition-colors">{country.name}</h3>
                      <p className="text-emerald-200/60 text-sm">Premium installers available</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services Step - Premium with Benefits */}
          {step === "services" && (
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="h-px bg-emerald-400/20 flex-1" />
                    <span className="text-sm font-medium text-emerald-300/60 uppercase tracking-wider">Step 3 of 6</span>
                    <div className="h-px bg-emerald-400/20 flex-1" />
                  </div>
                </div>
                <h2 className="text-3xl font-medium text-white md:text-4xl mb-4">
                  What does your project involve?
                </h2>
                <p className="text-lg text-emerald-200/80">
                  Select one or more upgrades. We'll combine them into one project profile.
                </p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`group p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                      selectedServices.includes(service.id)
                        ? "border-amber-400 bg-gradient-to-br from-amber-400/20 to-emerald-400/10 shadow-lg shadow-amber-400/20"
                        : "border-emerald-700/30 bg-gradient-to-br from-emerald-800/20 to-emerald-800/10 hover:border-amber-400/50 hover:bg-gradient-to-br hover:from-amber-400/10 hover:to-emerald-400/10 hover:shadow-lg hover:shadow-amber-400/10"
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-3xl mb-3 group-hover:scale-110 transition-transform ${
                        selectedServices.includes(service.id) ? "text-amber-300" : "text-emerald-300"
                      }`}>
                        {service.icon}
                      </div>
                      <h3 className={`font-medium mb-2 transition-colors ${
                        selectedServices.includes(service.id) ? "text-amber-200" : "text-white"
                      }`}>
                        {service.name}
                      </h3>
                      <p className="text-emerald-200/60 text-sm leading-relaxed">
                        {service.benefit}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <button
                  onClick={runAnalysis}
                  disabled={selectedServices.length === 0}
                  className={`inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-medium transition-all ${
                    selectedServices.length === 0
                      ? "cursor-not-allowed bg-emerald-700/30 text-emerald-300/50"
                      : "bg-amber-400 text-emerald-950 hover:bg-amber-300 hover:scale-105 shadow-lg shadow-amber-400/20"
                  }`}
                >
                  Run home analysis
                </button>
                <p className="mt-4 text-emerald-200/60 text-sm">
                  {selectedServices.length === 0 
                    ? "Select at least one service to continue"
                    : `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`
                  }
                </p>
              </div>
            </div>
          )}

          {/* Scanning Step - Premium Progress */}
          {step === "scanning" && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="h-px bg-emerald-400/20 flex-1" />
                    <span className="text-sm font-medium text-emerald-300/60 uppercase tracking-wider">Step 4 of 6</span>
                    <div className="h-px bg-emerald-400/20 flex-1" />
                  </div>
                </div>
                <h2 className="text-3xl font-medium text-white md:text-4xl mb-4">
                  Analyzing your project
                </h2>
                <p className="text-lg text-emerald-200/80">
                  Preparing your personalized upgrade profile
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-emerald-400/10 rounded-3xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="mb-6">
                    <div className="w-full bg-emerald-800/30 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${((scanMessage + 1) / SCAN_MESSAGES.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {SCAN_MESSAGES.map((message, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          index <= scanMessage
                            ? "bg-emerald-400/10 border border-emerald-400/20"
                            : "bg-emerald-800/20 border border-emerald-700/30 opacity-40"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                          index <= scanMessage ? "bg-emerald-400" : "bg-emerald-700"
                        }`}>
                          {index < scanMessage && (
                            <span className="text-emerald-900 text-xs">✓</span>
                          )}
                          {index === scanMessage && (
                            <div className="w-2 h-2 bg-emerald-900 rounded-full animate-pulse" />
                          )}
                        </div>
                        <span className={`transition-colors ${
                          index <= scanMessage ? "text-emerald-100" : "text-emerald-300/60"
                        }`}>
                          {message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Step - Premium with Match Readiness */}
          {step === "results" && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-amber-400/30">
                    <span className="text-3xl text-emerald-900">✓</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="h-px bg-emerald-400/20 flex-1" />
                    <span className="text-sm font-medium text-emerald-300/60 uppercase tracking-wider">Step 6 of 6</span>
                    <div className="h-px bg-emerald-400/20 flex-1" />
                  </div>
                </div>
                <h2 className="text-3xl font-medium text-white md:text-4xl mb-4">
                  Your home upgrade analysis is ready
                </h2>
                <p className="text-lg text-emerald-200/80">
                  Match readiness: Excellent. Ready to connect with selected installers.
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="bg-gradient-to-br from-emerald-800/20 to-emerald-800/10 backdrop-blur-sm border border-emerald-700/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                      <span className="text-emerald-300 text-sm">🎯</span>
                    </div>
                    <h3 className="text-emerald-300/60 text-sm uppercase tracking-wider">Your goal</h3>
                  </div>
                  <p className="text-white font-medium">{selectedGoal}</p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-800/20 to-emerald-800/10 backdrop-blur-sm border border-emerald-700/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                      <span className="text-emerald-300 text-sm">🌍</span>
                    </div>
                    <h3 className="text-emerald-300/60 text-sm uppercase tracking-wider">Location</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedCountry?.flag}</span>
                    <span className="text-white font-medium">{selectedCountry?.name}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-800/20 to-emerald-800/10 backdrop-blur-sm border border-emerald-700/30 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                    <span className="text-emerald-300 text-sm">⚙️</span>
                  </div>
                  <h3 className="text-emerald-300/60 text-sm uppercase tracking-wider">Selected services</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {selectedServices.map(serviceId => {
                    const service = SERVICES.find(s => s.id === serviceId);
                    return (
                      <span key={serviceId} className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-400/30 px-4 py-2 text-sm text-amber-200">
                        <span>{service?.icon}</span>
                        <span>{service?.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
              
              <div className="text-center">
                <div className="mb-6">
                  <p className="text-emerald-200/80 text-sm mb-4">
                    Recommended next step
                  </p>
                  <p className="text-white text-lg">
                    You'll unlock selected installer matches after a short intake.
                  </p>
                </div>
                
                <a
                  href={`/intake?country=${selectedCountry?.code}&services=${selectedServices.join(",")}&goal=${selectedGoal}`}
                  className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-base font-medium text-emerald-950 transition-all hover:bg-amber-300 hover:scale-105 shadow-lg shadow-amber-400/20"
                >
                  See installer options
                </a>
                
                <div className="mt-6 text-sm text-emerald-200/60">
                  Verified professionals · Personalized matching · Free quotes
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}
