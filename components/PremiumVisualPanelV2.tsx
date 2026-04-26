'use client';

interface PremiumVisualPanelV2Props {
  variant?: 'hero-marketplace' | 'solar-upgrade' | 'heat-pump-upgrade' | 'renovation-blueprint' | 'city-coverage' | 'matching-engine';
  className?: string;
}

// Shared background components
const BlueprintGrid = () => (
  <div className="absolute inset-0 bg-[linear-gradient(rgba(248,241,220,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,241,220,0.04)_1px,transparent_1px)] bg-[size:25px_25px]"></div>
);

const DarkGreenGradient = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#051914] via-[#061f18] to-[#0a251e]"></div>
);

const AmbientGlow = ({ position = 'center' }: { position?: 'center' | 'top' | 'left' }) => {
  const gradients = {
    center: 'radial-gradient(circle_at_50%_50%,rgba(33,196,93,0.12),transparent_50%)',
    top: 'radial-gradient(circle_at_50%_30%,rgba(33,196,93,0.12),transparent_50%)',
    left: 'radial-gradient(circle_at_30%_50%,rgba(33,196,93,0.12),transparent_50%)',
  };
  return <div className="absolute inset-0" style={{ background: gradients[position] }}></div>;
};

// Realism layers
const TextureOverlay = () => (
  <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
    backgroundSize: '3px 3px'
  }}></div>
);

const Vignette = () => (
  <div className="absolute inset-0 pointer-events-none" style={{
    background: 'radial-gradient(circle at 50% 50%, transparent 35%, rgba(0,0,0,0.25) 100%)'
  }}></div>
);

const SkyGradient = () => (
  <div className="absolute inset-0 pointer-events-none" style={{
    background: 'linear-gradient(to bottom, rgba(135,206,235,0.08) 0%, transparent 35%)'
  }}></div>
);

const GroundShadow = () => (
  <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
    background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)'
  }}></div>
);

// Depth layers
const ForegroundGlow = () => (
  <div className="absolute inset-0 pointer-events-none" style={{
    background: 'radial-gradient(circle at 50% 50%, rgba(33,196,93,0.05) 0%, transparent 70%)'
  }}></div>
);

const GlassLayer = () => (
  <div className="absolute inset-0 pointer-events-none" style={{
    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)'
  }}></div>
);

// Installer card component
const InstallerCard = ({ index, highlighted = false }: { index: number; highlighted?: boolean }) => (
  <div className={`bg-[rgba(15,23,42,0.8)] backdrop-blur-md rounded-xl border p-4 transition-all ${highlighted ? 'border-[rgba(33,196,93,0.6)] shadow-[0_0_30px_rgba(33,196,93,0.3)] scale-[1.02]' : 'border-[rgba(33,196,93,0.3)] shadow-lg opacity-80'}`}>
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${highlighted ? 'bg-[rgba(33,196,93,0.3)]' : 'bg-[rgba(33,196,93,0.2)]'}`}>
        <div className={`w-4 h-4 rounded-full ${highlighted ? 'bg-[#21c45d] animate-pulse' : 'bg-[#21c45d]'}`}></div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className={`h-2 rounded ${highlighted ? 'bg-[rgba(248,241,220,0.5)]' : 'bg-[rgba(248,241,220,0.3)]'}`} style={{ width: `${80 - index * 5}px` }}></div>
          <div className={`w-2 h-2 rounded-full ${highlighted ? 'bg-[#21c45d]' : 'bg-[#21c45d]'}`}></div>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <div className={`h-1.5 rounded ${highlighted ? 'bg-[rgba(248,241,220,0.25)]' : 'bg-[rgba(248,241,220,0.15)]'}`} style={{ width: `${48 + index * 4}px` }}></div>
          <div className="flex gap-0.5">
            {[...Array(5 - index)].map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${highlighted ? 'bg-[#fbbf24]' : 'bg-[#fbbf24]'}`}></div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className={`w-12 h-2 rounded ${highlighted ? 'bg-[rgba(33,196,93,0.5)]' : 'bg-[rgba(33,196,93,0.3)]'}`}></div>
        <div className={`mt-1 w-8 h-1.5 rounded ${highlighted ? 'bg-[rgba(248,241,220,0.25)]' : 'bg-[rgba(248,241,220,0.15)]'}`}></div>
      </div>
    </div>
  </div>
);

