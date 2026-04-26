"use client";

import { useState, useEffect } from "react";
import { LeadRequest, LeadStatus, Installer } from "@/lib/matching";
import {
  getInstallerById,
  getLeadsForInstaller,
  updateLeadStatus,
} from "@/lib/marketplaceService";
import { MOCK_CURRENT_INSTALLER_ID } from "@/lib/mockMarketplaceData";
import { getMockCurrentUser, canAccessInstallerDashboard, canViewLeadContact, canAcceptLead, DEMO_AUTH_ENABLED } from "@/lib/auth";

export default function InstallerDashboard() {
  const [selectedLead, setSelectedLead] = useState<LeadRequest | null>(null);
  const [leads, setLeads] = useState<LeadRequest[]>([]);
  const [installer, setInstaller] = useState<Installer | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState(getMockCurrentUser());

  useEffect(() => {
    const currentInstaller = getInstallerById(MOCK_CURRENT_INSTALLER_ID);
    setInstaller(currentInstaller);
    if (currentInstaller) {
      setLeads(getLeadsForInstaller(currentInstaller.id));
    }
  }, []);

  // Authorization check
  if (!canAccessInstallerDashboard(currentUser, MOCK_CURRENT_INSTALLER_ID)) {
    return (
      <main className="min-h-screen bg-[#020a05] text-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--emerald-border)]/40 bg-[rgba(94,231,187,0.08)] mx-auto">
            <svg className="h-8 w-8 text-[var(--emerald-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-white mb-3">Access restricted</h2>
          <p className="text-sm text-white/50 mb-6">
            This installer dashboard requires verified installer access. Please complete your application or contact support if you believe this is an error.
          </p>
          {DEMO_AUTH_ENABLED && (
            <p className="text-xs text-[var(--emerald-300)] mb-4">
              Switch demo role to Installer to preview this dashboard
            </p>
          )}
          <a
            href="/installers"
            className="gold-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
          >
            View installer information
          </a>
        </div>
      </main>
    );
  }

  const overviewCards = [
    {
      label: "New suitable requests",
      value: leads.filter((l) => l.status === "new").length,
      color: "text-[var(--emerald-300)]",
    },
    {
      label: "Active leads",
      value: leads.filter((l) => ["new", "viewed", "accepted"].includes(l.status)).length,
      color: "text-white",
    },
    {
      label: "Accepted leads",
      value: leads.filter((l) => l.status === "accepted").length,
      color: "text-[var(--gold-300)]",
    },
    {
      label: "Estimated lead value",
      value: `€${leads
        .filter((l) => l.status === "accepted")
        .reduce((sum, l) => sum + (l.leadValue || 0), 0)}`,
      color: "text-white",
    },
  ];

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case "new":
        return "bg-[var(--emerald-300)]/20 text-[var(--emerald-300)]";
      case "viewed":
        return "bg-white/10 text-white/60";
      case "accepted":
        return "bg-[var(--gold-300)]/20 text-[var(--gold-300)]";
      case "declined":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-white/10 text-white/60";
    }
  };

  const getStatusLabel = (status: LeadStatus) => {
    switch (status) {
      case "new":
        return "New";
      case "viewed":
        return "Viewed";
      case "accepted":
        return "Accepted";
      case "declined":
        return "Declined";
      case "contacted":
        return "Contacted";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const acceptLead = (leadId: string) => {
    updateLeadStatus({ leadId, status: "accepted" });
    setLeads(getLeadsForInstaller(installer?.id || ""));
  };

  const declineLead = (leadId: string) => {
    updateLeadStatus({ leadId, status: "declined" });
    setLeads(getLeadsForInstaller(installer?.id || ""));
    setSelectedLead(null);
  };

  return (
    <main className="min-h-screen bg-[#020a05] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#020a05]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium text-white">{installer?.companyName || "Installer Dashboard"}</h1>
              <p className="text-sm text-white/50">Installer Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full border border-[var(--emerald-border)]/40 bg-[rgba(94,231,187,0.08)] px-3 py-1 text-xs font-medium text-[var(--emerald-300)]">
                {installer?.membershipTier || "starter"} tier
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {overviewCards.map((card, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <p className="text-xs text-white/40">{card.label}</p>
              <p className={`mt-2 text-2xl font-medium ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Lead Inbox */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="border-b border-white/[0.06] px-6 py-4">
                <h2 className="text-lg font-medium text-white">Lead Inbox</h2>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {leads.length === 0 ? (
                  <div className="px-6 py-8 text-center text-sm text-white/50">
                    No suitable leads found for your services and region
                  </div>
                ) : (
                  leads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`cursor-pointer px-6 py-4 transition hover:bg-white/[0.04] ${
                      selectedLead?.id === lead.id ? "bg-white/[0.04]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-white">{lead.serviceName}</h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusColor(lead.status)}`}
                          >
                            {getStatusLabel(lead.status)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-white/50">
                          {lead.region} · {lead.propertyType} · {lead.timeline}
                        </p>
                        <p className="mt-1 text-xs text-white/40">{lead.whyItMatters}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[var(--gold-300)]">
                          €{lead.leadValue}
                        </p>
                        <p className="text-[10px] text-white/30">lead value</p>
                      </div>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Lead Detail Panel */}
          <div className="lg:col-span-1">
            {selectedLead ? (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="border-b border-white/[0.06] px-6 py-4">
                  <h2 className="text-lg font-medium text-white">Lead Details</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-white/40">Service</p>
                    <p className="mt-1 text-sm font-medium text-white">{selectedLead.serviceName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Why this lead is relevant</p>
                    <p className="mt-1 text-sm text-white/70">{selectedLead.whyItMatters}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Impact</p>
                    <p className="mt-1 text-sm text-[var(--gold-300)]">{selectedLead.impact}</p>
                  </div>
                  <div className="h-px bg-white/[0.06]" />
                  <div>
                    <p className="text-xs text-white/40">Region</p>
                    <p className="mt-1 text-sm text-white">{selectedLead.region}</p>
                    <p className="text-xs text-white/50">{selectedLead.postcode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Property</p>
                    <p className="mt-1 text-sm text-white">
                      {selectedLead.propertyType} · {selectedLead.ownership}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Timeline</p>
                    <p className="mt-1 text-sm text-white">{selectedLead.timeline}</p>
                  </div>
                  <div className="h-px bg-white/[0.06]" />
                  <div>
                    <p className="text-xs text-white/40">Lead value</p>
                    <p className="mt-1 text-2xl font-medium text-[var(--gold-300)]">
                      €{selectedLead.leadValue}
                    </p>
                  </div>

                  {/* Contact Details - Locked/Unlocked */}
                  {canViewLeadContact(currentUser, selectedLead) ? (
                    <div className="rounded-lg border border-[var(--emerald-border)]/30 bg-[rgba(94,231,187,0.04)] p-4">
                      <p className="text-xs text-white/40">Contact details</p>
                      <p className="mt-1 text-sm text-white">{selectedLead.homeownerName}</p>
                      <p className="text-sm text-white/70">{selectedLead.homeownerEmail}</p>
                      {selectedLead.homeownerPhone && (
                        <p className="text-sm text-white/70">{selectedLead.homeownerPhone}</p>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                      <p className="text-xs text-white/40">Contact details</p>
                      <p className="mt-1 text-sm text-white/50">
                        {selectedLead.homeownerName.substring(0, 3)}***@***.com
                      </p>
                      <p className="mt-2 text-[10px] text-white/30">
                        Accept lead to reveal contact details
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {(selectedLead.status === "new" || selectedLead.status === "viewed") && canAcceptLead(currentUser, selectedLead) ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => acceptLead(selectedLead.id)}
                        className="gold-button w-full rounded-full px-4 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        Accept lead (€{selectedLead.leadValue})
                      </button>
                      <button
                        onClick={() => declineLead(selectedLead.id)}
                        className="w-full rounded-full border border-white/10 px-4 py-3 text-sm text-white/50 transition hover:border-white/20 hover:text-white/70"
                      >
                        Decline lead
                      </button>
                    </div>
                  ) : selectedLead.status === "accepted" ? (
                    <div className="rounded-lg border border-[var(--emerald-border)]/30 bg-[rgba(94,231,187,0.04)] p-4">
                      <p className="text-xs text-[var(--emerald-300)]">Lead accepted</p>
                      <p className="mt-1 text-sm text-white/70">
                        Contact the homeowner to discuss their project
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
                <p className="text-sm text-white/50">Select a lead to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
