import type { Metadata } from "next";
import HeroV4 from "@/components/HeroV4";
import ProofStrip from "@/components/ProofStrip";
import HowItWorks from "@/components/HowItWorks";
import MatchingEngine from "@/components/MatchingEngine";
import ProblemSolution from "@/components/ProblemSolution";
import ServicesTiles from "@/components/ServicesTiles";
import MidPageCTA from "@/components/MidPageCTA";
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

      {/* 4. Matching engine premium section */}
      <MatchingEngine />

      {/* 5. Problem/Solution split */}
      <ProblemSolution />

      {/* 6. Services category tiles */}
      <ServicesTiles />

      {/* 7. Mid-page CTA */}
      <MidPageCTA />

      {/* 8. Trust/social proof */}
      <TrustProof />

      {/* 9. Global/local compact module */}
      <GlobalLocal />

      {/* 10. Bold final CTA */}
      <FinalCTA />

      <PublicFooter />
    </main>
  );
}
