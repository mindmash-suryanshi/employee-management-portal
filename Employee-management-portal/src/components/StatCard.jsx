import { Link } from "react-router-dom";
import { Card, CardContent, Box, Typography } from "@mui/material";

const StatCard = ({ title, value, icon, color, subtitle, to }) => {
  return (
    <Card
      className={`stat-card ${to ? "stat-card-clickable" : ""}`}
      elevation={0}
      component={to ? Link : "div"}
      to={to}
    >
      <CardContent>
        <Box className={`stat-card-icon stat-card-icon-${color}`}>{icon}</Box>

        <Typography className="stat-card-title" variant="body2">
          {title}
        </Typography>

        <Typography className="stat-card-value" variant="h4">
          {value}
        </Typography>

        {subtitle && (
          <Typography className="stat-card-subtitle">{subtitle}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
