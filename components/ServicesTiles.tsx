import Link from 'next/link';
import { IconSolar, IconBattery, IconInsulation, IconRenovation } from './icons/MarketplaceIcons';
import ImagePanel from './ImagePanel';

const services = [
  {
    icon: <IconSolar size={28} className="text-white" />,
    title: 'Solar panels',
    description: 'Verified solar installers',
    benefit: 'Lower energy bills',
    iconBg: 'from-amber-400 to-orange-500',
    slug: 'solar-panels',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200',
  },
  {
    icon: <IconBattery size={28} className="text-white" />,
    title: 'Heat pumps',
    description: 'Heat pump specialists',
    benefit: 'Efficient heating & cooling',
    iconBg: 'from-blue-400 to-cyan-500',
    slug: 'heat-pumps',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200',
  },
  {
    icon: <IconInsulation size={28} className="text-white" />,
    title: 'Insulation',
    description: 'Insulation experts',
    benefit: 'Improve comfort & reduce loss',
    iconBg: 'from-green-400 to-emerald-500',
    slug: 'insulation',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200',
  },
  {
    icon: <IconRenovation size={28} className="text-white" />,
    title: 'Windows & renovation',
    description: 'Renovation professionals',
    benefit: 'Upgrade value & efficiency',
    iconBg: 'from-purple-400 to-pink-500',
    slug: 'renovation',
    imageUrl: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1200',
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

        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/intake?service=${service.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#21c45d] hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-[#21c45d] focus-within:ring-offset-2">
                {/* Image (70% height) */}
                <div className="h-44 lg:h-48 relative">
                  <ImagePanel 
                    imageUrl={service.imageUrl}
                    alt={service.title}
                    overlay="light"
                    className="h-full"
                    hoverZoom={true}
                  />
                </div>
                
                {/* Content (30% height) */}
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center shadow-md flex-shrink-0`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-[#0b2a22]">
                        {service.title}
                      </h3>
                      <p className="text-[#21c45d] text-xs md:text-sm font-medium">
                        {service.benefit}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-xs md:text-sm mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[#21c45d] font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Compare</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
