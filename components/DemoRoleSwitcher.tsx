"use client";

import { useState, useEffect } from "react";
import { getDemoRole, setDemoRole, DemoRole, DEMO_AUTH_ENABLED } from "@/lib/auth";

/**
 * Demo Role Switcher Component
 * 
 * ⚠️ CRITICAL: Remove this component before production deployment ⚠️
 * 
 * WARNING: This is demo-only functionality. Replace with real auth before production.
 * Client-side role switching is never secure. Real auth must validate roles server-side.
 * 
 * Before production:
 * 1. Remove this component from app/layout.tsx
 * 2. Set DEMO_AUTH_ENABLED to false in lib/auth.ts
 * 3. Implement real authentication provider
 * 4. Add server-side role validation
 * 
 * This component allows switching between mock roles during local development/demo.
 * Only renders when demo mode is enabled via DEMO_AUTH_ENABLED in lib/auth.ts.
 */
export default function DemoRoleSwitcher() {
  const [currentRole, setCurrentRole] = useState<DemoRole>("none");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (DEMO_AUTH_ENABLED) {
      setCurrentRole(getDemoRole());
    }
  }, []);

  const handleRoleChange = (newRole: DemoRole) => {
    setDemoRole(newRole);
    setCurrentRole(newRole);
    setIsOpen(false);
    // Reload page to refresh auth state in components
    window.location.reload();
  };

  // Don't render if demo mode is disabled
  if (!DEMO_AUTH_ENABLED) {
    return null;
  }

  const roleLabels: Record<DemoRole, string> = {
    none: "None",
    homeowner: "Homeowner",
    installer: "Installer",
    admin: "Admin",
  };

  const roleColors: Record<DemoRole, string> = {
    none: "text-white/50",
    homeowner: "text-[var(--emerald-300)]",
    installer: "text-[var(--gold-300)]",
    admin: "text-purple-400",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-lg border border-[var(--emerald-border)]/30 bg-[rgba(94,231,187,0.08)] px-3 py-2 text-xs backdrop-blur-sm transition hover:bg-[rgba(94,231,187,0.12)]"
        >
          <div className="h-2 w-2 rounded-full bg-[var(--emerald-300)] animate-pulse" />
          <span className="text-white/70">Demo mode</span>
          <span className={`font-medium ${roleColors[currentRole]}`}>
            {roleLabels[currentRole]}
          </span>
        </button>

        {/* Dropdown Panel */}
        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-48 rounded-lg border border-white/[0.1] bg-[#0a1f12]/95 backdrop-blur-md p-2 shadow-xl">
            <div className="mb-2 border-b border-white/[0.1] pb-2">
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Demo Role</p>
              <p className="text-[9px] text-[var(--emerald-300)] mt-1">
                Not production auth
              </p>
            </div>
            <div className="space-y-1">
              {(["none", "homeowner", "installer", "admin"] as DemoRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`w-full rounded px-2 py-1.5 text-left text-xs transition ${
                    currentRole === role
                      ? "bg-[var(--emerald-300)]/20 text-[var(--emerald-300)]"
                      : "text-white/60 hover:bg-white/[0.05] hover:text-white/80"
                  }`}
                >
                  {roleLabels[role]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
