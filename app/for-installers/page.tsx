import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import { installerBenefits } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "For Installers | Eco Home Palace",
  description:
    "Join Eco Home Palace and receive better-prepared homeowner requests across premium sustainable home categories.",
};

export default function ForInstallersPage() {
  return (
    <main className="premium-shell min-h-screen text-[var(--foreground)]">
      <PublicHeader />

      <section className="section-padding px-6">
        <div className="mx-auto max-w-6xl">
          <div className="glass-panel grid gap-8 rounded-[1.85rem] px-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
            <div>
              <p className="section-kicker">For installers</p>
              <h1 className="section-title mt-4">
                Better homeowner requests before the first call starts
              </h1>
              <p className="section-copy mt-6">
                Eco Home Palace is building a premium international platform for
                installers and specialists who want clearer homeowner intent,
                stronger trust, and better local fit from the beginning.
              </p>
            </div>

            <div className="premium-card">
              <p className="section-kicker">Why join early</p>
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
                className="gold-button mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
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
