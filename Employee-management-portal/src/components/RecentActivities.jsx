import {
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  AddCircleOutlined,
  EventNoteOutlined,
  LoginOutlined,
  DescriptionOutlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";

const RecentActivities = ({ activities, employees }) => {
  const getEmployeeName = (employeeId) => {
    const employee = employees.find((employee) => employee.id === employeeId);

    if (!employee) {
      return "Unknown Employee";
    }

    return `${employee.firstName} ${employee.lastName}`;
  };

  const getActivityIcon = (activity) => {
    if (activity.includes("employee added")) {
      return <AddCircleOutlined />;
    }

    if (activity.includes("Leave")) {
      return <EventNoteOutlined />;
    }

    if (activity.includes("Checked in")) {
      return <LoginOutlined />;
    }

    if (activity.includes("Timesheet")) {
      return <DescriptionOutlined />;
    }

    if (activity.includes("offboarded")) {
      return <PersonRemoveOutlined />;
    }

    return null;
  };

  return (
    <Card className="activity-card" elevation={0}>
      <CardContent>
        <Typography variant="h6" className="activity-title">
          Recent Activities
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {activities.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="activity-name">
                    <div className="activity-icon">
                      {getActivityIcon(item.activity)}
                    </div>

                    <span>{item.activity}</span>
                  </div>
                </TableCell>

                <TableCell>{getEmployeeName(item.employeeId)}</TableCell>

                <TableCell>{item.time}</TableCell>

                <TableCell>
                  <Chip
                    label={item.status}
                    size="small"
                    className={`activity-status activity-status-${item.status.toLowerCase()}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
