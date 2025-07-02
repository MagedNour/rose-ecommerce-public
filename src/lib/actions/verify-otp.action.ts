"use server";

import { JSON_HEADER } from "../constants/api.constant";

export default async function verifyOtpAction(fields: VerifyOTPFiled) {
  const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
    method: "POST",
    headers: { ...JSON_HEADER },
    body: JSON.stringify(fields),
  });

  const payload: VerifyOTPResponse = await response.json();

  return payload;
}
