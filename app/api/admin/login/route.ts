import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@influencehub.agency";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin@2024";
// A static token — in production, use a signed JWT or rotate this via env var.
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "ih-admin-secret-token";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (
      email?.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase() ||
      password !== ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, token: ADMIN_TOKEN });
  } catch {
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