export default function PremiumVisualPanelV2({ variant = 'hero-marketplace', className = '' }: PremiumVisualPanelV2Props) {
  return (
    <div className={`rounded-2xl border border-[rgba(248,241,220,0.1)] overflow-hidden relative ${className}`}>
      {variant === 'hero-marketplace' && <HeroMarketplace />}
      {variant === 'solar-upgrade' && <SolarUpgrade />}
      {variant === 'heat-pump-upgrade' && <HeatPumpUpgrade />}
      {variant === 'renovation-blueprint' && <RenovationBlueprint />}
      {variant === 'city-coverage' && <CityCoverage />}
      {variant === 'matching-engine' && <MatchingEngine />}
    </div>
  );
}

// Placeholder variants - will implement each in separate edits
function HeroMarketplace() {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden">
      <DarkGreenGradient />
      <BlueprintGrid />
      <AmbientGlow position="top" />
      <TextureOverlay />
      <SkyGradient />
      <GroundShadow />
      <Vignette />
      <ForegroundGlow />
      <GlassLayer />
      
      {/* Home silhouette background - darker for depth */}
      <svg className="absolute inset-0 w-full h-full opacity-60 blur-[1px]" viewBox="0 0 500 400" fill="none">
        <path d="M100 280 L100 180 L250 80 L400 180 L400 280" stroke="rgba(248,241,220,0.05)" strokeWidth="2" fill="rgba(248,241,220,0.005)"/>
        <path d="M100 280 L400 280" stroke="rgba(248,241,220,0.05)" strokeWidth="2"/>
        <path d="M100 180 L250 80 L400 180" stroke="rgba(33,196,93,0.1)" strokeWidth="1.5" fill="none"/>
        <rect x="140" y="200" width="40" height="35" stroke="rgba(248,241,220,0.04)" strokeWidth="1" fill="rgba(248,241,220,0.01)"/>
        <rect x="210" y="200" width="40" height="35" stroke="rgba(248,241,220,0.04)" strokeWidth="1" fill="rgba(248,241,220,0.01)"/>
        <rect x="280" y="200" width="40" height="35" stroke="rgba(248,241,220,0.04)" strokeWidth="1" fill="rgba(248,241,220,0.01)"/>
        <rect x="220" y="245" width="30" height="35" stroke="rgba(248,241,220,0.04)" strokeWidth="1" fill="rgba(248,241,220,0.01)"/>
      </svg>
      
      <div className="absolute inset-0 p-6 flex flex-col justify-center gap-3">
        {[0, 1, 2].map((i) => <InstallerCard key={i} index={i} highlighted={i === 0} />)}
      </div>
      
      {/* Contextual labels */}
      <div className="absolute top-4 left-4 bg-[rgba(15,23,42,0.7)] backdrop-blur-md rounded-lg px-3 py-2 border border-[rgba(248,241,220,0.15)] shadow-lg">
        <p className="text-xs text-[#f8f1dc] opacity-80">Amsterdam</p>
        <p className="text-[10px] text-[#f8f1dc] opacity-60">Solar installation</p>
      </div>
      
      <div className="absolute top-4 right-4 bg-[rgba(33,196,93,0.2)] backdrop-blur-md rounded-full px-3 py-1.5 border border-[rgba(33,196,93,0.4)] shadow-[0_0_20px_rgba(33,196,93,0.2)]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#21c45d] animate-pulse"></div>
          <span className="text-xs font-medium text-[#f8f1dc]">Live matching</span>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 bg-[rgba(15,23,42,0.7)] backdrop-blur-md rounded-lg px-3 py-2 border border-[rgba(33,196,93,0.3)] shadow-lg">
        <p className="text-xs text-[#21c45d] font-medium">Available today</p>
      </div>
    </div>
  );
}

