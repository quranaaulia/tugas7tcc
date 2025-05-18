import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/util";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/create-users`, formData);
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registrasi gagal. Coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-purple-200 flex flex-col items-center text-center space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-purple-700">
          ~~~~~~~~~~~Daftar ke <span style={{ color: '#6a0572', fontWeight: '700' }}>Naws Notes~~~~~~~~~~~~</span>
        </h1>
        <p className="text-sm text-gray-600 max-w-xs">
          Buat akun baru untuk mulai mencatat hari ini 📘
        </p>

        <input
          type="text"
          name="username"
          placeholder="👤 Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-4/5 p-3 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="email"
          name="email"
          placeholder="📧 Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-4/5 p-3 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          name="password"
          placeholder="🔒 Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-4/5 p-3 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="w-4/5 bg-purple-600 text-white font-bold py-2 rounded-md hover:bg-purple-700 transition"
        >
          Daftar
        </button>

        <p className="text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;