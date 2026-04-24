import { prisma } from '@/lib/prisma'
import type { Lead } from '@prisma/client'
import LogoutButton from './LogoutButton'

export const dynamic = 'force-dynamic'

const companyStrategy = {
  vision: 'The global platform where every home improvement project finds its perfect professional match within 24 hours',
  mission: 'Eliminate friction in home services by connecting quality-conscious homeowners with verified professionals through transparent pricing and AI-driven matching',
  businessModel: 'Lead generation marketplace: Homeowners post free → Professionals pay per lead or subscription → Platform takes 15-30% of lead value or subscription fee',
  currentFocus: 'Validate lead generation model in Netherlands before building professional side',
  strategicPriority: '1) Lead volume proof 2) Professional acquisition 3) Payment infrastructure 4) International expansion',
  nextMilestone: '100 qualified leads with contact info captured',
}

const platformBuildPlan = [
  { id: 1, feature: 'Lead Intake Multi-Step Form', reason: 'Capture qualified leads with job type, location, description, and contact info', priority: 'critical', phase: '1 - Foundation', status: 'completed', cascadePrompt: 'Build 4-step intake form' },
  { id: 2, feature: 'Elite Founder Board (Internal OS)', reason: 'Strategic command center for company building decisions', priority: 'high', phase: '1 - Foundation', status: 'completed', cascadePrompt: 'Build 8-module internal board' },
  { id: 3, feature: 'Professional Matching Engine v1', reason: 'Score and match leads to best-fit professionals by proximity, category, availability', priority: 'critical', phase: '2 - Core', status: 'pending', cascadePrompt: 'Build matching algorithm with location radius scoring' },
  { id: 4, feature: 'Professional Signup & Verification', reason: 'Onboard professionals with trade license verification and profile creation', priority: 'critical', phase: '2 - Core', status: 'pending', cascadePrompt: 'Create /pro/signup with email, trade category, license upload' },
  { id: 5, feature: 'Professional Dashboard', reason: 'Professionals need to view leads, accept jobs, manage calendar, track earnings', priority: 'high', phase: '2 - Core', status: 'pending', cascadePrompt: 'Build /pro/dashboard with lead inbox, accept/decline buttons' },
  { id: 6, feature: 'Lead Pricing & Payment', reason: 'Charge professionals per lead or subscription to generate revenue', priority: 'critical', phase: '3 - Revenue', status: 'pending', cascadePrompt: 'Implement Stripe Connect' },
  { id: 7, feature: 'Review & Rating System', reason: 'Build trust through homeowner feedback on professionals', priority: 'medium', phase: '4 - Growth', status: 'pending', cascadePrompt: 'Post-project review form' },
]

const marketIntelligence = [
  { id: 1, country: 'Netherlands', city: 'Amsterdam', category: 'Solar Installation', demandSignal: 'high', supplyDifficulty: 'medium', opportunityScore: 9, recommendedAction: 'Prioritize solar pros recruitment in Amsterdam' },
  { id: 2, country: 'Netherlands', city: 'Rotterdam', category: 'Renovation', demandSignal: 'high', supplyDifficulty: 'high', opportunityScore: 7, recommendedAction: 'Focus on quality-filtered renovation matching' },
  { id: 3, country: 'Belgium', city: 'Brussels', category: 'HVAC / Heat Pumps', demandSignal: 'medium', supplyDifficulty: 'low', opportunityScore: 8, recommendedAction: 'Target early: high value, low competition' },
  { id: 4, country: 'Germany', city: 'Berlin', category: 'Painter', demandSignal: 'high', supplyDifficulty: 'high', opportunityScore: 5, recommendedAction: 'Low priority - enter later with differentiation' },
  { id: 5, country: 'UK', city: 'London', category: 'Electrician', demandSignal: 'high', supplyDifficulty: 'medium', opportunityScore: 8, recommendedAction: 'Strong market - add after Netherlands validation' },
  { id: 6, country: 'Spain', city: 'Barcelona', category: 'Renovation', demandSignal: 'medium', supplyDifficulty: 'medium', opportunityScore: 7, recommendedAction: 'Expat-focused angle - English-speaking pros' },
]

