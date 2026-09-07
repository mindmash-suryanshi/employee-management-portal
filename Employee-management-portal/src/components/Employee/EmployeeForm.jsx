import FormField from "../FormField";

const EmployeeForm = ({
  formData,
  errors = {},
  onChange,
  onSubmit,
  onCancel,
  saving,
  submitText = "Save",
}) => {
  return (
    <form className="edit-employee-form" onSubmit={onSubmit}>
      <div className="edit-employee-section">
        <h2>Personal Information</h2>

        <div className="edit-employee-grid">
          <FormField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            error={errors.firstName}
          />

          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            error={errors.lastName}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            error={errors.email}
          />

          <FormField
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            error={errors.phone}
          />

          <FormField
            label="Gender"
            name="gender"
            type="select"
            value={formData.gender}
            onChange={onChange}
            options={[
              { value: "", label: "Select Gender" },
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
            error={errors.gender}
          />
        </div>
      </div>

      <div className="edit-employee-section">
        <h2>Work Information</h2>

        <div className="edit-employee-grid">
          <FormField
            label="Department"
            name="department"
            value={formData.department}
            onChange={onChange}
            error={errors.department}
          />

          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={onChange}
            error={errors.title}
          />
        </div>
      </div>

      <div className="edit-employee-actions">
        <button
          type="button"
          className="edit-employee-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button type="submit" className="edit-employee-save" disabled={saving}>
          {saving ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
