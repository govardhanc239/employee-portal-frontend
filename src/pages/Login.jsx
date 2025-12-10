import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/auth/authThunk";
import { useNavigate } from "react-router-dom";
import GlobalLoader from "../components/GlobalLoader";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password })).then((res) => {
      if (res.payload?.success) {
    navigate("/dashboard");
}

    });
  };

  return (
    <div className="login-container">
      <GlobalLoader message="Authenticating user..." />

      <div className="login-left">
        <img
          src="https://cdni.iconscout.com/illustration/premium/preview/business-meeting-5530075-4619236.png"
          alt="Corporate Illustration"
          className="login-illustration"
        />
      </div>

      <div className="login-right d-flex justify-content-center align-items-center">
        <div className="login-card shadow-lg p-4">
          <h3 className="text-center mb-4 fw-bold">Employee Portal</h3>
          <p className="text-center text-secondary mb-4">Login to your account</p>

          {error && (
            <div className="alert alert-danger text-center py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100 btn-lg mt-3" type="submit">
              Login
            </button>
          </form>

          <p className="mt-3 text-center text-muted" style={{ fontSize: "14px" }}>
            © {new Date().getFullYear()} Your Company Name
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
