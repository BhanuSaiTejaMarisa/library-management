import React from "react";
import { checkIsAdmin } from "./auth";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoutes = () => {
  const isUserAdmin = checkIsAdmin();
  return isUserAdmin ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default AdminPrivateRoutes;
