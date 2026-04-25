import Link from 'next/link';
import { IconSolar, IconBattery, IconInsulation, IconRenovation } from './icons/MarketplaceIcons';

const services = [
  {
    icon: <IconSolar size={28} className="text-white" />,
    title: 'Solar panels',
    description: 'Verified solar installers',
    benefit: 'Reduce energy costs',
    iconBg: 'from-amber-400 to-orange-500',
    slug: 'solar-panels',
  },
  {
    icon: <IconBattery size={28} className="text-white" />,
    title: 'Heat pumps',
    description: 'Heat pump specialists',
    benefit: 'Efficient heating',
    iconBg: 'from-blue-400 to-cyan-500',
    slug: 'heat-pumps',
  },
  {
    icon: <IconInsulation size={28} className="text-white" />,
    title: 'Insulation',
    description: 'Insulation experts',
    benefit: 'Improve comfort',
    iconBg: 'from-green-400 to-emerald-500',
    slug: 'insulation',
  },
  {
    icon: <IconRenovation size={28} className="text-white" />,
    title: 'Windows & renovation',
    description: 'Renovation professionals',
    benefit: 'Upgrade value',
    iconBg: 'from-purple-400 to-pink-500',
    slug: 'renovation',
  },
];

export default function ServicesTiles() {
  return (
    <section className="px-6 py-16 md:py-20 bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0b2a22] mb-4">
            What do you want to improve?
          </h2>
        </div>

        <div className="space-y-2 md:space-y-3">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/intake?service=${service.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-xl p-4 md:p-5 lg:p-6 border border-gray-200 hover:border-[#21c45d] hover:shadow-lg transition-all duration-300 flex items-center gap-3 md:gap-4 lg:gap-6 focus-within:ring-2 focus-within:ring-[#21c45d] focus-within:ring-offset-2">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 md:gap-3 mb-1">
                    <h3 className="text-base md:text-lg font-semibold text-[#0b2a22]">
                      {service.title}
                    </h3>
                    <span className="text-[#21c45d] text-xs md:text-sm font-medium">
                      {service.benefit}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm">
                    {service.description}
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[#21c45d] font-semibold text-sm group-hover:gap-3 transition-all flex-shrink-0">
                  <span>Compare</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
