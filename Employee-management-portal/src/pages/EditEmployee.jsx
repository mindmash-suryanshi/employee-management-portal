import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";

import useEmployee from "../hooks/useEmployee";

import EmployeeForm from "../components/Employee/EmployeeForm";

import { updateStoredEmployee } from "../utils/employeeStorage";

import "../styles/EditEmployee.css";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { employee, loading, error } = useEmployee(id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
    title: "",
  });

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        gender: employee.gender || "",
        department: employee.company?.department || "",
        title: employee.company?.title || "",
      });
    }
  }, [employee]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setSaveError("");

      const updatedEmployee = {
        ...employee,

        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,

        company: {
          ...employee.company,
          department: formData.department,
          title: formData.title,
        },
      };

      updateStoredEmployee(updatedEmployee);

      navigate(`/employees/${id}`);
    } catch (error) {
      setSaveError("Failed to save employee changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/employees/${id}`);
  };

  if (loading) {
    return (
      <div className="edit-employee-page">
        <p>Loading employee...</p>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="edit-employee-page">
        <p>{error || "Employee not found."}</p>

        <Link to="/employees">Back to Employees</Link>
      </div>
    );
  }

  return (
    <div className="edit-employee-page">
      <Link to={`/employees/${id}`} className="edit-employee-back">
        <ArrowBackOutlined />
        <span>Back to Profile</span>
      </Link>

      <div className="edit-employee-header">
        <div>
          <h1>Edit Employee</h1>

          <p>
            Update information for{" "}
            <strong>
              {employee.firstName} {employee.lastName}
            </strong>
          </p>
        </div>
      </div>

      {saveError && <p className="edit-employee-error">{saveError}</p>}

      <EmployeeForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        saving={saving}
      />
    </div>
  );
};

export default EditEmployee;
