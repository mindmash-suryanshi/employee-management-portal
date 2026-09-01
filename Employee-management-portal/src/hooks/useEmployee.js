import { useEffect, useState } from "react";

import { fetchEmployeeById } from "../services/employeeService";

const useEmployee = (id) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployee = async () => {
      console.log("Employee ID:", id);

      try {
        const data = await fetchEmployeeById(id);

        console.log("Employee received:", data);

        setEmployee(data);
      } catch (error) {
        console.error("Employee fetch error:", error);

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
