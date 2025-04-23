import React from "react";
import { auth } from "../lib/firebase";
import { checkIsAdmin } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");

    auth.signOut();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-gray-100 shadow-md flex justify-between items-center p-4 z-10">
      <div>
        <Link to="/" className="text-xl font-bold text-orange-500 hover:text-orange-600 transition">
          Bibliophile Cafe
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {checkIsAdmin() && (
          <>
            <Link
              to="/admin"
              className="text-orange-500 hover:text-orange-600 font-medium transition"
            >
              Admin Dashboard
            </Link>
            <Link
              to="/admin/users"
              className="text-orange-500 hover:text-orange-600 font-medium transition"
            >
              Users
            </Link>
            <Link
              to="/my-books"
              className="text-orange-500 hover:text-orange-600 font-medium transition"
            >
              My Books
            </Link>
          </>
        )}
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
