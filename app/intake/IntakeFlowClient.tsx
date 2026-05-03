"use client";

import { useSearchParams } from "next/navigation";
import IntakeFlow from "@/components/IntakeFlow";

export default function IntakeFlowClient() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "";

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020a05]">
        <p className="text-white/50">No service selected. Please return to the home scan.</p>
      </div>
    );
  }

  return <IntakeFlow />;
}
