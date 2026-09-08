import { CheckCircleOutlined, CancelOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
const LeaveTable = ({ leaves, employees, showActions, onStatusChange }) => {
  const getEmployee = (employeeId) => {
    return employees.find((employee) => employee.id === employeeId);
  };

  const emptyRows = Math.max(0, 5 - leaves.length);

  return (
    <div className="leave-table-container">
      <table className="leave-table">
        <colgroup>
          <col className="leave-col-employee" />
          <col className="leave-col-date" />
          <col className="leave-col-date" />
          <col className="leave-col-date" />
          <col className="leave-col-type" />
          <col className="leave-col-days" />
          <col className="leave-col-status" />

          {showActions && <col className="leave-col-action" />}
        </colgroup>

        <thead>
          <tr>
            <th>Employee</th>
            <th>Apply Date</th>
            <th>Leave From</th>
            <th>Leave To</th>
            <th>Leave Type</th>
            <th>Days</th>
            <th>Status</th>

            {showActions && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => {
            const employee = getEmployee(leave.employeeId);

            const employeeName = employee
              ? `${employee.firstName} ${employee.lastName}`
              : "Unknown Employee";

            return (
              <tr key={leave.id}>
                <td>
                  <div className="leave-employee">
                    <span>{employeeName}</span>
                    <small>#{leave.employeeId}</small>
                  </div>
                </td>

                <td>{leave.startDate}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.days}</td>

                <td>
                  <span
                    className={`leave-status leave-status-${leave.status.toLowerCase()}`}
                  >
                    {leave.status}
                  </span>
                </td>

                {showActions && (
                  <td>
                    <div className="leave-actions">
                      <Tooltip title="Approve">
                        <IconButton
                          size="small"
                          className="leave-approve-button"
                          onClick={() => onStatusChange(leave.id, "Approved")}
                        >
                          <CheckCircleOutlined />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Reject">
                        <IconButton
                          size="small"
                          className="leave-reject-button"
                          onClick={() => onStatusChange(leave.id, "Rejected")}
                        >
                          <CancelOutlined />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}

          {leaves.length > 0 &&
            Array.from({ length: emptyRows }).map((_, index) => (
              <tr className="leave-empty-row" key={`empty-${index}`}>
                <td colSpan={showActions ? 8 : 7}></td>
              </tr>
            ))}

          {leaves.length === 0 && (
            <tr>
              <td colSpan={showActions ? 8 : 7} className="leave-empty">
                No leave records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
