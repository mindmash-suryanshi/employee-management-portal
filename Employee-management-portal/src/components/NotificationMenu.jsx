import { useState } from "react";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
} from "@mui/material";

import {
  NotificationsNoneOutlined,
  EventNoteOutlined,
  PersonAddOutlined,
  DescriptionOutlined,
} from "@mui/icons-material";

import "../styles/NotificationMenu.css";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const notifications = [
    {
      id: 1,
      title: "Leave request submitted",
      message: "Michael Williams submitted a leave request.",
      time: "10 minutes ago",
      icon: <EventNoteOutlined />,
    },
    {
      id: 2,
      title: "New employee added",
      message: "Emily Johnson was added to the team.",
      time: "1 hour ago",
      icon: <PersonAddOutlined />,
    },
    {
      id: 3,
      title: "Timesheet pending",
      message: "James Davis has a pending timesheet.",
      time: "2 hours ago",
      icon: <DescriptionOutlined />,
    },
  ];

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <>
      <IconButton
        className="notification-button"
        onClick={handleOpen}
        aria-label="Notifications"
        aria-controls={isOpen ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
      >
        <Badge
          badgeContent={notifications.length}
          color="error"
          overlap="circular"
        >
          <NotificationsNoneOutlined />
        </Badge>
      </IconButton>

      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            className: "notification-menu",
          },
        }}
      >
        <Box className="notification-header">
          <Typography className="notification-title">Notifications</Typography>

          <Typography className="notification-count">
            {notifications.length} new
          </Typography>
        </Box>

        <Divider />

        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            className="notification-item"
            onClick={handleClose}
          >
            <div className="notification-icon">{notification.icon}</div>

            <div className="notification-content">
              <Typography className="notification-item-title">
                {notification.title}
              </Typography>

              <Typography className="notification-message">
                {notification.message}
              </Typography>

              <Typography className="notification-time">
                {notification.time}
              </Typography>
            </div>

            <span className="notification-unread" />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationMenu;
