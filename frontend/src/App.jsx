import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import LoginChoice from "./components/login/LoginChoice";
import Login from "./components/login/Login";
import AdminLogin from "./components/admin/AdminLogin";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginChoice />} />
        <Route path="/login/student" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
