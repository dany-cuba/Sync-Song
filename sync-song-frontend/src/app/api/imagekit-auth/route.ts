// /app/api/imagekit-auth/route.ts
import { imagekit } from "@/lib/imagekit";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = imagekit.getAuthenticationParameters();
  return NextResponse.json(auth);
}
