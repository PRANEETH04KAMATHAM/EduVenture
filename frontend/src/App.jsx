import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import LoginChoice from "./components/login/LoginChoice";
import Login from "./components/login/Login";
import AdminLogin from "./components/admin/AdminLogin";
import Register from "./components/register/Register";
import Dashboard from "./components/student/Dashboard";
import CreateEvent from "./components/student/CreateEvent";
import MyEvents from "./components/student/MyEvents";
import Donate from "./components/student/Donate";
import Profile from "./components/student/Profile";
import StudentHome from "./components/student/StudentHome"; 
import AdminDashboard from "./components/admin/AdminDashboard";
import EventDetails from "./components/events/EventDetails";
import Events from "./components/events/Events";
import PaymentVerification from "./components/admin/PaymentVerification";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginChoice />} />
        <Route path="/login/student" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        
        {/* Nested Routes Inside Dashboard */}
        <Route path="/student/dashboard" element={<Dashboard />}>
          <Route index element={<h2>Welcome to your Dashboard</h2>} />
          <Route index element={<StudentHome />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="my-events" element={<MyEvents />} />
          
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* ✅ Redirect Donate to Events Page */}

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/student/dashboard/create-event" element={<CreateEvent />} />

        <Route path="/student/my-events" element={<MyEvents />} />  {/* ✅ Add This */}

        <Route path="/events/:eventId" element={<EventDetails />} />

        <Route path="/donate/:eventId" element={<Donate />} />

        <Route path="/events" element={<Events />} />

        <Route path="/admin/verify-payments" element={<PaymentVerification />} />

      </Routes>
    </div>
  );
}

export default App;
