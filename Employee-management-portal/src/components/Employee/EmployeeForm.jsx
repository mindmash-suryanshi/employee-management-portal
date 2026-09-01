import FormField from "../FormField";

const EmployeeForm = ({ formData, onChange, onSubmit, onCancel, saving }) => {
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
          />

          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
          />

          <FormField
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
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
          />

          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={onChange}
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
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
