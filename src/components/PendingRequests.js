import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "hod") {
      alert("Please login as HOD");
      navigate("/hod-login");
    } else {
      fetchPendingRequests();
    }
    // eslint-disable-next-line
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get("http://localhost/pausedesk-backend/get_leaves.php?role=hod");
      if (Array.isArray(res.data)) {
        const pending = res.data.filter((req) => req.status === "Pending");
        setPendingRequests(pending);
      } else {
        console.error("Unexpected response:", res.data);
        alert("Unexpected response while loading leave requests");
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("Error fetching leave requests from the server.");
    }
  };

  const handleAction = async (id, status) => {
    const reason = prompt(`Enter reason for ${status}:`);
    if (!reason || reason.trim() === "") {
      alert("Reason is required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost/pausedesk-backend/update_leave_status.php", {
        id,
        status,
        hod_reason: reason,
        hod_email: user.email
      });

      if (res.data.message) {
        alert(res.data.message);
        fetchPendingRequests(); // Refresh the list
      } else {
        alert(res.data.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating leave status.");
    }
  };

  return (
    <div style={{ padding: "0px" }}>
      <h3 style={{ marginTop: "30px" }}>🕒 Pending Leave Requests</h3>
      {pendingRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Faculty Name</th>
              <th>Leave Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.faculty_name}</td>
                <td>{req.leave_type}</td>
                <td>{req.start_date}</td>
                <td>{req.end_date}</td>
                <td>{req.reason}</td>
                <td>
                  <button onClick={() => handleAction(req.id, "Approved")}>✅</button>
                  <button onClick={() => handleAction(req.id, "Rejected")}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingRequests;
