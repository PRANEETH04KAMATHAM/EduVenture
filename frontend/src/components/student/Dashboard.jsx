import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const student = JSON.parse(localStorage.getItem("student")) || {}; // Get student details
  const { rollNo } = student; // Extract roll number

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation (Always Visible) */}
      <aside className="sidebar">
        <h2>Student Dashboard</h2>
        <ul>
          <li><Link to="/student/dashboard">Home</Link></li>
          <li><Link to="/student/dashboard/create-event">Create Event</Link></li>
          <li><Link to="/student/dashboard/my-events">My Events</Link></li>
          <li><Link to="/events">Donate</Link></li>  {/* ✅ Navigate to Events Page */}
          <li><Link to="/student/dashboard/profile">Profile</Link></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>  {/* ✅ Logout Button */}
        </ul>
      </aside>

      {/* Main Content (Changes Based on Route) */}
      <main className="dashboard-main">
        <h1>Welcome, {rollNo || "Student"}!</h1>
        <Outlet /> {/* ✅ Dynamically loads the selected section */}
      </main>
    </div>
  );
};

// ✅ Logout Functionality
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("student");
  window.location.href = "/";  // Redirect to home page
};

export default Dashboard;
