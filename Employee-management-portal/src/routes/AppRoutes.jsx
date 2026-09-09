import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import EmployeeProfile from "../pages/EmployeeProfile";
import EditEmployee from "../pages/EditEmployee";
import AddEmployee from "../pages/AddEmployee";
import Attendance from "../pages/Attendance";
import Leaves from "../pages/Leaves";
import Timesheets from "../pages/Timesheets";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/MainLayout/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/employees" element={<Employees />} />

          <Route path="/employees/:id" element={<EmployeeProfile />} />

          <Route path="/edit-employee/:id" element={<EditEmployee />} />

          <Route path="/add-employee" element={<AddEmployee />} />

          <Route path="/attendance" element={<Attendance />} />

          <Route path="/leaves" element={<Leaves />} />

          <Route path="/timesheets" element={<Timesheets />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
