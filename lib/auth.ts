// Authentication and Authorization Layer
// This file provides auth types and authorization helpers for the marketplace.
// FUTURE: Replace mock user helpers with real auth provider (NextAuth, Clerk, etc.)

import { isBrowser } from "./browser";

// ============================================
// AUTH TYPES
// ============================================

/**
 * User roles in the marketplace
 */
export type UserRole = "homeowner" | "installer" | "admin";

/**
 * Demo role type for demo mode
 */
export type DemoRole = "none" | "homeowner" | "installer" | "admin";

/**
 * Authenticated user type
 * FUTURE: This will be populated by real auth provider
 */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  installerId?: string; // Only present for installer role
}

/**
 * Lead type for authorization checks
 */
export interface LeadForAuth {
  id: string;
  status: string;
  matchedInstallerIds?: string[];
  homeownerEmail: string;
}

// ============================================
// DEMO MODE CONFIGURATION
// ============================================

/**
 * DEMO AUTH MODE - FOR DEVELOPMENT AND DEMO ONLY
 * 
 * ⚠️ CRITICAL: Set this to false before production deployment ⚠️
 * 
 * WARNING: This is demo-only functionality. Replace with real auth before production.
 * Client-side role switching is never secure. Real auth must validate roles server-side.
 * 
 * Before production:
 * 1. Set DEMO_AUTH_ENABLED to false
 * 2. Implement real authentication provider (NextAuth, Clerk, Supabase Auth, etc.)
 * 3. Replace getMockCurrentUser() with real session management
 * 4. Add server-side role validation in all API routes
 * 5. Remove DemoRoleSwitcher component from layout
 * 
 * Set to true to enable demo mode for development/testing.
 * Set to false before production deployment.
 */
export const DEMO_AUTH_ENABLED = true;

// LocalStorage key for demo role
const DEMO_ROLE_KEY = "ecohomepalace_demo_role";

// ============================================
// DEMO MODE HELPERS
// ============================================

/**
 * Get the current demo role from localStorage
 * This is demo-only. Replace with real auth before production.
 */
export function getDemoRole(): DemoRole {
  if (!isBrowser()) return "none";
  if (!DEMO_AUTH_ENABLED) return "none";
  
  try {
    const stored = window.localStorage.getItem(DEMO_ROLE_KEY);
    return (stored as DemoRole) || "none";
  } catch (error) {
    console.error("Error reading demo role:", error);
    return "none";
  }
}

/**
 * Set the current demo role in localStorage
 * This is demo-only. Replace with real auth before production.
 */
export function setDemoRole(role: DemoRole): void {
  if (!isBrowser()) return;
  if (!DEMO_AUTH_ENABLED) return;
  
  try {
    window.localStorage.setItem(DEMO_ROLE_KEY, role);
  } catch (error) {
    console.error("Error setting demo role:", error);
  }
}

/**
 * Clear the demo role from localStorage
 * This is demo-only. Replace with real auth before production.
 */
export function clearDemoRole(): void {
  if (!isBrowser()) return;
  
  try {
    window.localStorage.removeItem(DEMO_ROLE_KEY);
  } catch (error) {
    console.error("Error clearing demo role:", error);
  }
}

/**
 * Get demo user by role
 * This is demo-only. Replace with real auth before production.
 */
export function getDemoUserByRole(role: DemoRole): AuthUser | null {
  switch (role) {
    case "admin":
      return getMockAdminUser();
    case "installer":
      return getMockInstallerUser();
    case "homeowner":
      return getMockHomeownerUser();
    case "none":
    default:
      return null;
  }
}

// ============================================
// MOCK USER HELPERS
// ============================================

/**
 * Get mock current user for development
 * FUTURE: Replace with real auth session
 * 
 * When demo mode is enabled, returns the selected demo user.
 * When demo mode is disabled, returns null (no authenticated user).
 */
export function getMockCurrentUser(): AuthUser | null {
  // Demo mode: return selected demo user
  if (DEMO_AUTH_ENABLED) {
    const demoRole = getDemoRole();
    return getDemoUserByRole(demoRole);
  }
  
  // Production mode: return null (no authenticated user)
  return null;
}

/**
 * Mock admin user
 */
export function getMockAdminUser(): AuthUser {
  return {
    id: "admin-1",
    name: "Platform Admin",
    email: "admin@ecohomepalace.com",
    role: "admin",
  };
}

/**
 * Mock installer user
 */
