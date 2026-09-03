import SearchOutlined from "@mui/icons-material/SearchOutlined";

import "../styles/SearchBar.css";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="search-bar">
      <SearchOutlined />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
};

export default SearchBar;
