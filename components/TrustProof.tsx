import { homeownerReviews } from '@/lib/publicData';

export default function TrustProof() {
  return (
    <section className="px-6 py-20 bg-white">
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
            <div key={review.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b2a22] text-white text-sm font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#0b2a22]">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.city}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{review.quote}"</p>
              <div className="flex items-center justify-between">
                <p className="text-[#fbbf24]">★★★★★</p>
                {review.result && (
                  <p className="text-xs font-medium text-[#21c45d] bg-[rgba(33,196,93,0.1)] px-3 py-1 rounded-full">
                    {review.result}
                  </p>
                )}
              </div>
              {review.date && (
                <p className="mt-3 text-xs text-gray-500">
                  Verified homeowner · {review.date}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
