import { useState } from "react";

import useLeaves from "../hooks/useLeaves";
import useEmployees from "../hooks/useEmployees";
import useAttendance from "../hooks/useAttendance";

import LeaveSummary from "../components/Leaves/LeaveSummary";
import LeaveSchedule from "../components/Leaves/LeaveSchedule";
import UpcomingHolidays from "../components/Leaves/UpcomingHolidays";
import LeaveRequests from "../components/Leaves/LeaveRequests";
import ApplyLeave from "../components/Leaves/ApplyLeave";

import "../styles/Leaves.css";

const Leaves = () => {
  const {
    leaves,
    loading: leavesLoading,
    error: leavesError,
    updateLeaveStatus,
    addLeave,
  } = useLeaves();

  const {
    employees,
    loading: employeesLoading,
    error: employeesError,
  } = useEmployees();

  const {
    attendance,
    loading: attendanceLoading,
    error: attendanceError,
  } = useAttendance();

  const [applyLeaveOpen, setApplyLeaveOpen] = useState(false);

  const loading = leavesLoading || employeesLoading || attendanceLoading;

  const error = leavesError || employeesError || attendanceError;

  if (loading) {
    return (
      <div className="leaves-page">
        <p>Loading leave records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaves-page">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="leaves-page">
      <div className="leaves-header">
        <div>
          <h1>Leaves</h1>

          <p>Manage employee leave requests and upcoming leaves.</p>
        </div>

        <button
          type="button"
          className="apply-leave-header-button"
          onClick={() => setApplyLeaveOpen(true)}
        >
          + Apply Leave
        </button>
      </div>

      <LeaveSummary leaves={leaves} attendance={attendance} />

      <div className="leaves-overview-grid">
        <LeaveSchedule leaves={leaves} employees={employees} />

        <UpcomingHolidays />
      </div>

      <LeaveRequests
        leaves={leaves}
        employees={employees}
        onStatusChange={updateLeaveStatus}
      />

      <ApplyLeave
        open={applyLeaveOpen}
        employees={employees}
        onAddLeave={addLeave}
        onClose={() => setApplyLeaveOpen(false)}
      />
    </div>
  );
};

export default Leaves;
