import React, { useState } from "react";
import axios from "axios";
import './HODLogin.css';

const HODLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/pausedesk-backend/login_hod.php", {
        email,
        password,
      });

      if (res.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/hod-dashboard";
      } else {
        alert(res.data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ Network or server error");
    }
  };

  return (
    <div className="hod-login-container">
      <div className="hod-login-card">
        <h2>HOD LOGIN</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default HODLogin;
