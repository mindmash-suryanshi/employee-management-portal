import { useEffect, useState } from "react";

import { fetchEmployeeById } from "../services/employeeService";

import { getStoredEmployees } from "../utils/employeeStorage";

const useEmployee = (id) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const storedEmployees = getStoredEmployees();

        if (storedEmployees) {
          const storedEmployee = storedEmployees.find(
            (employee) => employee.id === Number(id),
          );

          if (!storedEmployee) {
            throw new Error("Employee not found");
          }

          setEmployee(storedEmployee);
          return;
        }

        const data = await fetchEmployeeById(id);

        setEmployee(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  return {
    employee,
    loading,
    error,
  };
};

export default useEmployee;
