import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "../../styles/ApplyLeave.css";
import ConfirmDialouge from "../ConfirmDialouge";

const ApplyLeave = ({ open, employees, onAddLeave, onClose }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    leaveType: "Casual Leave",
    days: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  const leaveTypes = ["Casual Leave", "Sick Leave", "Annual Leave"];

  const handleChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.employeeId) {
      newErrors.employeeId = "Select an employee.";
    }

    if (!formData.days || Number(formData.days) < 1) {
      newErrors.days = "Enter valid days.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Select start date.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "Select end date.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate = "End date must be after start date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleApply = () => {
    if (!validate()) {
      return;
    }

    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    const newLeave = {
      id: Date.now(),
      employeeId: Number(formData.employeeId),
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: Number(formData.days),
      reason: "Leave applied by admin",
      status: "Pending",
    };

    onAddLeave(newLeave);

    setConfirmOpen(false);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      employeeId: "",
      leaveType: "Casual Leave",
      days: "",
      startDate: "",
      endDate: "",
    });

    setErrors({});
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        className="apply-leave-dialog"
      >
        <DialogTitle className="apply-leave-dialog-title">
          Apply Leave
        </DialogTitle>

        <DialogContent>
          <div className="apply-leave-form">
            <label>Select Employee</label>

            <select
              value={formData.employeeId}
              onChange={(event) =>
                handleChange("employeeId", event.target.value)
              }
            >
              <option value="">Select employee</option>

              {employees.map((employee) => (
                <option value={employee.id} key={employee.id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </select>

            {errors.employeeId && (
              <span className="leave-form-error">{errors.employeeId}</span>
            )}

            <label>Leave Type</label>

            <div className="leave-type-options">
              {leaveTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  className={formData.leaveType === type ? "active" : ""}
                  onClick={() => handleChange("leaveType", type)}
                >
                  {type.replace(" Leave", "")}
                </button>
              ))}
            </div>

            <label>Number of Days</label>

            <input
              type="number"
              min="1"
              value={formData.days}
              onChange={(event) => handleChange("days", event.target.value)}
              placeholder="Enter number of days"
            />

            {errors.days && (
              <span className="leave-form-error">{errors.days}</span>
            )}

            <div className="leave-date-grid">
              <div>
                <label>Leave From</label>

                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(event) =>
                    handleChange("startDate", event.target.value)
                  }
                />

                {errors.startDate && (
                  <span className="leave-form-error">{errors.startDate}</span>
                )}
              </div>

              <div>
                <label>Leave To</label>

                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(event) =>
                    handleChange("endDate", event.target.value)
                  }
                />

                {errors.endDate && (
                  <span className="leave-form-error">{errors.endDate}</span>
                )}
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions className="apply-leave-dialog-actions">
          <Button
            type="button"
            onClick={handleClose}
            className="apply-leave-cancel"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={handleApply}
            className="apply-leave-submit"
          >
            Apply Leave
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialouge
        open={confirmOpen}
        title="Confirm Leave"
        message="Are you sure you want to submit this leave request?"
        confirmText="Apply Leave"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default ApplyLeave;
