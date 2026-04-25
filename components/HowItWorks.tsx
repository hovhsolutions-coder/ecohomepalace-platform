export default function HowItWorks() {
  const steps = [
    {
      icon: '📝',
      title: 'Tell us your project',
      description: 'Select what you want to improve and where you live',
    },
    {
      icon: '🎯',
      title: 'Get matched with verified professionals',
      description: 'We connect you with local installers who fit your needs',
    },
    {
      icon: '✅',
      title: 'Compare offers and choose',
      description: 'Review multiple quotes and pick the best match for you',
    },
  ];

  return (
    <section className="px-6 py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21c45d] mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0b2a22]">
            Get matched in 3 simple steps
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-[rgba(33,196,93,0.1)] flex items-center justify-center mb-6">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0b2a22] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#21c45d] transform -translate-y-1/2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
