import "../../styles/TimesheetTable.css";
const TimesheetTable = ({ timesheets, onView }) => {
  const rowsPerPage = 5;

  const emptyRows = Math.max(0, rowsPerPage - timesheets.length);

  return (
    <div className="timesheet-table-container">
      <table>
        <thead>
          <tr>
            <th className="ts-id-column">TS ID</th>
            <th>Employee</th>
            <th>Week</th>
            <th>Title</th>
            <th>Status</th>
            <th className="ts-action-column">Action</th>
          </tr>
        </thead>

        <tbody>
          {timesheets.length === 0 ? (
            <tr>
              <td colSpan="6" className="timesheet-empty">
                No timesheets found.
              </td>
            </tr>
          ) : (
            <>
              {timesheets.map((timesheet) => (
                <tr key={timesheet.id}>
                  <td>{timesheet.id}</td>

                  <td>{timesheet.employeeName}</td>

                  <td>{timesheet.week}</td>

                  <td className="timesheet-title-cell" title={timesheet.title}>
                    {timesheet.title}
                  </td>

                  <td>
                    <span
                      className={`timesheet-status status-${timesheet.status.toLowerCase()}`}
                    >
                      {timesheet.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="timesheet-view-button"
                      onClick={() => onView(timesheet)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {Array.from({ length: emptyRows }, (_, index) => (
                <tr
                  key={`empty-${index}`}
                  className="timesheet-empty-row"
                  aria-hidden="true"
                >
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetTable;
