import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

export const metadata: Metadata = {
  title: "Terms of Service | Eco Home Palace",
  description: "Terms of service for Eco Home Palace global homeowner matching platform.",
};

export default function TermsPage() {
  return (
    <main className="premium-shell min-h-screen text-[var(--foreground)]">
      <PublicHeader />

      <section className="section-padding px-6">
        <div className="mx-auto max-w-4xl">
          <p className="section-kicker">Terms of Service</p>
          <h1 className="section-title mt-4">Terms of Service</h1>
          <p className="section-copy mt-5">
            Last updated: April 2026
          </p>

          <div className="glass-panel mt-10 rounded-[1.75rem] px-8 py-10">
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              These Terms of Service govern your use of the Eco Home Palace platform. By using our service, you agree to these terms.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">About Eco Home Palace</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              Eco Home Palace is a global homeowner matching platform based in The Hague, Netherlands. We connect homeowners with trusted professionals for sustainable home improvements across international markets.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Our Services</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              Eco Home Palace provides a platform for homeowners to submit project requests and be matched with suitable professionals. We facilitate introductions but do not perform the actual services. All agreements for services are between you and the matched professionals.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">User Responsibilities</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              You agree to provide accurate and complete information when using our platform. You must not use our service for fraudulent purposes or to submit false project requests.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Professional Network</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              Professionals in our network are reviewed for service area, expertise, availability, and customer communication before being shown to homeowners. However, we do not guarantee the quality of work performed by any professional.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">No Obligation</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              Submitting a project request through Eco Home Palace is free and creates no obligation to proceed with any professional. You are free to decline offers or choose not to move forward with any matched professional.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Limitation of Liability</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              Eco Home Palace is not liable for the quality, safety, or outcome of any services performed by professionals in our network. We act as an introduction platform only.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Changes to Terms</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              We may update these Terms of Service from time to time. Continued use of our platform constitutes acceptance of any changes.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Contact Us</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              If you have questions about these Terms of Service, please contact us at hello@ecohomepalace.com.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
