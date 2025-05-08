import { NextResponse } from "next/server";
import httpService from "@/services/http.service";
import { cookies } from "next/headers";

export async function GET() {
  // 1️⃣ Verify JWT cookie exists
  const token = cookies().get("session_id")?.value;
  console.log("token *** => ", token); // gettting the undefined even when cookies are set after login
  if (!token) {
    // 401 if not authenticated
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2️⃣ Proxy to DummyJSON products endpoint with Authorization
  const { data } = await httpService.get<{ products: any[] }>("/products", {
    headers: { Authorization: `Bearer ${token}` },
  });

  // 3️⃣ Return the proxied data
  return NextResponse.json(data);
}
