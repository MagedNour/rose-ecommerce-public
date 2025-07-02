import { AUTH_COOKIE } from "@/lib/constants/auth.constant";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function fetchUserData() {
  const tokenCookies = cookies().get(AUTH_COOKIE)?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

  const apiUrl = `${process.env.API}/auth/profile-data`;

  const response = await fetch(apiUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
    cache: "no-store",
  });
  const payload: APIResponse<ProfileResponse> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.user;
}
