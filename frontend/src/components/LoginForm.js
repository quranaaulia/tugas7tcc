import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/util";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, formData);
      localStorage.setItem("token", res.data.accessToken);
      alert("Login berhasil! Selamat datang di Naws Notes ✨");
      navigate("/notes");
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal. Periksa kembali username/password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-purple-200 flex flex-col items-center text-center space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-purple-700">
          ~~~~~~~~~~~~Login ke <span style={{ color: '#6a0572', fontWeight: '700' }}>Naws Notes~~~~~~~~~~~~</span>
        </h1>
        <p className="text-sm text-gray-600 max-w-xs">
          Masukkan username dan password kamu untuk melanjutkan!
        </p>

        <input
          type="text"
          name="username"
          placeholder="👤 Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-4/5 p-3 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 mx-auto"
        />
        <input
          type="password"
          name="password"
          placeholder="🔒 Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-4/5 p-3 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 mx-auto"
        />
        <button
          type="submit"
          className="w-4/5 bg-purple-600 text-white font-bold py-2 rounded-md hover:bg-purple-700 transition mx-auto"
        >
          Login
        </button>

        <p className="text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Daftar di sini
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
