import { NextRequest, NextResponse } from "next/server";
import { addApplication } from "@/lib/admin-store";

// ─── Types ────────────────────────────────────────────────────────────────────

type Platform = {
  platform: string;
  handle: string;
  followers: string;
  engagementRate: string;
};

type CategoryRate = {
  category: string;
  contentType: string;
  ratePerPost: string;
  currency: string;
};

type ApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  website: string;
  previousBrands: string;
  availableForCampaigns: boolean;
  availableFrom: string;
  platforms: Platform[];
  categoryRates: CategoryRate[];
};

// ─── POST /api/influencer-apply ───────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: ApplicationPayload = await req.json();

    // ── Basic server-side validation ──────────────────────────────────────────
    if (!body.fullName || !body.email || !body.location) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!body.platforms?.length || !body.categoryRates?.length) {
      return NextResponse.json(
        { success: false, error: "At least one platform and one rate are required." },
        { status: 400 }
      );
    }

    // ── Persist to in-memory store (visible in admin dashboard) ──────────────
    addApplication(body);

    return NextResponse.json(
      {
        success: true,
        message: "Application received. We'll be in touch within 2–3 business days.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[influencer-apply] Error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
