import { useNavigate } from "react-router-dom";

import { getAuthUser, removeAuthUser } from "../../utils/storage";
import "../../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const authUser = getAuthUser();

  const handleLogout = () => {
    removeAuthUser();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar-title">Employee Management Portal</div>

      <div className="navbar-actions">
        <span className="navbar-user">
          {authUser?.firstName} {authUser?.lastName}
        </span>

        <button type="button" className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
