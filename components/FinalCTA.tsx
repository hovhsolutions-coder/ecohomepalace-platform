import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="px-6 py-16 md:py-20 bg-[#0b2a22] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(33,196,93,0.2),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(248,241,220,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(248,241,220,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      {/* Subtle blueprint home outline */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 400" fill="none">
        <path d="M100 300 L100 200 L400 100 L700 200 L700 300" stroke="rgba(248,241,220,0.3)" strokeWidth="2" fill="none"/>
        <path d="M100 300 L700 300" stroke="rgba(248,241,220,0.3)" strokeWidth="2"/>
        <rect x="200" y="220" width="60" height="50" stroke="rgba(248,241,220,0.2)" strokeWidth="1" fill="none"/>
        <rect x="300" y="220" width="60" height="50" stroke="rgba(248,241,220,0.2)" strokeWidth="1" fill="none"/>
        <rect x="400" y="220" width="60" height="50" stroke="rgba(248,241,220,0.2)" strokeWidth="1" fill="none"/>
        <rect x="350" y="270" width="40" height="30" stroke="rgba(248,241,220,0.2)" strokeWidth="1" fill="none"/>
        
        {/* Second home outline */}
        <path d="M800 320 L800 240 L1050 160 L1300 240 L1300 320" stroke="rgba(248,241,220,0.2)" strokeWidth="1.5" fill="none"/>
        <path d="M800 320 L1300 320" stroke="rgba(248,241,220,0.2)" strokeWidth="1.5"/>
      </svg>
      
      <div className="mx-auto max-w-7xl text-center relative">
        <div className="bg-[#101827] rounded-2xl p-8 md:p-12 lg:p-16 border border-[rgba(255,255,255,0.1)] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(33,196,93,0.08)] to-transparent"></div>
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#21c45d] mb-4 md:mb-5">
              Ready to start?
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 md:mb-6">
              Compare 3 verified installers in your area
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">
              Access matched installers quickly. No obligation.
            </p>
            <Link
              href="/intake"
              className="inline-flex min-h-14 md:min-h-16 items-center justify-center rounded-full px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold bg-[#21c45d] text-white shadow-[0_24px_60px_rgba(33,196,93,0.6)] hover:bg-[#16a34a] hover:shadow-[0_28px_72px_rgba(33,196,93,0.7)] transition-all duration-300 hover:scale-[1.02]"
            >
              Compare 3 installers
            </Link>
            <p className="mt-5 md:mt-7 text-xs md:text-sm text-gray-400">
              Free • No obligation • Verified installers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
