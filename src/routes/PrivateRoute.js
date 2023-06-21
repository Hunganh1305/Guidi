import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const innetary = useSelector((state) => state.innetary.itenary);
  return !user || !innetary ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
