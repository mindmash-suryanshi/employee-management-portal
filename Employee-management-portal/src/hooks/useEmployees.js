import { useEffect, useState } from "react";

import { fetchEmployees } from "../services/employeeService";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
      console.log("Fetching employees...");

      try {
        const data = await fetchEmployees();

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
