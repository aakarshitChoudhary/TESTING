import { NextResponse } from "next/server";
import httpService from "@/services/http.service";
import { cookies } from "next/headers";

export async function GET() {
  // 1️⃣ Verify JWT cookie exists
  const token = cookies().get("jwt")?.value;
  if (!token) {
    // 401 if not authenticated
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2️⃣ Proxy to DummyJSON qoutes endpoint with Authorization
  const { data } = await httpService.get<{ products: any[] }>("/quotes", {
    headers: { Authorization: `Bearer ${token}` },
  });

  // 3️⃣ Return the proxied data
  return NextResponse.json(data);
}
