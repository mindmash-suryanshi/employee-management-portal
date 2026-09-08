const LeaveHistory = ({ leaves }) => {
  const historyLeaves = leaves.filter((leave) => leave.status !== "Pending");

  return (
    <div className="leave-section">
      <div className="leave-section-header">
        <div>
          <h2>Leave History</h2>
          <p>View previously processed employee leave requests.</p>
        </div>
      </div>

      <div className="leave-placeholder">
        {historyLeaves.length} processed leave requests
      </div>
    </div>
  );
};

export default LeaveHistory;
