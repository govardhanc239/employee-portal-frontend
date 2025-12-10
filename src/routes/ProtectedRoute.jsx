import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { logout } from "../redux/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [expired, setExpired] = useState(false);

  // ------------------------------
  // CHECK TOKEN EXPIRY (side-effect)
  // ------------------------------
  useEffect(() => {
    if (!token) {
      setExpired(true);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        setExpired(true);
      }
    } catch (error) {
      setExpired(true);
    }
  }, [token]);

  // ------------------------------
  // LOGOUT if expired
  // ------------------------------
  useEffect(() => {
    if (expired) {
      dispatch(logout());
    }
  }, [expired, dispatch]);

  // ------------------------------
  // FINAL RENDER DECISIONS
  // ------------------------------
  if (!token || !user || expired) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
