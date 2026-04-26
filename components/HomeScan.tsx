'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Hotspot {
  id: string;
  title: string;
  serviceSlug: string;
  position: { top: string; left: string };
  benefits: string[];
}

const hotspots: Hotspot[] = [
  {
    id: 'roof',
    title: 'Solar panels',
    serviceSlug: 'solar-panels',
    position: { top: '15%', left: '50%' },
    benefits: ['Lower energy bills', 'Roof suitability check', 'Compare verified solar installers'],
  },
  {
    id: 'outside',
    title: 'Heat pump',
    serviceSlug: 'heat-pump',
    position: { top: '45%', left: '85%' },
    benefits: ['Efficient heating', 'Lower gas usage', 'Future-ready home'],
  },
  {
    id: 'windows',
    title: 'Windows & renovation',
    serviceSlug: 'renovation',
    position: { top: '40%', left: '30%' },
    benefits: ['Improve efficiency', 'Upgrade appearance', 'Increase home value'],
  },
  {
    id: 'insulation',
    title: 'Insulation',
    serviceSlug: 'insulation',
    position: { top: '25%', left: '20%' },
    benefits: ['Improve comfort', 'Reduce heat loss', 'Lower monthly costs'],
  },
  {
    id: 'kitchen',
    title: 'Kitchen renovation',
    serviceSlug: 'renovation',
    position: { top: '65%', left: '35%' },
    benefits: ['Modernize your home', 'Improve living comfort', 'Compare renovation partners'],
  },
  {
    id: 'bathroom',
    title: 'Bathroom renovation',
    serviceSlug: 'renovation',
    position: { top: '65%', left: '65%' },
    benefits: ['Upgrade comfort', 'Improve daily use', 'Compare renovation partners'],
  },
];

