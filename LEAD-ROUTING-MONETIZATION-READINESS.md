# Lead Routing & Monetization Readiness

**Date:** 2026-04-24  
**Status:** Frontend Ready for Backend Integration  
**Objective:** Prepare frontend for intelligent lead routing and tiered pricing

---

## 🎯 Overview

This implementation prepares the platform for **lead routing and monetization** without requiring backend changes yet. All segmentation data flows through the frontend and is ready for backend consumption when needed.

**Key Achievement:** Complete data pipeline from user input → URL params → intake page → ready for API submission

---

## 📊 Data Flow Architecture

### **1. User Input (MatchingBlock)**
User provides information through the matching form:

#### **Required Fields:**
- Service type
- Country
- City
- Property type (house/apartment/commercial)
- Timeline (ASAP/1-3 months/exploring)

#### **Optional Value Signals:**
- Ownership status (owner/renter)
- Property size (small/medium/large)
- Budget range (4 tiers up to €30k+)

### **2. Lead Scoring (Frontend)**
Real-time calculation of lead value:

```typescript
Lead Score Algorithm:
- Timeline: ASAP (+3), 1-3 months (+2), Exploring (+0)
- Ownership: Owner (+2), Renter (+1)
- Property Size: Large (+2), Medium (+1), Small (+0)
- Budget: €30k+ (+3), €15k-€30k (+2), €5k-€15k (+1), <€5k (+0)

Lead Tiers:
- High Priority: Score 7+ points
- Medium Priority: Score 4-6 points
- Low Priority: Score 0-3 points
```

### **3. URL Parameter Transmission**
All data passed via query string to `/intake`:

```
/intake?
  service=solar&
  city=amsterdam&
  country=netherlands&
  propertyType=house&
  timeline=asap&
  ownership=owner&
  propertySize=large&
  budget=30k-plus&
  leadScore=10&
  leadTier=high
```

### **4. Intake Page Reception**
Intake page extracts and uses all routing data:

```typescript
// Routing data available for backend
const leadScore = searchParams.get('leadScore') || '0'
const leadTier = searchParams.get('leadTier') || 'low'
const propertyTypeParam = searchParams.get('propertyType') || ''
const timelineParam = searchParams.get('timeline') || ''
const ownershipParam = searchParams.get('ownership') || ''
const propertySizeParam = searchParams.get('propertySize') || ''
const budgetParam = searchParams.get('budget') || ''
```

---

## 💰 Monetization Readiness

### **Tiered Pricing Structure (Ready to Implement)**

#### **High-Value Leads (Score 7+)**
**Suggested Price:** €30-50 per lead

**Characteristics:**
- ASAP timeline
- Property owner
- Large property or high budget
- All optional fields completed

**Value to Installers:**
- Immediate conversion potential
- Decision-maker contact
- High project value
- Serious buyer intent

**Platform Benefits:**
- Premium pricing justified
- Higher installer satisfaction
- Better conversion rates
- Reduced churn

#### **Medium-Value Leads (Score 4-6)**
**Suggested Price:** €15-25 per lead

**Characteristics:**
- 1-3 month timeline
- Some optional fields completed
- Moderate project scope

**Value to Installers:**
- Good conversion potential
- Qualified interest
- Reasonable project size

#### **Low-Value Leads (Score 0-3)**
**Suggested Price:** €5-10 per lead

**Characteristics:**
- "Just exploring" timeline
- Minimal information provided
- Lower urgency

**Value to Installers:**
- Future pipeline building
- Lower immediate conversion
- Requires more nurturing

---

## 🔀 Routing Strategies (Backend Implementation Ready)

### **Strategy 1: Tiered Installer Access**

**Premium Installers (High Tier)**
- Get first access to high-value leads
- Pay premium prices (€30-50)
- Receive leads within 5 minutes
- Exclusive 1-hour window

**Standard Installers (Medium Tier)**
- Get medium and low-value leads
- Pay standard prices (€15-25)
- Receive leads within 1 hour
- Shared access after premium window

**Basic Installers (Low Tier)**
- Get remaining leads
- Pay basic prices (€5-10)
- Receive leads after 24 hours
- High volume, lower quality

### **Strategy 2: Geographic + Value Routing**

```typescript
// Pseudo-code for backend routing logic
function routeLead(leadData) {
  const { city, leadScore, leadTier, budget } = leadData
  
  // Get installers in city
  const localInstallers = getInstallersByCity(city)
  
  // Filter by tier subscription
  const eligibleInstallers = localInstallers.filter(
    installer => installer.tier >= getRequiredTier(leadScore)
  )
  
  // Sort by response rate and rating
  const sortedInstallers = sortByPerformance(eligibleInstallers)
  
  // Send to top 3-5 installers
  return sortedInstallers.slice(0, 5)
}
```

