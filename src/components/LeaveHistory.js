// src/components/LeaveHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeaveHistory.css'; // Optional: for styling if needed

const LeaveHistory = ({ facultyId }) => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (facultyId) {
      const fetchLeaveHistory = async () => {
        try {
          const res = await axios.get(`https://pausedesk.infinityfreeapp.com/get_leaves.php?faculty_id=${facultyId}`);
          if (Array.isArray(res.data)) {
            setLeaves(res.data);
          } else {
            console.error('Unexpected response:', res.data);
          }
        } catch (error) {
          console.error('Error fetching leave history:', error);
        }
      };

      fetchLeaveHistory();
    }
  }, [facultyId]);

  return (
    <div className="leave-history-container">
      <h2>📜 Leave History</h2>
      {leaves.length === 0 ? (
        <p>No leave records found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Reason</th>
              <th>Status</th>
              <th>HOD Reason</th>
              <th>Applied At</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.leave_type}</td>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>{leave.hod_reason || '—'}</td>
                <td>{leave.applied_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveHistory;
