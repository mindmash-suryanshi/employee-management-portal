import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useEmployees from "../hooks/useEmployees";
import EmployeeForm from "../components/Employee/EmployeeForm";
import ConfirmDialouge from "../components/ConfirmDialouge";
import { saveEmployees } from "../utils/employeeStorage";

import "../styles/EditEmployee.css";

const AddEmployee = () => {
  const navigate = useNavigate();
  const { employees } = useEmployees();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
    title: "",
  });

  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([field, value]) => {
      if (!value.trim()) {
        newErrors[field] =
          `${field.charAt(0).toUpperCase()}${field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setSaving(true);

    const nextId =
      employees.length > 0
        ? Math.max(...employees.map((employee) => employee.id)) + 1
        : 1;

    const newEmployee = {
      id: nextId,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      gender: formData.gender.toLowerCase(),
      company: {
        department: formData.department.trim(),
        title: formData.title.trim(),
      },
    };

    saveEmployees([...employees, newEmployee]);

    setConfirmOpen(false);
    setSaving(false);

    navigate("/employees");
  };

  const handleCancel = () => {
    navigate("/employees");
  };

  return (
    <div className="edit-employee-page">
      <div className="edit-employee-header">
        <button
          type="button"
          className="edit-employee-back"
          onClick={handleCancel}
        >
          ← Back to Employees
        </button>

        <h1>Add Employee</h1>

        <p>Add a new employee to your organization.</p>
      </div>

      <EmployeeForm
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        saving={saving}
        submitText="Add Employee"
      />

      <ConfirmDialouge
        open={confirmOpen}
        title="Add Employee?"
        message={`${formData.firstName} ${formData.lastName} will be added as an employee to your organization.`}
        confirmText="Add Employee"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default AddEmployee;
