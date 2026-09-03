import { useEffect, useState } from "react";

import { fetchEmployees } from "../services/employeeService";

import { getStoredEmployees, saveEmployees } from "../utils/employeeStorage";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const storedEmployees = getStoredEmployees();

        if (storedEmployees) {
          setEmployees(storedEmployees);
          return;
        }

        const data = await fetchEmployees();

        saveEmployees(data);

        setEmployees(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
  };
};

export default useEmployees;
