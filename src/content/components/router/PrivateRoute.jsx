import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
function PrivateRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/access" />;
}

export default PrivateRoute;