### **Strategy 3: Budget-Based Routing**

High-budget leads (€30k+) → Specialized premium installers  
Medium-budget leads (€5k-€30k) → General contractors  
Low-budget leads (<€5k) → Volume-focused installers

---

## 📈 Data Available for Backend Routing

### **Core Routing Parameters**

| Parameter | Type | Use Case |
|-----------|------|----------|
| `leadScore` | number (0-10+) | Primary routing decision |
| `leadTier` | string (high/medium/low) | Tier-based access control |
| `service` | string | Service-specific installer matching |
| `city` | string | Geographic routing |
| `country` | string | Regional pricing adjustments |
| `propertyType` | string | Installer specialization matching |
| `timeline` | string | Urgency-based prioritization |
| `ownership` | string | Decision authority indicator |
| `propertySize` | string | Project scope estimation |
| `budget` | string | Price tier routing |

### **Derived Metrics (Can Calculate Backend)**

```typescript
// Backend can derive additional routing signals
const routingSignals = {
  // Conversion probability
  conversionScore: calculateConversionProbability(leadData),
  
  // Project value estimation
  estimatedValue: estimateProjectValue(budget, propertySize, service),
  
  // Installer match score
  installerFit: calculateInstallerMatch(leadData, installerProfile),
  
  // Geographic demand
  localDemand: getLocalMarketDemand(city, service),
  
  // Time-based priority
  urgencyMultiplier: getUrgencyMultiplier(timeline)
}
```

---

## 🎨 User Experience Enhancements

### **1. Pre-Intake Summary**
Users see complete request summary before proceeding:

```
Your Request Summary:
✓ Solar service
✓ Location: Amsterdam, Netherlands
✓ Property: House
✓ Timeline: ASAP
✓ Property Owner
✓ Property size: Large (>200m²)
✓ Budget: €30,000+
```

### **2. Dynamic Tier Messaging**

**High-Value Leads See:**
> ⭐ You're a high-priority request  
> You're likely to receive fast responses from premium professionals

**Medium-Value Leads See:**
> ✨ You'll receive multiple quality offers  
> We're matching you with suitable professionals

**Low-Value Leads See:**
> 💡 You can still explore options  
> Adding more details improves your results

### **3. Premium Positioning**
All messaging emphasizes:
- "Professional matching service"
- "Carefully selected specialists"
- "Priority matching" for high-value leads
- "Verified professionals"

---

## 🔧 Backend Integration Guide

### **Step 1: Capture URL Parameters in API**

```typescript
// app/api/leads/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  const url = new URL(request.url)
  
  // Extract routing data from referrer or body
  const leadScore = body.leadScore || 0
  const leadTier = body.leadTier || 'low'
  const budget = body.budget
  const ownership = body.ownership
  const propertySize = body.propertySize
  
  // Store in database
  const lead = await prisma.lead.create({
    data: {
      ...body,
      leadScore,
      leadTier,
      budget,
      ownership,
      propertySize,
      routingStatus: 'pending'
    }
  })
  
  // Trigger routing logic
  await routeLeadToInstallers(lead)
  
  return Response.json({ success: true })
}
```

### **Step 2: Implement Routing Logic**

```typescript
async function routeLeadToInstallers(lead) {
  // Get eligible installers based on tier
  const installers = await getEligibleInstallers({
    city: lead.city,
    service: lead.service,
    minTier: getTierRequirement(lead.leadScore)
  })
  
  // Calculate pricing
  const leadPrice = calculateLeadPrice(lead.leadScore, lead.budget)
  
  // Send to installers
  for (const installer of installers) {
    await sendLeadNotification(installer, lead, leadPrice)
  }
}
```

### **Step 3: Add Database Schema**

```prisma
model Lead {
  id            String   @id @default(cuid())
  // Existing fields...
  
  // New routing fields
  leadScore     Int      @default(0)
  leadTier      String   @default("low")
  ownership     String?
  propertySize  String?
  budget        String?
  routingStatus String   @default("pending")
  routedAt      DateTime?
  installersSent Int     @default(0)
  
  @@index([leadScore])
  @@index([leadTier])
  @@index([routingStatus])
}

model Installer {
  id              String   @id @default(cuid())
  // Existing fields...
  
  // Tier subscription
  subscriptionTier String  @default("basic") // basic, standard, premium
  leadPrice        Decimal @default(10.00)
  
  // Performance metrics
  responseRate     Decimal @default(0)
  conversionRate   Decimal @default(0)
  rating           Decimal @default(0)
}
```

---

## 📊 Analytics & Tracking

### **Metrics to Track**

**Lead Quality Metrics:**
- Average lead score by source
- Conversion rate by lead tier
- Time to first response by tier
- Quote-to-project conversion by tier

**Revenue Metrics:**
- Revenue per lead by tier
- Average lead price
- Installer lifetime value by tier
- Churn rate by tier

