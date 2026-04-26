"use client";

import { useState, useCallback } from "react";

interface Hotspot {
  id: string;
  label: string;
  service: string;
  intakeSlug: string;
  top: string;
  left: string;
  mobileTop?: string;
  mobileLeft?: string;
}

interface BenefitData {
  title: string;
  benefits: string[];
  responseTime: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "roof",
    label: "Solar panels",
    service: "solar-panels",
    intakeSlug: "solar",
    top: "18%",
    left: "42%",
    mobileTop: "14%",
    mobileLeft: "44%",
  },
  {
    id: "outside",
    label: "Heat pump",
    service: "heat-pump",
    intakeSlug: "heat-pumps",
    top: "58%",
    left: "78%",
    mobileTop: "54%",
    mobileLeft: "76%",
  },
  {
    id: "windows",
    label: "Windows & renovation",
    service: "renovation",
    intakeSlug: "renovation",
    top: "38%",
    left: "28%",
    mobileTop: "34%",
    mobileLeft: "26%",
  },
  {
    id: "insulation",
    label: "Insulation",
    service: "insulation",
    intakeSlug: "insulation",
    top: "32%",
    left: "62%",
    mobileTop: "28%",
    mobileLeft: "64%",
  },
  {
    id: "kitchen",
    label: "Kitchen renovation",
    service: "renovation",
    intakeSlug: "renovation",
    top: "68%",
    left: "36%",
    mobileTop: "64%",
    mobileLeft: "34%",
  },
  {
    id: "bathroom",
    label: "Bathroom renovation",
    service: "renovation",
    intakeSlug: "renovation",
    top: "72%",
    left: "64%",
    mobileTop: "70%",
    mobileLeft: "66%",
  },
];

const BENEFITS: Record<string, BenefitData> = {
  "solar-panels": {
    title: "Solar panels",
    benefits: [
      "Lower energy bills",
      "Roof suitability check",
      "Compare verified solar installers",
    ],
    responseTime: "24–48h",
  },
  "heat-pump": {
    title: "Heat pump",
    benefits: [
      "Efficient heating",
      "Lower gas usage",
      "Future-ready home",
    ],
    responseTime: "24–48h",
  },
  renovation: {
    title: "Renovation",
    benefits: [
      "Improve efficiency",
      "Upgrade appearance",
      "Increase home value",
    ],
    responseTime: "24–48h",
  },
  insulation: {
    title: "Insulation",
    benefits: [
      "Improve comfort",
      "Reduce heat loss",
      "Lower monthly costs",
    ],
    responseTime: "24–48h",
  },
};

function getBenefitData(service: string, label: string): BenefitData {
  if (BENEFITS[service]) return BENEFITS[service];
  return {
    title: label,
    benefits: ["Improve your home", "Compare verified installers", "Free and without obligation"],
    responseTime: "24–48h",
  };
}

