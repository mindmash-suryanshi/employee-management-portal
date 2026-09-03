import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import useEmployee from "../hooks/useEmployee";
import ActionButton from "../components/ActionButton";
import ConfirmDialouge from "../components/ConfirmDialouge";
import { deleteStoredEmployee } from "../utils/employeeStorage";
import "../styles/EmployeeProfile.css";

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { employee, loading, error } = useEmployee(id);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    try {
      setDeleting(true);

      deleteStoredEmployee(employee.id);

      navigate("/employees");
    } catch (error) {
      console.error("Failed to delete employee:", error);
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="employee-profile-page">
        <p>Loading employee...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employee-profile-page">
        <p>{error}</p>

        <Link to="/employees">Back to Employees</Link>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="employee-profile-page">
        <p>Employee not found.</p>

        <Link to="/employees">Back to Employees</Link>
      </div>
    );
  }

  const fullName = `${employee.firstName} ${employee.lastName}`;

  const initials = `${employee.firstName?.charAt(0) || ""}${employee.lastName?.charAt(0) || ""}`;

  return (
    <div className="employee-profile-page">
      <Link to="/employees" className="employee-profile-back">
        <ArrowBackOutlined />
        <span>Back to Employees</span>
      </Link>

      <section className="employee-profile-hero">
        <div className="employee-profile-avatar">{initials}</div>

        <div className="employee-profile-hero-info">
          <h1>{fullName}</h1>

          <p>{employee.company?.title || "Employee"}</p>

          <span>Employee ID: #{employee.id}</span>
        </div>

        <div className="employee-profile-actions">
          <ActionButton
            variant="edit"
            label="Edit"
            onClick={() => {
              navigate(`/edit-employee/${employee.id}`);
            }}
          />

          <ActionButton
            variant="delete"
            label="Delete"
            onClick={() => setDeleteDialogOpen(true)}
          />
        </div>
      </section>

      <ConfirmDialouge
        open={deleteDialogOpen}
        title="Delete Employee"
        message={`Are you sure you want to delete ${fullName}?`}
        confirmText={deleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />

      <section className="employee-profile-card">
        <div className="employee-profile-card-header">
          <h2>Personal Information</h2>
        </div>

        <div className="employee-profile-grid">
          <div className="employee-profile-field">
            <span>Full Name</span>

            <strong>{fullName}</strong>
          </div>

          <div className="employee-profile-field">
            <span>Email</span>

            <strong>{employee.email}</strong>
          </div>

          <div className="employee-profile-field">
            <span>Phone</span>

            <strong>{employee.phone}</strong>
          </div>

          <div className="employee-profile-field">
            <span>Gender</span>

            <strong>{employee.gender || "N/A"}</strong>
          </div>
        </div>
      </section>

      <section className="employee-profile-card">
        <div className="employee-profile-card-header">
          <h2>Work Information</h2>
        </div>

        <div className="employee-profile-grid">
          <div className="employee-profile-field">
            <span>Department</span>

            <strong>{employee.company?.department || "N/A"}</strong>
          </div>

          <div className="employee-profile-field">
            <span>Title</span>

            <strong>{employee.company?.title || "N/A"}</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeProfile;
