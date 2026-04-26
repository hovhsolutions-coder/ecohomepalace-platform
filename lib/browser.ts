// Browser Detection Helper
// Use this function to safely check if code is running in a browser environment
// before accessing browser-only APIs like localStorage, window, document, etc.

/**
 * Check if code is running in a browser environment
 * Returns true on client-side, false on server-side
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
