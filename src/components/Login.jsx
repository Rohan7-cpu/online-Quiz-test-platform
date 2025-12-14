import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../config/Admin";
import {  saveToLocalStorage } from "../utils/localStorage";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const nav = useNavigate();

  const LoginSuccess = (e) => {
    e.preventDefault();

    if (email === "") {
      alert("Email cannot be empty");
      return;
    } 
    else if (name === "" || name.length < 10) {
      alert("Name cannot be empty or less than 10 characters");
      return;
    } 
    else if (/[0-9]/.test(name)) {
      alert("Name cannot have numbers");
      return;
    } 
    else if (password === "" || password.length < 10) {
      alert("Password cannot be empty or less than 10 characters");
      return;
    }

    //  ADMIN CREDENTIAL CHECK
    if (email === ADMIN.email && password === ADMIN.password) {
      saveToLocalStorage("is_logged_in", "true");
      alert("Login successful");
      nav("/create");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          onClick={LoginSuccess}
          className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
