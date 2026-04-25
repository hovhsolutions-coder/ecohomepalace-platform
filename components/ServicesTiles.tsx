import Link from 'next/link';

const services = [
  {
    icon: '☀️',
    title: 'Solar panels',
    description: 'Get matched with verified solar installers',
    gradient: 'from-amber-50 to-orange-100',
    iconBg: 'from-amber-400 to-orange-500',
    slug: 'solar-panels',
  },
  {
    icon: '🔋',
    title: 'Heat pumps',
    description: 'Find heat pump specialists near you',
    gradient: 'from-blue-50 to-cyan-100',
    iconBg: 'from-blue-400 to-cyan-500',
    slug: 'heat-pumps',
  },
  {
    icon: '🛡️',
    title: 'Insulation',
    description: 'Connect with insulation experts',
    gradient: 'from-green-50 to-emerald-100',
    iconBg: 'from-green-400 to-emerald-500',
    slug: 'insulation',
  },
  {
    icon: '🔧',
    title: 'Windows & renovation',
    description: 'Find renovation and window professionals',
    gradient: 'from-purple-50 to-pink-100',
    iconBg: 'from-purple-400 to-pink-500',
    slug: 'renovation',
  },
];

export default function ServicesTiles() {
  return (
    <section className="px-6 py-20 bg-[#f8fafc]">
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
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0b2a22] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5">
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