**Routing Efficiency:**
- Time to route by tier
- Installer acceptance rate
- Lead distribution fairness
- Geographic coverage

---

## 🚀 Implementation Phases

### **Phase 1: Data Collection (✅ COMPLETE)**
- Frontend captures all segmentation data
- URL params pass data to intake
- Intake page receives and displays data
- User sees tier-based messaging

### **Phase 2: Backend Storage (Ready to Implement)**
- Update database schema
- Store routing parameters
- Create lead scoring table
- Add installer tier management

### **Phase 3: Basic Routing (Ready to Implement)**
- Implement tier-based routing
- Send leads to appropriate installers
- Track routing metrics
- A/B test pricing

### **Phase 4: Advanced Routing (Future)**
- Machine learning for lead scoring
- Dynamic pricing optimization
- Predictive installer matching
- Real-time demand balancing

---

## 💡 Monetization Scenarios

### **Scenario 1: Tiered Subscription Model**

**Premium Installers:** €299/month
- Access to high-value leads only
- Unlimited lead volume
- Priority routing
- 5-minute response window

**Standard Installers:** €149/month
- Access to medium/low leads
- Limited high-value leads
- Standard routing
- 1-hour response window

**Basic Installers:** Pay-per-lead
- €5-10 per lead
- Leftover leads only
- 24-hour delay
- No subscription fee

### **Scenario 2: Pay-Per-Lead with Tiers**

**All installers pay per lead, prices vary by tier:**
- High-value leads: €30-50
- Medium-value leads: €15-25
- Low-value leads: €5-10

**Benefits:**
- No subscription barrier
- Fair pricing based on value
- Scalable revenue
- Easy to understand

### **Scenario 3: Hybrid Model**

**Base subscription + variable pricing:**
- €99/month base fee
- High-value leads: €20 each
- Medium-value leads: €10 each
- Low-value leads: Free (included)

---

## 🎯 Success Metrics

### **Short-Term (1-3 months)**
- 40%+ of leads complete optional fields
- Lead score distribution: 20% high, 50% medium, 30% low
- Installer satisfaction with lead quality: 4+/5
- Lead-to-quote conversion: 25%+ improvement

### **Medium-Term (3-6 months)**
- Average lead price: €20+
- Revenue per lead increase: 30%+
- Installer retention: 85%+
- High-value lead conversion: 40%+

### **Long-Term (6-12 months)**
- Tiered pricing fully implemented
- Dynamic routing operational
- Predictive lead scoring active
- Platform profitability: 2x improvement

---

## 🔒 Data Privacy & Compliance

### **User Data Handling**
- All routing data collected with consent
- Optional fields clearly marked
- Data used only for matching purposes
- GDPR compliant storage and processing

### **Installer Data Access**
- Installers see only matched leads
- No access to routing algorithms
- Fair distribution policies
- Transparent pricing

---

## 📝 Technical Notes

### **Current State**
✅ All routing data flows through frontend  
✅ Lead scoring algorithm implemented  
✅ URL parameters structured and documented  
✅ Intake page ready to receive data  
✅ User experience optimized for value signals  
✅ No backend changes required yet  

### **Next Steps for Backend**
1. Update database schema with routing fields
2. Modify `/api/leads` endpoint to capture routing data
3. Implement basic tier-based routing logic
4. Create installer tier management system
5. Add pricing calculation logic
6. Build routing analytics dashboard

### **No Breaking Changes**
- All changes are additive
- Existing functionality preserved
- Optional fields remain optional
- Backward compatible with current API

---

## 🎓 Key Insights

### **What Makes This Ready for Monetization**

1. **Complete Data Pipeline**
   - Every routing signal captured
   - Clean data structure
   - Ready for backend consumption

2. **User Psychology Optimized**
   - Users want to provide information
   - Premium positioning increases perceived value
   - Tier messaging creates FOMO

3. **Flexible Architecture**
   - Can implement any routing strategy
   - Easy to A/B test pricing
   - Scalable to complex algorithms

4. **Revenue Potential Clear**
   - High-value leads identifiable
   - Pricing tiers justified
   - Installer value proposition strong

---

## 🔗 Related Documentation

- [LEAD-VALUE-OPTIMIZATION-IMPLEMENTATION.md](LEAD-VALUE-OPTIMIZATION-IMPLEMENTATION.md) - Value signal implementation
- [CONVERSION-OPTIMIZATION-SUMMARY.md](CONVERSION-OPTIMIZATION-SUMMARY.md) - Conversion improvements
- [IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md) - Platform overview

---

**Status:** ✅ Frontend Complete & Ready for Backend Integration  
**Backend Changes Required:** Database schema + routing logic  
**Estimated Backend Implementation:** 2-3 days  
**Revenue Impact Potential:** 30-50% increase in lead value
