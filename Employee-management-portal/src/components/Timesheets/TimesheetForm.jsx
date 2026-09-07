import FormField from "../FormField";

const TimesheetForm = ({
  formData,
  employees,
  onChange,
  onSubmit,
  onCancel,
  saving,
}) => {
  return (
    <form className="timesheet-form" onSubmit={onSubmit}>
      <div className="timesheet-form-section">
        <h2>Add Timesheet</h2>

        <div className="timesheet-form-grid">
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

          <div className="timesheet-details-field">
            <label htmlFor="details">Task Details</label>

            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={onChange}
              placeholder="Describe the work completed..."
              rows="4"
            />
          </div>
        </div>
      </div>

      <div className="timesheet-form-actions">
        <button
          type="button"
          className="timesheet-form-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button type="submit" className="timesheet-form-save" disabled={saving}>
          {saving ? "Saving..." : "Add Timesheet"}
        </button>
      </div>
    </form>
  );
};

export default TimesheetForm;
