import { useState } from "react";

import useTimesheets from "../hooks/useTimesheets";
import useEmployees from "../hooks/useEmployees";

import TimesheetTable from "../components/Timesheets/TimesheetTable";
import AddTimesheet from "./AddTimesheet";
import ViewTimesheet from "./ViewTimesheet";

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
import "../styles/AddTimesheet.css";
import "../styles/ViewTimesheet.css";

const Timesheets = () => {
  const { timesheets, setTimesheets, loading, error } = useTimesheets();

  const { employees, loading: employeesLoading } = useEmployees();

  const [selectedStatus, setSelectedStatus] = useState("All");

  const [showAdd, setShowAdd] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    employeeId: "",
    week: "",
    title: "",
    task: "",
    startTime: "",
    endTime: "",
  });

  const [saving, setSaving] = useState(false);

  const itemsPerPage = 5;

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

  const totalPages = Math.ceil(filteredTimesheets.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedTimesheets = filteredTimesheets.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleStatusFilter = (event) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(1);
  };

  const handleApprove = (timesheetId) => {
    const updatedTimesheets = updateTimesheetStatus(timesheetId, "Approved");

    setTimesheets(updatedTimesheets);

    setSelectedTimesheet(
      updatedTimesheets.find((timesheet) => timesheet.id === timesheetId),
    );
  };

  const handleReject = (timesheetId) => {
    const updatedTimesheets = updateTimesheetStatus(timesheetId, "Rejected");

    setTimesheets(updatedTimesheets);

    setSelectedTimesheet(
      updatedTimesheets.find((timesheet) => timesheet.id === timesheetId),
    );
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

    const selectedEmployee = employees.find(
      (employee) => employee.id === Number(formData.employeeId),
    );

    if (
      !selectedEmployee ||
      !formData.week ||
      !formData.title ||
      !formData.task ||
      !formData.startTime ||
      !formData.endTime
    ) {
      return;
    }

    const [startHour, startMinute] = formData.startTime.split(":").map(Number);

    const [endHour, endMinute] = formData.endTime.split(":").map(Number);

    const start = startHour * 60 + startMinute;

    const end = endHour * 60 + endMinute;

    const totalHours =
      end > start ? Number(((end - start) / 60).toFixed(2)) : 0;

    if (totalHours <= 0) {
      return;
    }

    setSaving(true);

    const newTimesheet = {
      employeeId: selectedEmployee.id,
      employeeName: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
      week: formData.week,
      title: formData.title,
      task: formData.task,
      startTime: formData.startTime,
      endTime: formData.endTime,
      totalHours,
      status: "Pending",
    };

    const updatedTimesheets = addTimesheet(newTimesheet);

    setTimesheets(updatedTimesheets);

    setFormData({
      employeeId: "",
      week: "",
      title: "",
      task: "",
      startTime: "",
      endTime: "",
    });

    setSaving(false);
    setShowAdd(false);

    setCurrentPage(Math.ceil(updatedTimesheets.length / itemsPerPage));
  };

  const handleCancelAdd = () => {
    setFormData({
      employeeId: "",
      week: "",
      title: "",
      task: "",
      startTime: "",
      endTime: "",
    });

    setShowAdd(false);
  };

  const handleDoneView = () => {
    setSelectedTimesheet(null);
  };

  if (loading || employeesLoading) {
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
          onClick={() => setShowAdd(true)}
        >
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
          onChange={handleStatusFilter}
          className="timesheet-status-filter"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <TimesheetTable
        timesheets={paginatedTimesheets}
        onView={setSelectedTimesheet}
      />

      {totalPages > 1 && (
        <div className="timesheet-pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                type="button"
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {showAdd && (
        <AddTimesheet
          formData={formData}
          employees={employees}
          onChange={handleFormChange}
          onSubmit={handleAddTimesheet}
          onCancel={handleCancelAdd}
          saving={saving}
        />
      )}

      {selectedTimesheet && (
        <ViewTimesheet
          timesheet={selectedTimesheet}
          onApprove={handleApprove}
          onReject={handleReject}
          onDone={handleDoneView}
        />
      )}
    </div>
  );
};

export default Timesheets;
