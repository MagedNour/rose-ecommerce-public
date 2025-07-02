"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";

export async function forgetAction(fields: { email: string }) {
  const response = await fetch(`${process.env.API}/auth/forgotPassword`, {
    method: "POST",
    headers: { ...JSON_HEADER },
    body: JSON.stringify(fields),
  });

  const payload: { message: string; info: string } = await response.json();
  return payload;
}
