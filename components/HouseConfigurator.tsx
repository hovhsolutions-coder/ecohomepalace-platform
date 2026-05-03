'use client';

import { useState } from 'react';

interface Zone {
  id: string;
  label: string;
  upgrade: string;
  path: string;
  position: { x: number; y: number };
}

interface HouseConfiguratorProps {
  onSelectionChange?: (upgrades: string[]) => void;
}

const zones: Zone[] = [
  {
    id: 'roof',
    label: 'Roof',
    upgrade: 'solar',
    path: 'M 100 60 L 200 60 L 250 100 L 50 100 Z',
    position: { x: 150, y: 80 },
  },
  {
    id: 'wall',
    label: 'Walls',
    upgrade: 'insulation',
    path: 'M 50 100 L 250 100 L 250 220 L 50 220 Z',
    position: { x: 150, y: 160 },
  },
  {
    id: 'interior',
    label: 'Interior',
    upgrade: 'renovation',
    path: 'M 60 110 L 240 110 L 240 210 L 60 210 Z',
    position: { x: 150, y: 160 },
  },
  {
    id: 'outside',
    label: 'Outside',
    upgrade: 'heat-pump',
    path: 'M 260 140 L 300 140 L 300 180 L 260 180 Z',
    position: { x: 280, y: 160 },
  },
];

export default function HouseConfigurator({ onSelectionChange }: HouseConfiguratorProps) {
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const toggleUpgrade = (upgrade: string) => {
    const newUpgrades = selectedUpgrades.includes(upgrade)
      ? selectedUpgrades.filter((u) => u !== upgrade)
      : [...selectedUpgrades, upgrade];
    
    setSelectedUpgrades(newUpgrades);
    onSelectionChange?.(newUpgrades);
  };

  const isZoneSelected = (zone: Zone) => selectedUpgrades.includes(zone.upgrade);
  const isZoneHovered = (zone: Zone) => hoveredZone === zone.id;

  return (
    <div className="relative w-full h-full min-h-[450px] bg-gradient-to-br from-[#0b2a22] to-[#061f18] rounded-2xl overflow-hidden p-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* Header */}
      <div className="relative mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Select your upgrades</h3>
        <p className="text-sm text-gray-400">Click zones to add to your comparison</p>
      </div>

      {/* House SVG */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 350 280"
          className="w-full max-w-md h-auto"
        >
          {/* Ground */}
          <rect x="20" y="220" width="310" height="40" fill="#1a3d32" opacity="0.5" />

          {/* House base */}
          <path
            d="M 50 100 L 250 100 L 250 220 L 50 220 Z"
            fill="#0d2a1f"
            stroke="#1a4d3a"
            strokeWidth="2"
          />

          {/* Roof */}
          <path
            d="M 100 60 L 200 60 L 250 100 L 50 100 Z"
            fill="#0d2a1f"
            stroke="#1a4d3a"
            strokeWidth="2"
          />

          {/* Window */}
          <rect x="80" y="130" width="50" height="50" fill="#1a3d32" stroke="#21c45d" strokeWidth="1" opacity="0.3" />
          <rect x="170" y="130" width="50" height="50" fill="#1a3d32" stroke="#21c45d" strokeWidth="1" opacity="0.3" />

          {/* Door */}
          <rect x="140" y="160" width="30" height="60" fill="#1a3d32" stroke="#21c45d" strokeWidth="1" opacity="0.3" />

          {/* Heat pump unit */}
          <rect x="260" y="140" width="40" height="40" fill="#1a3d32" stroke="#21c45d" strokeWidth="1" opacity="0.3" rx="4" />

          {/* Interactive zones */}
          {zones.map((zone) => (
            <g key={zone.id}>
              {/* Zone path */}
              <path
                d={zone.path}
                fill={isZoneSelected(zone) ? 'rgba(33, 196, 93, 0.3)' : 'transparent'}
                stroke={isZoneSelected(zone) ? '#21c45d' : isZoneHovered(zone) ? '#d8b45f' : 'transparent'}
                strokeWidth={isZoneSelected(zone) ? 3 : isZoneHovered(zone) ? 2 : 0}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
                onClick={() => toggleUpgrade(zone.upgrade)}
                style={{
                  filter: isZoneHovered(zone) ? 'drop-shadow(0 0 8px rgba(216, 180, 95, 0.5))' : 'none',
                }}
              />

              {/* Zone label */}
              <text
                x={zone.position.x}
                y={zone.position.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-xs font-medium pointer-events-none transition-all duration-300 ${
                  isZoneSelected(zone) ? 'fill-[#21c45d]' : isZoneHovered(zone) ? 'fill-[#d8b45f]' : 'fill-gray-500'
                }`}
              >
                {zone.label}
              </text>

              {/* Check icon when selected */}
              {isZoneSelected(zone) && (
                <circle
                  cx={zone.position.x + 20}
                  cy={zone.position.y - 15}
                  r="10"
                  fill="#21c45d"
                  className="animate-pulse"
                />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Selected upgrades summary */}
      {selectedUpgrades.length > 0 && (
        <div className="relative mt-6">
          <div className="flex flex-wrap gap-2">
            {selectedUpgrades.map((upgrade) => (
              <span
                key={upgrade}
                className="px-3 py-1 bg-[rgba(33,196,93,0.2)] text-[#21c45d] rounded-full text-sm font-medium border border-[rgba(33,196,93,0.3)]"
              >
                {upgrade}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      <div className="relative mt-4 text-center">
        <p className="text-xs text-gray-500">
          Click zones to select upgrades for your home
        </p>
      </div>
    </div>
  );
}
