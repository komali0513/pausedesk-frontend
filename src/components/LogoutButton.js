import React from 'react';
import './LogoutButton.css'; // ✅ Import the CSS

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/'; // Redirect to home or login
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
