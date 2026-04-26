"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Step = "landing" | "scanning" | "goal" | "results";

interface Zone {
  id: string;
  label: string;
  service: string;
  intakeSlug: string;
  top: string;
  left: string;
  width: string;
  height: string;
  scanIndex: number;
}

interface GoalOption {
  id: string;
  label: string;
  description: string;
}

interface ZoneInsight {
  label: string;
  insight: string;
  type: "high" | "needs" | "recommended" | "explore" | "consider";
  service: string;
  intakeSlug: string;
  zone: string;
  whyItMatters: string;
  consequence: string;
  impact: string;
  nextAction: string;
}

const ZONES: Zone[] = [
  {
    id: "roof",
    label: "Roof",
    service: "Solar panels",
    intakeSlug: "solar",
    top: "10%",
    left: "30%",
    width: "40%",
    height: "18%",
    scanIndex: 0,
  },
  {
    id: "windows",
    label: "Windows",
    service: "Windows & renovation",
    intakeSlug: "renovation",
    top: "36%",
    left: "24%",
    width: "42%",
    height: "14%",
    scanIndex: 1,
  },
  {
    id: "insulation",
    label: "Walls",
    service: "Insulation",
    intakeSlug: "insulation",
    top: "28%",
    left: "18%",
    width: "64%",
    height: "38%",
    scanIndex: 2,
  },
  {
    id: "heating",
    label: "Heating",
    service: "Heat pump",
    intakeSlug: "heat-pumps",
    top: "58%",
    left: "72%",
    width: "10%",
    height: "14%",
    scanIndex: 3,
  },
  {
    id: "kitchen",
    label: "Kitchen",
    service: "Kitchen renovation",
    intakeSlug: "kitchen",
    top: "56%",
    left: "28%",
    width: "22%",
    height: "24%",
    scanIndex: 4,
  },
  {
    id: "bathroom",
    label: "Bathroom",
    service: "Bathroom renovation",
    intakeSlug: "bathroom",
    top: "60%",
    left: "56%",
    width: "18%",
    height: "22%",
    scanIndex: 5,
  },
];

const GOALS: GoalOption[] = [
  {
    id: "lower-energy",
    label: "My energy bill is too high",
    description: "Find upgrades that reduce monthly costs and improve efficiency",
  },
  {
    id: "improve-comfort",
    label: "My home feels cold or uncomfortable",
    description: "Discover solutions for better warmth, quiet, and daily comfort",
  },
  {
    id: "renovate",
    label: "I want to renovate or upgrade",
    description: "Modernize your kitchen, bathroom, or living spaces",
  },
  {
    id: "future-proof",
    label: "I want to future-proof my home",
    description: "Prepare your home with efficient systems and smart technology",
  },
  {
    id: "not-sure",
    label: "I want advice first",
    description: "Get guidance on where to start and what makes sense for your home",
  },
];

const SCAN_MESSAGES = [
  "Checking home improvement potential...",
  "Assessing comfort and energy risks...",
  "Matching project type with installer expertise...",
  "Checking regional installer availability...",
  "Preparing your home diagnosis...",
];

