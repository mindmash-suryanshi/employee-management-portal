import { useState } from "react";
import useEmployees from "../hooks/useEmployees";
import EmployeeTable from "../components/Employee/EmployeeTable";
import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelect";
import StatCard from "../components/StatCard";
import {
  GroupsOutlined,
  FemaleOutlined,
  MaleOutlined,
} from "@mui/icons-material";
import "../styles/Employees.css";

const Employees = () => {
  const { employees, loading, error } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const totalEmployees = employees.length;

  const femaleEmployees = employees.filter(
    (employee) => employee.gender === "female",
  ).length;

  const maleEmployees = employees.filter(
    (employee) => employee.gender === "male",
  ).length;

  const departments = [
    ...new Set(
      employees.map((employee) => employee.company?.department).filter(Boolean),
    ),
  ];

  const titles = [
    ...new Set(
      employees.map((employee) => employee.company?.title).filter(Boolean),
    ),
  ];

  const departmentOptions = [
    { value: "", label: "All Departments" },
    ...departments.map((department) => ({
      value: department,
      label: department,
    })),
  ];

  const titleOptions = [
    { value: "", label: "All Titles" },
    ...titles.map((title) => ({
      value: title,
      label: title,
    })),
  ];

  const sortOptions = [
    { value: "", label: "Sort By" },
    { value: "name-asc", label: "Name: A → Z" },
    { value: "name-desc", label: "Name: Z → A" },
    { value: "id-asc", label: "ID: Low → High" },
    { value: "id-desc", label: "ID: High → Low" },
    { value: "title-asc", label: "Title: A → Z" },
  ];

  const filteredEmployees = employees.filter((employee) => {
    const searchValue = searchTerm.toLowerCase();
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const email = employee.email?.toLowerCase() || "";
    const employeeId = String(employee.id);

    const matchesSearch =
      fullName.includes(searchValue) ||
      email.includes(searchValue) ||
      employeeId.includes(searchValue);

    const matchesDepartment =
      !departmentFilter || employee.company?.department === departmentFilter;
    const matchesTitle =
      !titleFilter || employee.company?.title === titleFilter;
    return matchesSearch && matchesDepartment && matchesTitle;
  });

  const sortedEmployees = [...filteredEmployees].sort(
    (employeeA, employeeB) => {
      if (sortOption === "name-asc") {
        return `${employeeA.firstName} ${employeeA.lastName}`.localeCompare(
          `${employeeB.firstName} ${employeeB.lastName}`,
        );
      }

      if (sortOption === "name-desc") {
        return `${employeeB.firstName} ${employeeB.lastName}`.localeCompare(
          `${employeeA.firstName} ${employeeA.lastName}`,
        );
      }

      if (sortOption === "id-asc") {
        return employeeA.id - employeeB.id;
      }

      if (sortOption === "id-desc") {
        return employeeB.id - employeeA.id;
      }

      if (sortOption === "title-asc") {
        return (employeeA.company?.title || "").localeCompare(
          employeeB.company?.title || "",
        );
      }
      return 0;
    },
  );

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

      <div className="employees-table-header">
        <div className="employees-table-filters">
          <SearchBar
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search employees..."
          />

          <FilterSelect
            value={departmentFilter}
            onChange={(event) => {
              setDepartmentFilter(event.target.value);
            }}
            options={departmentOptions}
            label="Filter by department"
          />

          <FilterSelect
            value={titleFilter}
            onChange={(event) => {
              setTitleFilter(event.target.value);
            }}
            options={titleOptions}
            label="Filter by title"
          />

          <FilterSelect
            value={sortOption}
            onChange={(event) => {
              setSortOption(event.target.value);
            }}
            options={sortOptions}
            label="Sort employees"
          />
        </div>
      </div>
      <EmployeeTable employees={sortedEmployees} />
    </div>
  );
};

export default Employees;
