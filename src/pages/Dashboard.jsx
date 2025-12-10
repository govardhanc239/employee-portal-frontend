import React from "react";
import { FaUserCircle, FaBell, FaTasks } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClockInCard from "../components/ClockInCard"; // ← IMPORTANT

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log("user",user)
  return (
    <div>
      <h2 className="fw-bold mb-4">Dashboard Overview</h2>

      {/* ===== TOP PROFILE CARD ===== */}
      <div className="card shadow-sm p-4 mb-4" style={{ borderRadius: "12px" }}>
        <div className="d-flex align-items-center">
          <FaUserCircle size={70} className="text-primary me-4" />

          <div>
            <h4 className="fw-bold m-0">{user?.name || "Employee Name"}</h4>
            <p className="text-muted m-0">
              {user?.designation || "Software Engineer"} | Grade:{" "}
              <strong>{user?.grade || "M3"}</strong>
            </p>
            <p className="text-muted m-0">Department: {user?.department || "HR"}</p>
            <p className="text-muted m-0">Reporting Manager: {"Sandeep Kumar"}</p>
          </div>

          <div className="ms-auto">
            <button
              className="btn btn-outline-primary px-4"
              onClick={() => navigate("/profile")}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* ===== 3 CARD GRID ===== */}
      <div className="row g-4">

        {/* Card 1 - Projects */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3 h-100" style={{ borderRadius: "12px" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Projects Assigned</h5>
                <h3 className="fw-bold">5</h3>
              </div>
              <FaTasks size={40} className="text-info" />
            </div>
          </div>
        </div>

        {/* Card 2 - Announcements */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3 h-100" style={{ borderRadius: "12px" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Announcements</h5>
                <h3 className="fw-bold">2 New</h3>
              </div>
              <FaBell size={40} className="text-warning" />
            </div>
          </div>
        </div>

        {/* Card 3 - Clock In/Out with Live API */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3 h-100" style={{ borderRadius: "12px" }}>
            <ClockInCard /> {/* ← PLUG-IN FULL CLOCKIN UI */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
