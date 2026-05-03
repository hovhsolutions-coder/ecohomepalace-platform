'use client';

interface RealScenePanelProps {
  variant: 'house-exterior' | 'installation-scene' | 'interior-renovation' | 'local-neighborhood';
  className?: string;
}

// Shared scene layers
const SkyGradient = () => (
  <div className="absolute inset-0 pointer-events-none" style={{
    background: 'linear-gradient(to bottom, rgba(135,206,235,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)'
  }}></div>
);

const GroundPlane = () => (
  <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none" style={{
    background: 'linear-gradient(to top, rgba(30,30,30,0.4) 0%, transparent 100%)'
  }}></div>
);

const Vignette = () => (
  <div className="absolute inset-0 pointer-events-none" style={{
    background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.3) 100%)'
  }}></div>
);

const NoiseTexture = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
    backgroundSize: '4px 4px'
  }}></div>
);

const LightSource = ({ position = 'top-right' }: { position?: 'top-left' | 'top-right' }) => {
  const gradients = {
    'top-left': 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)',
    'top-right': 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)',
  };
  return <div className="absolute inset-0 pointer-events-none" style={{ background: gradients[position] }}></div>;
};

// HOUSE_EXTERIOR: Dark house silhouette with solar panels, warm window light
function HouseExterior() {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-gradient-to-b from-[#1a2a25] to-[#0d1a15]">
      <SkyGradient />
      <LightSource position="top-right" />
      <NoiseTexture />
      <GroundPlane />
      <Vignette />
      
      {/* Background trees/hills silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
          <path d="M0 200 L0 120 Q50 80 100 100 Q150 60 200 90 Q250 50 300 80 Q350 40 400 70 Q450 30 500 60 L500 200" fill="rgba(20,40,30,0.5)"/>
        </svg>
      </div>
      
      {/* Main house silhouette */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 h-64">
        <svg className="w-full h-full" viewBox="0 0 320 256" fill="none">
          {/* House body */}
          <path d="M40 180 L40 100 L160 20 L280 100 L280 180" fill="rgba(25,35,30,0.9)" stroke="rgba(40,50,45,0.3)" strokeWidth="2"/>
          <path d="M40 180 L280 180" fill="rgba(20,30,25,0.8)"/>
          
          {/* Roof */}
          <path d="M40 100 L160 20 L280 100" fill="rgba(30,40,35,0.95)" stroke="rgba(50,60,55,0.2)" strokeWidth="2"/>
          
          {/* Solar panels on roof - thick filled surfaces */}
          <g opacity="0.85">
            <rect x="70" y="55" width="45" height="30" fill="rgba(20,40,35,0.8)" stroke="rgba(33,196,93,0.3)" strokeWidth="2" rx="1"/>
            <rect x="125" y="45" width="45" height="30" fill="rgba(20,40,35,0.8)" stroke="rgba(33,196,93,0.4)" strokeWidth="2" rx="1"/>
            <rect x="180" y="55" width="45" height="30" fill="rgba(20,40,35,0.8)" stroke="rgba(33,196,93,0.3)" strokeWidth="2" rx="1"/>
          </g>
          
          {/* Windows with warm light */}
          <rect x="60" y="120" width="35" height="35" fill="rgba(255,200,100,0.15)" stroke="rgba(255,200,100,0.2)" strokeWidth="2" rx="2"/>
          <rect x="120" y="120" width="35" height="35" fill="rgba(255,200,100,0.12)" stroke="rgba(255,200,100,0.15)" strokeWidth="2" rx="2"/>
          <rect x="225" y="120" width="35" height="35" fill="rgba(255,200,100,0.1)" stroke="rgba(255,200,100,0.12)" strokeWidth="2" rx="2"/>
          
          {/* Door */}
          <rect x="135" y="145" width="30" height="35" fill="rgba(20,25,20,0.9)" stroke="rgba(40,45,40,0.3)" strokeWidth="2" rx="1"/>
          
          {/* Chimney */}
          <rect x="200" y="60" width="20" height="25" fill="rgba(30,35,30,0.9)" stroke="rgba(40,45,40,0.2)" strokeWidth="1"/>
        </svg>
      </div>
      
      {/* Ground shadow under house */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-96 h-8 rounded-full opacity-40" style={{
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)'
      }}></div>
      
      {/* Subtle glow from windows */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-72 h-20 rounded-full opacity-20" style={{
        background: 'radial-gradient(ellipse, rgba(255,200,100,0.3) 0%, transparent 70%)'
      }}></div>
    </div>
  );
}