function SolarUpgrade() {
  return (
    <div className="relative w-full h-full min-h-[350px] overflow-hidden">
      <DarkGreenGradient />
      <BlueprintGrid />
      <AmbientGlow position="top" />
      <TextureOverlay />
      <SkyGradient />
      <GroundShadow />
      <Vignette />
      <ForegroundGlow />
      <GlassLayer />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 350" fill="none">
        {/* Roof structure - darker background */}
        <path d="M50 200 L50 140 L250 50 L450 140 L450 200" stroke="rgba(248,241,220,0.08)" strokeWidth="2" fill="rgba(248,241,220,0.015)"/>
        <path d="M50 200 L450 200" stroke="rgba(248,241,220,0.08)" strokeWidth="2"/>
        
        {/* Solar panel array - left (dimmed for depth) */}
        <g opacity="0.6">
          <rect x="80" y="110" width="70" height="40" stroke="rgba(33,196,93,0.3)" strokeWidth="1.5" fill="rgba(33,196,93,0.08)"/>
          <line x1="115" y1="110" x2="115" y2="150" stroke="rgba(33,196,93,0.2)" strokeWidth="0.8"/>
          <line x1="80" y1="130" x2="150" y2="130" stroke="rgba(33,196,93,0.2)" strokeWidth="0.8"/>
        </g>
        
        {/* Solar panel array - center (FOCAL POINT - highlighted) */}
        <g>
          <rect x="180" y="95" width="70" height="40" stroke="rgba(33,196,93,0.7)" strokeWidth="2.5" fill="rgba(33,196,93,0.18)" className="shadow-[0_0_20px_rgba(33,196,93,0.3)]"/>
          <line x1="215" y1="95" x2="215" y2="135" stroke="rgba(33,196,93,0.5)" strokeWidth="1.2"/>
          <line x1="180" y1="115" x2="250" y2="115" stroke="rgba(33,196,93,0.5)" strokeWidth="1.2"/>
          <line x1="197.5" y1="95" x2="197.5" y2="135" stroke="rgba(33,196,93,0.3)" strokeWidth="0.6"/>
          <line x1="232.5" y1="95" x2="232.5" y2="135" stroke="rgba(33,196,93,0.3)" strokeWidth="0.6"/>
          <line x1="180" y1="105" x2="250" y2="105" stroke="rgba(33,196,93,0.3)" strokeWidth="0.6"/>
          <line x1="180" y1="125" x2="250" y2="125" stroke="rgba(33,196,93,0.3)" strokeWidth="0.6"/>
        </g>
        
        {/* Solar panel array - right (dimmed for depth) */}
        <g opacity="0.6">
          <rect x="280" y="110" width="70" height="40" stroke="rgba(33,196,93,0.3)" strokeWidth="1.5" fill="rgba(33,196,93,0.08)"/>
          <line x1="315" y1="110" x2="315" y2="150" stroke="rgba(33,196,93,0.2)" strokeWidth="0.8"/>
          <line x1="280" y1="130" x2="350" y2="130" stroke="rgba(33,196,93,0.2)" strokeWidth="0.8"/>
        </g>
        
        {/* Energy flow lines - center highlighted */}
        <path d="M215 135 Q215 170 230 220" stroke="rgba(33,196,93,0.6)" strokeWidth="2" fill="none" strokeDasharray="6 3" className="animate-pulse"/>
        <path d="M115 150 Q115 180 130 220" stroke="rgba(33,196,93,0.25)" strokeWidth="1" fill="none" strokeDasharray="6 3"/>
        <path d="M315 150 Q315 180 330 220" stroke="rgba(33,196,93,0.25)" strokeWidth="1" fill="none" strokeDasharray="6 3"/>
        
        {/* Inverter box - highlighted */}
        <rect x="180" y="220" width="100" height="50" stroke="rgba(248,241,220,0.3)" strokeWidth="2" fill="rgba(248,241,220,0.05)" rx="3"/>
        <line x1="230" y1="220" x2="230" y2="270" stroke="rgba(33,196,93,0.5)" strokeWidth="1.2"/>
        <circle cx="210" cy="245" r="8" stroke="rgba(33,196,93,0.5)" strokeWidth="1.2" fill="rgba(33,196,93,0.1)"/>
        <circle cx="250" cy="245" r="8" stroke="rgba(33,196,93,0.5)" strokeWidth="1.2" fill="rgba(33,196,93,0.1)"/>
        
        {/* Quote card - stronger */}
        <rect x="320" y="280" width="140" height="50" stroke="rgba(33,196,93,0.5)" strokeWidth="1.5" fill="rgba(15,23,42,0.9)" rx="4" className="shadow-lg"/>
        <line x1="330" y1="295" x2="380" y2="295" stroke="rgba(248,241,220,0.5)" strokeWidth="2.5"/>
        <line x1="330" y1="310" x2="350" y2="310" stroke="rgba(33,196,93,0.6)" strokeWidth="2.5"/>
      </svg>
      
      {/* Sun glow with stronger motion */}
      <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.25),transparent_70%)] animate-pulse shadow-[0_0_30px_rgba(251,191,36,0.2)]"></div>
      
      {/* Contextual label */}
      <div className="absolute bottom-4 left-4 bg-[rgba(15,23,42,0.8)] backdrop-blur-md rounded-lg px-3 py-2 border border-[rgba(248,241,220,0.15)] shadow-lg">
        <p className="text-xs text-[#f8f1dc] opacity-80">Roof installation</p>
        <p className="text-[10px] text-[#f8f1dc] opacity-60">Estimated: €8,500–12,000</p>
      </div>
    </div>
  );
}

