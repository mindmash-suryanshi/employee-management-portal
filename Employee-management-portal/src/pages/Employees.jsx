import useEmployees from "../hooks/useEmployees";
import useEmployeeFilters from "../hooks/useEmployeeFilters";
import { Link } from "react-router-dom";
import EmployeeTable from "../components/Employee/EmployeeTable";
import EmployeeFilters from "../components/Employee/EmployeeFilters";
import EmployeePagination from "../components/Employee/EmployeePagination";
import StatCard from "../components/StatCard";

import {
  GroupsOutlined,
  FemaleOutlined,
  MaleOutlined,
} from "@mui/icons-material";

import "../styles/Employees.css";

const Employees = () => {
  const { employees, loading, error } = useEmployees();

  const {
    searchTerm,
    departmentFilter,
    titleFilter,
    sortOption,
    currentPage,
    departmentOptions,
    titleOptions,
    sortOptions,
    paginatedEmployees,
    totalPages,
    setSearchTerm,
    setDepartmentFilter,
    setTitleFilter,
    setSortOption,
    setCurrentPage,
    resetPage,
  } = useEmployeeFilters(employees);

  const totalEmployees = employees.length;

  const femaleEmployees = employees.filter(
    (employee) => employee.gender === "female",
  ).length;

  const maleEmployees = employees.filter(
    (employee) => employee.gender === "male",
  ).length;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    resetPage();
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
    resetPage();
  };

  const handleTitleChange = (event) => {
    setTitleFilter(event.target.value);
    resetPage();
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    resetPage();
  };

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

        <Link to="/add-employee" className="add-employee-button">
          + Add Employee
        </Link>
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

      <EmployeeFilters
        searchTerm={searchTerm}
        departmentFilter={departmentFilter}
        titleFilter={titleFilter}
        sortOption={sortOption}
        departmentOptions={departmentOptions}
        titleOptions={titleOptions}
        sortOptions={sortOptions}
        onSearchChange={handleSearchChange}
        onDepartmentChange={handleDepartmentChange}
        onTitleChange={handleTitleChange}
        onSortChange={handleSortChange}
      />

      <EmployeeTable employees={paginatedEmployees} />

      <EmployeePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Employees;
