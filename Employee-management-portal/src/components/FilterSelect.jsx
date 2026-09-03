import "../styles/FilterSelect.css";

const FilterSelect = ({ value, onChange, options, label = "Filter" }) => {
  return (
    <select
      className="filter-select"
      value={value}
      onChange={onChange}
      aria-label={label}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
