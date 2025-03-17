import React, { useState } from "react";

const Profile = () => {
  const student = JSON.parse(localStorage.getItem("student")) || {};
  const [formData, setFormData] = useState({
    name: student.name || "",
    phone: student.phone || "",
    email: student.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    localStorage.setItem("student", JSON.stringify({ ...student, ...formData }));
    alert("Profile updated successfully!");
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      <label>Phone:</label>
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      <label>Email:</label>
      <input type="email" name="email" value={formData.email} disabled /> {/* Email should not be editable */}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Profile;
