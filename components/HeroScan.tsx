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
}

const COUNTRIES: Country[] = [
  { code: "nl", name: "Netherlands", flag: "🇳🇱" },
  { code: "be", name: "Belgium", flag: "🇧🇪" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "pl", name: "Poland", flag: "🇵🇱" },
];

const SERVICES: Service[] = [
  { id: "solar", name: "Solar panels", icon: "☀️" },
  { id: "heat-pump", name: "Heat pump", icon: "🌡️" },
  { id: "battery", name: "Home battery", icon: "🔋" },
  { id: "ev-charger", name: "EV charger", icon: "🚗" },
  { id: "insulation", name: "Insulation", icon: "🏠" },
  { id: "windows", name: "Windows & frames", icon: "🪟" },
  { id: "roofing", name: "Roofing", icon: "🏠" },
  { id: "bathroom", name: "Bathroom renovation", icon: "🚿" },
  { id: "kitchen", name: "Kitchen renovation", icon: "🍳" },
  { id: "full-renovation", name: "Full home renovation", icon: "🔨" },
  { id: "electrical", name: "Electrical work", icon: "⚡" },
  { id: "plumbing", name: "Plumbing", icon: "🚰" },
];

const GOALS = [
  "My energy bill is too high",
  "My home feels cold or uncomfortable",
  "I want to renovate or upgrade",
  "I want to future-proof my home",
  "I want advice first",
];

const SCAN_MESSAGES = [
  "Analysing your home upgrade profile",
  "Checking selected services",
  "Preparing installer match criteria",
  "Estimating project complexity",
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
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl">
          
          {/* Landing Step */}
          {step === "landing" && (
            <div className="text-center">
              <div className="mb-8">
                <h1 className="text-4xl font-medium leading-tight text-white md:text-6xl">
                  Upgrade your home with{" "}
                  <span className="text-amber-400">trusted professionals</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-emerald-100 md:text-xl">
                  Tell us what you want to improve. We'll scan your home needs 
                  and prepare selected installer matches.
                </p>
              </div>
              
              <button
                onClick={startAnalysis}
                className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-base font-medium text-emerald-950 transition-all hover:bg-amber-300 hover:scale-105"
              >
                Start home analysis
              </button>
              
              <div className="mt-8 text-sm text-emerald-200/60">
                Premium matching · Verified installers · No obligation
              </div>
            </div>
          )}

          {/* Goal Step */}
          {step === "goal" && (
            <div className="max-w-2xl">
              <h2 className="text-center text-2xl font-medium text-white md:text-3xl">
                What brings you here today?
              </h2>
              
              <div className="mt-8 space-y-3">
                {GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => selectGoal(goal)}
                    className="w-full rounded-xl border border-emerald-700/30 bg-emerald-800/20 p-4 text-left transition-all hover:border-emerald-600/50 hover:bg-emerald-800/30"
                  >
                    <span className="text-emerald-100">{goal}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Country Step */}
          {step === "country" && (
            <div className="max-w-2xl">
              <h2 className="text-center text-2xl font-medium text-white md:text-3xl">
                Select your country
              </h2>
              
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => selectCountry(country)}
                    className="flex items-center gap-3 rounded-xl border border-emerald-700/30 bg-emerald-800/20 p-4 transition-all hover:border-emerald-600/50 hover:bg-emerald-800/30"
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-emerald-100">{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services Step */}
          {step === "services" && (
            <div className="max-w-3xl">
              <h2 className="text-center text-2xl font-medium text-white md:text-3xl">
                What does your project involve?
              </h2>
              
              <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                      selectedServices.includes(service.id)
                        ? "border-amber-400 bg-amber-400/10"
                        : "border-emerald-700/30 bg-emerald-800/20 hover:border-emerald-600/50 hover:bg-emerald-800/30"
                    }`}
                  >
                    <span className="text-xl">{service.icon}</span>
                    <span className="text-sm text-emerald-100">{service.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <button
                  onClick={runAnalysis}
                  disabled={selectedServices.length === 0}
                  className={`inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-medium transition-all ${
                    selectedServices.length === 0
                      ? "cursor-not-allowed bg-emerald-700/30 text-emerald-300/50"
                      : "bg-amber-400 text-emerald-950 hover:bg-amber-300 hover:scale-105"
                  }`}
                >
                  Run home analysis
                </button>
              </div>
            </div>
          )}

          {/* Scanning Step */}
          {step === "scanning" && (
            <div className="text-center">
              <div className="mb-8">
                <div className="mx-auto h-16 w-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
              </div>
              
              <h3 className="text-xl font-medium text-white">
                {SCAN_MESSAGES[scanMessage] || SCAN_MESSAGES[SCAN_MESSAGES.length - 1]}
              </h3>
              
              <div className="mt-4 text-emerald-200/60">
                Preparing your personalized upgrade plan...
              </div>
            </div>
          )}

          {/* Results Step */}
          {step === "results" && (
            <div className="max-w-2xl">
              <div className="text-center">
                <div className="mb-6">
                  <div className="mx-auto h-16 w-16 rounded-full bg-amber-400 flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-medium text-white md:text-3xl">
                  Your home upgrade analysis is ready
                </h2>
                
                <div className="mt-8 space-y-4 text-left">
                  <div className="rounded-xl border border-emerald-700/30 bg-emerald-800/20 p-4">
                    <div className="text-sm text-emerald-300/60">Your goal</div>
                    <div className="text-emerald-100">{selectedGoal}</div>
                  </div>
                  
                  <div className="rounded-xl border border-emerald-700/30 bg-emerald-800/20 p-4">
                    <div className="text-sm text-emerald-300/60">Location</div>
                    <div className="flex items-center gap-2">
                      <span>{selectedCountry?.flag}</span>
                      <span className="text-emerald-100">{selectedCountry?.name}</span>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border border-emerald-700/30 bg-emerald-800/20 p-4">
                    <div className="text-sm text-emerald-300/60">Selected services</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedServices.map(serviceId => {
                        const service = SERVICES.find(s => s.id === serviceId);
                        return (
                          <span key={serviceId} className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-200">
                            {service?.icon} {service?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <a
                    href={`/intake?country=${selectedCountry?.code}&services=${selectedServices.join(",")}&goal=${selectedGoal}`}
                    className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-base font-medium text-emerald-950 transition-all hover:bg-amber-300 hover:scale-105"
                  >
                    See installer options
                  </a>
                </div>
                
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
