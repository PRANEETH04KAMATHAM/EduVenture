import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRDonation from "./QRDonation"; // Import QR Donation Component
import "./EventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Event not found or server error");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <p className="loading">Loading event details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!event) return <p className="error">Event not found.</p>;

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Amount Raised:</strong> ₹{event.amountReceived}</p>

      <h3>Donors List</h3>
      {event.donors.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <ul>
          {event.donors.map((donor, index) => (
            <li key={index}>
              {donor.donorName} donated ₹{donor.amount} on {new Date(donor.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}

      {/* QR Code for Donations */}
      <QRDonation eventId={eventId} />

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/events")}>
        ← Back to Events
      </button>
    </div>
  );
};

export default EventDetails;
