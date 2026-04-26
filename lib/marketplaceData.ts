// Shared Marketplace Data Layer for Eco Home Palace MVP
// This provides a clean data layer that can be replaced with a real backend later

import {
  LeadRequest,
  LeadStatus,
  Installer,
  ServiceType,
  MembershipTier,
  PropertyType,
  Ownership,
  Timeline,
  calculateLeadPrice,
  rankInstallersForLead,
} from "./matching";
import { isBrowser } from "./browser";

// LocalStorage keys
const STORAGE_KEYS = {
  LEADS: "ecohomepalace_leads",
  INSTALLERS: "ecohomepalace_installers",
  INSTALLER_APPLICATIONS: "ecohomepalace_applications",
};

// ============================================
// MOCK INITIAL DATA
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

// ============================================
// INSTALLER APPLICATION TYPE
// ============================================

export interface InstallerApplication {
  id: string;
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
  status: "pending" | "approved" | "rejected";
  submittedAt: Date;
  reviewedAt?: Date;
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

function getFromStorage<T>(key: string, defaultValue: T): T {
  if (!isBrowser()) return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
  }
}

// ============================================
// LEAD MANAGEMENT
// ============================================

export function getLeads(): LeadRequest[] {
  return getFromStorage<LeadRequest[]>(STORAGE_KEYS.LEADS, MOCK_LEADS);
}

export function saveLeads(leads: LeadRequest[]): void {
  setToStorage(STORAGE_KEYS.LEADS, leads);
}

export function getLeadById(id: string): LeadRequest | undefined {
  const leads = getLeads();
  return leads.find((lead) => lead.id === id);
}

export function createLead(intakeData: {
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
  
  const serviceType = serviceMap[intakeData.serviceName] || "other";
  
  const newLead: LeadRequest = {
    id: newId,
    service: serviceType,
    serviceName: intakeData.serviceName,
    impact: intakeData.impact,
    whyItMatters: intakeData.whyItMatters,
    propertyType: intakeData.propertyType,
    ownership: intakeData.ownership,
    timeline: intakeData.timeline,
    postcode: intakeData.postcode,
    region: intakeData.region,
    homeownerName: intakeData.homeownerName,
    homeownerEmail: intakeData.homeownerEmail,
    homeownerPhone: intakeData.homeownerPhone,
    status: "new",
    createdAt: new Date(),
    leadValue: calculateLeadPrice({
      id: newId,
      service: serviceType,
      serviceName: intakeData.serviceName,
      impact: intakeData.impact,
      whyItMatters: intakeData.whyItMatters,
      propertyType: intakeData.propertyType,
      ownership: intakeData.ownership,
      timeline: intakeData.timeline,
      postcode: intakeData.postcode,
      region: intakeData.region,
      homeownerName: intakeData.homeownerName,
      homeownerEmail: intakeData.homeownerEmail,
      homeownerPhone: intakeData.homeownerPhone,
      status: "new",
      createdAt: new Date(),
    }),
  };
  
  leads.push(newLead);
  saveLeads(leads);
  
  return newLead;
}

export function updateLeadStatus(id: string, newStatus: LeadStatus): LeadRequest | null {
  const leads = getLeads();
  const leadIndex = leads.findIndex((lead) => lead.id === id);
  
  if (leadIndex === -1) return null;
  
  leads[leadIndex].status = newStatus;
  saveLeads(leads);
  
  return leads[leadIndex];
}

export function updateLeadMatchedInstallers(id: string, installerIds: string[]): LeadRequest | null {
  const leads = getLeads();
  const leadIndex = leads.findIndex((lead) => lead.id === id);
  
  if (leadIndex === -1) return null;
  
  leads[leadIndex].matchedInstallerIds = installerIds;
  saveLeads(leads);
  
  return leads[leadIndex];
}

// ============================================
// INSTALLER MANAGEMENT
// ============================================

export function getInstallers(): Installer[] {
  return getFromStorage<Installer[]>(STORAGE_KEYS.INSTALLERS, MOCK_INSTALLERS);
}

export function saveInstallers(installers: Installer[]): void {
  setToStorage(STORAGE_KEYS.INSTALLERS, installers);
}

export function getInstallerById(id: string): Installer | undefined {
  const installers = getInstallers();
  return installers.find((installer) => installer.id === id);
}

export function createInstallerFromApplication(application: InstallerApplication): Installer {
  const installers = getInstallers();
  const newId = (installers.length + 1).toString();
  
  // Map capacity string to number
  const capacityMap: Record<string, number> = {
    "1-3": 2,
    "4-8": 6,
    "9-15": 12,
    "16+": 18,
  };
  
  const newInstaller: Installer = {
    id: newId,
    companyName: application.companyName,
    contactPerson: application.contactPerson,
    email: application.email,
    phone: application.phone,
    services: application.services,
    mainPostcode: application.mainPostcode,
    serviceRadius: application.serviceRadius,
    region: application.region,
    monthlyCapacity: capacityMap[application.monthlyCapacity] || 5,
    isCertified: application.isCertified,
    hasInsurance: application.hasInsurance,
    yearsOfExperience: parseInt(application.yearsOfExperience) || 1,
    website: application.website,
    membershipTier: "starter", // Default tier for new installers
    qualityScore: 70, // Base score for new installers
    active: true,
    createdAt: new Date(),
  };
  
  installers.push(newInstaller);
  saveInstallers(installers);
  
  return newInstaller;
}

// ============================================
// INSTALLER APPLICATION MANAGEMENT
// ============================================

export function getInstallerApplications(): InstallerApplication[] {
  return getFromStorage<InstallerApplication[]>(STORAGE_KEYS.INSTALLER_APPLICATIONS, []);
}

export function saveInstallerApplications(applications: InstallerApplication[]): void {
  setToStorage(STORAGE_KEYS.INSTALLER_APPLICATIONS, applications);
}

export function createInstallerApplication(data: {
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
  const applications = getInstallerApplications();
  const newId = (applications.length + 1).toString();
  
  const newApplication: InstallerApplication = {
    id: newId,
    ...data,
    status: "pending",
    submittedAt: new Date(),
  };
  
  applications.push(newApplication);
  saveInstallerApplications(applications);
  
  return newApplication;
}

export function updateApplicationStatus(id: string, status: "approved" | "rejected"): InstallerApplication | null {
  const applications = getInstallerApplications();
  const appIndex = applications.findIndex((app) => app.id === id);
  
  if (appIndex === -1) return null;
  
  applications[appIndex].status = status;
  applications[appIndex].reviewedAt = new Date();
  saveInstallerApplications(applications);
  
  return applications[appIndex];
}

// ============================================
// MATCHING HELPERS
// ============================================

export function getMatchesForLead(leadId: string) {
  const lead = getLeadById(leadId);
  if (!lead) return [];
  
  const installers = getInstallers();
  return rankInstallersForLead(lead, installers);
}

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

export function getMatchScoreForLead(leadId: string, installerId: string): number {
  const lead = getLeadById(leadId);
  const installer = getInstallerById(installerId);
  
  if (!lead || !installer) return 0;
  
  const matches = rankInstallersForLead(lead, [installer]);
  const match = matches.find((m) => m.installerId === installerId);
  
  return match?.score || 0;
}

// ============================================
// MOCK CURRENT INSTALLER (for dashboard)
// ============================================

export const MOCK_CURRENT_INSTALLER_ID = "1"; // Green Energy Solutions

export function getCurrentInstaller(): Installer | undefined {
  return getInstallerById(MOCK_CURRENT_INSTALLER_ID);
}
