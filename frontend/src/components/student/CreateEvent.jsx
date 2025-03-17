import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css"; // Import styles

const CreateEvent = () => {
  const student = JSON.parse(localStorage.getItem("student")) || {};
  const navigate = useNavigate();
  
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    venue: "",
    permissionLetter: null, // File upload
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, permissionLetter: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("venue", eventData.venue);
    formData.append("organizer", student.rollNo); // Save student's roll number
    formData.append("status", "pending"); // Default status
    formData.append("permissionLetter", eventData.permissionLetter);

    try {
      const response = await fetch("http://localhost:5000/api/student/create-event", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Event submitted successfully for admin approval!");
        navigate("/student/my-events"); // Redirect to My Events
      } else {
        alert("Failed to submit event.");
      }
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <div className="create-event-container">
      <h2>Request a New Event</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Event Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Event Description" onChange={handleChange} required></textarea>
        <input type="date" name="date" onChange={handleChange} required />
        <input type="text" name="venue" placeholder="Venue" onChange={handleChange} required />
        <input type="file" name="permissionLetter" onChange={handleFileChange} required />
        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
