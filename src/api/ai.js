import { httpRequest } from "./http";

export const askAI = async (question) => {
  return httpRequest({
    method: "POST",
    url: "/ai/ask",
    data: { question }
  });
};
