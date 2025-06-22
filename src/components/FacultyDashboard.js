import React from 'react';
import ApplyLeave from './ApplyLeave';
import LeaveHistory from './LeaveHistory';
import LogoutButton from './LogoutButton';
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'faculty') {
    return <p>Unauthorized. Please login.</p>;
  }

  return (
    <div className="faculty-dashboard-container">
      <h1>Welcome, {user.name}</h1>
      <ApplyLeave facultyId={user.id} />
      <LeaveHistory facultyId={user.id} />
      <div className="logout-container">
        <LogoutButton />
      </div>
    </div>
  );
};

export default FacultyDashboard;
