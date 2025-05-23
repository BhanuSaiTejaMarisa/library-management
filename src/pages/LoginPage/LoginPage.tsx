import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../api/users";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showSnackbar = useCustomSnackbar();

  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userEmail = userCredential.user.email;

      const { data: usersData } = await getUsers();

      const loggedInUser = usersData.find(
        (user: { email: string }) => user.email === userEmail
      );

      if (!loggedInUser) {
        throw new Error("User not found in mocked database");
      }

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      showSnackbar("Login successful");
      
      navigate("/");
    } catch (error) {
      showSnackbar("Invalid email or password", "error");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Log in to Bibliophile Cafe
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="mb-4 border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-orange-500 text-white px-6 py-2 rounded font-medium hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        onClick={handleLogin(email, password)}
      >
        Log in with email
      </button>
    </div>
  );
};

export default LoginPage;
