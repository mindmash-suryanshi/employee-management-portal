import {
  EventAvailableOutlined,
  EventBusyOutlined,
  EventNoteOutlined,
  PendingActionsOutlined,
} from "@mui/icons-material";
import "../../styles/LeaveSummary.css";

const LeaveSummary = ({ leaves, attendance }) => {
  const pendingRequests = leaves.filter(
    (leave) => leave.status === "Pending",
  ).length;

  const plannedLeaves = leaves.filter(
    (leave) => leave.status === "Approved" && leave.leaveType !== "Sick Leave",
  ).length;

  const unplannedLeaves = leaves.filter(
    (leave) => leave.status === "Approved" && leave.leaveType === "Sick Leave",
  ).length;

  const today = new Date().toISOString().split("T")[0];

  const todayPresents = attendance.filter(
    (record) => record.date === today && record.status === "Present",
  ).length;

  const cards = [
    {
      title: "Today's Presents",
      value: todayPresents,
      subtitle: "Present today",
      icon: <EventAvailableOutlined />,
      className: "summary-present",
    },
    {
      title: "Planned Leaves",
      value: plannedLeaves,
      subtitle: "Approved",
      icon: <EventNoteOutlined />,
      className: "summary-planned",
    },
    {
      title: "Unplanned Leaves",
      value: unplannedLeaves,
      subtitle: "Sick",
      icon: <EventBusyOutlined />,
      className: "summary-unplanned",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      subtitle: "Requests",
      icon: <PendingActionsOutlined />,
      className: "summary-pending",
    },
  ];

  return (
    <div className="leave-summary-cards">
      {cards.map((card) => (
        <div
          className={`leave-summary-card ${card.className}`}
          key={card.title}
        >
          <div className="leave-summary-icon">{card.icon}</div>

          <div className="leave-summary-info">
            <span className="leave-summary-title">{card.title}</span>

            <div className="leave-summary-value">{card.value}</div>

            <span className="leave-summary-subtitle">{card.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveSummary;