function HeatPumpUpgrade() {
  return (
    <div className="relative w-full h-full min-h-[350px] overflow-hidden">
      <DarkGreenGradient />
      <BlueprintGrid />
      <AmbientGlow position="center" />
      <TextureOverlay />
      <SkyGradient />
      <GroundShadow />
      <Vignette />
      <ForegroundGlow />
      <GlassLayer />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 350" fill="none">
        {/* House wall section - darker for depth */}
        <rect x="50" y="80" width="200" height="220" stroke="rgba(248,241,220,0.08)" strokeWidth="2" fill="rgba(248,241,220,0.015)"/>
        
        {/* Window - dimmed */}
        <rect x="90" y="120" width="60" height="50" stroke="rgba(248,241,220,0.07)" strokeWidth="1.5" fill="rgba(248,241,220,0.02)"/>
        <line x1="120" y1="120" x2="120" y2="170" stroke="rgba(248,241,220,0.05)" strokeWidth="1"/>
        <line x1="90" y1="145" x2="150" y2="145" stroke="rgba(248,241,220,0.05)" strokeWidth="1"/>
        
        {/* Door - dimmed */}
        <rect x="130" y="200" width="40" height="70" stroke="rgba(248,241,220,0.07)" strokeWidth="1.5" fill="rgba(248,241,220,0.02)"/>
        <circle cx="160" cy="235" r="3" fill="rgba(248,241,220,0.15)"/>
        
        {/* Heat pump outdoor unit (FOCAL POINT - highlighted) */}
        <rect x="300" y="180" width="100" height="80" stroke="rgba(216,180,95,0.6)" strokeWidth="2.5" fill="rgba(216,180,95,0.12)" rx="4" className="shadow-[0_0_25px_rgba(216,180,95,0.3)]"/>
        <line x1="300" y1="210" x2="400" y2="210" stroke="rgba(216,180,95,0.5)" strokeWidth="1.2"/>
        <line x1="300" y1="230" x2="400" y2="230" stroke="rgba(216,180,95,0.5)" strokeWidth="1.2"/>
        <circle cx="330" cy="195" r="12" stroke="rgba(216,180,95,0.5)" strokeWidth="2" fill="rgba(216,180,95,0.15)"/>
        <circle cx="370" cy="195" r="12" stroke="rgba(216,180,95,0.5)" strokeWidth="2" fill="rgba(216,180,95,0.15)"/>
        
        {/* Warm airflow (red/orange) - highlighted */}
        <path d="M350 180 Q350 150 380 120" stroke="rgba(239,68,68,0.6)" strokeWidth="2.5" fill="none" strokeDasharray="8 4" className="animate-pulse"/>
        <path d="M350 180 Q350 140 400 100" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="8 4"/>
        
        {/* Cold airflow (blue) - highlighted */}
        <path d="M350 260 Q350 290 320 320" stroke="rgba(59,130,246,0.6)" strokeWidth="2.5" fill="none" strokeDasharray="8 4" className="animate-pulse"/>
        <path d="M350 260 Q350 300 300 340" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="8 4"/>
        
        {/* Piping connection - stronger */}
        <path d="M300 220 L250 220 L250 250" stroke="rgba(248,241,220,0.5)" strokeWidth="2.5" fill="none"/>
        <path d="M300 240 L260 240 L260 250" stroke="rgba(248,241,220,0.5)" strokeWidth="2.5" fill="none"/>
        
        {/* Indoor unit - highlighted */}
        <rect x="230" y="250" width="60" height="25" stroke="rgba(248,241,220,0.25)" strokeWidth="2" fill="rgba(248,241,220,0.06)" rx="2"/>
        <line x1="230" y1="260" x2="290" y2="260" stroke="rgba(248,241,220,0.15)" strokeWidth="0.8"/>
        
        {/* Installer status card - stronger */}
        <rect x="50" y="290" width="150" height="40" stroke="rgba(33,196,93,0.5)" strokeWidth="1.5" fill="rgba(15,23,42,0.9)" rx="4" className="shadow-lg"/>
        <circle cx="70" cy="310" r="6" fill="rgba(33,196,93,0.5)"/>
        <line x1="85" y1="305" x2="130" y2="305" stroke="rgba(248,241,220,0.5)" strokeWidth="2"/>
        <line x1="85" y1="315" x2="110" y2="315" stroke="rgba(33,196,93,0.6)" strokeWidth="2"/>
      </svg>
      
      {/* Contextual label */}
      <div className="absolute bottom-4 left-4 bg-[rgba(15,23,42,0.8)] backdrop-blur-md rounded-lg px-3 py-2 border border-[rgba(248,241,220,0.15)] shadow-lg">
        <p className="text-xs text-[#f8f1dc] opacity-80">Heat pump install</p>
        <p className="text-[10px] text-[#f8f1dc] opacity-60">Local match available</p>
      </div>
    </div>
  );
}

