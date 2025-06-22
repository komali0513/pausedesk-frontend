// src/components/HomePage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Don't forget to import CSS

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-heading">Welcome to pauseDesk</h1>
        <p className="home-subtitle">Please select your login role</p>

        <div>
          <button onClick={() => navigate("/faculty-login")} className="home-button">
            Faculty Login
          </button>
          <button onClick={() => navigate("/hod-login")} className="home-button">
            HOD Login
          </button>
        </div>
      </div>
      <div style={{ marginTop: "40px", textAlign: "center", fontSize: "14px", color: "#555" }}>
  <h3>🔐 Demo Credentials</h3>
  <p><strong>Faculty Logins:</strong>
   <b> 1.</b> Email: bob@example.com | Password: 12345  
  <b> 2.</b>Email: <code>alice@example.com</code> | Password: <code>12345</code><pre></pre>
  <strong>HOD Login: </strong>
   Email:hod@example.com | Password: <code>admin123</code></p>
</div>

    </div>
  );
};

export default HomePage;
