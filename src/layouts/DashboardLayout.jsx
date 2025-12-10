import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>

      {/* Top Navbar */}
      <Navbar />

      <div className="d-flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          style={{
            marginLeft: "240px",
            marginTop: "60px",
            padding: "20px",
            width: "100%",
            minHeight: "100vh",
            background: "#f7f9fc",
          }}
        >
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;