function RenovationBlueprint() {
  return (
    <div className="relative w-full h-full min-h-[350px] overflow-hidden bg-[#051914]">
      <BlueprintGrid />
      <TextureOverlay />
      <Vignette />
      <ForegroundGlow />
      <GlassLayer />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 350" fill="none">
        {/* Room outline - stronger */}
        <path d="M60 60 L60 280 L440 280 L440 60" stroke="rgba(248,241,220,0.35)" strokeWidth="2.5" fill="none"/>
        <path d="M60 60 L440 60" stroke="rgba(248,241,220,0.35)" strokeWidth="2.5"/>
        
        {/* Interior walls - dimmed for depth */}
        <path d="M60 170 L250 170 L250 280" stroke="rgba(248,241,220,0.12)" strokeWidth="1.5" fill="none"/>
        <path d="M250 60 L250 170" stroke="rgba(248,241,220,0.12)" strokeWidth="1.5" fill="none"/>
        
        {/* Door openings - dimmed */}
        <path d="M60 120 L100 120" stroke="rgba(248,241,220,0.1)" strokeWidth="1.5" strokeDasharray="4 2"/>
        <path d="M250 200 L290 200" stroke="rgba(248,241,220,0.1)" strokeWidth="1.5" strokeDasharray="4 2"/>
        
        {/* Window placements - dimmed */}
        <rect x="150" y="57" width="50" height="6" stroke="rgba(248,241,220,0.15)" strokeWidth="1" fill="rgba(248,241,220,0.03)"/>
        <rect x="320" y="57" width="50" height="6" stroke="rgba(248,241,220,0.15)" strokeWidth="1" fill="rgba(248,241,220,0.03)"/>
        <rect x="57" y="200" width="6" height="40" stroke="rgba(248,241,220,0.15)" strokeWidth="1" fill="rgba(248,241,220,0.03)"/>
        
        {/* Measurement lines - stronger */}
        <path d="M60 290 L60 300 L440 300 L440 290" stroke="rgba(33,196,93,0.6)" strokeWidth="1.5" fill="none"/>
        <path d="M450 60 L460 60 L460 280 L450 280" stroke="rgba(33,196,93,0.6)" strokeWidth="1.5" fill="none"/>
        
        {/* Dimension text - brighter */}
        <text x="250" y="312" textAnchor="middle" fill="rgba(33,196,93,0.7)" fontSize="11" fontWeight="700">8.5m</text>
        <text x="468" y="170" textAnchor="middle" fill="rgba(33,196,93,0.7)" fontSize="11" fontWeight="700" transform="rotate(90, 468, 170)">6.2m</text>
        
        {/* Room labels - dimmed except focal */}
        <text x="155" y="115" textAnchor="middle" fill="rgba(248,241,220,0.25)" fontSize="10" fontWeight="500">LIVING</text>
        <text x="345" y="115" textAnchor="middle" fill="rgba(248,241,220,0.25)" fontSize="10" fontWeight="500">KITCHEN</text>
        <text x="155" y="225" textAnchor="middle" fill="rgba(248,241,220,0.25)" fontSize="10" fontWeight="500">BEDROOM</text>
        <text x="345" y="225" textAnchor="middle" fill="rgba(248,241,220,0.25)" fontSize="10" fontWeight="500">BATH</text>
        
        {/* Renovation markers (FOCAL POINT - highlighted) */}
        <circle cx="155" cy="140" r="5" fill="rgba(33,196,93,0.6)" className="animate-pulse"/>
        <circle cx="345" cy="140" r="5" fill="rgba(33,196,93,0.6)" className="animate-pulse"/>
        <circle cx="155" cy="250" r="5" fill="rgba(33,196,93,0.6)" className="animate-pulse"/>
        
        {/* Tool icon - stronger */}
        <rect x="380" y="80" width="30" height="20" stroke="rgba(216,180,95,0.5)" strokeWidth="1.5" fill="rgba(216,180,95,0.12)" rx="2" className="shadow-[0_0_15px_rgba(216,180,95,0.2)]"/>
        <line x1="385" y1="90" x2="405" y2="90" stroke="rgba(216,180,95,0.4)" strokeWidth="0.8"/>
        <line x1="385" y1="95" x2="405" y2="95" stroke="rgba(216,180,95,0.4)" strokeWidth="0.8"/>
        
        {/* Quote marker - stronger */}
        <rect x="380" y="240" width="40" height="25" stroke="rgba(33,196,93,0.5)" strokeWidth="1.5" fill="rgba(33,196,93,0.12)" rx="2" className="shadow-lg"/>
        <text x="400" y="256" textAnchor="middle" fill="rgba(33,196,93,0.7)" fontSize="9" fontWeight="700">QUOTE</text>
      </svg>
      
      {/* Blueprint corner accents - stronger */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[rgba(248,241,220,0.25)]"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[rgba(248,241,220,0.25)]"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[rgba(248,241,220,0.25)]"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[rgba(248,241,220,0.25)]"></div>
      
      {/* Contextual label */}
      <div className="absolute bottom-4 left-4 bg-[rgba(15,23,42,0.8)] backdrop-blur-md rounded-lg px-3 py-2 border border-[rgba(248,241,220,0.15)] shadow-lg">
        <p className="text-xs text-[#f8f1dc] opacity-80">Renovation plan</p>
        <p className="text-[10px] text-[#f8f1dc] opacity-60">Project in Utrecht</p>
      </div>
    </div>
  );
}

function CityCoverage() {
  return (
    <div className="relative w-full h-full min-h-[350px] overflow-hidden">
      <DarkGreenGradient />
      <BlueprintGrid />
      <AmbientGlow position="left" />
      <TextureOverlay />
      <SkyGradient />
      <GroundShadow />
      <Vignette />
      <ForegroundGlow />
      <GlassLayer />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 350" fill="none">
        {/* City blocks - dimmed for depth */}
        <rect x="40" y="100" width="60" height="80" stroke="rgba(248,241,220,0.08)" strokeWidth="1.5" fill="rgba(248,241,220,0.015)"/>
        <rect x="50" y="110" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="70" y="110" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="50" y="135" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="70" y="135" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        
        <rect x="120" y="60" width="80" height="120" stroke="rgba(248,241,220,0.08)" strokeWidth="1.5" fill="rgba(248,241,220,0.015)"/>
        <rect x="130" y="70" width="12" height="18" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="155" y="70" width="12" height="18" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="180" y="70" width="12" height="18" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="130" y="100" width="12" height="18" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="155" y="100" width="12" height="18" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="180" y="100" width="12" height="18" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        
        <rect x="220" y="80" width="70" height="100" stroke="rgba(248,241,220,0.08)" strokeWidth="1.5" fill="rgba(248,241,220,0.015)"/>
        <rect x="230" y="90" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="255" y="90" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="230" y="115" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="255" y="115" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        
        <rect x="310" y="50" width="90" height="130" stroke="rgba(248,241,220,0.08)" strokeWidth="1.5" fill="rgba(248,241,220,0.015)"/>
        <rect x="320" y="60" width="14" height="20" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="350" y="60" width="14" height="20" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="380" y="60" width="14" height="20" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="320" y="90" width="14" height="20" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="350" y="90" width="14" height="20" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="380" y="90" width="14" height="20" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        
        <rect x="410" y="100" width="60" height="80" stroke="rgba(248,241,220,0.08)" strokeWidth="1.5" fill="rgba(248,241,220,0.015)"/>
        <rect x="420" y="110" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="445" y="110" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="420" y="135" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        <rect x="445" y="135" width="10" height="15" stroke="rgba(33,196,93,0.15)" strokeWidth="1" fill="rgba(33,196,93,0.06)"/>
        
        {/* Street connections - dimmed */}
        <path d="M70 180 L70 220 L160 220 L160 180" stroke="rgba(248,241,220,0.05)" strokeWidth="1" fill="none"/>
        <path d="M160 220 L290 220 L290 180" stroke="rgba(248,241,220,0.05)" strokeWidth="1" fill="none"/>
        <path d="M290 220 L355 220 L355 180" stroke="rgba(248,241,220,0.05)" strokeWidth="1" fill="none"/>
        <path d="M355 220 L440 220 L440 180" stroke="rgba(248,241,220,0.05)" strokeWidth="1" fill="none"/>
        
        {/* Location pins - left dimmed, right highlighted (FOCAL POINT) */}
        <g opacity="0.5">
          <path d="M160 40 L160 55" stroke="rgba(33,196,93,0.3)" strokeWidth="2"/>
          <circle cx="160" cy="35" r="10" stroke="rgba(33,196,93,0.3)" strokeWidth="2" fill="rgba(33,196,93,0.1)"/>
          <circle cx="160" cy="35" r="4" fill="rgba(33,196,93,0.25)"/>
        </g>
        
        <g>
          <path d="M355 30 L355 45" stroke="rgba(33,196,93,0.8)" strokeWidth="2.5" className="animate-pulse"/>
          <circle cx="355" cy="25" r="12" stroke="rgba(33,196,93,0.8)" strokeWidth="2.5" fill="rgba(33,196,93,0.2)" className="shadow-[0_0_20px_rgba(33,196,93,0.4)]"/>
          <circle cx="355" cy="25" r="5" fill="rgba(33,196,93,0.7)"/>
        </g>
        
        {/* Availability radius circles - right highlighted */}
        <circle cx="160" cy="120" r="50" stroke="rgba(33,196,93,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 4"/>
        <circle cx="355" cy="115" r="65" stroke="rgba(33,196,93,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-pulse"/>
        
        {/* Installer count badges - right highlighted */}
        <rect x="135" y="200" width="50" height="20" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="rgba(15,23,42,0.7)" rx="3"/>
        <text x="160" y="213" textAnchor="middle" fill="rgba(33,196,93,0.4)" fontSize="9" fontWeight="500">12 inst</text>
        
        <rect x="330" y="200" width="50" height="20" stroke="rgba(33,196,93,0.6)" strokeWidth="1.5" fill="rgba(15,23,42,0.9)" rx="3" className="shadow-lg"/>
        <text x="355" y="213" textAnchor="middle" fill="rgba(33,196,93,0.8)" fontSize="9" fontWeight="700">18 inst</text>
      </svg>
      
      {/* Coverage legend - stronger */}
      <div className="absolute bottom-4 left-4 bg-[rgba(15,23,42,0.8)] backdrop-blur-md rounded-lg px-3 py-2 border border-[rgba(33,196,93,0.3)] shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#21c45d]"></div>
          <span className="text-xs text-[#f8f1dc]">Active coverage</span>
        </div>
      </div>
      
      {/* Contextual label */}
      <div className="absolute top-4 right-4 bg-[rgba(15,23,42,0.8)] backdrop-blur-md rounded-lg px-3 py-2 border border-[rgba(248,241,220,0.15)] shadow-lg">
        <p className="text-xs text-[#f8f1dc] opacity-80">Rotterdam area</p>
        <p className="text-[10px] text-[#f8f1dc] opacity-60">30 installers active</p>
      </div>
    </div>
  );
}

function MatchingEngine() {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden">
      <DarkGreenGradient />
      <BlueprintGrid />
      <AmbientGlow position="center" />
      <TextureOverlay />
      <SkyGradient />
      <GroundShadow />
      <Vignette />
      <ForegroundGlow />
      <GlassLayer />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400" fill="none">
        {/* Project request card - dimmed for depth */}
        <rect x="30" y="150" width="120" height="80" stroke="rgba(33,196,93,0.3)" strokeWidth="1.5" fill="rgba(33,196,93,0.06)" rx="6"/>
        <line x1="45" y1="170" x2="95" y2="170" stroke="rgba(248,241,220,0.2)" strokeWidth="1.5"/>
        <line x1="45" y1="185" x2="75" y2="185" stroke="rgba(248,241,220,0.15)" strokeWidth="1"/>
        <line x1="45" y1="200" x2="85" y2="200" stroke="rgba(248,241,220,0.15)" strokeWidth="1"/>
        <text x="90" y="218" textAnchor="middle" fill="rgba(33,196,93,0.4)" fontSize="9" fontWeight="500">YOUR PROJECT</text>
        
        {/* Matching engine hub (FOCAL POINT - gold accent + glow) */}
        <circle cx="250" cy="190" r="50" stroke="rgba(216,180,95,0.8)" strokeWidth="3" fill="rgba(216,180,95,0.15)" className="shadow-[0_0_40px_rgba(216,180,95,0.5)]"/>
        <circle cx="250" cy="190" r="38" stroke="rgba(216,180,95,0.5)" strokeWidth="2" fill="none"/>
        <circle cx="250" cy="190" r="28" stroke="rgba(216,180,95,0.3)" strokeWidth="1.5" fill="none"/>
        <text x="250" y="185" textAnchor="middle" fill="rgba(248,241,220,0.7)" fontSize="11" fontWeight="700">MATCH</text>
        <text x="250" y="200" textAnchor="middle" fill="rgba(248,241,220,0.6)" fontSize="9" fontWeight="600">ENGINE</text>
        
        {/* Pulse rings with stronger animation */}
        <circle cx="250" cy="190" r="60" stroke="rgba(216,180,95,0.3)" strokeWidth="1.5" fill="none" className="animate-pulse"/>
        <circle cx="250" cy="190" r="72" stroke="rgba(216,180,95,0.15)" strokeWidth="1" fill="none" className="animate-pulse"/>
        
        {/* Installer match cards - varied opacity for hierarchy */}
        <rect x="350" y="80" width="120" height="60" stroke="rgba(33,196,93,0.3)" strokeWidth="1.5" fill="rgba(33,196,93,0.05)" rx="4" opacity="0.7"/>
        <circle cx="375" cy="100" r="8" fill="rgba(33,196,93,0.25)"/>
        <line x1="390" y1="95" x2="440" y2="95" stroke="rgba(248,241,220,0.2)" strokeWidth="1"/>
        <line x1="390" y1="108" x2="420" y2="108" stroke="rgba(33,196,93,0.25)" strokeWidth="1"/>
        <text x="410" y="128" textAnchor="middle" fill="rgba(33,196,93,0.4)" fontSize="8" fontWeight="500">MATCH 92%</text>
        
        <rect x="350" y="160" width="120" height="60" stroke="rgba(33,196,93,0.5)" strokeWidth="2" fill="rgba(33,196,93,0.1)" rx="4" className="shadow-lg"/>
        <circle cx="375" cy="180" r="8" fill="rgba(33,196,93,0.5)"/>
        <line x1="390" y1="175" x2="440" y2="175" stroke="rgba(248,241,220,0.4)" strokeWidth="1.5"/>
        <line x1="390" y1="188" x2="420" y2="188" stroke="rgba(33,196,93,0.5)" strokeWidth="1.5"/>
        <text x="410" y="208" textAnchor="middle" fill="rgba(33,196,93,0.7)" fontSize="9" fontWeight="700">MATCH 87%</text>
        
        <rect x="350" y="240" width="120" height="60" stroke="rgba(33,196,93,0.25)" strokeWidth="1" fill="rgba(33,196,93,0.04)" rx="4" opacity="0.6"/>
        <circle cx="375" cy="260" r="8" fill="rgba(33,196,93,0.2)"/>
        <line x1="390" y1="255" x2="440" y2="255" stroke="rgba(248,241,220,0.2)" strokeWidth="1"/>
        <line x1="390" y1="268" x2="420" y2="268" stroke="rgba(33,196,93,0.25)" strokeWidth="1"/>
        <text x="410" y="288" textAnchor="middle" fill="rgba(33,196,93,0.35)" fontSize="8" fontWeight="500">MATCH 81%</text>
        
        {/* Connection arrows - animated flow */}
        <path d="M150 190 L195 190" stroke="rgba(33,196,93,0.5)" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" className="animate-pulse"/>
        <path d="M305 190 L340 110" stroke="rgba(33,196,93,0.25)" strokeWidth="1" fill="none" strokeDasharray="4 2"/>
        <path d="M305 190 L340 190" stroke="rgba(33,196,93,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="4 2" className="animate-pulse"/>
        <path d="M305 190 L340 270" stroke="rgba(33,196,93,0.2)" strokeWidth="1" fill="none" strokeDasharray="4 2"/>
        
        {/* Status indicators - stronger */}
        <rect x="30" y="260" width="80" height="25" stroke="rgba(33,196,93,0.4)" strokeWidth="1.5" fill="rgba(15,23,42,0.9)" rx="3" className="shadow-lg"/>
        <text x="70" y="276" textAnchor="middle" fill="rgba(33,196,93,0.7)" fontSize="8" fontWeight="700">PROCESSING</text>
        
        <rect x="350" y="320" width="120" height="25" stroke="rgba(33,196,93,0.4)" strokeWidth="1.5" fill="rgba(15,23,42,0.9)" rx="3" className="shadow-lg"/>
        <text x="410" y="336" textAnchor="middle" fill="rgba(33,196,93,0.7)" fontSize="8" fontWeight="700">3 MATCHES FOUND</text>
      </svg>
      
      {/* Contextual label */}
      <div className="absolute bottom-4 left-4 bg-[rgba(15,23,42,0.8)] backdrop-blur-md rounded-lg px-3 py-2 border border-[rgba(248,241,220,0.15)] shadow-lg">
        <p className="text-xs text-[#f8f1dc] opacity-80">Matching in progress</p>
        <p className="text-[10px] text-[#f8f1dc] opacity-60">The Hague • Solar project</p>
      </div>
    </div>
  );
}
