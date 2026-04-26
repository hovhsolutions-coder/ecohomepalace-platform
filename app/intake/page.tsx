import { Suspense } from "react";
import IntakeFlowClient from "./IntakeFlowClient";

export default function IntakePage() {
  return (
    <Suspense fallback={<IntakeLoading />}>
      <IntakeFlowClient />
    </Suspense>
  );
}

function IntakeLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020a05]">
      <p className="text-white/50">Loading...</p>
    </div>
  );
}
