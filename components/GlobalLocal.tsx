import { globalMarkets } from '@/lib/publicData';
import ImagePanel from './ImagePanel';

export default function GlobalLocal() {
  return (
    <section className="px-6 py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Content */}
          <div>
            <div className="text-center lg:text-left mb-10 md:mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#21c45d] mb-4 md:text-sm">
                Global platform
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0b2a22]">
                Global platform. Local professionals.
              </h2>
              <p className="mt-3 md:mt-4 max-w-2xl mx-auto lg:mx-0 text-base md:text-lg text-gray-600">
                Eco Home Palace works across markets while keeping every comparison relevant to the homeowner's region.
              </p>
            </div>

            <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {globalMarkets.map((market, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#21c45d] hover:shadow-md transition-all">
                  <div className="text-3xl md:text-4xl">{market.flag}</div>
                  <p className="font-semibold text-[#0b2a22] text-sm md:text-base">{market.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: City image with overlay badges */}
          <div className="relative">
            <ImagePanel 
              imageUrl="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1400"
              alt="Paris cityscape with Eiffel Tower"
              overlay="dark"
              badge="32 installers active • Typical response 24–48h"
              badgePosition="bottom-right"
              className="hidden lg:block h-[400px] shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
