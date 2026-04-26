"use client";

import { useState, useEffect } from "react";
import { LeadRequest, LeadStatus, Installer } from "@/lib/matching";
import {
  getLeads,
  getInstallers,
  updateLeadStatus,
} from "@/lib/marketplaceService";
import { getMockCurrentUser, canAccessAdmin, DEMO_AUTH_ENABLED } from "@/lib/auth";

export default function AdminMatchingView() {
  const [selectedLead, setSelectedLead] = useState<LeadRequest | null>(null);
  const [filterService, setFilterService] = useState<string>("all");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [leads, setLeads] = useState<LeadRequest[]>([]);
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [currentUser, setCurrentUser] = useState(getMockCurrentUser());

  useEffect(() => {
    setLeads(getLeads());
    setInstallers(getInstallers());
  }, []);

  // Authorization check
  if (!canAccessAdmin(currentUser)) {
    return (
      <main className="min-h-screen bg-[#020a05] text-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--gold-border)]/40 bg-[rgba(247,209,123,0.08)] mx-auto">
            <svg className="h-8 w-8 text-[var(--gold-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-white mb-3">Access restricted</h2>
          <p className="text-sm text-white/50 mb-6">
            This admin area requires platform administrator access. Please contact your platform administrator if you believe this is an error.
          </p>
          {DEMO_AUTH_ENABLED && (
            <p className="text-xs text-[var(--emerald-300)] mb-4">
              Switch demo role to Admin to preview this screen
            </p>
          )}
          <a
            href="/"
            className="gold-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
          >
            Return to home
          </a>
        </div>
      </main>
    );
  }

  const filteredLeads = leads.filter((lead) => {
    if (filterService !== "all" && lead.service !== filterService) return false;
    if (filterRegion !== "all" && lead.region !== filterRegion) return false;
    if (filterStatus !== "all" && lead.status !== filterStatus) return false;
    return true;
  });

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case "new":
        return "bg-[var(--emerald-300)]/20 text-[var(--emerald-300)]";
      case "reviewing":
        return "bg-blue-500/20 text-blue-400";
      case "matched":
        return "bg-purple-500/20 text-purple-400";
      case "sent":
        return "bg-orange-500/20 text-orange-400";
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
      case "reviewing":
        return "Under review";
      case "matched":
        return "Matched";
      case "sent":
        return "Sent to installer";
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

  const getMatchedInstallers = (lead: LeadRequest) => {
    if (!lead.matchedInstallerIds) return [];
    return installers.filter((installer) => lead.matchedInstallerIds?.includes(installer.id));
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus({ leadId, status: newStatus });
    setLeads(getLeads());
  };

  const services = Array.from(new Set(leads.map((l) => l.service)));
  const regions = Array.from(new Set(leads.map((l) => l.region)));
  const statuses = Array.from(new Set(leads.map((l) => l.status)));

  return (
    <main className="min-h-screen bg-[#020a05] text-white">
      <header className="border-b border-white/[0.06] bg-[#020a05]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium text-white">Admin Matching Overview</h1>
              <p className="text-sm text-white/50">Eco Home Palace Platform</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full border border-[var(--gold-border)]/40 bg-[rgba(247,209,123,0.08)] px-3 py-1 text-xs font-medium text-[var(--gold-300)]">
                Internal View
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex flex-wrap gap-4">
          <div>
            <label className="mb-1 block text-xs text-white/40">Service</label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-white focus:border-[var(--emerald-border)] focus:outline-none"
            >
              <option value="all">All services</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/40">Region</label>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-white focus:border-[var(--emerald-border)] focus:outline-none"
            >
              <option value="all">All regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/40">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-white focus:border-[var(--emerald-border)] focus:outline-none"
            >
              <option value="all">All statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {getStatusLabel(status as LeadStatus)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-xs text-white/40">Total leads</p>
            <p className="mt-1 text-2xl font-medium text-white">{leads.length}</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-xs text-white/40">New</p>
            <p className="mt-1 text-2xl font-medium text-[var(--emerald-300)]">
              {leads.filter((l) => l.status === "new").length}
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-xs text-white/40">Matched</p>
            <p className="mt-1 text-2xl font-medium text-purple-400">
              {leads.filter((l) => l.status === "matched").length}
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-xs text-white/40">Sent</p>
            <p className="mt-1 text-2xl font-medium text-orange-400">
              {leads.filter((l) => l.status === "sent").length}
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-xs text-white/40">Accepted</p>
            <p className="mt-1 text-2xl font-medium text-[var(--gold-300)]">
              {leads.filter((l) => l.status === "accepted").length}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="border-b border-white/[0.06] px-6 py-4">
                <h2 className="text-lg font-medium text-white">Homeowner Requests</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/40">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/40">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/40">Region</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/40">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/40">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/40">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-sm text-white/50">
                          No leads found matching your filters
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`cursor-pointer transition hover:bg-white/[0.04] ${
                            selectedLead?.id === lead.id ? "bg-white/[0.04]" : ""
                          }`}
                        >
                          <td className="px-6 py-4 text-sm text-white">{lead.id}</td>
                          <td className="px-6 py-4 text-sm text-white">{lead.serviceName}</td>
                          <td className="px-6 py-4 text-sm text-white/70">{lead.region}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusColor(lead.status)}`}
                            >
                              {getStatusLabel(lead.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-[var(--gold-300)]">€{lead.leadValue}</td>
                          <td className="px-6 py-4 text-sm text-white/50">
                            {lead.createdAt.toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {selectedLead ? (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="border-b border-white/[0.06] px-6 py-4">
                  <h2 className="text-lg font-medium text-white">Lead Details</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-white/40">Lead ID</p>
                    <p className="mt-1 text-sm text-white">{selectedLead.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Service</p>
                    <p className="mt-1 text-sm font-medium text-white">{selectedLead.serviceName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Homeowner</p>
                    <p className="mt-1 text-sm text-white">{selectedLead.homeownerName}</p>
                    <p className="text-xs text-white/50">{selectedLead.homeownerEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Location</p>
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
                  <div>
                    <p className="text-xs text-white/40">Lead value</p>
                    <p className="mt-1 text-2xl font-medium text-[var(--gold-300)]">
                      €{selectedLead.leadValue}
                    </p>
                  </div>
                  <div className="h-px bg-white/[0.06]" />
                  <div>
                    <p className="text-xs text-white/40">Current status</p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusColor(selectedLead.status)}`}
                    >
                      {getStatusLabel(selectedLead.status)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Matched installers</p>
                    {getMatchedInstallers(selectedLead).length > 0 ? (
                      <div className="mt-2 space-y-2">
                        {getMatchedInstallers(selectedLead).map((installer) => (
                          <div
                            key={installer.id}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                          >
                            <p className="text-sm font-medium text-white">{installer.companyName}</p>
                            <p className="text-xs text-white/50">{installer.region}</p>
                            <p className="text-xs text-[var(--emerald-300)]">
                              {installer.membershipTier} tier
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-white/50">No installers matched yet</p>
                    )}
                  </div>
                  <div className="h-px bg-white/[0.06]" />
                  <div>
                    <p className="text-xs text-white/40 mb-2">Update status</p>
                    <div className="space-y-2">
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleUpdateLeadStatus(selectedLead.id, status as LeadStatus)}
                          className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                            selectedLead.status === status
                              ? "border-[var(--emerald-border)] bg-[rgba(94,231,187,0.12)] text-[var(--emerald-300)]"
                              : "border-white/[0.06] bg-white/[0.02] text-white/70 hover:border-white/10"
                          }`}
                        >
                          {getStatusLabel(status as LeadStatus)}
                        </button>
                      ))}
                    </div>
                  </div>
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
