import React, { useState } from "react";
import TeamRegularizations from "./TeamRegularizations";
import TeamLeaves from "./TeamLeaves";

const Team = () => {
  const [tab, setTab] = useState("regularize");

  return (
    <div>
      <h2 className="fw-bold mb-4">Team Management</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">

        <li className="nav-item">
          <button
            className={`nav-link ${tab === "regularize" ? "active" : ""}`}
            onClick={() => setTab("regularize")}
          >
            Regularizations
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tab === "leaves" ? "active" : ""}`}
            onClick={() => setTab("leaves")}
          >
            Leave Requests
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tab === "members" ? "active" : ""}`}
            onClick={() => setTab("members")}
          >
            Members
          </button>
        </li>

      </ul>

      {/* Content */}
      {tab === "regularize" && <TeamRegularizations />}
      {tab === "leaves" && <TeamLeaves />}
      {tab === "members" && <div>Coming Soon…</div>}
    </div>
  );
};

export default Team;
