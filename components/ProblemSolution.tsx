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
          <div className="bg-[#fff1f2] rounded-2xl p-5 md:p-10 border-l-4 border-red-400 focus-within:ring-2 focus-within:ring-red-400 focus-within:ring-offset-2">
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

          {/* Solution side */}
          <div className="bg-[#ecfdf5] rounded-2xl p-5 md:p-10 border-l-4 border-[#21c45d] focus-within:ring-2 focus-within:ring-[#21c45d] focus-within:ring-offset-2">
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
    </section>
  );
}
