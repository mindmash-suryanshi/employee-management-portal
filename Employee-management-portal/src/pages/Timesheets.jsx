import { useState } from "react";

import useTimesheets from "../hooks/useTimesheets";
import TimesheetTable from "../components/Timesheets/TimesheetTable";

import {
  AccessTimeOutlined,
  PendingActionsOutlined,
  CheckCircleOutlined,
  CancelOutlined,
} from "@mui/icons-material";

import "../styles/Timesheet.css";

const Timesheets = () => {
  const { timesheets, loading, error } = useTimesheets();

  const [selectedStatus, setSelectedStatus] = useState("All");

  const totalTimesheets = timesheets.length;

  const pendingTimesheets = timesheets.filter(
    (timesheet) => timesheet.status === "Pending",
  ).length;

  const approvedTimesheets = timesheets.filter(
    (timesheet) => timesheet.status === "Approved",
  ).length;

  const rejectedTimesheets = timesheets.filter(
    (timesheet) => timesheet.status === "Rejected",
  ).length;

  const filteredTimesheets =
    selectedStatus === "All"
      ? timesheets
      : timesheets.filter((timesheet) => timesheet.status === selectedStatus);

  const handleApprove = (timesheetId) => {
    console.log("Approve timesheet:", timesheetId);
  };

  const handleReject = (timesheetId) => {
    console.log("Reject timesheet:", timesheetId);
  };

  if (loading) {
    return (
      <div className="timesheets-page">
        <p>Loading timesheets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="timesheets-page">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="timesheets-page">
      <div className="timesheets-header">
        <div>
          <h1>Timesheets</h1>
          <p>Manage employee timesheets and approvals.</p>
        </div>

        <button type="button" className="add-timesheet-button">
          <AccessTimeOutlined />
          Add Timesheet
        </button>
      </div>

      <div className="timesheet-stat-cards">
        <div className="timesheet-stat-card">
          <div className="timesheet-stat-icon">
            <AccessTimeOutlined />
          </div>

          <div>
            <p>Total Timesheets</p>
            <h2>{totalTimesheets}</h2>
          </div>
        </div>

        <div className="timesheet-stat-card">
          <div className="timesheet-stat-icon">
            <PendingActionsOutlined />
          </div>

          <div>
            <p>Pending</p>
            <h2>{pendingTimesheets}</h2>
          </div>
        </div>

        <div className="timesheet-stat-card">
          <div className="timesheet-stat-icon">
            <CheckCircleOutlined />
          </div>

          <div>
            <p>Approved</p>
            <h2>{approvedTimesheets}</h2>
          </div>
        </div>

        <div className="timesheet-stat-card">
          <div className="timesheet-stat-icon">
            <CancelOutlined />
          </div>

          <div>
            <p>Rejected</p>
            <h2>{rejectedTimesheets}</h2>
          </div>
        </div>
      </div>

      <div className="timesheets-list-header">
        <div>
          <h2>Timesheet List</h2>
          <p>{filteredTimesheets.length} timesheets found</p>
        </div>

        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
          className="timesheet-status-filter"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <TimesheetTable
        timesheets={filteredTimesheets}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default Timesheets;
