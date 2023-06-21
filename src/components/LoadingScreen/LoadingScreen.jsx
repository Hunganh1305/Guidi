import React from "react";
import "./LoadingScreen.scss";
import { CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};

export default LoadingScreen;
