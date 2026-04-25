import Link from 'next/link';
import { IconProject, IconTarget, IconCheck } from './icons/MarketplaceIcons';
import PremiumVisualPanel from './PremiumVisualPanel';

export default function MatchingEngine() {
  const factors = [
    {
      icon: <IconProject size={24} className="text-[#21c45d]" />,
      title: 'Project type',
      description: 'We match based on your specific upgrade, not generic categories',
    },
    {
      icon: <IconTarget size={24} className="text-[#21c45d]" />,
      title: 'Location availability',
      description: 'Only installers active in your area and timeframe',
    },
    {
      icon: <IconCheck size={24} className="text-[#21c45d]" />,
      title: 'Installer fit',
      description: 'Verified expertise, communication quality, and capacity',
    },
  ];

  return (
    <section className="px-6 py-16 md:py-20 bg-gradient-to-b from-[#f0fdf4] to-[#0b2a22]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Content */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
                Not just quotes. A smarter way to match your project.
              </h2>
              <p className="text-base md:text-lg text-gray-300">
                Our matching engine filters installers by project type, location, and fit — so you get options that actually work for your home.
              </p>
            </div>

            <div className="space-y-4 md:space-y-5">
              {factors.map((factor, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[rgba(33,196,93,0.15)] flex items-center justify-center border border-[rgba(33,196,93,0.3)]">
                    {factor.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                      {factor.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm">
                      {factor.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="/intake"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold bg-[#21c45d] text-white rounded-lg hover:bg-[#16a34a] transition-colors shadow-md hover:shadow-lg"
              >
                Compare 3 installers
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Right: Visual matching logic flow */}
          <div className="relative">
            <PremiumVisualPanel variant="matching-flow" className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
