import { IconCross, IconCheck } from './icons/MarketplaceIcons';

export default function ProblemSolution() {
  const problems = [
    'Prices vary massively between installers',
    'Quality is unclear until it\'s too late',
    'Too many options, no guidance',
    'No idea who to trust',
  ];

  const solutions = [
    'Verified professionals only',
    'Clear comparison of offers',
    'Local matching',
    'No obligation to commit',
  ];

  return (
    <section className="px-6 py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0b2a22] mb-4">
            The problem with finding installers
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-gray-600">
            It shouldn't be this hard to get reliable quotes for your home.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 lg:gap-8 lg:grid-cols-2">
          {/* Problem side */}
          <div className="relative bg-[#fff1f2] rounded-2xl p-5 md:p-10 border-l-4 border-red-400 focus-within:ring-2 focus-within:ring-red-400 focus-within:ring-offset-2 overflow-hidden">
            {/* Chaotic pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                <path d="M0 50 L50 0 L100 50 L150 0 L200 50 L250 0 L300 50 L350 0 L400 50" stroke="#ef4444" strokeWidth="1"/>
                <path d="M0 100 L50 50 L100 100 L150 50 L200 100 L250 50 L300 100 L350 50 L400 100" stroke="#ef4444" strokeWidth="1"/>
                <path d="M0 150 L50 100 L100 150 L150 100 L200 150 L250 100 L300 150 L350 100 L400 150" stroke="#ef4444" strokeWidth="1"/>
                <path d="M0 200 L50 150 L100 200 L150 150 L200 200 L250 150 L300 200 L350 150 L400 200" stroke="#ef4444" strokeWidth="1"/>
                <path d="M0 250 L50 200 L100 250 L150 200 L200 250 L250 200 L300 250 L350 200 L400 250" stroke="#ef4444" strokeWidth="1"/>
                <circle cx="50" cy="50" r="20" stroke="#ef4444" strokeWidth="1" fill="none"/>
                <circle cx="150" cy="100" r="15" stroke="#ef4444" strokeWidth="1" fill="none"/>
                <circle cx="250" cy="150" r="25" stroke="#ef4444" strokeWidth="1" fill="none"/>
                <circle cx="350" cy="200" r="18" stroke="#ef4444" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <IconCross size={24} className="text-red-500 md:hidden" />
                <IconCross size={28} className="text-red-500 hidden md:block" />
                <h3 className="text-lg md:text-xl font-semibold text-[#0b2a22]">
                  What homeowners face
                </h3>
              </div>
              <div className="space-y-3 md:space-y-4">
                {problems.map((problem, index) => (
                  <div key={index} className="flex items-start gap-3 pl-4 border-l-2 border-red-200">
                    <IconCross size={18} className="text-red-500 mt-0.5 flex-shrink-0 md:hidden" />
                    <IconCross size={20} className="text-red-500 mt-0.5 flex-shrink-0 hidden md:block" />
                    <p className="text-gray-700 font-medium text-sm md:text-base">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution side */}
          <div className="relative bg-[#ecfdf5] rounded-2xl p-5 md:p-10 border-l-4 border-[#21c45d] focus-within:ring-2 focus-within:ring-[#21c45d] focus-within:ring-offset-2 overflow-hidden">
            {/* Organized grid pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                <rect x="20" y="20" width="80" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="120" y="20" width="80" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="220" y="20" width="80" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="320" y="20" width="60" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="20" y="100" width="80" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="120" y="100" width="80" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="220" y="100" width="80" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="320" y="100" width="60" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="20" y="180" width="80" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="120" y="180" width="80" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="220" y="180" width="80" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <rect x="320" y="180" width="60" height="60" stroke="#21c45d" strokeWidth="1" fill="none"/>
                <line x1="20" y1="260" x2="380" y2="260" stroke="#21c45d" strokeWidth="1"/>
                <line x1="20" y1="280" x2="380" y2="280" stroke="#21c45d" strokeWidth="1"/>
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <IconCheck size={24} className="text-[#21c45d] md:hidden" />
                <IconCheck size={28} className="text-[#21c45d] hidden md:block" />
                <h3 className="text-lg md:text-xl font-semibold text-[#0b2a22]">
                  How Eco Home Palace helps
                </h3>
              </div>
              <div className="space-y-3 md:space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-start gap-3 pl-4 border-l-2 border-[#21c45d]/30">
                    <IconCheck size={18} className="text-[#21c45d] mt-0.5 flex-shrink-0 md:hidden" />
                    <IconCheck size={20} className="text-[#21c45d] mt-0.5 flex-shrink-0 hidden md:block" />
                    <p className="text-gray-700 font-medium text-sm md:text-base">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
