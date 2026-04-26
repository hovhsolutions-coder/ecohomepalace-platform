import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import { installerBenefits } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "For Installers | Eco Home Palace",
  description:
    "Learn how Eco Home Palace is building a premium homeowner demand channel for trusted installers and local professionals.",
};

export default function ForInstallersPage() {
  return (
    <main className="premium-shell min-h-screen text-white">
      <PublicHeader />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="glass-panel grid gap-8 px-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold-300)]/72">
                For installers
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
                Premium homeowner demand, prepared before contact
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                Eco Home Palace is building a premium lead-generation platform
                for installers and local professionals who value project clarity,
                strong intent, and faster conversion.
              </p>
            </div>

            <div className="premium-card">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--emerald-300)]/78">
                Why join early
              </p>
              <div className="mt-6 space-y-3">
                {installerBenefits.map((item) => (
                  <div
                    key={item}
                    className="emerald-accent rounded-[1.2rem] px-4 py-3 text-sm leading-6"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="mailto:partners@ecohomepalace.com"
                className="gold-button mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
              >
                Request installer access
              </a>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
