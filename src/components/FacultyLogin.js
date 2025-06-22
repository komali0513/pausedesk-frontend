// src/components/FacultyLogin.js
import React, { useState } from "react";
import axios from "axios";
import "./FacultyLogin.css"; // ✅ Import the CSS

const FacultyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/pausedesk-backend/login_faculty.php", {
        email,
        password,
      });

      if (res.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/faculty-dashboard";
      } else {
        alert(res.data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ Network or server error");
    }
  };

  return (
    <div className="faculty-login-container">
      <div className="faculty-login-card">
        <h2>FACULTY LOGIN</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default FacultyLogin;