const GOAL_RESULTS: Record<string, Record<string, ZoneInsight>> = {
  "lower-energy": {
    roof: { label: "Solar panels", insight: "High potential", type: "high", service: "Solar panels", intakeSlug: "solar", zone: "Roof", whyItMatters: "Homes like yours often have strong solar potential that can significantly reduce monthly energy costs.", consequence: "Without solar, you continue paying full retail energy prices year after year.", impact: "Can significantly reduce monthly energy costs", nextAction: "Compare verified solar installers" },
    insulation: { label: "Insulation", insight: "Needs improvement", type: "needs", service: "Insulation", intakeSlug: "insulation", zone: "Walls", whyItMatters: "Homes like yours often lose significant heat through the walls, leading to higher monthly costs and reduced comfort.", consequence: "Poor insulation causes ongoing energy loss and higher bills throughout the year.", impact: "Reduces energy bills and improves comfort", nextAction: "Compare insulation specialists" },
    windows: { label: "Windows", insight: "Needs improvement", type: "needs", service: "Windows & renovation", intakeSlug: "renovation", zone: "Windows", whyItMatters: "Older window frames in homes like yours let warm air escape and increase heating costs.", consequence: "Heat loss through windows continues year-round, increasing energy costs.", impact: "Improves insulation and reduces drafts", nextAction: "Compare window specialists" },
    heating: { label: "Heat pump", insight: "Recommended upgrade", type: "recommended", service: "Heat pump", intakeSlug: "heat-pumps", zone: "Heating", whyItMatters: "A heat pump uses significantly less energy than traditional heating systems.", consequence: "Older heating systems are less efficient and cost more to run.", impact: "Lowers energy use and provides consistent warmth", nextAction: "Compare heat pump installers" },
    kitchen: { label: "Kitchen", insight: "Consider later", type: "consider", service: "Kitchen renovation", intakeSlug: "kitchen", zone: "Kitchen", whyItMatters: "Energy-efficient appliances can help, but other upgrades will make a bigger impact first.", consequence: "Less urgent for energy savings compared to insulation and heating.", impact: "Modernizes daily living", nextAction: "Explore kitchen options" },
    bathroom: { label: "Bathroom", insight: "Consider later", type: "consider", service: "Bathroom renovation", intakeSlug: "bathroom", zone: "Bathroom", whyItMatters: "Water-saving fixtures help, but insulation and heating improvements come first.", consequence: "Less urgent for energy savings compared to insulation and heating.", impact: "Improves daily comfort", nextAction: "Explore bathroom options" },
  },
  "improve-comfort": {
    insulation: { label: "Insulation", insight: "High potential", type: "high", service: "Insulation", intakeSlug: "insulation", zone: "Walls", whyItMatters: "Homes like yours often lose significant heat through the walls, leading to cold spots and higher monthly costs.", consequence: "Without proper insulation, heat loss continues year-round, reducing comfort and increasing costs.", impact: "Improves comfort across the entire home", nextAction: "Compare insulation specialists" },
    windows: { label: "Windows", insight: "Needs improvement", type: "needs", service: "Windows & renovation", intakeSlug: "renovation", zone: "Windows", whyItMatters: "New frames and glazing in homes like yours reduce drafts, noise, and temperature fluctuations.", consequence: "Drafts and cold spots near windows continue to affect daily comfort.", impact: "Reduces drafts and outside noise", nextAction: "Compare window specialists" },
    heating: { label: "Heat pump", insight: "Recommended upgrade", type: "recommended", service: "Heat pump", intakeSlug: "heat-pumps", zone: "Heating", whyItMatters: "Modern heat pumps provide consistent, comfortable warmth and cooling year-round.", consequence: "Older heating systems may struggle to maintain even temperatures.", impact: "Provides consistent, comfortable warmth", nextAction: "Compare heat pump installers" },
    roof: { label: "Solar panels", insight: "Explore option", type: "explore", service: "Solar panels", intakeSlug: "solar", zone: "Roof", whyItMatters: "Solar reduces energy bills, freeing budget for comfort improvements.", consequence: "Less critical for immediate comfort compared to insulation and heating.", impact: "Frees budget for comfort upgrades", nextAction: "Explore solar options" },
    kitchen: { label: "Kitchen", insight: "Consider later", type: "consider", service: "Kitchen renovation", intakeSlug: "kitchen", zone: "Kitchen", whyItMatters: "Layout and finishes improve daily comfort after energy basics are addressed.", consequence: "Less urgent for comfort compared to insulation and heating.", impact: "Modernizes daily living space", nextAction: "Explore kitchen options" },
    bathroom: { label: "Bathroom", insight: "Consider later", type: "consider", service: "Bathroom renovation", intakeSlug: "bathroom", zone: "Bathroom", whyItMatters: "Radiant heating and modern fixtures enhance comfort in daily routines.", consequence: "Less urgent for comfort compared to insulation and heating.", impact: "Enhances daily comfort", nextAction: "Explore bathroom options" },
  },
  renovate: {
    kitchen: { label: "Kitchen renovation", insight: "Recommended upgrade", type: "recommended", service: "Kitchen renovation", intakeSlug: "kitchen", zone: "Kitchen", whyItMatters: "A renovated kitchen in homes like yours improves daily living, home value, and modern functionality.", consequence: "Outdated kitchens can feel less functional and may affect home value.", impact: "Increases long-term property value", nextAction: "Compare kitchen renovation partners" },
    bathroom: { label: "Bathroom renovation", insight: "Recommended upgrade", type: "recommended", service: "Bathroom renovation", intakeSlug: "bathroom", zone: "Bathroom", whyItMatters: "Modern bathrooms in homes like yours increase comfort, efficiency, and overall property value.", consequence: "Older bathrooms may feel outdated and less comfortable.", impact: "Increases property value and comfort", nextAction: "Compare bathroom renovation partners" },
    windows: { label: "Windows", insight: "Recommended upgrade", type: "recommended", service: "Windows & renovation", intakeSlug: "renovation", zone: "Windows", whyItMatters: "New windows transform appearance while improving insulation and soundproofing.", consequence: "Older windows detract from the renovated appearance and reduce efficiency.", impact: "Transforms appearance and improves efficiency", nextAction: "Compare window specialists" },
    roof: { label: "Solar panels", insight: "Explore option", type: "explore", service: "Solar panels", intakeSlug: "solar", zone: "Roof", whyItMatters: "Solar fits well with a broader renovation to modernize the entire home.", consequence: "Less critical for renovation aesthetics compared to interior spaces.", impact: "Complements broader renovation", nextAction: "Explore solar options" },
    insulation: { label: "Insulation", insight: "Consider later", type: "consider", service: "Insulation", intakeSlug: "insulation", zone: "Walls", whyItMatters: "Often addressed during structural renovation work for maximum efficiency.", consequence: "Can be addressed during renovation for better efficiency.", impact: "Improves efficiency during renovation", nextAction: "Explore insulation options" },
    heating: { label: "Heat pump", insight: "Consider later", type: "consider", service: "Heat pump", intakeSlug: "heat-pumps", zone: "Heating", whyItMatters: "A natural upgrade when renovating plumbing and electrical systems.", consequence: "Can be upgraded during renovation for modern efficiency.", impact: "Modernizes heating during renovation", nextAction: "Explore heat pump options" },
  },
  "future-proof": {
    roof: { label: "Solar panels", insight: "High potential", type: "high", service: "Solar panels", intakeSlug: "solar", zone: "Roof", whyItMatters: "Solar locks in lower energy costs and increases home value for decades.", consequence: "Without solar, you remain exposed to rising energy costs for years to come.", impact: "Increases long-term property value", nextAction: "Compare verified solar installers" },
    heating: { label: "Heat pump", insight: "Recommended upgrade", type: "recommended", service: "Heat pump", intakeSlug: "heat-pumps", zone: "Heating", whyItMatters: "Heat pumps are the future of home heating and cooling across Europe.", consequence: "Older heating systems may become less efficient and more expensive to maintain.", impact: "Future-proofs your heating system", nextAction: "Compare heat pump installers" },
    insulation: { label: "Insulation", insight: "Recommended upgrade", type: "recommended", service: "Insulation", intakeSlug: "insulation", zone: "Walls", whyItMatters: "Proper insulation is the foundation of every modern, efficient home.", consequence: "Without insulation, energy efficiency upgrades have limited impact.", impact: "Foundation of modern efficiency", nextAction: "Compare insulation specialists" },
    windows: { label: "Windows", insight: "Explore option", type: "explore", service: "Windows & renovation", intakeSlug: "renovation", zone: "Windows", whyItMatters: "Energy-efficient frames complement solar and heat pump installations.", consequence: "Less critical for future-proofing compared to solar and heating.", impact: "Complements future-proof upgrades", nextAction: "Explore window options" },
    kitchen: { label: "Kitchen", insight: "Consider later", type: "consider", service: "Kitchen renovation", intakeSlug: "kitchen", zone: "Kitchen", whyItMatters: "Smart appliances and sustainable materials align with a future-ready home.", consequence: "Less critical for future-proofing compared to energy systems.", impact: "Aligns with future-ready home", nextAction: "Explore kitchen options" },
    bathroom: { label: "Bathroom", insight: "Consider later", type: "consider", service: "Bathroom renovation", intakeSlug: "bathroom", zone: "Bathroom", whyItMatters: "Water-saving and energy-efficient fixtures support long-term sustainability.", consequence: "Less critical for future-proofing compared to energy systems.", impact: "Supports long-term sustainability", nextAction: "Explore bathroom options" },
  },
  "not-sure": {
    roof: { label: "Solar panels", insight: "Explore option", type: "explore", service: "Solar panels", intakeSlug: "solar", zone: "Roof", whyItMatters: "A popular first upgrade for homes like yours that reduces bills and increases property value.", consequence: "Without solar, you continue paying full retail energy prices.", impact: "Reduces bills and increases value", nextAction: "Compare solar installers" },
    insulation: { label: "Insulation", insight: "Explore option", type: "explore", service: "Insulation", intakeSlug: "insulation", zone: "Walls", whyItMatters: "Often the most cost-effective upgrade for homes like yours for comfort and lower bills.", consequence: "Poor insulation causes ongoing energy loss and higher costs.", impact: "Cost-effective comfort improvement", nextAction: "Compare insulation specialists" },
    windows: { label: "Windows", insight: "Explore option", type: "explore", service: "Windows & renovation", intakeSlug: "renovation", zone: "Windows", whyItMatters: "Improves comfort, security, and appearance in one upgrade for homes like yours.", consequence: "Older windows continue to cause drafts and energy loss.", impact: "Improves comfort and appearance", nextAction: "Compare window specialists" },
    heating: { label: "Heat pump", insight: "Explore option", type: "explore", service: "Heat pump", intakeSlug: "heat-pumps", zone: "Heating", whyItMatters: "Modern heating that works well with solar and insulation upgrades.", consequence: "Older heating systems are less efficient and cost more to run.", impact: "Modernizes heating efficiency", nextAction: "Compare heat pump installers" },
    kitchen: { label: "Kitchen renovation", insight: "Explore option", type: "explore", service: "Kitchen renovation", intakeSlug: "kitchen", zone: "Kitchen", whyItMatters: "A high-impact renovation that transforms daily living and home value.", consequence: "Less urgent for energy savings compared to insulation and heating.", impact: "Transforms daily living and value", nextAction: "Compare kitchen partners" },
    bathroom: { label: "Bathroom renovation", insight: "Explore option", type: "explore", service: "Bathroom renovation", intakeSlug: "bathroom", zone: "Bathroom", whyItMatters: "Smaller scope than full renovation, with strong comfort and value returns.", consequence: "Less urgent for energy savings compared to insulation and heating.", impact: "Strong comfort and value returns", nextAction: "Compare bathroom partners" },
  },
};

