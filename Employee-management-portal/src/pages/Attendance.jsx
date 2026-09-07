import { useState } from "react";

import useAttendance from "../hooks/useAttendance";
import useEmployees from "../hooks/useEmployees";

import AttendanceSummary from "../components/Attendance/AttendanceSummary";
import AttendanceDetail from "../components/Attendance/AttendanceDetail";

import "../styles/Attendance.css";

const Attendance = () => {
  const {
    attendance,
    loading: attendanceLoading,
    error: attendanceError,
  } = useAttendance();

  const {
    employees,
    loading: employeesLoading,
    error: employeesError,
  } = useEmployees();

  const [view, setView] = useState("summary");

  const loading = attendanceLoading || employeesLoading;
  const error = attendanceError || employeesError;

  if (loading) {
    return (
      <div className="attendance-page">
        <p>Loading attendance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="attendance-page">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="attendance-page">
      <div className="attendance-header"></div>

      <div className="attendance-view-toggle-container">
        <div className="attendance-view-toggle">
          <button
            type="button"
            className={view === "summary" ? "active" : ""}
            onClick={() => setView("summary")}
          >
            Summary
          </button>

          <button
            type="button"
            className={view === "detail" ? "active" : ""}
            onClick={() => setView("detail")}
          >
            Detail
          </button>
        </div>
      </div>

      <div key={view} className="attendance-view-content">
        {view === "summary" ? (
          <AttendanceSummary attendance={attendance} employees={employees} />
        ) : (
          <AttendanceDetail attendance={attendance} employees={employees} />
        )}
      </div>
    </div>
  );
};

export default Attendance;
