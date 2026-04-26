// Marketplace Service Layer
// This file provides a clean service layer for marketplace operations.
// UI components should call these functions, not storage directly.
// FUTURE: When backend is ready, replace storage calls with API calls.

import { LeadRequest, LeadStatus, Installer, ServiceType, PropertyType, Ownership, Timeline } from "./matching";
import { InstallerApplication } from "./marketplaceData";
import {
  readLeads,
  writeLeads,
  readLeadById,
  readInstallers,
  writeInstallers,
  readInstallerById,
  readApplications,
  writeApplications,
  initializeStorage,
} from "./marketplaceStorage";
import { calculateLeadPrice, rankInstallersForLead } from "./matching";

// ============================================
// INPUT/OUTPUT CONTRACTS
// ============================================

/**
 * Input for creating a new lead
 */
export interface CreateLeadInput {
  service: string;
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
}

/**
 * Input for updating lead status
 */
export interface UpdateLeadStatusInput {
  leadId: string;
  status: LeadStatus;
}

/**
 * Input for creating an installer application
 */
export interface CreateInstallerApplicationInput {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  services: ServiceType[];
  mainPostcode: string;
  serviceRadius: number;
  region: string;
  monthlyCapacity: string;
  isCertified: boolean;
  hasInsurance: boolean;
  yearsOfExperience: string;
  website?: string;
}

/**
 * Input for accepting a lead
 */
export interface AcceptLeadInput {
  leadId: string;
  installerId: string;
}

/**
 * Input for declining a lead
 */
export interface DeclineLeadInput {
  leadId: string;
  installerId: string;
}

/**
 * Generic response wrapper for API-like responses
 * FUTURE: Use this for all API responses when backend is connected
 */
export interface MarketplaceResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// ============================================
// LEAD SERVICE FUNCTIONS
// ============================================

/**
 * Get all leads
 * FUTURE: GET /api/leads
 */
export function getLeads(): LeadRequest[] {
  return readLeads();
}

/**
 * Get a single lead by ID
 * FUTURE: GET /api/leads/:id
 */
export function getLeadById(id: string): LeadRequest | undefined {
  return readLeadById(id);
}

/**
 * Create a new lead
 * FUTURE: POST /api/leads
 */
export function createLead(input: CreateLeadInput): LeadRequest {
  const leads = getLeads();
  const newId = (leads.length + 1).toString();
  
  // Map service name to service type
  const serviceMap: Record<string, ServiceType> = {
    "Solar panels": "solar",
    "Heat pump": "heat-pumps",
    "Insulation": "insulation",
    "Windows & renovation": "renovation",
    "Kitchen renovation": "kitchen",
    "Bathroom renovation": "bathroom",
  };
  
  const serviceType = serviceMap[input.serviceName] || "other";
  
  const newLead: LeadRequest = {
    id: newId,
    service: serviceType,
    serviceName: input.serviceName,
    impact: input.impact,
    whyItMatters: input.whyItMatters,
    propertyType: input.propertyType,
    ownership: input.ownership,
    timeline: input.timeline,
    postcode: input.postcode,
    region: input.region,
    homeownerName: input.homeownerName,
    homeownerEmail: input.homeownerEmail,
    homeownerPhone: input.homeownerPhone,
    status: "new",
    createdAt: new Date(),
    leadValue: calculateLeadPrice({
      id: newId,
      service: serviceType,
      serviceName: input.serviceName,
      impact: input.impact,
      whyItMatters: input.whyItMatters,
      propertyType: input.propertyType,
      ownership: input.ownership,
      timeline: input.timeline,
      postcode: input.postcode,
      region: input.region,
      homeownerName: input.homeownerName,
      homeownerEmail: input.homeownerEmail,
      homeownerPhone: input.homeownerPhone,
      status: "new",
      createdAt: new Date(),
    }),
  };
  
  leads.push(newLead);
  writeLeads(leads);
  
  return newLead;
}

/**
 * Update lead status
 * FUTURE: PATCH /api/leads/:id/status
 */
export function updateLeadStatus(input: UpdateLeadStatusInput): LeadRequest | null {
  const leads = getLeads();
  const leadIndex = leads.findIndex((lead) => lead.id === input.leadId);
  
  if (leadIndex === -1) return null;
  
  leads[leadIndex].status = input.status;
  writeLeads(leads);
  
  return leads[leadIndex];
}

