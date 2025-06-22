// src/components/HODDashboard.js
import React from 'react';
import PendingRequests from './PendingRequests';
import LogoutButton from './LogoutButton';
import './HODDashboard.css'; // ✅ Import CSS

const HODDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'hod') {
    return <p>Unauthorized. Please login.</p>;
  }

  return (
    <div className="hod-dashboard-container">
      <h2>🧑‍💼 HOD Dashboard</h2>
      <h2>Welcome, {user.name}</h2>
      <PendingRequests /><br></br>
      <LogoutButton />
    </div>
  );
};

export default HODDashboard;
