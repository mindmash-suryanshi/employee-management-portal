const EMPLOYEES_STORAGE_KEY = "employees";

export const getStoredEmployees = () => {
  const storedEmployees = localStorage.getItem(EMPLOYEES_STORAGE_KEY);

  if (!storedEmployees) {
    return null;
  }

  return JSON.parse(storedEmployees);
};

export const saveEmployees = (employees) => {
  localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
};

export const updateStoredEmployee = (updatedEmployee) => {
  const employees = getStoredEmployees() || [];

  const updatedEmployees = employees.map((employee) =>
    employee.id === updatedEmployee.id ? updatedEmployee : employee,
  );

  saveEmployees(updatedEmployees);

  return updatedEmployees;
};

export const deleteStoredEmployee = (employeeId) => {
  const employees = getStoredEmployees() || [];
  const updatedEmployees = employees.filter(
    (employee) => employee.id !== employeeId,
  );
  saveEmployees(updatedEmployees);
  return updatedEmployees;
};
