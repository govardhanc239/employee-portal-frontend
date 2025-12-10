import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const GlobalLoader = ({ message }) => {
  const authLoading = useSelector((state) => state.auth.loading);
  const employeeLoading = useSelector((state) => state.employees?.loading);
  const attendanceLoading = useSelector((state) => state.attendance?.loading);

  const loading = authLoading || employeeLoading || attendanceLoading;

  if (!loading) return null;

  return <Loader message={message || "Please wait..."} />;
};

GlobalLoader.propTypes = {
  message: PropTypes.string,
};

export default GlobalLoader;
