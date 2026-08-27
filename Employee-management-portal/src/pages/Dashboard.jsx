import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/employeeService";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
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

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>{erro}r</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Total Employees: {employees.length}</p>
    </div>
  );
};

export default Dashboard;
