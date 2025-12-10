import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api/authApi";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await loginApi(email, password);

      // MUST return a standard structure
      return {
        success: true,
        token: res.token,
        user: res.user
      };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        success: false,
        message: err.response?.data?.message || "Login failed"
      });
    }
  }
);
