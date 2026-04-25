import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="px-6 py-24 bg-[#0b2a22] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(33,196,93,0.15),transparent_60%)]"></div>
      <div className="mx-auto max-w-5xl text-center relative">
        <div className="bg-[#101827] rounded-3xl p-10 md:p-20 border border-[rgba(255,255,255,0.1)] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(33,196,93,0.05)] to-transparent"></div>
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21c45d] mb-4">
              Ready to start?
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-5">
              Compare verified professionals for your home today
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Start free, stay in control, and receive relevant options for your project.
            </p>
            <Link
              href="/intake"
              className="inline-flex min-h-16 items-center justify-center rounded-full px-12 py-5 text-lg font-semibold bg-[#21c45d] text-white shadow-[0_20px_50px_rgba(33,196,93,0.5)] hover:bg-[#16a34a] hover:shadow-[0_24px_60px_rgba(33,196,93,0.6)] transition-all duration-300 hover:scale-[1.02]"
            >
              Compare 3 installers
            </Link>
            <p className="mt-6 text-sm text-gray-400">
              Free • No obligation • Matched with verified professionals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
