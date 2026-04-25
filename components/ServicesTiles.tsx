import Link from 'next/link';

const services = [
  {
    icon: '☀️',
    title: 'Solar panels',
    description: 'Get matched with verified solar installers',
    color: 'from-amber-500 to-orange-500',
    slug: 'solar-panels',
  },
  {
    icon: '🔋',
    title: 'Heat pumps',
    description: 'Find heat pump specialists near you',
    color: 'from-blue-500 to-cyan-500',
    slug: 'heat-pumps',
  },
  {
    icon: '🛡️',
    title: 'Insulation',
    description: 'Connect with insulation experts',
    color: 'from-green-500 to-emerald-500',
    slug: 'insulation',
  },
  {
    icon: '🔧',
    title: 'Windows & renovation',
    description: 'Find renovation and window professionals',
    color: 'from-purple-500 to-pink-500',
    slug: 'renovation',
  },
];

export default function ServicesTiles() {
  return (
    <section className="px-6 py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21c45d] mb-3">
            Services
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0b2a22]">
            What do you want to improve in your home?
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/intake?service=${service.slug}`}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0b2a22] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-[#21c45d] font-semibold text-sm group-hover:gap-2 transition-all">
                  Get quotes
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
