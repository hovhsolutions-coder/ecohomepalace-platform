// API Route: GET /api/installers
// Placeholder for future backend integration
// Currently returns server-safe mock data (no localStorage)

import { NextResponse } from "next/server";
import { getServerInstallers } from "@/lib/serverMockData";

export async function GET() {
  // FUTURE: Fetch installers from database with authentication
  // SECURITY: Require authenticated user
  // SECURITY: Admin can see all installers, homeowners see only approved installers
  // SECURITY: Validate user role server-side (never trust client claims)
  // SECURITY: Add rate limiting to prevent data scraping
  // SECURITY: Filter out sensitive installer information (email, phone) for public view
  const installers = getServerInstallers();
  return NextResponse.json({ data: installers, success: true });
}
