import FormField from "../components/FormField";
import "../styles/AddTimesheet.css";

const AddTimesheet = ({
  formData,
  employees,
  onChange,
  onSubmit,
  onCancel,
  saving,
}) => {
  const calculateTotalHours = () => {
    if (!formData.startTime || !formData.endTime) {
      return "0";
    }

    const [startHour, startMinute] = formData.startTime.split(":").map(Number);

    const [endHour, endMinute] = formData.endTime.split(":").map(Number);

    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    const difference = end - start;

    if (difference <= 0) {
      return "0";
    }

    return (difference / 60).toFixed(2);
  };

  const totalHours = calculateTotalHours();

  return (
    <div className="timesheet-modal-overlay">
      <div className="add-timesheet-modal">
        <div className="add-timesheet-header">
          <div>
            <h2>Add Timesheet</h2>
            <p>Enter the details of your work.</p>
          </div>

          <button
            type="button"
            className="timesheet-close-button"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="add-timesheet-grid">
            <FormField
              label="Employee"
              name="employeeId"
              type="select"
              value={formData.employeeId}
              onChange={onChange}
              options={[
                {
                  value: "",
                  label: "Select Employee",
                },
                ...employees.map((employee) => ({
                  value: employee.id,
                  label: `${employee.firstName} ${employee.lastName}`,
                })),
              ]}
            />

            <FormField
              label="Week"
              name="week"
              type="date"
              value={formData.week}
              onChange={onChange}
            />

            <FormField
              label="Title"
              name="title"
              value={formData.title}
              onChange={onChange}
            />

            <FormField
              label="Start Time"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={onChange}
            />

            <FormField
              label="End Time"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={onChange}
            />

            <div className="timesheet-total-hours">
              <label>Total Hours</label>
              <div>{totalHours} hours</div>
            </div>
          </div>

          <div className="timesheet-details-field">
            <label htmlFor="task">Task Details</label>

            <textarea
              id="task"
              name="task"
              value={formData.task}
              onChange={onChange}
              placeholder="Describe the work completed..."
              rows="4"
            />
          </div>

          <div className="add-timesheet-actions">
            <button
              type="button"
              className="timesheet-form-cancel"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="timesheet-form-save"
              disabled={saving}
            >
              {saving ? "Saving..." : "Add Timesheet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTimesheet;
