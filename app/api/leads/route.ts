// API Route: GET /api/leads, POST /api/leads
// Placeholder for future backend integration
// Currently returns server-safe mock data (no localStorage)

import { NextResponse } from "next/server";
import { getServerLeads, createServerLead } from "@/lib/serverMockData";

export async function GET() {
  // FUTURE: Fetch leads from database
  // SECURITY: Require authenticated user
  // SECURITY: Admin can see all leads, installers see only matched leads, homeowners see own leads
  // SECURITY: Validate user role server-side (never trust client claims)
  // SECURITY: Add rate limiting to prevent data scraping
  const leads = getServerLeads();
  return NextResponse.json({ data: leads, success: true });
}

export async function POST(request: Request) {
  // FUTURE: Create lead in database with authentication
  // SECURITY: Require authenticated homeowner user
  // SECURITY: Validate input data server-side
  // SECURITY: Rate limit to prevent spam
  // SECURITY: Add CAPTCHA for abuse prevention
  // SECURITY: Log lead creation for audit trail
  try {
    const body = await request.json();
    const lead = createServerLead(body);
    return NextResponse.json({ data: lead, success: true });
  } catch (error) {
    return NextResponse.json(
      { data: null, success: false, error: "Failed to create lead" },
      { status: 400 }
    );
  }
}
