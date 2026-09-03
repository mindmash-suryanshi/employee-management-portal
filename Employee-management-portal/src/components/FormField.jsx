import "../styles/FormField.css";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  options,
}) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>

      {type === "select" ? (
        <select id={name} name={name} value={value} onChange={onChange}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormField;
