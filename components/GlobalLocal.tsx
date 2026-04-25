import { globalMarkets } from '@/lib/publicData';

export default function GlobalLocal() {
  return (
    <section className="px-6 py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21c45d] mb-3">
            Global platform
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0b2a22]">
            Global platform. Local professionals.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {globalMarkets.map((market) => (
            <div
              key={market.name}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 border border-gray-200 hover:border-[#21c45d] hover:shadow-md transition-all duration-300"
            >
              <span className="text-2xl">{market.flag}</span>
              <span className="text-sm font-medium text-[#0b2a22]">{market.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
