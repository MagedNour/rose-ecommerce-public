export const getCategories = async () => {
  try {
    const response = await fetch(process.env.API + "/categories");

    const payload: APIResponse<CategoriesResponse> = await response.json();

    return payload;
  } catch (error) {
    // throw the error message
    throw new Error((error as ErrorResponse).error);
  }
};
