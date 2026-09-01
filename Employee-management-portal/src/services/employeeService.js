const EMPLOYEE_URL = "https://dummyjson.com/users";

export const fetchEmployees = async () => {
  const response = await fetch(EMPLOYEE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const data = await response.json();

  return data.users;
};

export const fetchEmployeeById = async (id) => {
  const response = await fetch(`${EMPLOYEE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }

  const data = await response.json();

  return data;
};