const revenueEngines = [
  { id: 1, route: 'work/leads', name: 'Lead Generation Revenue', hypothesis: 'Professionals will pay €25-75 per qualified lead with full project details and homeowner contact', expectedRevenue: '€50,000/month', requiredEffort: 'Build lead distribution + Stripe integration', risk: 'Professionals may not convert if lead quality is low', nextAction: 'Test pricing with 5 beta professionals' },
  { id: 2, route: 'products', name: 'Premium Professional Subscriptions', hypothesis: 'Top professionals will pay €199/month for priority lead access and featured placement', expectedRevenue: '€20,000/month', requiredEffort: 'Subscription tiers + featured placement UI', risk: 'Need critical mass of leads first', nextAction: 'Define premium tier benefits' },
  { id: 3, route: 'deal closing', name: 'Project Management Add-on', hypothesis: 'Homeowners will pay €49 for milestone tracking, contract templates, and payment protection', expectedRevenue: '€15,000/month', requiredEffort: 'Milestone tracking + basic escrow', risk: 'Adds complexity, may delay core lead business', nextAction: 'Defer to Phase 4' },
]

const decisionRoom = [
  { id: 1, decision: 'Build lead generation BEFORE professional marketplace', reason: 'Lower complexity, faster validation. Prove demand exists before building supply side.', expectedImpact: 'Launch 3x faster, clear demand signals for professional recruitment', date: '2025-04-24', status: 'active' },
  { id: 2, decision: 'Start with Netherlands as first market', reason: 'Founder market knowledge, English fluency high, strong home improvement culture', expectedImpact: 'Faster market validation, local network advantage', date: '2025-04-24', status: 'active' },
  { id: 3, decision: 'Use SQLite + Prisma for MVP, migrate to Postgres later', reason: 'Zero infra cost, simple deployment, sufficient for first 1000 users', expectedImpact: 'Save €200/month initially', date: '2025-04-24', status: 'active' },
  { id: 4, decision: 'Build internal Founder Board from day 1', reason: 'Strategic clarity prevents drift, decision log prevents re-debating', expectedImpact: 'Faster founder decisions, better strategic alignment', date: '2025-04-24', status: 'active' },
]

const riskBoard = [
  { id: 1, risk: 'Unable to attract quality professionals at scale', whyItMatters: 'Without professionals, leads cannot be matched, platform fails', severity: 'critical', mitigation: 'Start with 5 hand-picked professionals, offer first 10 leads free', owner: 'Founder / BD', status: 'monitoring' },
  { id: 2, risk: 'Lead quality is too low, professionals churn', whyItMatters: 'Professionals stop paying, reputation damage', severity: 'high', mitigation: 'Qualifying questions in intake, manual review of first 50 leads', owner: 'Product', status: 'monitoring' },
  { id: 3, risk: 'Well-funded competitor copies and outspends on marketing', whyItMatters: 'Cannot compete on ad spend', severity: 'high', mitigation: 'Focus on underserved markets first, build local brand loyalty', owner: 'Strategy', status: 'mitigating' },
  { id: 4, risk: 'Payment processing complexity across EU countries', whyItMatters: 'Regulatory issues, delayed expansion', severity: 'medium', mitigation: 'Start single-country, use Stripe Connect for EU expansion', owner: 'Tech / Legal', status: 'planned' },
  { id: 5, risk: 'Founder bandwidth - trying to build too much at once', whyItMatters: 'Slow progress, burnout', severity: 'high', mitigation: 'Use Cascade for 80% of build, defer non-core features', owner: 'Founder', status: 'mitigating' },
]