export function getMockInstallerUser(): AuthUser {
  return {
    id: "installer-1",
    name: "Jan de Vries",
    email: "jan@greenenergy.nl",
    role: "installer",
    installerId: "1", // Matches Green Energy Solutions
  };
}

/**
 * Mock homeowner user
 */
export function getMockHomeownerUser(): AuthUser {
  return {
    id: "homeowner-1",
    name: "Peter Jansen",
    email: "peter.jansen@email.com",
    role: "homeowner",
  };
}

// ============================================
// AUTHORIZATION HELPERS
// ============================================

/**
 * Check if user can access admin pages
 * FUTURE: Add additional checks for specific admin permissions
 */
export function canAccessAdmin(user: AuthUser | null): boolean {
  if (!user) return false;
  return user.role === "admin";
}

/**
 * Check if user can access installer dashboard
 * FUTURE: Verify installer account is active and approved
 */
export function canAccessInstallerDashboard(user: AuthUser | null, installerId?: string): boolean {
  if (!user) return false;
  if (user.role !== "installer") return false;
  if (installerId && user.installerId !== installerId) return false;
  return true;
}

/**
 * Check if user can manage a lead (admin or matched installer)
 * FUTURE: Add more granular permissions
 */
export function canManageLead(user: AuthUser | null, lead?: LeadForAuth): boolean {
  if (!user) return false;
  
  // Admin can manage all leads
  if (user.role === "admin") return true;
  
  // Installer can manage leads matched to them
  if (user.role === "installer" && lead && user.installerId) {
    return lead.matchedInstallerIds?.includes(user.installerId) || false;
  }
  
  return false;
}

/**
 * Check if user can accept a lead
 * FUTURE: Add capacity checks, payment verification
 */
export function canAcceptLead(user: AuthUser | null, lead?: LeadForAuth): boolean {
  if (!user) return false;
  
  // Only installers can accept leads
  if (user.role !== "installer") return false;
  
  // Must have installerId
  if (!user.installerId) return false;
  
  // Lead must be in acceptible state
  if (lead && !["new", "viewed"].includes(lead.status)) return false;
  
  return true;
}

/**
 * Check if user can view lead contact details
 * FUTURE: Add audit logging for contact detail access
 */
export function canViewLeadContact(user: AuthUser | null, lead?: LeadForAuth): boolean {
  if (!user) return false;
  
  // Admin can always view contact details
  if (user.role === "admin") return true;
  
  // Installer can view contact details if lead is accepted and matched to them
  if (user.role === "installer" && lead && user.installerId) {
    const isMatched = lead.matchedInstallerIds?.includes(user.installerId) || false;
    const isAccepted = lead.status === "accepted";
    return isMatched && isAccepted;
  }
  
  // Homeowner can view their own lead details (future feature)
  if (user.role === "homeowner" && lead) {
    return user.email === lead.homeownerEmail;
  }
  
  return false;
}

// ============================================
// FUTURE MIDDLEWARE BLUEPRINT
// ============================================

/**
 * Route Protection Blueprint
 * FUTURE: Implement these as Next.js middleware or route guards
 * 
 * /admin/* routes:
 * - Require authenticated user
 * - Require admin role
 * - Log admin access for audit trail
 * 
 * /installer-dashboard route:
 * - Require authenticated user
 * - Require installer role
 * - Verify installer account is active and approved
 * - Check installer capacity before showing leads
 * 
 * /installers/apply route:
 * - Allow unauthenticated access (public application)
 * - Rate limit to prevent spam
 * 
 * Lead contact details:
 * - Require authenticated user
 * - Verify user is admin or matched installer with accepted lead
 * - Log contact detail access for audit trail
 * 
 * API routes:
 * - Require authenticated user (except public endpoints)
 * - Validate user role server-side (never trust client claims)
 * - Check resource ownership (e.g., installer can only update their own leads)
 * - Add rate limiting to prevent abuse
 * - Validate input data server-side
 * 
 * Lead acceptance:
 * - Verify installer has sufficient capacity
 * - Verify payment status (if applicable)
 * - Check lead is still available
 * - Log acceptance for audit trail
 * 
 * Lead status updates:
 * - Only admin can update to certain statuses
 * - Installers can only accept/decline leads matched to them
 * - Validate status transitions are valid
 * 
 * Installer application:
 * - Rate limit submissions
 * - Validate required fields
 * - Check for duplicate applications
 * - Log submission for audit trail
 */
