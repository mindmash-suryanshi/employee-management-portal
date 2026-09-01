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

import { notificationData } from "../utils/mockData/notificationData";

import "../styles/NotificationMenu.css";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [notifications, setNotifications] = useState(notificationData);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "leave":
        return <EventNoteOutlined />;

      case "employee":
        return <PersonAddOutlined />;

      case "timesheet":
        return <DescriptionOutlined />;

      default:
        return <NotificationsNoneOutlined />;
    }
  };

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
          badgeContent={unreadCount}
          color="error"
          overlap="circular"
          invisible={unreadCount === 0}
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
            {unreadCount > 0 ? `${unreadCount} new` : "All caught up"}
          </Typography>
        </Box>

        <Divider />

        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            className="notification-item"
            onClick={handleClose}
          >
            <div className="notification-icon">
              {getNotificationIcon(notification.type)}
            </div>

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

            {!notification.read && <span className="notification-unread" />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationMenu;
