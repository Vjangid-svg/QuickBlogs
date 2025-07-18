import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAppContext();

  if (loading) {
    return <div>Loading...</div>; // Avoid redirecting until token is checked
  }

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
