// API Route: GET /api/leads/[id], PATCH /api/leads/[id]
// Placeholder for future backend integration
// Currently returns server-safe mock data (no localStorage)

import { NextResponse } from "next/server";
import { getServerLeadById, updateServerLeadStatus } from "@/lib/serverMockData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // FUTURE: Fetch lead from database with authentication
  // SECURITY: Require authenticated user
  // SECURITY: Admin can see all leads, installers see only matched leads, homeowners see own leads
  // SECURITY: Validate user role server-side (never trust client claims)
  // SECURITY: Check resource ownership before returning data
  const { id } = await params;
  const lead = getServerLeadById(id);
  
  if (!lead) {
    return NextResponse.json(
      { data: null, success: false, error: "Lead not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ data: lead, success: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // FUTURE: Update lead in database with authentication
  // SECURITY: Require authenticated user with appropriate role
  // SECURITY: Admin can update any lead status, installers can only accept/decline matched leads
  // SECURITY: Validate status transitions are valid
  // SECURITY: Check resource ownership before allowing update
  // SECURITY: Log status changes for audit trail
  try {
    const { id } = await params;
    const body = await request.json();
    const lead = updateServerLeadStatus(id, body.status || "new");
    
    if (!lead) {
      return NextResponse.json(
        { data: null, success: false, error: "Lead not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ data: lead, success: true });
  } catch (error) {
    return NextResponse.json(
      { data: null, success: false, error: "Failed to update lead" },
      { status: 400 }
    );
  }
}
