// Matching Logic Foundation for Eco Home Palace
// This module handles the core matching logic between homeowner leads and installers

export type ServiceType =
  | "solar"
  | "heat-pumps"
  | "insulation"
  | "renovation"
  | "roofing"
  | "electrical"
  | "bathroom"
  | "kitchen"
  | "other";

export type MembershipTier = "starter" | "growth" | "premium";

export type LeadStatus = "new" | "viewed" | "reviewing" | "matched" | "sent" | "accepted" | "declined" | "contacted" | "completed";

export type PropertyType = "house" | "apartment" | "townhouse" | "other";

export type Ownership = "own" | "rent";

export type Timeline = "soon" | "exploring" | "flexible";

export interface LeadRequest {
  id: string;
  service: ServiceType;
  serviceName: string;
  impact: string;
  whyItMatters: string;
  propertyType: PropertyType;
  ownership: Ownership;
  timeline: Timeline;
  postcode: string;
  region: string;
  homeownerName: string;
  homeownerEmail: string;
  homeownerPhone?: string;
  status: LeadStatus;
  createdAt: Date;
  matchedInstallerIds?: string[];
  leadValue?: number; // Estimated lead value for monetization
}

export interface Installer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  services: ServiceType[];
  mainPostcode: string;
  serviceRadius: number; // in km
  region: string;
  monthlyCapacity: number; // projects per month
  isCertified: boolean;
  hasInsurance: boolean;
  yearsOfExperience: number;
  website?: string;
  membershipTier: MembershipTier;
  qualityScore: number; // 0-100 based on reviews, certifications, etc.
  active: boolean;
  createdAt: Date;
}

export interface MatchReason {
  factor: string;
  score: number;
  description: string;
}

export interface MatchResult {
  installerId: string;
  installer: Installer;
  score: number; // 0-100
  recommended: boolean;
  reasons: MatchReason[];
  leadPrice?: number; // Price for this installer to access this lead
}

export interface MatchingConfig {
  maxInstallersPerLead: number;
  serviceMatchWeight: number;
  regionMatchWeight: number;
  capacityWeight: number;
  qualityWeight: number;
  membershipBonus: number;
  minimumScoreThreshold: number;
}

const DEFAULT_CONFIG: MatchingConfig = {
  maxInstallersPerLead: 2,
  serviceMatchWeight: 0.4,
  regionMatchWeight: 0.3,
  capacityWeight: 0.15,
  qualityWeight: 0.15,
  membershipBonus: 10,
  minimumScoreThreshold: 50,
};

/**
 * Calculate distance between two postcodes (simplified)
 * In production, this would use a proper geocoding service
 */
function calculateDistance(postcode1: string, postcode2: string): number {
  // Simplified distance calculation based on postcode prefix
  // In production, use Google Maps API or similar
  const prefix1 = postcode1.substring(0, 4);
  const prefix2 = postcode2.substring(0, 4);
  
  if (prefix1 === prefix2) return 5; // Same area
  if (Math.abs(parseInt(prefix1) - parseInt(prefix2)) < 100) return 15; // Nearby
  return 50; // Far
}

/**
 * Calculate service match score
 */
function calculateServiceMatch(leadService: ServiceType, installerServices: ServiceType[]): number {
  if (installerServices.includes(leadService)) return 100;
  
  // Partial matches for related services
  const relatedServices: Record<ServiceType, ServiceType[]> = {
    "solar": ["electrical", "roofing"],
    "heat-pumps": ["electrical", "insulation"],
    "insulation": ["renovation"],
    "renovation": ["bathroom", "kitchen"],
    "roofing": ["solar"],
    "electrical": ["heat-pumps", "solar"],
    "bathroom": ["renovation"],
    "kitchen": ["renovation"],
    "other": [],
  };
  
  const related = relatedServices[leadService] || [];
  const hasRelated = related.some(s => installerServices.includes(s));
  
  return hasRelated ? 50 : 0;
}

/**
 * Calculate region match score based on service radius
 */
function calculateRegionMatch(leadPostcode: string, installer: Installer): number {
  const distance = calculateDistance(leadPostcode, installer.mainPostcode);
  
  if (distance <= installer.serviceRadius) {
    // Score decreases with distance
    return Math.max(0, 100 - (distance / installer.serviceRadius) * 50);
  }
  
  return 0;
}

/**
 * Calculate capacity match score
 */
function calculateCapacityMatch(installer: Installer): number {
  // Higher score if installer has capacity
  // In production, this would consider current active projects
  return installer.monthlyCapacity >= 5 ? 100 : installer.monthlyCapacity * 20;
}

/**
 * Calculate quality match score
 */
