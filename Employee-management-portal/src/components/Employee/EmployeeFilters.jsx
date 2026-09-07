import SearchBar from "../SearchBar";
import FilterSelect from "../FilterSelect";

const EmployeeFilters = ({
  searchTerm,
  departmentFilter,
  titleFilter,
  sortOption,
  departmentOptions,
  titleOptions,
  sortOptions,
  onSearchChange,
  onDepartmentChange,
  onTitleChange,
  onSortChange,
}) => {
  return (
    <div className="employees-table-filters">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search employees..."
      />

      <FilterSelect
        value={departmentFilter}
        onChange={onDepartmentChange}
        options={departmentOptions}
        label="Filter by department"
      />

      <FilterSelect
        value={titleFilter}
        onChange={onTitleChange}
        options={titleOptions}
        label="Filter by title"
      />

      <FilterSelect
        value={sortOption}
        onChange={onSortChange}
        options={sortOptions}
        label="Sort employees"
      />
    </div>
  );
};

export default EmployeeFilters;
