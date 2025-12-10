import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance";
import Leaves from "../pages/Leaves";
import Timesheet from "../pages/Timesheet";
import Team from "../pages/Team";
import AIChat from "../pages/AIChat.jsx"

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Layout for Dashboard Area */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        {/* DEFAULT PAGE AFTER LOGIN → Dashboard */}
        <Route index element={<Navigate to="dashboard" />} />

        {/* Actual Sidebar Pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="leaves" element={<Leaves />} />
        <Route path="timesheet" element={<Timesheet />} />
        <Route path="team" element={<Team />} />
        <Route path="ai" element={<AIChat />} /> {/* <-- Add this line */}


      </Route>

      {/* Unknown routes → redirect */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRouter;
