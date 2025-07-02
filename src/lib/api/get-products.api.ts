"use server";

import { SearchParams } from "../types/route-props";
import AppError from "../utils/app.error";
import { searchParamsToString } from "../utils/handle-search-params";

const baseUrl = process.env.API;

export const getPopularProducts = async (endPoint: string) => {
  try {
    const response = await fetch(baseUrl + endPoint);
    const payload: APIResponse<ProductResponse> = await response.json();
    if ("message" in payload && payload.message === "success") {
      return payload;
    }
    return null;
  } catch (error) {
    console.error("error", error);
  }
};

export async function getProducts(searchParams: SearchParams = {}) {
  const response = await fetch(
    `${process.env.API}/products?${searchParamsToString(searchParams).toString()}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new AppError(`Failed to fetch products: ${response.statusText}`, response.status);
  }

  const data: APIResponse<PaginatedResponse<Product[]>> = await response.json();

  if ("error" in data) {
    throw new AppError(
      typeof data.error === "string" ? data.error : "An unknown error occurred",
      response.status,
    );
  }
  return {
    products: data.products,
    metadata: data.metadata,
  };
}
