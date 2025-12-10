import api from "../services/axiosInstance";

export const httpRequest = async ({ method, url, data = null, params = null }) => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (err) {
    // Normalize all errors in one place
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      "Something went wrong";

    throw new Error(message);
  }
};
