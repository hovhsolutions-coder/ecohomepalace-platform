import { homeownerReviews } from '@/lib/publicData';
import { IconStar } from './icons/MarketplaceIcons';

export default function TrustProof() {
  return (
    <section className="px-6 py-16 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0b2a22] mb-4">
            What homeowners say
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-gray-600">
            Real results from people who used Eco Home Palace.
          </p>
        </div>

        <div className="grid gap-3 md:gap-4 lg:gap-6 lg:grid-cols-3">
          {homeownerReviews.map((review) => (
            <div key={review.name} className="bg-white rounded-2xl p-5 md:p-6 lg:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0b2a22] to-[#1a1a2e] text-white text-sm md:text-lg font-semibold shadow-md">
                  {review.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#0b2a22] text-sm md:text-base">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.city}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 md:mb-5 leading-relaxed text-sm md:text-base">"{review.quote}"</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IconStar key={star} size={14} className="text-[#fbbf24] md:hidden" filled />
                  ))}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IconStar key={`md-${star}`} size={16} className="text-[#fbbf24] hidden md:block" filled />
                  ))}
                </div>
                {review.result && (
                  <span className="text-xs font-semibold text-[#21c45d] bg-[rgba(33,196,93,0.1)] px-2 md:px-3 py-1 rounded-full border border-[rgba(33,196,93,0.2)]">
                    {review.result}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bridge to final decision */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-gray-600 text-sm md:text-base mb-4">
            Join thousands of homeowners who found their installer through Eco Home Palace
          </p>
        </div>
      </div>
    </section>
  );
}
