const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDateDifference = (startDate, endDate) => {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  return Math.round((end - start) / (1000 * 60 * 60 * 24));
};

const useLeaveValidation = (formData) => {
  const validate = () => {
    const errors = {};
    const today = getToday();
    const numberOfDays = Number(formData.days);

    if (!formData.employeeId) {
      errors.employeeId = "Select an employee.";
    }

    if (!formData.days || numberOfDays < 1) {
      errors.days = "Enter valid days.";
    }

    if (!formData.startDate) {
      errors.startDate = "Select start date.";
    } else if (formData.startDate < today) {
      errors.startDate = "Leave cannot be taken in the past.";
    }

    if (!formData.endDate) {
      errors.endDate = "Select end date.";
    } else if (formData.endDate < today) {
      errors.endDate = "Leave cannot be taken in the past.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      errors.endDate = "End date must be after start date.";
    }

    if (formData.startDate && formData.endDate && numberOfDays >= 1) {
      const selectedDays = getDateDifference(
        formData.startDate,
        formData.endDate,
      );

      if (selectedDays !== numberOfDays) {
        errors.endDate = `Please select exactly ${numberOfDays} day${
          numberOfDays > 1 ? "s" : ""
        } for this leave.`;
      }
    }

    return errors;
  };

  return {
    validate,
    getToday,
  };
};

export default useLeaveValidation;
