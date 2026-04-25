import Link from 'next/link';

export default function MidPageCTA() {
  return (
    <section className="px-6 py-16 md:py-20 bg-[#0b2a22]">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
          Compare 3 verified installers in your area
        </h2>
        <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
          Access matched installers quickly. No obligation.
        </p>
        <Link
          href="/intake"
          className="inline-flex min-h-14 md:min-h-16 items-center justify-center rounded-full px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold bg-[#21c45d] text-white shadow-[0_16px_40px_rgba(33,196,93,0.4)] hover:bg-[#16a34a] hover:shadow-[0_20px_48px_rgba(33,196,93,0.5)] transition-all duration-300 hover:scale-[1.02]"
        >
          Compare 3 installers
        </Link>
      </div>
    </section>
  );
}