/**
 * Update matched installers for a lead
 * FUTURE: PATCH /api/leads/:id/installers
 */
export function updateLeadMatchedInstallers(leadId: string, installerIds: string[]): LeadRequest | null {
  const leads = getLeads();
  const leadIndex = leads.findIndex((lead) => lead.id === leadId);
  
  if (leadIndex === -1) return null;
  
  leads[leadIndex].matchedInstallerIds = installerIds;
  writeLeads(leads);
  
  return leads[leadIndex];
}

// ============================================
// INSTALLER SERVICE FUNCTIONS
// ============================================

/**
 * Get all installers
 * FUTURE: GET /api/installers
 */
export function getInstallers(): Installer[] {
  return readInstallers();
}

/**
 * Get a single installer by ID
 * FUTURE: GET /api/installers/:id
 */
export function getInstallerById(id: string): Installer | undefined {
  return readInstallerById(id);
}

/**
 * Get leads suitable for a specific installer
 * Uses matching logic to filter leads
 * FUTURE: GET /api/installers/:id/leads
 */
export function getLeadsForInstaller(installerId: string): LeadRequest[] {
  const installer = getInstallerById(installerId);
  if (!installer) return [];
  
  const leads = getLeads();
  const suitableLeads: LeadRequest[] = [];
  
  for (const lead of leads) {
    const matches = rankInstallersForLead(lead, [installer]);
    const installerMatch = matches.find((m) => m.installerId === installerId);
    
    if (installerMatch && installerMatch.recommended) {
      suitableLeads.push(lead);
    }
  }
  
  return suitableLeads;
}

/**
 * Get match score for a specific lead and installer
 * FUTURE: GET /api/installers/:id/leads/:leadId/score
 */
export function getMatchScoreForLead(leadId: string, installerId: string): number {
  const lead = getLeadById(leadId);
  const installer = getInstallerById(installerId);
  
  if (!lead || !installer) return 0;
  
  const matches = rankInstallersForLead(lead, [installer]);
  const match = matches.find((m) => m.installerId === installerId);
  
  return match?.score || 0;
}

/**
 * Accept a lead
 * FUTURE: POST /api/installers/:id/leads/:leadId/accept
 */
export function acceptLead(input: AcceptLeadInput): LeadRequest | null {
  const lead = updateLeadStatus({ leadId: input.leadId, status: "accepted" });
  if (lead) {
    updateLeadMatchedInstallers(input.leadId, [input.installerId]);
  }
  return lead;
}

/**
 * Decline a lead
 * FUTURE: POST /api/installers/:id/leads/:leadId/decline
 */
export function declineLead(input: DeclineLeadInput): LeadRequest | null {
  return updateLeadStatus({ leadId: input.leadId, status: "declined" });
}

// ============================================
// APPLICATION SERVICE FUNCTIONS
// ============================================

/**
 * Get all installer applications
 * FUTURE: GET /api/installers/applications
 */
export function getInstallerApplications(): InstallerApplication[] {
  return readApplications();
}

/**
 * Create a new installer application
 * FUTURE: POST /api/installers/applications
 */
export function createInstallerApplication(input: CreateInstallerApplicationInput): InstallerApplication {
  const applications = getInstallerApplications();
  const newId = (applications.length + 1).toString();
  
  const newApplication: InstallerApplication = {
    id: newId,
    ...input,
    status: "pending",
    submittedAt: new Date(),
  };
  
  applications.push(newApplication);
  writeApplications(applications);
  
  return newApplication;
}

/**
 * Update application status
 * FUTURE: PATCH /api/installers/applications/:id/status
 */
export function updateApplicationStatus(id: string, status: "approved" | "rejected"): InstallerApplication | null {
  const applications = getInstallerApplications();
  const appIndex = applications.findIndex((app) => app.id === id);
  
  if (appIndex === -1) return null;
  
  applications[appIndex].status = status;
  applications[appIndex].reviewedAt = new Date();
  writeApplications(applications);
  
  return applications[appIndex];
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the marketplace service
 * Call this on app startup to ensure storage is initialized
 * FUTURE: Remove when backend is connected
 */
export function initializeMarketplace(): void {
  initializeStorage();
}
