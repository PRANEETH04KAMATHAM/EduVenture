import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginChoice.css"; 

const LoginChoice = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate("/login/student"); 
  };

  const handleAdminLogin = () => {
    navigate("/admin/login"); 
  };

  return (
    <div className="login-choice-container">
      <h2>Login as</h2>
      <div className="login-buttons">
        <button onClick={handleStudentLogin}>Student</button>
        <button onClick={handleAdminLogin}>Admin</button>
      </div>
    </div>
  );
};

export default LoginChoice;