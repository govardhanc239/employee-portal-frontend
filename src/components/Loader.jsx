import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "rgba(255,255,255,0.8)",
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      {/* Bootstrap Spinner */}
      <div
        className="spinner-border text-primary"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      ></div>

      {/* Dynamic Loading Message */}
      <p className="mt-3 fs-5 text-secondary">{message}</p>
    </div>
  );
};

export default Loader;
