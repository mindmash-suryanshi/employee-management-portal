import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import "../styles/ActionButton.css";

const ActionButton = ({ variant, label, onClick }) => {
  const isEdit = variant === "edit";

  return (
    <button
      type="button"
      className={`action-button action-button-${variant}`}
      onClick={onClick}
    >
      {isEdit ? <EditOutlined /> : <DeleteOutlineOutlined />}

      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