// INSTALLATION_SCENE: Side view of house wall with heat pump unit
function InstallationScene() {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-gradient-to-b from-[#1a2520] to-[#0d1510]">
      <SkyGradient />
      <LightSource position="top-left" />
      <NoiseTexture />
      <GroundPlane />
      <Vignette />
      
      {/* House wall - large filled surface */}
      <div className="absolute left-8 top-12 w-48 h-72 bg-gradient-to-br from-[#2a3530] to-[#1a2520] rounded-sm shadow-2xl">
        {/* Window */}
        <div className="absolute top-16 left-8 w-24 h-20 bg-gradient-to-b from-[rgba(135,206,235,0.15)] to-[rgba(135,206,235,0.05)] border-2 border-[rgba(100,120,110,0.4)] rounded-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-[rgba(100,120,110,0.3)]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-px bg-[rgba(100,120,110,0.3)]"></div>
          </div>
        </div>
        
        {/* Door */}
        <div className="absolute bottom-12 left-12 w-16 h-28 bg-gradient-to-br from-[#1f2a25] to-[#151f1a] border-2 border-[rgba(80,90,85,0.3)] rounded-sm">
          <div className="absolute right-2 top-1/2 w-2 h-2 rounded-full bg-[rgba(150,160,155,0.4)]"></div>
        </div>
      </div>
      
      {/* Heat pump unit - prominent filled box */}
      <div className="absolute right-12 top-24 w-36 h-28 bg-gradient-to-br from-[#3a3a35] to-[#2a2a25] rounded-lg shadow-2xl border-2 border-[rgba(100,100,95,0.3)]">
        {/* Unit details */}
        <div className="absolute top-3 left-3 right-3 h-8 bg-gradient-to-b from-[#2a2a25] to-[#1f1f1a] rounded-sm border border-[rgba(80,80,75,0.3)]"></div>
        <div className="absolute top-14 left-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#4a4a45] to-[#3a3a35] border border-[rgba(80,80,75,0.3)]"></div>
        <div className="absolute top-14 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#4a4a45] to-[#3a3a35] border border-[rgba(80,80,75,0.3)]"></div>
        
        {/* Activity glow */}
        <div className="absolute inset-0 rounded-lg opacity-30" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(33,196,93,0.2) 0%, transparent 70%)'
        }}></div>
      </div>
      
      {/* Piping - thick visible lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400" fill="none">
        <path d="M200 180 L280 180 L280 220" stroke="rgba(120,130,125,0.6)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M200 200 L260 200 L260 220" stroke="rgba(120,130,125,0.6)" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </svg>
      
      {/* Warm airflow glow */}
      <div className="absolute right-16 top-16 w-20 h-20 rounded-full opacity-25 animate-pulse" style={{
        background: 'radial-gradient(circle, rgba(255,150,50,0.4) 0%, transparent 70%)'
      }}></div>
      
      {/* Cold airflow glow */}
      <div className="absolute right-16 bottom-16 w-20 h-20 rounded-full opacity-25 animate-pulse" style={{
        background: 'radial-gradient(circle, rgba(100,150,255,0.4) 0%, transparent 70%)'
      }}></div>
    </div>
  );
}

// INTERIOR_RENOVATION: Room outline with window, insulation layers
function InteriorRenovation() {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-gradient-to-b from-[#1a1f1a] to-[#0d100d]">
      <SkyGradient />
      <LightSource position="top-left" />
      <NoiseTexture />
      <Vignette />
      
      {/* Room outline - thick walls */}
      <div className="absolute inset-8 border-4 border-[rgba(60,70,65,0.4)] bg-[rgba(20,25,20,0.3)]">
        {/* Interior wall */}
        <div className="absolute left-1/3 top-0 bottom-0 w-3 bg-[rgba(50,60,55,0.5)]"></div>
        
        {/* Window - large filled area */}
        <div className="absolute top-8 left-8 w-32 h-24 bg-gradient-to-b from-[rgba(135,206,235,0.2)] to-[rgba(135,206,235,0.08)] border-4 border-[rgba(80,100,95,0.4)] rounded-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-[rgba(80,100,95,0.4)]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-px bg-[rgba(80,100,95,0.4)]"></div>
          </div>
        </div>
        
        {/* Insulation layers - visible thick surfaces */}
        <div className="absolute top-40 left-12 w-24 h-16 bg-gradient-to-r from-[rgba(200,180,150,0.3)] to-[rgba(180,160,130,0.2)] border-2 border-[rgba(150,140,120,0.3)] rounded-sm">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)'
          }}></div>
        </div>
        
        <div className="absolute top-40 right-12 w-24 h-16 bg-gradient-to-r from-[rgba(200,180,150,0.25)] to-[rgba(180,160,130,0.15)] border-2 border-[rgba(150,140,120,0.25)] rounded-sm">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)'
          }}></div>
        </div>
        
        {/* Construction hint - tool silhouette */}
        <div className="absolute bottom-12 right-12 w-16 h-8 bg-gradient-to-br from-[rgba(100,110,105,0.4)] to-[rgba(80,90,85,0.3)] rounded-sm border border-[rgba(70,80,75,0.3)]"></div>
      </div>
      
      {/* Floor plane */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[rgba(20,25,20,0.6)] to-transparent"></div>
    </div>
  );
}

