import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ProtectedRoute = ({ children }) => {
  let token = cookies.get("Token");
  if (!token) {
    return <Navigate to="/Auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
