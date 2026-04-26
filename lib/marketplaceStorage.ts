// Marketplace Storage Adapter
// This file provides a storage abstraction layer.
// Currently uses localStorage for MVP persistence.
// FUTURE: Replace with API calls to backend database when ready.

import { LeadRequest, Installer } from "./matching";
import { InstallerApplication } from "./marketplaceData";
import { MOCK_INSTALLERS, MOCK_LEADS } from "./mockMarketplaceData";
import { isBrowser } from "./browser";

// LocalStorage keys
const STORAGE_KEYS = {
  LEADS: "ecohomepalace_leads",
  INSTALLERS: "ecohomepalace_installers",
  APPLICATIONS: "ecohomepalace_applications",
};

// ============================================
// STORAGE ADAPTER FUNCTIONS
// ============================================

/**
 * Generic localStorage read with fallback
 * FUTURE: Replace with API GET request
 */
function readFromStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Storage read error (${key}):`, error);
    return fallback;
  }
}

/**
 * Generic localStorage write
 * FUTURE: Replace with API POST/PUT request
 */
function writeToStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Storage write error (${key}):`, error);
  }
}

// ============================================
// LEAD STORAGE
// ============================================

/**
 * Read all leads from storage
 * FUTURE: GET /api/leads
 */
export function readLeads(): LeadRequest[] {
  return readFromStorage<LeadRequest[]>(STORAGE_KEYS.LEADS, MOCK_LEADS);
}

/**
 * Write all leads to storage
 * FUTURE: POST /api/leads or PUT /api/leads/:id
 */
export function writeLeads(leads: LeadRequest[]): void {
  writeToStorage(STORAGE_KEYS.LEADS, leads);
}

/**
 * Read a single lead by ID
 * FUTURE: GET /api/leads/:id
 */
export function readLeadById(id: string): LeadRequest | undefined {
  const leads = readLeads();
  return leads.find((lead) => lead.id === id);
}

// ============================================
// INSTALLER STORAGE
// ============================================

/**
 * Read all installers from storage
 * FUTURE: GET /api/installers
 */
export function readInstallers(): Installer[] {
  return readFromStorage<Installer[]>(STORAGE_KEYS.INSTALLERS, MOCK_INSTALLERS);
}

/**
 * Write all installers to storage
 * FUTURE: POST /api/installers or PUT /api/installers/:id
 */
export function writeInstallers(installers: Installer[]): void {
  writeToStorage(STORAGE_KEYS.INSTALLERS, installers);
}

/**
 * Read a single installer by ID
 * FUTURE: GET /api/installers/:id
 */
export function readInstallerById(id: string): Installer | undefined {
  const installers = readInstallers();
  return installers.find((installer) => installer.id === id);
}

// ============================================
// APPLICATION STORAGE
// ============================================

/**
 * Read all installer applications from storage
 * FUTURE: GET /api/installers/applications
 */
export function readApplications(): InstallerApplication[] {
  return readFromStorage<InstallerApplication[]>(STORAGE_KEYS.APPLICATIONS, []);
}

/**
 * Write all applications to storage
 * FUTURE: POST /api/installers/applications
 */
export function writeApplications(applications: InstallerApplication[]): void {
  writeToStorage(STORAGE_KEYS.APPLICATIONS, applications);
}

/**
 * Read a single application by ID
 * FUTURE: GET /api/installers/applications/:id
 */
export function readApplicationById(id: string): InstallerApplication | undefined {
  const applications = readApplications();
  return applications.find((app) => app.id === id);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize storage with mock data if empty
 * Call this on app startup to ensure data exists
 * FUTURE: Remove when backend is connected
 */
export function initializeStorage(): void {
  if (!isBrowser()) return;
  
  // Initialize leads if empty
  if (!window.localStorage.getItem(STORAGE_KEYS.LEADS)) {
    writeLeads(MOCK_LEADS);
  }
  
  // Initialize installers if empty
  if (!window.localStorage.getItem(STORAGE_KEYS.INSTALLERS)) {
    writeInstallers(MOCK_INSTALLERS);
  }
  
  // Initialize applications if empty
  if (!window.localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    writeApplications([]);
  }
}
