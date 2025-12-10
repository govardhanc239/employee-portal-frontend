import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClock,
  FaCalendarAlt,
  FaClipboardList,
  FaUsers
} from "react-icons/fa";

import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);

  // TRUE only when this employee is an RM (has team members)
  const isRM = user?.team_count > 0;

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "240px",
        minHeight: "100vh",
        position: "fixed",
        top: "45px",
        left: 0,
        paddingTop: "70px"
      }}
    >
      <ul className="nav flex-column">

        {/* DASHBOARD */}
        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard"
            className="nav-link text-white d-flex align-items-center"
            style={({ isActive }) => ({
              background: isActive ? "#0d6efd" : "transparent",
              borderRadius: "6px",
              padding: "10px"
            })}
          >
            <FaHome className="me-2" /> Dashboard
          </NavLink>
        </li>

        {/* ATTENDANCE */}
        <li className="nav-item mb-2">
          <NavLink
            to="/attendance"
            className="nav-link text-white d-flex align-items-center"
            style={({ isActive }) => ({
              background: isActive ? "#0d6efd" : "transparent",
              borderRadius: "6px",
              padding: "10px"
            })}
          >
            <FaClock className="me-2" /> Attendance
          </NavLink>
        </li>

        {/* LEAVES */}
        <li className="nav-item mb-2">
          <NavLink
            to="/leaves"
            className="nav-link text-white d-flex align-items-center"
            style={({ isActive }) => ({
              background: isActive ? "#0d6efd" : "transparent",
              borderRadius: "6px",
              padding: "10px"
            })}
          >
            <FaCalendarAlt className="me-2" /> Leaves
          </NavLink>
        </li>

        {/* TIMESHEET */}
        <li className="nav-item mb-2">
          <NavLink
            to="/timesheet"
            className="nav-link text-white d-flex align-items-center"
            style={({ isActive }) => ({
              background: isActive ? "#0d6efd" : "transparent",
              borderRadius: "6px",
              padding: "10px"
            })}
          >
            <FaClipboardList className="me-2" /> Timesheet
          </NavLink>
        </li>

        {/* TEAM — only if user is RM */}
        {isRM && (
          <li className="nav-item mb-2">
            <NavLink
              to="/team"
              className="nav-link text-white d-flex align-items-center"
              style={({ isActive }) => ({
                background: isActive ? "#0d6efd" : "transparent",
                borderRadius: "6px",
                padding: "10px"
              })}
            >
              <FaUsers className="me-2" /> Team ({user.team_count})
            </NavLink>
          </li>
        )}

        <li className="nav-item mb-2">
  <NavLink to="/ai" className="nav-link text-white">
    🤖 AI Assistant
  </NavLink>
</li>


      </ul>
    </div>
  );
};

export default Sidebar;
