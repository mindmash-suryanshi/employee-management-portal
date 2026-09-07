import { CheckCircleOutlined, CancelOutlined } from "@mui/icons-material";
import "../styles/ViewTimesheet.css";

const ViewTimesheet = ({ timesheet, onApprove, onReject, onDone }) => {
  if (!timesheet) {
    return null;
  }

  const isPending = timesheet.status === "Pending";

  return (
    <div className="timesheet-modal-overlay">
      <div className="view-timesheet-modal">
        <div className="view-timesheet-header">
          <div>
            <h2>Timesheet Details</h2>
            <p>View submitted work details.</p>
          </div>

          <button
            type="button"
            className="timesheet-close-button"
            onClick={onDone}
          >
            ×
          </button>
        </div>

        <div className="view-timesheet-details">
          <div className="view-timesheet-field">
            <span>Employee</span>
            <strong>{timesheet.employeeName}</strong>
          </div>

          <div className="view-timesheet-field">
            <span>Week</span>
            <strong>{timesheet.week}</strong>
          </div>

          <div className="view-timesheet-field">
            <span>Title</span>
            <strong>{timesheet.title}</strong>
          </div>

          <div className="view-timesheet-field">
            <span>Start Time</span>
            <strong>{timesheet.startTime}</strong>
          </div>

          <div className="view-timesheet-field">
            <span>End Time</span>
            <strong>{timesheet.endTime}</strong>
          </div>

          <div className="view-timesheet-field">
            <span>Total Hours</span>
            <strong>{timesheet.totalHours} hours</strong>
          </div>

          <div className="view-timesheet-field view-timesheet-task">
            <span>Task Details</span>
            <p>{timesheet.task}</p>
          </div>

          <div className="view-timesheet-field">
            <span>Status</span>

            <span
              className={`timesheet-status status-${timesheet.status.toLowerCase()}`}
            >
              {timesheet.status}
            </span>
          </div>
        </div>

        <div className="view-timesheet-actions">
          {isPending && (
            <>
              <button
                type="button"
                className="timesheet-reject"
                onClick={() => onReject(timesheet.id)}
              >
                <CancelOutlined />
                Reject
              </button>

              <button
                type="button"
                className="timesheet-approve"
                onClick={() => onApprove(timesheet.id)}
              >
                <CheckCircleOutlined />
                Approve
              </button>
            </>
          )}

          <button
            type="button"
            className="timesheet-done-button"
            onClick={onDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTimesheet;
