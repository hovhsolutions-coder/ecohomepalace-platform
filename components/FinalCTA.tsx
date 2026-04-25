import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="px-6 py-20 bg-[#0b2a22]">
      <div className="mx-auto max-w-5xl text-center">
        <div className="bg-[#101827] rounded-3xl p-8 md:p-16 border border-[rgba(255,255,255,0.1)] shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21c45d] mb-4">
            Ready to start?
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Compare verified professionals for your home today
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Start free, stay in control, and receive relevant options for your project.
          </p>
          <Link
            href="/intake"
            className="inline-flex min-h-14 items-center justify-center rounded-full px-10 py-4 text-lg font-semibold bg-[#21c45d] text-white shadow-[0_16px_40px_rgba(33,196,93,0.4)] hover:bg-[#16a34a] hover:shadow-[0_20px_48px_rgba(33,196,93,0.5)] transition-all duration-300 hover:scale-[1.02]"
          >
            Compare 3 installers
          </Link>
          <p className="mt-5 text-sm text-gray-400">
            Free • No obligation • Matched with verified professionals
          </p>
        </div>
      </div>
    </section>
  );
}
