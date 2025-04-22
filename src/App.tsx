import React from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import AppLayout from "./layouts/AppLayout";
import AdminPrivateRoutes from "./utils/AdminPrivateRoutes";
import { EditBook } from "./pages/EditBook";
import { UsersListPage } from "./pages/UsersListPage";
import { MyBooksPage } from "./pages/MyBooksPage";

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
        <Route path="my-books" element={<MyBooksPage />} />

        <Route path="admin" element={<AdminPrivateRoutes />}>
          <Route index element={<AdminPage />} />
          <Route path="users" element={<UsersListPage />} />
          <Route path="edit-book/:bookId?" element={<EditBook />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