function getTypePriority(type: string): number {
  const order = ["high", "recommended", "needs", "explore", "consider"];
  return order.indexOf(type);
}

function insightStyles(type: string) {
  switch (type) {
    case "high":
      return "border-[var(--emerald-border)] bg-[rgba(94,231,187,0.15)] text-[var(--emerald-300)]";
    case "recommended":
      return "border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)] text-[var(--emerald-300)]";
    case "needs":
      return "border-[var(--gold-border)] bg-[rgba(247,209,123,0.12)] text-[var(--gold-300)]";
    case "explore":
      return "border-white/10 bg-white/5 text-white/60";
    case "consider":
      return "border-white/8 bg-white/[0.03] text-white/40";
    default:
      return "border-white/10 bg-white/5 text-white/60";
  }
}

function zoneGlowStyle(type: string) {
  switch (type) {
    case "high":
      return "rgba(94,231,187,0.22)";
    case "recommended":
      return "rgba(94,231,187,0.16)";
    case "needs":
      return "rgba(247,209,123,0.16)";
    case "explore":
      return "rgba(255,255,255,0.06)";
    case "consider":
      return "rgba(255,255,255,0.03)";
    default:
      return "transparent";
  }
}

export default function HeroScan() {
  const [step, setStep] = useState<Step>("landing");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [scanMessage, setScanMessage] = useState(0);
  const [scanningComplete, setScanningComplete] = useState(false);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startScan = useCallback(() => {
    setStep("scanning");
    setScanningComplete(false);
    setScanMessage(0);

    // Animate scan messages - slower, calmer pacing
    let msgIndex = 0;
    const msgInterval = setInterval(() => {
      msgIndex += 1;
      setScanMessage(msgIndex);
      if (msgIndex >= SCAN_MESSAGES.length - 1) {
        clearInterval(msgInterval);
      }
    }, 700);

    // Auto-advance to goal selection - longer for calmer feel
    scanTimerRef.current = setTimeout(() => {
      setScanningComplete(true);
      setTimeout(() => {
        setStep("goal");
      }, 800);
    }, 4500);

    return () => {
      clearInterval(msgInterval);
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
  }, []);

  const selectGoal = useCallback((goalId: string) => {
    setSelectedGoal(goalId);
    setStep("results");
  }, []);

  const restart = useCallback(() => {
    setStep("landing");
    setSelectedGoal(null);
    setScanningComplete(false);
    setScanMessage(0);
  }, []);

  const results = selectedGoal ? GOAL_RESULTS[selectedGoal] : {};
  const sortedInsights = Object.values(results).sort(
    (a, b) => getTypePriority(a.type) - getTypePriority(b.type)
  );
  const topInsight = sortedInsights[0];

  const ctaHref = topInsight
    ? `/intake?service=${encodeURIComponent(topInsight.service)}&impact=${encodeURIComponent(topInsight.impact)}&whyItMatters=${encodeURIComponent(topInsight.whyItMatters)}`
    : "/intake";

  const isHouseVisible = step !== "landing";
  const houseBrightness =
    step === "scanning" ? "brightness-[0.35]" : step === "goal" ? "brightness-[0.45]" : "brightness-100";

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden" id="hero-scan">
      {/* Background house image - always present, brightness shifts with step */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${houseBrightness}`}
        style={{ opacity: isHouseVisible ? 1 : 0.15 }}
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
          alt="Modern residential home"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020a05]/90 via-[#020a05]/40 to-[#020a05]/60" />
      </div>

      {/* Content container */}
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 py-20">
        {/* ==================== LANDING STEP ==================== */}
        {step === "landing" && (
          <div className="flex max-w-2xl flex-col items-center text-center transition-all duration-700">
            <h1 className="text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl">
              Find the smartest upgrades{" "}
              <span className="text-[var(--gold-300)]">for your home</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/50">
              See where your home can save energy, improve comfort, and avoid unnecessary upgrades.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={startScan}
                className="gold-button inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start Home Scan
              </button>
            </div>
            <p className="mt-3 text-xs tracking-wide text-white/30">
              Free scan · No obligation · Verified installers
            </p>
            <p className="mt-2 text-[11px] text-white/20">
              Every installer is reviewed before being shown to you.
            </p>
          </div>
        )}

        {/* ==================== SCANNING STEP ==================== */}
        {step === "scanning" && (
          <div className="flex w-full max-w-3xl flex-col items-center transition-all duration-1000">
            <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-white/8">
              <div className="relative min-h-[320px] md:min-h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
                  alt="Scanning home"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020a05]/60 via-transparent to-[#020a05]/40" />

                {/* Subtle scan line - slower, calmer */}
                <div
                  className="absolute left-0 z-20 h-16 w-full opacity-60"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(94,231,187,0.2) 50%, transparent 100%)",
                    animation: "scanSweep 4s ease-in-out forwards",
                    top: "-10%",
                  }}
                />

                {/* Single diagnostic label at a time */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm font-medium tracking-wide text-white/60">
                      {SCAN_MESSAGES[Math.min(scanMessage, SCAN_MESSAGES.length - 1)]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar below image */}
            <div className="mt-6 flex w-full max-w-xs flex-col items-center gap-3">
              <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-[var(--emerald-300)]/60 transition-all duration-500"
                  style={{
                    width: `${Math.min(((scanMessage + 1) / SCAN_MESSAGES.length) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="text-[11px] text-white/25">
                This helps determine the most effective improvements for your home.
              </p>
            </div>
          </div>
        )}

        {/* ==================== GOAL SELECTION STEP ==================== */}
        {step === "goal" && (
          <div className="flex w-full max-w-md flex-col items-center transition-all duration-700 animate-fadeInUp">
            <h2 className="text-center text-xl font-medium text-white sm:text-2xl">
              What brings you here today?
            </h2>

            <div className="mt-8 w-full space-y-2">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => selectGoal(goal.id)}
                  className="group w-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-all duration-200 hover:border-white/10 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--emerald-300)]/50"
                >
                  <p className="text-[15px] font-normal text-white/90 group-hover:text-white">
                    {goal.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/40">
                    {goal.description}
                  </p>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={restart}
              className="mt-6 text-xs text-white/25 transition hover:text-white/45"
            >
              Start over
            </button>
            <p className="mt-4 text-center text-[11px] text-white/20">
              No random quotes. Your request is matched by project type, region, and installer fit.
            </p>
          </div>
        )}

        {/* ==================== RESULTS STEP ==================== */}
        {step === "results" && (
          <div className="flex w-full max-w-2xl flex-col items-center transition-all duration-700 animate-fadeInUp">
            {/* Progress indicator */}
            <div className="mb-6 flex items-center gap-2">
              <div className="h-0.5 w-8 bg-[var(--emerald-300)]/60" />
              <p className="text-xs font-medium tracking-wide text-white/40">
                Step 2 of 2 — see your options
              </p>
              <div className="h-0.5 w-8 bg-[var(--emerald-300)]/60" />
            </div>

            {/* Main diagnosis - first recommendation dominant */}
            {sortedInsights[0] && (
              <div className="w-full">
                <p className="text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--emerald-300)]">
                  Top recommendation for your home
                </p>
                <h2 className="mt-2 text-center text-2xl font-medium text-white sm:text-3xl">
                  {sortedInsights[0].service}
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed text-white/50">
                  {sortedInsights[0].whyItMatters}
                </p>
                <p className="mx-auto mt-2 max-w-sm text-center text-xs leading-relaxed text-white/35">
                  {sortedInsights[0].consequence}
                </p>
                <p className="mt-4 text-center text-sm font-medium text-[var(--gold-300)]">
                  {sortedInsights[0].impact}
                </p>
                <p className="mt-3 text-center text-[11px] text-white/30">
                  This is often the most effective first step for homes like yours.
                </p>
              </div>
            )}

            {/* Supporting insights - only top 3, more subtle */}
            {sortedInsights.length > 1 && (
              <div className="mt-8 w-full">
                <p className="mb-3 text-center text-xs text-white/30">
                  Also consider
                </p>
                <div className="space-y-2">
                  {sortedInsights.slice(1, 3).map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">{item.zone}</span>
                        <span className="text-xs text-white/40">{item.insight}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center text-[11px] text-white/25">
                  These insights are based on common improvement patterns for homes like yours.
                </p>
              </div>
            )}

            {/* CTA area - natural conclusion */}
            <div className="mt-10 w-full max-w-sm">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Momentum language */}
              <p className="mt-6 text-center text-xs text-white/40">
                You are one step away from seeing the best options for your home
              </p>

              {/* Authority block */}
              <p className="mt-4 max-w-xs text-center text-[11px] leading-relaxed text-white/30">
                Eco Home Palace does not simply forward your request. Your project is matched with installers based on service type, region, and fit.
              </p>

              <div className="mt-4 text-center">
                <a
                  href={ctaHref}
                  className="gold-button inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
                >
                  See the best installer options for this upgrade
                </a>
                <p className="mt-3 text-[11px] tracking-wide text-white/25">
                  Takes about 60 seconds · Free · No obligation · Verified network · No hidden costs
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={restart}
              className="mt-6 text-xs text-white/20 transition hover:text-white/40"
            >
              Start new scan
            </button>
          </div>
        )}
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes scanSweep {
          0% { top: -15%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes zonePulse {
          0% { opacity: 0; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(0.95); }
        }
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
