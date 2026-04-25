export default function ProofStrip() {
  return (
    <section className="px-6 py-8 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 text-center">
          <div>
            <p className="text-4xl font-bold text-[#0b2a22]">10,000+</p>
            <p className="mt-2 text-sm text-gray-600">Homeowners matched</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#0b2a22]">4.8/5</p>
            <p className="mt-2 text-sm text-gray-600">Average rating</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#0b2a22]">24h</p>
            <p className="mt-2 text-sm text-gray-600">Response time</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#0b2a22]">10+</p>
            <p className="mt-2 text-sm text-gray-600">Countries active</p>
          </div>
        </div>
      </div>
    </section>
  );
}
