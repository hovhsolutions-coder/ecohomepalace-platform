// Server-Safe Mock Data for API Routes
// This file provides mock data for API routes during development.
// Unlike the service layer, this NEVER uses localStorage - it's pure server-side data.
// FUTURE: Replace with real database calls when backend is ready.

import { LeadRequest, Installer, ServiceType, PropertyType, Ownership, Timeline } from "./matching";
import { InstallerApplication } from "./marketplaceData";
import { calculateLeadPrice } from "./matching";

// ============================================
// MOCK DATA
// ============================================

const MOCK_INSTALLERS: Installer[] = [
  {
    id: "1",
    companyName: "Green Energy Solutions",
    contactPerson: "Jan de Vries",
    email: "jan@greenenergy.nl",
    phone: "+31 6 12345678",
    services: ["solar", "heat-pumps", "insulation"],
    mainPostcode: "1000 AA",
    serviceRadius: 50,
    region: "Amsterdam",
    monthlyCapacity: 8,
    isCertified: true,
    hasInsurance: true,
    yearsOfExperience: 12,
    website: "https://greenenergy.nl",
    membershipTier: "growth",
    qualityScore: 85,
    active: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    companyName: "Comfort Home Systems",
    contactPerson: "Lisa Peters",
    email: "lisa@comforthome.nl",
    phone: "+31 6 23456789",
    services: ["heat-pumps", "insulation", "electrical"],
    mainPostcode: "2000 AA",
    serviceRadius: 75,
    region: "Rotterdam",
    monthlyCapacity: 12,
    isCertified: true,
    hasInsurance: true,
    yearsOfExperience: 8,
    website: "https://comforthome.nl",
    membershipTier: "premium",
    qualityScore: 92,
    active: true,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    companyName: "Solar Pro Installers",
    contactPerson: "Mark Johnson",
    email: "mark@solarpro.nl",
    phone: "+31 6 34567890",
    services: ["solar", "electrical"],
    mainPostcode: "3000 AB",
    serviceRadius: 25,
    region: "The Hague",
    monthlyCapacity: 5,
    isCertified: true,
    hasInsurance: true,
    yearsOfExperience: 6,
    website: "https://solarpro.nl",
    membershipTier: "starter",
    qualityScore: 78,
    active: true,
    createdAt: new Date("2024-03-10"),
  },
];

const MOCK_LEADS: LeadRequest[] = [
  {
    id: "1",
    service: "solar",
    serviceName: "Solar panels",
    impact: "Can significantly reduce monthly energy costs",
    whyItMatters: "Homes like yours often have strong solar potential that can significantly reduce monthly energy costs.",
    propertyType: "house",
    ownership: "own",
    timeline: "soon",
    postcode: "1020 AB",
    region: "Amsterdam",
    homeownerName: "Peter Jansen",
    homeownerEmail: "peter.jansen@email.com",
    homeownerPhone: "+31 6 23456789",
    status: "new",
    createdAt: new Date("2024-04-25"),
    leadValue: 120,
  },
  {
    id: "2",
    service: "heat-pumps",
    serviceName: "Heat pump",
    impact: "Lowers energy use and provides consistent warmth",
    whyItMatters: "A heat pump uses significantly less energy than traditional heating systems.",
    propertyType: "house",
    ownership: "own",
    timeline: "exploring",
    postcode: "1050 CD",
    region: "Amsterdam",
    homeownerName: "Maria van den Berg",
    homeownerEmail: "maria.vandenberg@email.com",
    status: "new",
    createdAt: new Date("2024-04-24"),
    leadValue: 150,
  },
];

const MOCK_APPLICATIONS: InstallerApplication[] = [];

// In-memory storage for server-side mutations (resets on server restart)
let serverLeads = [...MOCK_LEADS];
let serverInstallers = [...MOCK_INSTALLERS];
let serverApplications = [...MOCK_APPLICATIONS];

// ============================================
// SERVER-SAFE DATA ACCESSORS
// ============================================

/**
 * Get all leads (server-safe, no localStorage)
 */
export function getServerLeads(): LeadRequest[] {
  return serverLeads;
}

/**
 * Get lead by ID (server-safe, no localStorage)
 */
export function getServerLeadById(id: string): LeadRequest | undefined {
  return serverLeads.find((lead) => lead.id === id);
}

/**
 * Create a new lead (server-safe, no localStorage)
 */
export function createServerLead(input: {
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
}): LeadRequest {
  const newId = (serverLeads.length + 1).toString();
  
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
  
  serverLeads.push(newLead);
  return newLead;
}

/**
 * Update lead status (server-safe, no localStorage)
 */
export function updateServerLeadStatus(id: string, newStatus: LeadRequest["status"]): LeadRequest | null {
  const leadIndex = serverLeads.findIndex((lead) => lead.id === id);
  
  if (leadIndex === -1) return null;
  
  serverLeads[leadIndex].status = newStatus;
  return serverLeads[leadIndex];
}

/**
 * Get all installers (server-safe, no localStorage)
 */
export function getServerInstallers(): Installer[] {
  return serverInstallers;
}

/**
 * Get installer by ID (server-safe, no localStorage)
 */
export function getServerInstallerById(id: string): Installer | undefined {
  return serverInstallers.find((installer) => installer.id === id);
}

/**
 * Get all installer applications (server-safe, no localStorage)
 */
export function getServerInstallerApplications(): InstallerApplication[] {
  return serverApplications;
}

/**
 * Create installer application (server-safe, no localStorage)
 */
export function createServerInstallerApplication(input: {
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
}): InstallerApplication {
  const newId = (serverApplications.length + 1).toString();
  
  const newApplication: InstallerApplication = {
    id: newId,
    ...input,
    status: "pending",
    submittedAt: new Date(),
  };
  
  serverApplications.push(newApplication);
  return newApplication;
}