const cascadeCommandCenter = [
  { id: 1, task: 'Professional Matching Algorithm v1', context: 'Platform needs to score and match incoming leads with available professionals', requirements: 'Create service that calculates proximity score, checks category match, verifies availability', acceptanceCriteria: 'Given a lead in Amsterdam for Solar, API returns 3-5 solar installers within 25km', finalCascadePrompt: 'Build /api/match service with scoring algorithm', status: 'ready' },
  { id: 2, task: 'Professional Signup Flow', context: 'Need to onboard professionals with verification', requirements: 'Multi-step signup: email, categories, license upload, service area, profile', acceptanceCriteria: 'Professional can complete signup, admin can approve/reject', finalCascadePrompt: 'Create /pro/signup page with 5-step flow', status: 'ready' },
  { id: 3, task: 'Professional Dashboard v1', context: 'Professionals need interface to view leads', requirements: 'Dashboard sections: Lead Inbox, Active Jobs, Calendar, Profile, Earnings', acceptanceCriteria: 'Professional logs in, sees leads, accepts one, toggles availability', finalCascadePrompt: 'Build /pro/dashboard with 5 sections', status: 'ready' },
]

const currentStrategicPriority = {
  title: 'Validate Lead-Professional Match in Netherlands',
  reason: 'We have lead intake working. Now we need to prove professionals will pay for matched leads before building full marketplace.',
  nextAction: 'Recruit 5 beta solar installers in Amsterdam, manually match them to leads, collect feedback on lead quality',
  successMetric: '3+ professionals convert to paid after receiving 5+ matched leads each'
}

const founderDecisionEngine = [
  {
    id: 1,
    category: 'Work / Lead Engine',
    hypothesis: 'Professionals will pay €25-75 per qualified lead with full project details and homeowner contact info',
    opportunityLevel: 'high',
    expectedCashflow: '€50,000/month at 1000 leads with 20% conversion to paid',
    difficulty: 'medium',
    risk: 'Professionals may not convert if lead quality is low or pricing is wrong',
    nextAction: 'Build matching algorithm + recruit 5 beta professionals for Amsterdam solar market',
    cascadeBuildPrompt: 'Build /api/match service that scores professionals for each lead based on proximity, category match, and availability. Create manual matching workflow for beta testing.'
  },
  {
    id: 2,
    category: 'Products Engine',
    hypothesis: 'Top professionals will pay €199/month subscription for priority lead access, featured placement, and analytics dashboard',
    opportunityLevel: 'medium',
    expectedCashflow: '€20,000/month with 100 subscribed professionals',
    difficulty: 'high',
    risk: 'Need critical mass of leads first to justify subscription; professionals may churn if lead volume is inconsistent',
    nextAction: 'Defer until lead engine is generating 500+ leads/month with proven conversion rates',
    cascadeBuildPrompt: 'DEFERRED: Build subscription tiers, featured placement algorithm, and premium analytics dashboard. Only after lead engine is validated.'
  },
  {
    id: 3,
    category: 'Deal Closing Engine',
    hypothesis: 'Homeowners will pay €49 for milestone tracking, contract templates, payment protection, and project management tools',
    opportunityLevel: 'medium',
    expectedCashflow: '€15,000/month with 300 projects using the service',
    difficulty: 'high',
    risk: 'Adds significant complexity, requires escrow/payment infrastructure, may distract from core lead business',
    nextAction: 'Defer to Phase 4 after core lead and product revenue are proven',
    cascadeBuildPrompt: 'DEFERRED: Build milestone tracking, contract templates, basic escrow integration. Only after main revenue engines are working.'
  }
]

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = { active: 'bg-green-500/20 text-green-400', completed: 'bg-blue-500/20 text-blue-400', pending: 'bg-gray-500/20 text-gray-400', ready: 'bg-purple-500/20 text-purple-400', monitoring: 'bg-yellow-500/20 text-yellow-400', mitigating: 'bg-orange-500/20 text-orange-400', planned: 'bg-blue-500/20 text-blue-400' }
  return colors[status] || 'bg-gray-500/20 text-gray-400'
}

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = { critical: 'bg-red-500/20 text-red-400', high: 'bg-orange-500/20 text-orange-400', medium: 'bg-yellow-500/20 text-yellow-400', low: 'bg-gray-500/20 text-gray-400' }
  return colors[priority] || 'bg-gray-500/20 text-gray-400'
}

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = { critical: 'bg-red-500/20 text-red-400', high: 'bg-orange-500/20 text-orange-400', medium: 'bg-yellow-500/20 text-yellow-400', low: 'bg-gray-500/20 text-gray-400' }
  return colors[severity] || 'bg-gray-500/20 text-gray-400'
}

