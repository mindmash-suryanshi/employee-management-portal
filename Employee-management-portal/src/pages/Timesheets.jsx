import { useState } from "react";

import useTimesheets from "../hooks/useTimesheets";
import TimesheetTable from "../components/Timesheets/TimesheetTable";
import TimesheetForm from "../components/Timesheets/TimesheetForm";

import {
  updateTimesheetStatus,
  addTimesheet,
} from "../utils/timesheetsStorage";

import {
  AccessTimeOutlined,
  PendingActionsOutlined,
  CheckCircleOutlined,
  CancelOutlined,
} from "@mui/icons-material";

import "../styles/Timesheet.css";
import "../styles/TimesheetForm.css";

const Timesheets = () => {
  const { timesheets, setTimesheets, loading, error } = useTimesheets();

  const [selectedStatus, setSelectedStatus] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    week: "",
  });

  const [saving, setSaving] = useState(false);

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
    const updatedTimesheets = updateTimesheetStatus(timesheetId, "Approved");

    setTimesheets(updatedTimesheets);
  };

  const handleReject = (timesheetId) => {
    const updatedTimesheets = updateTimesheetStatus(timesheetId, "Rejected");

    setTimesheets(updatedTimesheets);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleAddTimesheet = (event) => {
    event.preventDefault();

    setSaving(true);

    const newTimesheet = {
      employeeId: Number(formData.employeeId),
      week: formData.week,
      status: "Pending",
    };

    const updatedTimesheets = addTimesheet(newTimesheet);

    setTimesheets(updatedTimesheets);

    setFormData({
      employeeId: "",
      week: "",
    });

    setSaving(false);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setFormData({
      employeeId: "",
      week: "",
    });

    setShowForm(false);
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

        <button
          type="button"
          className="add-timesheet-button"
          onClick={() => setShowForm(true)}
        >
          <AccessTimeOutlined />
          Add Timesheet
        </button>
      </div>

      {showForm && (
        <TimesheetForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleAddTimesheet}
          onCancel={handleCancelForm}
          saving={saving}
        />
      )}

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