function calculateQualityMatch(installer: Installer): number {
  let score = installer.qualityScore;
  
  // Bonus for certification and insurance
  if (installer.isCertified) score += 10;
  if (installer.hasInsurance) score += 10;
  
  // Cap at 100
  return Math.min(100, score);
}

/**
 * Calculate membership bonus
 */
function calculateMembershipBonus(tier: MembershipTier): number {
  switch (tier) {
    case "premium":
      return 15;
    case "growth":
      return 8;
    case "starter":
      return 3;
    default:
      return 0;
  }
}

/**
 * Calculate lead price based on service and project characteristics
 */
export function calculateLeadPrice(lead: LeadRequest): number {
  const basePrices: Record<ServiceType, { min: number; max: number }> = {
    "solar": { min: 75, max: 150 },
    "heat-pumps": { min: 100, max: 200 },
    "insulation": { min: 35, max: 75 },
    "renovation": { min: 75, max: 150 },
    "roofing": { min: 50, max: 100 },
    "electrical": { min: 35, max: 75 },
    "bathroom": { min: 75, max: 150 },
    "kitchen": { min: 100, max: 200 },
    "other": { min: 35, max: 75 },
  };
  
  const base = basePrices[lead.service] || { min: 35, max: 75 };
  
  // Adjust based on timeline (sooner = higher value)
  const timelineMultiplier = lead.timeline === "soon" ? 1.2 : lead.timeline === "exploring" ? 0.9 : 1.0;
  
  // Adjust based on ownership (owners = higher value)
  const ownershipMultiplier = lead.ownership === "own" ? 1.1 : 0.9;
  
  const price = ((base.min + base.max) / 2) * timelineMultiplier * ownershipMultiplier;
  
  return Math.round(price);
}

/**
 * Calculate match score for a single installer against a lead
 */
export function calculateInstallerMatch(
  lead: LeadRequest,
  installer: Installer,
  config: MatchingConfig = DEFAULT_CONFIG
): MatchResult {
  const reasons: MatchReason[] = [];
  
  // Service match
  const serviceScore = calculateServiceMatch(lead.service, installer.services);
  reasons.push({
    factor: "service",
    score: serviceScore,
    description: installer.services.includes(lead.service)
      ? "Direct service match"
      : "Related service",
  });
  
  // Region match
  const regionScore = calculateRegionMatch(lead.postcode, installer);
  reasons.push({
    factor: "region",
    score: regionScore,
    description: regionScore > 0
      ? `Within ${installer.serviceRadius}km service radius`
      : "Outside service radius",
  });
  
  // Capacity match
  const capacityScore = calculateCapacityMatch(installer);
  reasons.push({
    factor: "capacity",
    score: capacityScore,
    description: `Can handle ${installer.monthlyCapacity} projects/month`,
  });
  
  // Quality match
  const qualityScore = calculateQualityMatch(installer);
  reasons.push({
    factor: "quality",
    score: qualityScore,
    description: `Quality score: ${qualityScore}/100`,
  });
  
  // Membership bonus
  const membershipBonus = calculateMembershipBonus(installer.membershipTier);
  if (membershipBonus > 0) {
    reasons.push({
      factor: "membership",
      score: membershipBonus,
      description: `${installer.membershipTier} tier bonus`,
    });
  }
  
  // Calculate weighted score
  const weightedScore =
    serviceScore * config.serviceMatchWeight +
    regionScore * config.regionMatchWeight +
    capacityScore * config.capacityWeight +
    qualityScore * config.qualityWeight +
    membershipBonus;
  
  const finalScore = Math.min(100, Math.round(weightedScore));
  
  // Determine if recommended
  const recommended = finalScore >= config.minimumScoreThreshold;
  
  // Calculate lead price for this installer
  const leadPrice = recommended ? calculateLeadPrice(lead) : undefined;
  
  return {
    installerId: installer.id,
    installer,
    score: finalScore,
    recommended,
    reasons,
    leadPrice,
  };
}

/**
 * Rank and filter installers for a lead
 */
export function rankInstallersForLead(
  lead: LeadRequest,
  installers: Installer[],
  config: MatchingConfig = DEFAULT_CONFIG
): MatchResult[] {
  // Calculate match for all installers
  const matches = installers
    .map(installer => calculateInstallerMatch(lead, installer, config))
    .filter(match => match.recommended);
  
  // Sort by score descending
  matches.sort((a, b) => b.score - a.score);
  
  // Limit to max installers per lead
  return matches.slice(0, config.maxInstallersPerLead);
}

/**
 * Calculate lead value for monetization tracking
 */
export function calculateLeadValue(lead: LeadRequest, matchedInstallers: number): number {
  const basePrice = calculateLeadPrice(lead);
  
  // If multiple installers matched, the platform earns more
  const multiplier = matchedInstallers > 1 ? 1.5 : 1.0;
  
  return Math.round(basePrice * multiplier);
}
