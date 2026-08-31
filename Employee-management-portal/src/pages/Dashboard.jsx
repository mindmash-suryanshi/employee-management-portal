import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/employeeService";
import { attendanceData } from "../utils/mockData/attendanceData";
import { leaveData } from "../utils/mockData/leaveData";
import { timesheetData } from "../utils/mockData/timesheetData";
import { activityData } from "../utils/mockData/activityData";
import RecentActivities from "../components/RecentActivities";
import {
  PeopleOutlined,
  CheckCircleOutlined,
  CancelOutlined,
  EventNoteOutlined,
  DescriptionOutlined,
} from "@mui/icons-material";

import StatCard from "../components/StatCard";

import "../styles/Dashboard.css";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalEmployees = employees.length;

  const presentEmployees = attendanceData.filter(
    (record) => record.status === "Present",
  ).length;

  const absentEmployees = attendanceData.filter(
    (record) => record.status === "Absent",
  ).length;

  const pendingLeaves = leaveData.filter(
    (leave) => leave.status === "Pending",
  ).length;

  const pendingTimesheets = timesheetData.filter(
    (timesheet) => timesheet.status === "Pending",
  ).length;

  const presentPercentage =
    totalEmployees > 0
      ? ((presentEmployees / totalEmployees) * 100).toFixed(2)
      : 0;

  const absentPercentage =
    totalEmployees > 0
      ? ((absentEmployees / totalEmployees) * 100).toFixed(2)
      : 0;

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();

        setEmployees(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Good morning, Emily! 👋</h1>

          <p className="dashboard-subtitle">
            Here's what's happening with your team today.
          </p>
        </div>

        <div className="dashboard-date">{formattedDate}</div>
      </div>

      <div className="dashboard-stats">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={<PeopleOutlined />}
          color="primary"
          to="/employees"
        />

        <StatCard
          title="Present Today"
          value={presentEmployees}
          icon={<CheckCircleOutlined />}
          color="success"
          subtitle={`${presentPercentage}% of total`}
          to="/attendance"
        />

        <StatCard
          title="Absent Today"
          value={absentEmployees}
          icon={<CancelOutlined />}
          color="danger"
          subtitle={`${absentPercentage}% of total`}
          to="/attendance"
        />

        <StatCard
          title="Pending Leaves"
          value={pendingLeaves}
          icon={<EventNoteOutlined />}
          color="warning"
          to="/leaves"
        />

        <StatCard
          title="Pending Timesheets"
          value={pendingTimesheets}
          icon={<DescriptionOutlined />}
          color="secondary"
          to="/timesheets"
        />
      </div>
      <div className="dashboard-content">
        <RecentActivities activities={activityData} employees={employees} />
      </div>
    </div>
  );
};

export default Dashboard;