export default function HomeScan() {
  const [selectedUpgrades, setSelectedUpgrades] = useState<Set<string>>(new Set());
  const [activeUpgrade, setActiveUpgrade] = useState<string | null>(null);
  const [hoveredUpgrade, setHoveredUpgrade] = useState<string | null>(null);

  const toggleUpgrade = (hotspot: Hotspot) => {
    const newSelected = new Set(selectedUpgrades);
    if (newSelected.has(hotspot.id)) {
      newSelected.delete(hotspot.id);
      if (activeUpgrade === hotspot.id) {
        setActiveUpgrade(null);
      }
    } else {
      newSelected.add(hotspot.id);
      setActiveUpgrade(hotspot.id);
    }
    setSelectedUpgrades(newSelected);
  };

  const removeUpgrade = (upgradeId: string) => {
    const newSelected = new Set(selectedUpgrades);
    newSelected.delete(upgradeId);
    if (activeUpgrade === upgradeId) {
      setActiveUpgrade(null);
    }
    setSelectedUpgrades(newSelected);
  };

  const isSelected = (hotspotId: string) => selectedUpgrades.has(hotspotId);
  const isActive = (hotspotId: string) => activeUpgrade === hotspotId;
  const isHovered = (hotspotId: string) => hoveredUpgrade === hotspotId;

  const activeHotspot = hotspots.find(h => h.id === activeUpgrade);
  const firstSelectedSlug = hotspots.find(h => selectedUpgrades.has(h.id))?.serviceSlug || '';

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#061f18] via-[#0b2a22] to-[#12382d] py-16 md:py-24">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(33,196,93,0.08),transparent_60%)]"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b45f] mb-3">
            Interactive Home Scan
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            Your home. Upgraded live.
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Select parts of the home to build your project and compare verified installers.
          </p>
        </div>

        {/* Main Visual Simulator */}
        <div className="relative mb-8">
          {/* Image Container */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
            {/* Base Image */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
              alt="Modern residential home"
              className="w-full h-auto object-cover min-h-[360px] md:min-h-[560px]"
            />

            {/* Dark Green Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(11,42,34,0.7)] via-[rgba(6,31,24,0.5)] to-[rgba(18,56,45,0.6)]"></div>
            
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.4)_100%)]"></div>

            {/* Visual Overlays */}
            {/* Solar panels overlay */}
            {isSelected('roof') && (
              <div className="absolute top-[10%] left-[20%] right-[20%] h-[20%] bg-[rgba(33,196,93,0.3)] animate-in fade-in duration-500 rounded-lg border-2 border-[rgba(33,196,93,0.5)]">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(33,196,93,0.2)_25%,rgba(33,196,93,0.2)_50%,transparent_50%,transparent_75%,rgba(33,196,93,0.2)_75%)] bg-[length:20px_20px]"></div>
              </div>
            )}

            {/* Heat pump overlay */}
            {isSelected('outside') && (
              <div className="absolute top-[40%] right-[10%] w-[15%] h-[20%] bg-[rgba(33,196,93,0.35)] animate-in fade-in duration-500 rounded-xl border-2 border-[rgba(33,196,93,0.5)] flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-2 border-[rgba(33,196,93,0.6)] rounded-lg"></div>
              </div>
            )}

            {/* Window glow overlay */}
            {isSelected('windows') && (
              <>
                <div className="absolute top-[35%] left-[25%] w-[12%] h-[15%] bg-[rgba(216,180,95,0.3)] animate-in fade-in duration-500 rounded-lg border-2 border-[rgba(216,180,95,0.5)]"></div>
                <div className="absolute top-[35%] left-[45%] w-[12%] h-[15%] bg-[rgba(216,180,95,0.3)] animate-in fade-in duration-500 rounded-lg border-2 border-[rgba(216,180,95,0.5)]"></div>
              </>
            )}

            {/* Insulation glow overlay */}
            {isSelected('insulation') && (
              <div className="absolute top-[15%] left-[15%] w-[70%] h-[25%] bg-[rgba(33,196,93,0.25)] animate-in fade-in duration-500 rounded-lg border-2 border-[rgba(33,196,93,0.4)]"></div>
            )}

            {/* Kitchen warm light overlay */}
            {isSelected('kitchen') && (
              <div className="absolute top-[55%] left-[30%] w-[18%] h-[20%] bg-[rgba(216,180,95,0.35)] animate-in fade-in duration-500 rounded-lg border-2 border-[rgba(216,180,95,0.5)]"></div>
            )}

            {/* Bathroom soft glow overlay */}
            {isSelected('bathroom') && (
              <div className="absolute top-[55%] left-[55%] w-[18%] h-[20%] bg-[rgba(100,200,255,0.25)] animate-in fade-in duration-500 rounded-lg border-2 border-[rgba(100,200,255,0.4)]"></div>
            )}

            {/* Hotspots */}
            {hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={() => toggleUpgrade(hotspot)}
                onMouseEnter={() => setHoveredUpgrade(hotspot.id)}
                onMouseLeave={() => setHoveredUpgrade(null)}
                aria-label={`Select ${hotspot.title}`}
                aria-pressed={isSelected(hotspot.id)}
                className="absolute group transition-all duration-300"
                style={{
                  top: hotspot.position.top,
                  left: hotspot.position.left,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Hotspot Button */}
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected(hotspot.id)
                      ? 'bg-[#21c45d] shadow-[0_0_30px_rgba(33,196,93,0.6)] scale-110'
                      : isHovered(hotspot.id)
                      ? 'bg-[rgba(216,180,95,0.3)] border-2 border-[#d8b45f] shadow-[0_0_20px_rgba(216,180,95,0.4)] scale-105'
                      : 'bg-[rgba(0,0,0,0.5)] border-2 border-[rgba(216,180,95,0.3)] backdrop-blur-sm'
                  }`}
                >
                  {isSelected(hotspot.id) ? (
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#21c45d]"></div>
                  )}
                </div>

                {/* Label */}
                <div
                  className={`absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-2 rounded-lg backdrop-blur-md transition-all duration-300 ${
                    isSelected(hotspot.id) || isHovered(hotspot.id)
                      ? 'bg-[rgba(0,0,0,0.8)] text-white opacity-100'
                      : 'bg-[rgba(0,0,0,0.6)] text-gray-300 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <span className="text-sm md:text-base font-medium">{hotspot.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Bottom Panel */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl">
          {selectedUpgrades.size === 0 ? (
            <div className="text-center space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Select an upgrade area
                </h3>
                <p className="text-gray-400">
                  Click the home to explore upgrades for your project.
                </p>
              </div>
              <button
                disabled
                className="w-full md:w-auto px-8 py-4 rounded-xl bg-white/5 text-gray-500 font-medium cursor-not-allowed border border-white/10"
              >
                Select an area first
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selected Upgrades Pills */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Your selected upgrades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedUpgrades).map((upgradeId) => {
                    const hotspot = hotspots.find(h => h.id === upgradeId);
                    if (!hotspot) return null;
                    return (
                      <button
                        key={upgradeId}
                        onClick={() => removeUpgrade(upgradeId)}
                        className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          isActive(upgradeId)
                            ? 'bg-[#21c45d] text-white shadow-[0_0_20px_rgba(33,196,93,0.4)]'
                            : 'bg-[rgba(33,196,93,0.15)] border border-[rgba(33,196,93,0.3)] text-[#21c45d] hover:bg-[rgba(33,196,93,0.25)]'
                        }`}
                      >
                        <span className="text-sm font-medium">{hotspot.title}</span>
                        <span className="opacity-50 group-hover:opacity-100 transition-opacity">×</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Upgrade Detail */}
              {activeHotspot && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">
                      {activeHotspot.title}
                    </h4>
                    <ul className="space-y-2">
                      {activeHotspot.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <span className="text-[#21c45d] mt-1">✓</span>
                          <span className="text-base">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500">Typical response: 24–48h</p>
                </div>
              )}

              {/* CTA */}
              <div className="space-y-3">
                <Link
                  href={`/intake?service=${activeHotspot?.serviceSlug || firstSelectedSlug}`}
                  className="block w-full py-4 rounded-xl bg-[#21c45d] text-white font-semibold text-center transition-all duration-300 hover:bg-[#16a34a] shadow-[0_0_30px_rgba(33,196,93,0.4)] hover:shadow-[0_0_40px_rgba(33,196,93,0.5)] hover:-translate-y-0.5"
                >
                  {selectedUpgrades.size === 1 && activeHotspot
                    ? `Compare ${activeHotspot.title.toLowerCase()} installers`
                    : 'Compare installers for selected upgrades'}
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  Free comparison • No obligation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
