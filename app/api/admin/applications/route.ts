import { NextRequest, NextResponse } from "next/server";
import { getAllApplications, updateApplicationStatus, ApplicationStatus } from "@/lib/admin-store";
import { ADMIN_TOKEN } from "../login/route";

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get("x-admin-token");
  return auth === ADMIN_TOKEN;
}

// GET /api/admin/applications
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json({ success: true, data: getAllApplications() });
}

// PATCH /api/admin/applications  — body: { id, status }
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }
  const { id, status }: { id: string; status: ApplicationStatus } = await req.json();
  const updated = updateApplicationStatus(id, status);
  if (!updated) {
    return NextResponse.json({ success: false, error: "Application not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: updated });
}
