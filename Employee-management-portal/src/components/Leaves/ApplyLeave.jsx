import useLeaveForm from "../../hooks/useLeaveForm";
import useLeaveValidation from "../../hooks/useLeaveValidation";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import ConfirmDialouge from "../ConfirmDialouge";
import "../../styles/ApplyLeave.css";

const ApplyLeave = ({ open, employees, onAddLeave, onClose }) => {
  const {
    formData,
    errors,
    confirmOpen,
    today,
    endDateMax,
    handleChange,
    setErrors,
    setConfirmOpen,
    resetForm,
  } = useLeaveForm();

  const { validate } = useLeaveValidation(formData);
  const leaveTypes = ["Casual Leave", "Sick Leave", "Annual Leave"];
  const handleApply = () => {
    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
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
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
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
            <label htmlFor="employee">Select Employee</label>

            <select
              id="employee"
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

            <label htmlFor="days">Number of Days</label>

            <input
              id="days"
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
                <label htmlFor="startDate">Leave From</label>

                <input
                  id="startDate"
                  type="date"
                  min={today}
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
                <label htmlFor="endDate">Leave To</label>

                <input
                  id="endDate"
                  type="date"
                  min={formData.startDate || today}
                  max={endDateMax}
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
