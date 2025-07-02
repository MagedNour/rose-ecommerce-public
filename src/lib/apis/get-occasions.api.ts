export const getOccasions = async () => {
  try {
    const response = await fetch(process.env.API + "/occasions");

    const payload: APIResponse<OccasionResponse> = await response.json();

    return payload;
  } catch (error) {
    // throw the error message
    throw new Error((error as ErrorResponse).error);
  }
};
