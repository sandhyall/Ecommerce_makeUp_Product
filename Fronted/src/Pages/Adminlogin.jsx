import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URLES;

const Adminlogin = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/login`, login);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage(res.data.msg);
        setError("");
        navigate("/admin");
      } else {
        setError(res.data.msg || "Login failed");
        setMessage("");
      }

      setLogin({ email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.msg || "Login Failed");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={login.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Adminlogin;
