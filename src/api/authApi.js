import { httpRequest } from "./http";

export const loginApi = (email, password) => {
  return httpRequest({
    method: "post",
    url: "/auth/login",
    data: { email, password },
  });
};
