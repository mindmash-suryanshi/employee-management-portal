import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 5;

const useEmployeeFilters = (employees) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const departments = useMemo(
    () => [
      ...new Set(
        employees
          .map((employee) => employee.company?.department)
          .filter(Boolean),
      ),
    ],
    [employees],
  );

  const titles = useMemo(
    () => [
      ...new Set(
        employees.map((employee) => employee.company?.title).filter(Boolean),
      ),
    ],
    [employees],
  );

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

  const filteredEmployees = useMemo(
    () =>
      employees.filter((employee) => {
        const searchValue = searchTerm.toLowerCase();

        const fullName =
          `${employee.firstName} ${employee.lastName}`.toLowerCase();

        const email = employee.email?.toLowerCase() || "";
        const employeeId = String(employee.id);

        const matchesSearch =
          fullName.includes(searchValue) ||
          email.includes(searchValue) ||
          employeeId.includes(searchValue);

        const matchesDepartment =
          !departmentFilter ||
          employee.company?.department === departmentFilter;

        const matchesTitle =
          !titleFilter || employee.company?.title === titleFilter;

        return matchesSearch && matchesDepartment && matchesTitle;
      }),
    [employees, searchTerm, departmentFilter, titleFilter],
  );

  const sortedEmployees = useMemo(
    () =>
      [...filteredEmployees].sort((a, b) => {
        if (sortOption === "name-asc") {
          return `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`,
          );
        }

        if (sortOption === "name-desc") {
          return `${b.firstName} ${b.lastName}`.localeCompare(
            `${a.firstName} ${a.lastName}`,
          );
        }

        if (sortOption === "id-asc") {
          return a.id - b.id;
        }

        if (sortOption === "id-desc") {
          return b.id - a.id;
        }

        if (sortOption === "title-asc") {
          return (a.company?.title || "").localeCompare(b.company?.title || "");
        }

        return 0;
      }),
    [filteredEmployees, sortOption],
  );

  const totalPages = Math.ceil(sortedEmployees.length / ITEMS_PER_PAGE);

  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const resetPage = () => setCurrentPage(1);

  return {
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
  };
};

export default useEmployeeFilters;
