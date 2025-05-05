import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import httpService from "@/services/http.service";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    console.log("username: ", username, " password ", password);
    // correctly getting the user name and password

    // Proxy to DummyJSON login endpoint
    const { data } = await httpService.post(
      "/auth/login",
      { username, password, expiresInMins: 30 },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    console.log("data:  ", data);
    // Correctly getting the user object

    const token = data.accessToken as string;

    cookies().set({
      name: "jwt",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 24 * 60,
    });

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    // Log the real error server-side for debugging
    console.error("[API /login] Error:", err.message ?? err);
    // Return a more helpful response to the client
    return NextResponse.json(
      { success: false, error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
