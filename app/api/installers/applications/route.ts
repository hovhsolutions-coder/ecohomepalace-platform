// API Route: GET /api/installers/applications, POST /api/installers/applications
// Placeholder for future backend integration
// Currently returns server-safe mock data (no localStorage)

import { NextResponse } from "next/server";
import { getServerInstallerApplications, createServerInstallerApplication } from "@/lib/serverMockData";

export async function GET() {
  // FUTURE: Fetch applications from database with authentication
  // SECURITY: Require authenticated admin user
  // SECURITY: Only admins can view all applications
  // SECURITY: Validate user role server-side (never trust client claims)
  // SECURITY: Add rate limiting to prevent data scraping
  const applications = getServerInstallerApplications();
  return NextResponse.json({ data: applications, success: true });
}

export async function POST(request: Request) {
  // FUTURE: Create application in database with authentication
  // SECURITY: Allow unauthenticated access for public application form
  // SECURITY: Rate limit submissions to prevent spam
  // SECURITY: Validate input data server-side
  // SECURITY: Check for duplicate applications (same email/company)
  // SECURITY: Add CAPTCHA for abuse prevention
  // SECURITY: Log application submission for audit trail
  try {
    const body = await request.json();
    const application = createServerInstallerApplication(body);
    return NextResponse.json({ data: application, success: true });
  } catch (error) {
    return NextResponse.json(
      { data: null, success: false, error: "Failed to create application" },
      { status: 400 }
    );
  }
}
