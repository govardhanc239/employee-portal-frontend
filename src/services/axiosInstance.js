import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 15000
});

// Request Interceptor → Attach JWT token
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor → Handle 401 (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
