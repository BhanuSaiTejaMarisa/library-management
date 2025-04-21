import React from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import AppLayout from "./layouts/AppLayout";
import AdminPrivateRoutes from "./utils/AdminPrivateRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <AppLayout />
          </PrivateRoutes>
        }
      >
        <Route index element={<HomePage />} />
        <Route index element={<HomePage />} />

        <Route path="admin" element={<AdminPrivateRoutes />}>
          {/* admin can access
users
books edit
can borrow books

*/}
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
