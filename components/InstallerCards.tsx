'use client';

const installers = [
  {
    label: 'Verified solar installer',
    location: 'Amsterdam',
    matchLabel: 'Strong match',
    specialties: ['Solar', 'Heat Pumps'],
  },
  {
    label: 'Verified heat pump installer',
    location: 'Rotterdam',
    matchLabel: 'Local fit',
    specialties: ['Renovation', 'Insulation'],
  },
  {
    label: 'Verified renovation installer',
    location: 'Utrecht',
    matchLabel: 'Fast response',
    specialties: ['Solar', 'Windows'],
  },
];

export default function InstallerCards() {
  return (
    <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-[#0b2a22] to-[#061f18] rounded-2xl overflow-hidden p-6" role="region" aria-label="Example installer matches">
      {/* Header */}
      <div className="relative mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Example matches</h3>
        <p className="text-sm text-gray-400">Based on your project and location</p>
      </div>
      
      {/* Installer cards */}
      <div className="relative space-y-3">
        {installers.map((installer, index) => (
          <div 
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-all cursor-pointer"
            role="article"
            aria-label={`${installer.label} in ${installer.location}`}
          >
            <div className="flex items-start gap-4">
              {/* Icon placeholder */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#21c45d]/20 border border-[#21c45d]/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#21c45d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-base font-semibold text-white">{installer.label}</h4>
                    <p className="text-sm text-gray-400">{installer.location}</p>
                  </div>
                  <div className="flex-shrink-0 bg-[#21c45d]/20 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-[#21c45d]">{installer.matchLabel}</span>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {installer.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2 py-1 bg-[#21c45d]/15 text-[#21c45d] rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom CTA hint */}
      <div className="relative mt-6 text-center">
        <p className="text-sm text-gray-400">
          View all <span className="text-[#21c45d] font-semibold">available installers</span>
        </p>
      </div>
    </div>
  );
}
