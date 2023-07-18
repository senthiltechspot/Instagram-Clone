import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
const cookies = new Cookies();

const ProtectedRoute = ({ children }) => {
  let token = cookies.get("Token");
  let Token = localStorage.getItem("Token");
  if (!token && !Token) {
    return <Navigate to="/Auth" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProtectedRoute;
