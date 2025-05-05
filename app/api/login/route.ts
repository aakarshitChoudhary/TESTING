import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import httpService from "@/services/http.service";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // 1 Proxy login to backend
    const { data } = await httpService.post(
      "/auth/login",
      { username, password, expiresInMins: 30 },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    const token = data.accessToken as string;

    // 3 Set HttpOnly cookie
    cookies().set("session_id", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 60,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // 4️ Forward backend errors directly when available
    if (err.response) {
      const { status, data } = err.response;
      return NextResponse.json(data, { status });
    }

    // 5️ Fallback for unexpected errors
    console.error("[API /login] Unexpected Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
