import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "./auth";

import { ReactNode } from "react";

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const user = getUserFromStorage();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
