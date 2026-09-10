import { useState } from "react";

const initialFormData = {
  employeeId: "",
  leaveType: "Casual Leave",
  days: "",
  startDate: "",
  endDate: "",
};

const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const addDays = (date, days) => {
  const result = new Date(`${date}T00:00:00`);
  result.setDate(result.getDate() + days);

  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, "0");
  const day = String(result.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const useLeaveForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData((current) => {
      const updatedData = {
        ...current,
        [field]: value,
      };

      if (field === "days") {
        if (Number(value) >= 1 && current.startDate) {
          updatedData.endDate = addDays(current.startDate, Number(value));
        } else if (!value) {
          updatedData.endDate = "";
        }
      }

      if (
        field === "startDate" &&
        value &&
        current.days &&
        Number(current.days) >= 1
      ) {
        updatedData.endDate = addDays(value, Number(current.days));
      }

      return updatedData;
    });

    setErrors((current) => ({
      ...current,
      [field]: "",
      ...(field === "days" || field === "startDate" ? { endDate: "" } : {}),
    }));
  };

  const getEndDateMax = () => {
    if (!formData.startDate || Number(formData.days) < 1) {
      return undefined;
    }

    return addDays(formData.startDate, Number(formData.days));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setConfirmOpen(false);
  };

  return {
    formData,
    errors,
    confirmOpen,
    today: getToday(),
    endDateMax: getEndDateMax(),
    handleChange,
    setErrors,
    setConfirmOpen,
    resetForm,
  };
};

export default useLeaveForm;
