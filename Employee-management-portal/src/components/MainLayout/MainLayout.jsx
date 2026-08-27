import { Outlet } from "react-router-dom";
import "../../styles/MainLayout.css";
import "../../styles/Sidebar.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
