import { homeownerReviews } from '@/lib/publicData';

export default function TrustProof() {
  return (
    <section className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21c45d] mb-3">
            Social proof
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0b2a22]">
            Homeowners trust Eco Home Palace
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {homeownerReviews.map((review) => (
            <div key={review.name} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0b2a22] to-[#1a1a2e] text-white text-lg font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#0b2a22]">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.city}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-5 text-lg leading-relaxed">"{review.quote}"</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#fbbf24] text-lg">★★★★★</p>
                {review.result && (
                  <p className="text-xs font-semibold text-[#21c45d] bg-[rgba(33,196,93,0.1)] px-3 py-1.5 rounded-full border border-[rgba(33,196,93,0.2)]">
                    {review.result}
                  </p>
                )}
              </div>
              {review.date && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-medium">
                    Verified homeowner · {review.date}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
