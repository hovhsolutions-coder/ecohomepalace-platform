export default function SolarPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="mb-10 inline-flex text-sm text-white/60 hover:text-white">
          ← Back to Home
        </a>

        <h1 className="mb-6 text-5xl font-semibold">Solar Energy Systems</h1>

        <p className="mb-10 text-lg text-gray-400">
          High-performance solar systems designed for maximum efficiency,
          long-term savings, and premium installation quality.
        </p>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-gray-800 p-6">
            <h3 className="mb-2 text-xl font-semibold">High Efficiency Panels</h3>
            <p className="text-gray-400">
              Optimized for maximum output and long lifespan.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h3 className="mb-2 text-xl font-semibold">Premium Installation</h3>
            <p className="text-gray-400">
              Clean, safe, and high-end finishing on every project.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h3 className="mb-2 text-xl font-semibold">Smart Monitoring</h3>
            <p className="text-gray-400">
              Track your energy production in real time.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h3 className="mb-2 text-xl font-semibold">Maximum ROI</h3>
            <p className="text-gray-400">
              Built for long-term financial and energy returns.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="#"
            className="rounded-full bg-white px-8 py-4 font-semibold text-black"
          >
            Request Solar Quote
          </a>
        </div>
      </div>
    </main>
  );
}