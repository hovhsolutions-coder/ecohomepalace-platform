import type { Metadata } from "next";
import HeroV4 from "@/components/HeroV4";
import ProofStrip from "@/components/ProofStrip";
import HowItWorks from "@/components/HowItWorks";
import ProblemSolution from "@/components/ProblemSolution";
import ServicesTiles from "@/components/ServicesTiles";
import TrustProof from "@/components/TrustProof";
import GlobalLocal from "@/components/GlobalLocal";
import FinalCTA from "@/components/FinalCTA";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

export const metadata: Metadata = {
  title: "Eco Home Palace | Find Trusted Home Professionals",
  description:
    "Find trusted professionals for renovation, repair, solar, plumbing, electrical work and more.",
};

export default function Home() {
  return (
    <main className="text-[var(--foreground)]">
      <PublicHeader />

      {/* 1. Dark hero with instant action */}
      <HeroV4 />

      {/* 2. Proof strip */}
      <ProofStrip />

      {/* 3. How it works visual module */}
      <HowItWorks />

      {/* 4. Problem/Solution split */}
      <ProblemSolution />

      {/* 5. Services category tiles */}
      <ServicesTiles />

      {/* 6. Trust/social proof */}
      <TrustProof />

      {/* 7. Global/local compact module */}
      <GlobalLocal />

      {/* 8. Bold final CTA */}
      <FinalCTA />

      <PublicFooter />
    </main>
  );
}
