import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Donate.css";

const Donate = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState({ donorName: "", amount: "" });

  const handleChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!donation.donorName || !donation.amount || donation.amount <= 0) {
      alert("Please enter a valid name and donation amount.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/donate/${eventId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donation),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Donation successful! Thank you for your support.");
        navigate(`/events/${eventId}`); // Redirect back to event details
      } else {
        alert(`Failed to process donation: ${data.message}`);
      }
    } catch (error) {
      console.error("Error processing donation:", error);
    }
  };

  return (
    <div className="donate-container">
      <h2>Donate to Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="donorName" placeholder="Your Name" onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount (₹)" onChange={handleChange} required />
        <button type="submit">Donate Now</button>
      </form>
    </div>
  );
};

export default Donate;