export default function HomeScan() {
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [activeUpgrade, setActiveUpgrade] = useState<string | null>(null);
  const [hoveredUpgrade, setHoveredUpgrade] = useState<string | null>(null);

  const toggleUpgrade = useCallback((id: string) => {
    setSelectedUpgrades((prev) => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        const next = prev.filter((item) => item !== id);
        setActiveUpgrade((current) => {
          if (current === id) {
            return next.length > 0 ? next[next.length - 1] : null;
          }
          return current;
        });
        return next;
      }
      setActiveUpgrade(id);
      return [...prev, id];
    });
  }, []);

  const removeUpgrade = useCallback((id: string) => {
    setSelectedUpgrades((prev) => {
      const next = prev.filter((item) => item !== id);
      setActiveUpgrade((current) => {
        if (current === id) {
          return next.length > 0 ? next[next.length - 1] : null;
        }
        return current;
      });
      return next;
    });
  }, []);

  const firstSelected = selectedUpgrades[0];
  const activeId = activeUpgrade ?? firstSelected ?? null;
  const activeHotspot = activeId ? HOTSPOTS.find((h) => h.id === activeId) ?? null : null;
  const activeBenefits = activeHotspot ? getBenefitData(activeHotspot.service, activeHotspot.label) : null;

  const ctaHref = activeHotspot
    ? `/intake?service=${activeHotspot.intakeSlug}`
    : "#";

  const ctaLabel = activeHotspot
    ? selectedUpgrades.length > 1
      ? "Compare installers for selected upgrades"
      : `Compare installers for ${activeHotspot.label}`
    : "Select an area first";

  return (
    <section
      id="homescan"
      className="relative w-full overflow-hidden px-4 py-16 sm:px-6 md:py-24"
      style={{
        background:
          "linear-gradient(180deg, #020a05 0%, #061c12 40%, #0b2e1d 70%, #071f13 100%)",
      }}
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--emerald-300)]">
            Interactive Home Scan
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            Your home. Upgraded live.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            Select parts of the home to build your project and compare verified
            installers.
          </p>
        </div>

        {/* Simulator container */}
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--gold-border)] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
          {/* Vignette + gradient overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-[2rem]"
            style={{
              background:
                "radial-gradient(circle at center, transparent 40%, rgba(2,10,5,0.55) 100%)",
            }}
          />

          {/* Base image */}
          <div className="relative min-h-[360px] md:min-h-[420px] lg:min-h-[560px]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
              alt="Modern residential home exterior for interactive upgrade simulator"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />

            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020a05]/80 via-transparent to-[#020a05]/30" />

            {/* === VISUAL TRANSFORMATION OVERLAYS === */}

            {/* Solar panels overlay */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${selectedUpgrades.includes("roof") ? "opacity-100" : "opacity-0"}`}
            >
              {/* Roof solar grid - left section */}
              <div
                className="absolute"
                style={{
                  top: "12%",
                  left: "30%",
                  width: "22%",
                  height: "14%",
                  background:
                    "repeating-linear-gradient(90deg, rgba(40,180,120,0.35) 0px, rgba(40,180,120,0.35) 8px, transparent 8px, transparent 16px), repeating-linear-gradient(0deg, rgba(40,180,120,0.25) 0px, rgba(40,180,120,0.25) 8px, transparent 8px, transparent 16px)",
                  clipPath: "polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)",
                  filter: "drop-shadow(0 0 12px rgba(94,231,187,0.4))",
                }}
              />
              {/* Roof solar grid - right section */}
              <div
                className="absolute"
                style={{
                  top: "12%",
                  left: "54%",
                  width: "20%",
                  height: "13%",
                  background:
                    "repeating-linear-gradient(90deg, rgba(40,180,120,0.35) 0px, rgba(40,180,120,0.35) 8px, transparent 8px, transparent 16px), repeating-linear-gradient(0deg, rgba(40,180,120,0.25) 0px, rgba(40,180,120,0.25) 8px, transparent 8px, transparent 16px)",
                  clipPath: "polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)",
                  filter: "drop-shadow(0 0 12px rgba(94,231,187,0.4))",
                }}
              />
              {/* Energy glow line */}
              <div
                className="absolute h-px w-16 bg-gradient-to-r from-[var(--emerald-300)] to-transparent md:w-24"
                style={{
                  top: "28%",
                  left: "38%",
                  boxShadow: "0 0 14px rgba(94,231,187,0.6)",
                }}
              />
            </div>

            {/* Heat pump overlay */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${selectedUpgrades.includes("outside") ? "opacity-100" : "opacity-0"}`}
            >
              {/* Heat pump unit */}
              <div
                className="absolute rounded-md border border-white/30 bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-sm"
                style={{
                  top: "62%",
                  left: "74%",
                  width: "6%",
                  height: "10%",
                  boxShadow: "0 0 20px rgba(94,231,187,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              />
              {/* Airflow lines */}
              <div
                className="absolute h-px bg-gradient-to-r from-[var(--emerald-300)]/60 to-transparent"
                style={{
                  top: "65%",
                  left: "68%",
                  width: "5%",
                }}
              />
              <div
                className="absolute h-px bg-gradient-to-r from-[var(--emerald-300)]/40 to-transparent"
                style={{
                  top: "68%",
                  left: "67%",
                  width: "6%",
                }}
              />
            </div>

            {/* Windows overlay */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${selectedUpgrades.includes("windows") ? "opacity-100" : "opacity-0"}`}
            >
              {/* Window frame glow - left window */}
              <div
                className="absolute rounded-sm border-2 border-[var(--gold-300)]/50"
                style={{
                  top: "36%",
                  left: "24%",
                  width: "10%",
                  height: "16%",
                  boxShadow:
                    "0 0 24px rgba(247,209,123,0.25), inset 0 0 16px rgba(247,209,123,0.1)",
                }}
              />
              {/* Window frame glow - center window */}
              <div
                className="absolute rounded-sm border-2 border-[var(--gold-300)]/50"
                style={{
                  top: "36%",
                  left: "40%",
                  width: "10%",
                  height: "16%",
                  boxShadow:
                    "0 0 24px rgba(247,209,123,0.25), inset 0 0 16px rgba(247,209,123,0.1)",
                }}
              />
              {/* Window frame glow - right window */}
              <div
                className="absolute rounded-sm border-2 border-[var(--gold-300)]/50"
                style={{
                  top: "36%",
                  left: "56%",
                  width: "10%",
                  height: "16%",
                  boxShadow:
                    "0 0 24px rgba(247,209,123,0.25), inset 0 0 16px rgba(247,209,123,0.1)",
                }}
              />
            </div>

            {/* Insulation overlay */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${selectedUpgrades.includes("insulation") ? "opacity-100" : "opacity-0"}`}
            >
              {/* Wall insulation glow */}
              <div
                className="absolute"
                style={{
                  top: "30%",
                  left: "18%",
                  width: "64%",
                  height: "42%",
                  background:
                    "linear-gradient(135deg, rgba(94,231,187,0.12) 0%, rgba(40,180,120,0.08) 50%, rgba(94,231,187,0.12) 100%)",
                  borderRadius: "4px",
                  boxShadow: "inset 0 0 40px rgba(94,231,187,0.15)",
                }}
              />
              {/* Roof insulation glow */}
              <div
                className="absolute"
                style={{
                  top: "8%",
                  left: "28%",
                  width: "48%",
                  height: "20%",
                  background:
                    "linear-gradient(180deg, rgba(94,231,187,0.1) 0%, rgba(40,180,120,0.06) 100%)",
                  clipPath: "polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)",
                  boxShadow: "inset 0 0 30px rgba(94,231,187,0.12)",
                }}
              />
            </div>

            {/* Kitchen overlay */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${selectedUpgrades.includes("kitchen") ? "opacity-100" : "opacity-0"}`}
            >
              {/* Warm interior light glow */}
              <div
                className="absolute"
                style={{
                  top: "56%",
                  left: "28%",
                  width: "24%",
                  height: "28%",
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(232,184,95,0.28) 0%, rgba(232,184,95,0.08) 50%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
              {/* Window warm light from kitchen */}
              <div
                className="absolute"
                style={{
                  top: "62%",
                  left: "30%",
                  width: "12%",
                  height: "14%",
                  background:
                    "linear-gradient(180deg, rgba(247,209,123,0.18) 0%, transparent 80%)",
                  borderRadius: "2px",
                }}
              />
            </div>

            {/* Bathroom overlay */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${selectedUpgrades.includes("bathroom") ? "opacity-100" : "opacity-0"}`}
            >
              {/* Soft blue-green interior glow */}
              <div
                className="absolute"
                style={{
                  top: "60%",
                  left: "56%",
                  width: "20%",
                  height: "26%",
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(94,231,187,0.22) 0%, rgba(64,180,160,0.1) 40%, transparent 65%)",
                  filter: "blur(10px)",
                }}
              />
              {/* Bathroom window glow */}
              <div
                className="absolute"
                style={{
                  top: "64%",
                  left: "60%",
                  width: "10%",
                  height: "12%",
                  background:
                    "linear-gradient(180deg, rgba(94,231,187,0.14) 0%, transparent 80%)",
                  borderRadius: "2px",
                }}
              />
            </div>

            {/* === HOTSPOTS === */}
            {HOTSPOTS.map((hotspot) => {
              const isSelected = selectedUpgrades.includes(hotspot.id);
              const isHovered = hoveredUpgrade === hotspot.id;
              const isActive = activeUpgrade === hotspot.id;

              return (
                <button
                  key={hotspot.id}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Select ${hotspot.label} upgrade`}
                  onClick={() => toggleUpgrade(hotspot.id)}
                  onMouseEnter={() => setHoveredUpgrade(hotspot.id)}
                  onMouseLeave={() => setHoveredUpgrade(null)}
                  className="absolute z-20 flex items-center gap-2 transition-transform duration-300 focus:outline-none"
                  style={{
                    top: `var(--hs-top-${hotspot.id}, ${hotspot.top})`,
                    left: `var(--hs-left-${hotspot.id}, ${hotspot.left})`,
                    transform:
                      isHovered || isActive
                        ? "scale(1.15) translateY(-2px)"
                        : "scale(1)",
                  }}
                >
                  {/* Dot / button */}
                  <span
                    className={`relative inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 md:h-9 md:w-9 ${
                      isSelected
                        ? "border-[var(--emerald-300)] bg-[var(--emerald-300)]/25 shadow-[0_0_20px_rgba(94,231,187,0.5)]"
                        : "border-[var(--gold-border)] bg-black/40 shadow-[0_0_16px_rgba(0,0,0,0.4)] backdrop-blur-md hover:border-[var(--emerald-border)] hover:shadow-[0_0_20px_rgba(94,231,187,0.35)]"
                    }`}
                  >
                    {isSelected ? (
                      <svg
                        className="h-4 w-4 text-[var(--emerald-300)] md:h-5 md:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span
                        className={`h-2.5 w-2.5 rounded-full md:h-3 md:w-3 ${
                          isHovered
                            ? "bg-[var(--emerald-300)] shadow-[0_0_10px_rgba(94,231,187,0.8)]"
                            : "bg-[var(--gold-400)]"
                        }`}
                      />
                    )}
                  </span>

                  {/* Label */}
                  <span
                    className={`hidden rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md transition-all duration-300 sm:inline-flex md:text-sm ${
                      isSelected
                        ? "border-[var(--emerald-border)] bg-[#071f13]/80 text-[var(--emerald-300)]"
                        : "border-white/15 bg-black/40 text-white/90"
                    }`}
                    style={{
                      opacity: isHovered || isSelected || isActive ? 1 : 0.75,
                      transform:
                        isHovered || isSelected
                          ? "translateX(0)"
                          : "translateX(-4px)",
                    }}
                  >
                    {hotspot.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating bottom panel */}
        <div className="relative z-20 mx-auto -mt-16 w-[calc(100%-2rem)] max-w-3xl sm:w-[calc(100%-3rem)] md:-mt-20 md:w-[calc(100%-4rem)]">
          <div className="glass-panel rounded-[1.5rem] px-5 py-5 md:px-8 md:py-6">
            {/* Title row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-white md:text-lg">
                  {selectedUpgrades.length > 0
                    ? "Your selected upgrades"
                    : "Select an upgrade area"}
                </h3>
                <p className="mt-1 text-sm text-white/55">
                  {selectedUpgrades.length > 0
                    ? "Click the home to explore more upgrades for your project."
                    : "Click the home to explore upgrades for your project."}
                </p>
              </div>

              {/* CTA */}
              {activeHotspot ? (
                <a
                  href={ctaHref}
                  className="gold-button inline-flex shrink-0 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold md:px-8 md:py-3.5 md:text-base"
                >
                  {ctaLabel}
                </a>
              ) : (
                <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/40 md:px-8 md:py-3.5">
                  Select an area first
                </span>
              )}
            </div>

            {/* Selected pills + active detail */}
            {selectedUpgrades.length > 0 && (
              <div className="mt-4 border-t border-white/8 pt-4">
                {/* Pills */}
                <div className="flex flex-wrap gap-2">
                  {selectedUpgrades.map((id) => {
                    const hs = HOTSPOTS.find((h) => h.id === id)!;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setActiveUpgrade(id);
                        }}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                          activeUpgrade === id
                            ? "border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)] text-[var(--emerald-300)]"
                            : "border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:bg-white/8"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {hs.label}
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeUpgrade(id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              removeUpgrade(id);
                            }
                          }}
                          className="ml-1 inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xs text-white/60 transition hover:bg-white/20 hover:text-white"
                          aria-label={`Remove ${hs.label}`}
                        >
                          ×
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active detail */}
                {activeBenefits && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                    <div>
                      <p className="text-sm font-semibold text-[var(--gold-300)]">
                        {activeBenefits.title}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {activeBenefits.benefits.map((b) => (
                          <li
                            key={b}
                            className="flex items-center gap-2 text-sm text-white/70"
                          >
                            <svg
                              className="h-3.5 w-3.5 shrink-0 text-[var(--emerald-300)]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-end">
                      <span className="rounded-full border border-[var(--emerald-border)] bg-[rgba(94,231,187,0.1)] px-3 py-1 text-xs font-medium text-[var(--emerald-300)]">
                        Typical response: {activeBenefits.responseTime}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS for hotspot mobile positioning */}
      <style jsx>{`
        @media (max-width: 640px) {
          button[aria-label*="Solar panels"] {
            --hs-top-roof: 14%;
            --hs-left-roof: 44%;
          }
          button[aria-label*="Heat pump"] {
            --hs-top-outside: 54%;
            --hs-left-outside: 76%;
          }
          button[aria-label*="Windows"] {
            --hs-top-windows: 34%;
            --hs-left-windows: 26%;
          }
          button[aria-label*="Insulation"] {
            --hs-top-insulation: 28%;
            --hs-left-insulation: 64%;
          }
          button[aria-label*="Kitchen renovation"] {
            --hs-top-kitchen: 64%;
            --hs-left-kitchen: 34%;
          }
          button[aria-label*="Bathroom renovation"] {
            --hs-top-bathroom: 70%;
            --hs-left-bathroom: 66%;
          }
        }
      `}</style>
    </section>
  );
}
