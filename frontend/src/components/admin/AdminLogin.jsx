import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Import CSS

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "", // ✅ Changed from username to email
    password: "",
  });

  const navigate = useNavigate(); // ✅ Use React Router for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("adminToken", data.token); // ✅ Store admin token
        localStorage.setItem("admin", JSON.stringify(data.admin)); // ✅ Store admin details
        alert("Admin Login Successful!");
        navigate("/admin/dashboard"); // ✅ Redirect to Admin Dashboard
      } else {
        alert(`❌ Login Failed: ${data.message}`);
      }
    } catch (error) {
      alert("❌ Error: Unable to connect to server.");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
