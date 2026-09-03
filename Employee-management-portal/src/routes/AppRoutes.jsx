import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import EmployeeProfile from "../pages/EmployeeProfile";
import EditEmployee from "../pages/EditEmployee";
import Timesheets from "../pages/Timesheets";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/MainLayout/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/timesheets" element={<Timesheets />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
