import type { Metadata } from "next";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | Eco Home Palace",
  description: "Privacy policy for Eco Home Palace global homeowner matching platform.",
};

export default function PrivacyPage() {
  return (
    <main className="premium-shell min-h-screen text-[var(--foreground)]">
      <PublicHeader />

      <section className="section-padding px-6">
        <div className="mx-auto max-w-4xl">
          <p className="section-kicker">Privacy Policy</p>
          <h1 className="section-title mt-4">Privacy Policy</h1>
          <p className="section-copy mt-5">
            Last updated: April 2026
          </p>

          <div className="glass-panel mt-10 rounded-[1.75rem] px-8 py-10">
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              Eco Home Palace ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our homeowner matching platform.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">About Eco Home Palace</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              Eco Home Palace is a global homeowner matching platform based in The Hague, Netherlands. We connect homeowners with trusted professionals for sustainable home improvements across international markets.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Information We Collect</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              We collect information you provide directly, including your name, email address, phone number, location details, and project information. This information is used to match you with suitable professionals in your area.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">How We Use Your Information</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              Your information is used to process your project request, match you with relevant professionals, facilitate communication between you and matched professionals, and improve our services. We do not sell your personal information to third parties.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Sharing Your Information</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              We share your project information with professionals in our network who match your service and location requirements. These professionals use your contact details to reach out regarding your project request.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Data Security</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Your Rights</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at hello@ecohomepalace.com.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Contact Us</h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              If you have questions about this Privacy Policy or our data practices, please contact us at hello@ecohomepalace.com.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
