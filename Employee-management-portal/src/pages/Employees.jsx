import useEmployees from "../hooks/useEmployees";

import EmployeeTable from "../components/Employee/EmployeeTable";
import StatCard from "../components/StatCard";

import {
  GroupsOutlined,
  FemaleOutlined,
  MaleOutlined,
} from "@mui/icons-material";

import "../styles/Employees.css";

const Employees = () => {
  const { employees, loading, error } = useEmployees();

  const totalEmployees = employees.length;

  const femaleEmployees = employees.filter(
    (employee) => employee.gender === "female",
  ).length;

  const maleEmployees = employees.filter(
    (employee) => employee.gender === "male",
  ).length;

  if (loading) {
    return (
      <div className="employees-page">
        <p>Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employees-page">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="employees-page">
      <div className="employees-header">
        <div>
          <h1>Employees</h1>

          <p>Manage your organization's employees.</p>
        </div>
      </div>

      <div className="employee-stat-cards">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={<GroupsOutlined />}
          color="primary"
        />

        <StatCard
          title="Female Employees"
          value={femaleEmployees}
          icon={<FemaleOutlined />}
          color="secondary"
        />

        <StatCard
          title="Male Employees"
          value={maleEmployees}
          icon={<MaleOutlined />}
          color="success"
        />
      </div>

      <EmployeeTable employees={employees} />
    </div>
  );
};

export default Employees;
