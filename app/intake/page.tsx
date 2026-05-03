import { Suspense } from 'react'
import IntakeFlow from '@/components/IntakeFlow'

function IntakePageContent() {
  return <IntakeFlow />
}

function IntakeFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020a05]">
      <p className="text-white/50">Loading...</p>
    </div>
  )
}

export default function IntakePage() {
  return (
    <Suspense fallback={<IntakeFallback />}>
      <IntakePageContent />
    </Suspense>
  )
}
