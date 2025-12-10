import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../redux/auth/authSlice"; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light px-4 shadow-sm fixed-top">
      <div className="d-flex align-items-center">
        <h4 className="m-0">Employee Portal</h4>
      </div>

      <div className="d-flex align-items-center">
        <span className="me-3 fw-semibold">{user?.name || "User"}</span>
        <FaUserCircle size={28} className="me-3" />

        {/* LOGOUT BUTTON */}
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
