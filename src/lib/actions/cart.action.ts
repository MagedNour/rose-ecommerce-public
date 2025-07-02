"use server";

import { JSON_HEADER } from "../constants/api.constant";
import { revalidateTag } from "next/cache";
import getToken from "../utils/get-token";

// Add to cart action
export async function addToCartAction(fields: CartFields) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fields),
  });

  const payload: APIResponse<CartResponse> = await response.json();

  if (!("error" in payload)) {
    revalidateTag("cart");
  }

  return payload;
}

// Update cart quantity action
export async function updateCartQuantityAction(fields: CartFields) {
  // Get the token from the cookies
  const token = await getToken();

  const response = await fetch(`${process.env.API}/cart/${fields.product}`, {
    method: "PUT",
    headers: { ...JSON_HEADER, Authorization: `Bearer ${token}` },
    body: JSON.stringify({ quantity: fields.quantity }),
  });

  const payload: APIResponse<CartResponse> = await response.json();

  if (!("error" in payload)) {
    revalidateTag("cart");
  }

  return payload;
}

export async function removeCartItem({ productId }: { productId: string }) {
  // Get token
  const token = await getToken();

  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "DELETE",
    headers: { ...JSON_HEADER, Authorization: "Bearer " + token },
  });

  const payload = await response.json();

  if (!("error" in payload)) {
    revalidateTag("cart");
  }

  return payload;
}

export async function updateQuantity({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  // Get token
  const token = await getToken();

  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "PUT",
    headers: { ...JSON_HEADER, Authorization: "Bearer " + token },
    body: JSON.stringify({ quantity }),
  });

  const payload = await response.json();

  if (!("error" in payload)) {
    revalidateTag("cart");
  }

  return payload;
}
