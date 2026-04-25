import { IconProject, IconTarget, IconCompare } from './icons/MarketplaceIcons';

export default function HowItWorks() {
  const steps = [
    {
      icon: <IconProject size={32} className="text-[#21c45d]" />,
      title: 'Tell us your project',
      description: 'Select what you want to improve and where you live',
      number: '01',
    },
    {
      icon: <IconTarget size={32} className="text-[#21c45d]" />,
      title: 'We match you locally',
      description: 'Installers active in your area',
      number: '02',
    },
    {
      icon: <IconCompare size={32} className="text-[#21c45d]" />,
      title: 'Compare and choose',
      description: 'Review multiple offers from top matches',
      number: '03',
    },
  ];

  return (
    <section className="px-6 py-16 md:py-20 bg-gradient-to-b from-white to-[#f0fdf4] relative">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0b2a22] mb-4">
            Get matched in 3 simple steps
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600">
            From project details to verified installer options — typically within 24–48 hours.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#21c45d] to-transparent hidden md:block"></div>
          
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-6 md:gap-8 items-start">
                {/* Timeline marker */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-4 border-[#21c45d] flex items-center justify-center">
                    <span className="text-xs md:text-sm font-bold text-[#21c45d]">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 md:left-7 top-12 md:top-14 w-0.5 h-10 md:h-12 bg-gradient-to-b from-[#21c45d] to-transparent md:hidden"></div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-1 md:pt-2">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="md:hidden">{step.icon}</div>
                    <div className="hidden md:block">{step.icon}</div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#0b2a22]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed max-w-xl text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
