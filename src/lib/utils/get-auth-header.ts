import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getAuthHeader(): Promise<HeadersInit> {
  const cookieStore = cookies();

  const tokenCookie =
    cookieStore.get("__Secure-next-auth.session-token")?.value || // production
    cookieStore.get("next-auth.session-token")?.value; // dev

  if (!tokenCookie) {
    console.warn("⚠️ No session token cookie found");
    return {};
  }

  try {
    const jwt = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    const accessToken = jwt?.token;

    if (!accessToken) {
      console.warn("⚠️ No access token inside JWT");
      return {};
    }

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } catch (error) {
    console.error("❌ Failed to decode token:", error);
    return {};
  }
}
