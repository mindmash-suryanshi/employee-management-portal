import { useMemo, useState } from "react";

import SearchBar from "../SearchBar";
import FilterSelect from "../FilterSelect";
import AttendancePagination from "./AttendancePagination";

const ITEMS_PER_PAGE = 5;

const AttendanceSummary = ({ attendance, employees }) => {
  const [selectedDate, setSelectedDate] = useState("2026-09-07");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const attendanceRecords = useMemo(() => {
    return employees
      .map((employee) => {
        const record = attendance.find(
          (item) =>
            item.employeeId === employee.id && item.date === selectedDate,
        );

        return {
          employee,
          attendance: record,
        };
      })
      .filter(({ employee, attendance: record }) => {
        const searchValue = searchTerm.toLowerCase();

        const fullName =
          `${employee.firstName} ${employee.lastName}`.toLowerCase();

        const email = employee.email?.toLowerCase() || "";

        const status = record?.status || "Not Marked";

        const matchesSearch =
          fullName.includes(searchValue) ||
          email.includes(searchValue) ||
          String(employee.id).includes(searchValue);

        const matchesStatus = !statusFilter || status === statusFilter;

        return matchesSearch && matchesStatus;
      });
  }, [attendance, employees, selectedDate, searchTerm, statusFilter]);

  const totalPages = Math.ceil(attendanceRecords.length / ITEMS_PER_PAGE);

  const paginatedRecords = attendanceRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
    { value: "Not Marked", label: "Not Marked" },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="attendance-summary">
      <div className="attendance-summary-header">
        <div>
          <h2>Daily Attendance</h2>

          <p>View employee attendance for the selected day.</p>
        </div>

        <div className="attendance-date-picker">
          <label htmlFor="attendance-date">Date</label>

          <input
            id="attendance-date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div className="attendance-filters">
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search employees..."
        />

        <FilterSelect
          value={statusFilter}
          onChange={handleStatusChange}
          options={statusOptions}
          label="Filter by status"
        />
      </div>

      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRecords.map(({ employee, attendance: record }) => {
              const status = record?.status || "Not Marked";

              return (
                <tr key={employee.id}>
                  <td>{employee.id}</td>

                  <td className="attendance-employee">
                    <span>
                      {employee.firstName} {employee.lastName}
                    </span>

                    <small>{employee.email}</small>
                  </td>

                  <td>{employee.company?.department || "N/A"}</td>

                  <td>{record?.checkIn || "—"}</td>

                  <td>{record?.checkOut || "—"}</td>

                  <td>
                    <span
                      className={`attendance-status attendance-status-${status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}

            {paginatedRecords.length === 0 && (
              <tr>
                <td colSpan="6" className="attendance-empty">
                  No attendance records found.
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

export default AttendanceSummary;
