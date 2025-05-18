import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/LoginForm";
import Register from "./components/Register";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";

function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const refreshNotes = () => setRefresh(!refresh);
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Notes Page - hanya jika login */}
        <Route
          path="/notes"
          element={
            isAuthenticated ? (
              <>
                {/* Layout utama */}
                <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">
                  <div className="flex flex-col items-center justify-center p-4 mt-10">
                    <h1 className="welcome-title text-center text-2xl font-bold text-purple-700 mb-4">
                      🕊️ Welcome to <span className="text-purple-1000 font-extrabold">Naws Notes</span> 🕊️
                    </h1>
                    <NoteForm selectedNote={selectedNote} refreshNotes={refreshNotes} />
                    <NoteList onEdit={setSelectedNote} refresh={refresh} />
                  </div>
                </div>

                {/* Tombol Logout */}
                <div className="fixed bottom-4 left-4 z-50">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/login";
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 0a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h4a2 2 0 002-2v-1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Redirect root ke halaman sesuai status login */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/notes" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
