import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  PeopleOutlined,
  EventAvailableOutlined,
  EventNoteOutlined,
  DescriptionOutlined,
  PersonOutlined,
} from "@mui/icons-material";

import "../../styles/Sidebar.css";

const Sidebar = () => {
  const navigationItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Employees",
      path: "/employees",
      icon: <PeopleOutlined />,
    },
    {
      label: "Attendance",
      path: "/attendance",
      icon: <EventAvailableOutlined />,
    },
    {
      label: "Leaves",
      path: "/leaves",
      icon: <EventNoteOutlined />,
    },
    {
      label: "Timesheets",
      path: "/timesheets",
      icon: <DescriptionOutlined />,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <PeopleOutlined />
        </div>

        <div>
          <div className="sidebar-brand-title">Employee</div>

          <div className="sidebar-brand-subtitle">Management Portal</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-section-title">MAIN MENU</p>

        {navigationItems.map((item) => (
          <NavLink key={item.path} to={item.path} className="sidebar-link">
            <span className="sidebar-link-icon">{item.icon}</span>

            <span>{item.label}</span>
          </NavLink>
        ))}

        <p className="sidebar-section-title sidebar-account-title">ACCOUNT</p>

        <NavLink to="/profile" className="sidebar-link">
          <span className="sidebar-link-icon">
            <PersonOutlined />
          </span>

          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-avatar">E</div>

        <div className="sidebar-footer-info">
          <span className="sidebar-footer-name">Admin</span>

          <span className="sidebar-footer-role">Administrator</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