export default async function BoardPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Eco Home Palace</h1>
            <p className="text-xs text-gray-500">Internal Operating System — Founders Only</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">{leads.length} Leads</span>
            <a href="/" className="text-sm text-gray-400 hover:text-white">View Public Site →</a>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Current Strategic Priority */}
        <section className="mb-8 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-500/20">
              <span className="text-lg">🎯</span>
            </div>
            <div className="flex-1">
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">Current Strategic Priority</h2>
              <p className="mb-3 text-lg font-medium">{currentStrategicPriority.title}</p>
              <p className="mb-3 text-sm text-gray-400">{currentStrategicPriority.reason}</p>
              <div className="flex flex-wrap gap-4">
                <div className="rounded-lg bg-black/30 px-4 py-2">
                  <p className="text-xs text-gray-500">Next Action</p>
                  <p className="text-sm text-yellow-300">{currentStrategicPriority.nextAction}</p>
                </div>
                <div className="rounded-lg bg-black/30 px-4 py-2">
                  <p className="text-xs text-gray-500">Success Metric</p>
                  <p className="text-sm text-green-400">{currentStrategicPriority.successMetric}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KPI Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <p className="text-sm text-gray-400">Total Leads</p>
            <p className="mt-2 text-3xl font-semibold">{leads.length}</p>
            <p className="mt-1 text-xs text-gray-500">Target: 100</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <p className="text-sm text-gray-400">Professionals</p>
            <p className="mt-2 text-3xl font-semibold">0</p>
            <p className="mt-1 text-xs text-gray-500">Target: 5 (beta)</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <p className="text-sm text-gray-400">Target Markets</p>
            <p className="mt-2 text-3xl font-semibold">6</p>
            <p className="mt-1 text-xs text-gray-500">Priority: NL → BE → UK</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <p className="text-sm text-gray-400">MRR (Projected)</p>
            <p className="mt-2 text-3xl font-semibold">€0</p>
            <p className="mt-1 text-xs text-gray-500">Target: €50K</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-blue-400">1. Company Strategy</h2>
            <div className="space-y-4">
              <div><p className="text-xs text-gray-500">Vision</p><p className="text-sm">{companyStrategy.vision}</p></div>
              <div><p className="text-xs text-gray-500">Mission</p><p className="text-sm text-gray-400">{companyStrategy.mission}</p></div>
              <div><p className="text-xs text-gray-500">Business Model</p><p className="text-sm text-gray-400">{companyStrategy.businessModel}</p></div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">Focus: {companyStrategy.currentFocus}</span>
                <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">Next: {companyStrategy.nextMilestone}</span>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-pink-400">2. Founder Decision Engine</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {founderDecisionEngine.map((item) => (
                <div key={item.id} className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-pink-300">{item.category}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${item.opportunityLevel === 'high' ? 'bg-green-500/20 text-green-400' : item.opportunityLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {item.opportunityLevel} opportunity
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">{item.hypothesis}</p>
                  <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                    <div><span className="text-gray-500">Cashflow:</span> <span className="text-green-400">{item.expectedCashflow.split(' at ')[0]}</span></div>
                    <div><span className="text-gray-500">Difficulty:</span> <span className={item.difficulty === 'high' ? 'text-red-400' : item.difficulty === 'medium' ? 'text-yellow-400' : 'text-green-400'}>{item.difficulty}</span></div>
                  </div>
                  <p className="text-xs text-red-400 mb-2">Risk: {item.risk}</p>
                  <div className="rounded bg-black/30 p-2 mb-2">
                    <p className="text-xs text-gray-500">Next Action:</p>
                    <p className="text-xs text-cyan-300">{item.nextAction}</p>
                  </div>
                  <div className="rounded bg-gray-900/50 p-2">
                    <p className="text-xs text-gray-500">Cascade Prompt:</p>
                    <p className="text-xs font-mono text-gray-400">{item.cascadeBuildPrompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-purple-400">4. Platform Build Plan</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {platformBuildPlan.map((item) => (
                <div key={item.id} className="rounded-lg border border-gray-800 bg-gray-800/50 p-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium">{item.feature}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(item.status)}`}>{item.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">{item.reason}</p>
                  <div className="mt-2 flex flex-wrap gap-1 text-xs">
                    <span className={`rounded-full px-2 py-0.5 ${getPriorityColor(item.priority)}`}>{item.priority}</span>
                    <span className="rounded-full bg-gray-700 px-2 py-0.5 text-gray-300">{item.phase}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-green-400">5. Market Intelligence</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {marketIntelligence.map((item) => (
                <div key={item.id} className="rounded-lg border border-gray-800 bg-gray-800/50 p-3">
                  <div className="flex items-start justify-between">
                    <div><h3 className="text-sm font-medium">{item.city}, {item.country}</h3><p className="text-xs text-gray-400">{item.category}</p></div>
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">Score: {item.opportunityScore}/10</span>
                  </div>
                  <p className="mt-2 text-xs text-blue-400">→ {item.recommendedAction}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-yellow-400">6. Revenue Engines</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {revenueEngines.map((item) => (
                <div key={item.id} className="rounded-lg border border-gray-800 bg-gray-800/50 p-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-400">{item.expectedRevenue.split(' at ')[0]}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">{item.hypothesis}</p>
                  <p className="mt-2 text-xs text-blue-400">Next: {item.nextAction}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-indigo-400">7. Decision Room</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {decisionRoom.map((item) => (
                <div key={item.id} className="rounded-lg border border-gray-800 bg-gray-800/50 p-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium">{item.decision}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(item.status)}`}>{item.status}</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">{item.reason}</p>
                  <p className="mt-2 text-xs text-green-400">Impact: {item.expectedImpact}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-red-400">8. Risk & Weakness Board</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {riskBoard.map((item) => (
                <div key={item.id} className="rounded-lg border border-gray-800 bg-gray-800/50 p-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium">{item.risk}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(item.status)}`}>{item.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Why: {item.whyItMatters}</p>
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className={`rounded-full px-2 py-0.5 ${getSeverityColor(item.severity)}`}>{item.severity}</span>
                    <span className="rounded-full bg-gray-700 px-2 py-0.5 text-gray-300">Owner: {item.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-cyan-400">9. Cascade Command Center</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {cascadeCommandCenter.map((item) => (
                <div key={item.id} className="rounded-lg border border-gray-800 bg-gray-800/50 p-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium">{item.task}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(item.status)}`}>{item.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">{item.context}</p>
                  <div className="mt-2 rounded-lg bg-black/50 p-2"><p className="text-xs font-mono text-cyan-400">{item.finalCascadePrompt}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">10. Lead Command Center</h2>
            {leads.length === 0 ? (
              <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 text-center">
                <p className="text-gray-400">No leads captured yet</p>
                <p className="mt-2 text-xs text-gray-500">Leads appear here when users complete /intake</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {leads.map((lead: Lead) => (
                  <div key={lead.id} className="rounded-lg border border-gray-800 bg-gray-800/50 p-3">
                    <div className="flex items-start justify-between">
                      <div><h3 className="text-sm font-medium">{lead.jobType}</h3><p className="text-xs text-gray-400">{lead.city}</p></div>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${lead.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {lead.priority}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">{lead.description}</p>
                    <p className="mt-2 text-xs text-gray-500">{lead.name} • {lead.email}</p>

                    {/* Lead Intelligence */}
                    <div className="mt-3 grid grid-cols-2 gap-2 rounded border border-cyan-500/30 bg-cyan-950/20 p-2 text-xs">
                      <div>
                        <p className="text-cyan-500/70">Est. Value</p>
                        <p className="font-medium text-cyan-400">€{lead.estimatedValue}</p>
                      </div>
                      <div>
                        <p className="text-cyan-500/70">Routing</p>
                        <p className="font-medium text-cyan-400">{lead.routingType}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