// LOCAL_NEIGHBORHOOD: Multiple house silhouettes, one highlighted
function LocalNeighborhood() {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-gradient-to-b from-[#1a2a25] to-[#0d1a15]">
      <SkyGradient />
      <LightSource position="top-right" />
      <NoiseTexture />
      <GroundPlane />
      <Vignette />
      
      {/* Background houses - dimmed silhouettes */}
      <div className="absolute bottom-12 left-8 w-20 h-32 opacity-40">
        <svg className="w-full h-full" viewBox="0 0 80 128" fill="none">
          <path d="M10 100 L10 50 L40 20 L70 50 L70 100" fill="rgba(25,35,30,0.7)"/>
          <path d="M10 100 L70 100" fill="rgba(20,30,25,0.6)"/>
        </svg>
      </div>
      
      <div className="absolute bottom-12 left-32 w-16 h-24 opacity-35">
        <svg className="w-full h-full" viewBox="0 0 64 96" fill="none">
          <path d="M8 80 L8 40 L32 15 L56 40 L56 80" fill="rgba(25,35,30,0.6)"/>
          <path d="M8 80 L56 80" fill="rgba(20,30,25,0.5)"/>
        </svg>
      </div>
      
      <div className="absolute bottom-12 right-8 w-24 h-36 opacity-40">
        <svg className="w-full h-full" viewBox="0 0 96 144" fill="none">
          <path d="M12 120 L12 60 L48 25 L84 60 L84 120" fill="rgba(25,35,30,0.7)"/>
          <path d="M12 120 L84 120" fill="rgba(20,30,25,0.6)"/>
        </svg>
      </div>
      
      {/* Main highlighted house */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-48">
        <svg className="w-full h-full" viewBox="0 0 128 192" fill="none">
          {/* House body */}
          <path d="M16 150 L16 70 L64 25 L112 70 L112 150" fill="rgba(30,40,35,0.95)" stroke="rgba(50,60,55,0.4)" strokeWidth="2"/>
          <path d="M16 150 L112 150" fill="rgba(20,30,25,0.9)"/>
          
          {/* Roof */}
          <path d="M16 70 L64 25 L112 70" fill="rgba(35,45,40,0.95)" stroke="rgba(55,65,60,0.3)" strokeWidth="2"/>
          
          {/* Windows with light */}
          <rect x="28" y="90" width="20" height="20" fill="rgba(255,200,100,0.15)" stroke="rgba(255,200,100,0.25)" strokeWidth="2" rx="1"/>
          <rect x="80" y="90" width="20" height="20" fill="rgba(255,200,100,0.12)" stroke="rgba(255,200,100,0.2)" strokeWidth="2" rx="1"/>
          <rect x="54" y="115" width="20" height="20" fill="rgba(255,200,100,0.1)" stroke="rgba(255,200,100,0.18)" strokeWidth="2" rx="1"/>
          
          {/* Activity glow around house */}
          <circle cx="64" cy="100" r="60" fill="rgba(33,196,93,0.08)" className="animate-pulse"/>
        </svg>
      </div>
      
      {/* Location pin */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2">
        <svg className="w-12 h-16" viewBox="0 0 48 64" fill="none">
          <path d="M24 4 L24 16" stroke="rgba(33,196,93,0.6)" strokeWidth="2"/>
          <circle cx="24" cy="4" r="10" fill="rgba(33,196,93,0.2)" stroke="rgba(33,196,93,0.6)" strokeWidth="2"/>
          <circle cx="24" cy="4" r="4" fill="rgba(33,196,93,0.7)"/>
        </svg>
      </div>
      
      {/* Activity glow from highlighted house */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full opacity-30" style={{
        background: 'radial-gradient(ellipse, rgba(33,196,93,0.3) 0%, transparent 70%)'
      }}></div>
    </div>
  );
}

export default function RealScenePanel({ variant, className = '' }: RealScenePanelProps) {
  return (
    <div className={`rounded-2xl overflow-hidden relative ${className}`}>
      {variant === 'house-exterior' && <HouseExterior />}
      {variant === 'installation-scene' && <InstallationScene />}
      {variant === 'interior-renovation' && <InteriorRenovation />}
      {variant === 'local-neighborhood' && <LocalNeighborhood />}
    </div>
  );
}
