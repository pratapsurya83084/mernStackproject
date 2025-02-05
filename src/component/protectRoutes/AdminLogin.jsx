import React from "react";
import { Navigate } from "react-router-dom";

const AdminLogin = ({ children }) => {
  // Check if token exists and email matches "admin@gmail.com"
  const token = localStorage.getItem("token");
  const userProfile = JSON.parse(localStorage.getItem("userProfile")); // Parse JSON

  const isAuthenticated =
    token && userProfile && userProfile.email === "admin11@gmail.com";

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AdminLogin;
