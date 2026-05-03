'use client';

interface PremiumVisualPanelProps {
  variant?: 'blueprint' | 'dashboard' | 'home-upgrade' | 'matching-flow' | 'city-grid';
  className?: string;
}

export default function PremiumVisualPanel({ variant = 'blueprint', className = '' }: PremiumVisualPanelProps) {
  const renderBlueprint = () => (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(248,241,220,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(248,241,220,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Blueprint lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
        {/* House outline */}
        <path d="M50 200 L50 120 L200 50 L350 120 L350 200" stroke="rgba(248,241,220,0.15)" strokeWidth="1.5" fill="none"/>
        <path d="M50 200 L350 200" stroke="rgba(248,241,220,0.15)" strokeWidth="1.5"/>
        
        {/* Interior lines */}
        <path d="M50 150 L200 100 L350 150" stroke="rgba(248,241,220,0.1)" strokeWidth="1" fill="none"/>
        <path d="M125 120 L125 200" stroke="rgba(248,241,220,0.1)" strokeWidth="1" fill="none"/>
        <path d="M275 120 L275 200" stroke="rgba(248,241,220,0.1)" strokeWidth="1" fill="none"/>
        
        {/* Measurement lines */}
        <path d="M50 210 L50 220 L350 220 L350 210" stroke="rgba(33,196,93,0.3)" strokeWidth="1" fill="none"/>
        <path d="M360 120 L370 120 L370 200 L360 200" stroke="rgba(33,196,93,0.3)" strokeWidth="1" fill="none"/>
        
        {/* Solar panels hint */}
        <rect x="80" y="130" width="80" height="50" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.05)"/>
        <line x1="120" y1="130" x2="120" y2="180" stroke="rgba(33,196,93,0.15)" strokeWidth="0.5"/>
        <line x1="80" y1="155" x2="160" y2="155" stroke="rgba(33,196,93,0.15)" strokeWidth="0.5"/>
        
        {/* Window hints */}
        <rect x="140" y="140" width="30" height="25" stroke="rgba(248,241,220,0.1)" strokeWidth="1" fill="none"/>
        <rect x="230" y="140" width="30" height="25" stroke="rgba(248,241,220,0.1)" strokeWidth="1" fill="none"/>
      </svg>
      
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(33,196,93,0.08),transparent_50%)]"></div>
    </div>
  );

  const renderDashboard = () => (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(248,241,220,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(248,241,220,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      {/* Dashboard cards */}
      <div className="absolute inset-0 p-6 flex flex-col gap-4">
        {/* Top row */}
        <div className="flex gap-4 h-1/3">
          <div className="flex-1 rounded-lg border border-[rgba(248,241,220,0.1)] bg-[rgba(248,241,220,0.03)] p-3">
            <div className="w-8 h-2 rounded bg-[rgba(33,196,93,0.2)] mb-2"></div>
            <div className="w-16 h-3 rounded bg-[rgba(248,241,220,0.1)]"></div>
          </div>
          <div className="flex-1 rounded-lg border border-[rgba(248,241,220,0.1)] bg-[rgba(248,241,220,0.03)] p-3">
            <div className="w-8 h-2 rounded bg-[rgba(216,180,95,0.2)] mb-2"></div>
            <div className="w-16 h-3 rounded bg-[rgba(248,241,220,0.1)]"></div>
          </div>
        </div>
        
        {/* Main chart area */}
        <div className="flex-1 rounded-lg border border-[rgba(248,241,220,0.1)] bg-[rgba(248,241,220,0.03)] p-4">
          <div className="w-20 h-2 rounded bg-[rgba(248,241,220,0.1)] mb-4"></div>
          <div className="flex items-end gap-2 h-3/4">
            <div className="flex-1 rounded-t bg-[rgba(33,196,93,0.15)] h-1/3"></div>
            <div className="flex-1 rounded-t bg-[rgba(33,196,93,0.2)] h-1/2"></div>
            <div className="flex-1 rounded-t bg-[rgba(33,196,93,0.25)] h-2/3"></div>
            <div className="flex-1 rounded-t bg-[rgba(33,196,93,0.3)] h-4/5"></div>
            <div className="flex-1 rounded-t bg-[rgba(33,196,93,0.35)] h-full"></div>
          </div>
        </div>
        
        {/* Bottom row */}
        <div className="flex gap-4 h-1/4">
          <div className="flex-1 rounded-lg border border-[rgba(248,241,220,0.1)] bg-[rgba(248,241,220,0.03)] p-3">
            <div className="w-12 h-2 rounded bg-[rgba(248,241,220,0.1)] mb-2"></div>
            <div className="w-full h-2 rounded bg-[rgba(33,196,93,0.1)]"></div>
          </div>
          <div className="flex-1 rounded-lg border border-[rgba(248,241,220,0.1)] bg-[rgba(248,241,220,0.03)] p-3">
            <div className="w-12 h-2 rounded bg-[rgba(248,241,220,0.1)] mb-2"></div>
            <div className="w-full h-2 rounded bg-[rgba(216,180,95,0.1)]"></div>
          </div>
        </div>
      </div>
      
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(33,196,93,0.06),transparent_50%)]"></div>
    </div>
  );

  const renderHomeUpgrade = () => (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(248,241,220,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,241,220,0.04)_1px,transparent_1px)] bg-[size:25px_25px]"></div>
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
        {/* House base */}
        <path d="M100 200 L100 140 L200 80 L300 140 L300 200" stroke="rgba(248,241,220,0.2)" strokeWidth="2" fill="rgba(248,241,220,0.02)"/>
        
        {/* Solar panels on roof */}
        <g>
          <rect x="120" y="115" width="35" height="20" stroke="rgba(33,196,93,0.4)" strokeWidth="1.5" fill="rgba(33,196,93,0.1)"/>
          <line x1="137.5" y1="115" x2="137.5" y2="135" stroke="rgba(33,196,93,0.3)" strokeWidth="0.5"/>
          <line x1="120" y1="125" x2="155" y2="125" stroke="rgba(33,196,93,0.3)" strokeWidth="0.5"/>
        </g>
        <g>
          <rect x="165" y="100" width="35" height="20" stroke="rgba(33,196,93,0.4)" strokeWidth="1.5" fill="rgba(33,196,93,0.1)"/>
          <line x1="182.5" y1="100" x2="182.5" y2="120" stroke="rgba(33,196,93,0.3)" strokeWidth="0.5"/>
          <line x1="165" y1="110" x2="200" y2="110" stroke="rgba(33,196,93,0.3)" strokeWidth="0.5"/>
        </g>
        
        {/* Heat pump unit */}
        <rect x="240" y="175" width="30" height="25" stroke="rgba(216,180,95,0.3)" strokeWidth="1.5" fill="rgba(216,180,95,0.05)" rx="2"/>
        <circle cx="255" cy="187.5" r="6" stroke="rgba(216,180,95,0.2)" strokeWidth="1" fill="none"/>
        
        {/* Energy flow lines */}
        <path d="M137.5 135 Q137.5 160 150 180" stroke="rgba(33,196,93,0.3)" strokeWidth="1" fill="none" strokeDasharray="4 2"/>
        <path d="M182.5 120 Q200 150 255 175" stroke="rgba(33,196,93,0.3)" strokeWidth="1" fill="none" strokeDasharray="4 2"/>
        
        {/* Windows */}
        <rect x="130" y="155" width="25" height="20" stroke="rgba(248,241,220,0.15)" strokeWidth="1" fill="rgba(248,241,220,0.03)"/>
        <rect x="165" y="155" width="25" height="20" stroke="rgba(248,241,220,0.15)" strokeWidth="1" fill="rgba(248,241,220,0.03)"/>
        <rect x="200" y="155" width="25" height="20" stroke="rgba(248,241,220,0.15)" strokeWidth="1" fill="rgba(248,241,220,0.03)"/>
        
        {/* Door */}
        <rect x="235" y="160" width="20" height="40" stroke="rgba(248,241,220,0.15)" strokeWidth="1" fill="rgba(248,241,220,0.03)"/>
      </svg>
      
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(33,196,93,0.08),transparent_50%)]"></div>
    </div>
  );

  const renderMatchingFlow = () => (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(248,241,220,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(248,241,220,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
        {/* Flow nodes */}
        <circle cx="80" cy="80" r="25" stroke="rgba(33,196,93,0.4)" strokeWidth="2" fill="rgba(33,196,93,0.1)"/>
        <text x="80" y="85" textAnchor="middle" fill="rgba(248,241,220,0.6)" fontSize="10" fontWeight="600">YOU</text>
        
        <circle cx="200" cy="150" r="30" stroke="rgba(216,180,95,0.4)" strokeWidth="2" fill="rgba(216,180,95,0.08)"/>
        <text x="200" y="155" textAnchor="middle" fill="rgba(248,241,220,0.6)" fontSize="10" fontWeight="600">MATCH</text>
        
        <circle cx="320" cy="80" r="25" stroke="rgba(33,196,93,0.4)" strokeWidth="2" fill="rgba(33,196,93,0.1)"/>
        <text x="320" y="85" textAnchor="middle" fill="rgba(248,241,220,0.6)" fontSize="10" fontWeight="600">INST 1</text>
        
        <circle cx="320" cy="150" r="25" stroke="rgba(33,196,93,0.4)" strokeWidth="2" fill="rgba(33,196,93,0.1)"/>
        <text x="320" y="155" textAnchor="middle" fill="rgba(248,241,220,0.6)" fontSize="10" fontWeight="600">INST 2</text>
        
        <circle cx="320" cy="220" r="25" stroke="rgba(33,196,93,0.4)" strokeWidth="2" fill="rgba(33,196,93,0.1)"/>
        <text x="320" y="225" textAnchor="middle" fill="rgba(248,241,220,0.6)" fontSize="10" fontWeight="600">INST 3</text>
        
        {/* Connection lines */}
        <path d="M105 80 Q150 80 170 150" stroke="rgba(33,196,93,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
        <path d="M230 150 Q270 150 295 80" stroke="rgba(33,196,93,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
        <path d="M230 150 L295 150" stroke="rgba(33,196,93,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
        <path d="M230 150 Q270 150 295 220" stroke="rgba(33,196,93,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
        
        {/* Pulse effect */}
        <circle cx="200" cy="150" r="35" stroke="rgba(216,180,95,0.15)" strokeWidth="1" fill="none"/>
        <circle cx="200" cy="150" r="40" stroke="rgba(216,180,95,0.08)" strokeWidth="1" fill="none"/>
      </svg>
      
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,180,95,0.06),transparent_50%)]"></div>
    </div>
  );

  const renderCityGrid = () => (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(248,241,220,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,241,220,0.04)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
        {/* City buildings */}
        <rect x="40" y="120" width="50" height="130" stroke="rgba(248,241,220,0.15)" strokeWidth="1.5" fill="rgba(248,241,220,0.03)"/>
        <rect x="50" y="130" width="8" height="12" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="65" y="130" width="8" height="12" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="50" y="150" width="8" height="12" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="65" y="150" width="8" height="12" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        
        <rect x="110" y="80" width="60" height="170" stroke="rgba(248,241,220,0.15)" strokeWidth="1.5" fill="rgba(248,241,220,0.03)"/>
        <rect x="120" y="90" width="10" height="15" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="140" y="90" width="10" height="15" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="120" y="115" width="10" height="15" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="140" y="115" width="10" height="15" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        
        <rect x="190" y="100" width="45" height="150" stroke="rgba(248,241,220,0.15)" strokeWidth="1.5" fill="rgba(248,241,220,0.03)"/>
        <rect x="200" y="110" width="8" height="12" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="215" y="110" width="8" height="12" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        
        <rect x="250" y="60" width="55" height="190" stroke="rgba(248,241,220,0.15)" strokeWidth="1.5" fill="rgba(248,241,220,0.03)"/>
        <rect x="260" y="70" width="10" height="15" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="280" y="70" width="10" height="15" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="260" y="95" width="10" height="15" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="280" y="95" width="10" height="15" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        
        <rect x="320" y="130" width="50" height="120" stroke="rgba(248,241,220,0.15)" strokeWidth="1.5" fill="rgba(248,241,220,0.03)"/>
        <rect x="330" y="140" width="8" height="12" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        <rect x="345" y="140" width="8" height="12" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(33,196,93,0.1)"/>
        
        {/* Connection lines */}
        <path d="M65 250 L140 250 L212 250 L277 250 L345 250" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="none"/>
        
        {/* Location pin */}
        <path d="M200 40 L200 60" stroke="rgba(216,180,95,0.4)" strokeWidth="2"/>
        <circle cx="200" cy="35" r="8" stroke="rgba(216,180,95,0.4)" strokeWidth="2" fill="rgba(216,180,95,0.1)"/>
      </svg>
      
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(33,196,93,0.06),transparent_50%)]"></div>
    </div>
  );

  return (
    <div className={`rounded-2xl border border-[rgba(248,241,220,0.1)] bg-[#0f172a] overflow-hidden ${className}`}>
      {variant === 'blueprint' && renderBlueprint()}
      {variant === 'dashboard' && renderDashboard()}
      {variant === 'home-upgrade' && renderHomeUpgrade()}
      {variant === 'matching-flow' && renderMatchingFlow()}
      {variant === 'city-grid' && renderCityGrid()}
    </div>
  );
}
