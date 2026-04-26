"use client";

import { useSearchParams } from "next/navigation";
import IntakeFlow from "@/components/IntakeFlow";

export default function IntakeFlowClient() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "";
  const impact = searchParams.get("impact") || "";
  const whyItMatters = searchParams.get("whyItMatters") || "";

  // Map service to intake slug
  const serviceToSlug: Record<string, string> = {
    "Solar panels": "solar",
    "Insulation": "insulation",
    "Windows & renovation": "renovation",
    "Heat pump": "heat-pumps",
    "Kitchen renovation": "kitchen",
    "Bathroom renovation": "bathroom",
  };

  const intakeSlug = serviceToSlug[service] || "renovation";

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020a05]">
        <p className="text-white/50">No service selected. Please return to the home scan.</p>
      </div>
    );
  }

  return (
    <IntakeFlow
      initialService={service}
      initialSlug={intakeSlug}
      initialImpact={impact}
      initialWhyItMatters={whyItMatters}
    />
  );
}
