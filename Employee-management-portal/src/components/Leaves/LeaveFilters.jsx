import SearchBar from "../SearchBar";
import FilterSelect from "../FilterSelect";
import "../../styles/LeaveFilter.css";

const LeaveFilters = ({
  searchTerm,
  leaveType,
  status,
  leaveTypeOptions,
  statusOptions,
  onSearchChange,
  onLeaveTypeChange,
  onStatusChange,
}) => {
  return (
    <div className="leave-filters">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search employees..."
      />

      <FilterSelect
        value={leaveType}
        onChange={onLeaveTypeChange}
        options={leaveTypeOptions}
        label="Filter by leave type"
      />

      <FilterSelect
        value={status}
        onChange={onStatusChange}
        options={statusOptions}
        label="Filter by status"
      />
    </div>
  );
};

export default LeaveFilters;
