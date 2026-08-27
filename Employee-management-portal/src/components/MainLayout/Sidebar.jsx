import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Employee Portal</div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/employees" className="sidebar-link">
          Employees
        </NavLink>

        <NavLink to="/attendance" className="sidebar-link">
          Attendance
        </NavLink>

        <NavLink to="/leaves" className="sidebar-link">
          Leaves
        </NavLink>

        <NavLink to="/timesheets" className="sidebar-link">
          Timesheets
        </NavLink>

        <NavLink to="/profile" className="sidebar-link">
          Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
