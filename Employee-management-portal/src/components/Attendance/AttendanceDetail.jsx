import { useMemo, useState } from "react";

import AttendancePagination from "./AttendancePagination";

const ITEMS_PER_PAGE = 5;

const AttendanceDetail = ({ attendance, employees }) => {
  const [selectedMonth, setSelectedMonth] = useState("2026-09");

  const [currentPage, setCurrentPage] = useState(1);

  const daysInMonth = useMemo(() => {
    const [year, month] = selectedMonth.split("-").map(Number);

    return new Date(year, month, 0).getDate();
  }, [selectedMonth]);

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const paginatedEmployees = employees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

  const getAttendanceStatus = (employeeId, day) => {
    const paddedDay = String(day).padStart(2, "0");

    const date = `${selectedMonth}-${paddedDay}`;

    const record = attendance.find(
      (item) => item.employeeId === employeeId && item.date === date,
    );

    if (!record) {
      return "—";
    }

    if (record.status === "Present") {
      return "P";
    }

    if (record.status === "Absent") {
      return "A";
    }

    return "—";
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="attendance-detail">
      <div className="attendance-detail-header">
        <div>
          <h2>Monthly Attendance</h2>

          <p>View employee attendance across the selected month.</p>
        </div>

        <div className="attendance-month-picker">
          <label htmlFor="attendance-month">Month</label>

          <input
            id="attendance-month"
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
          />
        </div>
      </div>

      <div className="attendance-legend">
        <div>
          <span className="legend-status legend-present">P</span>
          Present
        </div>

        <div>
          <span className="legend-status legend-absent">A</span>
          Absent
        </div>

        <div>
          <span className="legend-status legend-empty">—</span>
          Not Marked
        </div>
      </div>

      <div className="attendance-detail-table-container">
        <table className="attendance-detail-table">
          <thead>
            <tr>
              <th className="detail-employee-column">Employee</th>

              {days.map((day) => (
                <th key={day}>{String(day).padStart(2, "0")}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="detail-employee">
                  <span>
                    {employee.firstName} {employee.lastName}
                  </span>

                  <small>{employee.company?.department || "N/A"}</small>
                </td>

                {days.map((day) => {
                  const status = getAttendanceStatus(employee.id, day);

                  return (
                    <td key={day}>
                      <span
                        className={`detail-status detail-status-${
                          status === "P"
                            ? "present"
                            : status === "A"
                              ? "absent"
                              : "empty"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}

            {paginatedEmployees.length === 0 && (
              <tr>
                <td colSpan={days.length + 1} className="attendance-empty">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AttendancePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AttendanceDetail;
