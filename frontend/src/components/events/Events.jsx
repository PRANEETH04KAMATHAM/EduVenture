import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("📩 Received Events:", data); // ✅ Log event data
        setEvents(data);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h2>Fundraising Events</h2>
      {events.length === 0 ? (
        <p>No fundraising events available.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Amount Raised:</strong> ₹{event.amountReceived || 0}</p>

            {/* ✅ Now Navigate to Event Details Instead of Forcing Donation */}
            <button className="view-details-btn" onClick={() => navigate(`/events/${event._id}`)}>
              View Details & Donate
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Events;
