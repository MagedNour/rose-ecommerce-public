import { SearchParams } from "../types/route-props";

export function searchParamsToString(params: SearchParams) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      searchParams.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((val) => searchParams.append(key, val));
    }
  });

  return searchParams;
}
