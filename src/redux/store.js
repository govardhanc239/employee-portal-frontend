import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
// import employeeReducer from "./employees/employeeSlice";
// import attendanceReducer from "./attendance/attendanceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // employees: employeeReducer,
    // attendance: attendanceReducer
  },
});
