import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./auth";

import { ReactNode } from "react";

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const user = getUser();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
