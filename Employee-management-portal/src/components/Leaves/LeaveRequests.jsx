import { useMemo, useState } from "react";

import LeaveFilters from "./LeaveFilters";
import LeaveTable from "./LeaveTable";
import LeavePagination from "./LeavePagination";
import "../../styles/LeaveRequests.css";

const ITEMS_PER_PAGE = 5;

const LeaveRequests = ({ leaves, employees, onStatusChange }) => {
  const [view, setView] = useState("requests");

  const [searchTerm, setSearchTerm] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const leaveTypeOptions = [
    { value: "", label: "All Leave Types" },
    { value: "Casual Leave", label: "Casual Leave" },
    { value: "Sick Leave", label: "Sick Leave" },
    { value: "Annual Leave", label: "Annual Leave" },
  ];

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];

  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      const employee = employees.find((item) => item.id === leave.employeeId);

      const employeeName = employee
        ? `${employee.firstName} ${employee.lastName}`
        : "";

      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        employeeName.toLowerCase().includes(searchValue) ||
        String(leave.employeeId).includes(searchValue);

      const matchesType = !leaveType || leave.leaveType === leaveType;

      const matchesView =
        view === "requests"
          ? leave.status === "Pending"
          : leave.status !== "Pending";

      const matchesStatus = !status || leave.status === status;

      return matchesSearch && matchesType && matchesView && matchesStatus;
    });
  }, [leaves, employees, searchTerm, leaveType, status, view]);

  const totalPages = Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE);

  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const pendingCount = leaves.filter(
    (leave) => leave.status === "Pending",
  ).length;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setCurrentPage(1);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setCurrentPage(1);
    setStatus("");
  };

  return (
    <div className="leave-requests-card">
      <div className="leave-requests-header">
        <div>
          <h2>Employee Leave Request ({leaves.length})</h2>

          <p>Review and manage employee leave applications.</p>
        </div>

        <div className="leave-request-tabs">
          <button
            type="button"
            className={view === "requests" ? "active" : ""}
            onClick={() => handleViewChange("requests")}
          >
            Requests ({pendingCount})
          </button>

          <button
            type="button"
            className={view === "history" ? "active" : ""}
            onClick={() => handleViewChange("history")}
          >
            History
          </button>
        </div>
      </div>

      <div className="leave-request-body">
        <LeaveFilters
          searchTerm={searchTerm}
          leaveType={leaveType}
          status={status}
          leaveTypeOptions={leaveTypeOptions}
          statusOptions={statusOptions}
          onSearchChange={handleSearchChange}
          onLeaveTypeChange={handleLeaveTypeChange}
          onStatusChange={handleStatusChange}
        />

        <LeaveTable
          leaves={paginatedLeaves}
          employees={employees}
          showActions={view === "requests"}
          onStatusChange={onStatusChange}
        />

        <LeavePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default LeaveRequests;
