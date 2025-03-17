import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Import CSS

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch Pending Events from Backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/events", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // 🔹 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard-container">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>Pending Events</li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <h1>Pending Event Approvals</h1>
        {events.length === 0 ? (
          <p>No pending events.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Organizer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>{event.organizer}</td>
                  <td>{event.status}</td>
                  <td>
                    <button onClick={() => updateEventStatus(event._id, "approved")}>Approve</button>
                    <button onClick={() => updateEventStatus(event._id, "rejected")}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

// 🔹 Approve/Reject Event Function
const updateEventStatus = async (eventId, status) => {
  try {
    const response = await fetch(`http://localhost:5000/api/admin/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`, 
      },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      alert(`Event ${status} successfully!`);
      window.location.reload(); // Refresh page
    }
  } catch (error) {
    console.error("❌ Error updating event:", error);
  }
};

export default AdminDashboard;
