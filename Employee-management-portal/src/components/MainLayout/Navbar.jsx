import { LogoutOutlined } from "@mui/icons-material";
import NotificationMenu from "../NotificationMenu";
import ConfirmDialouge from "../ConfirmDialouge";
import { getAuthUser, removeAuthUser } from "../../utils/storage";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const authUser = getAuthUser();

  const fullName = `${authUser?.firstName || ""} ${
    authUser?.lastName || ""
  }`.trim();

  const location = useLocation();

  const handleLogout = () => {
    removeAuthUser();

    navigate("/login", {
      replace: true,
    });
  };

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/employees": "Employees",
    "/attendance": "Attendance",
    "/leaves": "Leaves",
    "/timesheets": "Timesheets",
    "/profile": "Profile",
  };
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const currentPage = pageTitles[location.pathname] || "Employee Portal";

  return (
    <header className="navbar">
      <div className="navbar-page-info">
        <span className="navbar-page-title">{currentPage}</span>
      </div>

      <div className="navbar-actions">
        <NotificationMenu />

        <div className="navbar-divider" />

        <div className="navbar-user">
          <div className="navbar-user-avatar">
            {authUser?.firstName?.charAt(0) || "A"}
          </div>

          <div className="navbar-user-info">
            <span className="navbar-user-name">{fullName || "Admin"}</span>

            <span className="navbar-user-role">Administrator</span>
          </div>
        </div>

        <button
          type="button"
          className="navbar-logout"
          aria-label="Logout"
          title="Logout"
          onClick={() => setLogoutDialogOpen(true)}
        >
          <LogoutOutlined />
        </button>
        <ConfirmDialouge
          open={logoutDialogOpen}
          title="Confirm Logout"
          message="Are you sure you want to log out of your account?"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={handleLogout}
          onCancel={() => setLogoutDialogOpen(false)}
        />
      </div>
    </header>
  );
};

export default Navbar;
