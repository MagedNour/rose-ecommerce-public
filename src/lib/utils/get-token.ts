"use server";

import { getToken as nextAuthGetToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getToken() {
  try {
    const token = await nextAuthGetToken({
      req: {
        cookies: cookies(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any, // 👈 Workaround to satisfy TS – safe here
      secret: process.env.NEXTAUTH_SECRET!,
    });

    console.log("✅ Token successfully retrieved:", token);
    return token?.token ?? null;
  } catch (error) {
    console.error("❌ Error getting token:", error);
    return null;
  }
}
