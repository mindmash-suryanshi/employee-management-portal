import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { SearchOffOutlined } from "@mui/icons-material";

import "../styles/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <SearchOffOutlined />
        </div>

        <span className="not-found-code">404</span>

        <h1>Page Not Found</h1>

        <p>The page you're looking for doesn't exist or may have been moved.</p>

        <Button
          variant="contained"
          onClick={() => navigate("/dashboard")}
          className="not-found-button"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
