import { CheckCircleOutlined, CancelOutlined } from "@mui/icons-material";

const TimesheetTable = ({ timesheets, onApprove, onReject }) => {
  return (
    <div className="timesheet-table-container">
      <table>
        <thead>
          <tr>
            <th>TS ID</th>
            <th>Employee ID</th>
            <th>Week</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {timesheets.length === 0 ? (
            <tr>
              <td colSpan="5" className="timesheet-empty">
                No timesheets found.
              </td>
            </tr>
          ) : (
            timesheets.map((timesheet) => (
              <tr key={timesheet.id}>
                <td>{timesheet.id}</td>

                <td>{timesheet.employeeId}</td>

                <td>{timesheet.week}</td>

                <td>
                  <span
                    className={`timesheet-status status-${timesheet.status.toLowerCase()}`}
                  >
                    {timesheet.status}
                  </span>
                </td>

                <td>
                  {timesheet.status === "Pending" ? (
                    <div className="timesheet-actions">
                      <button
                        type="button"
                        className="timesheet-approve"
                        onClick={() => onApprove(timesheet.id)}
                      >
                        <CheckCircleOutlined />
                        Approve
                      </button>

                      <button
                        type="button"
                        className="timesheet-reject"
                        onClick={() => onReject(timesheet.id)}
                      >
                        <CancelOutlined />
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="timesheet-no-action">—</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetTable;
