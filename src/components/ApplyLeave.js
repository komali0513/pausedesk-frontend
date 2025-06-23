// src/components/ApplyLeave.js
import React, { useState } from 'react';
import axios from 'axios';
import './ApplyLeave.css'; // ✅ Import the CSS

const ApplyLeave = ({ facultyId }) => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leaveData = {
      faculty_id: facultyId,
      leave_type: leaveType,
      start_date: startDate,
      end_date: endDate,
      reason,
    };

    try {
      const response = await axios.post('https://pausedesk.byethost18.com/apply_leave.php', leaveData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data?.message) {
        setMessage('✅ ' + response.data.message);
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setReason('');
      } else {
        setMessage('❌ ' + (response.data.error || 'Unexpected error'));
      }
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.error || 'Network error'));
    }
  };

  return (
    <div className="apply-leave-container">
      <h2>📝 Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="apply-leave-form">
        <div className="form-group">
          <label>Leave Type</label>
          <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="Casual">Casual</option>
            <option value="Sick">Sick</option>
            <option value="On-Duty">On-Duty</option>
          </select>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Reason</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default ApplyLeave;
