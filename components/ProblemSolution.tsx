export default function ProblemSolution() {
  const problems = [
    'Prices vary wildly between installers',
    'Quality is unclear until it\'s too late',
    'Too many options, no guidance',
    'No idea who to trust',
  ];

  const solutions = [
    'Verified professionals only',
    'Clear comparison of offers',
    'Local matching in your area',
    'No obligation to commit',
  ];

  return (
    <section className="px-6 py-20 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Problem side */}
          <div className="bg-[#fff1f2] rounded-2xl p-8 border border-rose-100">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#0b2a22] mb-6">
              Finding the right installer shouldn't be this hard
            </h2>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1">✗</span>
                  <p className="text-gray-700">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution side */}
          <div className="bg-[#ecfdf5] rounded-2xl p-8 border border-emerald-100">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#0b2a22] mb-6">
              Eco Home Palace fixes this
            </h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#21c45d] text-xl mt-1">✓</span>
                  <p className="text-gray-700 font-medium">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
